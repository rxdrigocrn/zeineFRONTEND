// app/not-found.tsx
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <h1 className="text-6xl font-bold mb-4 text-orange-base dark:text-orange-dark">
                404
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-200 mb-8">
                Ops! Página não encontrada.
            </p>
            <button
                onClick={() => router.push('/')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-base hover:bg-orange-dark text-white rounded-lg shadow-lg transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                Voltar para Home
            </button>
        </div>
    );
}
