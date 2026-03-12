'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header, Footer } from '@/components';
import Magnetic from '@/components/Magnetic';

gsap.registerPlugin(ScrollTrigger);

const SI = 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons';

const integrations = [
    { name: 'Gmail', icon: 'gmail', color: '#EA4335' },
    { name: 'Slack', icon: 'slack', color: '#4A154B' },
    { name: 'HubSpot', icon: 'hubspot', color: '#FF7A59' },
    { name: 'Google Ads', icon: 'googleads', color: '#4285F4' },
    { name: 'LinkedIn', icon: 'linkedin', color: '#0A66C2' },
    { name: 'Stripe', icon: 'stripe', color: '#635BFF' },
    { name: 'Notion', icon: 'notion', color: '#000000' },
    { name: 'Shopify', icon: 'shopify', color: '#96BF48' },
    { name: 'YouTube', icon: 'youtube', color: '#FF0000' },
    { name: 'Facebook', icon: 'facebook', color: '#1877F2' },
    { name: 'Zoom', icon: 'zoom', color: '#2D8CFF' },
    { name: 'Google Sheets', icon: 'googlesheets', color: '#34A853' },
    { name: 'Airtable', icon: 'airtable', color: '#18BFFF' },
    { name: 'Calendly', icon: 'calendly', color: '#006BFF' },
    { name: 'Supabase', icon: 'supabase', color: '#3ECF8E' },
    { name: 'Dropbox', icon: 'dropbox', color: '#0061FF' },
    { name: 'Google Analytics', icon: 'googleanalytics', color: '#E37400' },
    { name: 'WhatsApp', icon: 'whatsapp', color: '#25D366' },
    { name: 'Meta Ads', icon: 'meta', color: '#0081FB' },
    { name: 'Google Drive', icon: 'googledrive', color: '#4285F4' },
    { name: 'Google Calendar', icon: 'googlecalendar', color: '#4285F4' },
    { name: 'Google Docs', icon: 'googledocs', color: '#4285F4' },
    { name: 'Google Meet', icon: 'googlemeet', color: '#00897B' },
    { name: 'Google BigQuery', icon: 'googlebigquery', color: '#669DF6' },
    { name: 'Google Maps', icon: 'googlemaps', color: '#4285F4' },
    { name: 'Linear', icon: 'linear', color: '#5E6AD2' },
    { name: 'Outlook', icon: 'microsoftoutlook', color: '#0078D4' },
];

export default function FeaturesPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const [showAllIntegrations, setShowAllIntegrations] = useState(false);

    useGSAP(() => {
        gsap.from('.features-hero', {
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        });

        const sections = gsap.utils.toArray<HTMLElement>('.feature-section');
        sections.forEach((section) => {
            gsap.from(section, {
                y: 50, opacity: 0, filter: 'blur(4px)', duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none reverse' }
            });
        });

        // Counter animations for dashboard metrics
        const counters = gsap.utils.toArray<HTMLElement>('.feat-counter');
        counters.forEach((counter) => {
            const target = parseFloat(counter.getAttribute('data-target') || '0');
            const isFloat = target % 1 !== 0;
            gsap.fromTo(counter, { innerText: '0' }, {
                innerText: target,
                duration: 2,
                ease: 'power2.out',
                snap: isFloat ? {} : { innerText: 1 },
                scrollTrigger: { trigger: counter, start: 'top 90%', toggleActions: 'play none none reverse' },
                ...(isFloat ? {
                    onUpdate: function () {
                        const val = parseFloat(counter.innerText);
                        counter.innerText = val.toFixed(1);
                    }
                } : {}),
            });
        });

        // Integration cards cascade
        const intCards = gsap.utils.toArray<HTMLElement>('.integration-card');
        gsap.from(intCards, {
            scale: 0.8, opacity: 0, stagger: 0.03, duration: 0.4, ease: 'back.out(1.2)',
            scrollTrigger: { trigger: '.integrations-grid', start: 'top 85%', toggleActions: 'play none none reverse' }
        });
    }, { scope: pageRef });

    const displayedIntegrations = showAllIntegrations ? integrations : integrations.slice(0, 15);

    return (
        <div ref={pageRef} style={{ minHeight: '100vh', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
            <Header />
            <main style={{ paddingTop: '120px' }}>
                {/* Hero */}
                <div className="features-hero" style={{ textAlign: 'center', padding: '40px 20px 80px', maxWidth: '800px', margin: '0 auto' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--syntax-comment)', marginBottom: '16px' }}>
                        {'// FEATURES'}
                    </p>
                    <h1 style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800,
                        lineHeight: 1.1, marginBottom: '20px',
                    }}>
                        Everything Your <span className="text-gradient">AI Agent</span> Can Do
                    </h1>
                    <p style={{ fontSize: '18px', color: 'var(--muted)', maxWidth: '550px', margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
                        Comprehensive marketing capabilities powered by AI agents that plan, create, and optimize.
                    </p>
                </div>

                {/* ========== Section 1: Campaign Intelligence — Dashboard Mockup ========== */}
                <div className="feature-section" style={{ padding: '60px 20px 80px', background: 'var(--background)' }}>
                    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--syntax-comment)', marginBottom: '12px' }}>
                                {'// CAMPAIGN_INTELLIGENCE'}
                            </p>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '12px' }}>
                                Campaign Intelligence
                            </h2>
                            <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '500px', margin: '0 auto', fontFamily: 'var(--font-body)' }}>
                                Orchestrate multi-channel campaigns with AI-powered optimization.
                            </p>
                        </div>

                        {/* Dashboard mockup */}
                        <div style={{
                            borderRadius: '20px',
                            border: '1px solid var(--border)',
                            background: '#ffffff',
                            overflow: 'hidden',
                            boxShadow: '0 20px 60px rgba(26, 18, 16, 0.08)',
                            maxWidth: '900px',
                            margin: '0 auto',
                        }}>
                            {/* Dashboard header bar */}
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                padding: '14px 20px', background: 'var(--surface)',
                                borderBottom: '1px solid var(--border)',
                            }}>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f57' }} />
                                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#febc2e' }} />
                                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#28c840' }} />
                                </div>
                                <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', marginLeft: '8px' }}>Campaign Dashboard</span>
                                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2ecc71' }} />
                                    <span style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>Live</span>
                                </div>
                            </div>

                            {/* Metric cards */}
                            <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                                {[
                                    { label: 'Campaigns Active', value: '12', color: 'var(--primary)', icon: '▲' },
                                    { label: 'ROI', value: '340', suffix: '%', color: '#2ecc71', icon: '◆' },
                                    { label: 'Total Reach', value: '1.2', suffix: 'M', color: '#3b82f6', icon: '●' },
                                    { label: 'Conversion Rate', value: '8.4', suffix: '%', color: '#f59e0b', icon: '★' },
                                ].map((metric) => (
                                    <div key={metric.label} style={{
                                        padding: '20px',
                                        borderRadius: '14px',
                                        backgroundColor: 'var(--surface)',
                                        border: '1px solid var(--border)',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                            <span style={{ color: metric.color, fontSize: '10px' }}>{metric.icon}</span>
                                            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{metric.label}</span>
                                        </div>
                                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: metric.color }}>
                                            <span className="feat-counter" data-target={metric.value}>{metric.value}</span>{metric.suffix || ''}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Feature pills */}
                            <div style={{ padding: '0 24px 24px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {['Multi-channel orchestration', 'A/B testing automation', 'Budget optimization', 'ROI tracking'].map((f) => (
                                    <span key={f} style={{
                                        padding: '6px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: 500,
                                        backgroundColor: 'rgba(204,122,96,0.08)', color: 'var(--primary)',
                                        fontFamily: 'var(--font-mono)',
                                    }}>{f}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========== Section 2: Content Creation — Before/After Split ========== */}
                <div className="feature-section" style={{ padding: '80px 20px', background: 'var(--surface)' }}>
                    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--syntax-comment)', marginBottom: '12px' }}>
                                {'// CONTENT_CREATION'}
                            </p>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '12px' }}>
                                Content Creation
                            </h2>
                            <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '500px', margin: '0 auto', fontFamily: 'var(--font-body)' }}>
                                Generate high-converting content across every format and channel.
                            </p>
                        </div>

                        {/* Before/After Split */}
                        <div style={{
                            display: 'grid', gridTemplateColumns: '1fr 2px 1fr', gap: '0',
                            maxWidth: '900px', margin: '0 auto',
                            borderRadius: '20px', overflow: 'hidden',
                            border: '1px solid var(--border)',
                            boxShadow: '0 12px 40px rgba(26, 18, 16, 0.06)',
                        }}>
                            {/* Before: Raw prompt */}
                            <div style={{ padding: '32px', background: 'var(--terminal-bg)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.08)', color: '#8a7a72', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Input</span>
                                </div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#a89890', lineHeight: 2 }}>
                                    <div><span style={{ color: '#39ff14' }}>$</span> <span style={{ color: '#3b82f6' }}>content</span> generate</div>
                                    <div style={{ paddingLeft: '16px' }}><span style={{ color: '#e5c07b' }}>--type</span> <span style={{ color: '#98c379' }}>&quot;blog&quot;</span></div>
                                    <div style={{ paddingLeft: '16px' }}><span style={{ color: '#e5c07b' }}>--topic</span> <span style={{ color: '#98c379' }}>&quot;AI Marketing&quot;</span></div>
                                    <div style={{ paddingLeft: '16px' }}><span style={{ color: '#e5c07b' }}>--tone</span> <span style={{ color: '#98c379' }}>&quot;professional&quot;</span></div>
                                    <div style={{ paddingLeft: '16px' }}><span style={{ color: '#e5c07b' }}>--length</span> <span style={{ color: '#d19a66' }}>2400</span></div>
                                </div>
                            </div>

                            {/* Divider with animated gradient */}
                            <div style={{
                                background: 'linear-gradient(to bottom, var(--primary), var(--primary-light), var(--primary-dark))',
                                backgroundSize: '100% 200%',
                                animation: 'gradientShift 4s ease infinite',
                            }} />

                            {/* After: Polished output */}
                            <div style={{ padding: '32px', background: '#ffffff' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px', backgroundColor: 'rgba(46,204,113,0.1)', color: '#2ecc71', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Output</span>
                                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>SEO: 94/100</span>
                                </div>
                                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--foreground)', marginBottom: '12px', lineHeight: 1.4 }}>
                                    The Complete Guide to AI-Powered Marketing in 2025
                                </h4>
                                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.8, fontFamily: 'var(--font-body)', marginBottom: '16px' }}>
                                    Artificial intelligence is reshaping how businesses approach marketing. From campaign optimization to content generation, AI agents are enabling marketers to achieve unprecedented scale...
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {['2,400 words', '42 keywords', '8 sections', 'SEO optimized'].map((tag) => (
                                        <span key={tag} style={{ fontSize: '10px', padding: '4px 10px', borderRadius: '9999px', backgroundColor: 'var(--surface)', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
                            {['Blog posts & articles', 'Social media content', 'Ad copy & creatives', 'Email sequences'].map((f) => (
                                <span key={f} style={{
                                    padding: '6px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: 500,
                                    backgroundColor: 'rgba(204,122,96,0.08)', color: 'var(--primary)', fontFamily: 'var(--font-mono)',
                                }}>{f}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ========== Section 3: Analytics & Insights — Live Terminal Dashboard ========== */}
                <div className="feature-section" style={{ padding: '80px 20px', background: 'var(--background)' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--syntax-comment)', marginBottom: '12px' }}>
                                {'// ANALYTICS_INSIGHTS'}
                            </p>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '12px' }}>
                                Analytics & Insights
                            </h2>
                            <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '500px', margin: '0 auto', fontFamily: 'var(--font-body)' }}>
                                Turn raw data into actionable marketing intelligence.
                            </p>
                        </div>

                        {/* Analytics Dashboard Mockup */}
                        <div style={{
                            borderRadius: '20px',
                            border: '1px solid var(--border)',
                            background: 'var(--terminal-bg)',
                            overflow: 'hidden',
                            boxShadow: '0 20px 60px rgba(26, 18, 16, 0.12)',
                            maxWidth: '920px',
                            margin: '0 auto',
                        }}>
                            {/* Terminal header */}
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                padding: '14px 20px',
                                borderBottom: '1px solid rgba(255,255,255,0.06)',
                            }}>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f57' }} />
                                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#febc2e' }} />
                                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#28c840' }} />
                                </div>
                                <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#6b5e58', marginLeft: '8px' }}>~/openanalyst analytics --live</span>
                                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2ecc71', boxShadow: '0 0 6px rgba(46,204,113,0.4)', animation: 'glowPulse 2s ease-in-out infinite' }} />
                                    <span style={{ fontSize: '10px', color: '#6b5e58', fontFamily: 'var(--font-mono)' }}>Streaming</span>
                                </div>
                            </div>

                            {/* Top metrics row */}
                            <div className="analytics-metrics-row" style={{ padding: '20px 24px 0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                                {[
                                    { label: 'SEGMENTS', value: '7', icon: '◎', color: 'var(--primary)', delta: '+2 this week' },
                                    { label: 'DATA SOURCES', value: '12', icon: '◆', color: '#3b82f6', delta: 'All connected' },
                                    { label: 'INSIGHTS', value: '24', icon: '★', color: '#2ecc71', delta: '+8 new today' },
                                    { label: 'ACCURACY', value: '94%', icon: '●', color: '#8b5cf6', delta: '↑ from 89%' },
                                ].map((m) => (
                                    <div key={m.label} style={{
                                        padding: '16px', borderRadius: '12px',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                            <span style={{ color: m.color, fontSize: '10px' }}>{m.icon}</span>
                                            <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#6b5e58', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{m.label}</span>
                                        </div>
                                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: m.color, marginBottom: '4px' }}>
                                            {m.value}
                                        </div>
                                        <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#4a3f3a' }}>{m.delta}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Main content: ASCII chart + live feed side by side */}
                            <div className="analytics-main-grid" style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px' }}>
                                {/* ASCII-style bar chart */}
                                <div style={{
                                    padding: '20px', borderRadius: '12px',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                }}>
                                    <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#6b5e58', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>Channel Performance (last 30d)</span>
                                        <span style={{ color: '#2ecc71', fontSize: '10px' }}>● live</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {[
                                            { channel: 'Email', pct: 87, color: 'var(--primary)' },
                                            { channel: 'Social', pct: 72, color: '#3b82f6' },
                                            { channel: 'Paid Ads', pct: 64, color: '#f59e0b' },
                                            { channel: 'Organic', pct: 58, color: '#2ecc71' },
                                            { channel: 'Referral', pct: 41, color: '#8b5cf6' },
                                        ].map((ch) => (
                                            <div key={ch.channel}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8a7a72' }}>{ch.channel}</span>
                                                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: ch.color, fontWeight: 600 }}>{ch.pct}%</span>
                                                </div>
                                                <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                                                    <div style={{
                                                        height: '100%', width: `${ch.pct}%`, borderRadius: '3px',
                                                        background: ch.color,
                                                        boxShadow: `0 0 8px ${ch.color}40`,
                                                        transition: 'width 1s ease',
                                                    }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Live insight feed */}
                                <div style={{
                                    padding: '20px', borderRadius: '12px',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    display: 'flex', flexDirection: 'column',
                                }}>
                                    <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#6b5e58', marginBottom: '16px' }}>
                                        AI Insights Feed
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                                        {[
                                            { time: '2m ago', text: 'Email open rates up 23% — subject line A/B test winner detected', type: 'success' },
                                            { time: '8m ago', text: 'New audience segment "High-intent Q1" identified (1,247 users)', type: 'info' },
                                            { time: '15m ago', text: 'Competitor launched campaign on LinkedIn — similar keywords', type: 'warning' },
                                            { time: '1h ago', text: 'Budget reallocation suggested: shift 15% from Paid → Organic', type: 'action' },
                                        ].map((insight, i) => (
                                            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                                <span style={{
                                                    width: '6px', height: '6px', borderRadius: '50%', marginTop: '5px', flexShrink: 0,
                                                    backgroundColor: insight.type === 'success' ? '#2ecc71' : insight.type === 'info' ? '#3b82f6' : insight.type === 'warning' ? '#f59e0b' : 'var(--primary)',
                                                    boxShadow: `0 0 6px ${insight.type === 'success' ? 'rgba(46,204,113,0.4)' : insight.type === 'info' ? 'rgba(59,130,246,0.4)' : insight.type === 'warning' ? 'rgba(245,158,11,0.4)' : 'rgba(204,122,96,0.4)'}`,
                                                }} />
                                                <div>
                                                    <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#a89890', lineHeight: 1.5 }}>{insight.text}</div>
                                                    <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#4a3f3a', marginTop: '2px' }}>{insight.time}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom terminal prompt */}
                            <div style={{
                                padding: '12px 24px 16px',
                                borderTop: '1px solid rgba(255,255,255,0.04)',
                            }}>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#4a3f3a' }}>
                                    <span style={{ color: '#39ff14' }}>$</span> <span style={{ color: '#3b82f6' }}>insight</span> <span style={{ color: '#8a7a72' }}>--generate --scope=all-channels</span>
                                    <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--primary)' }}>▋</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
                            {['Customer segmentation', 'Market research', 'Competitor tracking', 'Trend forecasting'].map((f) => (
                                <span key={f} style={{
                                    padding: '6px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: 500,
                                    backgroundColor: 'rgba(204,122,96,0.08)', color: 'var(--primary)', fontFamily: 'var(--font-mono)',
                                }}>{f}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ========== Section 4: Integrations & Automation — Connected Logo Grid ========== */}
                <div className="feature-section" style={{ padding: '80px 20px', background: 'var(--surface)' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--syntax-comment)', marginBottom: '12px' }}>
                                {'// INTEGRATIONS_AUTOMATION'}
                            </p>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '12px' }}>
                                Integrations & Automation
                            </h2>
                            <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '500px', margin: '0 auto', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>
                                Connect your entire marketing stack with 27 MCP integrations.
                            </p>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                padding: '6px 16px', backgroundColor: 'var(--terminal-bg)', borderRadius: '9999px',
                                fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--primary)',
                            }}>
                                <span style={{
                                    width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2ecc71',
                                    boxShadow: '0 0 6px rgba(46,204,113,0.4)',
                                    display: 'inline-block',
                                    animation: 'glowPulse 2s ease-in-out infinite',
                                }} />
                                27 Connected
                            </div>
                        </div>

                        {/* Integration cards grid */}
                        <div className="integrations-grid" style={{
                            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                            gap: '12px', marginBottom: '20px',
                        }}>
                            {displayedIntegrations.map((integration) => (
                                <div key={integration.name} className="integration-card" style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                                    padding: '16px 12px', borderRadius: '12px', textAlign: 'center',
                                    backgroundColor: `${integration.color}10`, border: `1px solid ${integration.color}20`,
                                    transition: 'all 0.3s ease', cursor: 'default',
                                }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                                        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 12px ${integration.color}20`;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                                        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                    }}
                                >
                                    <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img src={`${SI}/${integration.icon}.svg`} alt={integration.name} width="24" height="24" style={{ filter: 'none' }} />
                                    </div>
                                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--foreground)' }}>{integration.name}</span>
                                </div>
                            ))}
                        </div>

                        {integrations.length > 15 && (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button
                                    onClick={() => setShowAllIntegrations(!showAllIntegrations)}
                                    style={{
                                        fontFamily: 'var(--font-mono)', fontSize: '13px', padding: '10px 24px',
                                        borderRadius: '9999px', border: '1px solid var(--border)', backgroundColor: 'transparent',
                                        color: 'var(--muted)', cursor: 'pointer', transition: 'all 0.3s ease',
                                    }}
                                >
                                    {showAllIntegrations ? '$ show --less' : `$ show --all ${integrations.length}`}
                                </button>
                            </div>
                        )}

                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
                            {['27 MCP integrations', 'Workflow automation', 'API access', 'Webhook triggers'].map((f) => (
                                <span key={f} style={{
                                    padding: '6px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: 500,
                                    backgroundColor: 'rgba(204,122,96,0.08)', color: 'var(--primary)', fontFamily: 'var(--font-mono)',
                                }}>{f}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ========== Section 5: AI Models — Comparison Layout ========== */}
                <div className="feature-section" style={{ padding: '80px 20px', background: 'var(--background)' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--syntax-comment)', marginBottom: '12px' }}>
                                {'// AI_MODELS'}
                            </p>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '12px' }}>
                                AI Models
                            </h2>
                            <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '500px', margin: '0 auto', fontFamily: 'var(--font-body)' }}>
                                Multi-model intelligence with free and premium options.
                            </p>
                        </div>

                        {/* Side-by-side comparison */}
                        <div style={{
                            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px',
                            maxWidth: '800px', margin: '0 auto',
                        }}>
                            {/* Free Column */}
                            <div style={{
                                borderRadius: '16px', border: '1px solid var(--border)',
                                backgroundColor: '#ffffff', overflow: 'hidden',
                            }}>
                                <div style={{
                                    padding: '16px 20px', borderBottom: '1px solid var(--border)',
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                }}>
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2ecc71', boxShadow: '0 0 6px rgba(46,204,113,0.3)' }} />
                                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--foreground)' }}>Free Models</span>
                                </div>
                                <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {['Trinity Large Preview', 'Big Pickle', 'MiniMax M2.5', 'GPT-5 Nano', 'Qwen3 Coder'].map((m) => (
                                        <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
                                            <span style={{ color: '#2ecc71' }}>✓</span>
                                            <span style={{ color: 'var(--foreground)' }}>{m}</span>
                                            <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#2ecc71', fontWeight: 700 }}>FREE</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Premium Column */}
                            <div style={{
                                borderRadius: '16px', border: '2px solid var(--primary)',
                                backgroundColor: '#ffffff', overflow: 'hidden',
                                boxShadow: '0 8px 32px rgba(204,122,96,0.12)',
                                position: 'relative',
                            }}>
                                <div style={{
                                    position: 'absolute', top: '0', right: '16px',
                                    backgroundColor: 'var(--primary)', color: '#ffffff', fontSize: '9px',
                                    fontWeight: 700, padding: '4px 12px', borderRadius: '0 0 8px 8px',
                                    textTransform: 'uppercase', letterSpacing: '0.1em',
                                }}>
                                    Best Value
                                </div>
                                <div style={{
                                    padding: '16px 20px', borderBottom: '1px solid var(--border)',
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                }}>
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)', boxShadow: '0 0 6px rgba(204,122,96,0.3)' }} />
                                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--foreground)' }}>Premium Models</span>
                                </div>
                                <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {[
                                        { name: 'OpenAnalyst Max', badge: 'Recommended' },
                                        { name: 'OpenAnalyst Less Beta', badge: null },
                                        { name: 'Claude Opus 4', badge: null },
                                        { name: 'GPT-4 Turbo', badge: null },
                                        { name: 'Claude Sonnet 4', badge: null },
                                    ].map((m) => (
                                        <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
                                            <span style={{ color: 'var(--primary)' }}>★</span>
                                            <span style={{ color: 'var(--foreground)' }}>{m.name}</span>
                                            {m.badge && (
                                                <span style={{
                                                    marginLeft: 'auto', fontSize: '9px', fontWeight: 700, padding: '2px 8px',
                                                    borderRadius: '9999px', background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                                                    color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.05em',
                                                }}>{m.badge}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
                            {['Multi-model routing', 'Free tier models', 'Premium models', 'Provider-backed'].map((f) => (
                                <span key={f} style={{
                                    padding: '6px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: 500,
                                    backgroundColor: 'rgba(204,122,96,0.08)', color: 'var(--primary)', fontFamily: 'var(--font-mono)',
                                }}>{f}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div style={{ padding: '80px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div className="morph-blob" style={{
                        position: 'absolute', width: '400px', height: '400px',
                        background: 'radial-gradient(circle, rgba(204,122,96,0.08) 0%, transparent 70%)',
                        top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none',
                    }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '24px' }}>
                            Ready to deploy your AI agent?
                        </h2>
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

                {/* Responsive */}
                <style>{`
                    @media (max-width: 768px) {
                        .analytics-metrics-row { grid-template-columns: repeat(2, 1fr) !important; }
                        .analytics-main-grid { grid-template-columns: 1fr !important; }
                    }
                    @media (max-width: 480px) {
                        .analytics-metrics-row { grid-template-columns: 1fr !important; }
                    }
                `}</style>
            </main>
            <Footer />
        </div>
    );
}
