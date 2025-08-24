'use client';
import React from 'react';
import InputMask from 'react-input-mask';
import { Controller, useFormContext } from 'react-hook-form';
import { TextInput, TextInputProps } from '@/components/ui/FormInput';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface PhoneInputProps extends Omit<TextInputProps<any>, 'icon'> {
    name: string;
    label: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ name, label, ...rest }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <InputMask
                    mask="(99) 99999-9999"
                    value={field.value}
                    onChange={field.onChange}
                >
                     {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(inputProps: any) => <TextInput {...inputProps} label={label} {...rest} />}
                </InputMask>
            )}
        />
    );
};
