import { create } from "zustand";

interface UseChatSidebar {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const useChatSidebar = create<UseChatSidebar>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
}));
