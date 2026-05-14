# Kanata Knowledge System (KKS)

A Developer Knowledge Operating System — a personal engineering intelligence dashboard for externalizing and retrieving developer knowledge.

## Vision

KKS is a high-speed retrieval system for the working developer's accumulated knowledge. It centralizes patterns, commands, architectural decisions, AI prompts, and debugging heuristics into a single, fast, searchable surface.

## Tech Stack

- **Framework:** Next.js 15+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** MDX with gray-matter + next-mdx-remote
- **Search:** Fuse.js (client-side fuzzy search)
- **Syntax Highlighting:** Shiki (server-side)
- **Fonts:** Inter (UI) + JetBrains Mono (code)

## Architecture

- **Server Components by default** — Minimal client JavaScript
- **Content-as-code** — MDX files in `/content` directory as database
- **Static generation** — All routes pre-rendered at build time
- **No database in Phase 1** — Filesystem-based MDX

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── layout/      # Dashboard layout components
│   ├── knowledge/   # Knowledge entry components
│   ├── search/      # Search and filter components
│   ├── code/        # Code block components
│   └── ui/          # Reusable UI components
├── content/         # MDX content files by category
├── docs/            # Documentation files
├── lib/             # Utility functions and data access
└── types/           # TypeScript type definitions
```

## Content Categories

- nextjs
- mongodb
- express
- typescript
- architecture
- debugging
- snippets
- cli
- ai
- workflows
- deployment
- performance
- security

## Phase 1 Features

- Static site with MDX content
- Client-side search with Fuse.js
- Command palette (Cmd+K)
- Basic sidebar navigation
- Code blocks with Shiki highlighting
- Copy to clipboard
- Mobile responsive

## Performance Targets

- LCP < 1.2s
- FID/INP < 100ms
- CLS < 0.05
- TTFB < 200ms (CDN edge)

## License

MIT
