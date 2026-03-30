'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* Live coded dashboard mockup — no external images */
function DashboardMockup() {
    const [loaded, setLoaded] = useState(false);
    const dashRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 300);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (!loaded || !dashRef.current) return;
        dashRef.current.querySelectorAll('.ps-bar').forEach((bar, i) => {
            const h = [30, 45, 38, 55, 48, 62, 58, 72, 68, 78, 85, 92];
            (bar as HTMLElement).style.height = `${h[i]}%`;
        });
    }, [loaded]);

    const stats = [
        { label: 'CAMPAIGNS', value: '24', change: '+12%', color: '#FF6B00' },
        { label: 'LEADS', value: '1.2K', change: '+34%', color: '#8B5CF6' },
        { label: 'AVG. ROI', value: '340%', change: '+28%', color: '#10B981' },
    ];

    const activities = [
        { title: 'Email campaign sent', sub: '2,400 recipients', time: '2m' },
        { title: 'A/B test completed', sub: 'Variant B won +18%', time: '8m' },
        { title: 'New audience segment', sub: '1,240 high-intent users', time: '15m' },
    ];

    return (
        <div ref={dashRef} style={{
            width: '100%', height: '100%', background: '#FFFFFF', borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 24px 80px -16px rgba(0,0,0,0.15)', border: '1px solid rgba(0,0,0,0.06)',
        }}>
            {/* Title bar */}
            <div style={{ padding: '8px 14px', background: '#FAFBFC', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex', gap: 5 }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57' }} />
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E' }} />
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginLeft: 4 }}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, background: 'linear-gradient(135deg, #FF6B00, #FF8533)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="#fff"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#0F172A', fontFamily: 'var(--font-heading)' }}>OpenAnalyst</span>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ fontSize: 8, padding: '2px 8px', borderRadius: 4, background: '#F1F5F9', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>Search...</span>
                    <span style={{ fontSize: 8, fontWeight: 700, color: '#fff', padding: '2px 6px', borderRadius: 4, background: '#FF6B00' }}>3 NEW</span>
                </div>
            </div>

            <div style={{ padding: '12px 14px' }}>
                {/* Stat cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
                    {stats.map((s, i) => (
                        <div key={i} style={{
                            padding: 10, borderRadius: 10, border: '1px solid #F1F5F9', background: '#FAFBFC',
                            opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(8px)',
                            transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.1}s`,
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                <span style={{ fontSize: 7, fontWeight: 600, color: '#94A3B8', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>{s.label}</span>
                                <div style={{ borderTop: `2px solid ${s.color}`, width: 20, borderRadius: 1 }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                                <span style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>{s.value}</span>
                                <span style={{ fontSize: 8, fontWeight: 600, color: '#10B981' }}>
                                    <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" style={{ marginRight: 1 }}><polyline points="18 15 12 9 6 15"/></svg>
                                    {s.change}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chart */}
                <div style={{
                    opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease 0.5s',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#0F172A' }}>Performance</span>
                        <div style={{ display: 'flex', gap: 3 }}>
                            {['Revenue', 'Clicks'].map((t, i) => (
                                <span key={t} style={{ fontSize: 7, padding: '2px 8px', borderRadius: 4, background: i === 0 ? '#F1F5F9' : 'transparent', color: i === 0 ? '#0F172A' : '#94A3B8', fontWeight: i === 0 ? 600 : 400 }}>{t}</span>
                            ))}
                        </div>
                    </div>
                    <div style={{ height: 80, display: 'flex', alignItems: 'flex-end', gap: 3, padding: '0 2px' }}>
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="ps-bar" style={{
                                flex: 1, borderRadius: '3px 3px 1px 1px', height: 0,
                                background: i >= 10 ? 'linear-gradient(180deg, #FF6B00, #FF8533)' : i >= 8 ? 'rgba(255,107,0,0.45)' : 'rgba(255,107,0,0.12)',
                                transition: `height 0.8s cubic-bezier(0.16,1,0.3,1) ${0.6 + i * 0.05}s`,
                            }} />
                        ))}
                    </div>
                </div>

                {/* Activity */}
                <div style={{ marginTop: 10, borderTop: '1px solid #F1F5F9', paddingTop: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#0F172A' }}>Recent Activity</span>
                        <span style={{ fontSize: 8, color: '#FF6B00', fontWeight: 600 }}>View all</span>
                    </div>
                    {activities.map((a, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0',
                            borderBottom: i < 2 ? '1px solid #F8FAFC' : 'none',
                            opacity: loaded ? 1 : 0, transform: loaded ? 'translateX(0)' : 'translateX(-12px)',
                            transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${0.9 + i * 0.12}s`,
                        }}>
                            <div style={{ width: 22, height: 22, borderRadius: '50%', background: `hsl(${i * 40 + 20}, 70%, 92%)`, border: '1.5px solid #F1F5F9', flexShrink: 0 }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 9, fontWeight: 600, color: '#0F172A' }}>{a.title}</div>
                                <div style={{ fontSize: 8, color: '#94A3B8' }}>{a.sub}</div>
                            </div>
                            <span style={{ fontSize: 7, color: '#CBD5E1', fontFamily: 'var(--font-mono)' }}>{a.time}</span>
                        </div>
                    ))}
                </div>

                {/* Agent status */}
                <div style={{
                    marginTop: 8, paddingTop: 8, borderTop: '1px solid #F1F5F9',
                    opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease 1.3s',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', animation: 'statusPulse 2s ease infinite' }} />
                        <span style={{ fontSize: 9, fontWeight: 600, color: '#0F172A' }}>AI Agents</span>
                        <span style={{ fontSize: 8, fontWeight: 700, color: '#10B981', fontFamily: 'var(--font-mono)' }}>3 running</span>
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                        {[{ n: 'Content Writer', c: '#10B981' }, { n: 'Ad Optimizer', c: '#3B82F6' }, { n: 'SEO Analyst', c: '#F59E0B' }].map((ag) => (
                            <div key={ag.n} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 6, border: '1px solid #F1F5F9', fontSize: 7, color: '#475569' }}>
                                <span style={{ width: 4, height: 4, borderRadius: '50%', background: ag.c }} />{ag.n}
                            </div>
                        ))}
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
        gsap.from('.ps-mockup', {
            y: 60, opacity: 0, scale: 0.92, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: '.ps-mockup', start: 'top 88%' },
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="light-section" style={{
            padding: '120px 24px 140px', background: 'var(--bg-surface)', position: 'relative', overflow: 'hidden',
        }}>
            {/* Ambient mesh */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'var(--gradient-mesh-light)' }} />

            <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: 56 }}>
                    <p className="ps-label" style={{
                        fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--orange)',
                        textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12, fontWeight: 600,
                    }}>Product</p>
                    <h2 className="ps-heading" style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                        fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1,
                        letterSpacing: '-0.03em', maxWidth: 600, margin: '0 auto',
                    }}>
                        See OpenAnalyst <span className="text-gradient">in action</span>
                    </h2>
                </div>

                {/* Live coded dashboard — NOT an image */}
                <div className="ps-mockup" style={{
                    maxWidth: 680, margin: '0 auto',
                    perspective: 1200,
                }}>
                    <div style={{
                        transform: 'rotateX(2deg)',
                        transformOrigin: 'center bottom',
                        boxShadow: '0 40px 100px -20px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.03)',
                        borderRadius: 16,
                        overflow: 'hidden',
                    }}>
                        <DashboardMockup />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;
