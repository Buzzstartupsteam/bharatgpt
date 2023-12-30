import { create } from "zustand";

interface UseSidebar {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const useSidebar = create<UseSidebar>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
}));
