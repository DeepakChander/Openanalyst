'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header, Footer } from '@/components';
import Magnetic from '@/components/Magnetic';

gsap.registerPlugin(ScrollTrigger);

const featuredAgent = {
    name: 'AI Vibe Marketer',
    filename: 'ai-vibe-marketer.ts',
    desc: 'Full-stack marketing agent that plans, creates, and optimizes campaigns across every channel. The AI Vibe Marketer handles everything from audience segmentation and content creation to real-time budget optimization and ROI tracking.',
    jsdoc: '/** @description Orchestrates end-to-end marketing campaigns with multi-channel optimization, A/B testing, and real-time performance analytics. */',
    command: '$ deploy_agent --name ai-vibe-marketer --mode production',
    terminalLines: [
        '$ openanalyst run ai-vibe-marketer',
        '✓ Loading campaign configuration...',
        '✓ Analyzing target audience (3,200 profiles)',
        '✓ Generating ad creatives (4 variants)',
        '✓ Deploying across 3 channels...',
        '◼ Campaign live. Monitoring ROI...',
    ],
};

const otherAgents = [
    {
        name: 'Content Strategist',
        filename: 'content-strategist.ts',
        desc: 'AI-powered content planning, creation, and distribution strategy.',
        command: '$ deploy_agent --name content-strategist',
        accent: '#3b82f6',
    },
    {
        name: 'Market Researcher',
        filename: 'market-researcher.ts',
        desc: 'Comprehensive market research with competitor analysis and trend forecasting.',
        command: '$ deploy_agent --name market-researcher',
        accent: '#2ecc71',
    },
    {
        name: 'Customer Insights',
        filename: 'customer-insights.ts',
        desc: 'Deep customer segmentation, behavior analysis, and predictive modeling.',
        command: '$ deploy_agent --name customer-insights',
        accent: '#f59e0b',
    },
    {
        name: 'Ad Campaign Manager',
        filename: 'ad-campaign-manager.ts',
        desc: 'Automated ad campaign creation, A/B testing, and budget optimization.',
        command: '$ deploy_agent --name ad-campaign-manager',
        accent: '#8b5cf6',
    },
    {
        name: 'SEO Specialist',
        filename: 'seo-specialist.ts',
        desc: 'AI-driven SEO optimization, keyword research, and content gap analysis.',
        command: '$ deploy_agent --name seo-specialist',
        accent: '#ec4899',
    },
];

export default function SolutionsPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const [typedLines, setTypedLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    const handleCardHover = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, { rotateY: x * 6, rotateX: -y * 4, duration: 0.3, ease: 'power2.out' });
    }, []);

    const handleCardLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    }, []);

    // Typing animation for featured agent terminal
    useEffect(() => {
        let lineIndex = 0;
        let charIndex = 0;
        let timer: ReturnType<typeof setTimeout>;
        const lines = featuredAgent.terminalLines;

        const type = () => {
            if (lineIndex >= lines.length) return;
            const line = lines[lineIndex];
            const speed = line.startsWith('$') ? 25 : 12;

            if (charIndex <= line.length) {
                setCurrentLine(line.slice(0, charIndex));
                charIndex++;
                timer = setTimeout(type, speed);
            } else {
                setTypedLines(prev => [...prev, line]);
                setCurrentLine('');
                lineIndex++;
                charIndex = 0;
                timer = setTimeout(type, line.startsWith('$') ? 400 : 120);
            }
        };

        timer = setTimeout(type, 800);
        const cursorInterval = setInterval(() => setShowCursor(prev => !prev), 530);

        return () => {
            clearTimeout(timer);
            clearInterval(cursorInterval);
        };
    }, []);

    useGSAP(() => {
        gsap.from('.solutions-hero', {
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        });

        gsap.from('.featured-agent', {
            y: 60, opacity: 0, filter: 'blur(4px)', duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '.featured-agent', start: 'top 85%', toggleActions: 'play none none reverse' }
        });

        const cards = gsap.utils.toArray<HTMLElement>('.agent-bento-card');
        gsap.from(cards, {
            y: 50, opacity: 0, scale: 0.95, stagger: 0.08, duration: 0.6, ease: 'back.out(1.2)',
            scrollTrigger: { trigger: '.agents-bento', start: 'top 85%', toggleActions: 'play none none reverse' }
        });
    }, { scope: pageRef });

    return (
        <div ref={pageRef} style={{ minHeight: '100vh', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
            <Header />
            <main style={{ paddingTop: '120px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
                    {/* Hero */}
                    <div className="solutions-hero" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--syntax-comment)', marginBottom: '16px' }}>
                            {'/** @section AI_AGENTS */'}
                        </p>
                        <h1 style={{
                            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800,
                            lineHeight: 1.1, marginBottom: '20px',
                        }}>
                            Solutions by <span className="text-gradient">Agents</span>
                        </h1>
                        <p style={{ fontSize: '18px', color: 'var(--muted)', maxWidth: '550px', margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
                            Deploy specialized AI marketing agents tailored for your specific campaigns and growth goals.
                        </p>
                    </div>

                    {/* Featured Agent — Full Width Hero Card */}
                    <div className="featured-agent" style={{ marginBottom: '40px' }}>
                        <div className="terminal-card glow-border" style={{
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            {/* Most Popular badge */}
                            <div style={{
                                position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)',
                                backgroundColor: 'var(--primary)', color: '#ffffff', fontSize: '10px',
                                fontWeight: 700, padding: '4px 20px', borderRadius: '0 0 10px 10px',
                                textTransform: 'uppercase', letterSpacing: '0.1em', zIndex: 3,
                            }}>
                                Most Popular
                            </div>

                            <div className="terminal-card-header">
                                <div className="terminal-dots"><span /><span /><span /></div>
                                <span style={{ color: '#6b7280', fontSize: '11px', marginLeft: '8px' }}>{featuredAgent.filename}</span>
                                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#39ff14', boxShadow: '0 0 6px rgba(57,255,20,0.4)' }} />
                                    <span style={{ fontSize: '10px', color: '#4a5568', fontFamily: 'var(--font-mono)' }}>production</span>
                                </div>
                            </div>

                            <div className="featured-inner-grid" style={{
                                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0',
                            }}>
                                {/* Left: Info */}
                                <div style={{ padding: '32px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                                    <h2 style={{
                                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                                        fontWeight: 700, color: '#ffffff', marginBottom: '12px',
                                    }}>
                                        {featuredAgent.name}
                                    </h2>
                                    <p style={{
                                        fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--syntax-comment)',
                                        marginBottom: '16px', lineHeight: 1.8,
                                    }}>
                                        {featuredAgent.jsdoc}
                                    </p>
                                    <p style={{ fontSize: '14px', color: '#a89890', lineHeight: 1.7, marginBottom: '24px' }}>
                                        {featuredAgent.desc}
                                    </p>
                                    <Magnetic>
                                        <a href="https://app.openanalyst.com" style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                                            padding: '12px 24px', fontSize: '13px', fontFamily: 'var(--font-mono)', fontWeight: 600,
                                            color: '#ffffff', backgroundColor: 'var(--primary)', borderRadius: '9999px',
                                            textDecoration: 'none', transition: 'all 0.3s ease',
                                        }}>
                                            <span style={{ color: 'var(--cmd-prefix)', fontSize: '12px' }}>$</span>
                                            deploy_agent
                                        </a>
                                    </Magnetic>
                                </div>

                                {/* Right: Typing terminal */}
                                <div style={{ padding: '24px', backgroundColor: 'rgba(0,0,0,0.15)', minHeight: '240px' }}>
                                    <div style={{ fontSize: '13px', lineHeight: 1.9, fontFamily: 'var(--font-mono)' }}>
                                        {typedLines.map((line, i) => (
                                            <div key={i} style={{
                                                color: line.startsWith('$') ? '#39ff14' :
                                                       line.startsWith('✓') ? '#98c379' :
                                                       '#e5c07b',
                                            }}>
                                                {line}
                                            </div>
                                        ))}
                                        {typedLines.length < featuredAgent.terminalLines.length && (
                                            <div>
                                                <span style={{
                                                    color: currentLine.startsWith('$') ? '#39ff14' :
                                                           currentLine.startsWith('✓') ? '#98c379' : '#d4d4d8',
                                                }}>
                                                    {currentLine}
                                                </span>
                                                <span style={{
                                                    opacity: showCursor ? 1 : 0,
                                                    color: 'var(--primary)',
                                                    transition: 'opacity 0.1s',
                                                    fontWeight: 700,
                                                }}>▋</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Other Agents — Asymmetric Bento Grid */}
                    <div className="agents-bento" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        gap: '16px',
                    }}>
                        {otherAgents.map((agent, i) => {
                            // Asymmetric: first 2 span 3 cols, last 3 span 2 cols
                            const isWide = i < 2;
                            return (
                                <div key={agent.name} className="agent-bento-card" style={{
                                    gridColumn: isWide ? 'span 3' : 'span 2',
                                    perspective: '800px',
                                }}>
                                    <div
                                        onMouseMove={handleCardHover}
                                        onMouseLeave={handleCardLeave}
                                        style={{ willChange: 'transform', transformStyle: 'preserve-3d', height: '100%' }}
                                    >
                                        <div style={{
                                            padding: '24px',
                                            borderRadius: '16px',
                                            backgroundColor: 'var(--surface)',
                                            border: `1px solid var(--border)`,
                                            transition: 'all 0.3s ease',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            cursor: 'default',
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}
                                            onMouseEnter={(e) => {
                                                (e.currentTarget as HTMLElement).style.borderColor = agent.accent;
                                                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${agent.accent}15`;
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                                                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                            }}
                                        >
                                            {/* Accent dot */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                                <span style={{
                                                    width: '10px', height: '10px', borderRadius: '50%',
                                                    backgroundColor: agent.accent,
                                                    boxShadow: `0 0 8px ${agent.accent}40`,
                                                }} />
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)' }}>{agent.filename}</span>
                                            </div>

                                            <h3 style={{
                                                fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700,
                                                color: 'var(--foreground)', marginBottom: '8px',
                                            }}>
                                                {agent.name}
                                            </h3>
                                            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '16px', fontFamily: 'var(--font-body)', flex: 1 }}>
                                                {agent.desc}
                                            </p>

                                            {/* Deploy command */}
                                            <div style={{
                                                backgroundColor: 'var(--terminal-bg)', borderRadius: '8px',
                                                padding: '8px 12px', marginBottom: '12px',
                                            }}>
                                                <code style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--syntax-string)' }}>
                                                    {agent.command}
                                                </code>
                                            </div>

                                            <a href="https://app.openanalyst.com" style={{
                                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                fontSize: '13px', fontFamily: 'var(--font-mono)', fontWeight: 600,
                                                color: agent.accent, textDecoration: 'none', transition: 'gap 0.3s ease',
                                            }}>
                                                <span style={{ fontSize: '11px' }}>$</span>
                                                deploy_agent
                                                <span>&rarr;</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <style>{`
                    @media (max-width: 768px) {
                        .featured-inner-grid {
                            grid-template-columns: 1fr !important;
                        }
                        .agents-bento {
                            grid-template-columns: 1fr !important;
                        }
                        .agents-bento > * {
                            grid-column: span 1 !important;
                        }
                    }
                `}</style>
            </main>
            <Footer />
        </div>
    );
}
