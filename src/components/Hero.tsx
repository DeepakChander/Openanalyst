'use client';

import React, { useRef, useState, useEffect, useCallback, Suspense } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import dynamic from 'next/dynamic';

gsap.registerPlugin(useGSAP);

const WORDS = ['Campaigns', 'Analytics', 'Content', 'Ads', 'SEO'];

/* Lazy-load the 3D constellation (heavy, Three.js) */
const AgentConstellationScene = dynamic(
    () => import('./AgentConstellation'),
    { ssr: false }
);

/* ── Interactive dot grid (canvas) — dark variant ── */
function DotGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const rafRef = useRef<number>(0);
    const dotsRef = useRef<{ x: number; y: number; baseX: number; baseY: number; size: number }[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const gap = 40;
        const baseSize = 1;
        const influenceRadius = 130;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (!rect) return;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
            ctx.scale(dpr, dpr);
            dotsRef.current = [];
            for (let x = gap / 2; x < rect.width; x += gap) {
                for (let y = gap / 2; y < rect.height; y += gap) {
                    dotsRef.current.push({ x, y, baseX: x, baseY: y, size: baseSize });
                }
            }
        };

        resize();
        window.addEventListener('resize', resize);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        const handleMouseLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        const draw = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (!rect) return;
            ctx.clearRect(0, 0, rect.width, rect.height);
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            for (const dot of dotsRef.current) {
                const dx = mx - dot.baseX;
                const dy = my - dot.baseY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < influenceRadius) {
                    const force = (1 - dist / influenceRadius) * 0.6;
                    dot.x += (dot.baseX - dx * force * 0.3 - dot.x) * 0.15;
                    dot.y += (dot.baseY - dy * force * 0.3 - dot.y) * 0.15;
                    dot.size += ((baseSize + force * 3) - dot.size) * 0.15;
                } else {
                    dot.x += (dot.baseX - dot.x) * 0.08;
                    dot.y += (dot.baseY - dot.y) * 0.08;
                    dot.size += (baseSize - dot.size) * 0.08;
                }

                const alpha = dist < influenceRadius ? 0.06 + (1 - dist / influenceRadius) * 0.2 : 0.03;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 107, 0, ${alpha})`;
                ctx.fill();
            }
            rafRef.current = requestAnimationFrame(draw);
        };
        rafRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'auto' }} />;
}

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);
    const [currentWord, setCurrentWord] = useState(0);
    const wordRef = useRef<HTMLSpanElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);

    /* Spotlight cursor tracking */
    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;
        const handleMove = (e: MouseEvent) => {
            if (!spotlightRef.current) return;
            const rect = hero.getBoundingClientRect();
            spotlightRef.current.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
            spotlightRef.current.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
            spotlightRef.current.style.opacity = '1';
        };
        const handleLeave = () => { if (spotlightRef.current) spotlightRef.current.style.opacity = '0'; };
        hero.addEventListener('mousemove', handleMove);
        hero.addEventListener('mouseleave', handleLeave);
        return () => { hero.removeEventListener('mousemove', handleMove); hero.removeEventListener('mouseleave', handleLeave); };
    }, []);

    /* Word cycling with blur transition */
    useEffect(() => {
        const interval = setInterval(() => {
            if (!wordRef.current) return;
            gsap.to(wordRef.current, {
                y: -12, opacity: 0, filter: 'blur(4px)', duration: 0.3, ease: 'power2.in',
                onComplete: () => {
                    setCurrentWord(prev => (prev + 1) % WORDS.length);
                    if (wordRef.current) {
                        gsap.fromTo(wordRef.current,
                            { y: 12, opacity: 0, filter: 'blur(4px)' },
                            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' }
                        );
                    }
                }
            });
        }, 2400);
        return () => clearInterval(interval);
    }, []);

    /* Entrance animations */
    useGSAP(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });
        tl.from('.h-badge', { opacity: 0, y: 16, filter: 'blur(6px)', duration: 0.6 }, 0);
        tl.from('.h-line', { opacity: 0, y: 50, filter: 'blur(8px)', stagger: 0.1, duration: 0.8, ease: 'power4.out' }, 0.1);
        tl.from('.h-sub', { opacity: 0, y: 16, filter: 'blur(4px)', duration: 0.6 }, 0.5);
        tl.from('.h-cta-wrap', { opacity: 0, y: 16, duration: 0.5 }, 0.65);
        tl.from('.h-proof', { opacity: 0, duration: 0.5 }, 0.8);
        tl.from('.h-constellation', { opacity: 0, scale: 0.85, filter: 'blur(10px)', duration: 1.2, ease: 'power2.out' }, 0.3);
        if (lineRef.current) {
            gsap.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.8, delay: 1, ease: 'power3.inOut' });
        }
    }, { scope: heroRef });

    return (
        <section id="hero-section" ref={heroRef} className="dark-section" style={{
            position: 'relative', overflow: 'hidden',
            background: 'var(--bg-dark-primary)',
            minHeight: '100vh',
        }}>
            {/* Perspective grid lines */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
                backgroundSize: '80px 80px',
                maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 70%)',
            }} aria-hidden="true" />

            {/* Aurora background orbs */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
                <div className="hero-aurora-1" style={{
                    position: 'absolute', width: '50vw', height: '50vw', maxWidth: 700, maxHeight: 700,
                    top: '-10%', left: '-5%', borderRadius: '50%',
                    background: 'rgba(255, 107, 0, 0.06)', filter: 'blur(100px)',
                }} />
                <div className="hero-aurora-2" style={{
                    position: 'absolute', width: '40vw', height: '40vw', maxWidth: 560, maxHeight: 560,
                    top: '20%', right: '-5%', borderRadius: '50%',
                    background: 'rgba(139, 92, 246, 0.04)', filter: 'blur(90px)',
                }} />
                <div className="hero-aurora-3" style={{
                    position: 'absolute', width: '35vw', height: '35vw', maxWidth: 480, maxHeight: 480,
                    bottom: '-10%', left: '30%', borderRadius: '50%',
                    background: 'rgba(20, 184, 166, 0.03)', filter: 'blur(100px)',
                }} />
            </div>

            {/* Interactive dot grid */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }} aria-hidden="true"><DotGrid /></div>

            {/* Spotlight cursor glow */}
            <div ref={spotlightRef} style={{
                position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', opacity: 0,
                background: 'radial-gradient(600px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,107,0,0.06), transparent 40%)',
                transition: 'opacity 0.5s ease',
            }} />

            {/* Main Grid */}
            <div className="hero-grid" style={{
                position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto',
                padding: '160px 28px 100px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr',
                gap: 48, alignItems: 'center',
            }}>
                {/* LEFT — Content */}
                <div style={{ maxWidth: 540 }}>
                    {/* Announcement badge */}
                    <div className="h-badge" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '5px 14px 5px 6px', borderRadius: 100,
                        background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.2)',
                        marginBottom: 28, fontSize: 12.5, fontWeight: 600, color: '#FF8533',
                    }}>
                        <span style={{
                            width: 22, height: 22, borderRadius: '50%',
                            background: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 12px rgba(255,107,0,0.4)',
                        }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                        </span>
                        v2.0 — The Agentic Era is here
                    </div>

                    {/* Headline */}
                    <h1 style={{
                        fontFamily: 'var(--font-heading)', fontWeight: 800,
                        fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)', lineHeight: 1.08,
                        letterSpacing: '-0.035em', marginBottom: 24,
                    }}>
                        <span className="h-line" style={{ display: 'block', color: '#FAFAFA' }}>AI agents for</span>
                        <span className="h-line" style={{ display: 'block', position: 'relative', color: '#FAFAFA' }}>
                            your{' '}
                            <span style={{ position: 'relative', display: 'inline-block' }}>
                                <span ref={wordRef} className="text-gradient-shimmer" style={{ display: 'inline-block' }}>{WORDS[currentWord]}</span>
                                <div ref={lineRef} style={{
                                    position: 'absolute', bottom: -2, left: 0, right: 0, height: 3,
                                    background: 'linear-gradient(90deg, #FF6B00, #F59E0B)', borderRadius: 2, transformOrigin: 'left',
                                }} />
                            </span>
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="h-sub" style={{
                        fontSize: 'clamp(15px, 1.15vw, 16.5px)', color: 'var(--text-dark-secondary)',
                        lineHeight: 1.7, maxWidth: 440, marginBottom: 36,
                    }}>
                        Autonomous agents that plan, create, and optimize your marketing across every channel. Measurable results in days, not months.
                    </p>

                    {/* CTA Buttons */}
                    <div className="h-cta-wrap" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginBottom: 36 }}>
                        <a href="https://app.openanalyst.com" className="btn-primary hero-cta-glow" style={{ fontSize: 14, padding: '13px 28px' }}>
                            Start free trial
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </a>
                        <a href="#how-it-works" style={{
                            fontSize: 14, fontWeight: 500, color: 'var(--text-dark-secondary)',
                            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6,
                            transition: 'color 0.2s ease',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = '#FF6B00'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-dark-secondary)'; }}
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16" fill="currentColor" stroke="none" /></svg>
                            See how it works
                        </a>
                    </div>

                    {/* Social proof */}
                    <div className="h-proof" style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: 'var(--text-dark-muted)' }}>
                        <div style={{ display: 'flex' }}>
                            {['Maren', 'Kael', 'Priya'].map((s, i) => (
                                <img key={s} src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${s}&backgroundColor=${['ffd5dc', 'c0aede', 'b6e3f4'][i]}`}
                                    alt="" width={28} height={28}
                                    style={{
                                        width: 28, height: 28, borderRadius: '50%',
                                        border: '2px solid var(--bg-dark-primary)',
                                        marginLeft: i > 0 ? -8 : 0, zIndex: 3 - i, position: 'relative',
                                        background: 'var(--bg-dark-surface)',
                                    }}
                                />
                            ))}
                        </div>
                        <span><strong style={{ color: '#FAFAFA', fontWeight: 600 }}>2,400+</strong> teams</span>
                        <span style={{ width: 1, height: 14, background: 'var(--border-dark-default)' }} />
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                            <strong style={{ color: '#FAFAFA', fontWeight: 600 }}>4.9</strong>/5
                        </span>
                    </div>
                </div>

                {/* RIGHT — 3D Agent Constellation */}
                <div className="h-constellation hero-dashboard-mobile-hide" style={{
                    position: 'relative', height: 520,
                }}>
                    <Suspense fallback={
                        <div style={{
                            width: '100%', height: '100%', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                        }}>
                            <div style={{
                                width: 48, height: 48, borderRadius: '50%',
                                border: '2px solid rgba(255,107,0,0.2)',
                                borderTopColor: '#FF6B00',
                                animation: 'spin 1s linear infinite',
                            }} />
                        </div>
                    }>
                        <AgentConstellationScene />
                    </Suspense>
                </div>
            </div>

            {/* Bottom fade to next section */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
                background: 'linear-gradient(transparent, var(--bg-dark-primary))',
                pointerEvents: 'none', zIndex: 5,
            }} />
        </section>
    );
};

export default Hero;
