'use client';

import React, { useState, InputHTMLAttributes } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import clsx from 'clsx';

interface ProductFileInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    onFileSelect?: (file: File | null) => void;
}

const ProductFileInput: React.FC<ProductFileInputProps> = ({
    label,
    error,
    onFileSelect,
    ...props
}) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setPreview(URL.createObjectURL(file));
            onFileSelect?.(file);
        } else {
            setPreview(null);
            onFileSelect?.(null);
        }
    };

    return (
        <div className="flex flex-col">
            <label
                className={clsx(
                    'w-full h-[340px] sm:w-[415px] sm:h-[340px] flex items-center justify-center cursor-pointer transition overflow-hidden',
                    'bg-shape-dark rounded-xl'
                )}
            >
                {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-xl"
                    />
                ) : (
                    <div className="flex flex-col items-center">
                        <ImageIcon className="text-orange-base" size={36} />
                        <span className="text-gray-200 text-xs text-center mt-1">Selecione a imagem <br /> do produto</span>
                    </ div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                    {...props}
                />
            </label>
            {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
        </div>
    );
};

export default ProductFileInput;

