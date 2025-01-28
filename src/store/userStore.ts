import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  displayName: string | null;
  setDisplayName: (name: string | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      displayName: null,
      setDisplayName: (name) => set({ displayName: name }),
    }),
    {
      name: "user-storage",
    },
  ),
);
