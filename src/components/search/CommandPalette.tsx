"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Fuse, { type IFuseOptions } from "fuse.js";
import type { SearchIndexEntry } from "@/lib/search";

const fuseOptions: IFuseOptions<SearchIndexEntry> = {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "summary", weight: 0.25 },
    { name: "tags", weight: 0.2 },
    { name: "category", weight: 0.1 },
  ],
  threshold: 0.35,
  minMatchCharLength: 2,
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchIndexEntry[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadIndex() {
      try {
        const res = await fetch("/search-index.json");
        const data = await res.json();
        setIndex(data);
      } catch (err) {
        console.error("Failed to load search index:", err);
      }
    }
    loadIndex();
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => {
          if (prev) {
            setQuery("");
            setSelectedIndex(0);
          }
          return !prev;
        });
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
        setSelectedIndex(0);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const fuse = new Fuse(index, fuseOptions);

  const results = query.trim()
    ? fuse
        .search(query)
        .slice(0, 8)
        .map((r) => r.item)
    : index.slice(0, 8);

  const handleSelect = useCallback(
    (entry: SearchIndexEntry) => {
      router.push(`/knowledge/${entry.category}/${entry.slug}`);
      close();
    },
    [router, close],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={close}
      />

      <div className="relative w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center border-b border-border px-4">
          <svg
            className="w-4 h-4 text-muted shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search knowledge base..."
            className="flex-1 px-3 py-3 bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
          />
          <kbd className="text-xs text-muted bg-background px-1.5 py-0.5 rounded border border-border">
            Esc
          </kbd>
        </div>

        <div className="max-h-72 overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted">
              No results found.
            </div>
          ) : (
            results.map((entry, i) => (
              <button
                key={`${entry.category}-${entry.slug}`}
                onClick={() => handleSelect(entry)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  i === selectedIndex
                    ? "bg-accent/10 text-foreground"
                    : "text-foreground/80 hover:bg-foreground/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium truncate">{entry.title}</span>
                  <span className="text-xs text-muted shrink-0 ml-2 capitalize">
                    {entry.category}
                  </span>
                </div>
                <p className="text-xs text-muted mt-0.5 truncate">
                  {entry.summary}
                </p>
              </button>
            ))
          )}
        </div>

        <div className="border-t border-border px-4 py-2 flex items-center gap-4 text-xs text-muted">
          <span>
            <kbd className="px-1 py-0.5 bg-background border border-border rounded">
              ↑↓
            </kbd>{" "}
            navigate
          </span>
          <span>
            <kbd className="px-1 py-0.5 bg-background border border-border rounded">
              ↵
            </kbd>{" "}
            select
          </span>
          <span>
            <kbd className="px-1 py-0.5 bg-background border border-border rounded">
              esc
            </kbd>{" "}
            close
          </span>
        </div>
      </div>
    </div>
  );
}
