import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getEntryBySlug,
  getEntriesByCategory,
  getAllCategories,
  CATEGORIES,
} from "@/lib/content";
import { Badge } from "@/components/ui/Badge";
import { EntryBody } from "@/components/knowledge/EntryBody";
import { EntryViewTracker } from "@/components/knowledge/EntryViewTracker";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];
  const categories = getAllCategories();

  for (const cat of categories) {
    const entries = getEntriesByCategory(cat);
    for (const entry of entries) {
      params.push({ category: cat, slug: entry.slug });
    }
  }

  return params;
}

export default async function EntryPage({ params }: Props) {
  const { category, slug } = await params;
  const entry = getEntryBySlug(category, slug);

  if (!entry) {
    notFound();
  }

  const categoryInfo = CATEGORIES.find((c) => c.slug === category);

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href={`/knowledge/${category}`}
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors mb-6"
      >
        <span>&larr;</span>
        <span>Back to {categoryInfo?.label || category}</span>
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          {entry.title}
        </h1>
        <p className="text-muted text-lg mb-4">{entry.summary}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="type" value={entry.type} />
          <Badge variant="difficulty" value={entry.difficulty} />
          {entry.tags.map((tag) => (
            <Badge key={tag} variant="tag" value={tag} />
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-muted">
          <span>Created: {entry.createdAt}</span>
          <span>Updated: {entry.updatedAt}</span>
          {entry.technologies && (
            <span>Tech: {entry.technologies.join(", ")}</span>
          )}
        </div>
      </header>

      <EntryBody content={entry.content} />
      <EntryViewTracker
        title={entry.title}
        slug={entry.slug}
        category={entry.category}
      />
    </div>
  );
}
