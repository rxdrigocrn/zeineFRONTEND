// store/authStore.ts
import { create } from 'zustand';
import { api } from '@/lib/api';
import { User } from '@/types/index';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    checkAuth: () => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<any>;
    login: (email: string, password: string) => Promise<User>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    checkAuth: async () => {
        try {
            const user: User = await api('/auth/profile');
            set({ user, isAuthenticated: true });
        } catch {
            set({ user: null, isAuthenticated: false });
        } finally {
            set({ isLoading: false });
        }
    },

    register: async (name, email, password) => {
        return await api('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });
    },

    login: async (email, password) => {
        const user: User = await api('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        set({ user, isAuthenticated: true });
        return user;
    },

    logout: async () => {
        await api('/auth/logout', { method: 'POST' });
        set({ user: null, isAuthenticated: false });
    },
}));