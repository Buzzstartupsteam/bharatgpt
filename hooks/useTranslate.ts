import { create } from "zustand";

interface UseTranslate {
  text: string;
  setText: (text: string) => void;
}

export const useTranslate = create<UseTranslate>((set) => ({
  text: "",
  setText: (text) => set(() => ({ text })),
}));
