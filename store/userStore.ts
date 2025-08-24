// src/store/useUserStore.ts
import { create } from "zustand";

type User = {
    id: string;
    name: string;
    email: string;
    profileImage?: string | null;
};

type UserStore = {
    user: User | null;
    setUser: (user: User | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));
