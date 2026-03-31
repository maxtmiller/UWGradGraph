"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";

/**
 * Syncs the Zustand `theme` value to `data-theme` on <html>.
 * This lets CSS variables defined in globals.css respond to theme changes
 * without re-rendering any component.
 */
export default function ThemeApplier() {
  const theme = useStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Also apply immediately on first paint (before rehydration delay)
  useEffect(() => {
    const stored = localStorage.getItem("gradgraph-storage");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const t = parsed?.state?.theme;
        if (t === "light" || t === "dark") {
          document.documentElement.setAttribute("data-theme", t);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  return null;
}
