'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// ─── Marquee keywords (infinite scrolling band) ───
const MARQUEE_ITEMS = [
    'AI-Powered Campaigns',
    'Multi-Channel Marketing',
    'Audience Segmentation',
    'Automated A/B Testing',
    'Real-Time Analytics',
    'Content Generation',
    'Social Media Automation',
    'Email Sequences',
    'Conversion Optimization',
    'Brand Voice AI',
    'Campaign Intelligence',
    'Growth Automation',
];

// ─── Floating bento cards data ───
const BENTO_CARDS = [
    {
        id: 'analytics',
        title: 'Campaign Performance',
        value: '+247%',
        subtitle: 'conversion rate',
        icon: '📈',
        position: { top: '12%', right: '3%' },
        mobileHide: true,
        rotation: 3,
        delay: 0.2,
    },
    {
        id: 'channels',
        title: 'Active Channels',
        value: '12',
        subtitle: 'connected',
        icon: '🔗',
        position: { top: '55%', right: '5%' },
        mobileHide: true,
        rotation: -2,
        delay: 0.5,
    },
    {
        id: 'ai',
        title: 'AI Confidence',
        value: '98.7%',
        subtitle: 'accuracy score',
        icon: '🧠',
        position: { top: '28%', left: '2%' },
        mobileHide: true,
        rotation: -3,
        delay: 0.3,
    },
    {
        id: 'saved',
        title: 'Time Saved',
        value: '40hrs',
        subtitle: 'per week',
        icon: '⚡',
        position: { top: '58%', left: '4%' },
        mobileHide: true,
        rotation: 2,
        delay: 0.6,
    },
];

// ─── Trust logos / partners ───
const TRUST_ITEMS = [
    { label: '10,000+', desc: 'Campaigns Launched' },
    { label: '27', desc: 'Integrations' },
    { label: '99.9%', desc: 'Uptime SLA' },
    { label: '150+', desc: 'Countries' },
];

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const titleLine1Ref = useRef<HTMLSpanElement>(null);
    const titleLine2Ref = useRef<HTMLSpanElement>(null);
    const auroraRef = useRef<HTMLDivElement>(null);
    const dotGridRef = useRef<HTMLCanvasElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    // Track mouse for interactive effects
    const rafId = useRef<number>(0);

    // ─── Interactive Dot Grid Canvas ───
    useEffect(() => {
        const canvas = dotGridRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animFrame: number;
        let mouseX = -1000;
        let mouseY = -1000;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = canvas.offsetWidth * dpr;
            canvas.height = canvas.offsetHeight * dpr;
            ctx.scale(dpr, dpr);
        };

        const draw = () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            ctx.clearRect(0, 0, w, h);

            const spacing = 32;
            const baseRadius = 1;
            const maxRadius = 3;
            const influenceRadius = 150;

            for (let x = spacing; x < w; x += spacing) {
                for (let y = spacing; y < h; y += spacing) {
                    const dist = Math.hypot(x - mouseX, y - mouseY);
                    const influence = Math.max(0, 1 - dist / influenceRadius);
                    const radius = baseRadius + (maxRadius - baseRadius) * influence;
                    const alpha = 0.06 + 0.2 * influence;

                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(204, 122, 96, ${alpha})`;
                    ctx.fill();
                }
            }

            animFrame = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        resize();
        draw();

        window.addEventListener('resize', resize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animFrame);
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // ─── RAF-throttled cursor spotlight ───
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (rafId.current) return;
            rafId.current = requestAnimationFrame(() => {
                if (heroRef.current) {
                    heroRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
                    heroRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
                }
                rafId.current = 0;
            });
        };

        const mql = window.matchMedia('(min-width: 769px)');
        if (mql.matches) {
            window.addEventListener('mousemove', handleMouseMove, { passive: true });
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);

    // ─── GSAP Master Timeline ───
    useGSAP(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isMobile = window.innerWidth < 768;

        let split1: SplitText | null = null;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // ═══ Phase 1: Aurora & Background (0s) ═══
        if (auroraRef.current) {
            tl.fromTo(auroraRef.current,
                { opacity: 0, scale: 1.2 },
                { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' },
                0
            );
        }

        // Dot grid fade in
        if (dotGridRef.current) {
            tl.fromTo(dotGridRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.5 },
                0.3
            );
        }

        // ═══ Phase 2: Badge (0.4s) ═══
        tl.fromTo('.hero-badge',
            { scale: 0.8, opacity: 0, y: 20, filter: 'blur(10px)' },
            { scale: 1, opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'back.out(2)' },
            0.4
        );

        // ═══ Phase 3: Title Reveal (0.7s) ═══
        if (!prefersReduced && titleLine1Ref.current) {
            if (isMobile) {
                split1 = new SplitText(titleLine1Ref.current, { type: 'words' });
                tl.fromTo(split1.words,
                    { y: 80, opacity: 0, filter: 'blur(8px)' },
                    { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, stagger: 0.08, ease: 'back.out(1.5)' },
                    0.7
                );
            } else {
                split1 = new SplitText(titleLine1Ref.current, { type: 'chars' });
                tl.fromTo(split1.chars,
                    { y: 100, opacity: 0, rotateX: -90, scale: 0.5, filter: 'blur(10px)' },
                    { y: 0, opacity: 1, rotateX: 0, scale: 1, filter: 'blur(0px)', duration: 1, stagger: 0.035, ease: 'back.out(1.7)' },
                    0.7
                );
            }
        } else {
            tl.fromTo('.hero-title-line-1',
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                0.7
            );
        }

        // Line 2 — gradient text, animate as whole block
        if (!prefersReduced && titleLine2Ref.current && !isMobile) {
            tl.fromTo(titleLine2Ref.current,
                { y: 100, opacity: 0, rotateX: -60, scale: 0.8, filter: 'blur(12px)' },
                { y: 0, opacity: 1, rotateX: 0, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' },
                1.0
            );
        } else {
            tl.fromTo('.hero-title-line-2',
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                1.0
            );
        }

        // Subtitle
        tl.fromTo('.hero-subtitle',
            { y: 40, opacity: 0, filter: 'blur(6px)' },
            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8 },
            1.4
        );

        // ═══ Phase 4: CTAs (1.6s) ═══
        tl.fromTo('.hero-cta-primary',
            { y: 30, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(2)' },
            1.6
        );

        tl.fromTo('.hero-cta-secondary',
            { y: 30, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(2)' },
            1.75
        );

        // ═══ Phase 5: Bento Cards fly in (1.8s) ═══
        tl.fromTo('.hero-bento-card',
            { opacity: 0, scale: 0.6, y: 60, filter: 'blur(12px)' },
            {
                opacity: 1, scale: 1, y: 0, filter: 'blur(0px)',
                duration: 1, stagger: 0.15, ease: 'back.out(1.4)',
            },
            1.8
        );

        // ═══ Phase 6: Marquee band (2.2s) ═══
        tl.fromTo('.hero-marquee-wrap',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            2.2
        );

        // ═══ Phase 7: Trust bar (2.5s) ═══
        tl.fromTo('.hero-trust-item',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
            2.5
        );

        // ─── Continuous floating for bento cards ───
        if (!prefersReduced) {
            gsap.utils.toArray<HTMLElement>('.hero-bento-card').forEach((card, i) => {
                gsap.to(card, {
                    y: `${(i % 2 === 0 ? -1 : 1) * (12 + i * 3)}`,
                    x: `${(i % 2 === 0 ? 1 : -1) * (5 + i * 2)}`,
                    rotation: `${(i % 2 === 0 ? 1 : -1) * 1.5}`,
                    duration: 4 + i * 0.5,
                    ease: 'sine.inOut',
                    yoyo: true,
                    repeat: -1,
                });
            });
        }

        // ─── ScrollTrigger effects ───
        if (!prefersReduced) {
            // Title blurs out on scroll — starts much later so content stays visible
            gsap.to('.hero-title-block', {
                filter: 'blur(12px)',
                opacity: 0,
                y: -40,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: '40% top',
                    end: '80% top',
                    scrub: 1,
                },
            });

            // Bento cards drift away — also starts later
            gsap.utils.toArray<HTMLElement>('.hero-bento-card').forEach((card, i) => {
                gsap.to(card, {
                    y: -80 - i * 20,
                    opacity: 0,
                    scale: 0.9,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: '35% top',
                        end: '75% top',
                        scrub: 1,
                    },
                });
            });

            // Container parallax — gentler movement
            if (containerRef.current) {
                gsap.to(containerRef.current, {
                    yPercent: -5,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: '30% top',
                        end: 'bottom top',
                        scrub: 1,
                    },
                });
            }

            // Aurora parallax
            if (auroraRef.current) {
                gsap.to(auroraRef.current, {
                    y: -60,
                    scale: 1.05,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: '30% top',
                        end: 'bottom top',
                        scrub: 1,
                    },
                });
            }
        }

        return () => {
            split1?.revert();
        };
    }, { scope: heroRef });

    // ─── Count-up animation for trust numbers ───
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.hero-counter');
                    counters.forEach((counter) => {
                        const el = counter as HTMLElement;
                        const target = el.dataset.target || '';
                        const isNumber = /^\d/.test(target);

                        if (isNumber) {
                            const num = parseInt(target.replace(/[^0-9]/g, ''));
                            const suffix = target.replace(/[0-9,]/g, '');
                            gsap.fromTo(el,
                                { innerText: '0' },
                                {
                                    innerText: num,
                                    duration: 2,
                                    ease: 'power2.out',
                                    snap: { innerText: 1 },
                                    onUpdate: function () {
                                        el.textContent = Math.round(parseFloat(el.textContent || '0')).toLocaleString() + suffix;
                                    },
                                }
                            );
                        }
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        const trustBar = document.querySelector('.hero-trust-bar');
        if (trustBar) observer.observe(trustBar);

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={heroRef} className="hero-section" style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: 'var(--background)',
        }}>

            {/* ═══ LAYER 1: Interactive Dot Grid (Canvas) ═══ */}
            <canvas
                ref={dotGridRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'auto',
                    zIndex: 0,
                    opacity: 0,
                }}
            />

            {/* ═══ LAYER 2: Aurora Mesh Gradient ═══ */}
            <div ref={auroraRef} className="hero-aurora" style={{ opacity: 0 }}>
                <div className="hero-aurora-blob hero-aurora-1" />
                <div className="hero-aurora-blob hero-aurora-2" />
                <div className="hero-aurora-blob hero-aurora-3" />
                <div className="hero-aurora-blob hero-aurora-4" />
            </div>

            {/* ═══ LAYER 3: Ambient Cursor Light ═══ */}
            <div className="hero-cursor-light" />

            {/* ═══ LAYER 4: Floating Bento Cards ═══ */}
            {BENTO_CARDS.map((card) => (
                <div
                    key={card.id}
                    className={`hero-bento-card ${card.mobileHide ? 'hero-bento-desktop' : ''}`}
                    style={{
                        position: 'absolute',
                        ...card.position,
                        zIndex: 5,
                        opacity: 0,
                        transform: `rotate(${card.rotation}deg)`,
                    } as React.CSSProperties}
                >
                    <div className="hero-bento-inner">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <span style={{ fontSize: '16px' }}>{card.icon}</span>
                            <span style={{
                                fontSize: '11px',
                                fontFamily: 'var(--font-mono)',
                                color: 'rgba(255,255,255,0.5)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}>{card.title}</span>
                        </div>
                        <div style={{
                            fontSize: '28px',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 800,
                            color: '#fff',
                            lineHeight: 1,
                            letterSpacing: '-0.03em',
                        }}>{card.value}</div>
                        <div style={{
                            fontSize: '11px',
                            fontFamily: 'var(--font-mono)',
                            color: 'rgba(255,255,255,0.4)',
                            marginTop: '4px',
                        }}>{card.subtitle}</div>
                    </div>
                </div>
            ))}

            {/* ═══ CONTENT ═══ */}
            <div ref={containerRef} style={{
                position: 'relative',
                zIndex: 10,
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                flexGrow: 1,
                paddingTop: '160px',
                paddingBottom: '40px',
                width: '100%',
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', width: '100%' }}>
                    {/* ═══ Badge ═══ */}
                    <div className="hero-badge" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '6px 6px 6px 16px',
                        borderRadius: '9999px',
                        marginBottom: '40px',
                        opacity: 0,
                    }}>
                        <span className="hero-badge-dot" />
                        <span style={{
                            fontSize: '13px',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--foreground)',
                            fontWeight: 500,
                        }}>Now with GPT-4o & Claude</span>
                        <span className="hero-badge-arrow">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>

                    {/* ═══ Title ═══ */}
                    <div className="hero-title-block" style={{ perspective: '1200px' }}>
                        <h1 style={{
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 900,
                            fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
                            lineHeight: 0.9,
                            letterSpacing: '-0.05em',
                            marginBottom: '32px',
                        }}>
                            <span ref={titleLine1Ref} className="hero-title-line-1" style={{
                                display: 'block',
                                color: 'var(--foreground)',
                                transformOrigin: 'center bottom',
                                marginBottom: '4px',
                            }}>
                                Your AI
                            </span>
                            <span ref={titleLine2Ref} className="hero-title-line-2" style={{
                                display: 'block',
                                transformOrigin: 'center bottom',
                            }}>
                                <span className="hero-gradient-text">
                                    Marketing
                                </span>
                            </span>
                            <span className="hero-title-line-2" style={{
                                display: 'block',
                                transformOrigin: 'center bottom',
                                color: 'var(--foreground)',
                                fontSize: 'clamp(3rem, 8.5vw, 6.5rem)',
                            }}>
                                Agent
                            </span>
                        </h1>
                    </div>

                    {/* ═══ Subtitle ═══ */}
                    <p className="hero-subtitle" style={{
                        fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)',
                        color: 'var(--muted)',
                        lineHeight: 1.7,
                        maxWidth: '580px',
                        margin: '0 auto 48px',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 400,
                        opacity: 0,
                    }}>
                        Deploy autonomous AI agents that plan, create, and optimize
                        your marketing campaigns across every channel — on autopilot.
                    </p>

                    {/* ═══ CTAs ═══ */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '16px',
                        marginBottom: '0',
                    }}>
                        {/* Primary CTA — Rotating border glow */}
                        <Magnetic>
                            <a
                                href="https://app.openanalyst.com"
                                className="hero-cta-primary"
                                style={{ opacity: 0 }}
                            >
                                <span className="hero-cta-glow" />
                                <span className="hero-cta-content">
                                    <span style={{ color: '#39ff14', fontSize: '12px', fontWeight: 700 }}>$</span>
                                    get_started --free
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </a>
                        </Magnetic>

                        {/* Secondary CTA */}
                        <Magnetic strength={0.2}>
                            <a
                                href="#how-it-works"
                                className="hero-cta-secondary"
                                style={{ opacity: 0 }}
                            >
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(204, 122, 96, 0.1)',
                                    marginRight: '4px',
                                }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--primary)" stroke="none">
                                        <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                </span>
                                Watch demo
                            </a>
                        </Magnetic>
                    </div>
                </div>
            </div>

            {/* ═══ Marquee Band ═══ */}
            <div className="hero-marquee-wrap" style={{ opacity: 0 }}>
                <div className="hero-marquee-track" ref={marqueeRef}>
                    {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                        <span key={i} className="hero-marquee-item">
                            <span className="hero-marquee-dot" />
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            {/* ═══ Trust Bar ═══ */}
            <div className="hero-trust-bar" style={{
                position: 'relative',
                zIndex: 10,
                maxWidth: '800px',
                margin: '0 auto',
                padding: '24px 24px 48px',
                width: '100%',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '40px',
                    flexWrap: 'wrap',
                }}>
                    {TRUST_ITEMS.map((item) => (
                        <div key={item.desc} className="hero-trust-item" style={{ opacity: 0 }}>
                            <span
                                className="hero-counter hero-trust-number"
                                data-target={item.label}
                            >
                                {item.label}
                            </span>
                            <span className="hero-trust-label">{item.desc}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
