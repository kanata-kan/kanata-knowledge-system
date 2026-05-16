export type EntryType =
  | "snippet"
  | "command"
  | "note"
  | "pattern"
  | "prompt"
  | "workflow"
  | "reference"
  | "debug";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Category = "architecture" | "cli";

export type EntryMeta = {
  title: string;
  slug: string;
  category: Category;
  type: EntryType;
  difficulty: Difficulty;
  tags: string[];
  summary: string;
  createdAt: string;
  updatedAt: string;
  pinned?: boolean;
  technologies?: string[];
  relatedSlugs?: string[];
  sources?: EntrySource[];
};

export type Entry = EntryMeta & {
  content: string;
};

import type { LucideIcon } from "lucide-react";

export type EntrySource = {
  label: string;
  href: string;
};

export type CategoryTone = {
  iconClassName: string;
  surfaceClassName: string;
};

export type CategoryInfo = {
  slug: Category;
  label: string;
  description: string;
  icon: LucideIcon;
  tone: CategoryTone;
};
