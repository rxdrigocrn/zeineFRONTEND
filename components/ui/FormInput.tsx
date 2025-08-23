'use client';

import React, { useState, InputHTMLAttributes, ReactNode } from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

// 1. Adicionar a nova prop 'isFilled' na interface
export interface TextInputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    error?: string;
    leftIcon?: ReactNode;
    isFilled?: boolean;
}

export const TextInput = <T extends FieldValues>({
    label,
    name,
    register,
    error,
    leftIcon,
    isFilled,
    type = 'text',
    ...props
}: TextInputProps<T>) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordField = type === 'password';

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const inputType = isPasswordField ? (showPassword ? 'text' : 'password') : type;

    const hasError = !!error;

    const labelClasses = clsx(
        'mb-1 text-xs font-medium transition-colors',
        {
            'text-danger': hasError,
            'text-orange-base': !hasError && isFocused,
            'text-gray-200': !isFocused,

        }
    );

    const containerClasses = clsx(
        'flex items-center border-b transition-colors',
        {
            'border-danger text-danger': hasError,
            'border-gray-300 text-orange-base': !hasError && isFocused,
            'border-gray-100 text-gray-200': !hasError && !isFocused,
            'text-orange-base': !hasError && (isFocused || isFilled),
            'text-gray-200': !hasError && !isFocused && !isFilled,
        }
    );

    return (
        <div className="relative flex w-full flex-col">
            <label htmlFor={name} className={labelClasses}>
                {label}
            </label>

            <div className={containerClasses}>
                {leftIcon && <span className="ml-2">{leftIcon}</span>}

                <input
                    id={name}
                    type={inputType}
                    className="w-full border-none bg-transparent  px-2 py-2 text-gray-400 text-gray-400 outline-none placeholder:text-gray-200"
                    {...register(name)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />

                {isPasswordField && (
                    <button type="button" onClick={handleTogglePassword} className="cursor-pointer border-none bg-transparent p-2">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>

            {error && (
                <span className="mt-1 flex items-center gap-1 text-xs text-danger">
                    <AlertCircle className="h-3.5 w-3.5" /> {error}
                </span>
            )}
        </div>
    );
};  