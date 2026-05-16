import Link from "next/link";
import { getAllEntries } from "@/lib/content";
import { CATEGORIES } from "@/lib/taxonomy";
import { EntryCard } from "@/components/knowledge/EntryCard";
import { RecentlyViewed } from "@/components/knowledge/RecentlyViewed";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

export default function DashboardHome() {
  const allEntries = getAllEntries();
  const recentEntries = allEntries.slice(0, 8);
  const pinnedEntries = allEntries.filter((entry) => entry.pinned);
  const validRecentEntries = allEntries.map((entry) => ({
    category: entry.category,
    slug: entry.slug,
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <section data-dashboard-section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-muted text-base">
          Quick access to your developer knowledge base
        </p>
      </section>

      <section data-dashboard-section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/knowledge/${cat.slug}`}
              className="group flex items-center gap-4 rounded-xl border border-border/50 p-5 transition-all duration-200 hover:border-border hover:bg-card/80 hover:shadow-lg hover:shadow-black/20"
            >
              <CategoryIcon
                category={cat}
                size="lg"
                className="transition-transform duration-200 group-hover:scale-[1.03]"
              />
              <div className="space-y-1">
                <p className="font-semibold text-base text-foreground">
                  {cat.label}
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {pinnedEntries.length > 0 && (
        <section data-dashboard-section className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground">Pinned</h2>
          <div className="space-y-4">
            {pinnedEntries.map((entry) => (
              <EntryCard
                key={`${entry.category}-${entry.slug}`}
                entry={entry}
              />
            ))}
          </div>
        </section>
      )}

      <RecentlyViewed validEntries={validRecentEntries} />

      {recentEntries.length > 0 && (
        <section data-dashboard-section className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground">
            Latest Entries
          </h2>
          <div className="space-y-4">
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
