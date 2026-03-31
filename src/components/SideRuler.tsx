'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
    { id: 'hero-section', label: 'Home', top: 50 },
    { id: 'features', label: 'Features', top: 220 },
    { id: 'how-it-works', label: 'How It Works', top: 310 },
    { id: 'testimonials', label: 'Testimonials', top: 480 },
    { id: 'platform', label: 'Platform', top: 560 },
];

/* Tick pattern: repeating groups of varying widths */
const TICK_PATTERN = [6, 10, 6, 14, 6, 30, 12, 6, 16, 6];
const TICK_SPACING = 10;
const RULER_HEIGHT = 760;

const SideRuler: React.FC = () => {
    const rulerRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        const el = rulerRef.current;
        if (!el) return;

        // Entrance animation
        gsap.to(el, {
            opacity: 1, x: 0, duration: 0.8, delay: 1.5,
            ease: 'power3.out',
        });

        // Track active section
        SECTIONS.forEach((sec, i) => {
            const target = document.getElementById(sec.id);
            if (!target) return;
            ScrollTrigger.create({
                trigger: target,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveIdx(i),
                onEnterBack: () => setActiveIdx(i),
            });
        });

        return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, []);

    // Move arrow to active section position
    useEffect(() => {
        if (arrowRef.current) {
            gsap.to(arrowRef.current, {
                top: SECTIONS[activeIdx].top,
                duration: 0.5,
                ease: 'power3.out',
            });
        }
    }, [activeIdx]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Generate tick marks
    const ticks = [];
    for (let y = 0; y <= RULER_HEIGHT; y += TICK_SPACING) {
        const patternIdx = (y / TICK_SPACING) % TICK_PATTERN.length;
        const width = TICK_PATTERN[patternIdx];
        const isLong = width >= 30;
        ticks.push(
            <div key={y} className="absolute left-0 h-px" style={{
                top: y,
                width,
                backgroundColor: isLong ? 'var(--text-muted)' : 'var(--border)',
                transition: 'background-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1)',
            }} />
        );
    }

    return (
        <div
            ref={rulerRef}
            className="fixed left-6 z-30 hidden lg:flex items-center"
            style={{
                top: 56, bottom: 0,
                pointerEvents: 'none',
                opacity: 0,
                transform: 'translateX(-30px)',
            }}
        >
            <div className="relative" style={{ height: RULER_HEIGHT, width: 70 }}>
                {/* Vertical line */}
                <div className="absolute left-0 top-0 w-px" style={{ height: RULER_HEIGHT, background: 'var(--border)' }} />

                {/* Tick marks */}
                {ticks}

                {/* Scroll arrow indicator */}
                <div ref={arrowRef} className="absolute" style={{ top: SECTIONS[0].top, transform: 'none' }}>
                    <svg width="8" height="10" viewBox="0 0 8 10" fill="none" className="absolute" style={{ left: -13, top: -5 }}>
                        <path d="M8 5L0 0V10L8 5Z" fill="#FF6B00" />
                    </svg>
                    {/* Orange horizontal line across viewport */}
                    <div className="absolute h-px" style={{
                        top: 0, left: 0,
                        width: 'calc(100vw - 24px)',
                        backgroundColor: '#FF6B00',
                        opacity: 0.3,
                    }} />
                    {/* CTA button at right end */}
                    <a
                        href="https://app.openanalyst.com"
                        className="absolute group"
                        style={{
                            left: 'calc(100vw - 48px)',
                            top: 0,
                            transform: 'translateX(-100%) translateY(-50%)',
                            pointerEvents: 'auto',
                        }}
                    >
                        <div className="font-mono text-[12px] font-semibold tracking-[0.14em] uppercase px-4 py-2.5 transition-transform duration-200 group-hover:scale-105 group-active:scale-95" style={{
                            backgroundColor: '#FF6B00',
                            color: '#fff',
                            whiteSpace: 'nowrap',
                        }}>
                            Get Started
                        </div>
                    </a>
                </div>

                {/* Section labels */}
                {SECTIONS.map((sec, i) => (
                    <button
                        key={sec.id}
                        onClick={() => scrollTo(sec.id)}
                        className="absolute left-0 group cursor-pointer"
                        style={{
                            top: sec.top + 16,
                            height: 28,
                            paddingLeft: 42,
                            display: 'flex',
                            alignItems: 'center',
                            pointerEvents: 'auto',
                            background: 'none',
                            border: 'none',
                        }}
                    >
                        <span
                            className="text-[12px] font-medium tracking-[0.08em] uppercase whitespace-nowrap transition-all duration-300"
                            style={{
                                color: activeIdx === i ? '#FF6B00' : 'var(--text-muted)',
                                opacity: activeIdx === i ? 1 : 0.4,
                                filter: activeIdx === i ? 'blur(0px)' : 'blur(2px)',
                                transform: activeIdx === i ? 'translateX(0)' : 'translateX(-6px)',
                            }}
                        >
                            {sec.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SideRuler;
