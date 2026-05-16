import Image from "next/image";
import { site } from "@/constants/site";

type BrandLogoProps = {
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  showSubtitle?: boolean;
  nameVariant?: "short" | "full";
};

const sizeClasses = {
  sm: {
    frame: "h-10 w-10 rounded-xl",
    image: 40,
    title: "text-sm",
    subtitle: "text-[11px]",
  },
  md: {
    frame: "h-11 w-11 rounded-2xl",
    image: 44,
    title: "text-sm",
    subtitle: "text-[11px]",
  },
  lg: {
    frame: "h-14 w-14 rounded-2xl",
    image: 56,
    title: "text-base",
    subtitle: "text-xs",
  },
} as const;

export function BrandLogo({
  size = "md",
  showName = false,
  showSubtitle = false,
  nameVariant = "short",
}: BrandLogoProps) {
  const config = sizeClasses[size];
  const label = nameVariant === "full" ? site.name : site.shortName;

  return (
    <span className="inline-flex items-center gap-3">
      <span
        className={`inline-flex shrink-0 items-center justify-center overflow-hidden border border-border/50 bg-background/75 shadow-[0_12px_30px_rgba(0,0,0,0.18)] ${config.frame}`}
      >
        <Image
          src="/icon.svg"
          alt={`${site.name} logo`}
          width={config.image}
          height={config.image}
          priority
          className="h-full w-full object-cover"
        />
      </span>

      {showName && (
        <span className="min-w-0">
          <span
            className={`block truncate font-semibold tracking-tight text-foreground ${config.title}`}
          >
            {label}
          </span>
          {showSubtitle && (
            <span className={`block truncate text-muted/75 ${config.subtitle}`}>
              Knowledge Dashboard
            </span>
          )}
        </span>
      )}
    </span>
  );
}
