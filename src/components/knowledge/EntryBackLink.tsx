import Link from "next/link";
import { ChevronRight } from "lucide-react";

type EntryBackLinkProps = {
  href: string;
  label: string;
};

export function EntryBackLink({ href, label }: EntryBackLinkProps) {
  return (
    <Link
      href={href}
      className="mb-6 inline-flex items-center gap-3 rounded-lg border border-border/50 bg-card/40 px-3 py-2 text-sm text-muted transition-colors hover:border-border hover:text-foreground"
    >
      <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.15} />
      <span>{label}</span>
      <kbd
        dir="ltr"
        className="inline-flex items-center rounded-md border border-border/60 bg-background px-2 py-1 text-[11px] font-semibold text-muted/80"
      >
        B
      </kbd>
    </Link>
  );
}
