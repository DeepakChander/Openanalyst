'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SI = 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons';

/* ── Integration data in 3 rows ── */
const row1 = [
    { name: 'Gmail', slug: 'gmail', color: '#EA4335' },
    { name: 'Slack', slug: 'slack', color: '#4A154B' },
    { name: 'HubSpot', slug: 'hubspot', color: '#FF7A59' },
    { name: 'Google Analytics', slug: 'googleanalytics', color: '#E37400' },
    { name: 'LinkedIn', slug: 'linkedin', color: '#0A66C2' },
    { name: 'Stripe', slug: 'stripe', color: '#635BFF' },
    { name: 'Notion', slug: 'notion', color: '#000000' },
    { name: 'Google Ads', slug: 'googleads', color: '#4285F4' },
    { name: 'Shopify', slug: 'shopify', color: '#7AB55C' },
];

const row2 = [
    { name: 'Google Drive', slug: 'googledrive', color: '#4285F4' },
    { name: 'WhatsApp', slug: 'whatsapp', color: '#25D366' },
    { name: 'Facebook', slug: 'facebook', color: '#1877F2' },
    { name: 'Airtable', slug: 'airtable', color: '#18BFFF' },
    { name: 'Zoom', slug: 'zoom', color: '#2D8CFF' },
    { name: 'YouTube', slug: 'youtube', color: '#FF0000' },
    { name: 'Google Sheets', slug: 'googlesheets', color: '#0F9D58' },
    { name: 'Meta Ads', slug: 'meta', color: '#0081FB' },
    { name: 'Calendly', slug: 'calendly', color: '#006BFF' },
];

const row3 = [
    { name: 'Google Docs', slug: 'googledocs', color: '#4285F4' },
    { name: 'Supabase', slug: 'supabase', color: '#3ECF8E' },
    { name: 'BigQuery', slug: 'googlebigquery', color: '#4386FA' },
    { name: 'Dropbox', slug: 'dropbox', color: '#0061FF' },
    { name: 'Linear', slug: 'linear', color: '#5E6AD2' },
    { name: 'Google Meet', slug: 'googlemeet', color: '#00897B' },
    { name: 'Outlook', slug: 'microsoftoutlook', color: '#0078D4' },
    { name: 'Google Maps', slug: 'googlemaps', color: '#4285F4' },
    { name: 'Google Calendar', slug: 'googlecalendar', color: '#4285F4' },
];

function MarqueeRow({ items, direction = 'left', speed = 35 }: {
    items: typeof row1; direction?: 'left' | 'right'; speed?: number;
}) {
    const doubled = [...items, ...items];
    return (
        <div style={{
            overflow: 'hidden', width: '100%', position: 'relative',
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}>
            <div className={`intg-marquee ${direction === 'right' ? 'intg-marquee-reverse' : ''}`} style={{
                display: 'flex', gap: 16, width: 'max-content',
                animationDuration: `${speed}s`,
            }}>
                {doubled.map((item, i) => (
                    <div key={i} className="intg-card" style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '12px 20px', borderRadius: 14,
                        background: 'var(--bg-white)',
                        border: '1px solid var(--border)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        whiteSpace: 'nowrap', flexShrink: 0,
                        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                        cursor: 'default',
                    }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                            background: `${item.color}0A`,
                            border: `1px solid ${item.color}15`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <div style={{
                                width: 18, height: 18,
                                backgroundColor: item.color,
                                WebkitMaskImage: `url(${SI}/${item.slug}.svg)`,
                                WebkitMaskSize: 'contain',
                                WebkitMaskRepeat: 'no-repeat',
                                WebkitMaskPosition: 'center',
                                maskImage: `url(${SI}/${item.slug}.svg)`,
                                maskSize: 'contain',
                                maskRepeat: 'no-repeat',
                                maskPosition: 'center',
                            }} />
                        </div>
                        <span style={{
                            fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 600,
                            color: 'var(--text-primary)', letterSpacing: '-0.01em',
                        }}>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

const Integrations: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo('.intg-label', { y: 16, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.5,
            scrollTrigger: { trigger: containerRef.current, start: 'top 82%' },
        });
        gsap.fromTo('.intg-heading', { y: 30, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8,
            scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        });
        gsap.fromTo('.intg-sub', { y: 20, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.6, delay: 0.2,
            scrollTrigger: { trigger: containerRef.current, start: 'top 78%' },
        });
        gsap.fromTo('.intg-row', { opacity: 0, y: 24 }, {
            opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.intg-rows-wrap', start: 'top 85%' },
        });
        gsap.fromTo('.intg-stat-item', { y: 20, opacity: 0 }, {
            y: 0, opacity: 1, stagger: 0.08, duration: 0.5,
            scrollTrigger: { trigger: '.intg-stats-bar', start: 'top 90%' },
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} style={{
            padding: 'clamp(80px, 10vw, 120px) 0',
            background: 'var(--bg-primary)',
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Subtle ambient glow */}
            <div aria-hidden="true" style={{
                position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 800, height: 500, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,107,0,0.03) 0%, transparent 60%)',
                pointerEvents: 'none',
            }} />

            <div ref={containerRef} style={{ position: 'relative' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 56, padding: '0 24px' }}>
                    <div className="intg-label" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '6px 16px', borderRadius: 999, marginBottom: 20,
                        border: '1px solid var(--border-orange)', background: 'var(--orange-50)',
                    }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--orange)', boxShadow: 'var(--orange-glow)' }} />
                        <span className="label-mono" style={{ fontSize: 11 }}>Integrations</span>
                    </div>

                    <h2 className="intg-heading" style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                        fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em',
                        lineHeight: 1.1, marginBottom: 16,
                    }}>
                        Your entire stack, <span className="text-gradient">connected</span>
                    </h2>
                    <p className="intg-sub" style={{
                        fontSize: 'clamp(15px, 1.3vw, 17px)', color: 'var(--text-secondary)',
                        maxWidth: 520, margin: '0 auto', lineHeight: 1.7,
                    }}>
                        27+ native integrations that plug into your workflow in seconds. No complex setup, no code changes.
                    </p>
                </div>

                {/* Marquee rows */}
                <div className="intg-rows-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="intg-row"><MarqueeRow items={row1} direction="left" speed={40} /></div>
                    <div className="intg-row"><MarqueeRow items={row2} direction="right" speed={45} /></div>
                    <div className="intg-row"><MarqueeRow items={row3} direction="left" speed={38} /></div>
                </div>

                {/* Stats bar */}
                <div className="intg-stats-bar" style={{
                    display: 'flex', justifyContent: 'center', gap: 48,
                    marginTop: 56, padding: '0 24px', flexWrap: 'wrap',
                }}>
                    {[
                        { value: '27+', label: 'Integrations' },
                        { value: '< 60s', label: 'Setup Time' },
                        { value: '99.9%', label: 'Uptime' },
                        { value: 'Real-time', label: 'Data Sync' },
                    ].map((s, i) => (
                        <div key={i} className="intg-stat-item" style={{ textAlign: 'center' }}>
                            <div style={{
                                fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 800,
                                color: 'var(--text-primary)', letterSpacing: '-0.02em',
                            }}>{s.value}</div>
                            <div style={{
                                fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
                                color: 'var(--text-muted)', textTransform: 'uppercase',
                                letterSpacing: '0.08em', marginTop: 4,
                            }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .intg-marquee {
                    animation: intgScroll linear infinite;
                }
                .intg-marquee-reverse {
                    animation-name: intgScrollReverse;
                }
                @keyframes intgScroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes intgScrollReverse {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }

                .intg-card:hover {
                    border-color: rgba(255,107,0,0.3) !important;
                    box-shadow: 0 4px 16px rgba(255,107,0,0.08), 0 1px 3px rgba(0,0,0,0.04) !important;
                    transform: translateY(-2px);
                }

                .intg-marquee:hover,
                .intg-marquee-reverse:hover {
                    animation-play-state: paused;
                }

                @media (max-width: 600px) {
                    .intg-card {
                        padding: 10px 14px !important;
                        gap: 8px !important;
                    }
                    .intg-card > div:first-child {
                        width: 28px !important;
                        height: 28px !important;
                    }
                    .intg-card span {
                        font-size: 12px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Integrations;
