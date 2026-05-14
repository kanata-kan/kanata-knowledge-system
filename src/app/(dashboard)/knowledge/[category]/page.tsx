import { notFound } from "next/navigation";
import {
  getEntriesByCategory,
  getAllCategories,
  CATEGORIES,
} from "@/lib/content";
import { EntryCard } from "@/components/knowledge/EntryCard";

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return getAllCategories().map((cat) => ({ category: cat }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categoryInfo = CATEGORIES.find((c) => c.slug === category);

  if (!categoryInfo) {
    notFound();
  }

  const entries = getEntriesByCategory(category);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{categoryInfo.icon}</span>
          <h1 className="text-2xl font-bold tracking-tight">
            {categoryInfo.label}
          </h1>
        </div>
        <p className="text-muted">{categoryInfo.description}</p>
      </div>

      {entries.length > 0 ? (
        <div className="space-y-3">
          {entries.map((entry) => (
            <EntryCard key={entry.slug} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted">No entries yet in this category.</p>
        </div>
      )}
    </div>
  );
}
