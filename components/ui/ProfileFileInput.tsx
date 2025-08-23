'use client';

import React, { useState, InputHTMLAttributes } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import clsx from 'clsx';

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    onFileSelect?: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({
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
        <div className="flex flex-col items-center justify-center">
            <label
                className={clsx(
                    'w-[120px] h-[120px] flex items-center justify-center cursor-pointer transition overflow-hidden',
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
                    <ImageIcon className="text-orange-base" size={32} />
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

export default FileInput;