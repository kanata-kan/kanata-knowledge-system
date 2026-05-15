"use client";

import Link from "next/link";
import { useRecentEntries } from "@/lib/use-recent";

export function RecentlyViewed() {
  const { entries } = useRecentEntries();

  if (entries.length === 0) return null;

  return (
    <section data-dashboard-section className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Recently Viewed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {entries.slice(0, 6).map((entry) => (
          <Link
            key={`${entry.category}-${entry.slug}`}
            href={`/knowledge/${entry.category}/${entry.slug}`}
            className="flex items-center gap-4 px-4 py-3 border border-border/50 rounded-lg hover:bg-card/80 hover:border-border transition-all duration-200 hover:shadow-md hover:shadow-black/10 group"
          >
            <span className="text-foreground font-medium text-sm truncate text-start group-hover:text-accent transition-colors">
              {entry.title}
            </span>
            <span className="ms-auto shrink-0 text-xs text-muted/70 capitalize">
              {entry.category}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
