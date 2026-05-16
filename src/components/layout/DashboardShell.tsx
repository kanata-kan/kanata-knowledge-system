import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { DashboardKeyboardNav } from "./DashboardKeyboardNav";
import { DashboardHotkeys } from "./DashboardHotkeys";
import { ScrollToTopButton } from "./ScrollToTopButton";
import { CommandPalette } from "@/components/search/CommandPalette";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen min-h-0 overflow-hidden bg-background">
      <Sidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <TopBar />
        <main
          id="dashboard-main"
          className="dashboard-scroll min-h-0 flex-1 overflow-y-auto p-6 md:p-8"
        >
          {children}
        </main>
      </div>
      <DashboardHotkeys />
      <DashboardKeyboardNav />
      <ScrollToTopButton />
      <CommandPalette />
    </div>
  );
}
