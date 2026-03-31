'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const WORDS = ['Campaigns', 'Analytics', 'Content', 'Ads', 'SEO'];
const WORD_COLORS: Record<string, string> = {
    Campaigns: '#FF6B00', Analytics: '#8B5CF6', Content: '#10B981', Ads: '#3B82F6', SEO: '#F59E0B',
};


/* ═══ Wireframe Mesh Background ═══ */
function WireframeMesh() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        let time = 0;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            canvas.width = canvas.offsetWidth * dpr;
            canvas.height = canvas.offsetHeight * dpr;
            ctx.scale(dpr, dpr);
        };
        resize();
        window.addEventListener('resize', resize);

        // Generate points on an organic blob shape
        const POINTS = 180;
        const CONNECTIONS_DIST = 90;
        const basePoints: { bx: number; by: number; bz: number }[] = [];

        for (let i = 0; i < POINTS; i++) {
            // Distribute on a sphere-like blob
            const phi = Math.acos(1 - 2 * (i + 0.5) / POINTS);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;
            const r = 200 + Math.random() * 40;
            basePoints.push({
                bx: r * Math.sin(phi) * Math.cos(theta),
                by: r * Math.sin(phi) * Math.sin(theta) * 0.65, // flatten Y
                bz: r * Math.cos(phi),
            });
        }

        const draw = () => {
            time += 0.003;
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            ctx.clearRect(0, 0, w, h);

            const cx = w / 2;
            const cy = h / 2 - 20;

            // Project 3D to 2D with slow rotation
            const cosA = Math.cos(time);
            const sinA = Math.sin(time);
            const cosB = Math.cos(time * 0.7);
            const sinB = Math.sin(time * 0.7);

            const projected = basePoints.map(p => {
                // Rotate Y-axis
                let x = p.bx * cosA - p.bz * sinA;
                let z = p.bx * sinA + p.bz * cosA;
                let y = p.by;
                // Rotate X-axis slightly
                const y2 = y * cosB - z * sinB;
                const z2 = y * sinB + z * cosB;
                // Add organic wobble
                const wobble = Math.sin(time * 2 + p.bx * 0.01) * 8;
                // Perspective
                const perspective = 600 / (600 + z2);
                return {
                    x: cx + (x + wobble) * perspective,
                    y: cy + (y2 + wobble * 0.5) * perspective,
                    z: z2,
                    perspective,
                };
            });

            // Draw connections
            for (let i = 0; i < projected.length; i++) {
                for (let j = i + 1; j < projected.length; j++) {
                    const dx = projected[i].x - projected[j].x;
                    const dy = projected[i].y - projected[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTIONS_DIST) {
                        const alpha = (1 - dist / CONNECTIONS_DIST) * 0.15 * Math.min(projected[i].perspective, projected[j].perspective);
                        // Every 7th connection is orange accent
                        if ((i + j) % 7 === 0) {
                            ctx.strokeStyle = `rgba(255,107,0,${alpha * 2.5})`;
                            ctx.lineWidth = 0.8;
                        } else {
                            ctx.strokeStyle = `rgba(120,120,130,${alpha})`;
                            ctx.lineWidth = 0.5;
                        }
                        ctx.beginPath();
                        ctx.moveTo(projected[i].x, projected[i].y);
                        ctx.lineTo(projected[j].x, projected[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw points
            projected.forEach((p, i) => {
                const size = 1.2 * p.perspective;
                const isAccent = i % 11 === 0;
                ctx.fillStyle = isAccent ? `rgba(255,107,0,${0.6 * p.perspective})` : `rgba(140,140,150,${0.3 * p.perspective})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full"
            style={{ opacity: 0.55 }}
        />
    );
}

/* ── Cycling word ── */
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
        <span className="relative inline-block">
            <span ref={wordRef} className="inline-block" style={{ color }}>{word}</span>
            <span className="absolute bottom-[-4px] left-0 right-0 h-1 rounded-sm" style={{ background: `linear-gradient(90deg, ${color}, ${color}60)` }} />
        </span>
    );
}

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const tl = gsap.timeline();

        /* No opacity animations — elements are always visible.
           Only subtle y-translate for entrance feel. */
        gsap.from('.hero-word', { y: 30, duration: 0.8, stagger: 0.06, ease: 'power3.out', delay: 0.2 });
        gsap.from('.hero-cycling', { y: 20, duration: 0.6, ease: 'power3.out', delay: 0.7 });
        gsap.from('.hero-subtitle', { y: 15, duration: 0.5, delay: 0.9 });
        gsap.from('.hero-cta', { y: 10, duration: 0.4, stagger: 0.08, delay: 1.1 });
        gsap.from('.hero-proof', { y: 10, duration: 0.4, delay: 1.3 });
    }, { scope: heroRef });

    return (
        <section id="hero-section" ref={heroRef} className="relative overflow-hidden min-h-screen flex items-center" style={{
            background: 'var(--bg-primary)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 92%, transparent 100%)',
        }}>

            {/* Wireframe mesh background */}
            <WireframeMesh />

            {/* Content */}
            <div className="relative z-10 max-w-[900px] mx-auto px-6 py-40 text-center">
                {/* Trust badge */}
                <div className="mb-8 hero-cta">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 border rounded-full text-sm" style={{ background: 'var(--orange-50)', borderColor: 'rgba(255,107,0,0.2)' }}>
                        <span style={{ color: 'var(--orange)' }}>✨</span>
                        <span style={{ color: 'var(--orange)', fontWeight: 600 }}>Trusted by 2,400+ marketing teams</span>
                    </div>
                </div>

                {/* Headline */}
                <h1 className="font-heading leading-[1.05] tracking-[-0.04em] mb-2" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 7vw, 5rem)' }}>
                    {['AI', 'agents', 'that', 'run'].map((word, i) => (
                        <span key={i} className="hero-word inline-block mr-[0.25em]" style={{
                            fontWeight: ['AI', 'agents'].includes(word) ? 800 : 400,
                            color: word === 'AI' ? '#FF6B00' : 'var(--text-primary)',
                        }}>{word}</span>
                    ))}
                    <br />
                    <span className="hero-word inline-block mr-[0.25em]" style={{ fontWeight: 400, color: 'var(--text-primary)' }}>your</span>
                    <span className="hero-cycling inline-block">
                        <CyclingWord words={WORDS} />
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle leading-relaxed max-w-[560px] mx-auto mt-7 mb-10" style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', color: 'var(--text-secondary)' }}>
                    Autonomous agents that plan, create, and optimize your marketing across every channel. Measurable results in days.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <a href="https://app.openanalyst.com" className="hero-cta btn-primary no-underline inline-flex items-center gap-2" style={{ fontSize: 16, padding: '15px 32px' }}>
                        Start free trial
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                    <a href="#how-it-works" className="hero-cta btn-outline no-underline inline-flex items-center gap-2" style={{ fontSize: 16, padding: '15px 32px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16" fill="currentColor" stroke="none" /></svg>
                        See how it works
                    </a>
                </div>

                {/* Social proof */}
                <div className="hero-proof flex items-center justify-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <div className="flex">
                        {['Maren', 'Kael', 'Priya'].map((s, i) => (
                            <img key={s} src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${s}&backgroundColor=${['ffd5dc', 'c0aede', 'b6e3f4'][i]}`}
                                alt="" width={32} height={32}
                                className="rounded-full relative" style={{ width: 32, height: 32, marginLeft: i > 0 ? -10 : 0, zIndex: 3 - i, background: 'var(--bg-surface)', border: '2px solid var(--bg-primary)' }}
                            />
                        ))}
                    </div>
                    <span><strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>2,400+</strong> teams</span>
                    <span style={{ width: 1, height: 16, background: 'var(--border)' }} />
                    <span className="flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>4.9</strong>/5
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
