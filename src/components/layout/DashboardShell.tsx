import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { DashboardKeyboardNav } from "./DashboardKeyboardNav";
import { DashboardHotkeys } from "./DashboardHotkeys";
import { ScrollToTopButton } from "./ScrollToTopButton";
import { CommandPalette } from "@/components/search/CommandPalette";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar />
        <main
          id="dashboard-main"
          className="dashboard-scroll flex-1 overflow-y-auto p-6 md:p-8"
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
