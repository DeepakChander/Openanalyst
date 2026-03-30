'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ═══ Pattern #8: Scroll-driven CSS 3D laptop rotation with callouts ═══ */

function DashboardScreen() {
    const [loaded, setLoaded] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => { setTimeout(() => setLoaded(true), 500); }, []);

    useEffect(() => {
        if (!loaded || !ref.current) return;
        ref.current.querySelectorAll('.ps-bar').forEach((bar, i) => {
            const h = [30, 42, 38, 52, 48, 58, 55, 68, 65, 75, 82, 92];
            (bar as HTMLElement).style.height = `${h[i]}%`;
        });
    }, [loaded]);

    return (
        <div ref={ref} style={{ width: '100%', height: '100%', background: '#0F1117', padding: '16px 20px', overflow: 'hidden' }}>
            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
                {[
                    { l: 'CAMPAIGNS', v: '24', c: '#FF6B00', ch: '+12%' },
                    { l: 'LEADS', v: '1.2K', c: '#8B5CF6', ch: '+34%' },
                    { l: 'ROI', v: '340%', c: '#10B981', ch: '+28%' },
                ].map((s, i) => (
                    <div key={i} style={{
                        padding: 12, borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                        opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(8px)',
                        transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.1}s`,
                    }}>
                        <div style={{ fontSize: 8, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', marginBottom: 2 }}>{s.l}</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                            <span style={{ fontSize: 22, fontWeight: 800, color: '#FAFAFA', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>{s.v}</span>
                            <span style={{ fontSize: 9, fontWeight: 600, color: '#10B981' }}>{s.ch}</span>
                        </div>
                    </div>
                ))}
            </div>
            {/* Chart */}
            <div style={{ height: 90, display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 16, opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease 0.6s' }}>
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="ps-bar" style={{
                        flex: 1, borderRadius: '3px 3px 1px 1px', height: 0,
                        background: i >= 10 ? 'linear-gradient(180deg, #FF6B00, #FF8533)' : i >= 8 ? 'rgba(255,107,0,0.5)' : 'rgba(255,107,0,0.12)',
                        transition: `height 0.8s cubic-bezier(0.16,1,0.3,1) ${0.7 + i * 0.05}s`,
                    }} />
                ))}
            </div>
            {/* Activity */}
            {[
                { t: 'Email campaign sent', s: '2,400 recipients' },
                { t: 'A/B test completed', s: 'Variant B won' },
            ].map((a, i) => (
                <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    opacity: loaded ? 1 : 0, transition: `opacity 0.4s ease ${1 + i * 0.15}s`,
                }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,107,0,0.1)', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, fontWeight: 600, color: '#FAFAFA' }}>{a.t}</div>
                        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)' }}>{a.s}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

const ProductShowcase: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from('.ps-label', { y: 16, opacity: 0, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } });
        gsap.from('.ps-heading', { y: 30, opacity: 0, filter: 'blur(6px)', duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });

        // Scroll-driven laptop rotation
        gsap.fromTo('.ps-laptop', { rotateX: 25, scale: 0.85, opacity: 0 }, {
            rotateX: 0, scale: 1, opacity: 1, ease: 'none',
            scrollTrigger: { trigger: '.ps-laptop-wrap', start: 'top 85%', end: 'top 40%', scrub: 1 },
        });

        // Callout labels appear after laptop settles
        gsap.from('.ps-callout', {
            opacity: 0, scale: 0.8, stagger: 0.15, duration: 0.5, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: '.ps-laptop-wrap', start: 'top 50%' },
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="dark-section" style={{
            padding: 'var(--space-section) 24px',
            background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden',
        }}>
            {/* Grid pattern */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.3,
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                maskImage: 'radial-gradient(ellipse 70% 50% at 50% 40%, black 0%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 40%, black 0%, transparent 70%)',
            }} />

            {/* Orange glow */}
            <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: 56 }}>
                    <p className="ps-label label-mono" style={{ color: '#FF8533', marginBottom: 16 }}>Product</p>
                    <h2 className="ps-heading" style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                        fontWeight: 800, color: '#FAFAFA', letterSpacing: '-0.03em',
                    }}>
                        See OpenAnalyst <span className="text-gradient">in action</span>
                    </h2>
                </div>

                {/* Laptop frame with 3D rotation */}
                <div className="ps-laptop-wrap" style={{ perspective: 1200, maxWidth: 800, margin: '0 auto', position: 'relative' }}>
                    <div className="ps-laptop" style={{
                        transformStyle: 'preserve-3d',
                        borderRadius: 16, overflow: 'hidden',
                        boxShadow: '0 60px 120px -30px rgba(255,107,0,0.15), 0 30px 60px -15px rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                        {/* Browser chrome */}
                        <div style={{ padding: '8px 14px', background: 'rgba(0,0,0,0.5)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ display: 'flex', gap: 5 }}>
                                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57' }} />
                                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E' }} />
                                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840' }} />
                            </div>
                            <div style={{ flex: 1, textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>app.openanalyst.com</div>
                        </div>
                        <DashboardScreen />
                    </div>

                    {/* Callout labels floating around the laptop */}
                    <div className="ps-callout hide-mobile" style={{
                        position: 'absolute', top: '15%', left: '-12%',
                        padding: '8px 16px', borderRadius: 'var(--radius-md)',
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(12px)', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#FF8533',
                    }}>42 AI Agents</div>

                    <div className="ps-callout hide-mobile" style={{
                        position: 'absolute', top: '40%', right: '-14%',
                        padding: '8px 16px', borderRadius: 'var(--radius-md)',
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(12px)', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#10B981',
                    }}>Real-time Analytics</div>

                    <div className="ps-callout hide-mobile" style={{
                        position: 'absolute', bottom: '10%', left: '-10%',
                        padding: '8px 16px', borderRadius: 'var(--radius-md)',
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(12px)', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8B5CF6',
                    }}>27+ Integrations</div>

                    {/* Reflection glow */}
                    <div style={{
                        marginTop: -10, height: 60, borderRadius: '50%',
                        background: 'radial-gradient(ellipse, rgba(255,107,0,0.1) 0%, transparent 70%)',
                        filter: 'blur(20px)', pointerEvents: 'none',
                    }} />
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;
