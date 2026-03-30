'use client';

import { useRef, useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header, Footer } from '@/components';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════ DATA ═══════════ */
const values = [
    { title: 'Innovation', desc: 'We don\'t follow the marketing playbook — we rewrite it. Our AI agents evolve daily, learning from millions of data points.', num: '01', highlight: 'AI-first thinking in everything we build', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg> },
    { title: 'Simplicity', desc: 'The most powerful technology disappears into the workflow. Launch a campaign in 3 clicks, not 30 steps.', num: '02', highlight: 'Complex problems, elegant solutions', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg> },
    { title: 'Trust', desc: 'Your data never trains our models. SOC 2 Type II certified, GDPR compliant, integrity checks on every campaign.', num: '03', highlight: 'Security is the foundation', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
    { title: 'Impact', desc: 'We optimize for revenue, not impressions. Every AI agent is measured by the actual business growth it creates.', num: '04', highlight: 'Real growth, not vanity metrics', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg> },
];

const metrics = [
    { value: 10, suffix: 'K+', label: 'Campaigns Deployed' },
    { value: 42, suffix: '', label: 'AI Agents' },
    { value: 99.9, suffix: '%', label: 'Uptime SLA' },
    { value: 150, suffix: '+', label: 'Countries Served' },
];

const milestones = [
    { year: '2024', quarter: 'Q1', event: 'Founded', desc: 'OpenAnalyst was born from a vision to democratize AI-powered marketing.', color: '#FF6B00' },
    { year: '2024', quarter: 'Q3', event: 'First 1,000 Users', desc: 'Reached our first major milestone with early adopters worldwide.', color: '#F59E0B' },
    { year: '2025', quarter: 'Q1', event: '27 Integrations', desc: 'Connected to the entire marketing stack — Gmail, Slack, HubSpot, and more.', color: '#8B5CF6' },
    { year: '2025', quarter: 'Q3', event: '10K+ Campaigns', desc: 'AI agents planned, launched, and optimized over 10,000 campaigns.', color: '#3B82F6' },
];

const teamPhotos = [
    { src: '/images/culture/office.png', label: 'The Full Team', desc: 'Builders, dreamers, and marketing revolutionaries.' },
    { src: '/images/culture/workshop.png', label: 'Leadership', desc: 'Vision and strategy at OpenAnalyst.' },
    { src: '/images/culture/remote.png', label: 'Engineering', desc: 'The minds behind the AI agents.' },
    { src: '/images/culture/event.png', label: 'Team Bonding', desc: 'We work hard, celebrate harder.' },
];

const cultureItems = [
    { title: 'Remote-First', desc: 'Great talent isn\'t bound by geography.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> },
    { title: 'Ship Fast', desc: 'Weekly releases, daily deployments.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg> },
    { title: 'Transparency', desc: 'Open books, open roadmap.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg> },
    { title: 'Customer First', desc: 'Every feature starts with a problem.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
    { title: 'Learn & Grow', desc: '$5K annual learning budget.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> },
    { title: 'Play to Win', desc: 'Growth is a team sport.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg> },
];

/* ═══════════ 3D PARTICLE CLOUD ═══════════ */
function ParticleCloud() {
    const ref = useRef<THREE.Points>(null);
    const [positions, colors] = useMemo(() => {
        const count = 600;
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 1 + Math.random() * 3;
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
            const hue = 0.05 + Math.random() * 0.08;
            const color = new THREE.Color().setHSL(hue, 0.9, 0.5 + Math.random() * 0.3);
            col[i * 3] = color.r; col[i * 3 + 1] = color.g; col[i * 3 + 2] = color.b;
        }
        return [pos, col];
    }, []);

    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.y = clock.getElapsedTime() * 0.04;
            ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.1;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color" args={[colors, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.02} vertexColors transparent opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
        </points>
    );
}

/* ═══════════ ANIMATED COUNTER ═══════════ */
function AnimatedCounter({ value, suffix = '', decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    useEffect(() => {
        if (!visible || !ref.current) return;
        const obj = { val: 0 };
        gsap.to(obj, { val: value, duration: 2.5, ease: 'power2.out', onUpdate: () => { if (ref.current) ref.current.textContent = (decimals > 0 ? obj.val.toFixed(decimals) : Math.round(obj.val)) + suffix; } });
    }, [visible, value, suffix, decimals]);
    return <span ref={ref}>0{suffix}</span>;
}

/* ═══════════ PHOTO CARD ═══════════ */
function PhotoCard({ photo, index }: { photo: typeof teamPhotos[0]; index: number }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div className="about-gallery-item" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            style={{
                position: 'relative', borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
                height: index === 0 ? 500 : 370, gridRow: index === 0 ? 'span 2' : undefined,
                transition: 'transform 0.5s var(--ease-spring), box-shadow 0.5s ease',
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.15)' : '0 4px 20px rgba(0,0,0,0.06)',
            }}>
            <img src={photo.src} alt={photo.label} style={{
                width: '100%', height: '100%', objectFit: 'cover',
                filter: hovered ? 'brightness(1.02)' : 'brightness(0.9) saturate(0.85)',
                transition: 'all 0.7s var(--ease-spring)', transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }} />
            <div style={{ position: 'absolute', inset: 0, background: hovered ? 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%)' : 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.5) 100%)', transition: 'all 0.5s ease' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #FF6B00, #F59E0B)', transform: hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.5s var(--ease-spring)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 28px', transform: hovered ? 'translateY(0)' : 'translateY(6px)', transition: 'transform 0.4s ease' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{photo.label}</h4>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.6)', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease 0.1s' }}>{photo.desc}</p>
            </div>
        </div>
    );
}

/* ═══════════ MAIN PAGE ═══════════ */
export default function AboutPage() {
    const pageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Hero
        const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        heroTl.from('.about-hero-label', { y: 20, opacity: 0, duration: 0.6 })
            .from('.about-hero-line', { y: '110%', duration: 1.2, stagger: 0.07 }, '-=0.3')
            .from('.about-hero-sub', { y: 24, opacity: 0, duration: 0.8 }, '-=0.6')
            .from('.about-hero-stat', { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.4');

        // Section headings
        gsap.utils.toArray<HTMLElement>('.about-sec-head').forEach(el => {
            gsap.fromTo(el, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
        });

        // Mission cards
        gsap.fromTo('.about-mission-l', { clipPath: 'inset(0 100% 0 0)', opacity: 0 }, { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1, ease: 'power3.inOut', scrollTrigger: { trigger: '.about-mission-section', start: 'top 78%' } });
        gsap.fromTo('.about-mission-r', { clipPath: 'inset(0 0 0 100%)', opacity: 0 }, { clipPath: 'inset(0 0 0 0%)', opacity: 1, duration: 1, ease: 'power3.inOut', scrollTrigger: { trigger: '.about-mission-section', start: 'top 78%' } });

        // Metrics
        gsap.fromTo('.about-metric', { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'back.out(1.2)', scrollTrigger: { trigger: '.about-metrics-section', start: 'top 85%' } });

        // Values
        gsap.fromTo('.about-value-card', { y: 60, opacity: 0, rotateX: 10 }, { y: 0, opacity: 1, rotateX: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.about-values-section', start: 'top 80%' } });

        // Gallery
        gsap.utils.toArray<HTMLElement>('.about-gallery-item').forEach((el, i) => {
            gsap.fromTo(el, { clipPath: 'inset(100% 0 0 0)', opacity: 0 }, { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1, ease: 'power3.inOut', delay: i * 0.15, scrollTrigger: { trigger: '.about-gallery-section', start: 'top 80%' } });
        });

        // Timeline
        gsap.fromTo('.about-tl-line', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.about-timeline-section', start: 'top 60%', end: 'bottom 50%', scrub: 1 } });
        gsap.utils.toArray<HTMLElement>('.about-tl-item').forEach((el, i) => {
            gsap.fromTo(el, { x: i % 2 === 0 ? -50 : 50, y: 20, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
        });

        // Culture
        gsap.fromTo('.about-culture-card', { rotateY: -90, opacity: 0 }, { rotateY: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.about-culture-section', start: 'top 82%' } });

        // CTA
        gsap.fromTo('.about-cta-content', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.about-cta-section', start: 'top 85%' } });
    }, { scope: pageRef });

    return (
        <div ref={pageRef} style={{ minHeight: '100vh' }}>
            <Header />

            {/* ═══ HERO — Dark ═══ */}
            <section className="dark-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 80, background: 'var(--bg-dark-primary)' }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '80px 80px', maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 70%)' }} />
                <div style={{ position: 'absolute', top: '-10%', right: '10%', width: 600, height: 600, borderRadius: '50%', background: 'rgba(255,107,0,0.05)', filter: 'blur(100px)', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
                    <div className="about-hero-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, marginBottom: 32, border: '1px solid rgba(255,107,0,0.2)', background: 'rgba(255,107,0,0.06)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF6B00', boxShadow: '0 0 8px rgba(255,107,0,0.5)' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#FF8533', textTransform: 'uppercase', letterSpacing: '0.1em' }}>About OpenAnalyst</span>
                    </div>

                    <h1 style={{ marginBottom: 28 }}>
                        {['We Build the', 'Future of', 'AI Marketing'].map((line, i) => (
                            <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                                <span className="about-hero-line" style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.04em', ...(i === 2 ? { background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } : { color: '#FAFAFA' }) }}>{line}</span>
                            </span>
                        ))}
                    </h1>

                    <p className="about-hero-sub" style={{ maxWidth: 520, margin: '0 auto 48px', fontSize: 'clamp(1rem, 1.4vw, 1.1rem)', color: 'var(--text-dark-secondary)', lineHeight: 1.8 }}>
                        Born from a belief that every business deserves an AI-powered marketing team. We build intelligent agents that plan, launch, and optimize campaigns.
                    </p>

                    <div style={{ display: 'flex', gap: 40, justifyContent: 'center', paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        {[{ val: 'Est. 2024', label: 'Founded' }, { val: '30+', label: 'Team' }, { val: '10K+', label: 'Campaigns' }].map((s, i) => (
                            <div key={i} className="about-hero-stat">
                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800, color: '#FF6B00', letterSpacing: '-0.02em' }}>{s.val}</div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dark-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ MISSION & VISION — Light ═══ */}
            <section className="about-mission-section light-section" style={{ padding: '120px 24px', background: 'var(--bg-surface)' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div className="about-sec-head" style={{ textAlign: 'center', marginBottom: 56 }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12, fontWeight: 600 }}>Purpose</p>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>Why we <span className="text-gradient">exist</span></h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                        <div className="about-mission-l" style={{ padding: '48px 40px', borderRadius: 24, background: 'var(--bg-white)', border: '1px solid var(--border-default)', overflow: 'hidden' }}>
                            <div style={{ width: 48, height: 48, borderRadius: 14, marginBottom: 24, background: 'var(--orange-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                            </div>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--orange)', marginBottom: 14, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Our Mission</p>
                            <p style={{ fontSize: 18, color: 'var(--text-primary)', lineHeight: 1.8 }}>To democratize marketing excellence through AI agents that act as your expert marketing team, available 24/7 — making world-class marketing accessible to every business.</p>
                        </div>
                        <div className="about-mission-r" style={{ padding: '48px 40px', borderRadius: 24, background: 'var(--bg-dark-primary)', border: '1px solid var(--border-dark-default)', overflow: 'hidden' }}>
                            <div style={{ width: 48, height: 48, borderRadius: 14, marginBottom: 24, background: 'rgba(255,107,0,0.15)', border: '1px solid rgba(255,107,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF8533" strokeWidth="1.5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                            </div>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#FF8533', marginBottom: 14, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Our Vision</p>
                            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>A world where AI handles the complexity of marketing while humans focus on creativity, strategy, and building real connections with their audience.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ METRICS — Dark ═══ */}
            <section className="about-metrics-section dark-section" style={{ padding: '100px 24px', background: 'var(--bg-dark-primary)' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {metrics.map((m, i) => (
                        <div key={i} style={{ display: 'contents' }}>
                            {i > 0 && <div style={{ width: 1, height: 64, background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.08), transparent)', flexShrink: 0 }} />}
                            <div className="about-metric" style={{ flex: 1, textAlign: 'center', padding: '0 20px' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 2, marginBottom: 8 }}>
                                    <span style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, fontFamily: 'var(--font-heading)', letterSpacing: '-0.04em', lineHeight: 1, background: 'var(--orange-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                        <AnimatedCounter value={m.value} suffix={m.suffix} decimals={m.value === 99.9 ? 1 : 0} />
                                    </span>
                                </div>
                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 700, color: '#FAFAFA' }}>{m.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ VALUES — Light ═══ */}
            <section className="about-values-section light-section" style={{ padding: '120px 24px', background: 'var(--bg-surface)' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div className="about-sec-head" style={{ textAlign: 'center', marginBottom: 56 }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12, fontWeight: 600 }}>Our Values</p>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>What drives <span className="text-gradient">everything</span> we do</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, perspective: 1000 }}>
                        {values.map((v, i) => (
                            <div key={i} className="about-value-card" style={{ padding: '40px 36px', borderRadius: 24, background: i === 0 ? 'var(--bg-dark-primary)' : 'var(--bg-white)', border: `1px solid ${i === 0 ? 'rgba(255,107,0,0.15)' : 'var(--border-default)'}`, position: 'relative', overflow: 'hidden' }}>
                                <span style={{ position: 'absolute', top: 16, right: 20, fontFamily: 'var(--font-heading)', fontSize: 56, fontWeight: 900, color: i === 0 ? 'rgba(255,107,0,0.06)' : 'rgba(0,0,0,0.03)', lineHeight: 1, pointerEvents: 'none' }}>{v.num}</span>
                                <div style={{ width: 44, height: 44, borderRadius: 12, marginBottom: 20, background: i === 0 ? '#FF6B00' : 'var(--orange-light)', color: i === 0 ? '#fff' : 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{v.icon}</div>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, color: i === 0 ? '#fff' : 'var(--text-primary)', marginBottom: 10 }}>{v.title}</h3>
                                <p style={{ fontSize: 15, color: i === 0 ? 'rgba(255,255,255,0.6)' : 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 18 }}>{v.desc}</p>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, background: i === 0 ? 'rgba(255,107,0,0.12)' : 'var(--orange-light)', border: `1px solid ${i === 0 ? 'rgba(255,107,0,0.25)' : 'rgba(255,107,0,0.1)'}` }}>
                                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#FF6B00' }} />
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: i === 0 ? '#FF8533' : 'var(--orange)', letterSpacing: '0.03em' }}>{v.highlight}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ TEAM GALLERY — Dark ═══ */}
            <section className="about-gallery-section dark-section" style={{ padding: '120px 24px', background: 'var(--bg-dark-primary)' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div className="about-sec-head" style={{ textAlign: 'center', marginBottom: 56 }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#FF8533', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12, fontWeight: 600 }}>Our Team</p>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#FAFAFA' }}>Meet the <span className="text-gradient">people</span> behind the AI</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gridTemplateRows: 'auto auto', gap: 16 }}>
                        {teamPhotos.map((photo, i) => <PhotoCard key={i} photo={photo} index={i} />)}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 56, marginTop: 48, paddingTop: 36, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        {[{ val: '30+', label: 'Team Members' }, { val: '8', label: 'Countries' }, { val: '4.9/5', label: 'Glassdoor' }, { val: '95%', label: 'Retention' }].map((s, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 26, fontWeight: 800, color: '#FF6B00' }}>{s.val}</div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dark-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ TIMELINE — Light ═══ */}
            <section className="about-timeline-section light-section" style={{ padding: '120px 24px', background: 'var(--bg-surface)' }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <div className="about-sec-head" style={{ textAlign: 'center', marginBottom: 64 }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12, fontWeight: 600 }}>Our Journey</p>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>How we got <span className="text-gradient">here</span></h2>
                    </div>
                    <div style={{ position: 'relative', paddingLeft: 48 }}>
                        <div style={{ position: 'absolute', left: 15, top: 0, bottom: 0, width: 2, background: 'var(--border-default)' }}>
                            <div className="about-tl-line" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: 'linear-gradient(180deg, var(--orange), rgba(255,107,0,0.15))', transformOrigin: 'top' }} />
                        </div>
                        {milestones.map((m, i) => (
                            <div key={i} className="about-tl-item" style={{ position: 'relative', marginBottom: i < milestones.length - 1 ? 48 : 0 }}>
                                <div style={{ position: 'absolute', left: -41, top: 8, width: 14, height: 14, borderRadius: '50%', background: m.color, border: '3px solid var(--bg-surface)', boxShadow: `0 0 0 2px ${m.color}33` }} />
                                <div style={{ padding: '28px 32px', borderRadius: 20, background: 'var(--bg-white)', border: '1px solid var(--border-default)' }}>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: m.color, padding: '3px 10px', borderRadius: 999, border: `1px solid ${m.color}25`, background: `${m.color}08`, letterSpacing: '0.06em', fontWeight: 600 }}>{m.year} {m.quarter}</span>
                                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginTop: 14, marginBottom: 8 }}>{m.event}</h3>
                                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{m.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CULTURE — Dark with 3D ═══ */}
            <section className="about-culture-section dark-section" style={{ padding: '120px 24px', background: 'var(--bg-dark-elevated)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4 }}>
                    <Suspense fallback={null}>
                        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: '100%', height: '100%' }} gl={{ alpha: true }}>
                            <ParticleCloud />
                        </Canvas>
                    </Suspense>
                </div>
                <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div className="about-sec-head" style={{ textAlign: 'center', marginBottom: 56 }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#FF8533', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12, fontWeight: 600 }}>Culture</p>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#FFFFFF' }}>How we <span className="text-gradient">work</span></h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, perspective: 1000 }}>
                        {cultureItems.map((item, i) => (
                            <div key={i} className="about-culture-card" style={{ padding: '32px 24px', borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)', cursor: 'default' }}>
                                <div style={{ width: 40, height: 40, borderRadius: 12, marginBottom: 14, background: 'rgba(255,107,0,0.1)', color: '#FF8533', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</div>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>{item.title}</h3>
                                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CTA — Light ═══ */}
            <section className="about-cta-section light-section" style={{ padding: '120px 24px', background: 'var(--bg-surface)' }}>
                <div className="about-cta-content" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', padding: '64px 48px', borderRadius: 32, background: 'var(--bg-white)', border: '1px solid var(--border-default)', boxShadow: '0 8px 40px rgba(0,0,0,0.04)', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 100, height: 3, borderRadius: '0 0 3px 3px', background: 'linear-gradient(90deg, #FF6B00, #F59E0B)' }} />
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12, fontWeight: 600 }}>Join Us</p>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 20 }}>Ready to build the <span className="text-gradient">future</span>?</h2>
                    <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 440, margin: '0 auto 36px', lineHeight: 1.7 }}>We&apos;re looking for exceptional people who want to push the boundaries of AI marketing.</p>
                    <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="/careers" className="btn-primary" style={{ textDecoration: 'none' }}>View Open Positions <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                        <a href="/contact" className="btn-outline" style={{ textDecoration: 'none' }}>Get in Touch</a>
                    </div>
                </div>
            </section>

            <Footer />

            <style>{`
                @media (max-width: 768px) {
                    section > div > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
                    section > div > div[style*="grid-template-columns: 1.2fr"] { grid-template-columns: 1fr !important; }
                    section > div > div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
                    div[style*="gap: 56px"][style*="border-top"] { flex-wrap: wrap !important; gap: 24px 32px !important; }
                    div[style*="gap: 40px"][style*="border-top"] { flex-wrap: wrap !important; gap: 20px !important; justify-content: center !important; }
                    .about-metrics-section > div { flex-wrap: wrap !important; }
                    .about-metric { flex: 0 0 50% !important; margin-bottom: 24px !important; }
                }
                @media (max-width: 480px) { .about-metric { flex: 0 0 100% !important; } }
                @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
            `}</style>
        </div>
    );
}
