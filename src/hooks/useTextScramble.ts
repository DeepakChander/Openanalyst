'use client';
import { useState, useCallback, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

export function useTextScramble(originalText: string, speed = 30) {
    const [displayText, setDisplayText] = useState(originalText);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const iterationRef = useRef(0);

    const scramble = useCallback(() => {
        iterationRef.current = 0;
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(
                originalText
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' ';
                        if (index < iterationRef.current) return originalText[index];
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join('')
            );

            if (iterationRef.current >= originalText.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }
            iterationRef.current += 1 / 3;
        }, speed);
    }, [originalText, speed]);

    const reset = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(originalText);
    }, [originalText]);

    return { displayText, scramble, reset };
}
