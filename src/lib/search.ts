import { getAllEntries } from "./content";

export type SearchIndexEntry = {
  title: string;
  slug: string;
  category: string;
  type: string;
  tags: string[];
  summary: string;
  difficulty: string;
  technologies?: string[];
};

export function buildSearchIndex(): SearchIndexEntry[] {
  const entries = getAllEntries();

  return entries.map((entry) => ({
    title: entry.title,
    slug: entry.slug,
    category: entry.category,
    type: entry.type,
    tags: entry.tags,
    summary: entry.summary,
    difficulty: entry.difficulty,
    technologies: entry.technologies,
  }));
}

export function getSearchIndex(): SearchIndexEntry[] {
  return buildSearchIndex();
}
