"use client";

import { useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearch } from "@/lib/use-search";
import { SearchInput } from "@/components/search/SearchInput";
import { FilterPanel } from "@/components/search/FilterPanel";
import { SearchResults } from "@/components/search/SearchResults";

export function SearchPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { query, setQuery, results, allEntries } = useSearch();

  const activeCategory = searchParams.get("category");
  const activeType = searchParams.get("type");
  const activeDifficulty = searchParams.get("difficulty");
  const activeTags = searchParams.getAll("tag");

  const updateParams = useCallback(
    (updates: Record<string, string | string[] | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        params.delete(key);
        if (value === null) continue;
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.set(key, value);
        }
      }

      router.push(`/search?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const categories = useMemo(
    () => [...new Set(allEntries.map((e) => e.category))].sort(),
    [allEntries]
  );
  const types = useMemo(
    () => [...new Set(allEntries.map((e) => e.type))].sort(),
    [allEntries]
  );
  const difficulties = ["beginner", "intermediate", "advanced"];
  const tags = useMemo(
    () => [...new Set(allEntries.flatMap((e) => e.tags))].sort(),
    [allEntries]
  );

  const filteredResults = useMemo(() => {
    let filtered = results;

    if (activeCategory) {
      filtered = filtered.filter((e) => e.category === activeCategory);
    }
    if (activeType) {
      filtered = filtered.filter((e) => e.type === activeType);
    }
    if (activeDifficulty) {
      filtered = filtered.filter((e) => e.difficulty === activeDifficulty);
    }
    if (activeTags.length > 0) {
      filtered = filtered.filter((e) =>
        activeTags.every((tag) => e.tags.includes(tag))
      );
    }

    return filtered;
  }, [results, activeCategory, activeType, activeDifficulty, activeTags]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Search</h1>
        <p className="text-muted mt-1">
          Find any entry instantly across all categories
        </p>
      </div>

      <SearchInput value={query} onChange={setQuery} autoFocus />

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        <aside className="space-y-4">
          <FilterPanel
            categories={categories}
            types={types}
            difficulties={difficulties}
            tags={tags}
            activeCategory={activeCategory}
            activeType={activeType}
            activeDifficulty={activeDifficulty}
            activeTags={activeTags}
            onCategoryChange={(cat) => updateParams({ category: cat })}
            onTypeChange={(type) => updateParams({ type })}
            onDifficultyChange={(diff) => updateParams({ difficulty: diff })}
            onTagToggle={(tag) => {
              const newTags = activeTags.includes(tag)
                ? activeTags.filter((t) => t !== tag)
                : [...activeTags, tag];
              updateParams({ tag: newTags.length > 0 ? newTags : null });
            }}
            onClearAll={() => {
              router.push("/search", { scroll: false });
            }}
          />
        </aside>

        <main>
          <SearchResults results={filteredResults} />
        </main>
      </div>
    </div>
  );
}
