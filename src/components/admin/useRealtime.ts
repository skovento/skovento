'use client';

import { useEffect, useRef, useState } from 'react';
import type { RealtimeEvent } from '@/lib/realtime';

/**
 * Subscribes to /api/admin/stream.
 *
 * EventSource handles reconnection itself with exponential backoff, which is
 * one of the main practical reasons SSE beats a hand-rolled WebSocket for this:
 * laptop sleeps, wifi drops, and the stream comes back on its own with no
 * reconnect logic to write or get wrong.
 *
 * The handler is held in a ref so that passing an inline arrow function from
 * the component doesn't tear down and re-open the connection on every render.
 */
export function useRealtime(onEvent: (event: RealtimeEvent) => void) {
  const [connected, setConnected] = useState(false);
  const handlerRef = useRef(onEvent);
  handlerRef.current = onEvent;

  useEffect(() => {
    const source = new EventSource('/api/admin/stream');

    source.onopen = () => setConnected(true);

    source.onmessage = (e) => {
      try {
        handlerRef.current(JSON.parse(e.data) as RealtimeEvent);
      } catch {
        // Ignore malformed frames rather than killing the stream.
      }
    };

    source.onerror = () => {
      // EventSource retries automatically; just reflect the state in the UI.
      setConnected(false);
    };

    return () => source.close();
  }, []);

  return { connected };
}
