'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CTASection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Strikethrough line draws through "Stop managing campaigns"
        gsap.fromTo('.cta-strike-line', { scaleX: 0 }, {
            scaleX: 1, duration: 0.8, ease: 'power3.inOut',
            scrollTrigger: { trigger: '.cta-strike', start: 'top 75%' },
        });

        // Fade the struck text
        gsap.to('.cta-strike-text', {
            color: 'rgba(255,255,255,0.25)', duration: 0.6, delay: 0.4,
            scrollTrigger: { trigger: '.cta-strike', start: 'top 75%' },
        });

        // Second line appears
        gsap.from('.cta-reveal', {
            y: 30, opacity: 0, filter: 'blur(6px)', duration: 0.7, ease: 'power3.out', delay: 0.8,
            scrollTrigger: { trigger: '.cta-strike', start: 'top 75%' },
        });

        // CTA buttons
        gsap.from('.cta-buttons', {
            y: 24, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 1.2,
            scrollTrigger: { trigger: '.cta-strike', start: 'top 75%' },
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="dark-section" style={{
            padding: '140px 24px', background: 'var(--bg-dark-primary)',
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Background mesh */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'var(--gradient-mesh-dark)',
            }} />

            {/* Animated gradient orbs */}
            <div style={{
                position: 'absolute', top: '20%', left: '30%',
                width: 500, height: 500, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)',
                filter: 'blur(80px)', pointerEvents: 'none',
                animation: 'pulseGlow 6s ease-in-out infinite',
            }} />
            <div style={{
                position: 'absolute', bottom: '20%', right: '20%',
                width: 400, height: 400, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)',
                filter: 'blur(60px)', pointerEvents: 'none',
                animation: 'pulseGlow 8s ease-in-out infinite reverse',
            }} />

            <div style={{
                maxWidth: 800, margin: '0 auto', textAlign: 'center',
                position: 'relative', zIndex: 1,
            }}>
                {/* Strikethrough line — "Stop managing campaigns." */}
                <div className="cta-strike" style={{ marginBottom: 8 }}>
                    <span className="cta-strike-text" style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 800, color: 'rgba(255,255,255,0.6)',
                        letterSpacing: '-0.03em', lineHeight: 1.2,
                        position: 'relative', display: 'inline-block',
                    }}>
                        Stop managing campaigns.
                        {/* The animated strikethrough */}
                        <div className="cta-strike-line" style={{
                            position: 'absolute', top: '55%', left: '-4%', right: '-4%',
                            height: 3, borderRadius: 2,
                            background: 'linear-gradient(90deg, transparent, #FF6B00, #FF8533, transparent)',
                            transformOrigin: 'left', transform: 'scaleX(0)',
                        }} />
                    </span>
                </div>

                {/* Reveal line — "Start growing revenue." */}
                <div className="cta-reveal" style={{ marginBottom: 32 }}>
                    <span style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2,
                        background: 'linear-gradient(135deg, #FF8533, #FF6B00, #F59E0B)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>
                        Start growing revenue.
                    </span>
                </div>

                <p className="cta-reveal" style={{
                    fontFamily: 'var(--font-body)', fontSize: 16,
                    color: 'var(--text-dark-secondary)', maxWidth: 480,
                    margin: '0 auto 40px', lineHeight: 1.7,
                }}>
                    Deploy AI agents that run your marketing on autopilot.
                    Real results, real growth — starting today.
                </p>

                <div className="cta-buttons" style={{
                    display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center',
                }}>
                    <a href="https://app.openanalyst.com" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        padding: '16px 40px', fontSize: 15, fontFamily: 'var(--font-body)', fontWeight: 600,
                        color: '#FFFFFF', background: 'linear-gradient(135deg, #FF6B00, #FF8533)',
                        border: 'none', borderRadius: 9999, textDecoration: 'none',
                        transition: 'all 0.3s var(--ease-spring)',
                        boxShadow: '0 4px 30px rgba(255,107,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                        cursor: 'pointer',
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 8px 50px rgba(255,107,0,0.45), inset 0 1px 0 rgba(255,255,255,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 30px rgba(255,107,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
                        }}
                    >
                        Start Free Trial
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                    <a href="/contact" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        padding: '16px 40px', fontSize: 15, fontFamily: 'var(--font-body)', fontWeight: 500,
                        color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9999, textDecoration: 'none',
                        transition: 'all 0.3s var(--ease-spring)', backdropFilter: 'blur(10px)',
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255,107,0,0.4)';
                            e.currentTarget.style.color = '#FF8533';
                            e.currentTarget.style.transform = 'translateY(-3px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                            e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        Talk to Sales
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
