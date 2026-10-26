import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import { defaultCollections, defaultSingles, type Doc } from './defaults';

/**
 * Storage for the admin panel.
 *
 * - Local development: a JSON file at .data/cms.json (zero setup, git-ignored).
 * - Production: Postgres, enabled by setting CMS_DATABASE_URL. Tables are created automatically.
 *
 * Both implement the same tiny adapter, so nothing else in the app knows which one is used.
 */

interface Adapter {
  getSingle(key: string): Promise<Record<string, unknown> | null>;
  putSingle(key: string, data: Record<string, unknown>): Promise<void>;
  getAll(col: string): Promise<Doc[]>;
  put(col: string, doc: Doc): Promise<void>;
  putMany(col: string, docs: Doc[]): Promise<void>;
  del(col: string, id: string): Promise<void>;
  isSeeded(col: string): Promise<boolean>;
  markSeeded(col: string): Promise<void>;
}

// --------------------------------------------------------------------- file

interface FileShape { singles: Record<string, Record<string, unknown>>; items: Record<string, Record<string, Doc>>; seeded: Record<string, boolean> }

function fileAdapter(): Adapter {
  const file = path.join(process.cwd(), '.data', 'cms.json');
  let cache: FileShape | null = null;
  let mtime = 0;
  let queue: Promise<unknown> = Promise.resolve();

  const load = (): FileShape => {
    try {
      const m = fs.statSync(file).mtimeMs;
      if (cache && m === mtime) return cache;
      cache = JSON.parse(fs.readFileSync(file, 'utf8')) as FileShape;
      mtime = m;
    } catch {
      cache = cache ?? { singles: {}, items: {}, seeded: {} };
    }
    return cache;
  };
  const save = (data: FileShape) => {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
    fs.renameSync(tmp, file);
    cache = data;
    mtime = fs.statSync(file).mtimeMs;
  };
  const mutate = <T>(fn: (d: FileShape) => T): Promise<T> => {
    const run = queue.then(() => { const d = load(); const r = fn(d); save(d); return r; });
    queue = run.catch(() => undefined);
    return run;
  };

  return {
    async getSingle(key) { return load().singles[key] ?? null; },
    putSingle: (key, data) => mutate((d) => { d.singles[key] = data; }),
    async getAll(col) { return Object.values(load().items[col] ?? {}); },
    put: (col, doc) => mutate((d) => { (d.items[col] ??= {})[doc.id] = doc; }),
    putMany: (col, docs) => mutate((d) => { const bucket = (d.items[col] ??= {}); for (const x of docs) bucket[x.id] = x; }),
    del: (col, id) => mutate((d) => { delete d.items[col]?.[id]; }),
    async isSeeded(col) { return !!load().seeded[col]; },
    markSeeded: (col) => mutate((d) => { d.seeded[col] = true; }),
  };
}

// ----------------------------------------------------------------- postgres

function pgAdapter(url: string): Adapter {
  // Imported lazily so local development never needs the driver to connect.
  let sqlP: Promise<import('postgres').Sql> | null = null;
  const sql = () =>
    (sqlP ??= import('postgres').then(async ({ default: postgres }) => {
      const db = postgres(url, { ssl: url.includes('localhost') ? false : 'require', prepare: false, max: 3, idle_timeout: 20 });
      await db`create table if not exists cms_docs (
        kind text not null, col text not null, id text not null,
        data jsonb not null, updated_at timestamptz not null default now(),
        primary key (kind, col, id))`;
      return db;
    }));
  const upsert = async (kind: string, col: string, id: string, data: unknown) => {
    const db = await sql();
    await db`insert into cms_docs (kind, col, id, data) values (${kind}, ${col}, ${id}, ${db.json(data as never)})
      on conflict (kind, col, id) do update set data = excluded.data, updated_at = now()`;
  };

  return {
    async getSingle(key) {
      const rows = await (await sql())`select data from cms_docs where kind='single' and col='-' and id=${key}`;
      return (rows[0]?.data as Record<string, unknown>) ?? null;
    },
    putSingle: (key, data) => upsert('single', '-', key, data),
    async getAll(col) {
      const rows = await (await sql())`select data from cms_docs where kind='item' and col=${col}`;
      return rows.map((r) => r.data as Doc);
    },
    put: (col, doc) => upsert('item', col, doc.id, doc),
    async putMany(col, docs) { for (const d of docs) await upsert('item', col, d.id, d); },
    async del(col, id) { await (await sql())`delete from cms_docs where kind='item' and col=${col} and id=${id}`; },
    async isSeeded(col) {
      const rows = await (await sql())`select 1 from cms_docs where kind='meta' and col='seeded' and id=${col}`;
      return rows.length > 0;
    },
    markSeeded: (col) => upsert('meta', 'seeded', col, { done: true }),
  };
}

const globalForStore = globalThis as unknown as { __cmsAdapter?: Adapter };
const adapter = (): Adapter =>
  (globalForStore.__cmsAdapter ??= process.env.CMS_DATABASE_URL ? pgAdapter(process.env.CMS_DATABASE_URL) : fileAdapter());

// ------------------------------------------------------------------ public API

const merge = (base: unknown, over: unknown): unknown => {
  if (Array.isArray(over)) return over;
  if (over && typeof over === 'object' && base && typeof base === 'object' && !Array.isArray(base)) {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [k, v] of Object.entries(over as Record<string, unknown>)) out[k] = merge(out[k], v);
    return out;
  }
  return over === undefined ? base : over;
};

/** A single document (page / settings). Saved values override the starter content field by field. */
export async function getSingleDoc<T = Record<string, unknown>>(key: string): Promise<T> {
  const base = defaultSingles[key] ?? {};
  try {
    const stored = await adapter().getSingle(key);
    return (stored ? merge(base, stored) : base) as T;
  } catch (e) {
    console.error(`[cms] could not read "${key}", using starter content:`, (e as Error).message);
    return base as T;
  }
}

export async function saveSingleDoc(key: string, data: Record<string, unknown>) {
  await adapter().putSingle(key, data);
}

export async function listDocs<T extends { id: string } = Doc>(col: string): Promise<T[]> {
  try {
    const a = adapter();
    const seeded = await a.isSeeded(col);
    const stored = await a.getAll(col);
    if (!seeded && stored.length === 0) return (defaultCollections[col] ?? []) as unknown as T[];
    // fields added to the starter content later (e.g. images) also show for items saved before they existed
    const defs = new Map((defaultCollections[col] ?? []).map((d) => [d.id, d]));
    return stored.map((it) => (defs.has(it.id) ? { ...defs.get(it.id), ...it } : it)) as unknown as T[];
  } catch (e) {
    console.error(`[cms] could not read "${col}", using starter content:`, (e as Error).message);
    return (defaultCollections[col] ?? []) as unknown as T[];
  }
}

/** First write to a collection copies the starter content into storage so it can be edited. */
async function ensureSeeded(col: string) {
  const a = adapter();
  if (await a.isSeeded(col)) return;
  const existing = await a.getAll(col);
  if (existing.length === 0 && defaultCollections[col]?.length) await a.putMany(col, defaultCollections[col]);
  await a.markSeeded(col);
}

export async function getDoc<T extends { id: string } = Doc>(col: string, id: string): Promise<T | null> {
  return ((await listDocs<T>(col)).find((d) => d.id === id) as T) ?? null;
}

export async function saveDoc(col: string, doc: Doc) {
  await ensureSeeded(col);
  await adapter().put(col, { ...doc, updatedAt: new Date().toISOString() });
}

export async function deleteDoc(col: string, id: string) {
  await ensureSeeded(col);
  await adapter().del(col, id);
}
