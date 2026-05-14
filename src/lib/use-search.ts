"use client";

import { useState, useEffect, useMemo } from "react";
import Fuse, { type IFuseOptions } from "fuse.js";
import type { SearchIndexEntry } from "./search";

const fuseOptions: IFuseOptions<SearchIndexEntry> = {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "summary", weight: 0.25 },
    { name: "tags", weight: 0.2 },
    { name: "category", weight: 0.1 },
    { name: "technologies", weight: 0.05 },
  ],
  threshold: 0.35,
  minMatchCharLength: 2,
  includeScore: true,
  includeMatches: true,
};

export function useSearch() {
  const [index, setIndex] = useState<SearchIndexEntry[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadIndex() {
      setIsLoading(true);
      try {
        const res = await fetch("/search-index.json");
        const data = await res.json();
        setIndex(data);
      } catch (err) {
        console.error("Failed to load search index:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadIndex();
  }, []);

  const fuse = useMemo(() => new Fuse(index, fuseOptions), [index]);

  const results = useMemo(() => {
    if (!query.trim()) return index;
    return fuse.search(query).map((r) => r.item);
  }, [query, fuse, index]);

  return { query, setQuery, results, isLoading, allEntries: index };
}
