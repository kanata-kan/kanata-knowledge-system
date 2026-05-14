import Link from "next/link";
import { getAllTags, getEntriesByTag } from "@/lib/content";

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tags</h1>
        <p className="text-muted mt-1">Browse entries by tag</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const count = getEntriesByTag(tag).length;
          return (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-card hover:border-accent/30 transition-colors"
            >
              <span className="text-foreground">{tag}</span>
              <span className="text-xs text-muted">({count})</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
