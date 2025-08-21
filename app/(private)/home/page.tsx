// Home.tsx
'use client';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Dashboard from '@/components/layout/Dashboard';
import Produto from '@/components/layout/Produto';

export type PageType = 'dashboard' | 'produto';

const Home = () => {
    const [activeTab, setActiveTab] = useState<PageType>('dashboard');

    return (
        <div className="min-h-screen flex flex-col">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="flex-1 p-4 md:p-6">
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'produto' && <Produto />}
            </main>
        </div>
    );
};

export default Home;
