import { NextResponse } from 'next/server';
import { clearedCookie, guardApi } from '@/lib/cms/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const denied = await guardApi(request, { mutating: true });
  if (denied) return denied;
  const res = NextResponse.json({ ok: true });
  res.cookies.set(clearedCookie());
  return res;
}
