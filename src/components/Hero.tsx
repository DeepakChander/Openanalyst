'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const WORDS = ['Campaigns', 'Analytics', 'Content', 'Ads', 'SEO'];
const WORD_COLORS: Record<string, string> = {
    Campaigns: '#FF6B00', Analytics: '#8B5CF6', Content: '#10B981', Ads: '#3B82F6', SEO: '#F59E0B',
};

/* WebGL shader code removed — CSS animation used instead for compatibility */

/* ═══ CSS Animated Background — works everywhere, no WebGL needed ═══ */
function AnimatedBackground() {
    return (
        <div className="hero-bg-wrap" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {/* Base dark gradient */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 120% 80% at 50% 40%, #1a0e00 0%, #0a0500 50%, #000000 100%)' }} />

            {/* Animated orange orbs */}
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />
            <div className="hero-orb hero-orb-3" />
            <div className="hero-orb hero-orb-4" />

            {/* Light streak overlay */}
            <div className="hero-streak" />

            {/* Grain texture */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, mixBlendMode: 'overlay', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />

            <style>{`
                .hero-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    will-change: transform;
                }
                .hero-orb-1 {
                    width: 600px; height: 600px;
                    background: radial-gradient(circle, rgba(255,107,0,0.25) 0%, rgba(255,80,0,0.1) 40%, transparent 70%);
                    top: 10%; left: 20%;
                    animation: heroFloat1 12s ease-in-out infinite;
                }
                .hero-orb-2 {
                    width: 500px; height: 500px;
                    background: radial-gradient(circle, rgba(255,140,30,0.2) 0%, rgba(200,80,0,0.08) 40%, transparent 70%);
                    top: 30%; right: 10%;
                    animation: heroFloat2 15s ease-in-out infinite;
                }
                .hero-orb-3 {
                    width: 400px; height: 400px;
                    background: radial-gradient(circle, rgba(255,180,50,0.15) 0%, transparent 60%);
                    bottom: 10%; left: 35%;
                    animation: heroFloat3 18s ease-in-out infinite;
                }
                .hero-orb-4 {
                    width: 300px; height: 300px;
                    background: radial-gradient(circle, rgba(255,100,0,0.18) 0%, transparent 60%);
                    top: 50%; left: 10%;
                    animation: heroFloat1 20s ease-in-out infinite reverse;
                }
                .hero-streak {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        105deg,
                        transparent 20%,
                        rgba(255,120,20,0.04) 35%,
                        rgba(255,160,40,0.08) 42%,
                        rgba(255,120,20,0.04) 50%,
                        transparent 65%
                    );
                    animation: heroStreak 8s ease-in-out infinite;
                }
                @keyframes heroFloat1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(40px, -30px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.95); }
                }
                @keyframes heroFloat2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(-30px, 20px) scale(1.05); }
                    66% { transform: translate(25px, -25px) scale(0.97); }
                }
                @keyframes heroFloat3 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(30px, -20px) scale(1.08); }
                }
                @keyframes heroStreak {
                    0%, 100% { opacity: 0.6; transform: translateX(-5%); }
                    50% { opacity: 1; transform: translateX(5%); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .hero-orb, .hero-streak { animation: none !important; }
                }
            `}</style>
        </div>
    );
}

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

    useGSAP(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const tl = gsap.timeline();

        tl.fromTo('.hero-word',
            { y: 80, opacity: 0, filter: 'blur(8px)' },
            { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.08, duration: 1, ease: 'power4.out' },
        0.5);
        tl.fromTo('.hero-cycling',
            { y: 40, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' },
        1.1);
        tl.fromTo('.hero-subtitle',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 },
        1.4);
        tl.fromTo('.hero-cta',
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
        1.7);
        tl.fromTo('.hero-proof',
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
        2.0);
    }, { scope: heroRef });

    return (
        <section id="hero-section" ref={heroRef} className="relative overflow-hidden min-h-screen flex items-center bg-black">
            {/* Animated CSS background */}
            <AnimatedBackground />

            {/* Content */}
            <div className="relative z-10 max-w-[900px] mx-auto px-6 py-40 text-center">
                {/* Trust badge */}
                <div className="mb-8 hero-cta">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500/10 backdrop-blur-md border border-orange-300/20 rounded-full text-sm">
                        <span className="text-amber-300">✨</span>
                        <span className="text-orange-200/90 font-medium">Trusted by 2,400+ marketing teams</span>
                    </div>
                </div>

                {/* Headline */}
                <h1 className="font-heading leading-[1.05] tracking-[-0.04em] mb-2" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 7vw, 5rem)' }}>
                    {['AI', 'agents', 'that', 'run'].map((word, i) => (
                        <span key={i} className="hero-word inline-block mr-[0.25em]" style={{
                            fontWeight: ['AI', 'agents'].includes(word) ? 800 : 400,
                            color: word === 'AI' ? '#FF6B00' : '#FAFAFA',
                        }}>{word}</span>
                    ))}
                    <br />
                    <span className="hero-word inline-block mr-[0.25em]" style={{ fontWeight: 400, color: '#FAFAFA' }}>your</span>
                    <span className="hero-cycling inline-block">
                        <CyclingWord words={WORDS} />
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle text-orange-100/70 leading-relaxed max-w-[560px] mx-auto mt-7 mb-10" style={{ fontSize: 'clamp(16px, 1.8vw, 20px)' }}>
                    Autonomous agents that plan, create, and optimize your marketing across every channel. Measurable results in days.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <a href="https://app.openanalyst.com" className="hero-cta px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 no-underline inline-flex items-center gap-2">
                        Start free trial
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                    <a href="#how-it-works" className="hero-cta px-8 py-4 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-300/20 hover:border-orange-300/40 text-orange-100 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm no-underline inline-flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16" fill="currentColor" stroke="none" /></svg>
                        See how it works
                    </a>
                </div>

                {/* Social proof */}
                <div className="hero-proof flex items-center justify-center gap-4 text-sm text-white/40">
                    <div className="flex">
                        {['Maren', 'Kael', 'Priya'].map((s, i) => (
                            <img key={s} src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${s}&backgroundColor=${['ffd5dc', 'c0aede', 'b6e3f4'][i]}`}
                                alt="" width={32} height={32}
                                className="rounded-full border-2 border-black/50 relative" style={{ width: 32, height: 32, marginLeft: i > 0 ? -10 : 0, zIndex: 3 - i, background: '#222' }}
                            />
                        ))}
                    </div>
                    <span><strong className="text-white font-semibold">2,400+</strong> teams</span>
                    <span className="w-px h-4 bg-white/15" />
                    <span className="flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        <strong className="text-white font-semibold">4.9</strong>/5
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
