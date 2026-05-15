"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Tags } from "lucide-react";
import { CATEGORIES } from "@/lib/taxonomy";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-muted hover:text-foreground md:hidden"
        aria-label="Open menu"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          data-dashboard-overlay="open"
        >
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <nav className="fixed inset-y-0 start-0 w-72 overflow-y-auto border-e border-border bg-card">
            <div className="flex items-center justify-between border-b border-border p-6">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="text-lg font-bold text-accent"
              >
                KKS
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="text-muted hover:text-foreground"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <div className="mb-6">
                <h3 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  Quick Access
                </h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/search"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground/80 hover:bg-border/50 hover:text-foreground"
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-foreground/5 text-muted">
                        <Search className="h-4 w-4" strokeWidth={2.15} />
                      </span>
                      <span>Search</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tags"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground/80 hover:bg-border/50 hover:text-foreground"
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-foreground/5 text-muted">
                        <Tags className="h-4 w-4" strokeWidth={2.15} />
                      </span>
                      <span>Tags</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted">
                  Categories
                </h3>
                <ul className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/knowledge/${cat.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground/80 hover:bg-border/50 hover:text-foreground"
                      >
                        <CategoryIcon category={cat} size="sm" />
                        <span>{cat.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
