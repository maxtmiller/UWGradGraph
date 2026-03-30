"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";

/**
 * Triggers Zustand's localStorage rehydration exactly once, after the
 * component has mounted on the client.
 *
 * Why this exists:
 * The store is created with `skipHydration: true` to prevent the SSR pass
 * from reading localStorage (which doesn't exist on the server) and from
 * deserialising Sets as plain arrays before React has painted the first frame.
 *
 * Mount this once near the root of the app — e.g. inside layout.tsx —
 * so it runs before any page tries to read from the store.
 */
export default function StoreHydration() {
  useEffect(() => {
    useStore.persist.rehydrate();
  }, []);

  return null;
}
