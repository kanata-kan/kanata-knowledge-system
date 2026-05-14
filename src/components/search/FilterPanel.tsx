"use client";

import { cn } from "@/lib/utils";

type FilterPanelProps = {
  categories: string[];
  types: string[];
  difficulties: string[];
  tags: string[];
  activeCategory: string | null;
  activeType: string | null;
  activeDifficulty: string | null;
  activeTags: string[];
  onCategoryChange: (cat: string | null) => void;
  onTypeChange: (type: string | null) => void;
  onDifficultyChange: (diff: string | null) => void;
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
};

export function FilterPanel({
  categories,
  types,
  difficulties,
  tags,
  activeCategory,
  activeType,
  activeDifficulty,
  activeTags,
  onCategoryChange,
  onTypeChange,
  onDifficultyChange,
  onTagToggle,
  onClearAll,
}: FilterPanelProps) {
  const hasActiveFilters =
    activeCategory || activeType || activeDifficulty || activeTags.length > 0;

  return (
    <div className="space-y-4">
      {hasActiveFilters && (
        <button
          onClick={onClearAll}
          className="text-xs text-accent hover:text-accent/80 transition-colors"
        >
          Clear all filters
        </button>
      )}

      <FilterGroup
        label="Category"
        items={categories}
        active={activeCategory}
        onSelect={onCategoryChange}
      />

      <FilterGroup
        label="Type"
        items={types}
        active={activeType}
        onSelect={onTypeChange}
      />

      <FilterGroup
        label="Difficulty"
        items={difficulties}
        active={activeDifficulty}
        onSelect={onDifficultyChange}
      />

      {tags.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
            Tags
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 20).map((tag) => (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={cn(
                  "px-2 py-0.5 text-xs rounded border transition-colors",
                  activeTags.includes(tag)
                    ? "bg-accent/10 text-accent border-accent/30"
                    : "bg-foreground/5 text-muted border-border hover:text-foreground"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  items,
  active,
  onSelect,
}: {
  label: string;
  items: string[];
  active: string | null;
  onSelect: (value: string | null) => void;
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
        {label}
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(active === item ? null : item)}
            className={cn(
              "px-2 py-0.5 text-xs rounded border transition-colors",
              active === item
                ? "bg-accent/10 text-accent border-accent/30"
                : "bg-foreground/5 text-muted border-border hover:text-foreground"
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
