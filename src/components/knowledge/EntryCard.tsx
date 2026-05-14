import Link from 'next/link'
import type { EntryMeta } from '@/types/content'
import { Badge } from '@/components/ui/Badge'

export function EntryCard({ entry }: { entry: EntryMeta }) {
  return (
    <Link
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
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <Badge variant="type" value={entry.type} />
            <Badge variant="difficulty" value={entry.difficulty} />
            {entry.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="tag" value={tag} />
            ))}
          </div>
        </div>
        <span className="text-xs text-muted shrink-0">
          {entry.updatedAt}
        </span>
      </div>
    </Link>
  )
}
