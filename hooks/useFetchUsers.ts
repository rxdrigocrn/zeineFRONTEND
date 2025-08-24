// src/hooks/useFetchUser.ts
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { api } from "@/lib/api";

export function useFetchUser() {
    const { user, setUser } = useUserStore();

    useEffect(() => {
        if (!user) {
            api("/users/me", { method: "GET" })
                .then((res) => setUser(res))
                .catch(() => setUser(null));
        }
    }, [user, setUser]);
}
