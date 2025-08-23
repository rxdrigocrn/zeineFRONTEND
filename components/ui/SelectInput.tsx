'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, ChevronUp, Mail, X } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface SelectItem {
    label: string;
    value: string;
}

interface SelectInputProps {
    label: string;
    items: SelectItem[];
    onSelect?: (item: SelectItem | null) => void;
}

const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
};

const SelectInput: React.FC<SelectInputProps> = ({ label, items, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<SelectItem | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (item: SelectItem) => {
        setSelected(item);
        setIsOpen(false);
        onSelect?.(item);
    };

    const handleClear = () => {
        setSelected(null);
        onSelect?.(null);
    };

    const isActive = isOpen;
    const isFilled = !!selected;

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* Label */}
            <label
                className={clsx(
                    'px-1 transition-all  pointer-events-none text-sm font-medium',
                    isActive ? 'text-orange-base' : isFilled ? 'text-gray-700' : 'text-gray-400'
                )}
            >
                {label}
            </label>

            {/* Trigger */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between  cursor-pointer w-full px-3 py-2 border-b transition-colors relative z-10"
            >
                <span className="flex items-center gap-2">
                    {selected ? (
                        <span className={clsx(isActive ? 'text-orange-base' : 'text-gray-700')}>
                            {selected.label}
                        </span>
                    ) : (
                        <span className="text-gray-400">Selecione...</span>
                    )}
                </span>
                <div className="flex items-center gap-3">
                    {selected && (
                        <div className="rounded-full bg-shape-dark p-1">
                            <X
                                className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClear();
                                }}
                            />
                        </div>
                    )}
                    {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                </div>
            </button>

            {/* Dropdown com animação aprimorada */}
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto z-20 origin-top"
                    >
                        {items.map((item, index) => {
                            const isSelected = selected?.value === item.value;
                            return (
                                <motion.li
                                    key={item.value}
                                    onClick={() => handleSelect(item)}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    transition={{ duration: 0.15, delay: index * 0.03 }}
                                    className={clsx(
                                        'flex items-center justify-between px-3 py-2 cursor-pointer transition-colors',
                                        isSelected
                                            ? 'text-orange-base font-medium'
                                            : 'text-gray-600 hover:text-orange-500'
                                    )}
                                >
                                    {item.label}
                                    {isSelected && <Check className="w-4 h-4 text-orange-base" />}
                                </motion.li>
                            );
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SelectInput;
