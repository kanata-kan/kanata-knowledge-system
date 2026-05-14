import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Entry, EntryMeta, Category } from "@/types/content";
export { CATEGORIES } from "./taxonomy";

const CONTENT_DIR = path.join(process.cwd(), "src/content");

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
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const slug = file.replace(/\.mdx$/, "");

      entries.push({
        slug,
        category: category as Category,
        ...data,
      } as EntryMeta);
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

  const entries = files.map((file) => {
    const fullPath = path.join(categoryPath, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    const slug = file.replace(/\.mdx$/, "");

    return {
      slug,
      category: category as Category,
      ...data,
    } as EntryMeta;
  });

  return entries.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function getEntryBySlug(category: string, slug: string): Entry | null {
  const fullPath = path.join(CONTENT_DIR, category, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    category: category as Category,
    content,
    ...data,
  } as Entry;
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
