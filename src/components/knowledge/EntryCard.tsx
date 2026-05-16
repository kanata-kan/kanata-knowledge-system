import Link from "next/link";
import type { EntryMeta } from "@/types/content";
import { Badge } from "@/components/ui/Badge";

export function EntryCard({ entry }: { entry: EntryMeta }) {
  return (
    <Link
      href={`/knowledge/${entry.category}/${entry.slug}`}
      className="block p-5 border border-border/50 rounded-xl hover:bg-card/80 hover:border-border transition-all duration-200 hover:shadow-lg hover:shadow-black/20 group"
    >
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0 flex-1 space-y-3 text-start">
          <h3 className="font-semibold text-base text-foreground truncate group-hover:text-accent transition-colors">
            {entry.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed line-clamp-2">
            {entry.summary}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="type" value={entry.type} />
            <Badge variant="difficulty" value={entry.difficulty} />
            {entry.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="tag" value={tag} />
            ))}
          </div>
        </div>
        <span className="shrink-0 whitespace-nowrap text-end text-xs text-muted/70">
          {entry.updatedAt}
        </span>
      </div>
    </Link>
  );
}
