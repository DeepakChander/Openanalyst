'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ═══ FULL DASHBOARD MOCKUP — Premium coded UI ═══ */
function DashboardMockup() {
    const [loaded, setLoaded] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => { setTimeout(() => setLoaded(true), 400); }, []);

    useEffect(() => {
        if (!loaded || !ref.current) return;
        ref.current.querySelectorAll('.ps-bar').forEach((bar, i) => {
            const h = [25, 38, 32, 48, 42, 55, 50, 65, 60, 72, 80, 92];
            (bar as HTMLElement).style.height = `${h[i]}%`;
        });
    }, [loaded]);

    return (
        <div ref={ref} style={{
            width: '100%', background: '#0F1117', borderRadius: 16, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
        }}>
            {/* Title bar */}
            <div style={{ padding: '10px 16px', background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 6 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 6, background: 'linear-gradient(135deg, #FF6B00, #FF8533)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#FAFAFA', fontFamily: 'var(--font-heading)' }}>OpenAnalyst</span>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)', fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        Search...
                    </div>
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', padding: '3px 10px', borderRadius: 6, background: '#FF6B00' }}>3 NEW</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', minHeight: 420 }}>
                {/* Sidebar */}
                <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[
                        { n: 'Dashboard', active: true, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
                        { n: 'Campaigns', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg> },
                        { n: 'Agents', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"/></svg> },
                        { n: 'Analytics', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg> },
                        { n: 'Audience', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> },
                        { n: 'Integrations', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/></svg> },
                    ].map((item) => (
                        <div key={item.n} style={{
                            display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8,
                            background: item.active ? 'rgba(255,107,0,0.1)' : 'transparent',
                            color: item.active ? '#FF6B00' : 'rgba(255,255,255,0.4)',
                            fontSize: 12, fontWeight: item.active ? 600 : 400, cursor: 'default',
                            transition: 'all 0.2s ease',
                        }}>
                            {item.icon}
                            {item.n}
                        </div>
                    ))}
                    <div style={{ flex: 1 }} />
                    <div style={{ padding: '8px 10px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', animation: 'statusPulse 2s ease infinite' }} />
                            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>3 agents active</span>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div style={{ padding: '20px 24px' }}>
                    {/* Stat cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
                        {[
                            { label: 'CAMPAIGNS', value: '24', change: '+12%', color: '#FF6B00', chart: 'up' },
                            { label: 'LEADS', value: '1.2K', change: '+34%', color: '#8B5CF6', chart: 'wave' },
                            { label: 'AVG. ROI', value: '340%', change: '+28%', color: '#10B981', chart: 'smooth' },
                        ].map((s, i) => (
                            <div key={i} style={{
                                padding: '16px', borderRadius: 12, background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(12px)',
                                transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.12}s`,
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                    <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>{s.label}</span>
                                    <div style={{ borderTop: `2px solid ${s.color}`, width: 28, borderRadius: 2 }} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                                    <span style={{ fontSize: 28, fontWeight: 800, color: '#FAFAFA', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em', lineHeight: 1 }}>{s.value}</span>
                                    <span style={{ fontSize: 11, fontWeight: 600, color: '#10B981', display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3"><polyline points="18 15 12 9 6 15"/></svg>
                                        {s.change}
                                    </span>
                                </div>
                                {/* Mini chart line */}
                                <svg viewBox="0 0 100 24" style={{ width: '100%', height: 24, marginTop: 8 }} preserveAspectRatio="none">
                                    <path d={s.chart === 'up' ? 'M0 20 Q20 18 35 15 Q50 12 65 14 Q80 10 100 4' : s.chart === 'wave' ? 'M0 14 Q15 20 30 12 Q45 4 60 10 Q75 18 100 8' : 'M0 18 Q25 16 40 14 Q60 12 80 10 Q90 8 100 6'} fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                        ))}
                    </div>

                    {/* Chart area */}
                    <div style={{
                        padding: '20px', borderRadius: 12, background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)', marginBottom: 16,
                        opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease 0.7s',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#FAFAFA' }}>Performance</span>
                            <div style={{ display: 'flex', gap: 4 }}>
                                {['Revenue', 'Clicks', 'Leads'].map((t, i) => (
                                    <span key={t} style={{ fontSize: 10, padding: '3px 10px', borderRadius: 6, background: i === 0 ? 'rgba(255,107,0,0.15)' : 'transparent', color: i === 0 ? '#FF6B00' : 'rgba(255,255,255,0.3)', fontWeight: i === 0 ? 600 : 400 }}>{t}</span>
                                ))}
                            </div>
                        </div>
                        {/* Target line */}
                        <div style={{ position: 'relative', height: 120 }}>
                            <div style={{ position: 'absolute', top: '25%', left: 0, right: 0, height: 1, borderTop: '2px dashed rgba(255,107,0,0.15)' }} />
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: '100%' }}>
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <div key={i} className="ps-bar" style={{
                                        flex: 1, borderRadius: '4px 4px 1px 1px', height: 0,
                                        background: i >= 10 ? 'linear-gradient(180deg, #FF6B00, #FF8533)' : i >= 8 ? 'rgba(255,107,0,0.5)' : 'rgba(255,107,0,0.15)',
                                        transition: `height 1s cubic-bezier(0.16,1,0.3,1) ${0.8 + i * 0.06}s`,
                                        position: 'relative',
                                    }}>
                                        {i === 11 && (
                                            <div style={{
                                                position: 'absolute', top: -26, left: '50%', transform: 'translateX(-50%)',
                                                background: '#FAFAFA', color: '#0F172A', padding: '2px 8px', borderRadius: 4,
                                                fontSize: 9, fontWeight: 700, fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap',
                                                opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease 2s',
                                            }}>$47.2k</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Activity + Agents row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: 12 }}>
                        {/* Activity */}
                        <div style={{
                            padding: '16px', borderRadius: 12, background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease 1s',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: '#FAFAFA' }}>Recent Activity</span>
                                <span style={{ fontSize: 9, color: '#FF6B00', fontWeight: 600 }}>View all</span>
                            </div>
                            {[
                                { t: 'Email campaign sent', s: '2,400 recipients', time: '2m', c: '#FF6B00' },
                                { t: 'A/B test completed', s: 'Variant B won +18%', time: '8m', c: '#8B5CF6' },
                                { t: 'New audience segment', s: '1,240 high-intent', time: '15m', c: '#10B981' },
                            ].map((a, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
                                    borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                                    opacity: loaded ? 1 : 0, transform: loaded ? 'translateX(0)' : 'translateX(-16px)',
                                    transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${1.2 + i * 0.12}s`,
                                }}>
                                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${a.c}15`, border: `1px solid ${a.c}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.c }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 11, fontWeight: 600, color: '#FAFAFA' }}>{a.t}</div>
                                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>{a.s}</div>
                                    </div>
                                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)' }}>{a.time}</span>
                                </div>
                            ))}
                        </div>

                        {/* Agent panel */}
                        <div style={{
                            padding: '16px', borderRadius: 12, background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease 1.1s',
                        }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: '#FAFAFA', marginBottom: 12 }}>AI Agents</div>
                            {[
                                { n: 'Content Writer', c: '#10B981', s: 'Generating...' },
                                { n: 'Ad Optimizer', c: '#3B82F6', s: 'Optimizing' },
                                { n: 'SEO Analyst', c: '#F59E0B', s: 'Analyzing' },
                            ].map((ag, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: ag.c, boxShadow: `0 0 6px ${ag.c}60`, animation: 'statusPulse 2s ease infinite', animationDelay: `${i * 0.5}s` }} />
                                    <span style={{ fontSize: 11, color: '#FAFAFA', fontWeight: 500, flex: 1 }}>{ag.n}</span>
                                    <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>{ag.s}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ProductShowcase: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from('.ps-label', { y: 16, opacity: 0, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } });
        gsap.from('.ps-heading', { y: 30, opacity: 0, filter: 'blur(6px)', duration: 0.8, ease: 'power4.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
        gsap.from('.ps-mockup-wrap', {
            y: 80, opacity: 0, scale: 0.9, duration: 1.4, ease: 'power3.out',
            scrollTrigger: { trigger: '.ps-mockup-wrap', start: 'top 92%' },
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="dark-section" style={{
            padding: '120px 24px 160px', background: 'var(--bg-dark-primary)', position: 'relative', overflow: 'hidden',
        }}>
            {/* Gradient orbs */}
            <div style={{ position: 'absolute', top: '10%', left: '20%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '5%', right: '15%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

            {/* Grid pattern */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse 70% 50% at 50% 40%, black 0%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 40%, black 0%, transparent 70%)' }} />

            <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: 56 }}>
                    <p className="ps-label" style={{
                        fontFamily: 'var(--font-mono)', fontSize: 12, color: '#FF8533',
                        textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12, fontWeight: 600,
                    }}>Product</p>
                    <h2 className="ps-heading" style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
                        fontWeight: 800, color: '#FAFAFA', lineHeight: 1.1,
                        letterSpacing: '-0.03em',
                    }}>
                        See OpenAnalyst <span className="text-gradient">in action</span>
                    </h2>
                </div>

                {/* Dashboard with 3D perspective + dramatic shadow */}
                <div className="ps-mockup-wrap" style={{ perspective: 1400 }}>
                    <div style={{
                        transform: 'rotateX(4deg) rotateY(-1deg)',
                        transformOrigin: 'center 80%',
                        borderRadius: 20,
                        overflow: 'hidden',
                        boxShadow: '0 60px 120px -30px rgba(255,107,0,0.15), 0 30px 60px -15px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
                    }}>
                        <DashboardMockup />
                    </div>

                    {/* Reflection glow under the mockup */}
                    <div style={{
                        marginTop: -20, height: 80, borderRadius: '50%',
                        background: 'radial-gradient(ellipse, rgba(255,107,0,0.08) 0%, transparent 70%)',
                        filter: 'blur(20px)', pointerEvents: 'none',
                    }} />
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;
