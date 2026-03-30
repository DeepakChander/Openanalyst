'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    delay?: number;
    duration?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotate?: number;
    blur?: number;
    once?: boolean;
    start?: string;
}

export default function ScrollReveal({
    children, className = '', style = {},
    delay = 0, duration = 0.8, y = 40, x = 0, scale = 1, rotate = 0, blur = 0,
    once = true, start = 'top 88%',
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        gsap.fromTo(el,
            { y, x, opacity: 0, scale, rotate, filter: blur ? `blur(${blur}px)` : 'none' },
            {
                y: 0, x: 0, opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)',
                duration, delay, ease: 'power3.out',
                scrollTrigger: { trigger: el, start, toggleActions: once ? 'play none none none' : 'play none none reverse' },
            }
        );

        return () => { ScrollTrigger.getAll().forEach(t => { if (t.trigger === el) t.kill(); }); };
    }, [y, x, scale, rotate, blur, delay, duration, once, start]);

    return <div ref={ref} className={className} style={{ opacity: 0, ...style }}>{children}</div>;
}
