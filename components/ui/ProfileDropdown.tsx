'use client';

import React from 'react';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import ProfileFileInput from './ProfileFileInput';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

const ProfileDropdown = () => {
    const { user } = useUserStore();
    const router = useRouter();

    const getInitials = (name: string) => {
        if (!name) return '?';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase();
    };

    const handleLogout = async () => {
        await api('/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    const profileUrl = user?.profileImage
        ? `${user.profileImage.replace(/\\/g, '/')}`
        : undefined;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="focus:outline-none">
                    <Avatar className="h-12 w-12 border-2 relative overflow-hidden">
                        {profileUrl ? (
                            <Image
                                src={profileUrl}
                                alt={user?.name || ''}
                                fill
                                className="object-cover pointer-events-none"
                            />
                        ) : user ? (
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        ) : (
                            <AvatarFallback>?</AvatarFallback>
                        )}
                    </Avatar>
                </button>
            </DropdownMenuTrigger>

            {user && (
                <DropdownMenuContent className="w-54 z-50" align="end">
                    <DropdownMenuLabel>
                        <div className="flex gap-4 items-center space-y-1">
                            <ProfileFileInput initialImage={profileUrl} />
                            <p className="text-gray-300 max-w-3xs truncate">{user.name}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-500 hover:!text-red-500 focus:!text-red-500 cursor-pointer group flex items-center justify-between"
                    >
                        <span>Sair</span>
                        <LogOut className="mr-2 h-4 w-4" />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    );
};

export default ProfileDropdown;
