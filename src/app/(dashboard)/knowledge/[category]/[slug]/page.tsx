import { notFound } from "next/navigation";
import {
  getEntryBySlug,
  getEntriesByCategory,
  getAllCategories,
} from "@/lib/content";
import { CATEGORIES } from "@/lib/taxonomy";
import { Badge } from "@/components/ui/Badge";
import { EntryBody } from "@/components/knowledge/EntryBody";
import { EntryBackLink } from "@/components/knowledge/EntryBackLink";
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
      <EntryBackLink
        href={`/knowledge/${category}`}
        label={`Back to ${categoryInfo?.label || category}`}
      />

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

      {entry.sources && entry.sources.length > 0 && (
        <section className="mt-10 rounded-2xl border border-border/50 bg-card/50 p-5">
          <h2 className="text-lg font-semibold text-foreground">Sources</h2>
          <ul className="mt-4 space-y-3">
            {entry.sources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-foreground"
                >
                  <span>{source.label}</span>
                  <span className="text-xs text-muted/70">Open reference</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <EntryViewTracker
        title={entry.title}
        slug={entry.slug}
        category={entry.category}
      />
    </div>
  );
}
