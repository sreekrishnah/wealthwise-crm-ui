import { create } from "zustand";

interface AppState {
  sidebarOpen: boolean;
  chatOpen: boolean;
  chatExpanded: boolean;
  commandOpen: boolean;
  toggleSidebar: () => void;
  toggleChat: () => void;
  toggleChatExpanded: () => void;
  setCommandOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  chatOpen: false,
  chatExpanded: false,
  commandOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  toggleChat: () => set((s) => ({ chatOpen: !s.chatOpen, chatExpanded: false })),
  toggleChatExpanded: () => set((s) => ({ chatExpanded: !s.chatExpanded })),
  setCommandOpen: (open) => set({ commandOpen: open }),
}));
