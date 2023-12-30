import { nanoid } from "nanoid";
import { create } from "zustand";

interface UseIsFirstLogin {
  isFirstLogin: boolean;
  setIsFirstLogin: (value: boolean) => void;
}

export const useIsFirstLogin = create<UseIsFirstLogin>((set) => ({
  isFirstLogin: true,
  setIsFirstLogin(value) {
    set({
      isFirstLogin: value,
    });
  },
}));
