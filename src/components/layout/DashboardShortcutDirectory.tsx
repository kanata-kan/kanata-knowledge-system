"use client";

import { useEffect, useState } from "react";
import { Keyboard } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  CATEGORY_SHORTCUTS,
  QUICK_NAV_SHORTCUTS,
  REFERENCE_SHORTCUTS,
  getBackShortcut,
  type ShortcutItem,
} from "@/lib/dashboard-shortcuts";

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) ||
    target.closest("[contenteditable='true']") !== null
  );
}

function ShortcutKey({ value }: { value: string }) {
  return (
    <kbd
      dir="ltr"
      className="inline-flex min-w-8 items-center justify-center rounded-md border border-border/60 bg-background px-2 py-1 text-[11px] font-semibold text-muted/85"
    >
      {value}
    </kbd>
  );
}

function ShortcutRow({ item }: { item: ShortcutItem }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border/50 bg-background/40 px-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{item.label}</p>
        <p className="mt-1 text-xs leading-5 text-muted">{item.description}</p>
      </div>
      <ShortcutKey value={item.key} />
    </div>
  );
}

export function DashboardShortcutDirectory() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const backShortcut = getBackShortcut(pathname);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isQuestionMark =
        event.key === "?" || (event.key === "/" && event.shiftKey);

      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      if (!isQuestionMark || isEditableTarget(event.target)) {
        return;
      }

      const overlayOpen = document.querySelector("[data-dashboard-overlay='open']");

      if (overlayOpen && !open) {
        return;
      }

      event.preventDefault();
      setOpen((current) => !current);
    }

    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [open]);

  return (
    <>
        <div className="flex items-center gap-2">
        {backShortcut && (
          <div className="hidden max-w-[16rem] md:inline-flex items-center gap-2 rounded-lg border border-border/50 bg-background px-3 py-1.5 text-xs text-muted/80">
            <ShortcutKey value={backShortcut.key} />
            <span className="truncate">{backShortcut.label}</span>
          </div>
        )}

        <div className="hidden xl:inline-flex items-center gap-2 rounded-lg border border-border/50 bg-background px-3 py-1.5 text-xs text-muted/80">
          <ShortcutKey value="Ctrl + K" />
          <span>Search</span>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-background px-3 py-1.5 text-xs font-medium text-muted/80 transition-colors hover:border-accent/30 hover:text-foreground"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label="Open keyboard shortcut directory"
        >
          <Keyboard className="h-3.5 w-3.5" strokeWidth={2.1} />
          <ShortcutKey value="?" />
          <span className="hidden sm:inline">Keys</span>
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-10"
          data-dashboard-overlay="open"
        >
          <button
            type="button"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="Close keyboard shortcut directory"
          />

          <div className="relative z-10 w-full max-w-3xl rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-border/50 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Keyboard Directory
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Navigate the dashboard, sidebar, and pages without touching the
                  mouse.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-background px-3 py-1.5 text-xs text-muted/80 transition-colors hover:text-foreground"
              >
                <ShortcutKey value="Esc" />
                <span>Close</span>
              </button>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-2">
              <section className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted/70">
                  Page Navigation
                </h3>
                {backShortcut && <ShortcutRow item={backShortcut} />}
                {QUICK_NAV_SHORTCUTS.map((item) => (
                  <ShortcutRow key={item.key} item={item} />
                ))}
              </section>

              <section className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted/70">
                  Sidebar Categories
                </h3>
                {CATEGORY_SHORTCUTS.map((item) => (
                  <ShortcutRow key={item.key} item={item} />
                ))}
              </section>

              <section className="space-y-3 lg:col-span-2">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted/70">
                  Reference
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {REFERENCE_SHORTCUTS.map((item) => (
                    <ShortcutRow key={item.key} item={item} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
