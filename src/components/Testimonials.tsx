'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        quote: 'OpenAnalyst transformed our campaign workflow. 3x ROI in the first month — our entire team was blown away.',
        name: 'Sarah Chen', title: 'VP Marketing', company: 'TechFlow',
        avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Sarah&backgroundColor=ff6b00',
    },
    {
        quote: 'The AI agents handle what used to take our team a full week. It\'s like hiring 10 expert marketers overnight.',
        name: 'Marcus Rivera', title: 'Growth Lead', company: 'ScaleUp',
        avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Marcus&backgroundColor=8b5cf6',
    },
    {
        quote: 'Finally, AI marketing that actually delivers. Our engagement rates are through the roof and costs are down 40%.',
        name: 'Emily Watson', title: 'CMO', company: 'DataDrive',
        avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Emily&backgroundColor=10b981',
    },
    {
        quote: 'We replaced 4 separate tools with OpenAnalyst. The ROI speaks for itself — best decision we made this year.',
        name: 'James Park', title: 'Founder', company: 'NextGen Labs',
        avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=James&backgroundColor=f59e0b',
    },
    {
        quote: 'The predictive analytics alone paid for the platform in week one. Our team can\'t imagine going back.',
        name: 'Priya Sharma', title: 'Head of Growth', company: 'Velocity AI',
        avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Priya&backgroundColor=3b82f6',
    },
    {
        quote: 'OpenAnalyst\'s SEO agent found content gaps we missed for years. Organic traffic up 280% in 3 months.',
        name: 'Daniel Okafor', title: 'Content Director', company: 'BrightPath',
        avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Daniel&backgroundColor=ec4899',
    },
    {
        quote: 'Setup took 60 seconds, results started in days. The campaign agent is genuinely smarter than most agencies we\'ve worked with.',
        name: 'Lisa Andersen', title: 'Marketing VP', company: 'NorthStar SaaS',
        avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Lisa&backgroundColor=06b6d4',
    },
];

const Testimonials: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    useGSAP(() => {
        gsap.fromTo('.test-label', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } });
        gsap.fromTo('.test-heading', { y: 30, opacity: 0, filter: 'blur(6px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
        gsap.fromTo('.test-card', { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.test-track', start: 'top 88%' },
        });
    }, { scope: sectionRef });

    // Drag to scroll
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const onDown = (e: PointerEvent) => {
            isDragging.current = true;
            startX.current = e.pageX - track.offsetLeft;
            scrollLeft.current = track.scrollLeft;
            track.style.cursor = 'grabbing';
        };
        const onUp = () => {
            isDragging.current = false;
            track.style.cursor = 'grab';
        };
        const onMove = (e: PointerEvent) => {
            if (!isDragging.current) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            track.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
        };

        track.addEventListener('pointerdown', onDown);
        window.addEventListener('pointerup', onUp);
        track.addEventListener('pointermove', onMove);
        return () => {
            track.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointerup', onUp);
            track.removeEventListener('pointermove', onMove);
        };
    }, []);

    return (
        <section id="testimonials" ref={sectionRef} style={{
            padding: 'clamp(60px, 8vw, 100px) 0',
            background: 'var(--bg-primary)',
            position: 'relative', overflow: 'hidden',
        }}>
            <div style={{ padding: '0 24px' }}>
                <div className="container" style={{ marginBottom: 40 }}>
                    <p className="test-label label-mono" style={{ textAlign: 'center', marginBottom: 12 }}>Testimonials</p>
                    <h2 className="test-heading" style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                        fontWeight: 800, color: '#0A0A0A', letterSpacing: '-0.03em',
                        textAlign: 'center',
                    }}>
                        Trusted by <span className="text-gradient">growth teams</span>
                    </h2>
                </div>
            </div>

            {/* Horizontal carousel */}
            <div className="test-track" ref={trackRef} style={{
                display: 'flex', gap: 16, overflowX: 'auto', overflowY: 'hidden',
                padding: '8px 24px 32px',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                cursor: 'grab',
                scrollbarWidth: 'none',
            }}>
                <div style={{ flexShrink: 0, width: 'max(0px, calc((100vw - 1200px) / 2))' }} />

                {testimonials.map((t, i) => (
                    <div key={i} className="test-card" style={{
                        flexShrink: 0, width: 'clamp(300px, 34vw, 380px)',
                        scrollSnapAlign: 'center',
                        padding: '28px 24px', borderRadius: 14,
                        background: '#0A0A0A',
                        border: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex', flexDirection: 'column',
                        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s ease',
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.borderColor = 'rgba(255,107,0,0.25)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                        }}
                    >
                        {/* Quote */}
                        <p style={{
                            fontSize: 15, color: 'rgba(250,249,245,0.9)',
                            lineHeight: 1.6, marginBottom: 24, flex: 1,
                        }}>
                            {t.quote}
                        </p>

                        {/* Author */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <img
                                src={t.avatar}
                                alt={t.name}
                                width={42} height={42}
                                style={{
                                    width: 42, height: 42, borderRadius: '50%',
                                    background: '#1a1a1a',
                                    border: '2px solid rgba(255,255,255,0.1)',
                                }}
                            />
                            <div>
                                <p style={{
                                    fontFamily: 'var(--font-heading)', fontWeight: 600,
                                    fontSize: 14, color: 'rgba(250,249,245,0.95)', margin: 0,
                                }}>{t.name}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                                    <p style={{ fontSize: 12, color: 'rgba(135,132,119,0.8)', margin: 0 }}>
                                        {t.title}
                                    </p>
                                    <span style={{ fontSize: 12, color: 'rgba(135,132,119,0.4)' }}>·</span>
                                    <p style={{ fontSize: 12, color: 'rgba(135,132,119,0.8)', margin: 0 }}>
                                        {t.company}
                                    </p>
                                </div>
                            </div>
                            {/* LinkedIn-style icon */}
                            <svg width="16" height="16" viewBox="0 0 10 11" fill="none" style={{ marginLeft: 'auto', opacity: 0.2 }}>
                                <path d="M1.498.795v.65c0 .078.032.153.087.209a.296.296 0 00.209.086h6.089L.086 9.537a.296.296 0 000 .417l.46.46a.296.296 0 00.418 0L8.76 2.617v6.09c0 .078.031.153.086.208a.296.296 0 00.209.087h.65a.296.296 0 00.295-.295V.795A.296.296 0 009.705.5H1.793a.296.296 0 00-.295.295z" fill="currentColor" />
                            </svg>
                        </div>
                    </div>
                ))}

                <div style={{ flexShrink: 0, width: 'max(0px, calc((100vw - 1200px) / 2))' }} />
            </div>

            {/* Scroll hint */}
            <div style={{ textAlign: 'center', marginTop: 4 }}>
                <span style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: -2, marginRight: 4 }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    DRAG TO SCROLL
                </span>
            </div>

            <style>{`
                .test-track::-webkit-scrollbar { display: none; }
                .test-card { user-select: none; }
            `}</style>
        </section>
    );
};

export default Testimonials;
