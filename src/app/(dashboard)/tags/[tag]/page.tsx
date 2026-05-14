import { notFound } from "next/navigation";
import { getEntriesByTag, getAllTags } from "@/lib/content";
import { EntryCard } from "@/components/knowledge/EntryCard";

type Props = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const entries = getEntriesByTag(decodedTag);

  if (entries.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Tag: <span className="text-accent">{decodedTag}</span>
        </h1>
        <p className="text-muted mt-1">{entries.length} entries</p>
      </div>

      <div className="space-y-3">
        {entries.map((entry) => (
          <EntryCard key={`${entry.category}-${entry.slug}`} entry={entry} />
        ))}
      </div>
    </div>
  );
}
