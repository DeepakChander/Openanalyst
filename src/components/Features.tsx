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
    cliCommand: string;
    cliSteps: string[];
}

const features: Feature[] = [
    {
        id: 0, name: 'AI-Vibe-Marketer', title: 'Full-Stack Marketing Agent',
        description: 'Deploy an autonomous marketing agent that plans, creates, and optimizes campaigns across every channel.',
        accentColor: '#FF6B00',
        capabilities: ['Multi-channel campaigns', 'A/B testing', 'Performance tracking', 'Budget optimization'],
        cliCommand: 'ai-vibe-marketer',
        cliSteps: ['Scanning 12 channels...', 'Generating campaign variants...', 'Running A/B split tests...', 'Optimizing budget allocation...', 'Campaign live — ROI +340%'],
    },
    {
        id: 1, name: 'Customer Segmentation', title: 'Automatic Audience Segmentation',
        description: 'Automatically segment your audience by behavior, demographics, and engagement patterns.',
        accentColor: '#3b82f6',
        capabilities: ['Behavioral clustering', 'Demographic profiling', 'Engagement scoring', 'Predictive modeling'],
        cliCommand: 'customer-segmentation',
        cliSteps: ['Analyzing 847K user profiles...', 'Clustering by behavior...', 'Scoring engagement levels...', 'Building predictive models...', '23 segments identified'],
    },
    {
        id: 2, name: 'Market Research', title: 'Market Intelligence',
        description: 'Generate comprehensive research reports with competitor analysis, trend forecasting, and strategic insights.',
        accentColor: '#22c55e',
        capabilities: ['Competitor analysis', 'Trend forecasting', 'Market sizing', 'Opportunity mapping'],
        cliCommand: 'market-research',
        cliSteps: ['Scraping competitor data...', 'Analyzing 3.2M data points...', 'Forecasting Q3 trends...', 'Sizing addressable market...', 'Report ready — 47 insights'],
    },
    {
        id: 3, name: 'AI Search Optimization', title: 'Next-Gen Search Intelligence',
        description: 'Optimize your brand across AI search engines — ChatGPT, Perplexity, Gemini — for maximum discoverability.',
        accentColor: '#a855f7',
        capabilities: ['AI search optimization', 'Structured data', 'Content gap analysis', 'Ranking intelligence'],
        cliCommand: 'ai-search-optimization',
        cliSteps: ['Indexing AI search results...', 'Mapping content gaps...', 'Generating structured data...', 'Optimizing for Perplexity...', 'Visibility score: 94/100'],
    },
    {
        id: 4, name: 'SEO Content Optimizer', title: 'Content Ranking Engine',
        description: 'Create content that ranks with intelligent keyword research, competitive gap analysis, and real-time tracking.',
        accentColor: '#f59e0b',
        capabilities: ['Keyword research', 'Content scoring', 'Gap analysis', 'Performance tracking'],
        cliCommand: 'seo-content-optimizer',
        cliSteps: ['Researching 2.4K keywords...', 'Scoring content quality...', 'Identifying ranking gaps...', 'Generating optimized drafts...', 'Content score: 97/100'],
    },
];

/* ═══ TYPING TERMINAL ANIMATION ═══ */
function TypingTerminal({ feature, isActive }: { feature: Feature; isActive: boolean }) {
    const termRef = useRef<HTMLDivElement>(null);
    const [lines, setLines] = useState<{ text: string; type: 'command' | 'step' | 'result' | 'empty' }[]>([]);
    const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const prevFeatureRef = useRef<number>(-1);

    useEffect(() => {
        if (!isActive) return;
        if (prevFeatureRef.current === feature.id) return;
        prevFeatureRef.current = feature.id;

        // Reset
        setLines([]);
        if (animRef.current) clearTimeout(animRef.current);

        const allLines: { text: string; type: 'command' | 'step' | 'result' | 'empty'; delay: number }[] = [
            { text: `$ openanalyst run ${feature.cliCommand}`, type: 'command', delay: 100 },
            { text: '', type: 'empty', delay: 300 },
            { text: '> Agent initialized...', type: 'step', delay: 200 },
        ];

        feature.cliSteps.forEach((step, i) => {
            allLines.push({
                text: `  ${i === feature.cliSteps.length - 1 ? '✓' : '→'} ${step}`,
                type: i === feature.cliSteps.length - 1 ? 'result' : 'step',
                delay: 350,
            });
        });

        allLines.push({ text: '', type: 'empty', delay: 200 });
        allLines.push({ text: '> Done ●', type: 'result', delay: 300 });

        let idx = 0;
        const showNext = () => {
            if (idx >= allLines.length) return;
            const line = allLines[idx];
            setLines(prev => [...prev, { text: line.text, type: line.type }]);
            idx++;
            if (idx < allLines.length) {
                animRef.current = setTimeout(showNext, allLines[idx].delay);
            }
        };
        animRef.current = setTimeout(showNext, 400);

        return () => { if (animRef.current) clearTimeout(animRef.current); };
    }, [isActive, feature]);

    // Auto-scroll terminal
    useEffect(() => {
        if (termRef.current) {
            termRef.current.scrollTop = termRef.current.scrollHeight;
        }
    }, [lines]);

    const color = feature.accentColor;

    return (
        <div style={{
            width: '100%', height: '100%', borderRadius: '20px',
            background: '#0c0a09', border: `1px solid ${color}20`,
            overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${color}08`,
        }}>
            {/* Title bar */}
            <div style={{
                padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '8px',
                borderBottom: `1px solid ${color}10`, background: '#0f0d0b',
            }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginLeft: '8px' }}>
                    openanalyst — {feature.title.toLowerCase()}
                </span>
            </div>

            {/* Terminal body */}
            <div ref={termRef} style={{
                flex: 1, padding: '20px', overflowY: 'auto',
                fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 2,
            }}>
                {lines.map((line, i) => {
                    if (line.type === 'empty') return <div key={i} style={{ height: '8px' }} />;
                    return (
                        <div key={i} style={{
                            color: line.type === 'command' ? '#ffffff' :
                                   line.type === 'result' ? color : 'rgba(255,255,255,0.5)',
                            opacity: 0,
                            animation: 'termLineIn 0.3s ease forwards',
                            animationDelay: '0s',
                        }}>
                            {line.type === 'command' ? (
                                <><span style={{ color }}>&gt;</span> {line.text.slice(2)}</>
                            ) : line.text}
                        </div>
                    );
                })}
                {/* Blinking cursor */}
                <span style={{
                    display: 'inline-block', width: '8px', height: '16px',
                    background: color, opacity: 0.8,
                    animation: 'blink 1s step-end infinite',
                    verticalAlign: 'middle', marginLeft: '2px', borderRadius: '1px',
                }} />
            </div>
        </div>
    );
}

/* ═══ MAIN COMPONENT ═══ */
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
                end: () => `+=${total * 100}vh`,
                pin: true,
                scrub: 0,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const idx = Math.min(Math.floor(self.progress * total), total - 1);
                    if (idx !== lastIndexRef.current) {
                        const dir = idx > lastIndexRef.current ? 1 : -1;
                        lastIndexRef.current = idx;
                        setActiveIndex(idx);

                        leftPanelRefs.current.forEach((p, i) => {
                            if (!p || i === idx) return;
                            gsap.killTweensOf(p);
                            gsap.set(p, { opacity: 0, y: i < idx ? -40 : 40, visibility: 'hidden' });
                        });

                        const active = leftPanelRefs.current[idx];
                        if (active) {
                            gsap.set(active, { visibility: 'visible', opacity: 0, y: dir * 30 });
                            gsap.to(active, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', overwrite: true });
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
                .features-pin-wrapper {
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .features-dot {
                    width: 10px; height: 10px; border-radius: 50%;
                    border: 1.5px solid rgba(0,0,0,0.1);
                    background: transparent;
                    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    cursor: pointer;
                }
                .features-dot.active {
                    border-color: var(--dot-color);
                    background: var(--dot-color);
                    box-shadow: 0 0 16px var(--dot-color), 0 0 32px color-mix(in srgb, var(--dot-color) 30%, transparent);
                    transform: scale(1.4);
                }
                .feat-cap {
                    display: flex; align-items: center; gap: 10px;
                    padding: 10px 16px; border-radius: 10px;
                    background: rgba(0,0,0,0.02);
                    border: 1px solid rgba(0,0,0,0.04);
                    font-family: var(--font-body); font-size: 13px;
                    color: var(--text-muted); transition: all 0.3s ease;
                }
                .feat-cap:hover {
                    border-color: var(--cap-color);
                    background: color-mix(in srgb, var(--cap-color) 6%, transparent);
                    color: #1A1A1A; transform: translateX(4px);
                }
                @keyframes termLineIn {
                    from { opacity: 0; transform: translateY(4px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .feature-mobile-card { display: none; }
                @media (max-width: 1024px) {
                    .features-desktop-layout { display: none !important; }
                    .features-pin-wrapper { height: auto; display: block; }
                    .feature-mobile-card { display: block; }
                    .features-mobile-grid { display: flex; flex-direction: column; gap: 20px; padding-top: 20px; }
                }
                @media (min-width: 1025px) { .features-mobile-grid { display: none !important; } }
            `}</style>

            <section ref={sectionRef} id="features" style={{ background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>

                {/* Dynamic gradient bg */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${af.accentColor}12 0%, transparent 70%)`,
                    transition: 'background 1.2s ease',
                }} />

                {/* Dot grid */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.12,
                    backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                    maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 80%)',
                }} />

                {/* Pinned 100vh section — everything centered */}
                <div ref={pinWrapRef} className="features-pin-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="features-desktop-layout" style={{
                        maxWidth: '1200px', margin: '0 auto', padding: '0 40px', width: '100%',
                    }}>
                        {/* Header — centered above the split */}
                        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                            <div className="features-badge" style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                padding: '6px 16px', borderRadius: '9999px', marginBottom: '16px',
                                background: 'rgba(255,107,0,0.06)', border: '1px solid rgba(255,107,0,0.12)',
                            }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--rust)', boxShadow: '0 0 8px rgba(255,107,0,0.4)' }} />
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--rust-light)', letterSpacing: '0.08em', fontWeight: 600 }}>POWERFUL FEATURES</span>
                            </div>
                            <h2 className="features-heading" style={{
                                fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                                fontWeight: 800, color: '#1A1A1A', lineHeight: 1.1, maxWidth: '600px', margin: '0 auto 12px',
                            }}>
                                Everything You Need to{' '}
                                <span style={{ background: 'linear-gradient(135deg, #FF6B00, #E85D00)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dominate Marketing</span>
                            </h2>
                            <p className="features-sub" style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
                                Deploy specialized AI agents that handle your entire marketing stack.
                            </p>
                        </div>

                        {/* Split layout: text left, terminal right, dots center */}
                        <div style={{
                            display: 'grid', gridTemplateColumns: '1fr 48px 1fr',
                            alignItems: 'center',
                        }}>
                            {/* LEFT — Text panels */}
                            <div style={{ position: 'relative', height: '380px' }}>
                                {features.map((f, i) => (
                                    <div key={f.id} ref={el => { leftPanelRefs.current[i] = el; }} style={{
                                        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                            <div style={{
                                                width: '38px', height: '38px', borderRadius: '10px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                background: `linear-gradient(135deg, ${f.accentColor}25, ${f.accentColor}08)`,
                                                border: `1px solid ${f.accentColor}30`,
                                                fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: f.accentColor,
                                            }}>0{f.id + 1}</div>
                                            <div style={{ height: '1px', width: '32px', background: `linear-gradient(90deg, ${f.accentColor}, transparent)` }} />
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: f.accentColor, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{f.title}</span>
                                        </div>

                                        <h3 style={{
                                            fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                                            fontWeight: 800, color: '#1A1A1A', marginBottom: '12px', lineHeight: 1.1, letterSpacing: '-0.02em',
                                        }}>{f.name}</h3>

                                        <p style={{
                                            fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-muted)',
                                            lineHeight: 1.7, maxWidth: '420px', marginBottom: '24px',
                                        }}>{f.description}</p>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            {f.capabilities.map((cap, ci) => (
                                                <div key={ci} className="feat-cap" style={{ '--cap-color': f.accentColor } as React.CSSProperties}>
                                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                                        <path d="M3 8L6.5 11.5L13 4.5" stroke={f.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
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

                            {/* RIGHT — Animated terminal */}
                            <div style={{ height: '380px' }}>
                                <TypingTerminal feature={features[activeIndex]} isActive={true} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile layout */}
                <div className="features-mobile-grid" style={{ maxWidth: '600px', margin: '0 auto', padding: '80px 24px 100px', position: 'relative', zIndex: 1 }}>
                    {/* Mobile header */}
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <div className="features-badge" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            padding: '6px 16px', borderRadius: '9999px', marginBottom: '16px',
                            background: 'rgba(255,107,0,0.06)', border: '1px solid rgba(255,107,0,0.12)',
                        }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--rust)', boxShadow: '0 0 8px rgba(255,107,0,0.4)' }} />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--rust-light)', letterSpacing: '0.08em', fontWeight: 600 }}>POWERFUL FEATURES</span>
                        </div>
                        <h2 className="features-heading" style={{
                            fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
                            fontWeight: 800, color: '#1A1A1A', lineHeight: 1.1, margin: '0 auto 12px',
                        }}>
                            Everything You Need to{' '}
                            <span style={{ background: 'linear-gradient(135deg, #FF6B00, #E85D00)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dominate Marketing</span>
                        </h2>
                    </div>
                    {features.map((f) => (
                        <div key={f.id} className="feature-mobile-card" style={{
                            borderRadius: '20px', padding: '28px 24px',
                            background: 'rgba(0,0,0,0.02)', border: `1px solid ${f.accentColor}15`,
                            position: 'relative', overflow: 'hidden',
                        }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${f.accentColor}, transparent)`, opacity: 0.5 }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '12px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700,
                                    color: f.accentColor, background: `${f.accentColor}15`, border: `1px solid ${f.accentColor}25`,
                                }}>0{f.id + 1}</div>
                                <div>
                                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 700, color: '#1A1A1A', marginBottom: '2px' }}>{f.name}</h3>
                                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: f.accentColor, fontWeight: 500 }}>{f.title}</p>
                                </div>
                            </div>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '16px' }}>{f.description}</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {f.capabilities.map((cap, ci) => (
                                    <span key={ci} style={{
                                        fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '4px 10px', borderRadius: '9999px',
                                        background: `${f.accentColor}08`, border: `1px solid ${f.accentColor}20`, color: `${f.accentColor}cc`,
                                    }}>{cap}</span>
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
