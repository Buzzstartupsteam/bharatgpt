import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Tour = {
  bharatChat: boolean;
  analyze: boolean;
  code: boolean;
  contentCreator: boolean;
  dashboard: boolean;
  email: boolean;
  essay: boolean;
  image: boolean;
  summarize: boolean;
  pricing: boolean;

  skip: boolean;
};

interface UseTour {
  tour: Tour;
  setTour: (tour: Tour) => void;
}

export const useTour = create(
  persist<UseTour>(
    (set) => ({
      tour: {
        bharatChat: false,
        analyze: false,
        code: false,
        contentCreator: false,
        dashboard: false,
        email: false,
        essay: false,
        image: false,
        pricing: false,
        skip: false,
        summarize: false,
      },
      setTour(tour) {
        set({ tour });
      },
    }),
    {
      name: "tour-storage-app",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
