import type { CategoryInfo } from "@/types/content";

import { Atom, Network, SquareTerminal, Workflow } from "lucide-react";

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: "architecture",
    label: "Architecture",
    description: "System design, decisions, patterns, principles",
    icon: Network,
    tone: {
      iconClassName: "text-sky-300",
      surfaceClassName: "bg-sky-500/10",
    },
  },

  {
    slug: "cli",
    label: "CLI",
    description: "Git, terminal commands, shell workflows",
    icon: SquareTerminal,
    tone: {
      iconClassName: "text-emerald-300",
      surfaceClassName: "bg-emerald-500/10",
    },
  },

  {
    slug: "react",
    label: "React",
    description: "Hooks, rendering, state, and performance patterns",
    icon: Atom,
    tone: {
      iconClassName: "text-cyan-300",
      surfaceClassName: "bg-cyan-500/10",
    },
  },

  {
    slug: "automation",
    label: "Automation",
    description: "Workflows, AI systems, webhooks, and automation engineering",
    icon: Workflow,
    tone: {
      iconClassName: "text-violet-300",
      surfaceClassName: "bg-violet-500/10",
    },
  },
];
