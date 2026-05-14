"use client";

import { useState } from "react";

type CodeTabProps = {
  label: string;
  children: React.ReactNode;
};

export function CodeTab({ children }: CodeTabProps) {
  return <div>{children}</div>;
}

type CodeTabsProps = {
  children: React.ReactElement<CodeTabProps>[];
};

export function CodeTabs({ children }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = Array.isArray(children) ? children : [children];

  return (
    <div className="my-4 rounded-lg border border-border overflow-hidden">
      <div className="flex border-b border-border bg-card overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 text-xs font-mono whitespace-nowrap transition-colors ${
              i === activeTab
                ? "text-foreground bg-background border-b-2 border-accent"
                : "text-muted hover:text-foreground"
            }`}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div>{tabs[activeTab]}</div>
    </div>
  );
}
