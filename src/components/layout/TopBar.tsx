import Link from "next/link";
import { MobileNav } from "./MobileNav";

export function TopBar() {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 md:px-6 shrink-0">
      <div className="flex items-center gap-3">
        <MobileNav />
        <Link href="/" className="md:hidden text-accent font-bold text-lg">
          KKS
        </Link>
        <span className="hidden md:block text-sm text-muted">
          Developer Knowledge Dashboard
        </span>
      </div>

      <div className="flex items-center gap-3">
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-muted bg-background border border-border rounded">
          <span>Ctrl</span>
          <span>+</span>
          <span>K</span>
        </kbd>
      </div>
    </header>
  );
}
