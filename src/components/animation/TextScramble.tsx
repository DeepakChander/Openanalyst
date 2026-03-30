'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TextScrambleProps {
    text: string;
    trigger?: boolean;
    className?: string;
    style?: React.CSSProperties;
    speed?: number;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';

export default function TextScramble({
    text, trigger = true, className = '', style = {}, speed = 35,
}: TextScrambleProps) {
    const [display, setDisplay] = useState(text);
    const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (!trigger) { setDisplay(text); return; }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setDisplay(text); return; }

        let frame = 0;
        const totalFrames = 25;

        animRef.current = setInterval(() => {
            setDisplay(
                text.split('').map((char, i) => {
                    if (char === ' ') return ' ';
                    if (frame / totalFrames > i / text.length) return char;
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                }).join('')
            );
            frame++;
            if (frame > totalFrames) {
                if (animRef.current) clearInterval(animRef.current);
            }
        }, speed);

        return () => { if (animRef.current) clearInterval(animRef.current); };
    }, [trigger, text, speed]);

    return <span className={className} style={style}>{display}</span>;
}
