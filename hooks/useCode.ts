import { create } from "zustand";

interface UseCode {
  code: string;
  setCode: (code: string) => void;
}

export const useCode = create<UseCode>((set) => ({
  code: "",
  setCode: (code) => set(() => ({ code })),
}));
