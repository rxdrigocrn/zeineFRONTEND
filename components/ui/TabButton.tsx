'use client';

import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface TabsButtonProps {
    icon: ReactNode;
    label: string;
    isActive?: boolean;
    onClick?: () => void;
    className?: string; 
}

export const TabsButton: React.FC<TabsButtonProps> = ({ icon, label, isActive, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={clsx(
                'flex items-center gap-2 px-4 py-0 rounded-lg transition-colors font-medium text-sm h-[40px] cursor-pointer min-w-[120px]',
                isActive
                    ? 'bg-shape-dark text-orange-base'
                    : 'bg-transparent text-gray-300 hover:text-orange-100',
                className
            )}
        >
            <span className="w-5 h-5">{icon}</span>
            {label}
        </button>
    );
};
