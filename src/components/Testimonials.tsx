'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        quote: 'OpenAnalyst transformed our campaign workflow. 3x ROI in the first month — our entire team was blown away.',
        name: 'Sarah Chen',
        title: 'VP Marketing',
        company: 'TechFlow',
        metric: '3x ROI',
    },
    {
        quote: 'The AI agents handle what used to take our team a full week. It\'s like hiring 10 expert marketers overnight.',
        name: 'Marcus Rivera',
        title: 'Growth Lead',
        company: 'ScaleUp',
        metric: '10x faster',
    },
    {
        quote: 'Finally, AI marketing that actually delivers. Our engagement rates are through the roof and costs are down 40%.',
        name: 'Emily Watson',
        title: 'CMO',
        company: 'DataDrive',
        metric: '-40% CPA',
    },
    {
        quote: 'We replaced 4 separate tools with OpenAnalyst. The ROI speaks for itself — best decision we made this year.',
        name: 'James Park',
        title: 'Founder',
        company: 'NextGen Labs',
        metric: '4 tools replaced',
    },
];

const companyLogos = ['TechFlow', 'ScaleUp', 'DataDrive', 'NextGen Labs', 'Acme Corp', 'Hyperion'];

export default function Testimonials() {
    const [active, setActive] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const goTo = useCallback(
        (index: number) => {
            if (isAnimating || index === active) return;
            setIsAnimating(true);
            const card = cardRef.current;
            if (!card) return;
            gsap.to(card, {
                opacity: 0, y: 20, filter: 'blur(4px)', duration: 0.3, ease: 'power2.in',
                onComplete: () => {
                    setActive(index);
                    gsap.fromTo(card,
                        { opacity: 0, y: -20, filter: 'blur(4px)' },
                        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power2.out', onComplete: () => setIsAnimating(false) }
                    );
                },
            });
        },
        [active, isAnimating]
    );

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setActive((prev) => {
                const next = (prev + 1) % testimonials.length;
                const card = cardRef.current;
                if (card) {
                    gsap.to(card, {
                        opacity: 0, y: 20, filter: 'blur(4px)', duration: 0.3, ease: 'power2.in',
                        onComplete: () => {
                            gsap.fromTo(card,
                                { opacity: 0, y: -20, filter: 'blur(4px)' },
                                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' }
                            );
                        },
                    });
                }
                return next;
            });
        }, 5000);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, []);

    useGSAP(() => {
        if (!sectionRef.current) return;
        const tl = gsap.timeline({
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        });
        tl.from('.test-label', { opacity: 0, y: 16, duration: 0.5 })
            .from('.test-heading', { opacity: 0, y: 30, filter: 'blur(6px)', duration: 0.7, ease: 'power4.out' }, '-=0.3')
            .from('.test-card', { opacity: 0, y: 40, duration: 0.6 }, '-=0.3')
            .from('.test-dots', { opacity: 0, y: 16, duration: 0.4 }, '-=0.2')
            .from('.test-logos', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2');
    }, { scope: sectionRef });

    const current = testimonials[active];

    return (
        <section ref={sectionRef} className="dark-section" style={{
            background: 'var(--bg-dark-primary)', padding: '120px 24px', overflow: 'hidden', position: 'relative',
        }}>
            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 600, height: 600, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,107,0,0.05) 0%, transparent 70%)',
                pointerEvents: 'none', filter: 'blur(80px)',
            }} />

            <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <p className="test-label" style={{
                    fontFamily: 'var(--font-mono)', fontSize: 12, color: '#FF8533',
                    textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12, fontWeight: 600,
                }}>Testimonials</p>
                <h2 className="test-heading" style={{
                    fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 800, color: '#FAFAFA', marginBottom: 48, lineHeight: 1.15, letterSpacing: '-0.03em',
                }}>
                    Trusted by <span className="text-gradient">Growth Teams</span>
                </h2>

                {/* Testimonial card */}
                <div ref={cardRef} className="test-card" style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 24, padding: 'clamp(2rem, 4vw, 3rem)', marginBottom: 32,
                    backdropFilter: 'blur(12px)',
                }}>
                    {/* Metric badge */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '4px 14px', borderRadius: 999, marginBottom: 24,
                        background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.15)',
                    }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /></svg>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#FF8533', fontWeight: 700 }}>{current.metric}</span>
                    </div>

                    <blockquote style={{
                        fontFamily: 'var(--font-body)', fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                        color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, fontStyle: 'normal',
                        marginBottom: 32, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto',
                    }}>
                        &ldquo;{current.quote}&rdquo;
                    </blockquote>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                        <div style={{
                            width: 44, height: 44, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #FF6B00, #FF8533)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 15, color: '#fff',
                            boxShadow: '0 4px 16px rgba(255,107,0,0.3)',
                        }}>
                            {current.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 15, color: '#FAFAFA', margin: 0 }}>
                                {current.name}
                            </p>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-dark-muted)', margin: 0 }}>
                                {current.title} at <span style={{ color: '#FF6B00' }}>{current.company}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Dot navigation */}
                <div className="test-dots" style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 56 }}>
                    {testimonials.map((_, i) => (
                        <button key={i} onClick={() => goTo(i)} aria-label={`Testimonial ${i + 1}`}
                            style={{
                                width: i === active ? 28 : 8, height: 8, borderRadius: 999, border: 'none',
                                background: i === active ? '#FF6B00' : 'rgba(255,255,255,0.12)',
                                cursor: 'pointer', transition: 'all 0.3s var(--ease-spring)', padding: 0,
                                boxShadow: i === active ? '0 0 12px rgba(255,107,0,0.4)' : 'none',
                            }}
                        />
                    ))}
                </div>

                {/* Company logos */}
                <div className="test-logos">
                    <p style={{
                        fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-dark-muted)',
                        textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 20,
                    }}>Trusted by innovative teams</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(1.5rem, 4vw, 3rem)' }}>
                        {companyLogos.map((logo) => (
                            <span key={logo} style={{
                                fontFamily: 'var(--font-heading)', fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                                fontWeight: 600, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.03em',
                                transition: 'color 0.3s ease', cursor: 'default',
                            }}
                                onMouseEnter={(e) => { (e.target as HTMLSpanElement).style.color = 'rgba(255,255,255,0.6)'; }}
                                onMouseLeave={(e) => { (e.target as HTMLSpanElement).style.color = 'rgba(255,255,255,0.2)'; }}
                            >
                                {logo}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
