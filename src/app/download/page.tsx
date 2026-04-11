'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/* ───── Platform detection ───── */
type Platform = 'windows' | 'mac';

function detectPlatform(): Platform {
    if (typeof navigator === 'undefined') return 'windows';
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('mac')) return 'mac';
    return 'windows';
}

/* ───── Real colored OS logos ───── */
const WindowsLogo = () => (
    <svg width="22" height="22" viewBox="0 0 256 256" fill="none">
        <path d="M0 36.357L104.62 22.11v100.418H0z" fill="#F25022" />
        <path d="M117.58 20.737L256 0v122.528H117.58z" fill="#7FBA00" />
        <path d="M0 133.472l104.62-0.014v100.852L0 219.643z" fill="#00A4EF" />
        <path d="M117.58 133.472H256V256l-138.42-19.264z" fill="#FFB900" />
    </svg>
);

const AppleLogo = () => (
    <svg width="20" height="24" viewBox="0 0 24 24" fill="#333333">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
);

/* ───── Platform data ───── */
const platforms: Record<Platform, {
    label: string;
    icon: React.ReactNode;
    fileName: string;
    size: string;
    requirement: string;
    available: boolean;
    downloadHref: string;
    variants: { label: string; arch: string; size: string }[];
}> = {
    windows: {
        label: 'Windows',
        icon: <WindowsLogo />,
        fileName: 'OpenAnalyst-setup.exe',
        size: '84.2 MB',
        requirement: 'Windows 10 or later (64-bit)',
        available: true,
        downloadHref: '/api/download?platform=windows',
        variants: [],
    },
    mac: {
        label: 'macOS',
        icon: <AppleLogo />,
        fileName: 'OpenAnalyst.dmg',
        size: '91.7 MB',
        requirement: 'macOS 12 Monterey or later',
        available: true,
        downloadHref: '/api/download?platform=mac',
        variants: [],
    },
};

const features = [
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ),
        title: 'Native Performance',
        desc: 'Built with Electron + Rust core. Instant startup, smooth 60fps animations, and 40% lower memory than browser.',
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
            </svg>
        ),
        title: 'Desktop Notifications',
        desc: 'Get instant alerts for campaign milestones, budget thresholds, and agent actions — even when minimized.',
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        title: 'Offline Mode',
        desc: 'Draft campaigns, review analytics snapshots, and queue agent actions — syncs automatically when back online.',
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
        ),
        title: 'Multi-Window Support',
        desc: 'Pin dashboards, agents, and campaigns in separate windows. Drag-and-drop workspace layouts.',
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
        ),
        title: 'Command Palette',
        desc: 'Press Ctrl+K to jump to any campaign, agent, or metric instantly. Keyboard-first navigation throughout.',
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0022 16z" />
                <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                <polyline points="7.5 19.79 7.5 14.6 3 12" /><polyline points="21 12 16.5 14.6 16.5 19.79" />
                <line x1="3.27" y1="6.96" x2="12" y2="12.01" /><line x1="20.73" y1="6.96" x2="12" y2="12.01" />
            </svg>
        ),
        title: 'Deep Integrations',
        desc: 'System tray, file associations, drag-drop imports. OpenAnalyst feels like it belongs on your desktop.',
    },
];

const BRAND = '#FF6B00';

/* ───── Component ───── */

export default function DownloadPage() {
    const [detectedPlatform, setDetectedPlatform] = useState<Platform>('windows');
    const [selectedPlatform, setSelectedPlatform] = useState<Platform>('windows');
    const [showAllVariants, setShowAllVariants] = useState(false);

    useEffect(() => {
        const p = detectPlatform();
        setDetectedPlatform(p);
        setSelectedPlatform(p);
    }, []);

    const current = platforms[selectedPlatform];
    const platformKeys: Platform[] = ['windows', 'mac'];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <Header />

            <main style={{ paddingTop: 'clamp(120px, 15vw, 180px)', paddingBottom: 'clamp(80px, 10vw, 140px)' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

                    {/* ───── Hero Section ───── */}
                    <div style={{ textAlign: 'center', marginBottom: 'clamp(60px, 8vw, 100px)' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '6px 16px', borderRadius: 100,
                            background: 'rgba(16,185,129,0.08)',
                            border: '1px solid rgba(16,185,129,0.15)',
                            marginBottom: 24,
                        }}>
                            <span style={{
                                width: 7, height: 7, borderRadius: '50%',
                                background: '#10B981',
                                boxShadow: '0 0 8px rgba(16,185,129,0.5)',
                                animation: 'dlPulse 2s ease-in-out infinite',
                            }} />
                            <span style={{
                                fontFamily: 'var(--font-mono)', fontSize: 11,
                                fontWeight: 600, color: '#10B981',
                                letterSpacing: '0.06em',
                            }}>v2.4.1 — Latest stable release</span>
                        </div>

                        <h1 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.08,
                            color: 'var(--text-primary)',
                            marginBottom: 16,
                        }}>
                            Download OpenAnalyst
                        </h1>
                        <p style={{
                            fontSize: 'clamp(16px, 1.8vw, 19px)',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.7,
                            maxWidth: 540,
                            margin: '0 auto',
                        }}>
                            The full desktop experience. Native speed, offline access, and system-level integrations your browser can't match.
                        </p>
                    </div>

                    {/* ───── Download Card ───── */}
                    <div style={{
                        maxWidth: 720,
                        margin: '0 auto clamp(80px, 10vw, 120px)',
                        borderRadius: 24,
                        background: 'var(--bg-white)',
                        border: '1px solid var(--border)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 12px 48px rgba(0,0,0,0.06)',
                        overflow: 'hidden',
                    }}>
                        {/* Platform tabs */}
                        <div style={{
                            display: 'flex',
                            borderBottom: '1px solid var(--border)',
                            background: 'var(--bg-surface)',
                        }}>
                            {platformKeys.map((key) => {
                                const p = platforms[key];
                                const isSelected = selectedPlatform === key;
                                const isDetected = detectedPlatform === key;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => { setSelectedPlatform(key); setShowAllVariants(false); }}
                                        style={{
                                            flex: 1,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                            padding: '16px 12px',
                                            fontSize: 13.5, fontWeight: 600,
                                            fontFamily: 'var(--font-body)',
                                            color: isSelected ? BRAND : 'var(--text-muted)',
                                            background: isSelected ? 'var(--bg-white)' : 'transparent',
                                            border: 'none',
                                            borderBottom: isSelected ? `2px solid ${BRAND}` : '2px solid transparent',
                                            cursor: 'pointer',
                                            transition: 'all 0.25s ease',
                                            position: 'relative',
                                        }}
                                    >
                                        <span style={{ display: 'flex', opacity: isSelected ? 1 : 0.5, transition: 'opacity 0.25s' }}>
                                            {p.icon}
                                        </span>
                                        {p.label}
                                        {isDetected && (
                                            <span style={{
                                                fontSize: 9, fontWeight: 700,
                                                fontFamily: 'var(--font-mono)',
                                                padding: '2px 6px', borderRadius: 4,
                                                background: isSelected ? `${BRAND}12` : 'rgba(0,0,0,0.04)',
                                                color: isSelected ? BRAND : 'var(--text-muted)',
                                                letterSpacing: '0.04em',
                                            }}>YOUR OS</span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Download content */}
                        <div style={{ padding: 'clamp(28px, 4vw, 44px)' }}>
                            {current.available ? (
                                <>
                                    {/* Primary download button */}
                                    <a
                                        href={current.downloadHref}
                                        className="dl-primary-btn"
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                                            width: '100%', padding: '18px 24px',
                                            borderRadius: 14,
                                            background: BRAND,
                                            color: '#fff',
                                            fontSize: 16, fontWeight: 700,
                                            fontFamily: 'var(--font-body)',
                                            textDecoration: 'none',
                                            boxShadow: `0 4px 16px rgba(255,107,0,0.25), 0 1px 3px rgba(255,107,0,0.15), inset 0 1px 0 rgba(255,255,255,0.15)`,
                                            transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        Download for {current.label}
                                    </a>

                                    {/* File info */}
                                    <div style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        gap: 16, marginTop: 16, flexWrap: 'wrap',
                                    }}>
                                        <span style={{
                                            fontFamily: 'var(--font-mono)', fontSize: 11,
                                            color: 'var(--text-muted)', letterSpacing: '0.02em',
                                        }}>
                                            {current.fileName}
                                        </span>
                                        <span style={{ width: 1, height: 12, background: 'var(--border)' }} />
                                        <span style={{
                                            fontFamily: 'var(--font-mono)', fontSize: 11,
                                            color: 'var(--text-muted)',
                                        }}>{current.size}</span>
                                        <span style={{ width: 1, height: 12, background: 'var(--border)' }} />
                                        <span style={{
                                            fontSize: 11, color: 'var(--text-muted)',
                                        }}>{current.requirement}</span>
                                    </div>
                                </>
                            ) : (
                                /* Coming soon state */
                                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                    <div style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                                        width: '100%', padding: '18px 24px',
                                        borderRadius: 14,
                                        background: 'var(--bg-surface)',
                                        border: '1.5px dashed var(--border)',
                                        color: 'var(--text-muted)',
                                        fontSize: 16, fontWeight: 700,
                                        fontFamily: 'var(--font-body)',
                                        cursor: 'default',
                                        marginBottom: 16,
                                    }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        {current.label} — Coming Soon
                                    </div>
                                    <p style={{
                                        fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6,
                                        maxWidth: 380, margin: '0 auto',
                                    }}>
                                        The {current.label} build is currently in development.
                                        Use the web app in the meantime — same features, fully synced.
                                    </p>
                                    <a href="https://app.openanalyst.com" style={{
                                        display: 'inline-flex', alignItems: 'center', gap: 6,
                                        marginTop: 16, padding: '10px 22px', borderRadius: 10,
                                        background: BRAND, color: '#fff',
                                        fontSize: 13, fontWeight: 600,
                                        textDecoration: 'none',
                                        boxShadow: `0 2px 8px rgba(255,107,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)`,
                                    }}>
                                        Open Web App
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                    </a>
                                </div>
                            )}

                            {/* Variants toggle — only show if variants exist */}
                            {current.variants.length > 0 && (
                            <div style={{ marginTop: 24 }}>
                                <button
                                    onClick={() => setShowAllVariants(!showAllVariants)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 6,
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        fontSize: 12.5, fontWeight: 600,
                                        color: BRAND, fontFamily: 'var(--font-body)',
                                        padding: 0,
                                    }}
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                                        style={{ transform: showAllVariants ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}>
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                    {showAllVariants ? 'Hide' : 'Show'} all {current.label} variants
                                </button>

                                {showAllVariants && (
                                    <div style={{
                                        marginTop: 14,
                                        display: 'flex', flexDirection: 'column', gap: 8,
                                    }}>
                                        {current.variants.map((v, i) => (
                                            <a key={i} href="#" style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                padding: '12px 16px', borderRadius: 10,
                                                background: 'var(--bg-surface)',
                                                border: '1px solid var(--border)',
                                                textDecoration: 'none',
                                                transition: 'all 0.2s ease',
                                            }}
                                                className="dl-variant-row"
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                                        <polyline points="7 10 12 15 17 10" />
                                                        <line x1="12" y1="15" x2="12" y2="3" />
                                                    </svg>
                                                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{v.label}</span>
                                                    <span style={{
                                                        fontFamily: 'var(--font-mono)', fontSize: 10,
                                                        padding: '2px 6px', borderRadius: 4,
                                                        background: 'rgba(0,0,0,0.04)', color: 'var(--text-muted)',
                                                    }}>{v.arch}</span>
                                                </div>
                                                <span style={{
                                                    fontFamily: 'var(--font-mono)', fontSize: 11,
                                                    color: 'var(--text-muted)',
                                                }}>{v.size}</span>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                            )}

                            {/* Package manager hint */}
                            {selectedPlatform === 'mac' && (
                                <div style={{
                                    marginTop: 20, padding: '14px 18px', borderRadius: 10,
                                    background: 'rgba(15,23,42,0.03)', border: '1px solid var(--border)',
                                }}>
                                    <p style={{
                                        fontFamily: 'var(--font-mono)', fontSize: 12,
                                        color: 'var(--text-muted)', marginBottom: 6,
                                    }}>Install via Homebrew</p>
                                    <code style={{
                                        fontFamily: 'var(--font-mono)', fontSize: 13,
                                        color: 'var(--text-primary)', fontWeight: 600,
                                        display: 'block', padding: '10px 14px',
                                        background: 'var(--bg-white)', borderRadius: 8,
                                        border: '1px solid var(--border)',
                                        userSelect: 'all',
                                    }}>
                                        brew install --cask openanalyst
                                    </code>
                                </div>
                            )}
                            {selectedPlatform === 'windows' && (
                                <div style={{
                                    marginTop: 20, padding: '14px 18px', borderRadius: 10,
                                    background: 'rgba(15,23,42,0.03)', border: '1px solid var(--border)',
                                }}>
                                    <p style={{
                                        fontFamily: 'var(--font-mono)', fontSize: 12,
                                        color: 'var(--text-muted)', marginBottom: 6,
                                    }}>Install via winget</p>
                                    <code style={{
                                        fontFamily: 'var(--font-mono)', fontSize: 13,
                                        color: 'var(--text-primary)', fontWeight: 600,
                                        display: 'block', padding: '10px 14px',
                                        background: 'var(--bg-white)', borderRadius: 8,
                                        border: '1px solid var(--border)',
                                        userSelect: 'all',
                                    }}>
                                        winget install OpenAnalyst.Desktop
                                    </code>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ───── Product Preview ───── */}
                    <div style={{
                        maxWidth: 900,
                        margin: '0 auto clamp(80px, 10vw, 120px)',
                        borderRadius: 20,
                        overflow: 'hidden',
                        border: '1px solid var(--border)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 20px 60px rgba(0,0,0,0.08)',
                        background: '#0F172A',
                        position: 'relative',
                    }}>
                        {/* Mock title bar */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '12px 18px',
                            background: 'rgba(255,255,255,0.04)',
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                        }}>
                            <div style={{ display: 'flex', gap: 6 }}>
                                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
                                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
                                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
                            </div>
                            <span style={{
                                flex: 1, textAlign: 'center',
                                fontFamily: 'var(--font-mono)', fontSize: 11,
                                color: 'rgba(255,255,255,0.35)',
                            }}>OpenAnalyst Desktop — Campaign Dashboard</span>
                        </div>

                        {/* Mock dashboard content */}
                        <div style={{ padding: 'clamp(24px, 4vw, 40px)', minHeight: 320 }}>
                            {/* Top bar */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                                <div>
                                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Active Campaigns</p>
                                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, color: '#fff' }}>12 <span style={{ fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}>running</span></p>
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    {['All', 'Active', 'Paused'].map((tab, i) => (
                                        <span key={tab} style={{
                                            padding: '6px 14px', borderRadius: 8,
                                            fontSize: 12, fontWeight: 600,
                                            background: i === 1 ? `${BRAND}20` : 'rgba(255,255,255,0.04)',
                                            color: i === 1 ? BRAND : 'rgba(255,255,255,0.4)',
                                            border: `1px solid ${i === 1 ? `${BRAND}30` : 'rgba(255,255,255,0.06)'}`,
                                        }}>{tab}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Mini chart bars */}
                            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', height: 100, marginBottom: 28 }}>
                                {[45, 62, 38, 78, 55, 82, 70, 90, 65, 85, 72, 95].map((h, i) => (
                                    <div key={i} style={{
                                        flex: 1, height: `${h}%`, borderRadius: 4,
                                        background: i === 11
                                            ? `linear-gradient(to top, ${BRAND}, #FF8533)`
                                            : `linear-gradient(to top, rgba(255,107,0,${0.08 + i * 0.03}), rgba(255,107,0,${0.15 + i * 0.04}))`,
                                        transition: 'height 0.3s ease',
                                    }} />
                                ))}
                            </div>

                            {/* Stats row */}
                            <div style={{ display: 'flex', gap: 16 }}>
                                {[
                                    { label: 'Impressions', value: '2.4M', change: '+18%', color: '#10B981' },
                                    { label: 'Conversions', value: '12.8K', change: '+24%', color: '#10B981' },
                                    { label: 'ROAS', value: '4.2×', change: '+0.6', color: '#10B981' },
                                    { label: 'Spend', value: '$28.4K', change: '-8%', color: '#10B981' },
                                ].map((stat) => (
                                    <div key={stat.label} style={{
                                        flex: 1, padding: '14px 16px', borderRadius: 12,
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                    }}>
                                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{stat.label}</p>
                                        <p style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{stat.value}</p>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: stat.color, fontWeight: 600 }}>{stat.change}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Command palette hint */}
                        <div style={{
                            position: 'absolute', bottom: 16, right: 20,
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '6px 12px', borderRadius: 8,
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}>
                            <kbd style={{
                                fontFamily: 'var(--font-mono)', fontSize: 10,
                                color: 'rgba(255,255,255,0.5)', fontWeight: 600,
                                padding: '2px 5px', borderRadius: 4,
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.1)',
                            }}>Ctrl</kbd>
                            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>+</span>
                            <kbd style={{
                                fontFamily: 'var(--font-mono)', fontSize: 10,
                                color: 'rgba(255,255,255,0.5)', fontWeight: 600,
                                padding: '2px 5px', borderRadius: 4,
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.1)',
                            }}>K</kbd>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Command Palette</span>
                        </div>
                    </div>

                    {/* ───── Why Desktop ───── */}
                    <div style={{ marginBottom: 'clamp(60px, 8vw, 100px)' }}>
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
                            <p style={{
                                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
                                letterSpacing: '0.14em', textTransform: 'uppercase',
                                color: BRAND, marginBottom: 14,
                            }}>Why Desktop</p>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                                fontWeight: 800, letterSpacing: '-0.03em',
                                color: 'var(--text-primary)',
                            }}>
                                Everything the browser can't do
                            </h2>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: 16,
                        }}>
                            {features.map((feat, i) => (
                                <div key={i} className="dl-feature-card" style={{
                                    padding: 'clamp(24px, 3vw, 32px)',
                                    borderRadius: 18,
                                    background: 'var(--bg-white)',
                                    border: '1px solid var(--border)',
                                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                                }}>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: 12,
                                        background: `${BRAND}08`,
                                        border: `1px solid ${BRAND}15`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: BRAND, marginBottom: 16,
                                    }}>
                                        {feat.icon}
                                    </div>
                                    <h3 style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: 16, fontWeight: 700,
                                        color: 'var(--text-primary)',
                                        marginBottom: 8,
                                    }}>{feat.title}</h3>
                                    <p style={{
                                        fontSize: 13.5, color: 'var(--text-secondary)',
                                        lineHeight: 1.65,
                                    }}>{feat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ───── Also available ───── */}
                    <div style={{
                        textAlign: 'center',
                        padding: 'clamp(40px, 6vw, 64px)',
                        borderRadius: 24,
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border)',
                    }}>
                        <p style={{
                            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
                            letterSpacing: '0.12em', textTransform: 'uppercase',
                            color: 'var(--text-muted)', marginBottom: 16,
                        }}>Prefer the browser?</p>
                        <h3 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                            fontWeight: 800, color: 'var(--text-primary)',
                            marginBottom: 12,
                        }}>OpenAnalyst also runs on the web</h3>
                        <p style={{
                            fontSize: 14, color: 'var(--text-secondary)',
                            lineHeight: 1.7, maxWidth: 440, margin: '0 auto 28px',
                        }}>
                            No installation needed. Same features, same data, fully synced with the desktop app.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                            <a href="https://app.openanalyst.com" style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '14px 28px', borderRadius: 12,
                                background: BRAND, color: '#fff',
                                fontSize: 14, fontWeight: 700,
                                textDecoration: 'none',
                                boxShadow: `0 4px 12px rgba(255,107,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)`,
                                transition: 'all 0.25s ease',
                            }}>
                                Open in Browser
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                            </a>
                            <Link href="/changelog" style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '14px 28px', borderRadius: 12,
                                background: 'var(--bg-white)',
                                border: '1px solid var(--border)',
                                color: 'var(--text-primary)',
                                fontSize: 14, fontWeight: 600,
                                textDecoration: 'none',
                                transition: 'all 0.25s ease',
                            }}>
                                View Changelog
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </Link>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />

            <style>{`
                @keyframes dlPulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(0.85); }
                }
                .dl-primary-btn:hover {
                    transform: translateY(-2px) scale(1.01) !important;
                    box-shadow: 0 6px 24px rgba(255,107,0,0.35), 0 2px 6px rgba(255,107,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15) !important;
                }
                .dl-primary-btn:active {
                    transform: translateY(0) scale(0.99) !important;
                }
                .dl-variant-row:hover {
                    border-color: ${BRAND}30 !important;
                    background: rgba(255,107,0,0.03) !important;
                }
                .dl-feature-card:hover {
                    border-color: ${BRAND}25 !important;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05), 0 0 0 1px ${BRAND}08 !important;
                    transform: translateY(-2px);
                }
                @media (max-width: 640px) {
                    .dl-feature-card {
                        min-width: unset !important;
                    }
                    .dl-features-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}
