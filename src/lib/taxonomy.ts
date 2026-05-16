import type { CategoryInfo } from "@/types/content";
import { Network, SquareTerminal } from "lucide-react";

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
];
