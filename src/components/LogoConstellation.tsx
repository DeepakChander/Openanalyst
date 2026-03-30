'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ═══ Pattern #5: Integration logo grid — clean, dense, light theme ═══ */

const SI = 'https://cdn.simpleicons.org';

const LOGOS = [
    { name: 'Gmail', icon: `${SI}/gmail/EA4335`, color: '#EA4335' },
    { name: 'Slack', icon: 'https://img.icons8.com/color/96/slack-new.png', color: '#E01E5A' },
    { name: 'HubSpot', icon: `${SI}/hubspot/FF7A59`, color: '#FF7A59' },
    { name: 'Google Ads', icon: `${SI}/googleads/4285F4`, color: '#4285F4' },
    { name: 'Meta', icon: `${SI}/meta/0081FB`, color: '#0081FB' },
    { name: 'LinkedIn', icon: 'https://img.icons8.com/color/96/linkedin.png', color: '#0A66C2' },
    { name: 'Stripe', icon: `${SI}/stripe/635BFF`, color: '#635BFF' },
    { name: 'TikTok', icon: `${SI}/tiktok/000000`, color: '#000000' },
    { name: 'YouTube', icon: `${SI}/youtube/FF0000`, color: '#FF0000' },
    { name: 'Shopify', icon: `${SI}/shopify/7AB55C`, color: '#7AB55C' },
    { name: 'Notion', icon: `${SI}/notion/000000`, color: '#000000' },
    { name: 'Salesforce', icon: `${SI}/salesforce/00A1E0`, color: '#00A1E0' },
    { name: 'Mailchimp', icon: `${SI}/mailchimp/FFE01B`, color: '#FFE01B' },
    { name: 'Airtable', icon: `${SI}/airtable/18BFFF`, color: '#18BFFF' },
    { name: 'Zoom', icon: `${SI}/zoom/0B5CFF`, color: '#0B5CFF' },
    { name: 'WhatsApp', icon: `${SI}/whatsapp/25D366`, color: '#25D366' },
];

const LogoConstellation: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo('.int-label', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } });
        gsap.fromTo('.int-heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
        gsap.fromTo('.int-logo', { y: 20, opacity: 0, scale: 0.9 }, {
            y: 0, opacity: 1, scale: 1, stagger: 0.03, duration: 0.4, ease: 'back.out(1.3)',
            scrollTrigger: { trigger: '.int-grid', start: 'top 88%' },
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} style={{
            padding: 'var(--space-section-sm) 24px',
            background: 'var(--bg-surface)',
            position: 'relative', overflow: 'hidden',
        }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <p className="int-label label-mono" style={{ marginBottom: 12 }}>Integrations</p>
                    <h2 className="int-heading" style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                        fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em',
                    }}>
                        Connects with <span className="text-gradient">your stack</span>
                    </h2>
                </div>

                {/* Dense logo grid — no wasted space */}
                <div className="int-grid" style={{
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
                    gap: 12, maxWidth: 900, margin: '0 auto',
                }}>
                    {LOGOS.map((logo, i) => (
                        <div key={logo.name} className="int-logo" style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '10px 18px', borderRadius: 'var(--radius-full)',
                            background: 'var(--bg-white)',
                            border: '1px solid var(--border)',
                            boxShadow: 'var(--shadow-sm)',
                            transition: 'all 0.3s var(--ease-out)',
                            cursor: 'default',
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = `${logo.color}40`;
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = `0 4px 16px ${logo.color}15`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border)';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                            }}
                        >
                            <img src={logo.icon} alt={logo.name} width={20} height={20} loading="lazy" style={{ width: 20, height: 20, objectFit: 'contain', flexShrink: 0 }} />
                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{logo.name}</span>
                        </div>
                    ))}
                    {/* "+11 more" badge */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '10px 18px', borderRadius: 'var(--radius-full)',
                        background: 'var(--orange-50)',
                        border: '1px solid var(--border-orange)',
                        cursor: 'default',
                    }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--orange)' }}>+11 more</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LogoConstellation;
