'use client';

import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

gsap.registerPlugin(useGSAP);

const WORDS = ['Campaigns', 'Analytics', 'Content', 'Ads', 'SEO'];
const WORD_COLORS: Record<string, string> = {
    Campaigns: '#FF6B00',
    Analytics: '#8B5CF6',
    Content: '#10B981',
    Ads: '#3B82F6',
    SEO: '#F59E0B',
};

/* ── 3D Neural Mesh — Lives BEHIND the text as ambient depth ── */
function NeuralMesh() {
    const meshRef = useRef<THREE.Mesh>(null);
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);

    const { nodePositions, linePositions, particlePositions } = useMemo(() => {
        const nodes: number[] = [];
        const lines: number[] = [];
        const particles = new Float32Array(200 * 3);

        // Create nodes in a soft cloud shape
        const nodeCount = 40;
        for (let i = 0; i < nodeCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 2 + Math.random() * 2;
            nodes.push(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta) * 0.6, // flatten Y
                r * Math.cos(phi) * 0.5
            );
        }

        // Connect nearby nodes
        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                const dx = nodes[i * 3] - nodes[j * 3];
                const dy = nodes[i * 3 + 1] - nodes[j * 3 + 1];
                const dz = nodes[i * 3 + 2] - nodes[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (dist < 2.5) {
                    lines.push(nodes[i * 3], nodes[i * 3 + 1], nodes[i * 3 + 2]);
                    lines.push(nodes[j * 3], nodes[j * 3 + 1], nodes[j * 3 + 2]);
                }
            }
        }

        // Scattered particles
        for (let i = 0; i < 200; i++) {
            particles[i * 3] = (Math.random() - 0.5) * 12;
            particles[i * 3 + 1] = (Math.random() - 0.5) * 8;
            particles[i * 3 + 2] = (Math.random() - 0.5) * 4;
        }

        return {
            nodePositions: new Float32Array(nodes),
            linePositions: new Float32Array(lines),
            particlePositions: particles,
        };
    }, []);

    useFrame(({ clock, pointer }) => {
        const t = clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.03 + pointer.x * 0.1;
            meshRef.current.rotation.x = Math.sin(t * 0.02) * 0.05 + pointer.y * 0.05;
        }
    });

    return (
        <group ref={meshRef}>
            {/* Connection lines */}
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
                </bufferGeometry>
                <lineBasicMaterial color="#FF6B00" transparent opacity={0.06} />
            </lineSegments>

            {/* Node points */}
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
                </bufferGeometry>
                <pointsMaterial color="#FF6B00" size={0.06} transparent opacity={0.2} sizeAttenuation />
            </points>

            {/* Ambient particles */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
                </bufferGeometry>
                <pointsMaterial color="#FF6B00" size={0.02} transparent opacity={0.08} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
            </points>
        </group>
    );
}

/* ── Animated word with color transition ── */
function CyclingWord({ words }: { words: string[] }) {
    const [index, setIndex] = useState(0);
    const wordRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!wordRef.current) return;
            gsap.to(wordRef.current, {
                y: -16, opacity: 0, filter: 'blur(6px)', duration: 0.35, ease: 'power2.in',
                onComplete: () => {
                    setIndex(prev => (prev + 1) % words.length);
                    if (wordRef.current) {
                        gsap.fromTo(wordRef.current,
                            { y: 16, opacity: 0, filter: 'blur(6px)' },
                            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.45, ease: 'power2.out' }
                        );
                    }
                }
            });
        }, 2800);
        return () => clearInterval(interval);
    }, [words]);

    const word = words[index];
    const color = WORD_COLORS[word] || '#FF6B00';

    return (
        <span style={{ position: 'relative', display: 'inline-block' }}>
            <span ref={wordRef} style={{
                display: 'inline-block', color,
                transition: 'color 0.3s ease',
            }}>{word}</span>
            <span style={{
                position: 'absolute', bottom: -4, left: 0, right: 0,
                height: 4, borderRadius: 2,
                background: `linear-gradient(90deg, ${color}, ${color}60)`,
            }} />
        </span>
    );
}

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Staggered word-by-word headline reveal with IRREGULAR timing
        tl.from('.hero-word', {
            y: 80, opacity: 0, filter: 'blur(8px)', rotateX: 40,
            stagger: { each: 0.08, from: 'start' },
            duration: 1, ease: 'power4.out',
        }, 0.3);

        tl.from('.hero-cycling', {
            y: 40, opacity: 0, scale: 0.9, duration: 0.8, ease: 'back.out(1.4)',
        }, 0.9);

        tl.from('.hero-subtitle', {
            y: 20, opacity: 0, filter: 'blur(4px)', duration: 0.7,
        }, 1.2);

        tl.from('.hero-cta', {
            y: 16, opacity: 0, stagger: 0.1, duration: 0.5,
        }, 1.5);

        tl.from('.hero-proof', {
            y: 12, opacity: 0, duration: 0.5,
        }, 1.8);

        tl.from('.hero-mesh-container', {
            opacity: 0, scale: 0.9, duration: 1.5, ease: 'power2.out',
        }, 0.1);

    }, { scope: heroRef });

    return (
        <section id="hero-section" ref={heroRef} style={{
            position: 'relative', overflow: 'hidden',
            background: 'var(--bg-primary)',
            minHeight: '100vh',
            display: 'flex', alignItems: 'center',
        }}>
            {/* ── 3D mesh lives BEHIND everything ── */}
            <div className="hero-mesh-container hide-mobile" style={{
                position: 'absolute', inset: 0, zIndex: 1,
                opacity: 0.5,
            }}>
                <Suspense fallback={null}>
                    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ alpha: true, antialias: true }} style={{ width: '100%', height: '100%' }}>
                        <ambientLight intensity={0.3} />
                        <pointLight position={[5, 5, 5]} intensity={0.4} color="#FF6B00" />
                        <NeuralMesh />
                    </Canvas>
                </Suspense>
            </div>

            {/* ── Warm radial gradient for depth ── */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                background: 'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, var(--bg-primary) 70%)',
            }} />

            {/* ── Subtle dot grid ── */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', opacity: 0.4,
                backgroundImage: 'radial-gradient(circle, rgba(255,107,0,0.08) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
                maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 70%)',
            }} />

            {/* ── Main Content — Centered ── */}
            <div style={{
                position: 'relative', zIndex: 10,
                maxWidth: 900, margin: '0 auto',
                padding: '160px 24px 100px',
                textAlign: 'center',
            }}>
                {/* Headline — word-by-word with variable weights */}
                <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(3rem, 7vw, 5rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.04em',
                    marginBottom: 8,
                    perspective: 1000,
                }}>
                    {['AI', 'agents', 'that', 'run'].map((word, i) => (
                        <span key={i} className="hero-word" style={{
                            display: 'inline-block', marginRight: '0.25em',
                            fontWeight: ['AI', 'agents'].includes(word) ? 800 : 400,
                            color: word === 'AI' ? 'var(--orange)' : 'var(--text-primary)',
                        }}>{word}</span>
                    ))}
                    <br />
                    <span className="hero-word" style={{
                        display: 'inline-block', marginRight: '0.25em',
                        fontWeight: 400, color: 'var(--text-primary)',
                    }}>your</span>
                    <span className="hero-cycling" style={{ display: 'inline-block' }}>
                        <CyclingWord words={WORDS} />
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle" style={{
                    fontSize: 'clamp(16px, 1.8vw, 19px)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    maxWidth: 520, margin: '28px auto 40px',
                }}>
                    Autonomous agents that plan, create, and optimize your marketing
                    across every channel. Measurable results in days, not months.
                </p>

                {/* CTAs */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginBottom: 48 }}>
                    <a href="https://app.openanalyst.com" className="hero-cta btn-primary" style={{ fontSize: 15, padding: '15px 32px' }}>
                        Start free trial
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                    <a href="#how-it-works" className="hero-cta btn-outline" style={{ fontSize: 15, padding: '15px 32px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16" fill="currentColor" stroke="none" /></svg>
                        See how it works
                    </a>
                </div>

                {/* Social proof */}
                <div className="hero-proof" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 16, fontSize: 14, color: 'var(--text-muted)',
                }}>
                    <div style={{ display: 'flex' }}>
                        {['Maren', 'Kael', 'Priya'].map((s, i) => (
                            <img key={s}
                                src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${s}&backgroundColor=${['ffd5dc', 'c0aede', 'b6e3f4'][i]}`}
                                alt="" width={32} height={32}
                                style={{
                                    width: 32, height: 32, borderRadius: '50%',
                                    border: '2px solid var(--bg-primary)',
                                    marginLeft: i > 0 ? -10 : 0, zIndex: 3 - i,
                                    position: 'relative', background: 'var(--bg-surface)',
                                }}
                            />
                        ))}
                    </div>
                    <span><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>2,400+</strong> teams</span>
                    <span style={{ width: 1, height: 16, background: 'var(--border)' }} />
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>4.9</strong>/5
                    </span>
                </div>
            </div>

            {/* ── Bottom gradient fade ── */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, zIndex: 5,
                background: 'linear-gradient(transparent, var(--bg-primary))',
                pointerEvents: 'none',
            }} />
        </section>
    );
};

export default Hero;
