import { create } from "zustand";

interface UseImage {
  image: string;
  setImage: (url: string) => void;
}

export const useImage = create<UseImage>((set) => ({
  image: "",
  setImage(image) {
    set({ image });
  },
}));
