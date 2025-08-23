"use client";

import { Plus, User, Menu, X, ChartColumnIncreasing, PackageIcon } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { TabsButton } from "../ui/TabButton";
import { useRouter, usePathname } from "next/navigation";
import { SurpriseTooltip } from "../ui/SurpriseTooltip";

export default function Header() {
    const [userImage, setUserImage] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const router = useRouter();
    const pathname = usePathname(); // 🔥 rota atual

    useEffect(() => {
        const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);
        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setUserImage(URL.createObjectURL(file));
    };

    return (
        <header className="flex items-center justify-between px-2 md:px-4 py-4 shadow-xs relative">
            <div className="flex items-center gap-4 w-1/3">
                {isMobile && (
                    <button
                        className="p-2 rounded-md text-gray-700"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                )}
                <div className="flex-shrink-0">
                    <Image src="/LogoSemTexto.svg" alt="Logo" width={56} height={40} />
                </div>
            </div>

            {/* Coluna centro */}
            {!isMobile && (
                <div className="flex justify-center w-1/3">
                    <div className="flex gap-2">
                        <TabsButton
                            icon={<ChartColumnIncreasing />}
                            label="Dashboard"
                            isActive={pathname === "/dashboard"}
                            onClick={() => router.push("/dashboard")}
                        />
                        <TabsButton
                            icon={<PackageIcon />}
                            label="Produto"
                            isActive={pathname.startsWith("/produto")}
                            onClick={() => router.push("/produto")}
                        />
                    </div>
                </div>
            )}

            {/* Coluna direita */}
            <div className="flex items-center justify-end gap-4 w-1/3">
                {!isMobile && (
                    <SurpriseTooltip tooltipContent="Tá esperando o quê? Boraa moeer!! 🚀" >
                        <button
                            onClick={() => router.push("/produto/form")}
                            className="flex items-center gap-2 bg-orange-base text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-orange-700"
                        >
                            <Plus size={24} strokeWidth={1.5} /> Adicionar Produto
                        </button>
                    </SurpriseTooltip>
                )}
                {userImage ? (
                    <Image
                        src={userImage}
                        alt="User avatar"
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                    />
                ) : (
                    <label className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-400">
                        <User size={24} strokeWidth={1.5} />
                        <input type="file" className="hidden" onChange={handleUpload} />
                    </label>
                )}
            </div>

            {isMobile && isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-shape-base shadow-lg z-10 p-4 md:hidden">
                    <div className="flex flex-col gap-2">
                        <TabsButton
                            icon={<ChartColumnIncreasing />}
                            label="Dashboard"
                            isActive={pathname === "/dashboard"}
                            onClick={() => router.push("/dashboard")}
                            className="w-full justify-start px-4 py-3"
                        />
                        <TabsButton
                            icon={<PackageIcon />}
                            label="Produto"
                            isActive={pathname.startsWith("/produto")}
                            onClick={() => router.push("/produto")}
                            className="w-full justify-start px-4 py-3"
                        />
                        <SurpriseTooltip tooltipContent="Tá esperando o quê? Boraa moeer!! 🚀" >
                            <button
                                onClick={() => router.push("/produto/form")}
                                className="flex items-center mx-auto gap-2 bg-orange-base text-white px-2 py-1 rounded-xl cursor-pointer hover:bg-orange-700"
                            >
                                <Plus size={24} strokeWidth={1.5} /> Adicionar Produto
                            </button>
                        </SurpriseTooltip>


                    </div>
                </div>
            )}
        </header>
    );
}
