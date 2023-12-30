import { create } from "zustand";

interface UseEssay {
  essay: string;
  setEssay: (essay: string) => void;
}

export const useEssay = create<UseEssay>((set) => ({
  essay: "",
  setEssay: (essay) => set(() => ({ essay })),
}));
