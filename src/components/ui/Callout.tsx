import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "tip" | "danger";

const styles: Record<CalloutType, { border: string; bg: string; icon: string }> = {
  info: { border: "border-blue-500/30", bg: "bg-blue-500/5", icon: "ℹ" },
  warning: { border: "border-amber-500/30", bg: "bg-amber-500/5", icon: "⚠" },
  tip: { border: "border-green-500/30", bg: "bg-green-500/5", icon: "✓" },
  danger: { border: "border-red-500/30", bg: "bg-red-500/5", icon: "✕" },
};

type CalloutProps = {
  type?: CalloutType;
  children: React.ReactNode;
};

export function Callout({ type = "info", children }: CalloutProps) {
  const style = styles[type];

  return (
    <div
      className={cn(
        "my-4 px-4 py-3 rounded-lg border-l-4 text-sm",
        style.border,
        style.bg
      )}
    >
      <div className="flex gap-2">
        <span className="shrink-0">{style.icon}</span>
        <div className="text-foreground/80 [&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}
