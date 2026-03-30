'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ProductShowcase: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from('.ps-label', { y: 16, opacity: 0, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } });
        gsap.from('.ps-heading', { y: 30, opacity: 0, filter: 'blur(6px)', duration: 0.8, ease: 'power4.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
        gsap.from('.ps-video', {
            y: 60, opacity: 0, scale: 0.95, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '.ps-video', start: 'top 85%' },
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="light-section" style={{
            padding: '120px 24px', background: 'var(--bg-surface)', position: 'relative', overflow: 'hidden',
        }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <p className="ps-label" style={{
                        fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--orange)',
                        textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12, fontWeight: 600,
                    }}>Product</p>
                    <h2 className="ps-heading" style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                        fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1,
                        letterSpacing: '-0.03em', maxWidth: 600, margin: '0 auto',
                    }}>
                        See OpenAnalyst <span className="text-gradient">in action</span>
                    </h2>
                </div>

                {/* Video placeholder container */}
                <div className="ps-video" style={{
                    position: 'relative', borderRadius: 24, overflow: 'hidden',
                    background: 'var(--bg-dark-primary)',
                    border: '1px solid var(--border-default)',
                    boxShadow: '0 24px 80px -16px rgba(0,0,0,0.12)',
                    aspectRatio: '16/9',
                }}>
                    {/* Grid pattern */}
                    <div style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.3,
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                    }} />

                    {/* Ambient glow */}
                    <div style={{
                        position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: '50%', height: '50%', borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)',
                        filter: 'blur(60px)', pointerEvents: 'none',
                    }} />

                    {/* Center play button */}
                    <div style={{
                        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', zIndex: 2,
                    }}>
                        <div style={{
                            width: 80, height: 80, borderRadius: '50%',
                            background: 'rgba(255,107,0,0.15)', border: '1px solid rgba(255,107,0,0.3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', transition: 'all 0.3s var(--ease-spring)',
                            backdropFilter: 'blur(8px)',
                        }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="#FF6B00" stroke="none">
                                <polygon points="8 5 20 12 8 19" />
                            </svg>
                        </div>
                        <span style={{
                            fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dark-muted)',
                            marginTop: 16, letterSpacing: '0.06em', textTransform: 'uppercase',
                        }}>
                            Watch Product Demo — 1:30
                        </span>
                    </div>

                    {/* Fake video timeline */}
                    <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
                        background: 'rgba(255,255,255,0.04)',
                    }}>
                        <div style={{
                            width: '22%', height: '100%', borderRadius: '0 2px 2px 0',
                            background: 'linear-gradient(90deg, #FF6B00, #FF853380)',
                        }} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;
