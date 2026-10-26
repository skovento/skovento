import type { Field } from './schema';

/**
 * Server-side cleaning of whatever the admin form sends: unknown fields are dropped,
 * values are coerced to the schema's type, and required fields are checked.
 * (Never trust the browser, even for the admin.)
 */

const MAX_TEXT = 60_000;

function clean(field: Field, value: unknown, errors: string[], path: string): unknown {
  const label = path || field.label;
  switch (field.type) {
    case 'boolean':
      return value === true || value === 'true';
    case 'number': {
      if (value === '' || value === null || value === undefined) return null;
      const n = Number(value);
      if (!Number.isFinite(n)) { errors.push(`${label}: must be a number`); return null; }
      return n;
    }
    case 'strings':
      return (Array.isArray(value) ? value : []).map((v) => String(v).trim().slice(0, 500)).filter(Boolean).slice(0, 200);
    case 'relations':
      return (Array.isArray(value) ? value : []).map((v) => String(v)).slice(0, 200);
    case 'objects': {
      const out = (Array.isArray(value) ? value : []).slice(0, 200).map((item, i) =>
        cleanObject(field.fields ?? [], (item ?? {}) as Record<string, unknown>, errors, `${field.label} #${i + 1}`),
      );
      return out;
    }
    case 'group':
      return cleanObject(field.fields ?? [], (value ?? {}) as Record<string, unknown>, errors, field.label);
    default: {
      const s = typeof value === 'string' ? value : value == null ? '' : String(value);
      if (s.length > MAX_TEXT) errors.push(`${label}: too long`);
      const v = s.slice(0, MAX_TEXT);
      if (field.type === 'url' && v && !/^(https?:\/\/|\/)/i.test(v.trim())) errors.push(`${label}: must start with http(s):// or /`);
      if (field.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) errors.push(`${label}: invalid email`);
      return field.type === 'markdown' || field.type === 'textarea' ? v : v.trim();
    }
  }
}

export function cleanObject(fields: Field[], input: Record<string, unknown>, errors: string[], path = ''): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    if (f.readOnly) continue;
    const v = clean(f, input[f.name], errors, path ? `${path} → ${f.label}` : f.label);
    const empty = v === '' || v === null || (Array.isArray(v) && v.length === 0 && f.type !== 'strings' && f.type !== 'objects' && f.type !== 'relations');
    if (f.required && (empty || (f.type === 'strings' && (v as unknown[]).length === 0))) errors.push(`${path ? `${path} → ` : ''}${f.label} is required`);
    out[f.name] = v;
  }
  return out;
}

export const slugify = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
