import { ReactNode, useEffect } from "react";
import { AppSidebar } from "./AppSidebar";
import { Topbar } from "./Topbar";
import { AIChatWidget } from "@/components/chat/AIChatWidget";
import { CommandPalette } from "@/components/command/CommandPalette";
import { useAppStore } from "@/store/app-store";

export function AppLayout({ children }: { children: ReactNode }) {
  const { setCommandOpen } = useAppStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setCommandOpen]);

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <AIChatWidget />
      <CommandPalette />
    </div>
  );
}
