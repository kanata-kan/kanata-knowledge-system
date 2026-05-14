"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/taxonomy";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 text-muted hover:text-foreground"
        aria-label="Open menu"
      >
        <svg
          className="w-5 h-5"
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
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <nav className="fixed inset-y-0 left-0 w-72 bg-card border-r border-border overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="text-accent font-bold text-lg"
              >
                KKS
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="text-muted hover:text-foreground"
              >
                <svg
                  className="w-5 h-5"
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
                <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 px-2">
                  Quick Access
                </h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/search"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-border/50 rounded-md"
                    >
                      <span>⌕</span>
                      <span>Search</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tags"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-border/50 rounded-md"
                    >
                      <span>#</span>
                      <span>Tags</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 px-2">
                  Categories
                </h3>
                <ul className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/knowledge/${cat.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-border/50 rounded-md"
                      >
                        <span>{cat.icon}</span>
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
