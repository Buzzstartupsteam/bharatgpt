import { create } from "zustand";

interface UseContent {
  text: string;
  setText: (Text: string) => void;
}

export const useContent = create<UseContent>((set) => ({
  text: "",
  setText: (text) => set(() => ({ text })),
}));
