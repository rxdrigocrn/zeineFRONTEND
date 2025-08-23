'use client';

import React, { useState, TextareaHTMLAttributes, ReactNode } from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';
import clsx from 'clsx';

export interface TextAreaInputProps<T extends FieldValues>
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    error?: string;
    leftIcon?: ReactNode;
    placeholder?: string;
    isFilled?: boolean;
}

export const TextAreaInput = <T extends FieldValues>({
    label,
    name,
    register,
    error,
    leftIcon,
    isFilled,
    placeholder,
    ...props
}: TextAreaInputProps<T>) => {
    const [isFocused, setIsFocused] = useState(false);

    const hasError = !!error;

    const labelClasses = clsx('mb-1 text-xs font-medium transition-colors', {
        'text-danger': hasError,
        'text-orange-base': !hasError && isFocused,
        'text-gray-200': !isFocused,
    });

    const containerClasses = clsx('flex items-center border-b transition-colors', {
        'border-danger text-danger': hasError,
        'border-gray-300 text-orange-base': !hasError && isFocused,
        'border-gray-100 text-gray-200': !hasError && !isFocused,
        'text-orange-base': !hasError && (isFocused || isFilled),
        'text-gray-200': !hasError && !isFocused && !isFilled,
    });

    return (
        <div className="relative flex w-full flex-col">
            <label htmlFor={name} className={labelClasses}>
                {label}
            </label>

            <div className={containerClasses}>
                {leftIcon && <span className="ml-2">{leftIcon}</span>}

                <textarea
                    id={name}
                    className="w-full border-none bg-transparent px-2 py-2 text-gray-400 outline-none placeholder:text-gray-200 resize-none"
                    {...register(name)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                    placeholder={placeholder || 'Digite aqui...'}
                />
            </div>

            {error && (
                <span className="mt-1 flex items-center gap-1 text-xs text-danger">
                    <AlertCircle className="h-3.5 w-3.5" /> {error}
                </span>
            )}
        </div>
    );
};
