"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Search, Tags, X } from "lucide-react";
import { CATEGORIES } from "@/lib/taxonomy";
import {
  CATEGORY_SHORTCUTS,
  QUICK_NAV_SHORTCUTS,
} from "@/lib/dashboard-shortcuts";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { BrandLogo } from "@/components/ui/BrandLogo";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

type NavigatorWithStandalone = Navigator & {
  standalone?: boolean;
};

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const homeShortcut = QUICK_NAV_SHORTCUTS.find((item) => item.href === "/");
  const searchShortcut = QUICK_NAV_SHORTCUTS.find(
    (item) => item.href === "/search",
  );
  const tagsShortcut = QUICK_NAV_SHORTCUTS.find((item) => item.href === "/tags");

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    const standaloneQuery = window.matchMedia("(display-mode: standalone)");
    const standaloneNavigator = window.navigator as NavigatorWithStandalone;

    function syncInstalledState() {
      setIsInstalled(
        standaloneQuery.matches || standaloneNavigator.standalone === true,
      );
    }

    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    }

    function handleAppInstalled() {
      setIsInstalled(true);
      setDeferredPrompt(null);
    }

    syncInstalledState();

    standaloneQuery.addEventListener("change", syncInstalledState);
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      standaloneQuery.removeEventListener("change", syncInstalledState);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  async function installApp() {
    if (!deferredPrompt) {
      return;
    }

    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-xl border border-border/50 bg-background/70 p-2 text-muted transition-colors hover:border-accent/30 hover:text-foreground md:hidden"
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
            className="fixed inset-0 bg-black/72 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <nav className="dashboard-mobile-panel dashboard-scroll fixed inset-y-0 start-0 flex w-[min(86vw,23rem)] flex-col overflow-y-auto border-e border-border/40 bg-card/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="border-b border-border/40 px-5 py-6">
              <div className="flex items-center justify-between gap-4">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex min-w-0 items-center gap-3"
                >
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
                      className="inline-flex items-center rounded-md border border-border/60 bg-background px-2 py-1 text-[11px] font-semibold text-muted/80"
                    >
                      {homeShortcut.key}
                    </kbd>
                  )}
                </Link>

                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-background/60 text-muted transition-colors hover:text-foreground"
                  aria-label="Close menu"
                >
                  <X className="h-4.5 w-4.5" strokeWidth={2.1} />
                </button>
              </div>

              <p className="mt-3 max-w-[28ch] text-xs leading-relaxed text-muted/72">
                Lightweight knowledge workspace for code notes, workflows, and
                fast retrieval on mobile.
              </p>
            </div>

            <div className="flex flex-1 flex-col justify-between px-4 py-4">
              <div className="space-y-4">
                <section className="rounded-2xl border border-border/30 bg-background/25 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                  <div className="mb-3 flex items-center justify-between gap-3 px-1">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted/70">
                        App
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {isInstalled ? "Installed" : "Offline Ready"}
                      </p>
                    </div>
                    <span className="rounded-full border border-border/50 bg-background/70 px-2.5 py-1 text-[11px] font-medium text-muted/75">
                      PWA
                    </span>
                  </div>

                  {deferredPrompt && !isInstalled ? (
                    <button
                      type="button"
                      onClick={installApp}
                      className="flex w-full items-center justify-between gap-3 rounded-xl border border-accent/20 bg-accent/10 px-3 py-3 text-start transition-colors hover:border-accent/35 hover:bg-accent/14"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Install KKS
                        </p>
                        <p className="mt-1 text-xs leading-5 text-muted">
                          Add it to your home screen for app-like access and
                          offline reading.
                        </p>
                      </div>
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-background/70 text-accent">
                        <Download className="h-4 w-4" strokeWidth={2.15} />
                      </span>
                    </button>
                  ) : (
                    <div className="rounded-xl border border-border/40 bg-background/55 px-3 py-3">
                      <p className="text-sm font-medium text-foreground">
                        {isInstalled
                          ? "KKS is installed on this device."
                          : "You can browse cached knowledge entries even with weak connectivity."}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-muted">
                        {isInstalled
                          ? "Launch it like a native app from your home screen."
                          : "If install prompt does not appear, use your browser menu and choose Add to Home Screen."}
                      </p>
                    </div>
                  )}
                </section>

                <section className="rounded-2xl border border-border/30 bg-background/20 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                  <div className="mb-4 px-1">
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted/70">
                      Quick Access
                    </h3>
                  </div>

                  <ul className="space-y-1.5">
                    <li>
                      <Link
                        href="/search"
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground/88 transition-all duration-200 hover:bg-white/5 hover:text-foreground"
                      >
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-foreground/5 text-muted transition-colors duration-200 group-hover:border-border/70 group-hover:bg-foreground/10 group-hover:text-foreground">
                          <Search className="h-4 w-4" strokeWidth={2.15} />
                        </span>
                        <span className="min-w-0 flex-1 font-medium">
                          Search
                        </span>
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
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground/88 transition-all duration-200 hover:bg-white/5 hover:text-foreground"
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

                <section className="rounded-2xl border border-border/30 bg-background/20 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                  <div className="mb-4 flex items-center justify-between px-1">
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted/70">
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
                          onClick={() => setOpen(false)}
                          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground/88 transition-all duration-200 hover:bg-white/5 hover:text-foreground"
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
              </div>

              <div className="pt-4">
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/30 bg-background/20 px-3 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                  <div className="min-w-0 flex items-center gap-3">
                    <BrandLogo size="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground/90">
                        Kanata Knowledge System
                      </p>
                      <p className="mt-1 text-xs text-muted/70">
                        Fast notes. Offline reading. Clean retrieval.
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 rounded-lg border border-border/50 bg-background/60 px-2.5 py-1.5 text-[11px] font-medium text-muted/70">
                    {CATEGORIES.length} groups
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
