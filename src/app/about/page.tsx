'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header, Footer, Magnetic } from '@/components';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════ DATA ═══════════ */
const values = [
    { title: 'Innovation', desc: 'We don\'t follow the marketing playbook — we rewrite it. Our AI agents evolve daily, learning from millions of data points.', highlight: 'AI-first thinking in everything we build' },
    { title: 'Simplicity', desc: 'The most powerful technology disappears into the workflow. Launch a campaign in 3 clicks, not 30 steps.', highlight: 'Complex problems, elegant solutions' },
    { title: 'Trust', desc: 'Your data never trains our models. SOC 2 Type II certified, GDPR compliant, integrity checks on every campaign.', highlight: 'Security is the foundation' },
    { title: 'Impact', desc: 'We optimize for revenue, not impressions. Every AI agent is measured by the actual business growth it creates.', highlight: 'Real growth, not vanity metrics' },
];

const valueIcons = {
    Innovation: 'M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83',
    Simplicity: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M9 12l2 2 4-4',
    Trust: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    Impact: 'M3 3v18h18 M19 9l-5 5-4-4-3 3',
};

const metrics = [
    { value: 10, suffix: 'K+', label: 'Campaigns Deployed' },
    { value: 42, suffix: '', label: 'AI Agents' },
    { value: 99.9, suffix: '%', label: 'Uptime SLA', decimals: 1 },
    { value: 150, suffix: '+', label: 'Countries Served' },
];

const milestones = [
    { quarter: 'Q1 2024', event: 'Founded', desc: 'OpenAnalyst was born from a vision to democratize AI-powered marketing.' },
    { quarter: 'Q3 2024', event: 'First 1,000 Users', desc: 'Reached our first major milestone with early adopters worldwide.' },
    { quarter: 'Q1 2025', event: '27 Integrations', desc: 'Connected to the entire marketing stack — Gmail, Slack, HubSpot, and more.' },
    { quarter: 'Q3 2025', event: '10K+ Campaigns', desc: 'AI agents planned, launched, and optimized over 10,000 campaigns.' },
];

const teamPhotos = [
    { src: '/images/culture/office.png', label: 'The Full Team', desc: 'Builders, dreamers, and marketing revolutionaries.' },
    { src: '/images/culture/workshop.png', label: 'Leadership', desc: 'Vision and strategy at OpenAnalyst.' },
    { src: '/images/culture/remote.png', label: 'Engineering', desc: 'The minds behind the AI agents.' },
    { src: '/images/culture/event.png', label: 'Team Bonding', desc: 'We work hard, celebrate harder.' },
];

const cultureItems = [
    { title: 'Remote-First', desc: 'Great talent isn\'t bound by geography.', iconPath: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20 M2 12h20' },
    { title: 'Ship Fast', desc: 'Weekly releases, daily deployments.', iconPath: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z' },
    { title: 'Transparency', desc: 'Open books, open roadmap.', iconPath: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' },
    { title: 'Customer First', desc: 'Every feature starts with a problem.', iconPath: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' },
    { title: 'Learn & Grow', desc: '$5K annual learning budget.', iconPath: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20' },
    { title: 'Play to Win', desc: 'Growth is a team sport.', iconPath: 'M6 9H4.5a2.5 2.5 0 0 1 0-5H6 M18 9h1.5a2.5 2.5 0 0 0 0-5H18 M4 22h16 M18 2H6v7a6 6 0 0 0 12 0V2Z' },
];

/* ═══════════ COUNT UP COMPONENT ═══════════ */
function CountUp({ value, suffix = '', decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const counted = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !counted.current) {
                counted.current = true;
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: value,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: () => {
                        if (ref.current) {
                            ref.current.textContent = obj.val.toFixed(decimals) + suffix;
                        }
                    },
                });
            }
        }, { threshold: 0.5 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [value, suffix, decimals]);

    return <span ref={ref}>0{suffix}</span>;
}

/* ═══════════ TEXT SCRAMBLE HOOK ═══════════ */
function useTextScramble() {
    const ref = useRef<HTMLSpanElement>(null);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';

    const scramble = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        const original = el.dataset.text || el.textContent || '';
        let iteration = 0;
        const interval = setInterval(() => {
            el.textContent = original
                .split('')
                .map((char, index) => {
                    if (index < iteration) return original[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            iteration += 1 / 2;
            if (iteration >= original.length) {
                el.textContent = original;
                clearInterval(interval);
            }
        }, 40);
    }, []);

    return { ref, scramble };
}

/* ═══════════ SVG ICON WITH STROKE DRAW ═══════════ */
function StrokeIcon({ pathData, size = 24, className = '' }: { pathData: string; size?: number; className?: string }) {
    const paths = pathData.split(' M').map((p, i) => i === 0 ? p : 'M' + p);
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {paths.map((d, i) => (
                <path
                    key={i}
                    d={d}
                    style={{
                        strokeDasharray: 100,
                        strokeDashoffset: 100,
                        transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                />
            ))}
        </svg>
    );
}

/* ═══════════ MAIN PAGE ═══════════ */
export default function AboutPage() {
    const mainRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const heroInnerRef = useRef<HTMLDivElement>(null);
    const missionRef = useRef<HTMLElement>(null);
    const valuesRef = useRef<HTMLElement>(null);
    const metricsRef = useRef<HTMLElement>(null);
    const milestonesRef = useRef<HTMLElement>(null);
    const galleryRef = useRef<HTMLElement>(null);
    const cultureRef = useRef<HTMLElement>(null);
    const ctaRef = useRef<HTMLElement>(null);
    const { ref: scrambleRef, scramble } = useTextScramble();

    useGSAP(() => {
        /* ── Hero: clip-path wipe reveal ── */
        const heroLines = heroRef.current?.querySelectorAll('.about-hero-line');
        if (heroLines) {
            gsap.set(heroLines, { clipPath: 'inset(0 100% 0 0)' });
            gsap.to(heroLines, {
                clipPath: 'inset(0 0% 0 0)',
                duration: 1.2,
                stagger: 0.2,
                ease: 'power4.out',
                delay: 0.3,
            });
        }

        const heroSub = heroRef.current?.querySelector('.about-hero-sub');
        if (heroSub) {
            gsap.from(heroSub, { opacity: 0, y: 30, duration: 1, delay: 1, ease: 'power3.out' });
        }

        /* ── Mission/Vision: fade in from sides ── */
        const missionCards = missionRef.current?.querySelectorAll('.about-mv-card');
        if (missionCards) {
            missionCards.forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
                    opacity: 0,
                    x: i === 0 ? -60 : 60,
                    duration: 0.9,
                    ease: 'power3.out',
                });
            });
        }

        /* ── Values: stagger in ── */
        const valueCards = valuesRef.current?.querySelectorAll('.about-value-card');
        if (valueCards) {
            gsap.from(valueCards, {
                scrollTrigger: { trigger: valuesRef.current, start: 'top 80%', toggleActions: 'play none none none' },
                opacity: 0,
                y: 40,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power3.out',
            });
        }

        /* ── Metrics: scale up ── */
        const metricItems = metricsRef.current?.querySelectorAll('.about-metric');
        if (metricItems) {
            gsap.from(metricItems, {
                scrollTrigger: { trigger: metricsRef.current, start: 'top 80%', toggleActions: 'play none none none' },
                opacity: 0,
                scale: 0.8,
                duration: 0.7,
                stagger: 0.1,
                ease: 'back.out(1.4)',
            });
        }

        /* ── Timeline: draw line + dots ── */
        const timelineLine = milestonesRef.current?.querySelector('.about-timeline-line-fill');
        if (timelineLine) {
            gsap.from(timelineLine, {
                scrollTrigger: { trigger: milestonesRef.current, start: 'top 75%', toggleActions: 'play none none none' },
                scaleX: 0,
                transformOrigin: 'left center',
                duration: 1.5,
                ease: 'power3.inOut',
            });
        }
        const timelineDots = milestonesRef.current?.querySelectorAll('.about-timeline-dot');
        if (timelineDots) {
            gsap.from(timelineDots, {
                scrollTrigger: { trigger: milestonesRef.current, start: 'top 75%', toggleActions: 'play none none none' },
                opacity: 0,
                scale: 0,
                duration: 0.5,
                stagger: 0.2,
                delay: 0.5,
                ease: 'back.out(2)',
            });
        }
        const timelineCards = milestonesRef.current?.querySelectorAll('.about-timeline-card');
        if (timelineCards) {
            gsap.from(timelineCards, {
                scrollTrigger: { trigger: milestonesRef.current, start: 'top 75%', toggleActions: 'play none none none' },
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.2,
                delay: 0.7,
                ease: 'power3.out',
            });
        }

        /* ── Gallery: fade in ── */
        const galleryItems = galleryRef.current?.querySelectorAll('.about-gallery-item');
        if (galleryItems) {
            gsap.from(galleryItems, {
                scrollTrigger: { trigger: galleryRef.current, start: 'top 80%', toggleActions: 'play none none none' },
                opacity: 0,
                y: 40,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power3.out',
            });
        }

        /* ── Culture hexagons ── */
        const hexItems = cultureRef.current?.querySelectorAll('.about-hex-item');
        if (hexItems) {
            gsap.from(hexItems, {
                scrollTrigger: { trigger: cultureRef.current, start: 'top 80%', toggleActions: 'play none none none' },
                opacity: 0,
                scale: 0.6,
                rotation: -15,
                duration: 0.7,
                stagger: 0.1,
                ease: 'back.out(1.5)',
            });
        }

        /* ── CTA: slide up ── */
        const ctaContent = ctaRef.current?.querySelector('.about-cta-inner');
        if (ctaContent) {
            gsap.from(ctaContent, {
                scrollTrigger: { trigger: ctaRef.current, start: 'top 85%', toggleActions: 'play none none none' },
                opacity: 0,
                y: 50,
                duration: 0.9,
                ease: 'power3.out',
            });
        }

        /* ── Hero 3D perspective scroll ── */
        if (heroInnerRef.current) {
            gsap.to(heroInnerRef.current, {
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
    }, { scope: mainRef });

    return (
        <>
            <Header />
            <main ref={mainRef}>

                {/* ══════════ SECTION 1: HERO — Pattern #11 ══════════ */}
                <section
                    ref={heroRef}
                    style={{
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: '140px 24px 80px',
                        background: 'var(--bg-primary)',
                        position: 'relative',
                        overflow: 'hidden',
                        perspective: 1200,
                    }}
                >
                    <div ref={heroInnerRef} style={{ transformOrigin: 'center top' }}>
                    {/* Grid background */}
                    <div aria-hidden="true" style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none',
                        backgroundImage: 'linear-gradient(to right, rgba(15,23,42,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.07) 1px, transparent 1px)',
                        backgroundSize: '56px 56px',
                        maskImage: 'radial-gradient(ellipse 80% 85% at 50% 40%, black 0%, transparent 70%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 80% 85% at 50% 40%, black 0%, transparent 70%)',
                    }} />
                    <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: '10%', width: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(255,107,0,0.25) 0%, rgba(255,107,0,0.5) 50%, transparent 100%)' }} />
                    <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: '25%', width: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(255,107,0,0.15) 0%, rgba(255,107,0,0.25) 50%, transparent 100%)' }} />
                    <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, right: '25%', width: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.25) 50%, transparent 100%)' }} />
                    <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, right: '10%', width: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.5) 50%, transparent 100%)' }} />
                    <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: '38%', height: 1, pointerEvents: 'none', background: 'linear-gradient(to right, transparent 0%, rgba(255,107,0,0.3) 30%, rgba(139,92,246,0.3) 70%, transparent 100%)' }} />
                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <div className="label-mono about-hero-line" style={{ marginBottom: '32px' }}>
                            About OpenAnalyst
                        </div>
                        <h1
                            className="about-hero-line"
                            style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
                                fontWeight: 900,
                                lineHeight: 0.92,
                                letterSpacing: '-0.04em',
                                color: 'var(--text-primary)',
                                marginBottom: '16px',
                                maxWidth: '1100px',
                            }}
                        >
                            We build
                        </h1>
                        <h1
                            className="about-hero-line"
                            style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
                                fontWeight: 300,
                                lineHeight: 0.92,
                                letterSpacing: '-0.04em',
                                color: 'var(--text-primary)',
                                marginBottom: '16px',
                                maxWidth: '1100px',
                            }}
                        >
                            <span className="text-gradient" style={{ fontWeight: 900 }}>AI agents</span>{' '}
                            <span style={{ fontStyle: 'italic' }}>that</span>
                        </h1>
                        <h1
                            className="about-hero-line"
                            style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
                                fontWeight: 900,
                                lineHeight: 0.92,
                                letterSpacing: '-0.04em',
                                color: 'var(--text-primary)',
                                maxWidth: '1100px',
                            }}
                        >
                            market for you
                        </h1>
                        <p
                            className="about-hero-sub"
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--text-xl)',
                                color: 'var(--text-secondary)',
                                maxWidth: '560px',
                                lineHeight: 1.7,
                                marginTop: '40px',
                            }}
                        >
                            We&apos;re on a mission to give every business access to the marketing
                            intelligence that was once reserved for the Fortune 500.
                        </p>
                    </div>
                    </div>
                </section>

                {/* ══════════ SECTION 2: MISSION / VISION ══════════ */}
                <section
                    ref={missionRef}
                    className="section"
                    style={{ background: 'var(--bg-primary)' }}
                >
                    <div className="container">
                        <div className="label-mono" style={{ marginBottom: '48px', textAlign: 'center' }}>
                            What Drives Us
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                            gap: '24px',
                        }}>
                            {/* Mission Card */}
                            <div
                                className="about-mv-card"
                                style={{
                                    background: 'var(--bg-white)',
                                    borderRadius: 'var(--radius-xl)',
                                    padding: '48px 40px',
                                    border: '1px solid var(--border)',
                                    boxShadow: 'var(--shadow-sm)',
                                }}
                            >
                                <div style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: 'var(--text-xs)',
                                    fontWeight: 600,
                                    textTransform: 'uppercase' as const,
                                    letterSpacing: '0.12em',
                                    color: 'var(--orange)',
                                    marginBottom: '20px',
                                }}>
                                    Our Mission
                                </div>
                                <h3 className="heading-3" style={{ marginBottom: '16px' }}>
                                    Democratize marketing intelligence
                                </h3>
                                <p className="body-lg">
                                    Every business deserves enterprise-grade marketing. Our AI agents
                                    plan, execute, and optimize campaigns so founders and teams can
                                    focus on building great products.
                                </p>
                            </div>
                            {/* Vision Card */}
                            <div
                                className="about-mv-card"
                                style={{
                                    background: 'var(--bg-cream)',
                                    borderRadius: 'var(--radius-xl)',
                                    padding: '48px 40px',
                                    border: '1px solid var(--border-subtle)',
                                    boxShadow: 'var(--shadow-sm)',
                                }}
                            >
                                <div style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: 'var(--text-xs)',
                                    fontWeight: 600,
                                    textTransform: 'uppercase' as const,
                                    letterSpacing: '0.12em',
                                    color: 'var(--orange)',
                                    marginBottom: '20px',
                                }}>
                                    Our Vision
                                </div>
                                <h3 className="heading-3" style={{ marginBottom: '16px' }}>
                                    A world where great products find their people
                                </h3>
                                <p className="body-lg">
                                    We envision a future where AI handles the complexity of
                                    multi-channel marketing, freeing humans to create and connect
                                    in ways that truly matter.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════ SECTION 3: VALUES — Pattern #12 Asymmetric Bento ══════════ */}
                <section
                    ref={valuesRef}
                    className="section"
                    style={{ background: 'var(--bg-warm)' }}
                >
                    <div className="container">
                        <div className="label-mono" style={{ marginBottom: '16px' }}>Our Values</div>
                        <h2 className="heading-2" style={{ marginBottom: '48px', maxWidth: '500px' }}>
                            What we believe shapes what we build
                        </h2>
                        <div className="about-values-grid">
                            {values.map((v, i) => (
                                <div
                                    key={v.title}
                                    className={`about-value-card about-value-card-${i}`}
                                    onMouseEnter={(e) => {
                                        const paths = e.currentTarget.querySelectorAll('.about-value-icon path');
                                        paths.forEach((p) => {
                                            (p as HTMLElement).style.strokeDashoffset = '0';
                                        });
                                    }}
                                    onMouseLeave={(e) => {
                                        const paths = e.currentTarget.querySelectorAll('.about-value-icon path');
                                        paths.forEach((p) => {
                                            (p as HTMLElement).style.strokeDashoffset = '100';
                                        });
                                    }}
                                    style={{
                                        background: 'var(--bg-white)',
                                        borderRadius: 'var(--radius-xl)',
                                        padding: i === 0 ? '48px 40px' : '36px 32px',
                                        border: '1px solid var(--border)',
                                        boxShadow: 'var(--shadow-sm)',
                                        transition: 'box-shadow var(--dur-normal) var(--ease-out), transform var(--dur-normal) var(--ease-out)',
                                        cursor: 'default',
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        marginBottom: '16px',
                                    }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: 'var(--radius-md)',
                                            background: 'var(--orange-50)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--orange)',
                                            flexShrink: 0,
                                        }}>
                                            <StrokeIcon
                                                pathData={valueIcons[v.title as keyof typeof valueIcons]}
                                                size={22}
                                                className="about-value-icon"
                                            />
                                        </div>
                                        <h3 style={{
                                            fontFamily: 'var(--font-heading)',
                                            fontSize: i === 0 ? 'var(--text-2xl)' : 'var(--text-xl)',
                                            fontWeight: 700,
                                            color: 'var(--text-primary)',
                                        }}>
                                            {v.title}
                                        </h3>
                                    </div>
                                    <p style={{
                                        fontSize: 'var(--text-base)',
                                        lineHeight: 1.7,
                                        color: 'var(--text-secondary)',
                                        marginBottom: '12px',
                                    }}>
                                        {v.desc}
                                    </p>
                                    <span style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: 'var(--text-xs)',
                                        color: 'var(--orange)',
                                        letterSpacing: '0.04em',
                                    }}>
                                        {v.highlight}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════ SECTION 4: METRICS — Pattern #13 Dark Odometer ══════════ */}
                <section
                    ref={metricsRef}
                    className="section dark-section"
                    style={{
                        background: 'var(--bg-dark)',
                        color: 'var(--text-on-dark)',
                    }}
                >
                    <div className="container">
                        <div className="label-mono" style={{ marginBottom: '16px', textAlign: 'center' }}>
                            By the Numbers
                        </div>
                        <h2 className="heading-2" style={{
                            textAlign: 'center',
                            marginBottom: '64px',
                            color: 'var(--text-on-dark)',
                        }}>
                            Scaled globally, <span className="text-gradient">measured relentlessly</span>
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '32px',
                        }}
                            className="about-metrics-grid"
                        >
                            {metrics.map((m) => (
                                <div
                                    key={m.label}
                                    className="about-metric"
                                    style={{
                                        textAlign: 'center',
                                        padding: '40px 16px',
                                        borderRadius: 'var(--radius-xl)',
                                        background: 'var(--bg-dark-elevated)',
                                        border: '1px solid var(--border-dark)',
                                    }}
                                >
                                    <div style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                                        fontWeight: 900,
                                        letterSpacing: '-0.03em',
                                        lineHeight: 1,
                                        marginBottom: '12px',
                                        fontVariantNumeric: 'tabular-nums',
                                    }}>
                                        <span className="text-gradient">
                                            <CountUp value={m.value} suffix={m.suffix} decimals={m.decimals || 0} />
                                        </span>
                                    </div>
                                    <div style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: 'var(--text-xs)',
                                        color: 'var(--text-on-dark-secondary)',
                                        textTransform: 'uppercase' as const,
                                        letterSpacing: '0.1em',
                                    }}>
                                        {m.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════ SECTION 5: MILESTONES — Pattern #14 Horizontal Timeline ══════════ */}
                <section
                    ref={milestonesRef}
                    className="section"
                    style={{ background: 'var(--bg-primary)' }}
                >
                    <div className="container">
                        <div className="label-mono" style={{ marginBottom: '16px' }}>Our Journey</div>
                        <h2 className="heading-2" style={{ marginBottom: '64px', maxWidth: '500px' }}>
                            From idea to <span className="text-gradient">10,000+ campaigns</span>
                        </h2>

                        <div className="about-timeline-wrap" style={{ position: 'relative' }}>
                            {/* Horizontal line */}
                            <div style={{
                                position: 'absolute',
                                top: '24px',
                                left: '0',
                                right: '0',
                                height: '2px',
                                background: 'var(--border)',
                                borderRadius: '1px',
                            }}>
                                <div
                                    className="about-timeline-line-fill"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'var(--gradient-orange)',
                                        borderRadius: '1px',
                                    }}
                                />
                            </div>

                            <div className="about-timeline-grid" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                gap: '24px',
                                position: 'relative',
                            }}>
                                {milestones.map((m, i) => (
                                    <div key={i} style={{ paddingTop: '0' }}>
                                        {/* Dot */}
                                        <div
                                            className="about-timeline-dot"
                                            style={{
                                                width: '14px',
                                                height: '14px',
                                                borderRadius: '50%',
                                                background: 'var(--orange)',
                                                border: '3px solid var(--bg-primary)',
                                                boxShadow: '0 0 0 2px var(--orange)',
                                                marginBottom: '24px',
                                                position: 'relative',
                                                zIndex: 2,
                                            }}
                                        />
                                        {/* Content */}
                                        <div className="about-timeline-card" style={{
                                            background: 'var(--bg-white)',
                                            borderRadius: 'var(--radius-lg)',
                                            padding: '24px',
                                            border: '1px solid var(--border)',
                                            boxShadow: 'var(--shadow-sm)',
                                        }}>
                                            <div style={{
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: 'var(--text-xs)',
                                                color: 'var(--orange)',
                                                letterSpacing: '0.08em',
                                                fontWeight: 600,
                                                marginBottom: '8px',
                                            }}>
                                                {m.quarter}
                                            </div>
                                            <h4 style={{
                                                fontFamily: 'var(--font-heading)',
                                                fontSize: 'var(--text-lg)',
                                                fontWeight: 700,
                                                marginBottom: '8px',
                                                color: 'var(--text-primary)',
                                            }}>
                                                {m.event}
                                            </h4>
                                            <p style={{
                                                fontSize: 'var(--text-sm)',
                                                color: 'var(--text-secondary)',
                                                lineHeight: 1.6,
                                            }}>
                                                {m.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════ SECTION 6: TEAM GALLERY ══════════ */}
                <section
                    ref={galleryRef}
                    className="section"
                    style={{ background: 'var(--bg-warm)' }}
                >
                    <div className="container">
                        <div className="label-mono" style={{ marginBottom: '16px', textAlign: 'center' }}>
                            Our People
                        </div>
                        <h2 className="heading-2" style={{ textAlign: 'center', marginBottom: '48px' }}>
                            The faces behind the platform
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '20px',
                        }}
                            className="about-gallery-grid"
                        >
                            {teamPhotos.map((photo) => (
                                <div
                                    key={photo.label}
                                    className="about-gallery-item"
                                    style={{
                                        borderRadius: 'var(--radius-xl)',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        aspectRatio: '3/4',
                                        background: 'var(--bg-surface)',
                                        border: '1px solid var(--border)',
                                    }}
                                >
                                    <img
                                        src={photo.src}
                                        alt={photo.label}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            display: 'block',
                                        }}
                                        loading="lazy"
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        padding: '32px 20px 20px',
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                                    }}>
                                        <div style={{
                                            fontFamily: 'var(--font-heading)',
                                            fontWeight: 700,
                                            fontSize: 'var(--text-base)',
                                            color: '#fff',
                                            marginBottom: '4px',
                                        }}>
                                            {photo.label}
                                        </div>
                                        <div style={{
                                            fontSize: 'var(--text-xs)',
                                            color: 'rgba(255,255,255,0.7)',
                                        }}>
                                            {photo.desc}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════ SECTION 7: CULTURE — Pattern #16 Hexagonal Honeycomb ══════════ */}
                <section
                    ref={cultureRef}
                    className="section"
                    style={{ background: 'var(--bg-primary)' }}
                >
                    <div className="container">
                        <div className="label-mono" style={{ marginBottom: '16px', textAlign: 'center' }}>
                            Our Culture
                        </div>
                        <h2 className="heading-2" style={{ textAlign: 'center', marginBottom: '64px' }}>
                            How we work together
                        </h2>
                        <div className="about-hex-grid">
                            {cultureItems.map((item) => (
                                <div key={item.title} className="about-hex-item">
                                    <div className="about-hex-shape">
                                        <div className="about-hex-content">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="var(--orange)"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                style={{ marginBottom: '12px' }}
                                            >
                                                <path d={item.iconPath} />
                                            </svg>
                                            <h4 style={{
                                                fontFamily: 'var(--font-heading)',
                                                fontWeight: 700,
                                                fontSize: 'var(--text-base)',
                                                color: 'var(--text-primary)',
                                                marginBottom: '6px',
                                            }}>
                                                {item.title}
                                            </h4>
                                            <p style={{
                                                fontSize: 'var(--text-xs)',
                                                color: 'var(--text-secondary)',
                                                lineHeight: 1.5,
                                            }}>
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════ SECTION 8: CTA — Magnetic + Scramble ══════════ */}
                <section
                    ref={ctaRef}
                    className="section"
                    style={{
                        background: 'var(--bg-warm)',
                        textAlign: 'center',
                    }}
                >
                    <div className="container about-cta-inner">
                        <div className="label-mono" style={{ marginBottom: '16px' }}>
                            Ready to Start?
                        </div>
                        <h2 className="heading-1" style={{ marginBottom: '20px', maxWidth: '700px', margin: '0 auto 20px' }}>
                            Let AI handle your marketing
                        </h2>
                        <p className="body-lg" style={{ maxWidth: '520px', margin: '0 auto 40px' }}>
                            Join thousands of businesses using OpenAnalyst to plan, launch,
                            and optimize campaigns automatically.
                        </p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Magnetic strength={0.2}>
                                <a
                                    href="https://app.openanalyst.com"
                                    className="btn-primary"
                                    onMouseEnter={scramble}
                                    style={{ fontSize: 'var(--text-base)', padding: '16px 40px' }}
                                >
                                    <span ref={scrambleRef} data-text="Start Free Trial">
                                        Start Free Trial
                                    </span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </Magnetic>
                            <Magnetic strength={0.15}>
                                <a href="/careers" className="btn-outline" style={{ fontSize: 'var(--text-base)', padding: '16px 40px' }}>
                                    We&apos;re Hiring
                                </a>
                            </Magnetic>
                        </div>
                    </div>
                </section>

            </main>
            <Footer
                ctaWords={['Your', 'story', 'deserves', 'amplification.']}
                ctaHighlight="amplification."
                ctaSubtitle="We built OpenAnalyst so your brand can reach millions — without the grind."
            />

            <style>{`
                /* ── Values Bento Grid (Asymmetric) ── */
                .about-values-grid {
                    display: grid;
                    grid-template-columns: 1.4fr 1fr;
                    grid-template-rows: auto auto;
                    gap: 20px;
                }
                .about-value-card-0 {
                    grid-column: 1;
                    grid-row: 1 / 3;
                }
                .about-value-card-1 {
                    grid-column: 2;
                    grid-row: 1;
                }
                .about-value-card-2 {
                    grid-column: 2;
                    grid-row: 2;
                }
                .about-value-card-3 {
                    grid-column: 1 / 3;
                    grid-row: 3;
                }
                .about-value-card:hover {
                    box-shadow: var(--shadow-lg) !important;
                    transform: translateY(-4px);
                }

                /* ── Hex Grid ── */
                .about-hex-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                    max-width: 720px;
                    margin: 0 auto;
                }
                .about-hex-item {
                    display: flex;
                    justify-content: center;
                }
                .about-hex-item:nth-child(4),
                .about-hex-item:nth-child(5),
                .about-hex-item:nth-child(6) {
                    /* offset 2nd row for honeycomb */
                }
                .about-hex-shape {
                    width: 200px;
                    height: 220px;
                    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
                    background: var(--bg-white);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform var(--dur-normal) var(--ease-out), background var(--dur-normal) ease;
                }
                .about-hex-shape:hover {
                    transform: scale(1.05);
                    background: var(--orange-light);
                }
                .about-hex-content {
                    text-align: center;
                    padding: 32px 20px;
                }

                /* ── Timeline responsive ── */
                @media (max-width: 768px) {
                    .about-timeline-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    .about-metrics-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    .about-gallery-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    .about-values-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .about-value-card-0,
                    .about-value-card-1,
                    .about-value-card-2,
                    .about-value-card-3 {
                        grid-column: 1 !important;
                        grid-row: auto !important;
                    }
                    .about-hex-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    .about-hex-shape {
                        width: 160px;
                        height: 180px;
                    }
                }
                @media (max-width: 480px) {
                    .about-timeline-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .about-metrics-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .about-gallery-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .about-hex-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .about-hex-shape {
                        width: 180px;
                        height: 200px;
                    }
                }
            `}</style>
        </>
    );
}
