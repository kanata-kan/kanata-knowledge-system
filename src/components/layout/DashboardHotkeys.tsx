"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  CATEGORY_SHORTCUTS,
  QUICK_NAV_SHORTCUTS,
  getBackShortcut,
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

export function DashboardHotkeys() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }

      if (isEditableTarget(event.target)) {
        return;
      }

      if (document.querySelector("[data-dashboard-overlay='open']")) {
        return;
      }

      const key = event.key.toLowerCase();
      const backShortcut = getBackShortcut(pathname);

      if (key === "b" && backShortcut?.href) {
        event.preventDefault();
        router.push(backShortcut.href);
        return;
      }

      const quickShortcut = QUICK_NAV_SHORTCUTS.find(
        (shortcut) => shortcut.key.toLowerCase() === key && shortcut.href,
      );

      if (quickShortcut?.href) {
        event.preventDefault();
        router.push(quickShortcut.href);
        return;
      }

      if (!/^[1-9]$/.test(key)) {
        return;
      }

      const categoryShortcut = CATEGORY_SHORTCUTS.find(
        (shortcut) => shortcut.key === key,
      );

      if (!categoryShortcut) {
        return;
      }

      event.preventDefault();
      router.push(categoryShortcut.href);
    }

    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [pathname, router]);

  return null;
}
