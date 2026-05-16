import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Entry, EntryMeta, Category } from "@/types/content";
export { CATEGORIES } from "./taxonomy";

const CONTENT_DIR = path.join(process.cwd(), "src/content");

type ParsedEntryFile = {
  entry: EntryMeta;
  fileSlug: string;
};

function asString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : fallback;
}

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function parseEntryMeta(
  category: string,
  fileSlug: string,
  data: Record<string, unknown>,
): EntryMeta {
  return {
    title: asString(data.title, fileSlug),
    slug: asString(data.slug, fileSlug),
    category: category as Category,
    type: asString(data.type, "note") as EntryMeta["type"],
    difficulty: asString(data.difficulty, "beginner") as EntryMeta["difficulty"],
    tags: asStringArray(data.tags),
    summary: asString(data.summary, ""),
    createdAt: asString(data.createdAt, ""),
    updatedAt: asString(data.updatedAt, asString(data.createdAt, "")),
    pinned: typeof data.pinned === "boolean" ? data.pinned : undefined,
    technologies: asStringArray(data.technologies),
    relatedSlugs: asStringArray(data.relatedSlugs),
    sources: Array.isArray(data.sources)
      ? data.sources
          .filter(
            (source): source is { label: string; href: string } =>
              typeof source === "object" &&
              source !== null &&
              typeof (source as { label?: unknown }).label === "string" &&
              typeof (source as { href?: unknown }).href === "string",
          )
          .map((source) => ({
            label: source.label,
            href: source.href,
          }))
      : undefined,
  };
}

function readEntryFile(fullPath: string, category: string): ParsedEntryFile {
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  const fileSlug = path.basename(fullPath, ".mdx");

  return {
    fileSlug,
    entry: parseEntryMeta(category, fileSlug, data),
  };
}

export function getAllEntries(): EntryMeta[] {
  const entries: EntryMeta[] = [];

  const categories = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const category of categories) {
    const categoryPath = path.join(CONTENT_DIR, category);
    const files = fs
      .readdirSync(categoryPath)
      .filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const fullPath = path.join(categoryPath, file);
      entries.push(readEntryFile(fullPath, category).entry);
    }
  }

  return entries.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function getEntriesByCategory(category: string): EntryMeta[] {
  const categoryPath = path.join(CONTENT_DIR, category);

  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const files = fs.readdirSync(categoryPath).filter((f) => f.endsWith(".mdx"));

  const entries = files.map((file) =>
    readEntryFile(path.join(categoryPath, file), category).entry,
  );

  return entries.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function getEntryBySlug(category: string, slug: string): Entry | null {
  const categoryPath = path.join(CONTENT_DIR, category);

  if (!fs.existsSync(categoryPath)) {
    return null;
  }

  const files = fs.readdirSync(categoryPath).filter((file) => file.endsWith(".mdx"));

  for (const file of files) {
    const fullPath = path.join(categoryPath, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { content } = matter(fileContents);
    const parsed = readEntryFile(fullPath, category);

    if (parsed.entry.slug !== slug && parsed.fileSlug !== slug) {
      continue;
    }

    return {
      ...parsed.entry,
      content,
      // Keep the current route slug accepted, but use canonical slug in data.
      slug: parsed.entry.slug,
      sources: parsed.entry.sources,
    } as Entry;
  }

  return null;
}

export function getEntriesByTag(tag: string): EntryMeta[] {
  const allEntries = getAllEntries();
  return allEntries.filter((entry) => entry.tags.includes(tag));
}

export function getAllTags(): string[] {
  const allEntries = getAllEntries();
  const tags = new Set<string>();
  allEntries.forEach((entry) => entry.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

export function getAllCategories(): string[] {
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .filter((name) => {
      const categoryPath = path.join(CONTENT_DIR, name);
      const files = fs
        .readdirSync(categoryPath)
        .filter((f) => f.endsWith(".mdx"));
      return files.length > 0;
    });
}

export function getRecentEntries(count: number = 5): EntryMeta[] {
  return getAllEntries().slice(0, count);
}

export function getPinnedEntries(): EntryMeta[] {
  return getAllEntries().filter((entry) => entry.pinned);
}
