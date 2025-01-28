import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  displayName: string | null;
  setId: (id: string | null) => void;
  setName: (name: string | null) => void;
  setEmail: (email: string | null) => void;
  setDisplayName: (displayName: string | null) => void;
  getUser: () => {
    id: string | null;
    name: string | null;
    email: string | null;
    displayName: string | null;
  };
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      id: null,
      name: null,
      email: null,
      displayName: null,
      setId: (id: string | null) => set({ id: id }),
      setName: (name: string | null) => set({ name: name }),
      setEmail: (email: string | null) => set({ email: email }),
      setDisplayName: (displayName: string | null) => set({ displayName: displayName }),
      getUser: () => ({
        id: get().id,
        name: get().name,
        email: get().email,
        displayName: get().displayName,
      }),
    }),
    {
      name: "user-storage",
    },
  ),
);
