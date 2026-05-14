import type { CategoryInfo } from "@/types/content";

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: "nextjs",
    label: "Next.js",
    description: "App Router, server components, patterns, optimization",
    icon: "▲",
  },
  {
    slug: "mongodb",
    label: "MongoDB",
    description: "Queries, aggregation, indexes, schemas, drivers",
    icon: "◆",
  },
  {
    slug: "express",
    label: "Express",
    description: "Routing, middleware, error handling, patterns",
    icon: "⚡",
  },
  {
    slug: "typescript",
    label: "TypeScript",
    description: "Types, generics, utility types, configuration",
    icon: "◇",
  },
  {
    slug: "architecture",
    label: "Architecture",
    description: "System design, decisions, patterns, principles",
    icon: "◫",
  },
  {
    slug: "snippets",
    label: "Snippets",
    description: "Reusable code fragments",
    icon: "◈",
  },
];
