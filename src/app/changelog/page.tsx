'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header, Footer } from '@/components';

gsap.registerPlugin(ScrollTrigger);

const releases = [
    {
        date: 'January 20, 2026', version: 'v2.0.0', title: 'The Agentic Era', isLatest: true,
        items: ['Introduced autonomous AI agents for complex workflows', 'New dark mode dashboard interface', 'Added integrations with Linear and Notion', '3D agent constellation in hero section', 'Complete website redesign with hybrid theme'],
    },
    {
        date: 'December 15, 2025', version: 'v1.5.0', title: 'Performance Boost', isLatest: false,
        items: ['50% faster query processing', 'Mobile responsiveness improvements', 'New integrations: Calendly, Supabase, Airtable'],
    },
    {
        date: 'November 1, 2025', version: 'v1.4.0', title: 'Multi-Channel Launch', isLatest: false,
        items: ['Multi-channel campaign orchestration', 'Google Ads and Meta Ads connectors', 'Real-time performance dashboard'],
    },
    {
        date: 'September 10, 2025', version: 'v1.3.0', title: 'AI Search Optimization', isLatest: false,
        items: ['AI search engine optimization module', 'Structured data generation', 'Content gap analysis tooling'],
    },
];

export default function ChangelogPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const heroInnerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo('.cl-hero-version', { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, delay: 0.2 });
        gsap.fromTo('.cl-hero-heading', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power4.out' });
        gsap.fromTo('.cl-hero-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.6 });

        gsap.fromTo('.cl-release', { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.cl-timeline', start: 'top 85%' } });

        /* ── Hero 3D perspective scroll ── */
        if (heroInnerRef.current) {
            gsap.to(heroInnerRef.current, {
                y: 80,
                scale: 0.92,
                rotateX: -5,
                opacity: 0.6,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroInnerRef.current.parentElement,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }
    }, { scope: pageRef });

    return (
        <div ref={pageRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />

            {/* ═══ HERO — Light (left-aligned with version badge) ═══ */}
            <section className="light-section" style={{ paddingTop: 160, paddingBottom: 60, background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden', perspective: 1200 }}>
                <div ref={heroInnerRef} style={{ transformOrigin: 'center top' }}>
                {/* Grid background */}
                <div aria-hidden="true" style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: 'linear-gradient(to right, rgba(15,23,42,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.07) 1px, transparent 1px)',
                    backgroundSize: '56px 56px',
                    maskImage: 'radial-gradient(ellipse 80% 85% at 50% 40%, black 0%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 85% at 50% 40%, black 0%, transparent 70%)',
                }} />
                <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: '10%', width: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(255,107,0,0.25) 0%, rgba(255,107,0,0.5) 50%, transparent 100%)' }} />
                <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: '25%', width: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(255,107,0,0.15) 0%, rgba(255,107,0,0.25) 50%, transparent 100%)' }} />
                <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, right: '25%', width: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.25) 50%, transparent 100%)' }} />
                <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, right: '10%', width: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.5) 50%, transparent 100%)' }} />
                <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: '38%', height: 1, pointerEvents: 'none', background: 'linear-gradient(to right, transparent 0%, rgba(255,107,0,0.3) 30%, rgba(139,92,246,0.3) 70%, transparent 100%)' }} />

                <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <div className="cl-hero-version" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 18px', borderRadius: 999, marginBottom: 28, background: 'var(--bg-white)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px rgba(16,185,129,0.5)' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Latest: v2.0.0</span>
                    </div>

                    <h1 className="cl-hero-heading" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: 16 }}>
                        What&apos;s <span style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #FF8533 40%, #F59E0B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>new</span>
                    </h1>

                    <p className="cl-hero-sub" style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
                        Product updates, new features, and improvements.
                    </p>
                </div>
                </div>
            </section>

            {/* ═══ Timeline — Light ═══ */}
            <main style={{ flex: 1, padding: '80px 24px 100px', background: 'var(--bg-surface)' }}>
                <div className="cl-timeline" style={{ maxWidth: 700, margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        {releases.map((release, i) => (
                            <div key={i} className="cl-release" style={{ position: 'relative', borderLeft: '2px solid var(--border)', paddingLeft: 32, paddingBottom: i < releases.length - 1 ? 48 : 0 }}>
                                {/* Dot */}
                                <span style={{
                                    position: 'absolute', left: -6, top: 8, width: 10, height: 10, borderRadius: '50%',
                                    background: release.isLatest ? '#FF6B00' : 'var(--border)',
                                    boxShadow: release.isLatest ? '0 0 12px rgba(255,107,0,0.4)' : 'none',
                                }} />

                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{release.date}</span>
                                    {release.isLatest && (
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, color: '#fff', background: '#FF6B00', padding: '2px 8px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Latest</span>
                                    )}
                                </div>

                                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{release.version} — {release.title}</h2>

                                <ul style={{ listStyleType: 'none', padding: 0, margin: '16px 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {release.items.map((item, j) => (
                                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--orange)', flexShrink: 0, marginTop: 8 }} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer
                ctaWords={['We', 'ship', 'fast.', 'Always.']}
                ctaHighlight="Always."
                ctaSubtitle="New features every week. Your feedback drives our roadmap."
            />

            <style>{`
                @media (max-width: 600px) {
                    .cl-release { paddingLeft: 20px !important; }
                }
            `}</style>
        </div>
    );
}
