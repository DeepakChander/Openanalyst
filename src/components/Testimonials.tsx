'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ═══ Pattern #7: Horizontal drag-scroll carousel with depth ═══ */

const testimonials = [
    { quote: 'OpenAnalyst transformed our campaign workflow. 3x ROI in the first month — our entire team was blown away.', name: 'Sarah Chen', title: 'VP Marketing', company: 'TechFlow', metric: '3x ROI', color: '#FF6B00' },
    { quote: 'The AI agents handle what used to take our team a full week. It\'s like hiring 10 expert marketers overnight.', name: 'Marcus Rivera', title: 'Growth Lead', company: 'ScaleUp', metric: '10x faster', color: '#8B5CF6' },
    { quote: 'Finally, AI marketing that actually delivers. Our engagement rates are through the roof and costs are down 40%.', name: 'Emily Watson', title: 'CMO', company: 'DataDrive', metric: '-40% CPA', color: '#10B981' },
    { quote: 'We replaced 4 separate tools with OpenAnalyst. The ROI speaks for itself — best decision we made this year.', name: 'James Park', title: 'Founder', company: 'NextGen Labs', metric: '4 tools replaced', color: '#F59E0B' },
];

const Testimonials: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.test-label', { y: 16, opacity: 0, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } });
        gsap.from('.test-heading', { y: 30, opacity: 0, filter: 'blur(6px)', duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
        gsap.from('.test-scroll', { y: 40, opacity: 0, duration: 0.8, delay: 0.2, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} style={{
            padding: 'var(--space-section) 0',
            background: 'var(--bg-warm)',
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Decorative quote marks */}
            <div style={{
                position: 'absolute', top: '10%', left: '5%',
                fontSize: 'clamp(10rem, 20vw, 18rem)', fontFamily: 'Georgia, serif',
                color: 'rgba(255,107,0,0.03)', lineHeight: 1, pointerEvents: 'none',
                userSelect: 'none',
            }}>&ldquo;</div>

            <div style={{ padding: '0 24px' }}>
                <div className="container" style={{ marginBottom: 48 }}>
                    <p className="test-label label-mono" style={{ textAlign: 'center', marginBottom: 16 }}>Testimonials</p>
                    <h2 className="test-heading" style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em',
                        textAlign: 'center',
                    }}>
                        Trusted by <span className="text-gradient">growth teams</span>
                    </h2>
                </div>
            </div>

            {/* Horizontal scroll container */}
            <div className="test-scroll" ref={scrollRef} style={{
                display: 'flex', gap: 20, overflowX: 'auto', overflowY: 'hidden',
                padding: '20px 24px 40px',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                cursor: 'grab',
                scrollbarWidth: 'none',
            }}>
                {/* Left spacer for centering first card */}
                <div style={{ flexShrink: 0, width: 'max(0px, calc((100vw - 1200px) / 2))' }} />

                {testimonials.map((t, i) => (
                    <div key={i} style={{
                        flexShrink: 0, width: 'clamp(320px, 40vw, 420px)',
                        scrollSnapAlign: 'center',
                        padding: '36px 32px', borderRadius: 'var(--radius-xl)',
                        background: 'var(--bg-white)',
                        border: '1px solid var(--border)',
                        boxShadow: 'var(--shadow-md)',
                        display: 'flex', flexDirection: 'column',
                        transition: 'all 0.4s var(--ease-out)',
                        position: 'relative',
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-6px)';
                            e.currentTarget.style.boxShadow = `0 16px 48px ${t.color}12`;
                            e.currentTarget.style.borderColor = `${t.color}25`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                            e.currentTarget.style.borderColor = 'var(--border)';
                        }}
                    >
                        {/* Metric badge */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            padding: '4px 12px', borderRadius: 'var(--radius-full)', marginBottom: 20,
                            background: `${t.color}08`, border: `1px solid ${t.color}15`,
                            alignSelf: 'flex-start',
                        }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /></svg>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: t.color, fontWeight: 700 }}>{t.metric}</span>
                        </div>

                        {/* Quote */}
                        <blockquote style={{
                            fontSize: 16, color: 'var(--text-primary)',
                            lineHeight: 1.7, fontStyle: 'normal', marginBottom: 28, flex: 1,
                        }}>
                            &ldquo;{t.quote}&rdquo;
                        </blockquote>

                        {/* Author */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: '50%',
                                background: `linear-gradient(135deg, ${t.color}, ${t.color}99)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14, color: '#fff',
                                boxShadow: `0 4px 12px ${t.color}30`,
                            }}>
                                {t.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', margin: 0 }}>{t.name}</p>
                                <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>{t.title} at <span style={{ color: t.color }}>{t.company}</span></p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Right spacer */}
                <div style={{ flexShrink: 0, width: 'max(0px, calc((100vw - 1200px) / 2))' }} />
            </div>

            {/* Scroll hint */}
            <div style={{ textAlign: 'center', marginTop: 8 }}>
                <span style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: -2, marginRight: 4 }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    DRAG TO SCROLL
                </span>
            </div>

            <style>{`
                .test-scroll::-webkit-scrollbar { display: none; }
            `}</style>
        </section>
    );
};

export default Testimonials;
