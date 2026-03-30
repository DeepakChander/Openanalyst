'use client';

import React, { useRef, useCallback } from 'react';
import { gsap } from 'gsap';

interface MagneticElementProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    strength?: number;
}

export default function MagneticElement({
    children, className = '', style = {}, strength = 0.3,
}: MagneticElementProps) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        gsap.to(ref.current, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
    }, [strength]);

    const handleLeave = useCallback(() => {
        if (!ref.current) return;
        gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    }, []);

    return (
        <div
            ref={ref}
            className={className}
            style={{ ...style, willChange: 'transform', display: 'inline-flex' }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
        >
            {children}
        </div>
    );
}
