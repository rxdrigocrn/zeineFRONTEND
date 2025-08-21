// Header.tsx
'use client';
import { PageType } from '@/app/(private)/home/page';
import { Plus, User, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface HeaderProps {
    activeTab: PageType;
    setActiveTab: (tab: PageType) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
    const [userImage, setUserImage] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detecta dispositivo móvel
    useEffect(() => {
        const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setUserImage(URL.createObjectURL(file));
    };

    const handleTabClick = (tab: PageType) => {
        setActiveTab(tab);
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="flex items-center justify-between px-4 md:px-6 py-4 bg-gray-100 shadow relative">
            {/* LOGO e botão mobile */}
            <div className="flex items-center gap-4">
                {isMobile && (
                    <button
                        className="p-2 rounded-md text-gray-700"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                )}
                <div className="flex-shrink-0">
                    <Image src="/logo.svg" alt="Logo" width={120} height={40} />
                </div>
            </div>

            {/* TABS desktop */}
            {!isMobile && (
                <div className="flex gap-4">
                    <button
                        className={`px-4 py-2 rounded ${activeTab === 'dashboard' ? 'bg-green-500 text-white' : 'bg-gray-200'
                            }`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        Dashboard
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${activeTab === 'produto' ? 'bg-green-500 text-white' : 'bg-gray-200'
                            }`}
                        onClick={() => setActiveTab('produto')}
                    >
                        Produto
                    </button>
                </div>
            )}

            {/* Botão + Avatar */}
            <div className="flex items-center gap-4">
                {!isMobile && (
                    <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        <Plus size={24} strokeWidth={1.5} /> Adicionar Produto
                    </button>
                )}

                {userImage ? (
                    <Image src={userImage} alt="User avatar" width={40} height={40} className="rounded-full object-cover" />
                ) : (
                    <label className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-400">
                        <User size={24} strokeWidth={1.5} />
                        <input type="file" className="hidden" onChange={handleUpload} />
                    </label>
                )}
            </div>

            {/* Menu Mobile */}
            {isMobile && isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-10 p-4 md:hidden">
                    <div className="flex flex-col gap-2">
                        <button
                            className={`px-4 py-3 rounded text-left ${activeTab === 'dashboard' ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
                            onClick={() => handleTabClick('dashboard')}
                        >
                            Dashboard
                        </button>
                        <button
                            className={`px-4 py-3 rounded text-left ${activeTab === 'produto' ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
                            onClick={() => handleTabClick('produto')}
                        >
                            Produto
                        </button>
                        <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded hover:bg-green-600 justify-center">
                            <Plus size={20} strokeWidth={1.5} /> Adicionar Produto
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
