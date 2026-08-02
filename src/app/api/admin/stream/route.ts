import { assertAdmin } from '@/lib/admin-guard';
import { prisma } from '@/lib/db';
import {
  subscribe,
  sseFrame,
  sseComment,
  POLL_INTERVAL_MS,
  HEARTBEAT_INTERVAL_MS,
  type RealtimeEvent,
} from '@/lib/realtime';

/**
 * GET /api/admin/stream — live event feed for the admin panel.
 *
 * Node runtime is required: the Edge runtime can't reach Prisma over TCP, and
 * we need node:events for the in-process bus.
 *
 * `force-dynamic` prevents Next from trying to cache a stream that by
 * definition never finishes.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const denied = await assertAdmin();
  if (denied) return denied;

  const encoder = new TextEncoder();

  // Only announce records created after the stream opens, so reconnecting
  // doesn't replay the whole inbox as "new".
  let lastSeen = new Date();

  // Cleanup handles live in the closure, not on the controller. Attaching them
  // to the controller and reaching for `this` inside cancel() is fragile —
  // `this` binding in stream callbacks is not something to rely on.
  let closed = false;
  let cleanup = () => {};

  const stream = new ReadableStream({
    async start(controller) {
      const send = (chunk: string) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(chunk));
        } catch {
          // Client went away mid-write; nothing useful to do.
          closed = true;
        }
      };

      const push = (event: RealtimeEvent) => send(sseFrame(event));

      // Open with a comment so the browser marks the connection established
      // immediately rather than waiting for the first real event.
      send(sseComment('connected'));

      // --- Path 1: instant, when the write landed on this same instance ---
      const unsubscribe = subscribe(push);

      // --- Path 2: database poll, the guaranteed floor across instances -----
      const poll = setInterval(async () => {
        if (closed) return;
        try {
          const since = lastSeen;
          // Advance the cursor before awaiting, so a slow query can't cause
          // the same row to be emitted twice.
          lastSeen = new Date();

          const [inquiries, testimonials] = await Promise.all([
            prisma.inquiry.findMany({
              where: { createdAt: { gt: since } },
              select: { id: true, name: true, createdAt: true },
              orderBy: { createdAt: 'asc' },
              take: 20,
            }),
            prisma.testimonial.findMany({
              where: { createdAt: { gt: since } },
              select: { id: true, authorName: true, createdAt: true },
              orderBy: { createdAt: 'asc' },
              take: 20,
            }),
          ]);

          for (const i of inquiries) {
            push({
              type: 'inquiry:new',
              id: i.id,
              name: i.name,
              createdAt: i.createdAt.toISOString(),
            });
          }
          for (const t of testimonials) {
            push({
              type: 'testimonial:new',
              id: t.id,
              authorName: t.authorName,
              createdAt: t.createdAt.toISOString(),
            });
          }
        } catch {
          // A transient database blip shouldn't kill the stream — the next
          // tick will pick up anything missed, because `since` only advances
          // on a successful pass through this block.
        }
      }, POLL_INTERVAL_MS);

      // --- Keepalive, so proxies don't close an idle connection ------------
      const heartbeat = setInterval(() => {
        send(sseComment('ping'));
      }, HEARTBEAT_INTERVAL_MS);

      cleanup = () => {
        closed = true;
        clearInterval(poll);
        clearInterval(heartbeat);
        unsubscribe();
      };
    },

    cancel() {
      // Called when the client disconnects (tab closed, navigation, network
      // drop). Without this, the two intervals and the bus listener leak for
      // the remaining life of the server instance — and with a bus listener
      // per tab, that adds up fast.
      cleanup();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      // Tells nginx not to buffer the stream, which would otherwise defeat
      // the entire point by holding chunks until the response completes.
      'X-Accel-Buffering': 'no',
    },
  });
}
