'use client';

import React, { useState, useEffect, InputHTMLAttributes } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import clsx from 'clsx';

interface ProductFileInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    onFileSelect?: (file: File | null) => void;
    previewUrl?: string;
}

const ProductFileInput: React.FC<ProductFileInputProps> = ({
    error,
    onFileSelect,
    previewUrl,
    ...props
}) => {
    const [preview, setPreview] = useState<string | null>(previewUrl || null);
    const [hover, setHover] = useState(false);

    // Atualiza preview quando o prop previewUrl mudar
    useEffect(() => {
        setPreview(previewUrl || null);
    }, [previewUrl]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setPreview(URL.createObjectURL(file));
            onFileSelect?.(file);
        } else {
            setPreview(previewUrl || null);
            onFileSelect?.(null);
        }
    };

    return (
        <div className="flex flex-col">
            <label
                className={clsx(
                    'w-full h-[340px] sm:w-[415px] sm:h-[340px] relative flex items-center justify-center cursor-pointer overflow-hidden rounded-xl transition',
                    'bg-shape-dark'
                )}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                {preview ? (
                    <>
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-xl"
                        />
                        {hover && (
                            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-xs text-center">
                                <ImageIcon size={36} />
                                <span className="mt-1">Selecione a imagem do produto</span>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center">
                        <ImageIcon className="text-orange-base" size={36} />
                        <span className="text-gray-200 text-xs text-center mt-1">
                            Selecione a imagem do produto
                        </span>
                    </div>
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
