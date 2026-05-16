import Link from "next/link";
import { Search, Tags } from "lucide-react";
import { CATEGORIES } from "@/lib/taxonomy";
import {
  CATEGORY_SHORTCUTS,
  QUICK_NAV_SHORTCUTS,
} from "@/lib/dashboard-shortcuts";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Sidebar() {
  const homeShortcut = QUICK_NAV_SHORTCUTS.find((item) => item.href === "/");
  const searchShortcut = QUICK_NAV_SHORTCUTS.find(
    (item) => item.href === "/search",
  );
  const tagsShortcut = QUICK_NAV_SHORTCUTS.find(
    (item) => item.href === "/tags",
  );

  return (
    <aside className="hidden h-full shrink-0 flex-col overflow-hidden border-e border-border/40 bg-card/80 backdrop-blur-xl md:flex md:w-[340px] xl:w-[360px]">
      <div className="border-b border-border/40 px-5 py-6">
        <Link href="/" className="flex items-center gap-3">
          <BrandLogo
            size="md"
            showName
            showSubtitle
            nameVariant="short"
          />

          <span className="rounded-md border border-border/60 bg-background/70 px-2 py-1 text-[11px] font-semibold text-muted/80">
            v1.0
          </span>

          {homeShortcut && (
            <kbd
              dir="ltr"
              className="ms-auto inline-flex items-center rounded-md border border-border/60 bg-background px-2 py-1 text-[11px] font-semibold text-muted/80"
            >
              {homeShortcut.key}
            </kbd>
          )}
        </Link>

        <p className="mt-3 max-w-[24ch] text-xs leading-relaxed text-muted/70">
          Engineering knowledge workspace for fast retrieval and deep thinking.
        </p>
      </div>

      <nav className="dashboard-scroll flex flex-1 flex-col justify-between overflow-y-auto px-5 py-6">
        <div className="space-y-6">
          <section className="rounded-2xl border border-border/30 bg-background/20 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <div className="mb-4 flex items-center justify-between px-2">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted/70">
                Categories
              </h3>
              <span className="text-[11px] font-medium text-muted/60">
                {CATEGORIES.length}
              </span>
            </div>

            <ul className="space-y-1.5">
              {CATEGORIES.map((cat, index) => (
                <li key={cat.slug}>
                  <Link
                    href={`/knowledge/${cat.slug}`}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground/90 transition-all duration-200 hover:bg-white/5 hover:text-foreground"
                  >
                    <span className="shrink-0 transition-transform duration-200 group-hover:scale-105">
                      <CategoryIcon category={cat} size="sm" />
                    </span>

                    <span className="min-w-0 flex-1 truncate font-medium">
                      {cat.label}
                    </span>

                    {CATEGORY_SHORTCUTS[index] && (
                      <kbd
                        dir="ltr"
                        className="inline-flex items-center rounded-md border border-border/60 bg-background px-2 py-1 text-[11px] font-semibold text-muted/80"
                      >
                        {CATEGORY_SHORTCUTS[index].key}
                      </kbd>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border/30 bg-background/20 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <div className="mb-4 px-2">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted/70">
                Quick Access
              </h3>
            </div>

            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/search"
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground/90 transition-all duration-200 hover:bg-white/5 hover:text-foreground"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-foreground/5 text-muted transition-colors duration-200 group-hover:border-border/70 group-hover:bg-foreground/10 group-hover:text-foreground">
                    <Search className="h-4 w-4" strokeWidth={2.15} />
                  </span>

                  <span className="min-w-0 flex-1 font-medium">Search</span>

                  {searchShortcut && (
                    <kbd
                      dir="ltr"
                      className="inline-flex items-center rounded-md border border-border/60 bg-background px-2 py-1 text-[11px] font-semibold text-muted/80"
                    >
                      {searchShortcut.key}
                    </kbd>
                  )}
                </Link>
              </li>

              <li>
                <Link
                  href="/tags"
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground/90 transition-all duration-200 hover:bg-white/5 hover:text-foreground"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-foreground/5 text-muted transition-colors duration-200 group-hover:border-border/70 group-hover:bg-foreground/10 group-hover:text-foreground">
                    <Tags className="h-4 w-4" strokeWidth={2.15} />
                  </span>

                  <span className="min-w-0 flex-1 font-medium">Tags</span>

                  {tagsShortcut && (
                    <kbd
                      dir="ltr"
                      className="inline-flex items-center rounded-md border border-border/60 bg-background px-2 py-1 text-[11px] font-semibold text-muted/80"
                    >
                      {tagsShortcut.key}
                    </kbd>
                  )}
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <div className="pt-6">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/30 bg-background/20 px-3 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <div className="min-w-0 flex items-center gap-3">
              <BrandLogo size="sm" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground/90">
                  Kanata Knowledge System
                </p>
                <p className="mt-1 text-xs text-muted/70">
                  Built for structured technical thinking.
                </p>
              </div>
            </div>

            <div className="shrink-0 rounded-lg border border-border/50 bg-background/60 px-2.5 py-1.5 text-[11px] font-medium text-muted/70">
              groups {CATEGORIES.length}
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}
