'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CursorGlow: React.FC = () => {
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isMobile || prefersReduced) return;

        const glow = glowRef.current;
        if (!glow) return;

        const handleMouseMove = (e: MouseEvent) => {
            gsap.to(glow, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.8,
                ease: 'power2.out',
            });
        };

        const handleMouseEnter = () => {
            gsap.to(glow, { opacity: 1, duration: 0.3 });
        };

        const handleMouseLeave = () => {
            gsap.to(glow, { opacity: 0, duration: 0.3 });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return <div ref={glowRef} className="cursor-glow" style={{ opacity: 0 }} />;
};

export default CursorGlow;
