import { Search, Bell, MessageSquareText, Command } from "lucide-react";
import { useAppStore } from "@/store/app-store";

export function Topbar() {
  const { toggleChat, setCommandOpen } = useAppStore();

  return (
    <header className="glass-topbar sticky top-0 z-20 h-14 flex items-center justify-between px-6">
      {/* Search */}
      <button
        onClick={() => setCommandOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/60 hover:bg-muted transition-colors text-sm text-muted-foreground w-72"
      >
        <Search className="w-4 h-4" />
        <span>Search clients, actions…</span>
        <kbd className="ml-auto text-[10px] font-mono bg-background/80 px-1.5 py-0.5 rounded-md border border-border/50">
          ⌘K
        </kbd>
      </button>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        <button className="relative p-2.5 rounded-xl hover:bg-muted/60 transition-colors active:scale-95">
          <Bell className="w-[18px] h-[18px] text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
        </button>
        <button
          onClick={toggleChat}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 hover:bg-primary/15 transition-colors text-primary text-sm font-medium active:scale-95"
        >
          <MessageSquareText className="w-4 h-4" />
          <span>AI Assistant</span>
        </button>
      </div>
    </header>
  );
}
