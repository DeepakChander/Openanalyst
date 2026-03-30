'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
    text: string;
    className?: string;
    style?: React.CSSProperties;
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
    delay?: number;
    stagger?: number;
    splitBy?: 'word' | 'char';
    animation?: 'fade-up' | 'blur-in' | 'scale' | 'slide-right';
    trigger?: boolean; // true = scroll-triggered, false = immediate
}

export default function SplitText({
    text, className = '', style = {}, as: Tag = 'h2',
    delay = 0, stagger = 0.06, splitBy = 'word',
    animation = 'fade-up', trigger = true,
}: SplitTextProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const items = el.querySelectorAll('.split-item');
        const from: gsap.TweenVars = { opacity: 0 };

        if (animation === 'fade-up') { from.y = 20; from.filter = 'blur(4px)'; }
        else if (animation === 'blur-in') { from.filter = 'blur(8px)'; from.scale = 0.95; }
        else if (animation === 'scale') { from.scale = 0.8; }
        else if (animation === 'slide-right') { from.x = -30; }

        const anim = gsap.fromTo(items, from, {
            opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)',
            stagger, delay, duration: 0.6, ease: 'power3.out',
            ...(trigger ? { scrollTrigger: { trigger: el, start: 'top 85%' } } : {}),
        });

        return () => { anim.kill(); };
    }, [text, delay, stagger, animation, trigger]);

    const units = splitBy === 'word' ? text.split(' ') : text.split('');
    const separator = splitBy === 'word' ? ' ' : '';

    return (
        <div ref={ref} className={className} style={{ ...style, display: 'flex', flexWrap: 'wrap', gap: splitBy === 'word' ? '0 0.25em' : 0 }}>
            {units.map((unit, i) => (
                <span key={i} className="split-item" style={{ display: 'inline-block', opacity: 0 }}>
                    {unit}{separator}
                </span>
            ))}
        </div>
    );
}
