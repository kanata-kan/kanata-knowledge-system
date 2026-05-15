import Link from "next/link";
import { Search, Tags } from "lucide-react";
import { CATEGORIES } from "@/lib/taxonomy";
import {
  CATEGORY_SHORTCUTS,
  QUICK_NAV_SHORTCUTS,
} from "@/lib/dashboard-shortcuts";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

export function Sidebar() {
  const homeShortcut = QUICK_NAV_SHORTCUTS.find((item) => item.href === "/");
  const searchShortcut = QUICK_NAV_SHORTCUTS.find(
    (item) => item.href === "/search",
  );
  const tagsShortcut = QUICK_NAV_SHORTCUTS.find((item) => item.href === "/tags");

  return (
    <aside className="hidden h-full flex-col overflow-y-auto border-e border-border/50 bg-card/50 md:flex md:w-72">
      <div className="border-b border-border/50 p-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-xl font-bold text-accent">KKS</span>
          <span className="text-sm font-medium text-muted/70">v1.0</span>
          {homeShortcut && (
            <kbd
              dir="ltr"
              className="ms-auto inline-flex items-center rounded-md border border-border/60 bg-background px-2 py-1 text-[11px] font-semibold text-muted/80"
            >
              {homeShortcut.key}
            </kbd>
          )}
        </Link>
      </div>

      <nav className="flex-1 space-y-8 p-5">
        <div>
          <h3 className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted/70">
            Categories
          </h3>
          <ul className="space-y-1">
            {CATEGORIES.map((cat, index) => (
              <li key={cat.slug}>
                <Link
                  href={`/knowledge/${cat.slug}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 transition-all duration-200 hover:bg-foreground/5 hover:text-foreground"
                >
                  <CategoryIcon category={cat} size="sm" />
                  <span className="font-medium">{cat.label}</span>
                  {CATEGORY_SHORTCUTS[index] && (
                    <kbd
                      dir="ltr"
                      className="ms-auto inline-flex items-center rounded-md border border-border/60 bg-background px-2 py-1 text-[11px] font-semibold text-muted/80"
                    >
                      {CATEGORY_SHORTCUTS[index].key}
                    </kbd>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted/70">
            Quick Access
          </h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="/search"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 transition-all duration-200 hover:bg-foreground/5 hover:text-foreground"
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-foreground/5 text-muted">
                  <Search className="h-4 w-4" strokeWidth={2.15} />
                </span>
                <span className="font-medium">Search</span>
                {searchShortcut && (
                  <kbd
                    dir="ltr"
                    className="ms-auto inline-flex items-center rounded-md border border-border/60 bg-background px-2 py-1 text-[11px] font-semibold text-muted/80"
                  >
                    {searchShortcut.key}
                  </kbd>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/tags"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 transition-all duration-200 hover:bg-foreground/5 hover:text-foreground"
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-foreground/5 text-muted">
                  <Tags className="h-4 w-4" strokeWidth={2.15} />
                </span>
                <span className="font-medium">Tags</span>
                {tagsShortcut && (
                  <kbd
                    dir="ltr"
                    className="ms-auto inline-flex items-center rounded-md border border-border/60 bg-background px-2 py-1 text-[11px] font-semibold text-muted/80"
                  >
                    {tagsShortcut.key}
                  </kbd>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="border-t border-border/50 p-5">
        <p className="text-xs font-medium text-muted/70">
          Kanata Knowledge System
        </p>
      </div>
    </aside>
  );
}
