import { nanoid } from "nanoid";
import { create } from "zustand";

interface useNanoId {
  id: string;
  resetId: () => void;
}

export const useNanoId = create<useNanoId>((set) => ({
  id: nanoid(),
  resetId: () => set({ id: nanoid() }),
}));
