"use client";

import { useEffect, useRef } from "react";
import { useStore } from "../lib/store";
import { decodeShareSnapshot, SHARE_HASH_PREFIX } from "../lib/share";

export default function ShareLinkLoader() {
  const handledHash = useRef<string | null>(null);

  useEffect(() => {
    const importFromHash = () => {
      const hash = window.location.hash.startsWith("#")
        ? window.location.hash.slice(1)
        : window.location.hash;

      if (!hash.startsWith(SHARE_HASH_PREFIX) || handledHash.current === hash) return;
      handledHash.current = hash;

      const snapshot = decodeShareSnapshot(hash.slice(SHARE_HASH_PREFIX.length));
      if (!snapshot) {
        window.alert("This GradGraph share link is invalid or outdated.");
        return;
      }

      const shouldImport = window.confirm(
        "This GradGraph link contains a shared plan. Importing it will replace your selected major, completed courses, planned courses, and term plan.",
      );

      if (!shouldImport) return;

      useStore.getState().applyShareSnapshot(snapshot);
      localStorage.setItem("gradgraph_seen", "1");
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    };

    const unsubscribeHydration = useStore.persist.hasHydrated()
      ? null
      : useStore.persist.onFinishHydration(importFromHash);

    window.addEventListener("hashchange", importFromHash);
    if (useStore.persist.hasHydrated()) importFromHash();

    return () => {
      unsubscribeHydration?.();
      window.removeEventListener("hashchange", importFromHash);
    };
  }, []);

  return null;
}
