"use client";

import { useCallback, useSyncExternalStore } from "react";

export type RecentEntry = {
  title: string;
  slug: string;
  category: string;
  viewedAt: number;
};

const STORAGE_KEY = "kks-recent-entries";
const MAX_RECENT = 10;

function readEntries(): RecentEntry[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function useRecentEntries() {
  const stored = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return window.localStorage.getItem(STORAGE_KEY) || "[]";
      } catch {
        return "[]";
      }
    },
    () => "[]",
  );

  const parsedEntries: RecentEntry[] = (() => {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  })();

  const addEntry = useCallback((entry: Omit<RecentEntry, "viewedAt">) => {
    const current = readEntries();
    const filtered = current.filter(
      (e) => !(e.slug === entry.slug && e.category === entry.category),
    );
    const next = [{ ...entry, viewedAt: Date.now() }, ...filtered].slice(
      0,
      MAX_RECENT,
    );
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new StorageEvent("storage"));
    } catch {}
  }, []);

  return { entries: parsedEntries, addEntry };
}
