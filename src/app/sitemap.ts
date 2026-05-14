import type { MetadataRoute } from "next";
import { getAllEntries, getAllTags, CATEGORIES } from "@/lib/content";

const BASE_URL = "https://kks.kanata.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = getAllEntries();
  const tags = getAllTags();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/search`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/tags`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/knowledge/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const entryRoutes: MetadataRoute.Sitemap = entries.map((entry) => ({
    url: `${BASE_URL}/knowledge/${entry.category}/${entry.slug}`,
    lastModified: new Date(entry.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const tagRoutes: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${BASE_URL}/tags/${tag}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...categoryRoutes, ...entryRoutes, ...tagRoutes];
}
