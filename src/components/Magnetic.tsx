'use client';

import React, { useRef, useCallback } from 'react';
import { gsap } from 'gsap';

interface MagneticProps {
    children: React.ReactNode;
    strength?: number;
    className?: string;
}

export default function Magnetic({ children, strength = 0.3, className = '' }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * strength;
        const y = (e.clientY - rect.top - rect.height / 2) * strength;

        gsap.to(ref.current, {
            x,
            y,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)',
        });
    }, [strength]);

    const handleMouseLeave = useCallback(() => {
        if (!ref.current) return;
        gsap.to(ref.current, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)',
        });
    }, []);

    return (
        <div
            ref={ref}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ display: 'inline-block' }}
        >
            {children}
        </div>
    );
}
