import React, { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outlinePrimary' | 'outlineSecondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const variantStyles = {
    base: 'flex w-full items-center justify-between rounded-lg border-2 px-5 py-2.5 font-semibold transition-colors focus:outline-none hover:scale-[0.85] transition-transform duration-200 cursor-pointer',

    primary: 'border-transparent bg-orange-base text-white hover:bg-orange-dark  ',
    secondary: 'border-transparent bg-orange-dark text-white hover:bg-orange-dark',
    outlinePrimary: 'border-orange-100 bg-transparent text-orange-base ',
    outlineSecondary: 'border-orange-200 bg-transparent text-orange-dark',

    disabled: 'cursor-not-allowed opacity-60',
};

export const Button = ({
    children,
    variant = 'primary',
    leftIcon,
    rightIcon,
    className,
    onClick,
    ...props
}: ButtonProps) => {
    const buttonClasses = [
        variantStyles.base,
        variantStyles[variant],
        props.disabled ? variantStyles.disabled : '',
        className,
    ].join(' ').trim();

    return (
        <button onClick={onClick} className={buttonClasses} {...props}>
            {leftIcon}
            <span>{children}</span>
            {rightIcon}
        </button>
    );
};
