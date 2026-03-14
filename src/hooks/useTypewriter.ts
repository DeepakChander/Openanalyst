'use client';
import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
    words: string[];
    speed?: number;
    deleteSpeed?: number;
    pauseTime?: number;
    loop?: boolean;
}

export function useTypewriter({ words, speed = 80, deleteSpeed = 50, pauseTime = 2000, loop = true }: UseTypewriterOptions) {
    const [text, setText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const tick = useCallback(() => {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            setText(currentWord.substring(0, text.length - 1));
        } else {
            setText(currentWord.substring(0, text.length + 1));
        }
    }, [text, wordIndex, isDeleting, words]);

    useEffect(() => {
        if (isComplete) return;
        const currentWord = words[wordIndex];

        let timeout: NodeJS.Timeout;

        if (!isDeleting && text === currentWord) {
            if (!loop && wordIndex === words.length - 1) {
                setIsComplete(true);
                return;
            }
            timeout = setTimeout(() => setIsDeleting(true), pauseTime);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
        } else {
            timeout = setTimeout(tick, isDeleting ? deleteSpeed : speed);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex, words, speed, deleteSpeed, pauseTime, loop, isComplete, tick]);

    return { text, isComplete, isDeleting };
}
