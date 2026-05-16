"use client";

import { useEffect } from "react";

const SCROLL_STEP = 168;
const MAIN_ID = "dashboard-main";
const SECTION_SELECTOR = "[data-dashboard-section]";

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

function getSections(main: HTMLElement) {
  const scopedSections = main.querySelectorAll(SECTION_SELECTOR);
  const sectionNodes = scopedSections.length > 0 ? scopedSections : main.querySelectorAll("section");

  return Array.from(sectionNodes).filter(
    (section): section is HTMLElement => section instanceof HTMLElement,
  );
}

function getSectionTop(main: HTMLElement, section: HTMLElement) {
  return (
    section.getBoundingClientRect().top -
    main.getBoundingClientRect().top +
    main.scrollTop
  );
}

function getCurrentSectionIndex(main: HTMLElement, sections: HTMLElement[]) {
  const threshold = 32;
  let currentIndex = 0;

  for (let index = 0; index < sections.length; index += 1) {
    if (getSectionTop(main, sections[index]) - threshold <= main.scrollTop) {
      currentIndex = index;
      continue;
    }

    break;
  }

  return currentIndex;
}

function getScrollBehavior(event: KeyboardEvent): ScrollBehavior {
  return event.repeat ? "auto" : "smooth";
}

export function DashboardKeyboardNav() {
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

      if (
        ![
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "PageUp",
          "PageDown",
          "Home",
          "End",
        ].includes(event.key)
      ) {
        return;
      }

      if (isEditableTarget(event.target)) {
        return;
      }

      if (document.querySelector("[data-dashboard-overlay='open']")) {
        return;
      }

      const main = document.getElementById(MAIN_ID);

      if (!(main instanceof HTMLElement)) {
        return;
      }

      if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        main.scrollTo({
          top: event.key === "Home" ? 0 : main.scrollHeight,
          behavior: getScrollBehavior(event),
        });
        return;
      }

      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "PageUp" ||
        event.key === "PageDown"
      ) {
        const viewportStep = Math.max(main.clientHeight - 96, SCROLL_STEP * 2);
        const scrollDelta =
          event.key === "ArrowUp"
            ? -SCROLL_STEP
            : event.key === "ArrowDown"
              ? SCROLL_STEP
              : event.key === "PageUp"
                ? -viewportStep
                : viewportStep;

        event.preventDefault();
        main.scrollBy({
          top: scrollDelta,
          behavior: getScrollBehavior(event),
        });
        return;
      }

      const sections = getSections(main);

      if (sections.length === 0) {
        return;
      }

      const currentIndex = getCurrentSectionIndex(main, sections);
      const targetIndex =
        event.key === "ArrowRight"
          ? Math.max(currentIndex - 1, 0)
          : Math.min(currentIndex + 1, sections.length - 1);

      if (targetIndex === currentIndex) {
        return;
      }

      event.preventDefault();
      main.scrollTo({
        top: Math.max(getSectionTop(main, sections[targetIndex]) - 16, 0),
        behavior: getScrollBehavior(event),
      });
    }

    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, []);

  return null;
}
