"use client";

import Link from "next/link";
import { useRecentEntries } from "@/lib/use-recent";

export function RecentlyViewed() {
  const { entries } = useRecentEntries();

  if (entries.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Recently Viewed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {entries.slice(0, 6).map((entry) => (
          <Link
            key={`${entry.category}-${entry.slug}`}
            href={`/knowledge/${entry.category}/${entry.slug}`}
            className="flex items-center gap-3 px-3 py-2 border border-border rounded-lg hover:bg-card transition-colors text-sm"
          >
            <span className="text-foreground truncate">{entry.title}</span>
            <span className="text-xs text-muted shrink-0 capitalize ml-auto">
              {entry.category}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
