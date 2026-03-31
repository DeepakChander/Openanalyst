'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ═══ Realistic Dashboard Screen ═══ */
function DashboardScreen() {
    const [loaded, setLoaded] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [agentIdx, setAgentIdx] = useState(0);

    useEffect(() => { setTimeout(() => setLoaded(true), 400); }, []);

    /* Cycle through agents in the sidebar */
    useEffect(() => {
        if (!loaded) return;
        const t = setInterval(() => setAgentIdx(p => (p + 1) % 6), 2800);
        return () => clearInterval(t);
    }, [loaded]);

    /* Animate chart bars */
    useEffect(() => {
        if (!loaded || !ref.current) return;
        ref.current.querySelectorAll('.ps-bar').forEach((bar, i) => {
            const h = [24, 32, 28, 38, 35, 44, 40, 52, 48, 58, 62, 72, 68, 80, 76, 88, 84, 96];
            (bar as HTMLElement).style.height = `${h[i]}%`;
        });
    }, [loaded]);

    const sidebarItems = [
        { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Dashboard', active: true },
        { icon: 'M13 10V3L4 14h7v7l9-11h-7z', label: 'Campaigns' },
        { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', label: 'Audiences' },
        { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'Analytics' },
        { icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', label: 'Settings' },
    ];

    const agents = [
        { name: 'Content Writer', status: 'Running', color: '#10B981', task: 'Generating blog post for Q2 launch...' },
        { name: 'SEO Optimizer', status: 'Running', color: '#10B981', task: 'Analyzing keyword density on 12 pages...' },
        { name: 'Email Agent', status: 'Queued', color: '#F59E0B', task: 'Preparing drip sequence for 2.4K list...' },
        { name: 'Ad Optimizer', status: 'Running', color: '#10B981', task: 'Reallocating $1.2K budget to top ads...' },
        { name: 'Social Scheduler', status: 'Running', color: '#10B981', task: 'Scheduling 8 posts across 3 channels...' },
        { name: 'Lead Scorer', status: 'Complete', color: '#8B5CF6', task: 'Scored 340 leads — 28 marked hot...' },
    ];

    const activities = [
        { icon: '✉', title: 'Email campaign sent', sub: '2,400 recipients • 42% open rate', time: '2m ago', color: '#FF6B00' },
        { icon: '✓', title: 'A/B test completed', sub: 'Variant B won — 18% higher CTR', time: '8m ago', color: '#10B981' },
        { icon: '⚡', title: 'Budget auto-optimized', sub: 'Shifted $420 to Google Ads', time: '14m ago', color: '#8B5CF6' },
        { icon: '📊', title: 'Weekly report generated', sub: 'ROI up 28% week-over-week', time: '1h ago', color: '#F59E0B' },
    ];

    return (
        <div ref={ref} style={{
            width: '100%', height: '100%', background: '#0C0D12',
            display: 'flex', overflow: 'hidden', fontFamily: 'var(--font-body)',
        }}>
            {/* ── Sidebar ── */}
            <div className="ps-sidebar" style={{
                width: 52, background: '#08090D', borderRight: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                paddingTop: 12, gap: 4, flexShrink: 0,
            }}>
                {/* Logo */}
                <div style={{
                    width: 30, height: 30, borderRadius: 8, marginBottom: 12,
                    background: 'linear-gradient(135deg, #FF6B00, #FF8533)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" /><path d="M12 1v4" /><path d="M12 19v4" />
                        <path d="M4.22 4.22l2.83 2.83" /><path d="M16.95 16.95l2.83 2.83" />
                    </svg>
                </div>

                {sidebarItems.map((item, i) => (
                    <div key={i} style={{
                        width: 36, height: 36, borderRadius: 8,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: item.active ? 'rgba(255,107,0,0.1)' : 'transparent',
                        opacity: loaded ? 1 : 0,
                        transition: `all 0.3s ease ${0.3 + i * 0.05}s`,
                        cursor: 'pointer',
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke={item.active ? '#FF6B00' : 'rgba(255,255,255,0.25)'}
                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d={item.icon} />
                        </svg>
                    </div>
                ))}
            </div>

            {/* ── Main content ── */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                {/* Top bar */}
                <div style={{
                    height: 38, borderBottom: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10,
                    opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease 0.2s',
                }}>
                    <div style={{
                        flex: 1, height: 24, borderRadius: 6,
                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                        display: 'flex', alignItems: 'center', padding: '0 8px', gap: 6,
                    }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                        <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)' }}>Search campaigns, agents, analytics...</span>
                    </div>
                    {/* Notification bell */}
                    <div style={{ position: 'relative' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></svg>
                        <div style={{ position: 'absolute', top: -1, right: -1, width: 5, height: 5, borderRadius: '50%', background: '#FF6B00' }} />
                    </div>
                    {/* Avatar */}
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg, #4285F4, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 8, fontWeight: 700, color: 'white' }}>D</span>
                    </div>
                </div>

                {/* Content area */}
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

                    {/* Left — Dashboard */}
                    <div style={{ flex: 1, padding: '14px 16px', overflow: 'hidden' }}>
                        {/* Header */}
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            marginBottom: 12, opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease 0.3s',
                        }}>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: '#FAFAFA', fontFamily: 'var(--font-heading)' }}>Dashboard</div>
                                <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', marginTop: 1 }}>Last updated: just now</div>
                            </div>
                            <div style={{
                                padding: '3px 8px', borderRadius: 4, fontSize: 7,
                                background: 'rgba(16,185,129,0.1)', color: '#10B981',
                                fontFamily: 'var(--font-mono)', fontWeight: 600,
                                display: 'flex', alignItems: 'center', gap: 3,
                            }}>
                                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#10B981', animation: 'psDotPulse 2s ease infinite' }} />
                                LIVE
                            </div>
                        </div>

                        {/* Stats row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 14 }}>
                            {[
                                { l: 'CAMPAIGNS', v: '24', ch: '+12%', c: '#FF6B00' },
                                { l: 'LEADS', v: '1.2K', ch: '+34%', c: '#8B5CF6' },
                                { l: 'ROI', v: '340%', ch: '+28%', c: '#10B981' },
                                { l: 'AGENTS', v: '42', ch: 'active', c: '#F59E0B' },
                            ].map((s, i) => (
                                <div key={i} style={{
                                    padding: '8px 10px', borderRadius: 8,
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(6px)',
                                    transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.08}s`,
                                }}>
                                    <div style={{ fontSize: 6, fontWeight: 600, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: 2 }}>{s.l}</div>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                                        <span style={{ fontSize: 16, fontWeight: 800, color: '#FAFAFA', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>{s.v}</span>
                                        <span style={{ fontSize: 7, fontWeight: 600, color: s.c }}>{s.ch}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chart with Y-axis labels */}
                        <div style={{
                            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: 8, padding: '10px 10px 8px', marginBottom: 12,
                            opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease 0.7s',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span style={{ fontSize: 8, fontWeight: 600, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>REVENUE TREND</span>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    {['7D', '30D', '90D'].map((p, i) => (
                                        <span key={i} style={{
                                            fontSize: 6, padding: '2px 5px', borderRadius: 3,
                                            background: i === 1 ? 'rgba(255,107,0,0.15)' : 'transparent',
                                            color: i === 1 ? '#FF6B00' : 'rgba(255,255,255,0.2)',
                                            fontFamily: 'var(--font-mono)', fontWeight: 600, cursor: 'pointer',
                                        }}>{p}</span>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 2 }}>
                                {/* Y-axis labels */}
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 12 }}>
                                    {['$50K', '$25K', '$0'].map(l => (
                                        <span key={l} style={{ fontSize: 5, color: 'rgba(255,255,255,0.15)', fontFamily: 'var(--font-mono)', textAlign: 'right', width: 22 }}>{l}</span>
                                    ))}
                                </div>
                                <div style={{ flex: 1, height: 70, display: 'flex', alignItems: 'flex-end', gap: 2 }}>
                                    {Array.from({ length: 18 }).map((_, i) => (
                                        <div key={i} className="ps-bar" style={{
                                            flex: 1, borderRadius: '2px 2px 0 0', height: 0,
                                            background: i >= 15
                                                ? 'linear-gradient(180deg, #FF6B00, #FF8533)'
                                                : i >= 12
                                                    ? 'linear-gradient(180deg, rgba(255,107,0,0.6), rgba(255,107,0,0.35))'
                                                    : i >= 8
                                                        ? 'linear-gradient(180deg, rgba(255,107,0,0.3), rgba(255,107,0,0.12))'
                                                        : 'rgba(255,107,0,0.08)',
                                            transition: `height 0.8s cubic-bezier(0.16,1,0.3,1) ${0.8 + i * 0.04}s`,
                                        }} />
                                    ))}
                                </div>
                            </div>
                            {/* X-axis */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, paddingLeft: 24 }}>
                                {['Mar 1', 'Mar 8', 'Mar 15', 'Mar 22', 'Mar 29'].map(d => (
                                    <span key={d} style={{ fontSize: 5, color: 'rgba(255,255,255,0.12)', fontFamily: 'var(--font-mono)' }}>{d}</span>
                                ))}
                            </div>
                        </div>

                        {/* Activity feed */}
                        <div style={{
                            opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease 1s',
                        }}>
                            <span style={{ fontSize: 7, fontWeight: 600, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>RECENT ACTIVITY</span>
                            {activities.map((a, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0',
                                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                                }}>
                                    <div style={{
                                        width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                                        background: `${a.color}12`, border: `1px solid ${a.color}20`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 8,
                                    }}>{a.icon}</div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 8, fontWeight: 600, color: '#FAFAFA', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.title}</div>
                                        <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)' }}>{a.sub}</div>
                                    </div>
                                    <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.15)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', flexShrink: 0 }}>{a.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Agent panel */}
                    <div className="ps-agent-panel" style={{
                        width: 180, borderLeft: '1px solid rgba(255,255,255,0.06)',
                        padding: '12px 10px', overflow: 'hidden', flexShrink: 0,
                        opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease 0.5s',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                            <span style={{ fontSize: 8, fontWeight: 700, color: '#FAFAFA', fontFamily: 'var(--font-heading)' }}>AI Agents</span>
                            <span style={{
                                fontSize: 6, padding: '2px 5px', borderRadius: 3,
                                background: 'rgba(255,107,0,0.1)', color: '#FF6B00',
                                fontFamily: 'var(--font-mono)', fontWeight: 700,
                            }}>42 active</span>
                        </div>

                        {agents.map((agent, i) => (
                            <div key={i} style={{
                                padding: '6px 8px', borderRadius: 6, marginBottom: 4,
                                background: agentIdx === i ? 'rgba(255,255,255,0.04)' : 'transparent',
                                border: `1px solid ${agentIdx === i ? 'rgba(255,255,255,0.08)' : 'transparent'}`,
                                transition: 'all 0.4s ease',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
                                    <span style={{
                                        width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
                                        background: agent.color,
                                        boxShadow: agent.status === 'Running' ? `0 0 6px ${agent.color}60` : 'none',
                                        animation: agent.status === 'Running' && agentIdx === i ? 'psDotPulse 1.5s ease infinite' : 'none',
                                    }} />
                                    <span style={{ fontSize: 7, fontWeight: 600, color: agentIdx === i ? '#FAFAFA' : 'rgba(255,255,255,0.5)' }}>{agent.name}</span>
                                </div>
                                <div style={{
                                    fontSize: 6, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)',
                                    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                                    opacity: agentIdx === i ? 1 : 0.5,
                                    transition: 'opacity 0.4s ease',
                                }}>{agent.task}</div>
                                {/* Progress bar for active agent */}
                                {agentIdx === i && agent.status === 'Running' && (
                                    <div style={{ marginTop: 3, height: 2, borderRadius: 1, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                                        <div style={{
                                            height: '100%', borderRadius: 1, background: agent.color,
                                            animation: 'psProgress 2.5s ease-in-out infinite',
                                        }} />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Terminal-like output */}
                        <div style={{
                            marginTop: 8, padding: '6px 8px', borderRadius: 6,
                            background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.04)',
                        }}>
                            <div style={{ fontSize: 6, fontWeight: 600, color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginBottom: 4 }}>CONSOLE</div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 6, lineHeight: 1.6 }}>
                                <div style={{ color: 'rgba(16,185,129,0.7)' }}>&gt; agent.content_writer.run()</div>
                                <div style={{ color: 'rgba(255,255,255,0.2)' }}>  Generating blog post...</div>
                                <div style={{ color: 'rgba(139,92,246,0.7)' }}>&gt; analytics.sync()</div>
                                <div style={{ color: 'rgba(255,255,255,0.2)' }}>  340 leads scored <span style={{ color: 'rgba(16,185,129,0.6)' }}>✓</span></div>
                                <div className="ps-cursor-line" style={{ color: 'rgba(255,107,0,0.7)' }}>&gt; <span className="ps-blink">_</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══ Main Section ═══ */
const ProductShowcase: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo('.ps-label', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } });
        gsap.fromTo('.ps-heading', { y: 30, opacity: 0, filter: 'blur(6px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });

        gsap.fromTo('.ps-laptop', { rotateX: 20, scale: 0.88, opacity: 0 }, {
            rotateX: 0, scale: 1, opacity: 1, ease: 'none',
            scrollTrigger: { trigger: '.ps-laptop-wrap', start: 'top 85%', end: 'top 40%', scrub: 1 },
        });

        gsap.fromTo('.ps-callout', { opacity: 0, scale: 0.8, y: 10 }, {
            opacity: 1, scale: 1, y: 0, stagger: 0.15, duration: 0.5, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: '.ps-laptop-wrap', start: 'top 50%' },
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="dark-section" style={{
            padding: 'var(--space-section) 24px',
            background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden',
        }}>
            {/* Grid pattern */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.3,
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                maskImage: 'radial-gradient(ellipse 70% 50% at 50% 40%, black 0%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 40%, black 0%, transparent 70%)',
            }} />

            {/* Orange glow */}
            <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: 56 }}>
                    <p className="ps-label label-mono" style={{ color: '#FF8533', marginBottom: 16 }}>Product</p>
                    <h2 className="ps-heading" style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                        fontWeight: 800, color: '#FAFAFA', letterSpacing: '-0.03em',
                    }}>
                        See OpenAnalyst <span className="text-gradient">in action</span>
                    </h2>
                </div>

                {/* Laptop frame with 3D rotation */}
                <div className="ps-laptop-wrap" style={{ perspective: 1200, maxWidth: 920, margin: '0 auto', position: 'relative' }}>
                    <div className="ps-laptop" style={{
                        transformStyle: 'preserve-3d',
                        borderRadius: 16, overflow: 'hidden',
                        boxShadow: '0 60px 120px -30px rgba(255,107,0,0.15), 0 30px 60px -15px rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                        {/* Browser chrome */}
                        <div style={{
                            padding: '7px 14px', background: '#08090D',
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                            display: 'flex', alignItems: 'center',
                        }}>
                            <div style={{ display: 'flex', gap: 5 }}>
                                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57' }} />
                                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E' }} />
                                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840' }} />
                            </div>
                            <div style={{
                                flex: 1, textAlign: 'center', fontSize: 10,
                                color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                            }}>
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                                app.openanalyst.com
                            </div>
                        </div>

                        {/* Dashboard content */}
                        <div style={{ height: 380 }}>
                            <DashboardScreen />
                        </div>
                    </div>

                    {/* Callout labels */}
                    <div className="ps-callout hide-mobile" style={{
                        position: 'absolute', top: '12%', left: '-11%',
                        padding: '8px 14px', borderRadius: 10,
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF6B00', boxShadow: '0 0 8px rgba(255,107,0,0.5)' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#FF8533', fontWeight: 600 }}>42 AI Agents</span>
                    </div>

                    <div className="ps-callout hide-mobile" style={{
                        position: 'absolute', top: '40%', right: '-13%',
                        padding: '8px 14px', borderRadius: 10,
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px rgba(16,185,129,0.5)' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#10B981', fontWeight: 600 }}>Real-time Analytics</span>
                    </div>

                    <div className="ps-callout hide-mobile" style={{
                        position: 'absolute', bottom: '8%', left: '-9%',
                        padding: '8px 14px', borderRadius: 10,
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#8B5CF6', boxShadow: '0 0 8px rgba(139,92,246,0.5)' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8B5CF6', fontWeight: 600 }}>27+ Integrations</span>
                    </div>

                    <div className="ps-callout hide-mobile" style={{
                        position: 'absolute', bottom: '12%', right: '-11%',
                        padding: '8px 14px', borderRadius: 10,
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B', boxShadow: '0 0 8px rgba(245,158,11,0.5)' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#F59E0B', fontWeight: 600 }}>14 Agentic Skills</span>
                    </div>

                    {/* Reflection glow */}
                    <div style={{
                        marginTop: -10, height: 60, borderRadius: '50%',
                        background: 'radial-gradient(ellipse, rgba(255,107,0,0.1) 0%, transparent 70%)',
                        filter: 'blur(20px)', pointerEvents: 'none',
                    }} />
                </div>
            </div>

            <style>{`
                @keyframes psDotPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
                @keyframes psProgress {
                    0% { width: 0%; }
                    50% { width: 80%; }
                    100% { width: 100%; }
                }
                .ps-blink {
                    animation: psBlink 1s step-end infinite;
                }
                @keyframes psBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                @media (max-width: 768px) {
                    .hide-mobile { display: none !important; }
                    .ps-agent-panel { display: none !important; }
                    .ps-sidebar { width: 40px !important; }
                }
            `}</style>
        </section>
    );
};

export default ProductShowcase;
