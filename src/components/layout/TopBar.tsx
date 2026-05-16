import Link from "next/link";
import { MobileNav } from "./MobileNav";
import { DashboardShortcutDirectory } from "./DashboardShortcutDirectory";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function TopBar() {
  return (
    <header className="dashboard-topbar flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border/50 bg-card/50 px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-4">
        <MobileNav />
        <Link href="/" className="md:hidden" aria-label="Go to home">
          <BrandLogo size="sm" />
        </Link>
        <span className="hidden truncate text-sm font-medium text-muted/80 md:block">
          Developer Knowledge Dashboard
        </span>
      </div>

      <div className="flex items-center gap-3">
        <DashboardShortcutDirectory />
      </div>
    </header>
  );
}
