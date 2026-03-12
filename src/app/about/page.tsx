'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header, Footer } from '@/components';
import Magnetic from '@/components/Magnetic';

gsap.registerPlugin(ScrollTrigger);

const values = [
    { title: 'Innovation', desc: 'We push the boundaries of what AI can do for marketing.', icon: '◈', accent: '#3b82f6' },
    { title: 'Simplicity', desc: 'Complex marketing problems deserve elegant, simple solutions.', icon: '◎', accent: '#2ecc71' },
    { title: 'Trust', desc: 'Your data security and campaign integrity are our top priorities.', icon: '◆', accent: '#f59e0b' },
    { title: 'Impact', desc: 'We measure success by the growth we create for our users.', icon: '★', accent: 'var(--primary)' },
];

const milestones = [
    { year: '2024', event: 'Founded', desc: 'OpenAnalyst was born from a vision to democratize AI-powered marketing for every business.' },
    { year: '2024', event: 'First 1,000 users', desc: 'Reached our first major milestone with early adopters from startups and agencies worldwide.' },
    { year: '2025', event: '27 integrations launched', desc: 'Connected to the entire marketing stack — Gmail, Slack, HubSpot, Google Ads, and more.' },
    { year: '2025', event: '10K+ campaigns deployed', desc: 'Our AI agents have planned, launched, and optimized over 10,000 marketing campaigns.' },
];

export default function AboutPage() {
    const pageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.about-hero', {
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        });

        const reveals = gsap.utils.toArray<HTMLElement>('.about-reveal');
        reveals.forEach((el) => {
            gsap.from(el, {
                y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
            });
        });

        // Timeline milestone stagger
        const milestoneEls = gsap.utils.toArray<HTMLElement>('.timeline-milestone');
        gsap.from(milestoneEls, {
            x: -40, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.timeline-section', start: 'top 80%', toggleActions: 'play none none reverse' }
        });

        // Timeline line draw
        gsap.fromTo('.timeline-line-fill', {
            scaleY: 0,
        }, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.timeline-section',
                start: 'top 75%',
                end: 'bottom 60%',
                scrub: 1,
            }
        });

        // Value cards stagger
        const valueCards = gsap.utils.toArray<HTMLElement>('.value-card');
        gsap.from(valueCards, {
            y: 30, opacity: 0, scale: 0.95, stagger: 0.1, duration: 0.5, ease: 'back.out(1.2)',
            scrollTrigger: { trigger: '.values-grid', start: 'top 85%', toggleActions: 'play none none reverse' }
        });
    }, { scope: pageRef });

    return (
        <div ref={pageRef} style={{ minHeight: '100vh', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
            <Header />
            <main style={{ paddingTop: '120px', paddingBottom: '80px' }}>
                {/* Hero with gradient mesh background */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                    {/* Gradient mesh */}
                    <div style={{
                        position: 'absolute', inset: '-20%',
                        background: `
                            radial-gradient(ellipse 50% 40% at 30% 40%, rgba(204,122,96,0.08) 0%, transparent 60%),
                            radial-gradient(ellipse 40% 50% at 70% 50%, rgba(168,93,69,0.06) 0%, transparent 60%)
                        `,
                        pointerEvents: 'none',
                    }} />

                    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>
                        {/* Hero */}
                        <div className="about-hero" style={{ marginBottom: '60px' }}>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--syntax-comment)', marginBottom: '16px' }}>
                                {'// ABOUT'}
                            </p>
                            <h1 style={{
                                fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800,
                                lineHeight: 1.1, marginBottom: '24px',
                            }}>
                                Revolutionizing <span className="text-gradient">AI Marketing</span>
                            </h1>
                            <p style={{ fontSize: '1.2rem', color: 'var(--muted)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '600px' }}>
                                OpenAnalyst was born from a simple idea: marketing should be intelligent, automated, and accessible for every business, not just enterprises with massive budgets.
                            </p>
                        </div>

                        {/* Mission & Vision - Asymmetric Cards */}
                        <div className="about-reveal" style={{
                            display: 'grid', gridTemplateColumns: '2fr 1fr',
                            gap: '16px', marginBottom: '80px',
                        }}>
                            {/* Mission — wider */}
                            <div style={{
                                padding: '32px',
                                borderRadius: '20px',
                                backgroundColor: 'var(--terminal-bg)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                position: 'relative',
                                overflow: 'hidden',
                            }}>
                                <div style={{
                                    position: 'absolute', top: '-40px', right: '-40px', width: '150px', height: '150px',
                                    background: 'radial-gradient(circle, rgba(204,122,96,0.1) 0%, transparent 70%)',
                                    borderRadius: '50%', pointerEvents: 'none',
                                }} />
                                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--syntax-comment)', marginBottom: '12px' }}>
                                    {'/** @description Our mission */'}
                                </p>
                                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>
                                    Our Mission
                                </h3>
                                <p style={{ fontSize: '15px', color: '#a89890', lineHeight: 1.8 }}>
                                    To democratize marketing excellence through AI agents that act as your expert marketing team, available 24/7. We believe every business deserves world-class marketing capabilities.
                                </p>
                            </div>

                            {/* Vision — animated border */}
                            <div className="glow-border" style={{
                                padding: '32px',
                                borderRadius: '20px',
                                backgroundColor: 'var(--terminal-bg)',
                                position: 'relative',
                                overflow: 'hidden',
                            }}>
                                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--syntax-comment)', marginBottom: '12px' }}>
                                    {'/** @description Our vision */'}
                                </p>
                                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>
                                    Our Vision
                                </h3>
                                <p style={{ fontSize: '14px', color: '#a89890', lineHeight: 1.8 }}>
                                    A world where every business has access to world-class marketing, powered by AI agents that learn, adapt, and optimize in real-time.
                                </p>
                            </div>
                        </div>

                        {/* Timeline Section */}
                        <div className="timeline-section about-reveal" style={{ marginBottom: '80px' }}>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700,
                                color: 'var(--foreground)', marginBottom: '40px',
                            }}>
                                Our Journey
                            </h2>

                            <div style={{ position: 'relative', paddingLeft: '48px' }}>
                                {/* Vertical timeline line */}
                                <div style={{
                                    position: 'absolute', left: '15px', top: '8px', bottom: '8px',
                                    width: '2px', background: 'var(--border)',
                                }}>
                                    <div className="timeline-line-fill" style={{
                                        width: '100%', height: '100%',
                                        background: 'linear-gradient(to bottom, var(--primary), var(--primary-light))',
                                        transformOrigin: 'top center',
                                    }} />
                                </div>

                                {milestones.map((milestone, i) => (
                                    <div key={i} className="timeline-milestone" style={{
                                        marginBottom: i < milestones.length - 1 ? '40px' : 0,
                                        position: 'relative',
                                    }}>
                                        {/* Year badge */}
                                        <div style={{
                                            position: 'absolute',
                                            left: '-48px',
                                            top: '4px',
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 2,
                                        }}>
                                            <span style={{
                                                width: '10px', height: '10px', borderRadius: '50%',
                                                backgroundColor: '#ffffff',
                                            }} />
                                        </div>

                                        <div style={{
                                            padding: '20px 24px',
                                            borderRadius: '14px',
                                            backgroundColor: 'var(--surface)',
                                            border: '1px solid var(--border)',
                                            transition: 'all 0.3s ease',
                                        }}
                                            onMouseEnter={(e) => {
                                                (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)';
                                                (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                                                (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                                <span style={{
                                                    fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                                                    padding: '3px 10px', borderRadius: '9999px',
                                                    backgroundColor: 'rgba(204,122,96,0.1)', color: 'var(--primary)',
                                                }}>
                                                    {milestone.year}
                                                </span>
                                                <h4 style={{
                                                    fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700,
                                                    color: 'var(--foreground)',
                                                }}>
                                                    {milestone.event}
                                                </h4>
                                            </div>
                                            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
                                                {milestone.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Values */}
                        <div className="about-reveal">
                            <h2 style={{
                                fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700,
                                color: 'var(--foreground)', marginBottom: '24px',
                            }}>
                                Our Values
                            </h2>
                            <div className="values-grid" style={{
                                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                gap: '16px',
                            }}>
                                {values.map((value) => (
                                    <div key={value.title} className="value-card" style={{
                                        padding: '28px 24px',
                                        borderRadius: '16px',
                                        backgroundColor: 'var(--surface)',
                                        border: '1px solid var(--border)',
                                        transition: 'all 0.4s ease',
                                        cursor: 'default',
                                    }}
                                        onMouseEnter={(e) => {
                                            const el = e.currentTarget as HTMLElement;
                                            el.style.borderColor = value.accent;
                                            el.style.transform = 'translateY(-4px) scale(1.02)';
                                            el.style.boxShadow = `0 8px 24px ${value.accent}15`;
                                        }}
                                        onMouseLeave={(e) => {
                                            const el = e.currentTarget as HTMLElement;
                                            el.style.borderColor = 'var(--border)';
                                            el.style.transform = 'translateY(0) scale(1)';
                                            el.style.boxShadow = 'none';
                                        }}
                                    >
                                        <div style={{
                                            fontSize: '24px', marginBottom: '12px', color: value.accent,
                                        }}>
                                            {value.icon}
                                        </div>
                                        <h4 style={{
                                            fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px',
                                            color: value.accent, fontFamily: 'var(--font-heading)',
                                        }}>
                                            {value.title}
                                        </h4>
                                        <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                                            {value.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div style={{ textAlign: 'center', marginTop: '80px' }}>
                            <Magnetic>
                                <a href="https://app.openanalyst.com" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    padding: '16px 36px', fontSize: '15px', fontFamily: 'var(--font-mono)', fontWeight: 600,
                                    color: '#ffffff', backgroundColor: 'var(--primary)', borderRadius: '9999px',
                                    textDecoration: 'none', transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 20px rgba(204, 122, 96, 0.3)',
                                }}>
                                    <span style={{ color: 'var(--cmd-prefix)', fontSize: '12px' }}>$</span>
                                    get_started
                                </a>
                            </Magnetic>
                        </div>
                    </div>
                </div>

                <style>{`
                    @media (max-width: 640px) {
                        .about-reveal > div:first-child {
                            grid-template-columns: 1fr !important;
                        }
                    }
                `}</style>
            </main>
            <Footer />
        </div>
    );
}
