'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
    id: number;
    name: string;
    title: string;
    description: string;
    accentColor: string;
    capabilities: string[];
}

const features: Feature[] = [
    {
        id: 0, name: 'AI-Vibe-Marketer', title: 'Full-Stack Marketing Agent',
        description: 'Deploy an autonomous marketing agent that plans, creates, and optimizes campaigns across every channel.',
        accentColor: '#FF6B00',
        capabilities: ['Multi-channel campaigns', 'A/B testing', 'Performance tracking', 'Budget optimization'],
    },
    {
        id: 1, name: 'Customer Segmentation', title: 'Automatic Audience Segmentation',
        description: 'Automatically segment your audience by behavior, demographics, and engagement patterns.',
        accentColor: '#3b82f6',
        capabilities: ['Behavioral clustering', 'Demographic profiling', 'Engagement scoring', 'Predictive modeling'],
    },
    {
        id: 2, name: 'Market Research', title: 'Market Intelligence',
        description: 'Generate comprehensive research reports with competitor analysis, trend forecasting, and strategic insights.',
        accentColor: '#22c55e',
        capabilities: ['Competitor analysis', 'Trend forecasting', 'Market sizing', 'Opportunity mapping'],
    },
    {
        id: 3, name: 'AI Search Optimization', title: 'Next-Gen Search Intelligence',
        description: 'Optimize your brand across AI search engines — ChatGPT, Perplexity, Gemini — for maximum discoverability.',
        accentColor: '#a855f7',
        capabilities: ['AI search optimization', 'Structured data', 'Content gap analysis', 'Ranking intelligence'],
    },
    {
        id: 4, name: 'SEO Content Optimizer', title: 'Content Ranking Engine',
        description: 'Create content that ranks with intelligent keyword research, competitive gap analysis, and real-time tracking.',
        accentColor: '#f59e0b',
        capabilities: ['Keyword research', 'Content scoring', 'Gap analysis', 'Performance tracking'],
    },
];

/* ═══ FEATURE 0: CHAT AI CONVERSATION ═══ */
function ChatPreview({ isActive, color }: { isActive: boolean; color: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [msgs, setMsgs] = useState<{ from: 'user' | 'ai'; text: string; cards?: { icon: string; label: string; stat: string }[] }[]>([]);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!isActive) return;
        setMsgs([]);
        const sequence = [
            { delay: 400, msg: { from: 'user' as const, text: 'Launch a Q2 campaign targeting high-intent buyers' } },
            { delay: 1200, msg: { from: 'ai' as const, text: 'Got it! Here\'s what I\'m setting up:', cards: [
                { icon: '📧', label: 'Email sequence', stat: '3 variants' },
                { icon: '📱', label: 'Social ads', stat: '4 platforms' },
                { icon: '🎯', label: 'Retargeting', stat: '840 users' },
            ] } },
            { delay: 2800, msg: { from: 'ai' as const, text: '✓ Campaign live — projected ROI +340%' } },
        ];
        let idx = 0;
        const run = () => {
            if (idx >= sequence.length) return;
            const s = sequence[idx];
            timerRef.current = setTimeout(() => {
                setMsgs(prev => [...prev, s.msg]);
                idx++;
                run();
            }, s.delay);
        };
        run();
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [isActive]);

    return (
        <div ref={ref} style={{ width: '100%', height: '100%', borderRadius: '20px', background: '#FAFAFA', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: `0 20px 60px rgba(0,0,0,0.06), 0 0 30px ${color}08` }}>
            <div style={{ padding: '10px 16px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '8px', background: '#fff' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: `linear-gradient(135deg, ${color}, ${color}CC)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"/></svg>
                </div>
                <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#1A1A1A' }}>AI Marketing Agent</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#10B981' }} />Online
                    </div>
                </div>
            </div>
            <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
                {msgs.map((m, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start', animation: 'featFadeUp 0.3s ease forwards' }}>
                        <div style={{
                            maxWidth: '85%', padding: '8px 12px', borderRadius: m.from === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                            background: m.from === 'user' ? '#1A1A1A' : '#fff',
                            color: m.from === 'user' ? '#fff' : '#1A1A1A',
                            fontFamily: 'var(--font-body)', fontSize: '11px', lineHeight: 1.5,
                            border: m.from === 'ai' ? '1px solid rgba(0,0,0,0.06)' : 'none',
                            boxShadow: m.from === 'ai' ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                        }}>
                            {m.text}
                            {m.cards && (
                                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                                    {m.cards.map((c, ci) => (
                                        <div key={ci} style={{ flex: 1, padding: '6px 8px', borderRadius: '8px', background: `${color}08`, border: `1px solid ${color}15`, textAlign: 'center' }}>
                                            <div style={{ fontSize: '14px', marginBottom: '2px' }}>{c.icon}</div>
                                            <div style={{ fontSize: '8px', color: '#666', fontWeight: 500 }}>{c.label}</div>
                                            <div style={{ fontSize: '10px', color, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>{c.stat}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {msgs.length > 0 && msgs.length < 3 && (
                    <div style={{ display: 'flex', gap: '4px', padding: '8px 0' }}>
                        {[0,1,2].map(d => <div key={d} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ccc', animation: `featDotPulse 1.2s ease ${d * 0.2}s infinite` }} />)}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ═══ FEATURE 1: AUDIENCE CLUSTER ═══ */
function AudienceCluster({ isActive, color }: { isActive: boolean; color: string }) {
    const segments = [
        { name: 'High Intent', count: '3,240', pct: 92, color: '#10B981', avatars: ['Zoe','Leo','Mia'] },
        { name: 'Engaged', count: '12,400', pct: 74, color: '#3B82F6', avatars: ['Sam','Ava','Max'] },
        { name: 'At Risk', count: '180', pct: 28, color: '#F59E0B', avatars: ['Kai','Ivy'] },
        { name: 'New Users', count: '2,800', pct: 56, color: '#8B5CF6', avatars: ['Eli','Nia','Zara'] },
    ];
    return (
        <div style={{ width: '100%', height: '100%', borderRadius: '20px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: `0 20px 60px rgba(0,0,0,0.06), 0 0 30px ${color}08` }}>
            <div style={{ padding: '10px 16px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#1A1A1A' }}>Audience Segments</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color, padding: '2px 8px', borderRadius: '6px', background: `${color}10` }}>23 active</span>
            </div>
            <div style={{ flex: 1, padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {segments.map((s, i) => (
                    <div key={i} style={{ padding: '10px 12px', borderRadius: '12px', background: '#FAFAFA', border: '1px solid rgba(0,0,0,0.04)', animation: isActive ? `featFadeUp 0.4s ease ${i * 0.1}s forwards` : 'none', opacity: isActive ? 0 : 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '3px', background: s.color }} />
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#1A1A1A' }}>{s.name}</span>
                            </div>
                            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 800, color: '#1A1A1A' }}>{s.count}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: 'rgba(0,0,0,0.04)' }}>
                                <div style={{ width: `${s.pct}%`, height: '100%', borderRadius: '2px', background: s.color, transition: 'width 1s ease' }} />
                            </div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: s.color, fontWeight: 600 }}>{s.pct}%</span>
                            <div style={{ display: 'flex', marginLeft: '4px' }}>
                                {s.avatars.map((a, ai) => (
                                    <img key={ai} src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${a}&size=20`} alt="" width={18} height={18} style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1.5px solid #fff', marginLeft: ai > 0 ? '-5px' : 0, background: '#f0f0f0' }} />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ═══ FEATURE 2: LIVE INSIGHT FEED ═══ */
function InsightFeed({ isActive, color }: { isActive: boolean; color: string }) {
    const insights = [
        { icon: '🔥', text: 'Competitor X launched new Instagram campaign', time: 'Just now', type: 'alert', borderColor: '#EF4444' },
        { icon: '📈', text: 'AI adoption in your vertical up 67% YoY', time: '2m ago', type: 'trend', borderColor: '#22C55E' },
        { icon: '💡', text: '$2.4B underserved TAM detected in SMB tier', time: '5m ago', type: 'opportunity', borderColor: '#3B82F6' },
        { icon: '⚡', text: 'Pricing gap found: enterprise tier 22% below market', time: '12m ago', type: 'insight', borderColor: '#F59E0B' },
        { icon: '🎯', text: '3 new competitor keyword rankings detected', time: '18m ago', type: 'seo', borderColor: '#A855F7' },
    ];
    return (
        <div style={{ width: '100%', height: '100%', borderRadius: '20px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: `0 20px 60px rgba(0,0,0,0.06), 0 0 30px ${color}08` }}>
            <div style={{ padding: '10px 16px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444', animation: 'featDotPulse 2s ease infinite' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#1A1A1A' }}>Live Intelligence</span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#999' }}>3.2M data points</span>
            </div>
            <div style={{ flex: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto' }}>
                {insights.map((ins, i) => (
                    <div key={i} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '10px',
                        padding: '8px 10px', borderRadius: '10px', background: '#FAFAFA',
                        borderLeft: `3px solid ${ins.borderColor}`,
                        animation: isActive ? `featSlideIn 0.4s ease ${i * 0.1}s forwards` : 'none',
                        opacity: isActive ? 0 : 1,
                    }}>
                        <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>{ins.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, color: '#1A1A1A', lineHeight: 1.4 }}>{ins.text}</div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#bbb', marginTop: '2px' }}>{ins.time}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ═══ FEATURE 3: COMMAND BAR + RESULTS ═══ */
function CommandBar({ isActive, color }: { isActive: boolean; color: string }) {
    const [typed, setTyped] = useState('');
    const [showResults, setShowResults] = useState(false);
    const query = 'How visible is our brand on ChatGPT?';
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!isActive) return;
        setTyped(''); setShowResults(false);
        let i = 0;
        const type = () => {
            if (i <= query.length) { setTyped(query.slice(0, i)); i++; timerRef.current = setTimeout(type, 45); }
            else { timerRef.current = setTimeout(() => setShowResults(true), 600); }
        };
        timerRef.current = setTimeout(type, 500);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [isActive]);

    const results = [
        { label: 'Visibility Score', value: '94/100', icon: '🎯', sub: 'Top 3% in your category' },
        { label: 'AI Mentions', value: '1.8K', icon: '🤖', sub: 'Across ChatGPT & Perplexity' },
        { label: 'Ranking', value: '#2', icon: '🏆', sub: 'For "AI marketing tools"' },
    ];

    return (
        <div style={{ width: '100%', height: '100%', borderRadius: '20px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: `0 20px 60px rgba(0,0,0,0.06), 0 0 30px ${color}08` }}>
            <div style={{ padding: '10px 16px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#1A1A1A' }}>Search Intelligence</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#999', padding: '2px 6px', border: '1px solid #eee', borderRadius: '4px' }}>⌘K</span>
            </div>
            <div style={{ padding: '14px 16px' }}>
                <div style={{
                    padding: '10px 14px', borderRadius: '12px', border: `1.5px solid ${showResults ? color : 'rgba(0,0,0,0.08)'}`,
                    background: '#FAFAFA', transition: 'border-color 0.3s ease',
                    boxShadow: showResults ? `0 0 20px ${color}15` : 'none',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={showResults ? color : '#bbb'} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: typed ? '#1A1A1A' : '#ccc' }}>
                            {typed || 'Ask anything...'}
                            {!showResults && <span style={{ display: 'inline-block', width: '2px', height: '14px', background: color, marginLeft: '1px', verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} />}
                        </span>
                    </div>
                </div>
            </div>
            {showResults && (
                <div style={{ padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {results.map((r, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '12px',
                            padding: '10px 12px', borderRadius: '12px',
                            background: '#FAFAFA', border: '1px solid rgba(0,0,0,0.04)',
                            animation: `featFadeUp 0.35s ease ${i * 0.1}s forwards`, opacity: 0,
                        }}>
                            <span style={{ fontSize: '18px' }}>{r.icon}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#999' }}>{r.label}</div>
                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800, color: '#1A1A1A' }}>{r.value}</div>
                            </div>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#999' }}>{r.sub}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ═══ FEATURE 4: CONTENT SCORING ═══ */
function ContentScoring({ isActive, color }: { isActive: boolean; color: string }) {
    const items = [
        { title: 'AI Marketing Guide', score: 97, status: 'Published', keywords: 34, traffic: '12.4K' },
        { title: 'Campaign Automation 101', score: 91, status: 'Optimizing', keywords: 28, traffic: '8.2K' },
        { title: 'ROI Measurement Tips', score: 84, status: 'Draft', keywords: 22, traffic: '—' },
    ];
    return (
        <div style={{ width: '100%', height: '100%', borderRadius: '20px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: `0 20px 60px rgba(0,0,0,0.06), 0 0 30px ${color}08` }}>
            <div style={{ padding: '10px 16px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#1A1A1A' }}>Content Optimizer</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#10B981', padding: '2px 8px', borderRadius: '6px', background: 'rgba(16,185,129,0.08)' }}>142 ranking</span>
            </div>
            <div style={{ flex: 1, padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {items.map((item, i) => {
                    const scoreColor = item.score >= 95 ? '#10B981' : item.score >= 90 ? '#3B82F6' : '#F59E0B';
                    return (
                        <div key={i} style={{
                            padding: '12px', borderRadius: '12px', background: '#FAFAFA',
                            border: i === 0 ? `1px solid ${color}20` : '1px solid rgba(0,0,0,0.04)',
                            animation: isActive ? `featFadeUp 0.4s ease ${i * 0.12}s forwards` : 'none', opacity: isActive ? 0 : 1,
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                <div>
                                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#1A1A1A', marginBottom: '2px' }}>{item.title}</div>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: item.status === 'Published' ? '#10B981' : item.status === 'Optimizing' ? color : '#999', padding: '1px 6px', borderRadius: '4px', background: item.status === 'Published' ? 'rgba(16,185,129,0.08)' : item.status === 'Optimizing' ? `${color}10` : 'rgba(0,0,0,0.04)' }}>{item.status}</span>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#bbb' }}>{item.keywords} keywords</span>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#bbb' }}>{item.traffic} visits</span>
                                    </div>
                                </div>
                                {/* Circular score */}
                                <div style={{ position: 'relative', width: '36px', height: '36px', flexShrink: 0 }}>
                                    <svg width="36" height="36" viewBox="0 0 36 36">
                                        <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="3" />
                                        <circle cx="18" cy="18" r="15" fill="none" stroke={scoreColor} strokeWidth="3"
                                            strokeDasharray={`${(item.score / 100) * 94.2} 94.2`}
                                            strokeLinecap="round" transform="rotate(-90 18 18)"
                                            style={{ transition: 'stroke-dasharray 1s ease' }}
                                        />
                                    </svg>
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontSize: '10px', fontWeight: 800, color: scoreColor }}>{item.score}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ═══ VISUAL SELECTOR ═══ */
function FeatureVisual({ feature, isActive }: { feature: Feature; isActive: boolean }) {
    switch (feature.id) {
        case 0: return <ChatPreview isActive={isActive} color={feature.accentColor} />;
        case 1: return <AudienceCluster isActive={isActive} color={feature.accentColor} />;
        case 2: return <InsightFeed isActive={isActive} color={feature.accentColor} />;
        case 3: return <CommandBar isActive={isActive} color={feature.accentColor} />;
        case 4: return <ContentScoring isActive={isActive} color={feature.accentColor} />;
        default: return null;
    }
}

/* ═══ MAIN FEATURES COMPONENT ═══ */
const Features: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const pinWrapRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const leftPanelRefs = useRef<(HTMLDivElement | null)[]>([]);
    const lastIndexRef = useRef(0);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        gsap.from('.features-badge', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
        gsap.from('.features-heading', { y: 40, opacity: 0, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' } });
        gsap.from('.features-sub', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });

        mm.add('(min-width: 1025px)', () => {
            const total = features.length;

            leftPanelRefs.current.forEach((p, i) => {
                if (!p) return;
                gsap.set(p, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 40, visibility: i === 0 ? 'visible' : 'hidden' });
            });

            const st = ScrollTrigger.create({
                trigger: pinWrapRef.current,
                start: 'top top',
                end: () => `+=${(total - 1) * 80}vh`,
                pin: true,
                scrub: 0.5,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const rawIdx = self.progress * total;
                    const idx = Math.min(Math.floor(rawIdx), total - 1);
                    if (idx !== lastIndexRef.current) {
                        lastIndexRef.current = idx;
                        setActiveIndex(idx);

                        leftPanelRefs.current.forEach((p, i) => {
                            if (!p || i === idx) return;
                            gsap.killTweensOf(p);
                            gsap.set(p, { opacity: 0, y: i < idx ? -30 : 30, visibility: 'hidden' });
                        });

                        const active = leftPanelRefs.current[idx];
                        if (active) {
                            gsap.set(active, { visibility: 'visible', opacity: 0, y: 25 });
                            gsap.to(active, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', overwrite: true });
                        }
                    }
                },
            });
            return () => st.kill();
        });

        mm.add('(max-width: 1024px)', () => {
            gsap.utils.toArray<HTMLElement>('.feature-mobile-card').forEach((card) => {
                gsap.from(card, { y: 60, opacity: 0, duration: 0.7, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' } });
            });
        });

        return () => mm.revert();
    }, { scope: sectionRef });

    const af = features[activeIndex];

    return (
        <>
            <style>{`
                @keyframes featFadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
                @keyframes featSlideIn { from { opacity:0; transform:translateX(-12px); } to { opacity:1; transform:translateX(0); } }
                @keyframes featDotPulse { 0%,100% { opacity:.3; transform:scale(1); } 50% { opacity:1; transform:scale(1.3); } }
                @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
                .features-pin-wrapper { height:100vh; display:flex; align-items:center; justify-content:center; }
                .features-dot { width:10px; height:10px; border-radius:50%; border:1.5px solid rgba(0,0,0,0.1); background:transparent; transition:all 0.5s cubic-bezier(0.16,1,0.3,1); cursor:pointer; }
                .features-dot.active { border-color:var(--dot-color); background:var(--dot-color); box-shadow:0 0 16px var(--dot-color); transform:scale(1.4); }
                .feat-cap { display:flex; align-items:center; gap:10px; padding:10px 16px; border-radius:10px; background:rgba(0,0,0,0.02); border:1px solid rgba(0,0,0,0.04); font-family:var(--font-body); font-size:13px; color:var(--text-muted); transition:all 0.3s ease; }
                .feat-cap:hover { border-color:var(--cap-color); background:color-mix(in srgb,var(--cap-color) 6%,transparent); color:#1A1A1A; transform:translateX(4px); }
                .feature-mobile-card { display:none; }
                @media (max-width:1024px) { .features-desktop-layout { display:none !important; } .features-pin-wrapper { height:auto; display:block; } .feature-mobile-card { display:block; } .features-mobile-grid { display:flex; flex-direction:column; gap:20px; padding-top:20px; } }
                @media (max-width:600px) { .features-mobile-grid { padding: 48px 16px 60px !important; } .feature-mobile-card { padding: 20px 16px !important; } }
                @media (min-width:1025px) { .features-mobile-grid { display:none !important; } }
            `}</style>

            <section ref={sectionRef} id="features" style={{ background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${af.accentColor}10 0%, transparent 70%)`, transition: 'background 1s ease' }} />

                <div ref={pinWrapRef} className="features-pin-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="features-desktop-layout" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', width: '100%' }}>
                        {/* Header */}
                        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                            <div className="features-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', marginBottom: '16px', background: 'rgba(255,107,0,0.06)', border: '1px solid rgba(255,107,0,0.12)' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--rust)', boxShadow: '0 0 8px rgba(255,107,0,0.4)' }} />
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--rust-light)', letterSpacing: '0.08em', fontWeight: 600 }}>POWERFUL FEATURES</span>
                            </div>
                            <h2 className="features-heading" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, color: '#1A1A1A', lineHeight: 1.1, maxWidth: '600px', margin: '0 auto 12px' }}>
                                Everything You Need to{' '}
                                <span style={{ background: 'linear-gradient(135deg, #FF6B00, #E85D00)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dominate Marketing</span>
                            </h2>
                            <p className="features-sub" style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>Deploy specialized AI agents that handle your entire marketing stack.</p>
                        </div>

                        {/* Split: left text | center dots | right visual */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 48px 1fr', alignItems: 'center' }}>
                            {/* LEFT */}
                            <div style={{ position: 'relative', height: '380px' }}>
                                {features.map((f, i) => (
                                    <div key={f.id} ref={el => { leftPanelRefs.current[i] = el; }} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                            <div style={{ width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${f.accentColor}25, ${f.accentColor}08)`, border: `1px solid ${f.accentColor}30`, fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: f.accentColor }}>0{f.id + 1}</div>
                                            <div style={{ height: '1px', width: '32px', background: `linear-gradient(90deg, ${f.accentColor}, transparent)` }} />
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: f.accentColor, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{f.title}</span>
                                        </div>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, color: '#1A1A1A', marginBottom: '12px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{f.name}</h3>
                                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '420px', marginBottom: '24px' }}>{f.description}</p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            {f.capabilities.map((cap, ci) => (
                                                <div key={ci} className="feat-cap" style={{ '--cap-color': f.accentColor } as React.CSSProperties}>
                                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke={f.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                    {cap}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CENTER — Dots */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', justifySelf: 'center', position: 'relative' }}>
                                <div style={{ position: 'absolute', width: '1px', top: 0, bottom: 0, background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.06), transparent)', zIndex: 0 }} />
                                {features.map((f, i) => (
                                    <div key={f.id} className={`features-dot ${activeIndex === i ? 'active' : ''}`} style={{ '--dot-color': f.accentColor, position: 'relative', zIndex: 1 } as React.CSSProperties} />
                                ))}
                            </div>

                            {/* RIGHT — Unique visual per feature */}
                            <div style={{ height: '380px' }}>
                                <FeatureVisual feature={features[activeIndex]} isActive={true} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile layout */}
                <div className="features-mobile-grid" style={{ maxWidth: '600px', margin: '0 auto', padding: '80px 24px 100px', position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <div className="features-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', marginBottom: '16px', background: 'rgba(255,107,0,0.06)', border: '1px solid rgba(255,107,0,0.12)' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--rust)', boxShadow: '0 0 8px rgba(255,107,0,0.4)' }} />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--rust-light)', letterSpacing: '0.08em', fontWeight: 600 }}>POWERFUL FEATURES</span>
                        </div>
                        <h2 className="features-heading" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 800, color: '#1A1A1A', lineHeight: 1.1, margin: '0 auto 12px' }}>
                            Everything You Need to{' '}
                            <span style={{ background: 'linear-gradient(135deg, #FF6B00, #E85D00)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dominate Marketing</span>
                        </h2>
                    </div>
                    {features.map((f) => (
                        <div key={f.id} className="feature-mobile-card" style={{ borderRadius: '20px', padding: '28px 24px', background: 'rgba(0,0,0,0.02)', border: `1px solid ${f.accentColor}15`, position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${f.accentColor}, transparent)`, opacity: 0.5 }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, color: f.accentColor, background: `${f.accentColor}15`, border: `1px solid ${f.accentColor}25` }}>0{f.id + 1}</div>
                                <div>
                                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 700, color: '#1A1A1A', marginBottom: '2px' }}>{f.name}</h3>
                                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: f.accentColor, fontWeight: 500 }}>{f.title}</p>
                                </div>
                            </div>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '16px' }}>{f.description}</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {f.capabilities.map((cap, ci) => (
                                    <span key={ci} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '4px 10px', borderRadius: '9999px', background: `${f.accentColor}08`, border: `1px solid ${f.accentColor}20`, color: `${f.accentColor}cc` }}>{cap}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Features;
