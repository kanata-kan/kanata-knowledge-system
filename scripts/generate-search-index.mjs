import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "src/content");
const OUTPUT_PATH = path.join(process.cwd(), "public/search-index.json");

function buildSearchIndex() {
  const entries = [];

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
        title: data.title,
        slug,
        category,
        type: data.type,
        tags: data.tags || [],
        summary: data.summary,
        difficulty: data.difficulty,
        technologies: data.technologies || [],
      });
    }
  }

  return entries.sort(
    (a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0)
  );
}

const index = buildSearchIndex();
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(index, null, 2));
console.log(`Search index generated: ${index.length} entries → ${OUTPUT_PATH}`);
