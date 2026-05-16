import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";

export default function OfflinePage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-6 py-16">
      <div className="w-full rounded-3xl border border-border/50 bg-card/60 p-8 text-center shadow-xl shadow-black/20">
        <div className="flex justify-center">
          <BrandLogo size="lg" showName showSubtitle nameVariant="full" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent/85">
          Offline Mode
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
          KKS is not connected right now
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          The app is installed and cached, but this page is not available offline
          yet. Open a cached entry, category, or the home dashboard once and it
          will be ready next time.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-xl border border-accent/25 bg-accent/10 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-accent/15"
          >
            Go Home
          </Link>
          <Link
            href="/search"
            className="rounded-xl border border-border/50 bg-background/70 px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            Open Search
          </Link>
        </div>
      </div>
    </div>
  );
}
