export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-full">
      <main className="flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Kanata Knowledge System
        </h1>
        <p className="text-muted text-lg max-w-md">
          Fast developer knowledge retrieval dashboard
        </p>
      </main>
    </div>
  );
}
