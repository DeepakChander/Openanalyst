'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayerProps {
    children: React.ReactNode;
    speed?: number; // negative = opposite direction
    className?: string;
    style?: React.CSSProperties;
}

export default function ParallaxLayer({
    children, speed = 0.5, className = '', style = {},
}: ParallaxLayerProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const tween = gsap.to(el, {
            y: speed * -100,
            ease: 'none',
            scrollTrigger: {
                trigger: el.parentElement || el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
        });

        return () => { tween.kill(); };
    }, [speed]);

    return <div ref={ref} className={className} style={{ ...style, willChange: 'transform' }}>{children}</div>;
}
