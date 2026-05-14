import Link from "next/link";
import { CATEGORIES } from "@/lib/content";

export function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-64 flex-col border-r border-border bg-card h-full overflow-y-auto">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-accent font-bold text-lg">KKS</span>
          <span className="text-muted text-sm">v1.0</span>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 px-2">
            Categories
          </h3>
          <ul className="space-y-1">
            {CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/knowledge/${cat.slug}`}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-border/50 rounded-md transition-colors"
                >
                  <span className="text-base">{cat.icon}</span>
                  <span>{cat.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 px-2">
            Quick Access
          </h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="/search"
                className="flex items-center gap-3 px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-border/50 rounded-md transition-colors"
              >
                <span className="text-base">⌕</span>
                <span>Search</span>
              </Link>
            </li>
            <li>
              <Link
                href="/tags"
                className="flex items-center gap-3 px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-border/50 rounded-md transition-colors"
              >
                <span className="text-base">#</span>
                <span>Tags</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted">Kanata Knowledge System</p>
      </div>
    </aside>
  );
}
