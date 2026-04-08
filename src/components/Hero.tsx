'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const WORDS = ['Campaigns', 'Analytics', 'Content', 'Ads', 'SEO'];
const WORD_COLORS: Record<string, string> = {
    Campaigns: '#FF6B00', Analytics: '#8B5CF6', Content: '#10B981', Ads: '#3B82F6', SEO: '#F59E0B',
};



/* ── Cycling word ── */
function CyclingWord({ words }: { words: string[] }) {
    const [index, setIndex] = useState(0);
    const wordRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!wordRef.current) return;
            gsap.to(wordRef.current, {
                y: -16, opacity: 0, filter: 'blur(6px)', duration: 0.35, ease: 'power2.in',
                onComplete: () => {
                    setIndex(prev => (prev + 1) % words.length);
                    if (wordRef.current) {
                        gsap.fromTo(wordRef.current,
                            { y: 16, opacity: 0, filter: 'blur(6px)' },
                            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.45, ease: 'power2.out' }
                        );
                    }
                }
            });
        }, 2800);
        return () => clearInterval(interval);
    }, [words]);

    const word = words[index];
    const color = WORD_COLORS[word] || '#FF6B00';

    return (
        <span className="relative inline-block">
            <span ref={wordRef} className="inline-block" style={{ color }}>{word}</span>
            <span className="absolute bottom-[-4px] left-0 right-0 h-1 rounded-sm" style={{ background: `linear-gradient(90deg, ${color}, ${color}60)` }} />
        </span>
    );
}

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        /* Entrance animations */
        gsap.from('.hero-word', { y: 30, duration: 0.8, stagger: 0.06, ease: 'power3.out', delay: 0.2 });
        gsap.from('.hero-cycling', { y: 20, duration: 0.6, ease: 'power3.out', delay: 0.7 });
        gsap.from('.hero-subtitle', { y: 15, duration: 0.5, delay: 0.9 });
        gsap.from('.hero-cta', { y: 10, duration: 0.4, stagger: 0.08, delay: 1.1 });
        gsap.from('.hero-proof', { y: 10, duration: 0.4, delay: 1.3 });

        /* Scroll-driven 3D perspective transform */
        if (innerRef.current) {
            gsap.to(innerRef.current, {
                y: 80,
                scale: 0.92,
                rotateX: -5,
                opacity: 0.6,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }
    }, { scope: heroRef });

    return (
        <section id="hero-section" ref={heroRef} className="relative overflow-hidden min-h-screen flex items-center" style={{
            background: 'var(--bg-primary)',
            perspective: 1200,
            maskImage: 'linear-gradient(to bottom, black 0%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 92%, transparent 100%)',
        }}>
          <div ref={innerRef} className="absolute inset-0 flex items-center" style={{ willChange: 'transform', transformOrigin: 'center top' }}>

            {/* Grid background */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{
                backgroundImage: 'linear-gradient(to right, rgba(15,23,42,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.07) 1px, transparent 1px)',
                backgroundSize: '56px 56px',
                maskImage: 'radial-gradient(ellipse 80% 85% at 50% 40%, black 0%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse 80% 85% at 50% 40%, black 0%, transparent 70%)',
            }} />

            {/* Vertical accent lines */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0" style={{ left: '10%', width: 1, background: 'linear-gradient(to bottom, rgba(255,107,0,0.25) 0%, rgba(255,107,0,0.5) 50%, transparent 100%)' }} />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0" style={{ left: '25%', width: 1, background: 'linear-gradient(to bottom, rgba(255,107,0,0.15) 0%, rgba(255,107,0,0.25) 50%, transparent 100%)' }} />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0" style={{ right: '25%', width: 1, background: 'linear-gradient(to bottom, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.25) 50%, transparent 100%)' }} />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0" style={{ right: '10%', width: 1, background: 'linear-gradient(to bottom, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.5) 50%, transparent 100%)' }} />

            {/* Horizontal accent line */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0" style={{ top: '38%', height: 1, background: 'linear-gradient(to right, transparent 0%, rgba(255,107,0,0.3) 30%, rgba(139,92,246,0.3) 70%, transparent 100%)' }} />

            {/* Content */}
            <div className="relative z-10 max-w-[900px] mx-auto px-6 py-40 text-center">
                {/* Trust badge */}
                <div className="mb-8 hero-cta">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 border rounded-full text-sm" style={{ background: 'var(--orange-50)', borderColor: 'rgba(255,107,0,0.2)' }}>
                        <span style={{ color: 'var(--orange)' }}>✨</span>
                        <span style={{ color: 'var(--orange)', fontWeight: 600 }}>Trusted by 2,400+ marketing teams</span>
                    </div>
                </div>

                {/* Headline */}
                <h1 className="font-heading leading-[1.05] tracking-[-0.04em] mb-2" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 7vw, 5rem)' }}>
                    {['AI', 'agents', 'that', 'run'].map((word, i) => (
                        <span key={i} className="hero-word inline-block mr-[0.25em]" style={{
                            fontWeight: ['AI', 'agents'].includes(word) ? 800 : 400,
                            color: word === 'AI' ? '#FF6B00' : 'var(--text-primary)',
                        }}>{word}</span>
                    ))}
                    <br />
                    <span className="hero-word inline-block mr-[0.25em]" style={{ fontWeight: 400, color: 'var(--text-primary)' }}>your</span>
                    <span className="hero-cycling inline-block">
                        <CyclingWord words={WORDS} />
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle leading-relaxed max-w-[560px] mx-auto mt-7 mb-10" style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', color: 'var(--text-secondary)' }}>
                    Autonomous agents that plan, create, and optimize your marketing across every channel. Measurable results in days.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                    <a href="https://app.openanalyst.com" className="hero-cta btn-primary no-underline inline-flex items-center gap-2" style={{ fontSize: 16, padding: '15px 32px' }}>
                        Start free trial
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                    <a href="#how-it-works" className="hero-cta btn-outline no-underline inline-flex items-center gap-2" style={{ fontSize: 16, padding: '15px 32px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16" fill="currentColor" stroke="none" /></svg>
                        See how it works
                    </a>
                </div>
                {/* Desktop download hint */}
                <div className="hero-cta flex justify-center mb-12">
                    <a href="/download" className="hero-download-link no-underline inline-flex items-center gap-2" style={{
                        fontSize: 13,
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        padding: '6px 14px',
                        borderRadius: 8,
                    }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Also available as a desktop app for Windows & macOS
                    </a>
                </div>

                {/* Social proof */}
                <div className="hero-proof flex items-center justify-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <div className="flex">
                        {['Maren', 'Kael', 'Priya'].map((s, i) => (
                            <img key={s} src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${s}&backgroundColor=${['ffd5dc', 'c0aede', 'b6e3f4'][i]}`}
                                alt="" width={32} height={32}
                                className="rounded-full relative" style={{ width: 32, height: 32, marginLeft: i > 0 ? -10 : 0, zIndex: 3 - i, background: 'var(--bg-surface)', border: '2px solid var(--bg-primary)' }}
                            />
                        ))}
                    </div>
                    <span><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>2,400+</strong> teams</span>
                    <span style={{ width: 1, height: 16, background: 'var(--border)' }} />
                    <span className="flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>4.9</strong>/5
                    </span>
                </div>
            </div>
          </div>
            <style>{`
                .hero-download-link:hover {
                    color: var(--orange) !important;
                    background: rgba(255,107,0,0.04);
                }
                .hero-download-link:hover svg {
                    opacity: 1 !important;
                    stroke: var(--orange);
                }
            `}</style>
        </section>
    );
};

export default Hero;
