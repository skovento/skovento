'use client';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Field } from '@/lib/cms/schema';
import { ICON_OPTIONS } from '@/lib/cms/schema';
import { Markdown } from '@/components/ui/Markdown';

type Obj = Record<string, unknown>;
type RelOptions = Record<string, { value: string; label: string }[]>;

interface Props {
  fields: Field[];
  initial: Obj;
  /** 'single' = one document (PUT), 'new' = create (POST), 'edit' = update (PUT) + delete */
  mode: 'single' | 'new' | 'edit';
  endpoint: string;
  backHref?: string;
  viewHref?: string;
  relOptions: RelOptions;
  title: string;
}

const inputCls = 'ad-input';

function defaultFor(fields: Field[]): Obj {
  const o: Obj = {};
  for (const f of fields) {
    if (f.type === 'boolean') o[f.name] = false;
    else if (f.type === 'strings' || f.type === 'relations' || f.type === 'objects') o[f.name] = [];
    else if (f.type === 'group') o[f.name] = defaultFor(f.fields ?? []);
    else o[f.name] = '';
  }
  return o;
}

export function EntityEditor({ fields, initial, mode, endpoint, backHref, viewHref, relOptions, title }: Props) {
  const router = useRouter();
  const [value, setValue] = useState<Obj>(() => ({ ...defaultFor(fields), ...initial }));
  const [saved, setSaved] = useState(() => JSON.stringify(value));
  const [state, setState] = useState<{ kind: 'idle' | 'saving' | 'ok' | 'error'; msg?: string }>({ kind: 'idle' });
  const dirty = useMemo(() => JSON.stringify(value) !== saved, [value, saved]);
  const valueRef = useRef(value);
  valueRef.current = value;

  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);

  const save = useCallback(async () => {
    setState({ kind: 'saving' });
    try {
      const res = await fetch(endpoint, {
        method: mode === 'new' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valueRef.current),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) { setState({ kind: 'error', msg: json.error ?? 'Could not save' }); return; }
      setSaved(JSON.stringify(valueRef.current));
      setState({ kind: 'ok', msg: 'Saved. Changes are live on the website.' });
      if (mode === 'new' && json.id) router.replace(`${backHref}/${json.id}`);
      else router.refresh();
    } catch {
      setState({ kind: 'error', msg: 'Network error — nothing was saved' });
    }
  }, [endpoint, mode, router, backHref]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); void save(); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [save]);

  async function remove() {
    if (!confirm('Delete this item permanently? This cannot be undone.')) return;
    const res = await fetch(endpoint, { method: 'DELETE' });
    if (res.ok) { router.replace(backHref ?? '/admin'); router.refresh(); }
    else setState({ kind: 'error', msg: 'Could not delete' });
  }

  return (
    <div className="pb-28">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          {backHref && <Link href={backHref} className="text-sm text-muted hover:text-fg">← Back</Link>}
          <h1 className="mt-1 text-2xl font-bold">{title}</h1>
        </div>
        <div className="flex gap-2">
          {viewHref && <a href={viewHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !min-h-10 !text-sm">View on site ↗</a>}
          {mode === 'edit' && <button type="button" onClick={remove} className="btn !min-h-10 !text-sm border border-[#ff8a8a]/40 text-[#ff9b9b] hover:bg-[#ff8a8a]/10">Delete</button>}
        </div>
      </div>

      <div className="space-y-5">
        {fields.map((f) => (
          <FieldRow key={f.name} field={f} value={value[f.name]} onChange={(v) => setValue((s) => ({ ...s, [f.name]: v }))} relOptions={relOptions} depth={0} />
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-base/90 backdrop-blur lg:left-64">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <p className={`text-sm ${state.kind === 'error' ? 'text-[#ff9b9b]' : state.kind === 'ok' && !dirty ? 'text-ok' : 'text-muted'}`} role="status">
            {state.kind === 'saving' ? 'Saving…' : state.kind === 'error' ? state.msg : dirty ? 'Unsaved changes' : state.kind === 'ok' ? state.msg : 'No changes'}
          </p>
          <button type="button" onClick={() => void save()} disabled={state.kind === 'saving' || (!dirty && mode !== 'new')} className="btn btn-primary !min-h-10 disabled:opacity-50">
            {mode === 'new' ? 'Create' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

function FieldRow({ field, value, onChange, relOptions, depth }: { field: Field; value: unknown; onChange: (v: unknown) => void; relOptions: RelOptions; depth: number }) {
  const id = `f-${field.name}-${depth}`;

  if (field.type === 'group') {
    const obj = (value ?? {}) as Obj;
    return (
      <fieldset className="rounded-2xl border border-line bg-surface/50 p-5">
        <legend className="px-2 font-display text-base font-semibold">{field.label}</legend>
        <div className="space-y-4">
          {(field.fields ?? []).map((sf) => (
            <FieldRow key={sf.name} field={sf} value={obj[sf.name]} onChange={(v) => onChange({ ...obj, [sf.name]: v })} relOptions={relOptions} depth={depth + 1} />
          ))}
        </div>
      </fieldset>
    );
  }

  if (field.type === 'objects') {
    const list = (Array.isArray(value) ? value : []) as Obj[];
    const set = (i: number, v: Obj) => onChange(list.map((x, j) => (j === i ? v : x)));
    const move = (i: number, d: number) => {
      const j = i + d;
      if (j < 0 || j >= list.length) return;
      const n = [...list]; [n[i], n[j]] = [n[j], n[i]]; onChange(n);
    };
    return (
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">{field.label} <span className="text-faint">({list.length})</span></span>
          <button type="button" className="chip hover:text-fg" onClick={() => onChange([...list, defaultFor(field.fields ?? [])])}>+ Add {field.itemLabel ?? 'item'}</button>
        </div>
        <div className="space-y-3">
          {list.map((item, i) => (
            <div key={i} className="rounded-xl border border-line bg-surface p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-xs text-faint">#{i + 1}</span>
                <span className="flex gap-1">
                  <button type="button" aria-label="Move up" className="chip" onClick={() => move(i, -1)}>↑</button>
                  <button type="button" aria-label="Move down" className="chip" onClick={() => move(i, 1)}>↓</button>
                  <button type="button" aria-label="Remove" className="chip text-[#ff9b9b]" onClick={() => onChange(list.filter((_, j) => j !== i))}>Remove</button>
                </span>
              </div>
              <div className="space-y-3">
                {(field.fields ?? []).map((sf) => (
                  <FieldRow key={sf.name} field={sf} value={item[sf.name]} onChange={(v) => set(i, { ...item, [sf.name]: v })} relOptions={relOptions} depth={depth + 1} />
                ))}
              </div>
            </div>
          ))}
          {list.length === 0 && <p className="rounded-xl border border-dashed border-line p-4 text-sm text-faint">Nothing here yet.</p>}
        </div>
      </div>
    );
  }

  return (
    <div>
      {field.type !== 'boolean' && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
          {field.label}{field.required && <span className="text-accent-2"> *</span>}
        </label>
      )}
      <Input id={id} field={field} value={value} onChange={onChange} relOptions={relOptions} />
      {field.help && <p className="mt-1.5 text-xs text-faint">{field.help}</p>}
    </div>
  );
}

function Input({ id, field, value, onChange, relOptions }: { id: string; field: Field; value: unknown; onChange: (v: unknown) => void; relOptions: RelOptions }) {
  const [preview, setPreview] = useState(false);
  const str = typeof value === 'string' ? value : value == null ? '' : String(value);
  const ro = field.readOnly;

  switch (field.type) {
    case 'boolean':
      return (
        <label htmlFor={id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3">
          <input id={id} type="checkbox" checked={value === true} disabled={ro} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 accent-[#4c8dff]" />
          <span className="text-sm font-medium">{field.label}</span>
        </label>
      );
    case 'textarea':
      return <textarea id={id} rows={field.rows ?? 3} value={str} readOnly={ro} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} className={`${inputCls} resize-y py-3`} />;
    case 'markdown':
      return (
        <div>
          <div className="mb-2 flex gap-2">
            <button type="button" className={`chip ${!preview ? 'text-fg' : ''}`} onClick={() => setPreview(false)}>Write</button>
            <button type="button" className={`chip ${preview ? 'text-fg' : ''}`} onClick={() => setPreview(true)}>Preview</button>
          </div>
          {preview ? (
            <div className="min-h-40 rounded-xl border border-line bg-surface p-5"><Markdown source={str || '_Nothing to preview_'} /></div>
          ) : (
            <textarea id={id} rows={field.rows ?? 16} value={str} onChange={(e) => onChange(e.target.value)} className={`${inputCls} resize-y py-3 font-mono text-[13px] leading-relaxed`} />
          )}
        </div>
      );
    case 'number':
      return <input id={id} type="number" value={value === null || value === undefined ? '' : String(value)} readOnly={ro} onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))} className={inputCls} />;
    case 'date':
      return <input id={id} type="date" value={str.slice(0, 10)} readOnly={ro} onChange={(e) => onChange(e.target.value)} className={inputCls} />;
    case 'datetime':
      return <input id={id} value={str ? new Date(str).toLocaleString('en-IN') : ''} readOnly className={inputCls} />;
    case 'select':
      return (
        <select id={id} value={str} disabled={ro} onChange={(e) => onChange(e.target.value)} className={inputCls}>
          <option value="">—</option>
          {(field.options ?? []).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      );
    case 'icon':
      return (
        <select id={id} value={str} onChange={(e) => onChange(e.target.value)} className={inputCls}>
          <option value="">Default</option>
          {ICON_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      );
    case 'strings':
      return (
        <textarea
          id={id} rows={Math.max(3, Math.min(10, (Array.isArray(value) ? value.length : 0) + 1))}
          value={Array.isArray(value) ? (value as string[]).join('\n') : ''}
          placeholder="One per line"
          onChange={(e) => onChange(e.target.value.split('\n'))}
          onBlur={(e) => onChange(e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
          className={`${inputCls} resize-y py-3`}
        />
      );
    case 'relation': {
      const opts = relOptions[field.relation ?? ''] ?? [];
      return (
        <select id={id} value={str} onChange={(e) => onChange(e.target.value)} className={inputCls}>
          <option value="">— none —</option>
          {opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      );
    }
    case 'relations': {
      const opts = relOptions[field.relation ?? ''] ?? [];
      const sel = new Set(Array.isArray(value) ? (value as string[]) : []);
      return (
        <div className="flex flex-wrap gap-2 rounded-xl border border-line bg-surface p-3">
          {opts.map((o) => (
            <button
              key={o.value} type="button" aria-pressed={sel.has(o.value)}
              onClick={() => { const n = new Set(sel); if (n.has(o.value)) n.delete(o.value); else n.add(o.value); onChange([...n]); }}
              className={`chip !text-[13px] transition-colors ${sel.has(o.value) ? '!border-accent !bg-accent/15 !text-fg' : ''}`}
            >
              {o.label}
            </button>
          ))}
          {opts.length === 0 && <span className="text-sm text-faint">Nothing to choose yet.</span>}
        </div>
      );
    }
    default:
      return <input id={id} type={field.type === 'email' ? 'email' : field.type === 'url' ? 'text' : 'text'} value={str} readOnly={ro} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} className={inputCls} />;
  }
}
