import Link from "next/link";
import { getRecentEntries, getPinnedEntries, CATEGORIES } from "@/lib/content";
import { EntryCard } from "@/components/knowledge/EntryCard";
import { RecentlyViewed } from "@/components/knowledge/RecentlyViewed";

export default function DashboardHome() {
  const recentEntries = getRecentEntries(8);
  const pinnedEntries = getPinnedEntries();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted mt-1">
          Quick access to your developer knowledge base
        </p>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/knowledge/${cat.slug}`}
              className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-card transition-colors"
            >
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <p className="font-medium text-sm">{cat.label}</p>
                <p className="text-xs text-muted">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {pinnedEntries.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">Pinned</h2>
          <div className="space-y-3">
            {pinnedEntries.map((entry) => (
              <EntryCard
                key={`${entry.category}-${entry.slug}`}
                entry={entry}
              />
            ))}
          </div>
        </section>
      )}

      <RecentlyViewed />

      {recentEntries.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">Latest Entries</h2>
          <div className="space-y-3">
            {recentEntries.map((entry) => (
              <EntryCard
                key={`${entry.category}-${entry.slug}`}
                entry={entry}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
