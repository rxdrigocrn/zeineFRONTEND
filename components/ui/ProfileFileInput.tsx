'use client';

import React, { useState, InputHTMLAttributes, useEffect } from 'react';
import Image from 'next/image';
import { Image as ImageIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from './avatar';
import { useUserStore } from '@/store/userStore';
import { api } from '@/lib/api';
import { toast } from 'react-toastify';

interface ProfileFileInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    initialImage?: string;
    isRegister?: boolean;
    onFileSelect?: (file: File | null) => void;
    sizeInput?: string;
    iconSize?: number;
    previewUrl?: string;
}

const ProfileFileInput: React.FC<ProfileFileInputProps> = ({
    label,
    error,
    initialImage,
    isRegister = false,
    onFileSelect,
    sizeInput = 'w-12 h-12',
    iconSize = 16,
    previewUrl,
    ...props
}) => {
    const { setUser } = useUserStore();
    const [preview, setPreview] = useState<string | null>(initialImage || null);
    const [hover, setHover] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setPreview(initialImage || null);
    }, [initialImage]);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (!file) {
            setPreview(initialImage || null);
            if (onFileSelect) onFileSelect(null);
            return;
        }

        const tempPreview = URL.createObjectURL(file);
        setPreview(tempPreview);

        if (isRegister) {
            if (onFileSelect) onFileSelect(file);
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('profileImage', file);

            const res = await api(`/users/profile`, {
                method: 'PATCH',
                body: formData,
            });

            setUser(res);
            const profileUrl = res.profileImage ? `${res.profileImage.replace(/\\/g, '/')}` : null;
            setPreview(profileUrl);

        } catch (err) {
            if (err instanceof Error) {
                toast.error(err?.message || 'Erro ao atualizar imagem');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center relative">
            <label
                className="cursor-pointer relative"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <Avatar className={`${sizeInput} relative overflow-hidden`}>
                    {preview ? (
                        <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <AvatarFallback>
                            <ImageIcon className={`${hover ? 'text-white' : ''}`} size={iconSize} />
                        </AvatarFallback>
                    )}

                    {/* Hover Overlay */}
                    {hover && !loading && (
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-xs rounded-xl">
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleChange}
                        {...props}
                    />

                    {/* Loader */}
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                            <div className="loader-border w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                </Avatar>
            </label>

            {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
        </div>
    );
};

export default ProfileFileInput;
