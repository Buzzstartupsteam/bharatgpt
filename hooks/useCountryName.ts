import { create } from "zustand";

interface UseCountryName {
  name: string;
  setName: (Text: string) => void;
}

export const useCountryName = create<UseCountryName>((set) => ({
  name: "",
  setName: (name) => set(() => ({ name })),
}));
