'use client';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextInput, TextInputProps } from '@/components/ui/FormInput';
import clsx from 'clsx';

interface PriceInputProps extends Omit<TextInputProps<any>, 'icon'> {
    name: string;
    label: string;
}

export const PriceInput: React.FC<PriceInputProps> = ({ name, label, ...rest }) => {
    const { control } = useFormContext();

    const formatPrice = (value: string) => {
        if (!value) return '';
        const onlyNumbers = value.replace(/\D/g, '');
        const number = parseFloat(onlyNumbers) / 100;
        return number.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TextInput
                    {...field}
                    {...rest}
                    label={label}
                    leftIcon={<span className="text-orange-base">R$</span>}
                    onChange={(e) => field.onChange(formatPrice(e.target.value))}
                />
            )}
        />
    );
};
