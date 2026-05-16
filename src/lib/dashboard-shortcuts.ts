import { CATEGORIES } from "@/lib/taxonomy";

export type ShortcutItem = {
  key: string;
  label: string;
  description: string;
  href?: string;
};

export type CategoryShortcutItem = ShortcutItem & {
  href: string;
  categorySlug: string;
};

const categoryLabelMap = new Map<string, string>(
  CATEGORIES.map((category) => [category.slug, category.label]),
);

export const QUICK_NAV_SHORTCUTS: ShortcutItem[] = [
  {
    key: "G",
    label: "Home",
    description: "Go to the home dashboard.",
    href: "/",
  },
  {
    key: "S",
    label: "Search",
    description: "Open the search page.",
    href: "/search",
  },
  {
    key: "T",
    label: "Tags",
    description: "Open the tags page.",
    href: "/tags",
  },
];

export const CATEGORY_SHORTCUTS: CategoryShortcutItem[] = CATEGORIES.slice(
  0,
  9,
).map((category, index) => ({
  key: String(index + 1),
  label: category.label,
  description: `Open the ${category.label} category.`,
  href: `/knowledge/${category.slug}`,
  categorySlug: category.slug,
}));

export const REFERENCE_SHORTCUTS: ShortcutItem[] = [
  {
    key: "Ctrl + K",
    label: "Command Palette",
    description: "Open global search from anywhere.",
  },
  {
    key: "?",
    label: "Key Directory",
    description: "Open the keyboard shortcuts reference.",
  },
  {
    key: "Arrow Up / Down",
    label: "Scroll",
    description: "Move through the current page.",
  },
  {
    key: "Arrow Left / Right",
    label: "Sections",
    description: "Jump between dashboard sections.",
  },
];

export function getBackShortcut(pathname: string): ShortcutItem | null {
  const normalizedPath =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  if (normalizedPath === "/") {
    return null;
  }

  if (normalizedPath === "/search" || normalizedPath === "/tags") {
    return {
      key: "B",
      label: "Back to Home",
      description: "Return to the home dashboard.",
      href: "/",
    };
  }

  if (normalizedPath.startsWith("/tags/")) {
    return {
      key: "B",
      label: "Back to Tags",
      description: "Return to the full tags list.",
      href: "/tags",
    };
  }

  const knowledgeParts = normalizedPath.split("/").filter(Boolean);

  if (knowledgeParts[0] === "knowledge" && knowledgeParts.length >= 2) {
    const categorySlug = knowledgeParts[1];
    const categoryLabel = categoryLabelMap.get(categorySlug) ?? categorySlug;

    if (knowledgeParts.length >= 3) {
      return {
        key: "B",
        label: `Back to ${categoryLabel}`,
        description: `Return to the ${categoryLabel} category page.`,
        href: `/knowledge/${categorySlug}`,
      };
    }

    return {
      key: "B",
      label: "Back to Home",
      description: "Return to the home dashboard.",
      href: "/",
    };
  }

  return {
    key: "B",
    label: "Back to Home",
    description: "Return to the home dashboard.",
    href: "/",
  };
}
