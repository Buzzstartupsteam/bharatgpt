import { create } from "zustand";

interface UseEmail {
  email: string;
  setEmail: (email: string) => void;
}

export const useEmail = create<UseEmail>((set) => ({
  email: "",
  setEmail: (email) => set(() => ({ email })),
}));
