'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';

interface CountUpProps {
    value: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
    duration?: number;
    className?: string;
    style?: React.CSSProperties;
}

export default function CountUp({
    value, suffix = '', prefix = '', decimals = 0,
    duration = 2.5, className = '', style = {},
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.5 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (!visible || !ref.current) return;
        const obj = { val: 0 };
        gsap.to(obj, {
            val: value, duration, ease: 'power2.out',
            onUpdate: () => {
                if (ref.current) {
                    ref.current.textContent = prefix + (decimals > 0 ? obj.val.toFixed(decimals) : Math.round(obj.val).toString()) + suffix;
                }
            },
        });
    }, [visible, value, suffix, prefix, decimals, duration]);

    return <span ref={ref} className={className} style={style}>{prefix}0{suffix}</span>;
}
