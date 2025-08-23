"use client";

import { useEffect, useRef, useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface SurpriseTooltipProps {
    children: React.ReactNode;
    delay?: number;            // tempo pressionando (ms) — padrão 7000 
    autoCloseMs?: number;
    tooltipContent: React.ReactNode;
}

export function SurpriseTooltip({
    children,
    delay = 7000,
    autoCloseMs = 0,
    tooltipContent,
}: SurpriseTooltipProps) {
    const [open, setOpen] = useState(false);
    const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const autoCloseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startHold = () => {
        clearHold();
        holdTimerRef.current = setTimeout(() => {
            setOpen(true);
            if (autoCloseMs > 0) {
                if (autoCloseRef.current) clearTimeout(autoCloseRef.current);
                autoCloseRef.current = setTimeout(() => setOpen(false), autoCloseMs);
            }
        }, delay);
    };

    const clearHold = () => {
        if (holdTimerRef.current) {
            clearTimeout(holdTimerRef.current);
            holdTimerRef.current = null;
        }
    };

    const endHold = () => {
        clearHold();
    };

    useEffect(() => {
        return () => {
            clearHold();
            if (autoCloseRef.current) clearTimeout(autoCloseRef.current);
        };
    }, []);

    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip
                open={open}
                onOpenChange={(next) => {
                    if (!next) setOpen(false);
                }}
            >
                <TooltipTrigger
                    asChild
                    onMouseDown={startHold}
                    onMouseUp={endHold}
                    onMouseLeave={endHold}
                    onTouchStart={startHold}
                    onTouchEnd={endHold}
                >
                    {children}
                </TooltipTrigger>

                <TooltipContent side="top">
                    {tooltipContent}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
export default SurpriseTooltip;