import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { SearchIndexEntry } from "@/lib/search";

export function SearchResults({ results }: { results: SearchIndexEntry[] }) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted text-sm">No results found.</p>
        <p className="text-muted/60 text-xs mt-1">Try a different search term or adjust filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted mb-3">{results.length} results</p>
      {results.map((entry) => (
        <Link
          key={`${entry.category}-${entry.slug}`}
          href={`/knowledge/${entry.category}/${entry.slug}`}
          className="block p-4 border border-border rounded-lg hover:bg-card hover:border-border/80 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-sm text-foreground truncate">
                {entry.title}
              </h3>
              <p className="text-xs text-muted mt-1 line-clamp-2">
                {entry.summary}
              </p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge variant="type" value={entry.type} />
                <Badge variant="difficulty" value={entry.difficulty} />
                {entry.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="tag" value={tag} />
                ))}
              </div>
            </div>
            <span className="text-xs text-muted shrink-0 capitalize">
              {entry.category}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
