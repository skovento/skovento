import 'server-only';
import { collections } from './schema';
import { listDocs } from './store';

/** Options for relation pickers (e.g. "choose a category"), built from the live content. */
export async function getRelOptions(): Promise<Record<string, { value: string; label: string }[]>> {
  const out: Record<string, { value: string; label: string }[]> = {};
  const targets = new Set(collections.flatMap((c) => c.fields.filter((f) => f.relation).map((f) => f.relation!)));
  singlesNone(targets);
  await Promise.all([...targets].map(async (name) => {
    const def = collections.find((c) => c.name === name);
    if (!def) return;
    const docs = await listDocs(name);
    out[name] = docs.map((d) => ({ value: d.id, label: String((d as Record<string, unknown>)[def.titleField] || d.id) }));
  }));
  return out;
}

function singlesNone(_t: Set<string>) { /* singles have no relation fields today */ }
