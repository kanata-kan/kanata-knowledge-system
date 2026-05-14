"use client";

import { useEffect } from "react";
import { useRecentEntries } from "@/lib/use-recent";

type Props = {
  title: string;
  slug: string;
  category: string;
};

export function EntryViewTracker({ title, slug, category }: Props) {
  const { addEntry } = useRecentEntries();

  useEffect(() => {
    addEntry({ title, slug, category });
  }, [title, slug, category, addEntry]);

  return null;
}
