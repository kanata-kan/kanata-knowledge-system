"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const MAIN_ID = "dashboard-main";
const VISIBILITY_OFFSET = 260;

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const main = document.getElementById(MAIN_ID);

    if (!(main instanceof HTMLElement)) {
      return;
    }

    const scrollContainer = main;

    function updateVisibility() {
      setVisible(scrollContainer.scrollTop > VISIBILITY_OFFSET);
    }

    updateVisibility();
    scrollContainer.addEventListener("scroll", updateVisibility, {
      passive: true,
    });

    return () => {
      scrollContainer.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => {
        const main = document.getElementById(MAIN_ID);
        main?.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/90 px-4 py-2 text-sm font-medium text-foreground shadow-lg shadow-black/20 backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-accent"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-4 w-4" strokeWidth={2.15} />
      <span>Top</span>
    </button>
  );
}
