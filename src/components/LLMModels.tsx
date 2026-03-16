'use client';

import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

const providers = [
    { name: 'Anthropic', color: '#d97706' },
    { name: 'OpenAI', color: '#412991' },
    { name: 'Google', color: '#4285F4' },
    { name: 'GitHub Copilot', color: '#24292e' },
    { name: 'OpenRouter', color: '#6366f1' },
    { name: 'DeepSeek', color: '#4a90d9' },
    { name: 'Qwen', color: '#5c6bc0' },
];

const llmModels: Record<string, { title: string; models: { name: string; inputCredits: string; outputCredits: string; isFree?: boolean; recommended?: boolean }[] }> = {
    openanalyst: {
        title: 'OpenAnalyst Models',
        models: [
            { name: 'OpenAnalyst Max', inputCredits: '28 credits / 1M', outputCredits: '56 credits / 1M', recommended: true },
            { name: 'OpenAnalyst Less Beta', inputCredits: '36 credits / 1M', outputCredits: '140 credits / 1M' },
        ]
    },
    free: {
        title: 'Free Models',
        models: [
            { name: 'Trinity Large Preview', inputCredits: 'FREE', outputCredits: 'FREE', isFree: true },
            { name: 'Big Pickle', inputCredits: 'FREE', outputCredits: 'FREE', isFree: true },
            { name: 'MiniMax M2.5 Free', inputCredits: 'FREE', outputCredits: 'FREE', isFree: true },
            { name: 'GPT-5 Nano', inputCredits: 'FREE', outputCredits: 'FREE', isFree: true },
        ]
    },
    openai: {
        title: 'OpenAI Models',
        models: [
            { name: 'GPT-4 Turbo', inputCredits: '2,000 credits / 1M', outputCredits: '6,000 credits / 1M' },
            { name: 'GPT-4o', inputCredits: '1,000 credits / 1M', outputCredits: '3,000 credits / 1M' },
            { name: 'GPT-4o Mini', inputCredits: '30 credits / 1M', outputCredits: '120 credits / 1M' },
        ]
    },
    claude: {
        title: 'Anthropic Models',
        models: [
            { name: 'Claude Opus 4', inputCredits: '3,000 credits / 1M', outputCredits: '15,000 credits / 1M' },
            { name: 'Claude Sonnet 4', inputCredits: '600 credits / 1M', outputCredits: '3,000 credits / 1M' },
            { name: 'Claude Haiku 3.5', inputCredits: '160 credits / 1M', outputCredits: '800 credits / 1M' },
        ]
    },
    deepseek: {
        title: 'DeepSeek Models',
        models: [
            { name: 'DeepSeek V3.2', inputCredits: '28 credits / 1M', outputCredits: '56 credits / 1M' },
        ]
    },
    qwen: {
        title: 'Qwen Models',
        models: [
            { name: 'Qwen3 Coder', inputCredits: '36 credits / 1M', outputCredits: '140 credits / 1M' },
            { name: 'Qwen3 Coder (Free)', inputCredits: 'FREE', outputCredits: 'FREE', isFree: true },
        ]
    },
};

const modelTabs = [
    { id: 'openanalyst', label: 'OpenAnalyst' },
    { id: 'free', label: 'Free' },
    { id: 'openai', label: 'OpenAI' },
    { id: 'claude', label: 'Anthropic' },
    { id: 'deepseek', label: 'DeepSeek' },
    { id: 'qwen', label: 'Qwen' },
];

const codeLines = [
    { text: 'const', style: 'keyword' },
    { text: ' models = {', style: 'default' },
    { text: '  free: [', style: 'default' },
    { text: '    "Trinity Large Preview"', style: 'string' },
    { text: ', "Big Pickle",', style: 'string' },
    { text: '    "MiniMax M2.5"', style: 'string' },
    { text: ', "GPT-5 Nano"', style: 'string' },
    { text: '  ],', style: 'default' },
    { text: '  premium: [', style: 'default' },
    { text: '    "OpenAnalyst Less Beta",', style: 'string' },
    { text: '    "OpenAnalyst Max"', style: 'string-highlight' },
    { text: '  ]', style: 'default' },
    { text: '};', style: 'default' },
];

const LLMModels: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeModelTab, setActiveModelTab] = useState('openanalyst');
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    gsap.registerPlugin(ScrollTrigger, useGSAP);

    useGSAP(() => {
        gsap.from('.llm-heading', {
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        });

        // Line-by-line typing reveal for terminal code
        const lines = gsap.utils.toArray<HTMLElement>('.code-line');
        gsap.from(lines, {
            opacity: 0,
            x: -10,
            stagger: 0.12,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.llm-terminal',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            }
        });

        gsap.from('.llm-terminal', {
            y: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.llm-terminal', start: 'top 85%', toggleActions: 'play none none reverse' }
        });

        gsap.from('.llm-pricing', {
            y: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.llm-pricing', start: 'top 85%', toggleActions: 'play none none reverse' }
        });

        gsap.from('.llm-marquee-section', {
            y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.llm-marquee-section', start: 'top 90%', toggleActions: 'play none none reverse' }
        });
    }, { scope: containerRef });

    const getStyleColor = (style: string) => {
        switch (style) {
            case 'keyword': return 'var(--syntax-keyword)';
            case 'string': return 'var(--syntax-string)';
            case 'string-highlight': return 'var(--syntax-string)';
            default: return '#d4d4d8';
        }
    };

    return (
        <section ref={containerRef} style={{
            padding: '100px 0',
            background: 'var(--background)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
                {/* Header */}
                <div className="llm-heading" style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--syntax-comment)', marginBottom: '16px' }}>
                        {'// MULTI_MODEL_INTELLIGENCE'}
                    </p>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '12px' }}>
                        Powered by the Best Models
                    </h2>
                    <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '500px', margin: '0 auto', fontFamily: 'var(--font-body)' }}>
                        Choose from free, premium, and provider-backed models to power your marketing agent.
                    </p>
                </div>

                {/* Terminal code block with line-by-line reveal */}
                <div className="llm-terminal">
                    <div className="terminal-card" style={{ marginBottom: '32px' }}>
                        <div className="terminal-card-header">
                            <div className="terminal-dots"><span /><span /><span /></div>
                            <span style={{ color: '#6b7280', fontSize: '11px', marginLeft: '8px' }}>models.config.ts</span>
                        </div>
                        <div style={{ padding: '24px', fontSize: '14px', lineHeight: 2, fontFamily: 'var(--font-mono)' }}>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ color: '#4a4a5a', userSelect: 'none', textAlign: 'right', minWidth: '24px' }}>
                                    {codeLines.map((_, i) => (
                                        <div key={i} className="code-line">{i + 1}</div>
                                    ))}
                                </div>
                                <div>
                                    {codeLines.map((line, i) => (
                                        <div key={i} className="code-line" style={{
                                            position: 'relative',
                                        }}>
                                            {line.style === 'string-highlight' && (
                                                <span style={{
                                                    position: 'absolute',
                                                    inset: '-4px -8px',
                                                    borderRadius: '4px',
                                                    border: '1px solid rgba(255,107,0,0.3)',
                                                    backgroundColor: 'rgba(255,107,0,0.05)',
                                                    pointerEvents: 'none',
                                                }} />
                                            )}
                                            <span style={{ color: getStyleColor(line.style) }}>
                                                {line.text}
                                            </span>
                                            {line.style === 'string-highlight' && (
                                                <span style={{ color: 'var(--syntax-comment)', marginLeft: '8px' }}>{'// ★ recommended'}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Model Pricing — Horizontal Cards */}
                <div className="llm-pricing" style={{ marginBottom: '40px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--syntax-comment)', marginBottom: '12px' }}>
                            {'// CREDIT_USAGE'}
                        </p>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '8px' }}>
                            LLM Model Pricing
                        </h3>
                    </div>

                    {/* Model Tabs */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px', marginBottom: '20px' }}>
                        {modelTabs.map((tab) => (
                            <button key={tab.id} onClick={() => setActiveModelTab(tab.id)} style={{
                                fontFamily: 'var(--font-mono)', fontSize: '12px', padding: '8px 16px',
                                borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 500,
                                transition: 'all 0.3s ease',
                                backgroundColor: activeModelTab === tab.id ? 'var(--terminal-bg)' : 'rgba(255,255,255,0.6)',
                                color: activeModelTab === tab.id ? '#d4d4d8' : 'var(--muted)',
                            }}>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Horizontal Model Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {llmModels[activeModelTab].models.map((model, i) => (
                            <div
                                key={i}
                                onMouseEnter={() => setHoveredRow(i)}
                                onMouseLeave={() => setHoveredRow(null)}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr auto auto',
                                    gap: '8px 16px',
                                    alignItems: 'center',
                                    padding: '14px 20px',
                                    borderRadius: '12px',
                                    border: '1px solid',
                                    borderColor: hoveredRow === i ? 'rgba(255,107,0,0.3)' : 'var(--border)',
                                    backgroundColor: hoveredRow === i ? 'rgba(255,107,0,0.03)' : 'rgba(255,255,255,0.6)',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Hover underline */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    height: '2px',
                                    width: '100%',
                                    background: 'linear-gradient(to right, var(--primary), var(--primary-light))',
                                    transform: hoveredRow === i ? 'scaleX(1)' : 'scaleX(0)',
                                    transformOrigin: 'left center',
                                    transition: 'transform 0.4s ease',
                                }} />

                                {/* Model name + indicators */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    {model.isFree && (
                                        <span style={{
                                            width: '8px', height: '8px', borderRadius: '50%',
                                            backgroundColor: '#2ecc71',
                                            boxShadow: '0 0 6px rgba(46,204,113,0.4)',
                                            display: 'inline-block',
                                            animation: 'glowPulse 2s ease-in-out infinite',
                                        }} />
                                    )}
                                    <span style={{
                                        fontFamily: 'var(--font-mono)', fontSize: '13px',
                                        color: 'var(--foreground)', fontWeight: 600,
                                    }}>
                                        {model.name}
                                    </span>
                                    {model.recommended && (
                                        <span style={{
                                            fontSize: '10px',
                                            fontWeight: 700,
                                            padding: '3px 10px',
                                            borderRadius: '9999px',
                                            background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                                            color: '#ffffff',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            animation: 'glowPulse 3s ease-in-out infinite',
                                        }}>
                                            Recommended
                                        </span>
                                    )}
                                </div>

                                {/* Input credits */}
                                <span style={{
                                    fontFamily: 'var(--font-mono)', fontSize: '12px',
                                    color: model.isFree ? '#2ecc71' : 'var(--muted)',
                                    fontWeight: model.isFree ? 700 : 400,
                                    whiteSpace: 'nowrap',
                                }}>
                                    {model.inputCredits}
                                </span>

                                {/* Output credits */}
                                <span style={{
                                    fontFamily: 'var(--font-mono)', fontSize: '12px',
                                    color: model.isFree ? '#2ecc71' : 'var(--muted)',
                                    fontWeight: model.isFree ? 700 : 400,
                                    whiteSpace: 'nowrap',
                                }}>
                                    {model.outputCredits}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Provider Logos — Infinite Marquee */}
                <div className="llm-marquee-section" style={{
                    marginBottom: '40px',
                    overflow: 'hidden',
                    position: 'relative',
                }}>
                    <div className="mask-image-gradient">
                        <div className="animate-marquee-scroll" style={{
                            display: 'flex',
                            gap: '16px',
                            width: 'max-content',
                        }}>
                            {/* Double the providers for seamless loop */}
                            {[...providers, ...providers].map((provider, i) => (
                                <div key={`${provider.name}-${i}`} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 16px',
                                    backgroundColor: 'rgba(255,255,255,0.6)',
                                    borderRadius: '9999px',
                                    border: '1px solid var(--border)',
                                    fontSize: '13px',
                                    fontFamily: 'var(--font-mono)',
                                    color: 'var(--muted)',
                                    flexShrink: 0,
                                }}>
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: provider.color }} />
                                    {provider.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div style={{ textAlign: 'center' }}>
                    <Link
                        href="/pricing"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            padding: '12px 24px', fontSize: '14px', fontFamily: 'var(--font-mono)', fontWeight: 500,
                            color: 'var(--foreground)', backgroundColor: 'rgba(255,255,255,0.6)',
                            border: '1px solid var(--border)', borderRadius: '9999px',
                            textDecoration: 'none', transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--primary)';
                            e.currentTarget.style.backgroundColor = 'rgba(140, 59, 31, 0.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border)';
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.6)';
                        }}
                    >
                        <span style={{ color: 'var(--cmd-prefix)', fontSize: '12px' }}>$</span>
                        explore_models
                        <span>&rarr;</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LLMModels;
