'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ═══ Pattern #10: Diagonal clip-path split + strikethrough ═══ */

const CTASection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Strikethrough draws
        gsap.fromTo('.cta-strike-line', { scaleX: 0 }, {
            scaleX: 1, duration: 0.8, ease: 'power3.inOut',
            scrollTrigger: { trigger: '.cta-text-block', start: 'top 75%' },
        });
        // Struck text fades
        gsap.to('.cta-strike-text', {
            color: 'rgba(255,255,255,0.2)', duration: 0.6, delay: 0.4,
            scrollTrigger: { trigger: '.cta-text-block', start: 'top 75%' },
        });
        // Reveal line
        gsap.fromTo('.cta-reveal', { y: 30, opacity: 0, filter: 'blur(6px)' }, {
            y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out', delay: 0.8,
            scrollTrigger: { trigger: '.cta-text-block', start: 'top 75%' },
        });
        // Buttons
        gsap.fromTo('.cta-buttons', { y: 20, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.6, delay: 1.2,
            scrollTrigger: { trigger: '.cta-text-block', start: 'top 75%' },
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} style={{
            position: 'relative', overflow: 'hidden',
            minHeight: 500,
        }}>
            {/* Diagonal split — left warm white, right dark */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'var(--bg-warm)',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            }} />
            <div style={{
                position: 'absolute', inset: 0,
                background: 'var(--bg-dark)',
                clipPath: 'polygon(45% 0, 100% 0, 100% 100%, 55% 100%)',
            }}>
                {/* Orange glow on dark side */}
                <div style={{
                    position: 'absolute', top: '30%', right: '20%',
                    width: 400, height: 400, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)',
                    filter: 'blur(60px)', pointerEvents: 'none',
                }} />
            </div>

            {/* Content centered across the diagonal */}
            <div className="cta-text-block" style={{
                position: 'relative', zIndex: 10,
                maxWidth: 700, margin: '0 auto',
                padding: 'var(--space-section) 24px',
                textAlign: 'center',
            }}>
                {/* Strikethrough line */}
                <div style={{ marginBottom: 8 }}>
                    <span className="cta-strike-text" style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
                        fontWeight: 800, color: '#FAFAFA',
                        letterSpacing: '-0.03em', lineHeight: 1.2,
                        position: 'relative', display: 'inline-block',
                    }}>
                        Stop managing campaigns.
                        <div className="cta-strike-line" style={{
                            position: 'absolute', top: '55%', left: '-4%', right: '-4%',
                            height: 3, borderRadius: 2,
                            background: 'linear-gradient(90deg, transparent, #FF6B00, #FF8533, transparent)',
                            transformOrigin: 'left', transform: 'scaleX(0)',
                        }} />
                    </span>
                </div>

                {/* Reveal line */}
                <div className="cta-reveal" style={{ marginBottom: 28 }}>
                    <span style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
                        fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2,
                        background: 'var(--gradient-orange-text)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>Start growing revenue.</span>
                </div>

                <p className="cta-reveal" style={{
                    fontSize: 16, color: 'rgba(255,255,255,0.6)',
                    maxWidth: 440, margin: '0 auto 36px', lineHeight: 1.7,
                }}>
                    Deploy AI agents that run your marketing on autopilot.
                </p>

                <div className="cta-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
                    <a href="https://app.openanalyst.com" className="btn-primary" style={{ fontSize: 15, padding: '15px 36px', textDecoration: 'none' }}>
                        Start Free Trial
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                    <a href="/contact" className="btn-outline" style={{
                        fontSize: 15, padding: '15px 36px', textDecoration: 'none',
                        color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.15)',
                    }}>Talk to Sales</a>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
