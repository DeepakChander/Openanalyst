'use client';

import React, { useRef } from 'react';
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
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
    return (
        <div className="test-card" style={{
            flexShrink: 0, width: 380,
            padding: '28px 24px', borderRadius: 14,
            background: '#0A0A0A',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 220,
        }}>
            <p style={{
                fontSize: 15, color: 'rgba(250,249,245,0.85)',
                lineHeight: 1.55, marginBottom: 24,
            }}>
                {t.quote}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={t.avatar} alt={t.name} width={42} height={42}
                    style={{ width: 42, height: 42, borderRadius: '50%', background: '#1a1a1a', border: '2px solid rgba(255,255,255,0.1)' }}
                />
                <div>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 14, color: 'rgba(250,249,245,0.95)', margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: 'rgba(135,132,119,0.8)', margin: 0 }}>{t.title} · {t.company}</p>
                </div>
            </div>
        </div>
    );
}

const Testimonials: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo('.test-label', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } });
        gsap.fromTo('.test-heading', { y: 30, opacity: 0, filter: 'blur(6px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    }, { scope: sectionRef });

    // Duplicate cards for seamless infinite loop
    const cards = [...testimonials, ...testimonials];

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

            {/* Auto-scrolling carousel */}
            <div className="test-carousel-mask" style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                overflow: 'hidden',
            }}>
                <div className="test-carousel-track" style={{
                    display: 'flex', gap: 16,
                    width: 'max-content',
                    paddingTop: 8, paddingBottom: 8,
                }}>
                    {cards.map((t, i) => (
                        <TestimonialCard key={i} t={t} />
                    ))}
                </div>
            </div>

            <style>{`
                .test-carousel-track {
                    animation: testScroll 40s linear infinite;
                }
                .test-carousel-track:hover {
                    animation-play-state: paused;
                }
                @keyframes testScroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .test-card {
                    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease;
                }
                .test-card:hover {
                    transform: translateY(-4px) !important;
                    border-color: rgba(255,107,0,0.3) !important;
                }
                @media (max-width: 480px) {
                    .test-card {
                        width: 300px !important;
                        min-height: 200px !important;
                        padding: 22px 18px !important;
                    }
                }
                @media (max-width: 360px) {
                    .test-card {
                        width: 260px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
