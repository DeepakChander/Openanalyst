'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

const SLICE_COUNT = 5;

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const slicesRef = useRef<HTMLDivElement[]>([]);
    const pathname = usePathname();
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const slices = slicesRef.current.filter(Boolean);
        if (slices.length === 0) return;

        const tl = gsap.timeline();

        // Wipe in from top — dark slices with orange accent on middle
        tl.set(slices, { scaleY: 0, transformOrigin: 'top center' });
        tl.to(slices, {
            scaleY: 1,
            duration: 0.35,
            stagger: 0.05,
            ease: 'power4.inOut',
        });

        // Wipe out to bottom
        tl.set(slices, { transformOrigin: 'bottom center' });
        tl.to(slices, {
            scaleY: 0,
            duration: 0.35,
            stagger: 0.05,
            ease: 'power4.inOut',
        }, '+=0.08');
    }, [pathname]);

    return (
        <>
            {children}
            <div style={{ position: 'fixed', inset: 0, zIndex: 10000, pointerEvents: 'none', display: 'flex' }} aria-hidden="true">
                {Array.from({ length: SLICE_COUNT }).map((_, i) => (
                    <div
                        key={i}
                        ref={(el) => { if (el) slicesRef.current[i] = el; }}
                        style={{
                            flex: 1,
                            height: '100%',
                            background: i === Math.floor(SLICE_COUNT / 2)
                                ? 'linear-gradient(180deg, #0A0A0B 0%, #111113 40%, #FF6B00 100%)'
                                : '#0A0A0B',
                            transform: 'scaleY(0)',
                        }}
                    />
                ))}
            </div>
        </>
    );
};

export default PageTransition;
