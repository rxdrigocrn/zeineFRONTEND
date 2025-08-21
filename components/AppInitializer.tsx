'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export function AppInitializer() {
    const checkAuth = useAuthStore((state) => state.checkAuth);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return null;
}