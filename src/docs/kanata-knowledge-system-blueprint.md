# Kanata Knowledge System
## Architectural Blueprint — v1.0

> *A Developer Knowledge Operating System built on Kanata Foundation.*
> *Sharp. Fast. Searchable. Production-quality from day one.*

---

## Table of Contents

1. [Product Vision](#1-product-vision)
2. [Core Philosophy](#2-core-philosophy)
3. [UX Philosophy](#3-ux-philosophy)
4. [Information Architecture](#4-information-architecture)
5. [Folder Structure](#5-folder-structure)
6. [MDX Architecture](#6-mdx-architecture)
7. [Search & Filter System](#7-search--filter-system)
8. [Code Block System](#8-code-block-system)
9. [Responsive Dashboard Strategy](#9-responsive-dashboard-strategy)
10. [Layout Architecture](#10-layout-architecture)
11. [Rendering Strategy](#11-rendering-strategy)
12. [Performance Strategy](#12-performance-strategy)
13. [SEO Strategy](#13-seo-strategy)
14. [Future Evolution](#14-future-evolution)
15. [What Should Stay App-Specific](#15-what-should-stay-app-specific)
16. [What Could Be Extracted Into Kanata Foundation](#16-what-could-be-extracted-into-kanata-foundation)
17. [Deployment Strategy](#17-deployment-strategy)
18. [MVP Roadmap](#18-mvp-roadmap)
19. [Future Expansion Roadmap](#19-future-expansion-roadmap)
20. [Architectural Tradeoffs](#20-architectural-tradeoffs)

---

## 1. Product Vision

### Name

**Kanata Knowledge System** — abbreviated **KKS**.

Alternative names considered:

| Name | Notes |
|---|---|
| Kanata Brain | Too informal for a production platform |
| Kanata Atlas | Good — implies navigation, maps of knowledge |
| Kanata Codex | Strong — ancient knowledge repository feel |
| **Kanata Knowledge System** | Precise, professional, matches the ecosystem naming |

KKS is the recommended canonical name. "Codex" is a strong internal code name if branding flexibility is needed later.

### What It Is

KKS is a **Developer Knowledge Operating System** — a personal engineering intelligence dashboard. It is where a developer externalizes their brain: every pattern they've discovered, every command they've forgotten the syntax of, every architectural decision they've made, every AI prompt they've refined — all centralized, indexed, and instantly retrievable.

It is not a blog. It is not a wiki. It is not a documentation site. It is a **high-speed retrieval system** for the working developer's accumulated knowledge.

### Why It Matters

The average developer carries an enormous mental load: CLI flags, configuration patterns, debugging heuristics, API shapes, environment variables, deployment recipes. This knowledge lives scattered across:

- Browser bookmarks (never organized)
- Notion pages (never searched)
- Old Slack messages (never found again)
- Stack Overflow tabs (never bookmarked properly)
- GitHub gists (never categorized)
- Personal notes (never formatted)

KKS collapses all of this into a single, fast, searchable surface. The product promise: **if you wrote it down once, you find it instantly**.

---

## 2. Core Philosophy

KKS is built on the same philosophy as Kanata Foundation itself.

**No premature abstraction.** Build what is needed. Extract what proves useful.

**Content-as-code.** MDX files in a `/content` directory are the database. No Postgres, no Supabase, no backend to maintain in Phase 1. The content is versioned, diffable, portable, and developer-native.

**Server by default.** Every component that can be a Server Component is. Client interactivity is added surgically where the UX demands it — search input, keyboard navigation, copy-to-clipboard.

**The retrieval experience is the product.** The content is only as valuable as the speed and accuracy with which it can be found. Search, filtering, and navigation are not features — they are the core of the system.

**Composable, not configurable.** Pages are assembled from layout primitives and UI primitives. There is no component that accepts 40 props. Complexity is handled by composition.

---

## 3. UX Philosophy

### The Dashboard Metaphor

KKS presents as a **developer dashboard**, not a content site. The mental model for the user is: *I'm in a control room. I can see everything. I can find anything.*

This has direct UI consequences:

- Dense, information-rich layouts are preferred over spacious editorial layouts
- Sidebar navigation is persistent, not hidden behind a hamburger
- Search is always accessible — not buried in a header
- Content cards show enough metadata to be scannable without clicking
- The sidebar and filtering panel provide ambient orientation at all times

### Speed-First Interaction

Every interaction should feel instant. No waiting for search results to appear. No full-page navigation for filtering. The UX principle: **the user should never feel the latency of the system**.

- Client-side filtering for already-loaded category pages
- Optimistic UI patterns for interactions
- Prefetching of adjacent navigation nodes
- Minimal layout shift on load

### Keyboard-First Navigation

KKS users are developers. Developers live on the keyboard. The product must be fully navigable via keyboard:

- `/` or `Cmd+K` opens global search
- Arrow keys navigate search results
- `Enter` selects a result
- `Escape` closes modals/palettes
- Tag and filter chips are focusable and activatable via keyboard

### Progressive Disclosure

Not everything is visible at once. The UX unfolds in layers:

- **Level 1:** Category sidebar + entry cards (quick scan)
- **Level 2:** Entry card metadata on hover/focus (tags, difficulty, type)
- **Level 3:** Full entry page with code blocks, notes, expanded context

---

## 4. Information Architecture

### Content Taxonomy

Every knowledge entry belongs to exactly **one primary category** and may carry **multiple tags**.

#### Primary Categories (Tier 1)

```
nextjs          — App Router, server components, patterns, optimization
mongodb         — Queries, aggregation, indexes, schemas, drivers
express         — Routing, middleware, error handling, patterns
typescript      — Types, generics, utility types, configuration
architecture    — System design, decisions, patterns, principles
debugging       — Error patterns, diagnostic techniques, post-mortems
snippets        — Reusable code fragments (language-agnostic)
cli             — Terminal commands, shell scripts, tooling
ai              — Prompts, AI workflows, model usage, techniques
workflows       — Dev processes, project setup, CI/CD, deployment
deployment      — Vercel, Docker, environment, infrastructure
performance     — Profiling, optimization, measurement
security        — Auth patterns, OWASP, best practices
```

Categories can be added organically as real content accumulates. Do not pre-create empty categories.

#### Entry Types (Tier 2 — Cross-Category)

Each entry has a `type` field that provides a second axis of filtering:

```
snippet         — A reusable code fragment
command         — A CLI command or shell script
note            — Architectural or conceptual note
pattern         — A reusable solution to a recurring problem
prompt          — An AI prompt template
workflow        — A multi-step process
reference       — Quick lookup (flags, config options, API shapes)
debug           — A debugging technique or error pattern
```

#### Difficulty Levels

```
beginner        — Foundational concepts
intermediate    — Requires working context knowledge
advanced        — Deep patterns, edge cases, system-level thinking
```

### Navigation Model

```
Home (/)
  └── Dashboard — recent entries, pinned entries, quick search

Knowledge Base (/knowledge)
  └── Category Index (/knowledge/[category])
      └── Entry Page (/knowledge/[category]/[slug])

Search (/search)
  └── Global search results with filtering

Tags (/tags)
  └── Tag index
      └── Tag page (/tags/[tag]) — all entries with this tag
```

---

## 5. Folder Structure

```
kanata-knowledge-system/
├── app/
│   ├── (dashboard)/
│   │   ├── layout.tsx              — Dashboard shell (sidebar + main area)
│   │   ├── page.tsx                — Home / overview
│   │   ├── knowledge/
│   │   │   ├── page.tsx            — Knowledge base index
│   │   │   ├── [category]/
│   │   │   │   ├── page.tsx        — Category listing page
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx    — Individual entry page
│   │   ├── search/
│   │   │   └── page.tsx            — Search results page
│   │   └── tags/
│   │       ├── page.tsx            — All tags index
│   │       └── [tag]/
│   │           └── page.tsx        — Entries by tag
│   ├── api/
│   │   └── search/
│   │       └── route.ts            — Search API endpoint (Phase 2)
│   ├── layout.tsx                  — Root layout
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── DashboardShell.tsx      — Outer shell wrapper
│   │   ├── Sidebar.tsx             — Persistent navigation sidebar
│   │   ├── TopBar.tsx              — Top bar with search trigger
│   │   └── MainContent.tsx         — Main scrollable area
│   ├── knowledge/
│   │   ├── EntryCard.tsx           — Card for listing views
│   │   ├── EntryHeader.tsx         — Header section of entry page
│   │   ├── EntryMeta.tsx           — Tags, type, difficulty badges
│   │   ├── EntryBody.tsx           — MDX rendered body
│   │   └── RelatedEntries.tsx      — Related content suggestions
│   ├── search/
│   │   ├── SearchInput.tsx         — Search input field [CLIENT]
│   │   ├── SearchResults.tsx       — Results list component
│   │   ├── CommandPalette.tsx      — Cmd+K overlay [CLIENT]
│   │   └── FilterPanel.tsx         — Category/tag/type filters [CLIENT]
│   ├── code/
│   │   ├── CodeBlock.tsx           — Enhanced code block [CLIENT]
│   │   ├── CopyButton.tsx          — Copy to clipboard [CLIENT]
│   │   ├── TerminalBlock.tsx       — CLI/terminal styling
│   │   └── CodeTabs.tsx            — Multi-file tabbed code [CLIENT]
│   └── ui/
│       ├── Badge.tsx               — Tag, type, difficulty badges
│       ├── CategoryIcon.tsx        — Category icon mapping
│       └── EmptyState.tsx          — Empty search/filter states
│
├── content/
│   ├── nextjs/
│   │   ├── app-router-data-fetching.mdx
│   │   ├── server-actions-pattern.mdx
│   │   └── ...
│   ├── mongodb/
│   │   ├── aggregation-pipeline.mdx
│   │   └── ...
│   ├── express/
│   ├── typescript/
│   ├── architecture/
│   ├── debugging/
│   ├── snippets/
│   ├── cli/
│   ├── ai/
│   ├── workflows/
│   ├── deployment/
│   ├── performance/
│   └── security/
│
├── lib/
│   ├── content.ts                  — MDX reading and parsing
│   ├── search.ts                   — Search index building and querying
│   ├── taxonomy.ts                 — Category/tag/type definitions
│   └── utils.ts                   — Shared utilities
│
├── types/
│   └── content.ts                  — TypeScript types for entries, metadata
│
├── public/
│   └── ...
│
├── styles/
│   └── code-themes/                — Syntax highlighting themes
│
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

### Key Structural Decisions

**Route Group `(dashboard)`** — Wraps all authenticated/primary views in a shared layout with sidebar. The root layout stays minimal; the dashboard shell is scoped.

**`lib/content.ts` as the single data access layer** — All MDX reading and frontmatter parsing happens here. Components never read files directly.

**`components/code/` is its own namespace** — The code experience is complex enough to deserve isolation. It is a mini-subsystem.

---

## 6. MDX Architecture

### Entry Frontmatter Schema

Every `.mdx` file must begin with a YAML frontmatter block conforming to this schema:

```yaml
---
title: "App Router Data Fetching Patterns"
slug: "app-router-data-fetching"
category: "nextjs"
type: "pattern"                        # snippet | command | note | pattern | prompt | workflow | reference | debug
difficulty: "intermediate"             # beginner | intermediate | advanced
tags: ["server-components", "async", "suspense", "cache"]
summary: "Complete guide to data fetching in Next.js 14+ App Router using async Server Components, fetch caching, and Suspense boundaries."
createdAt: "2024-11-10"
updatedAt: "2025-01-15"
pinned: false                          # Optional — pins to dashboard
technologies: ["next.js", "react", "typescript"]
relatedSlugs: ["server-actions-pattern", "suspense-streaming"]
---
```

All fields except `pinned`, `relatedSlugs`, and `technologies` are required. Validation occurs at build time.

### Content Layer Strategy

**Phase 1: Direct filesystem reading with `gray-matter` + `next-mdx-remote`.**

No external content layer (Contentlayer, Velite) in Phase 1. Direct filesystem access keeps the system simple and eliminates an abstraction layer. If this creates friction at scale (50+ entries, slow build times, complex type generation), migrate to Velite in Phase 2.

```typescript
// lib/content.ts — core data access

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export type EntryMeta = {
  title: string
  slug: string
  category: string
  type: EntryType
  difficulty: Difficulty
  tags: string[]
  summary: string
  createdAt: string
  updatedAt: string
  pinned?: boolean
  technologies?: string[]
  relatedSlugs?: string[]
}

export type Entry = EntryMeta & {
  content: string   // raw MDX string, compiled separately
}

export function getAllEntries(): EntryMeta[] {
  // Recursively reads all .mdx files across category subdirectories
  // Returns parsed frontmatter array, sorted by updatedAt desc
}

export function getEntriesByCategory(category: string): EntryMeta[] {}

export function getEntryBySlug(category: string, slug: string): Entry | null {}

export function getEntriesByTag(tag: string): EntryMeta[] {}

export function getAllTags(): string[] {}

export function getAllCategories(): string[] {}
```

### MDX Components Map

MDX entries can use a set of custom components inline without importing them. These are injected via the `MDXProvider` / `useMDXComponents` pattern in Next.js App Router.

```typescript
// lib/mdx-components.ts

export function useMDXComponents(components) {
  return {
    // Override standard HTML elements
    code: InlineCode,
    pre: CodeBlock,          // Captures ```lang blocks
    a: SmartLink,
    // Custom components available in MDX
    Callout,                 // Info/warning/tip/danger callout boxes
    TerminalBlock,           // Styled terminal output
    CodeTabs,               // Multi-file tabbed examples
    Steps,                   // Numbered step-by-step guides
    KeyboardShortcut,        // Styled keyboard keys
    ...components
  }
}
```

### MDX Content Conventions

Authors should follow these conventions inside `.mdx` files:

- Use fenced code blocks with language identifiers: ` ```typescript `
- Use `bash` for terminal commands
- Use `<Callout type="warning">` for important notices
- Use `<Steps>` for multi-step processes
- Use `<CodeTabs>` for multi-file examples
- Headings start at `##` (H2) — H1 is generated from frontmatter `title`

---

## 7. Search & Filter System

### Phase 1 Architecture: Static Index + Client-Side Search

For Phase 1, search operates entirely on a static JSON index built at compile time. No API call required. No server round-trip. Instant results.

```
Build time:
  getAllEntries() → serialize to search-index.json
  
Runtime:
  Client loads search-index.json on first search interaction
  Fuse.js performs fuzzy search against index
  Results rendered immediately
```

**Search index payload per entry:**

```json
{
  "title": "App Router Data Fetching",
  "slug": "app-router-data-fetching",
  "category": "nextjs",
  "type": "pattern",
  "tags": ["server-components", "async"],
  "summary": "Complete guide to...",
  "difficulty": "intermediate",
  "technologies": ["next.js", "react"]
}
```

Note: Full content body is **not** included in Phase 1 search index. Title, summary, tags, and category provide sufficient retrieval quality. Full-text search across content body is a Phase 2 feature.

### Fuse.js Configuration

```typescript
const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'summary', weight: 0.25 },
    { name: 'tags', weight: 0.2 },
    { name: 'category', weight: 0.1 },
    { name: 'technologies', weight: 0.05 },
  ],
  threshold: 0.35,    // Fuzzy tolerance — lower = stricter
  minMatchCharLength: 2,
  includeScore: true,
  includeMatches: true,  // For highlighting matched text
}
```

### Filter System

Filters are independent dimensions that compose with AND logic:

```
Active filters:
  category: nextjs          (select one)
  type: snippet             (select one or many)
  difficulty: intermediate  (select one or many)
  tags: ["server", "cache"] (select many)

Resulting entries: nextjs entries that are snippets, 
intermediate difficulty, tagged server AND cache
```

**Filter state lives in URL search params** — not component state. This makes filters:

- Shareable (send a filtered view to a colleague)
- Bookmarkable
- Browser back/forward compatible
- SSR-compatible for category pages

```
/knowledge/nextjs?type=snippet&difficulty=intermediate&tag=server&tag=cache
```

### Command Palette (Phase 1 MVP)

A `Cmd+K` (Mac) / `Ctrl+K` (Windows) triggered overlay that provides:

- Global search with instant results as you type
- Quick navigation to categories
- Recent entries list (last 10, stored in `localStorage`)
- Keyboard-only navigable results

The Command Palette is a **Client Component**. It renders a portal overlay and manages its own open/close state via a keyboard event listener attached to `document`.

---

## 8. Code Block System

The code experience is a core product differentiator. It deserves significant engineering attention.

### Technology Stack

```
Syntax highlighting:  Shiki (server-side, zero client bundle)
Copy to clipboard:    Custom CopyButton component (Client Component)
Multi-file tabs:      CodeTabs component (Client Component)
Terminal styling:     TerminalBlock component (Server Component)
Line highlighting:    Shiki transformers
```

**Why Shiki over Prism/Highlight.js:**

- Runs at build time / server-side — zero JS sent to client for highlighting
- Uses VS Code's TextMate grammars — highest accuracy
- Outputs static HTML — no flash of unstyled code
- Native support for all language syntaxes developers need

### CodeBlock Component

```typescript
// components/code/CodeBlock.tsx
// This is a SERVER COMPONENT — Shiki runs here

import { codeToHtml } from 'shiki'

type CodeBlockProps = {
  children: string
  language: string
  filename?: string          // Shows a file tab header
  highlightLines?: number[]  // e.g. [3, 7, 8] — highlighted with gutter
  showLineNumbers?: boolean
}

export async function CodeBlock({ 
  children, 
  language,
  filename,
  highlightLines,
  showLineNumbers = false
}: CodeBlockProps) {
  const html = await codeToHtml(children, {
    lang: language,
    theme: 'github-dark',    // Or custom KKS theme
    transformers: [
      transformerNotationHighlight(),
      transformerNotationDiff(),
    ]
  })

  return (
    <div className="code-block-wrapper">
      {filename && <CodeBlockHeader filename={filename} code={children} />}
      <div 
        className="code-block-body"
        dangerouslySetInnerHTML={{ __html: html }} 
      />
      <CopyButton code={children} />   {/* Client Component island */}
    </div>
  )
}
```

### TerminalBlock Component

CLI commands deserve distinct visual treatment from code. Terminal blocks communicate: *this is something you type*.

```
Visual design:
- Dark background (#0d1117 or equivalent)  
- Monospace font
- Green prompt prefix: $
- Command text in white
- Optional output section below, muted color
- Copy button
- Optional label: "Run in project root"
```

```mdx
<!-- MDX usage -->
<TerminalBlock label="Install dependencies">
npm install
</TerminalBlock>

<TerminalBlock prompt="$" showOutput>
npx prisma migrate dev
# Output:
# Environment variables loaded from .env
# Datasource "db": SQLite database "dev.db"
</TerminalBlock>
```

### CodeTabs Component

For multi-file examples (e.g., `page.tsx` + `layout.tsx` + `types.ts`):

```mdx
<CodeTabs>
  <CodeTab label="page.tsx" language="typescript">
    // content
  </CodeTab>
  <CodeTab label="layout.tsx" language="typescript">
    // content
  </CodeTab>
</CodeTabs>
```

`CodeTabs` is a Client Component (tab state requires interactivity). Each `CodeTab` renders a `CodeBlock` server component internally.

### Callout Component

```mdx
<Callout type="warning">
  This pattern only works in Server Components. Using it in a Client Component will throw.
</Callout>

<Callout type="tip">
  Cache this at the request level using React's cache() function.
</Callout>
```

Types: `info` (blue), `warning` (amber), `tip` (green), `danger` (red)

---

## 9. Responsive Dashboard Strategy

### Breakpoint Philosophy

KKS is mobile-first as per Kanata Foundation, but the primary use case is desktop (a developer at their workstation). Mobile is a "reference lookup while away from desk" use case — it must work but is not the hero experience.

```
Mobile (< 768px):
  - Sidebar hidden by default, triggered by hamburger
  - Full-width content cards
  - Simplified filter panel (bottom sheet or dropdown)
  - Command palette still available
  - Code blocks scroll horizontally

Tablet (768px - 1024px):
  - Sidebar collapses to icon-only rail
  - Two-column card grid
  - Filter panel as collapsible panel

Desktop (> 1024px):
  - Full sidebar visible (256px)
  - Three-column card grid on wide screens
  - Filter panel inline on category pages
  - Two-panel layout on entry pages (content + metadata sidebar)
```

### Code on Mobile

Mobile code reading is notoriously bad. KKS handles it specifically:

- Horizontal scroll on code blocks with `overflow-x: auto`
- Minimum font size: 13px (never smaller)
- `touch-action: manipulation` on copy buttons
- Optional "expand" mode for long code blocks that are collapsed by default on mobile
- File tabs scroll horizontally if many files

---

## 10. Layout Architecture

### Dashboard Shell

```
┌─────────────────────────────────────────────────────┐
│  TopBar                                              │
│  [Logo] [Search Trigger]              [Settings]     │
├───────────────┬─────────────────────────────────────┤
│               │                                      │
│   Sidebar     │   Main Content Area                  │
│   (256px)     │                                      │
│               │   ┌───────────────────────────────┐  │
│   Categories  │   │  Page content                 │  │
│   ───────     │   │  (EntryList, EntryPage, etc.)  │  │
│   nextjs      │   │                               │  │
│   mongodb     │   └───────────────────────────────┘  │
│   express     │                                      │
│   ...         │                                      │
│               │                                      │
│   Tags        │                                      │
│   ───────     │                                      │
│   #server     │                                      │
│   #async      │                                      │
│               │                                      │
└───────────────┴─────────────────────────────────────┘
```

### Entry Page Layout

```
┌─────────────────────────────────────────────────────┐
│  [← Back to NextJS]                                  │
├───────────────────────────────────────┬─────────────┤
│                                       │             │
│   Entry Body                          │  Meta Panel │
│                                       │             │
│   # Title                             │  Type       │
│   Summary paragraph                   │  Difficulty │
│   ─────────────────────────           │  Tags       │
│   ## Section                          │  Updated    │
│   Content...                          │  ─────────  │
│                                       │  Related    │
│   ```typescript                       │  Entries    │
│   code here                           │             │
│   ```                                 │             │
│                                       │             │
└───────────────────────────────────────┴─────────────┘
```

The meta panel collapses below the content on mobile.

### Component Composition Model

```typescript
// app/(dashboard)/knowledge/[category]/[slug]/page.tsx
// Server Component — all data fetched here

export default async function EntryPage({ params }) {
  const entry = await getEntryBySlug(params.category, params.slug)
  const related = await getRelatedEntries(entry.relatedSlugs)

  return (
    <EntryLayout>
      <EntryHeader
        title={entry.title}
        category={entry.category}
        breadcrumb={[entry.category, entry.title]}
      />
      <EntryBody content={entry.content} />        {/* MDX rendering */}
      <EntryMetaPanel
        type={entry.type}
        difficulty={entry.difficulty}
        tags={entry.tags}
        updatedAt={entry.updatedAt}
        related={related}
      />
    </EntryLayout>
  )
}
```

No data fetching happens inside `EntryBody`, `EntryMetaPanel`, or `EntryHeader`. All data flows down from the page.

---

## 11. Rendering Strategy

### Server Components by Default

Every component that does not require:

- `useState` / `useReducer`
- `useEffect`
- Browser APIs (`window`, `document`, `localStorage`)
- Event handlers

…is a Server Component. This includes all layout components, all content rendering, the sidebar, all metadata panels.

### Client Component Islands

Client components are small, focused, and isolated:

| Component | Why Client |
|---|---|
| `SearchInput` | Controlled input state |
| `CommandPalette` | Keyboard listeners, open/close state |
| `FilterPanel` | Interactive filter state |
| `CopyButton` | Clipboard API |
| `CodeTabs` | Active tab state |
| `SidebarMobileToggle` | Sidebar open/close on mobile |

### Rendering per Route Type

| Route | Strategy | Notes |
|---|---|---|
| `/` (Home) | Static (SSG) | Pinned entries, recent entries — regenerate on deploy |
| `/knowledge/[category]` | Static (SSG) + ISR | `generateStaticParams` for all categories |
| `/knowledge/[category]/[slug]` | Static (SSG) | Fully static — no dynamic data |
| `/search` | Static shell + Client | Search happens client-side against static index |
| `/tags/[tag]` | Static (SSG) | `generateStaticParams` for all tags |

All routes are statically generated at build time. MDX content changes trigger a redeployment (or ISR in Phase 2).

### MDX Rendering

```typescript
// Inside EntryBody.tsx (Server Component)

import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '@/lib/mdx-components'

export function EntryBody({ content }: { content: string }) {
  return (
    <article className="entry-prose">
      <MDXRemote
        source={content}
        components={useMDXComponents({})}
      />
    </article>
  )
}
```

Using `next-mdx-remote/rsc` — the RSC-compatible version. This allows MDX to render in Server Components with async component support (required for Shiki in `CodeBlock`).

---

## 12. Performance Strategy

### Build-Time as the Performance Layer

KKS pre-computes everything possible:

- All MDX compiled to HTML at build time
- Search index generated as a static JSON file at build time
- All pages statically generated — no server runtime on render
- Shiki syntax highlighting runs at build time

The result: no request hits a server for standard page loads. Everything is pre-rendered HTML served from CDN edge.

### Bundle Strategy

- Zero JS for static content pages (entry pages are pure HTML/CSS after hydration)
- Search index (`search-index.json`) loaded lazily on first search interaction
- Shiki is a server-only import — never ships to the client bundle
- `'use client'` components are small and tree-shaken aggressively

### Image Strategy

Phase 1 has minimal images (it's a text and code system). When images are used:

- Next.js `<Image>` with explicit `width` and `height`
- WebP format
- Lazy loading by default

### Font Strategy

```typescript
// app/layout.tsx

import { JetBrains_Mono, Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono' 
})
```

- `Inter` for UI and prose text
- `JetBrains Mono` for all code
- Both loaded via `next/font` — self-hosted, no external request, zero FOUT

### Core Web Vitals Targets

| Metric | Target |
|---|---|
| LCP | < 1.2s |
| FID / INP | < 100ms |
| CLS | < 0.05 |
| TTFB | < 200ms (CDN edge) |

---

## 13. SEO Strategy

### Metadata Architecture

Every page generates precise Open Graph and Twitter metadata:

```typescript
// app/(dashboard)/knowledge/[category]/[slug]/page.tsx

export async function generateMetadata({ params }): Promise<Metadata> {
  const entry = await getEntryBySlug(params.category, params.slug)

  return {
    title: `${entry.title} — KKS`,
    description: entry.summary,
    openGraph: {
      title: entry.title,
      description: entry.summary,
      type: 'article',
      publishedTime: entry.createdAt,
      modifiedTime: entry.updatedAt,
      tags: entry.tags,
    },
    alternates: {
      canonical: `/knowledge/${entry.category}/${entry.slug}`,
    }
  }
}
```

### Structured Data

Entry pages emit JSON-LD for `TechArticle` type:

```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "App Router Data Fetching Patterns",
  "datePublished": "2024-11-10",
  "dateModified": "2025-01-15",
  "keywords": ["next.js", "server-components", "data-fetching"]
}
```

### URL Structure

```
/knowledge/nextjs/app-router-data-fetching
```

- Human readable
- Category in path (good for category-level search engine authority)
- Slug derived from filename
- Permanent — slugs never change once set

### Sitemap

Auto-generated `sitemap.ts` using Next.js App Router conventions:

```typescript
// app/sitemap.ts

export default async function sitemap() {
  const entries = getAllEntries()
  return entries.map(entry => ({
    url: `https://kks.yourdomain.com/knowledge/${entry.category}/${entry.slug}`,
    lastModified: entry.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
}
```

**Note:** Phase 1 is likely a private personal tool — SEO may be irrelevant. The architecture supports it fully when the product becomes public.

---

## 14. Future Evolution

### Natural Extraction Points

As KKS creates real usage pressure on Kanata Foundation, these components will prove themselves worthy of extraction:

**High-confidence extractions:**

- `CodeBlock` + `CopyButton` + `TerminalBlock` — a `@kanata/code` primitive
- `Badge` (type, difficulty, tag chips) — a `@kanata/taxonomy-ui` primitive
- `CommandPalette` — a `@kanata/command-palette` primitive
- `FilterPanel` + URL param sync utility — a `@kanata/filters` primitive
- `EmptyState` — a `@kanata/empty-state` primitive

**Conditional extractions** (only if reuse is proven):

- `Callout` — common enough, but MDX-specific
- `Steps` — only useful in documentation-adjacent products
- `EntryCard` pattern — too content-model-specific to extract naively

### When to Extract

The extraction criterion: **a component has been used in 2+ distinct real products without modification**. Not "this could be reusable." Actual reuse.

### Phase 2 Feature Set

The following are explicitly **not in Phase 1** but are architecturally prepared for:

- Full-text search across content body (requires search API or Pagefind)
- Bookmarks / favorites (localStorage → then server-side)
- Recently viewed entries (localStorage)
- Keyboard shortcut cheatsheet overlay
- Dark/light theme toggle (CSS custom properties ready)
- Entry edit shortcut (link to GitHub editor for the MDX file)
- AI-assisted retrieval (semantic search via embeddings)
- Content statistics dashboard (entries by category, activity)

---

## 15. What Should Stay App-Specific

These elements are deeply tied to KKS's content model and should not be abstracted:

- **Frontmatter schema** — the `EntryMeta` type is specific to this knowledge taxonomy
- **Category definitions** — `nextjs`, `mongodb`, `express` etc. are KKS-native
- **`lib/content.ts`** — the content access layer is tightly coupled to the MDX file structure
- **`lib/search.ts`** — the search index shape reflects KKS's specific metadata fields
- **`EntryCard` layout** — the specific card design reflects KKS's content type system
- **`EntryPage` two-panel layout** — specific to the knowledge article UX
- **The taxonomy system** (type/difficulty/category/tags) — entirely KKS-specific

---

## 16. What Could Be Extracted Into Kanata Foundation

### Immediate Candidates

**`CodeBlock` system**

The most universally reusable component in KKS. Any developer product needs code blocks. Extract as a server-compatible primitive with Shiki integration, `CopyButton` island, and `TerminalBlock` variant.

**`CommandPalette`**

A generic Cmd+K palette that accepts a search function and a result renderer. The KKS-specific content search is passed in as a prop — the palette itself is app-agnostic.

**URL-synced filter state utility**

A `useFilterParams` hook or utility that reads/writes filter state to URL search params. Universally useful in any list/discovery interface.

**`Badge` / chip component**

Small colored pill labels. Every product has these.

**`EmptyState` component**

"No results found" states with an icon, heading, and description. Universal.

### Later Candidates (After Real Usage)

- `Callout` component
- `Steps` component  
- Sidebar navigation primitive
- Dashboard shell layout

---

## 17. Deployment Strategy

### Platform: Vercel

KKS is a Next.js static site with no custom server runtime. Vercel is the natural deployment target.

**Deployment model:**

- All pages are statically generated at build time
- Deployed to Vercel's CDN edge network globally
- Zero cold starts — pure static files
- Auto-deployment on `git push` to `main`

### Environment

```
Production:     main branch → kks.yourdomain.com
Preview:        feature branches → auto-generated preview URLs
```

### Build Process

```bash
next build        # Compiles MDX, runs Shiki, generates static pages,
                  # generates search-index.json, generates sitemap.xml
```

Build time scales linearly with entry count. At 500 entries, build time will still be under 60 seconds. At 5000 entries, consider ISR or a dedicated build cache strategy.

### Content Updates

Phase 1 update flow:

```
Write MDX file → git commit → git push → Vercel auto-deploys → ~30s live
```

This is the intended developer workflow. It is fast, version-controlled, and requires no CMS interface.

Phase 2 option: Vercel ISR with `revalidatePath` triggered by a webhook, enabling content updates without full redeployment.

### Custom Domain

```
kks.yourdomain.com
```

Or, if this is entirely private:

```
localhost:3000 (development only)
Vercel preview URL (accessible to owner)
```

---

## 18. MVP Roadmap

### Phase 1 — Foundation (Week 1–2)

**Goal:** A working, deployable knowledge system with real content.

**Deliverables:**

- [ ] Project scaffold from Kanata Foundation
- [ ] `lib/content.ts` — MDX reading, frontmatter parsing
- [ ] `types/content.ts` — Complete TypeScript type definitions
- [ ] Dashboard shell layout (Sidebar + MainContent + TopBar)
- [ ] Sidebar with category navigation
- [ ] Category listing page (`/knowledge/[category]`)
- [ ] Entry page (`/knowledge/[category]/[slug]`)
- [ ] `CodeBlock` with Shiki syntax highlighting
- [ ] `CopyButton`
- [ ] `TerminalBlock`
- [ ] `Badge` component (type, difficulty, tags)
- [ ] `EntryCard` for listing views
- [ ] 10–15 real knowledge entries seeded across 3–4 categories
- [ ] Basic metadata + `<title>` tags

**Success criterion:** You can open KKS and find a real piece of knowledge you need for your work.

### Phase 2 — Search & Filtering (Week 3–4)

**Goal:** The retrieval experience becomes genuinely fast and powerful.

**Deliverables:**

- [ ] Build-time search index generation
- [ ] Client-side Fuse.js search
- [ ] Search results page (`/search`)
- [ ] Filter panel (category, type, difficulty, tags)
- [ ] URL-synced filter state
- [ ] Command Palette (`Cmd+K`)
- [ ] `CodeTabs` multi-file component
- [ ] `Callout` component
- [ ] `Steps` component
- [ ] 30+ entries across all categories
- [ ] Tag index page + tag detail pages

**Success criterion:** You find any entry within 3 seconds using search or filters.

### Phase 3 — Polish & Breadth (Week 5–6)

**Goal:** Production-quality feel. Real daily usage begins.

**Deliverables:**

- [ ] Recently viewed entries (localStorage)
- [ ] Pinned entries on home dashboard
- [ ] Mobile experience polished
- [ ] Responsive code blocks optimized
- [ ] Performance audit + Core Web Vitals validation
- [ ] Sitemap + robots.txt
- [ ] 50+ entries across all categories
- [ ] Deployment to custom domain on Vercel

**Success criterion:** This becomes your actual daily knowledge system.

---

## 19. Future Expansion Roadmap

### Near-Term (1–3 months post-MVP)

- **Pagefind integration** — Full-text search across MDX content bodies. Pagefind is a static site search library that generates its index at build time. Zero backend required. Replaces Fuse.js for Phase 2.

- **Keyboard shortcut reference** — A modal showing all keyboard shortcuts. `?` to open.

- **Entry edit link** — Each entry page links directly to its MDX file on GitHub for fast editing.

- **Dark/light theme** — CSS custom property based, zero flash on load using Next.js cookie strategy.

- **Bookmarks** — Star any entry. Stored in `localStorage` initially, synced to a server-side store when multi-device support is needed.

### Medium-Term (3–6 months)

- **AI-assisted retrieval** — Embed entry summaries via OpenAI/Voyage AI embeddings at build time. Store in a vector index. Enable semantic search: "how do I invalidate cache in next" finds the right entry even without exact keyword match.

- **Content statistics** — Dashboard widget showing total entries, entries added this month, most-used tags, category distribution.

- **Quick add** — A streamlined mobile interface for capturing a new entry from your phone before you forget it.

- **Related entries algorithm** — Beyond manual `relatedSlugs`, compute related entries by tag overlap and co-occurrence at build time.

### Long-Term (6–12 months)

- **Multi-user / team knowledge base** — Authenticate via NextAuth. Multiple users contribute to shared knowledge. Entries have authors. Versioning becomes important.

- **Content import pipeline** — Import from GitHub Gists, Notion exports, Obsidian vaults.

- **Public profiles** — Option to make specific categories or entries public. Share your knowledge base with the developer community.

- **API layer** — If content needs to be accessed by other tools (IDE extensions, CLI), expose a read-only API.

---

## 20. Architectural Tradeoffs

### MDX vs Database

**Chosen:** MDX files as the content system.

**Tradeoffs accepted:**

| Benefit | Cost |
|---|---|
| Git versioned, diffable | No real-time updates |
| Zero backend complexity | Requires redeployment for content changes |
| Developer-native workflow | No GUI for non-technical contributors |
| Build-time validation | Slightly longer build times at scale |
| Portable, no vendor lock-in | No query flexibility |

**When to reconsider:** When you need multi-user content editing, real-time content updates, or the entry count exceeds ~2000 and build times become painful.

### Static Generation vs SSR

**Chosen:** Fully static (SSG) for all content pages.

**Tradeoffs accepted:** Content updates require a deployment. For a personal developer knowledge base updated by commit, this is a feature not a bug. If KKS becomes a multi-user collaborative system, this tradeoff reverses.

### Client-Side Search vs API Search

**Chosen:** Client-side search with a static JSON index.

**Tradeoffs accepted:**

| Benefit | Cost |
|---|---|
| Zero API latency | Full search index loaded to client (~50KB at 200 entries) |
| No server infrastructure | Search only covers metadata, not full content body |
| Works offline | Index grows linearly with entries |
| Instant results | No server-side personalization |

**When to reconsider:** When full-text search across content body is needed, or when the index exceeds ~500KB. At that point, migrate to Pagefind (static) or a dedicated search service (Typesense, Algolia).

### Fuse.js vs Pagefind vs Algolia

**Phase 1:** Fuse.js — zero config, instant setup, good enough for metadata search on a personal knowledge base.

**Phase 2:** Pagefind — static full-text search, no backend, generates index at build time, excellent result quality.

**Phase 3:** Typesense (self-hosted) or Algolia — if multi-user, public-facing, or semantic search is required.

### No Authentication in Phase 1

**Chosen:** No auth. KKS is deployed to a known URL, accessed by the owner only.

**Tradeoffs accepted:** Anyone with the URL can read the knowledge base.

**Mitigation:** Deploy to a Vercel preview URL (not indexed by search engines, not publicly linked). Add password protection via Vercel's built-in deployment protection if needed — zero code change required.

**When to reconsider:** When sharing with a team or making entries public requires selective access control.

---

*Blueprint version 1.0 — Kanata Knowledge System*
*Prepared for Kanata Foundation ecosystem.*
*Architecture is intentionally minimal. Evolve through real usage pressure.*
