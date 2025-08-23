import Header from '@/components/layout/Header';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 p-4 md:p-6">
                {children}
            </main>
        </div>
    );
}