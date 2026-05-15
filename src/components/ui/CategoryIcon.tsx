import type { CategoryInfo } from "@/types/content";
import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: {
    wrapper: "h-8 w-8 rounded-lg",
    icon: "h-4 w-4",
  },
  md: {
    wrapper: "h-10 w-10 rounded-xl",
    icon: "h-5 w-5",
  },
  lg: {
    wrapper: "h-14 w-14 rounded-2xl",
    icon: "h-7 w-7",
  },
} as const;

type CategoryIconProps = {
  category: CategoryInfo;
  size?: keyof typeof sizeClasses;
  className?: string;
};

export function CategoryIcon({
  category,
  size = "md",
  className,
}: CategoryIconProps) {
  const Icon = category.icon;
  const sizeClass = sizeClasses[size];

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center border border-border/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        sizeClass.wrapper,
        category.tone.surfaceClassName,
        className,
      )}
    >
      <Icon
        className={cn(sizeClass.icon, category.tone.iconClassName)}
        strokeWidth={2.15}
      />
    </span>
  );
}
