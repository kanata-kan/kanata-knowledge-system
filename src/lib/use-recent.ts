"use client";

import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";

export type RecentEntry = {
  title: string;
  slug: string;
  category: string;
  viewedAt: number;
};

const STORAGE_KEY = "kks-recent-entries";
const MAX_RECENT = 10;

function getEntryKey(entry: Pick<RecentEntry, "category" | "slug">) {
  return `${entry.category}:${entry.slug}`;
}

function isRecentEntry(value: unknown): value is RecentEntry {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<RecentEntry>;

  return (
    typeof candidate.title === "string" &&
    typeof candidate.slug === "string" &&
    typeof candidate.category === "string" &&
    typeof candidate.viewedAt === "number"
  );
}

function normalizeEntries(
  entries: unknown,
  validEntryKeys?: Set<string>,
): RecentEntry[] {
  if (!Array.isArray(entries)) {
    return [];
  }

  const uniqueEntries = new Map<string, RecentEntry>();

  for (const entry of entries) {
    if (!isRecentEntry(entry)) {
      continue;
    }

    const entryKey = getEntryKey(entry);

    if (validEntryKeys && !validEntryKeys.has(entryKey)) {
      continue;
    }

    const existingEntry = uniqueEntries.get(entryKey);

    if (!existingEntry || existingEntry.viewedAt < entry.viewedAt) {
      uniqueEntries.set(entryKey, entry);
    }
  }

  return Array.from(uniqueEntries.values())
    .sort((a, b) => b.viewedAt - a.viewedAt)
    .slice(0, MAX_RECENT);
}

function readEntries(): RecentEntry[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return normalizeEntries(stored ? JSON.parse(stored) : []);
  } catch {
    return [];
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function useRecentEntries(
  validEntries?: Array<Pick<RecentEntry, "category" | "slug">>,
) {
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

  const validEntryKeys = useMemo(() => {
    if (!validEntries) {
      return undefined;
    }

    return new Set(validEntries.map((entry) => getEntryKey(entry)));
  }, [validEntries]);

  const parsedEntries: RecentEntry[] = (() => {
    try {
      return normalizeEntries(JSON.parse(stored), validEntryKeys);
    } catch {
      return [];
    }
  })();

  const syncEntries = useCallback((entries: RecentEntry[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      window.dispatchEvent(new StorageEvent("storage"));
    } catch {}
  }, []);

  useEffect(() => {
    const normalizedSnapshot = JSON.stringify(parsedEntries);

    if (stored !== normalizedSnapshot) {
      syncEntries(parsedEntries);
    }
  }, [parsedEntries, stored, syncEntries]);

  const addEntry = useCallback((entry: Omit<RecentEntry, "viewedAt">) => {
    const current = readEntries();
    const next = normalizeEntries([
      { ...entry, viewedAt: Date.now() },
      ...current,
    ], validEntryKeys);
    syncEntries(next);
  }, [syncEntries, validEntryKeys]);

  return { entries: parsedEntries, addEntry };
}
