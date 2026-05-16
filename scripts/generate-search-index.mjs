import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "src/content");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const SEARCH_INDEX_PATH = path.join(PUBLIC_DIR, "search-index.json");
const SW_CONFIG_PATH = path.join(PUBLIC_DIR, "sw-config.js");

function getContentEntries() {
  const entries = [];

  const categories = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const category of categories) {
    const categoryPath = path.join(CONTENT_DIR, category);
    const files = fs
      .readdirSync(categoryPath)
      .filter((file) => file.endsWith(".mdx"));

    for (const file of files) {
      const fullPath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const slug = file.replace(/\.mdx$/, "");

      entries.push({
        title: data.title,
        slug,
        category,
        type: data.type,
        tags: data.tags || [],
        summary: data.summary,
        difficulty: data.difficulty,
        technologies: data.technologies || [],
        updatedAt: data.updatedAt || data.createdAt || "",
      });
    }
  }

  return entries;
}

function buildSearchIndex(entries) {
  return [...entries]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || 0).getTime() -
        new Date(a.updatedAt || 0).getTime(),
    )
    .map((entry) => ({
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

function buildPwaRoutes(entries) {
  const categories = [...new Set(entries.map((entry) => entry.category))].sort();
  const tags = [...new Set(entries.flatMap((entry) => entry.tags))].sort();

  const routes = new Set([
    "/",
    "/search",
    "/tags",
    "/offline",
    "/manifest.webmanifest",
    "/robots.txt",
    "/sitemap.xml",
    "/icon.svg",
    "/favicon.ico",
    "/apple-icon",
    "/pwa-icons/icon-192.png",
    "/pwa-icons/icon-512.png",
    "/search-index.json",
  ]);

  categories.forEach((category) => {
    routes.add(`/knowledge/${category}`);
  });

  entries.forEach((entry) => {
    routes.add(`/knowledge/${entry.category}/${entry.slug}`);
  });

  tags.forEach((tag) => {
    routes.add(`/tags/${encodeURIComponent(tag)}`);
  });

  return [...routes];
}

function writeServiceWorkerConfig(routes) {
  const version = `kks-${Date.now()}`;
  const contents = `self.__KKS_SW_VERSION = ${JSON.stringify(version)};\nself.__KKS_APP_ROUTES = ${JSON.stringify(routes, null, 2)};\n`;
  fs.writeFileSync(SW_CONFIG_PATH, contents);
}

const entries = getContentEntries();
const searchIndex = buildSearchIndex(entries);
const pwaRoutes = buildPwaRoutes(entries);

fs.writeFileSync(SEARCH_INDEX_PATH, JSON.stringify(searchIndex, null, 2));
writeServiceWorkerConfig(pwaRoutes);

console.log(
  `Search index generated: ${searchIndex.length} entries -> ${SEARCH_INDEX_PATH}`,
);
console.log(
  `Service worker config generated: ${pwaRoutes.length} routes -> ${SW_CONFIG_PATH}`,
);
