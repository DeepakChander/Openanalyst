'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════
   FLOATING MARKETING SVG ICONS BACKGROUND
   — Marketing-relevant icons floating at multiple depth layers
   with slow drift, subtle parallax, and ambient gradient orbs.
   Inspired by top SaaS hero patterns (Jasper, HubSpot, Copy.ai)
   ═══════════════════════════════════════════════════════════════ */

/* ─── Marketing SVG Icon Definitions ─── */
const ICONS = {
    // Email / Envelope
    email: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 4L12 13L2 4" />
        </svg>
    ),
    // Bar Chart
    barChart: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="12" width="4" height="9" rx="1" />
            <rect x="10" y="7" width="4" height="14" rx="1" />
            <rect x="17" y="3" width="4" height="18" rx="1" />
        </svg>
    ),
    // Target / Bullseye
    target: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    ),
    // Megaphone
    megaphone: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a3 3 0 0 1 0 6" />
            <path d="M4 9h2l7-4v14l-7-4H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z" />
        </svg>
    ),
    // Trending Up
    trendUp: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
        </svg>
    ),
    // Users / Audience
    users: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    // Sparkles / AI
    sparkles: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
        </svg>
    ),
    // Pie Chart
    pieChart: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
            <path d="M22 12A10 10 0 0 0 12 2v10z" />
        </svg>
    ),
    // Zap / Lightning
    zap: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    ),
    // Globe / Multi-channel
    globe: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    ),
    // Dollar / ROI
    dollarSign: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    ),
    // Share / Social
    share: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
    ),
    // Funnel
    funnel: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
        </svg>
    ),
    // Heart / Engagement
    heart: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    ),
    // Cursor Click
    cursor: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4l7.07 17 2.51-7.39L21 11.07z" />
        </svg>
    ),
    // Bell / Notification
    bell: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
    ),
    // A/B Testing
    abTest: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="8" height="18" rx="2" />
            <rect x="14" y="3" width="8" height="18" rx="2" />
            <path d="M5 9h2M16 9h4M5 13h2M16 13h4" />
        </svg>
    ),
    // Search / SEO
    search: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    ),
};

type IconKey = keyof typeof ICONS;

/* ─── Floating Icon Configuration ─── */
interface FloatingIcon {
    icon: IconKey;
    x: number;       // % from left
    y: number;       // % from top
    size: number;    // px
    opacity: number;
    delay: number;   // animation delay in s
    duration: number; // animation duration in s
    driftX: number;  // horizontal drift range in px
    driftY: number;  // vertical drift range in px
    rotate: number;  // rotation range in degrees
    layer: 1 | 2 | 3; // depth layer (1=back, 3=front)
}

const FLOATING_ICONS: FloatingIcon[] = [
    // Layer 1 — Background (large, soft presence)
    { icon: 'barChart',   x: 8,  y: 12, size: 56, opacity: 0.15, delay: 0,    duration: 25, driftX: 15, driftY: 20, rotate: 8,  layer: 1 },
    { icon: 'target',     x: 85, y: 8,  size: 50, opacity: 0.13, delay: 3,    duration: 28, driftX: 12, driftY: 18, rotate: -6, layer: 1 },
    { icon: 'globe',      x: 45, y: 80, size: 58, opacity: 0.12, delay: 5,    duration: 30, driftX: 20, driftY: 15, rotate: 10, layer: 1 },
    { icon: 'pieChart',   x: 72, y: 70, size: 48, opacity: 0.14, delay: 8,    duration: 26, driftX: 18, driftY: 22, rotate: -8, layer: 1 },
    { icon: 'users',      x: 20, y: 75, size: 50, opacity: 0.12, delay: 2,    duration: 32, driftX: 14, driftY: 16, rotate: 5,  layer: 1 },
    { icon: 'funnel',     x: 60, y: 15, size: 44, opacity: 0.13, delay: 10,   duration: 27, driftX: 16, driftY: 20, rotate: -10, layer: 1 },

    // Layer 2 — Midground (medium, clearly visible)
    { icon: 'email',      x: 15, y: 28, size: 36, opacity: 0.22, delay: 1,    duration: 20, driftX: 10, driftY: 14, rotate: 12, layer: 2 },
    { icon: 'megaphone',  x: 78, y: 35, size: 34, opacity: 0.20, delay: 4,    duration: 22, driftX: 12, driftY: 16, rotate: -8, layer: 2 },
    { icon: 'trendUp',    x: 35, y: 55, size: 32, opacity: 0.24, delay: 6,    duration: 18, driftX: 8,  driftY: 12, rotate: 6,  layer: 2 },
    { icon: 'sparkles',   x: 55, y: 42, size: 30, opacity: 0.22, delay: 0.5,  duration: 19, driftX: 10, driftY: 10, rotate: 15, layer: 2 },
    { icon: 'dollarSign', x: 90, y: 55, size: 32, opacity: 0.18, delay: 7,    duration: 24, driftX: 8,  driftY: 14, rotate: -5, layer: 2 },
    { icon: 'heart',      x: 5,  y: 50, size: 28, opacity: 0.18, delay: 9,    duration: 21, driftX: 10, driftY: 12, rotate: 10, layer: 2 },
    { icon: 'search',     x: 42, y: 18, size: 30, opacity: 0.20, delay: 3.5,  duration: 23, driftX: 12, driftY: 10, rotate: -12, layer: 2 },
    { icon: 'abTest',     x: 68, y: 85, size: 34, opacity: 0.18, delay: 11,   duration: 25, driftX: 14, driftY: 18, rotate: 8,  layer: 2 },

    // Layer 3 — Foreground (smaller, most visible)
    { icon: 'zap',        x: 25, y: 15, size: 24, opacity: 0.30, delay: 2,    duration: 16, driftX: 6,  driftY: 8,  rotate: 20, layer: 3 },
    { icon: 'share',      x: 82, y: 50, size: 26, opacity: 0.28, delay: 5.5,  duration: 17, driftX: 8,  driftY: 10, rotate: -15, layer: 3 },
    { icon: 'cursor',     x: 50, y: 65, size: 22, opacity: 0.26, delay: 1.5,  duration: 15, driftX: 6,  driftY: 8,  rotate: 12, layer: 3 },
    { icon: 'bell',       x: 10, y: 90, size: 24, opacity: 0.24, delay: 8,    duration: 18, driftX: 8,  driftY: 6,  rotate: -10, layer: 3 },
    { icon: 'email',      x: 92, y: 25, size: 22, opacity: 0.26, delay: 4.5,  duration: 19, driftX: 6,  driftY: 10, rotate: 8,  layer: 3 },
    { icon: 'trendUp',    x: 70, y: 20, size: 26, opacity: 0.28, delay: 7.5,  duration: 14, driftX: 8,  driftY: 8,  rotate: -18, layer: 3 },
];

/* ─── Ambient Gradient Orbs ─── */
const GRADIENT_ORBS = [
    { x: '25%', y: '30%', w: '500px', h: '500px', color: 'rgba(255,107,0,0.12)', blur: 60 },
    { x: '70%', y: '55%', w: '450px', h: '450px', color: 'rgba(255,133,51,0.10)', blur: 70 },
    { x: '50%', y: '80%', w: '600px', h: '400px', color: 'rgba(255,107,0,0.07)', blur: 80 },
    { x: '10%', y: '60%', w: '350px', h: '350px', color: 'rgba(255,160,80,0.09)', blur: 50 },
];

/* ═══ Main Hero Background Component ═══ */
export default function HeroScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);
    const rafRef = useRef<number>(0);
    const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
    const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => { setMounted(true); }, []);

    // Mouse tracking for subtle parallax
    const handleMouse = useCallback((e: MouseEvent) => {
        mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Check reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        window.addEventListener('mousemove', handleMouse, { passive: true });

        // Parallax animation loop — icons shift slightly based on mouse
        const animate = () => {
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            iconRefs.current.forEach((el, i) => {
                if (!el) return;
                const icon = FLOATING_ICONS[i];
                const parallaxStrength = icon.layer === 1 ? 8 : icon.layer === 2 ? 14 : 22;
                const px = mx * parallaxStrength;
                const py = my * parallaxStrength;
                el.style.setProperty('--parallax-x', `${px}px`);
                el.style.setProperty('--parallax-y', `${py}px`);
            });

            orbRefs.current.forEach((el, i) => {
                if (!el) return;
                const strength = 10 + i * 5;
                el.style.setProperty('--parallax-x', `${mx * strength}px`);
                el.style.setProperty('--parallax-y', `${my * strength}px`);
            });

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouse);
            cancelAnimationFrame(rafRef.current);
        };
    }, [mounted, handleMouse]);

    if (!mounted) return null;

    const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
        return (
            <div style={{
                position: 'absolute', inset: 0,
                background: `
                    radial-gradient(ellipse 80% 60% at 30% 40%, rgba(255,107,0,0.06) 0%, transparent 60%),
                    radial-gradient(ellipse 60% 50% at 80% 60%, rgba(255,133,51,0.04) 0%, transparent 55%)
                `,
            }} />
        );
    }

    return (
        <div ref={containerRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {/* Ambient Gradient Orbs */}
            {GRADIENT_ORBS.map((orb, i) => (
                <div
                    key={`orb-${i}`}
                    ref={el => { orbRefs.current[i] = el; }}
                    style={{
                        position: 'absolute',
                        left: orb.x,
                        top: orb.y,
                        width: orb.w,
                        height: orb.h,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
                        filter: `blur(${orb.blur}px)`,
                        transform: 'translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px))',
                        pointerEvents: 'none',
                        willChange: 'transform',
                        animation: `heroOrbFloat${i} ${20 + i * 4}s ease-in-out infinite`,
                    }}
                />
            ))}

            {/* Thin connecting lines (decorative) */}
            <svg
                style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                    pointerEvents: 'none', opacity: 0.12,
                }}
                viewBox="0 0 1440 900"
                preserveAspectRatio="none"
            >
                <path d="M100,200 Q400,100 700,300 T1300,250" stroke="#FF6B00" strokeWidth="1" fill="none" />
                <path d="M200,600 Q600,400 900,550 T1400,500" stroke="#FF6B00" strokeWidth="0.8" fill="none" />
                <path d="M0,450 Q350,350 700,480 T1440,400" stroke="#FF8533" strokeWidth="0.6" fill="none" />
            </svg>

            {/* Floating Marketing Icons */}
            {FLOATING_ICONS.map((item, i) => (
                <div
                    key={`icon-${i}`}
                    ref={el => { iconRefs.current[i] = el; }}
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        width: `${item.size}px`,
                        height: `${item.size}px`,
                        color: '#FF6B00',
                        opacity: item.opacity,
                        pointerEvents: 'none',
                        willChange: 'transform',
                        transform: 'translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px))',
                        animation: `heroIconFloat${i % 6} ${item.duration}s ease-in-out ${item.delay}s infinite`,
                        filter: item.layer === 1 ? 'blur(0.5px)' : 'none',
                    }}
                >
                    {ICONS[item.icon]}
                </div>
            ))}

            {/* Injected keyframes for floating animations */}
            <style>{`
                @keyframes heroIconFloat0 {
                    0%, 100% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translateY(0px) translateX(0px) rotate(0deg); }
                    33% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translateY(-18px) translateX(12px) rotate(5deg); }
                    66% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translateY(10px) translateX(-8px) rotate(-3deg); }
                }
                @keyframes heroIconFloat1 {
                    0%, 100% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translateY(0px) translateX(0px) rotate(0deg); }
                    25% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translateY(14px) translateX(-10px) rotate(-4deg); }
                    50% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translateY(-12px) translateX(6px) rotate(6deg); }
                    75% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translateY(8px) translateX(14px) rotate(-2deg); }
                }
                @keyframes heroIconFloat2 {
                    0%, 100% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translateY(0px) translateX(0px) rotate(0deg); }
                    40% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translateY(-20px) translateX(-14px) rotate(8deg); }
                    70% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translateY(12px) translateX(10px) rotate(-5deg); }
                }
                @keyframes heroIconFloat3 {
                    0%, 100% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translateY(0px) translateX(0px) rotate(0deg); }
                    30% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translateY(16px) translateX(8px) rotate(-6deg); }
                    60% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translateY(-10px) translateX(-12px) rotate(4deg); }
                }
                @keyframes heroIconFloat4 {
                    0%, 100% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translateY(0px) translateX(0px) rotate(0deg); }
                    35% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translateY(-15px) translateX(16px) rotate(7deg); }
                    65% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translateY(14px) translateX(-6px) rotate(-4deg); }
                }
                @keyframes heroIconFloat5 {
                    0%, 100% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translateY(0px) translateX(0px) rotate(0deg); }
                    20% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translateY(12px) translateX(-14px) rotate(-8deg); }
                    50% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translateY(-18px) translateX(8px) rotate(5deg); }
                    80% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translateY(6px) translateX(12px) rotate(-3deg); }
                }
                @keyframes heroOrbFloat0 {
                    0%, 100% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) scale(1); }
                    50% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translate(20px, -15px) scale(1.08); }
                }
                @keyframes heroOrbFloat1 {
                    0%, 100% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) scale(1); }
                    50% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translate(-18px, 12px) scale(1.05); }
                }
                @keyframes heroOrbFloat2 {
                    0%, 100% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) scale(1); }
                    50% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translate(15px, 20px) scale(1.1); }
                }
                @keyframes heroOrbFloat3 {
                    0%, 100% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) scale(1); }
                    50% { transform: translate(-50%, -50%) translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) translate(-12px, -18px) scale(1.06); }
                }
                @media (prefers-reduced-motion: reduce) {
                    [style*="heroIconFloat"], [style*="heroOrbFloat"] {
                        animation: none !important;
                    }
                }
            `}</style>
        </div>
    );
}

/* ═══ Premium Animated Dashboard Mockup ═══ */

const miniSparklines: Record<string, string> = {
    campaigns: 'M0,14 L6,12 L12,13 L18,10 L24,11 L30,8 L36,9 L42,6 L48,7 L54,4 L60,3',
    leads:     'M0,16 L8,14 L16,12 L24,14 L32,9 L40,7 L48,5 L56,6 L60,2',
    roi:       'M0,15 L7,13 L14,14 L21,11 L28,12 L35,8 L42,6 L49,7 L56,4 L60,2',
};

export function DashboardMockup() {
    const dashRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (!mounted || !dashRef.current) return;
        import('gsap').then(({ gsap }) => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            const tl = gsap.timeline({ delay: 1.2 });
            tl.from(dashRef.current!, { y: 60, opacity: 0, duration: 1, ease: 'power3.out' }, 0);
            tl.from('.dash-metric-card', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 0.5);
            tl.from('.dash-bar', { scaleY: 0, transformOrigin: 'bottom', duration: 0.5, stagger: 0.05, ease: 'power2.out' }, 0.7);
            tl.from('.dash-line', { strokeDashoffset: 300, duration: 1.5, ease: 'power2.inOut' }, 0.8);
            tl.from('.dash-activity-item', { x: -20, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, 1.0);
            tl.from('.dash-notif', { scale: 0, opacity: 0, duration: 0.4, ease: 'back.out(2)' }, 1.4);
            tl.from('.dash-agent-pill', { scale: 0.8, opacity: 0, duration: 0.3, stagger: 0.06, ease: 'back.out(1.5)' }, 1.2);
        });
    }, [mounted]);

    if (!mounted) return null;

    const barHeights = [35, 52, 42, 68, 48, 75, 58, 82, 65, 50, 72, 88, 60, 78, 95];
    const metrics = [
        { label: 'Campaigns', value: '24', change: '+12%', spark: 'campaigns', icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        )},
        { label: 'Leads', value: '1.2K', change: '+34%', spark: 'leads', icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        )},
        { label: 'Avg. ROI', value: '340%', change: '+28%', spark: 'roi', icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
        )},
    ];
    const metricColors = ['#FF6B00', '#8B5CF6', '#10B981'];

    const activities = [
        { avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Zoe&size=24', text: 'Email campaign sent', detail: '2,400 recipients', time: '2m ago', color: '#3B82F6' },
        { avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Leo&size=24', text: 'A/B test completed', detail: 'Variant B won +18%', time: '8m ago', color: '#10B981' },
        { avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Mia&size=24', text: 'New audience segment', detail: '1,240 high-intent users', time: '15m ago', color: '#8B5CF6' },
    ];

    const agents = [
        { name: 'Content Writer', status: 'active', color: '#10B981' },
        { name: 'Ad Optimizer', status: 'active', color: '#10B981' },
        { name: 'SEO Analyst', status: 'queued', color: '#F59E0B' },
    ];

    return (
        <div ref={dashRef} style={{
            width: '100%', maxWidth: '580px',
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 32px 100px rgba(0,0,0,0.10), 0 8px 32px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)',
            overflow: 'hidden',
            transform: 'perspective(1200px) rotateY(-3deg) rotateX(1.5deg)',
            transformStyle: 'preserve-3d',
        }}>
            {/* ── Top Navigation Bar ── */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 20px',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                background: 'linear-gradient(180deg, rgba(250,250,250,0.8) 0%, rgba(255,255,255,0) 100%)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }} />
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FEBC2E' }} />
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '6px' }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'linear-gradient(135deg, #FF6B00, #FF8C3A)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
                        </div>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#666' }}>
                            OpenAnalyst
                        </span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '6px', background: '#F5F5F5', fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#999' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        Search...
                    </div>
                    <div className="dash-notif" style={{
                        padding: '3px 8px', borderRadius: '8px',
                        background: 'linear-gradient(135deg, #FF6B00, #FF8C3A)', color: '#fff',
                        fontSize: '9px', fontWeight: 700, fontFamily: 'var(--font-body)',
                        boxShadow: '0 2px 8px rgba(255,107,0,0.3)',
                    }}>3 NEW</div>
                </div>
            </div>

            {/* ── Metric Cards with Sparklines ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', padding: '14px 16px 10px' }}>
                {metrics.map((m, i) => (
                    <div key={i} className="dash-metric-card" style={{
                        borderRadius: '14px', padding: '12px',
                        background: 'linear-gradient(135deg, #FAFAFA 0%, #FFFFFF 100%)',
                        border: '1px solid rgba(0,0,0,0.04)',
                        position: 'relative', overflow: 'hidden',
                    }}>
                        {/* Subtle top accent line */}
                        <div style={{ position: 'absolute', top: 0, left: '12px', right: '12px', height: '2px', borderRadius: '0 0 2px 2px', background: metricColors[i], opacity: 0.5 }} />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>{m.label}</span>
                            <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: `${metricColors[i]}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{m.icon}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
                            <span className="dash-metric-value" style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800, color: '#1A1A1A', lineHeight: 1 }}>{m.value}</span>
                            <span className="dash-metric-value" style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>
                                {m.change}
                            </span>
                        </div>
                        {/* Mini sparkline */}
                        <svg width="100%" height="18" viewBox="0 0 60 18" preserveAspectRatio="none" style={{ display: 'block' }}>
                            <defs><linearGradient id={`spark${i}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={metricColors[i]} stopOpacity="0.15"/><stop offset="100%" stopColor={metricColors[i]} stopOpacity="0"/></linearGradient></defs>
                            <path d={miniSparklines[m.spark] + ' L60,18 L0,18 Z'} fill={`url(#spark${i})`} />
                            <path d={miniSparklines[m.spark]} fill="none" stroke={metricColors[i]} strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                ))}
            </div>

            {/* ── Chart Area — Premium Mixed Visualization ── */}
            <div style={{ padding: '6px 16px 14px' }}>
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#1A1A1A' }}>Performance</span>
                        <div style={{ display: 'flex', gap: '2px', background: '#F5F5F5', borderRadius: '7px', padding: '2px' }}>
                            {['Revenue', 'Clicks', 'Leads'].map((tab, ti) => (
                                <span key={tab} style={{
                                    fontFamily: 'var(--font-body)', fontSize: '9px', padding: '3px 10px', borderRadius: '5px',
                                    background: ti === 0 ? '#fff' : 'transparent',
                                    color: ti === 0 ? '#1A1A1A' : '#999', fontWeight: ti === 0 ? 600 : 400,
                                    boxShadow: ti === 0 ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                                }}>{tab}</span>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '2px', background: '#FF6B00' }} />
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '8px', color: '#999' }}>Revenue</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '6px', height: '2px', borderRadius: '1px', background: '#8B5CF6' }} />
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '8px', color: '#999' }}>Target</span>
                        </div>
                    </div>
                </div>

                {/* Chart container */}
                <div style={{ position: 'relative', height: '110px', marginBottom: '6px' }}>
                    {/* Y-axis */}
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: '16px', width: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        {['$48k', '$36k', '$24k', '$12k', '$0'].map(l => (
                            <span key={l} style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: '#d4d4d4', lineHeight: 1 }}>{l}</span>
                        ))}
                    </div>
                    {/* Grid lines */}
                    <div style={{ position: 'absolute', left: '32px', right: 0, top: 0, bottom: '16px' }}>
                        {[0, 1, 2, 3, 4].map(l => (
                            <div key={l} style={{
                                position: 'absolute', left: 0, right: 0, top: `${l * 25}%`, height: '1px',
                                background: l === 4 ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.03)',
                                ...(l === 0 ? {} : {}),
                            }}>
                                {l === 2 && <div style={{ position: 'absolute', right: 0, top: '-3px', width: '1px', height: '6px', background: 'rgba(0,0,0,0.06)' }} />}
                            </div>
                        ))}
                    </div>
                    {/* Bars */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: 'calc(100% - 16px)', paddingLeft: '32px' }}>
                        {barHeights.map((h, i) => {
                            const isLast = i === barHeights.length - 1;
                            const isRecent = i >= barHeights.length - 4;
                            const isHighlight = i === barHeights.length - 1;
                            return (
                                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px', height: '100%', justifyContent: 'flex-end', position: 'relative' }}>
                                    {/* Tooltip on last bar */}
                                    {isHighlight && (
                                        <div className="dash-notif" style={{
                                            position: 'absolute', top: '-4px',
                                            background: '#1A1A1A', color: '#fff', padding: '3px 7px', borderRadius: '6px',
                                            fontSize: '8px', fontWeight: 700, fontFamily: 'var(--font-mono)',
                                            whiteSpace: 'nowrap', zIndex: 2,
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        }}>
                                            $47.2k
                                            <div style={{ position: 'absolute', bottom: '-3px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: '6px', height: '6px', background: '#1A1A1A' }} />
                                        </div>
                                    )}
                                    <div className="dash-bar" style={{
                                        width: '100%', height: `${h}%`,
                                        borderRadius: isLast ? '5px 5px 2px 2px' : '3px 3px 1px 1px',
                                        background: isLast
                                            ? 'linear-gradient(180deg, #FF6B00 0%, #FF8C3A 60%, #FFB47A 100%)'
                                            : isRecent
                                                ? 'linear-gradient(180deg, rgba(255,107,0,0.40) 0%, rgba(255,107,0,0.15) 100%)'
                                                : 'linear-gradient(180deg, rgba(255,107,0,0.14) 0%, rgba(255,107,0,0.04) 100%)',
                                        boxShadow: isLast
                                            ? '0 4px 14px rgba(255,107,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)'
                                            : 'none',
                                        transition: 'height 0.3s ease',
                                    }} />
                                </div>
                            );
                        })}
                    </div>
                    {/* SVG overlays: area fill + trend line + target line */}
                    <svg style={{ position: 'absolute', left: '32px', top: 0, width: 'calc(100% - 32px)', height: 'calc(100% - 16px)', pointerEvents: 'none' }} viewBox="0 0 500 94" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.08" />
                                <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="chartLineGrad" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.3" />
                                <stop offset="70%" stopColor="#FF6B00" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#FF6B00" stopOpacity="1" />
                            </linearGradient>
                        </defs>
                        {/* Area fill */}
                        <path d="M0,72 C25,68 50,62 85,56 C120,50 150,53 190,44 C230,36 260,40 300,32 C340,24 370,28 410,18 C440,12 470,10 500,5 L500,94 L0,94 Z" fill="url(#chartAreaGrad)" />
                        {/* Main trend line */}
                        <path className="dash-line" d="M0,72 C25,68 50,62 85,56 C120,50 150,53 190,44 C230,36 260,40 300,32 C340,24 370,28 410,18 C440,12 470,10 500,5" fill="none" stroke="url(#chartLineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="600" strokeDashoffset="0" />
                        {/* Target/goal dashed line */}
                        <line x1="0" y1="38" x2="500" y2="38" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="4 4" opacity="0.35" />
                        {/* Active data point glow */}
                        <circle cx="500" cy="5" r="8" fill="rgba(255,107,0,0.12)" />
                        <circle cx="500" cy="5" r="4" fill="#FF6B00" />
                        <circle cx="500" cy="5" r="2" fill="#fff" />
                    </svg>
                </div>
                {/* X-axis month labels */}
                <div style={{ display: 'flex', paddingLeft: '32px', gap: '3px' }}>
                    {['Apr', '', 'Jun', '', 'Aug', '', 'Oct', '', 'Dec', '', 'Feb', '', 'Apr', '', 'Mar'].map((m, i) => (
                        <span key={i} style={{
                            flex: 1, textAlign: 'center',
                            fontFamily: 'var(--font-mono)', fontSize: '7px',
                            color: i === barHeights.length - 1 ? '#FF6B00' : '#d4d4d4',
                            fontWeight: i === barHeights.length - 1 ? 600 : 400,
                        }}>{m}</span>
                    ))}
                </div>
            </div>

            {/* ── Activity Feed ── */}
            <div style={{ padding: '4px 16px 10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#1A1A1A' }}>Recent Activity</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#FF6B00', fontWeight: 500, cursor: 'pointer' }}>View all</span>
                </div>
                {activities.map((a, i) => (
                    <div key={i} className="dash-activity-item" style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '7px 10px', borderRadius: '10px', marginBottom: '4px',
                        background: i === 0 ? 'rgba(255,107,0,0.03)' : 'transparent',
                        border: i === 0 ? '1px solid rgba(255,107,0,0.06)' : '1px solid transparent',
                    }}>
                        <img src={a.avatar} alt="" width={26} height={26} style={{ width: '26px', height: '26px', borderRadius: '8px', background: '#F5F5F5' }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, color: '#1A1A1A', lineHeight: 1.3 }}>{a.text}</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#999' }}>{a.detail}</div>
                        </div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#ccc', whiteSpace: 'nowrap' }}>{a.time}</span>
                    </div>
                ))}
            </div>

            {/* ── AI Agents Status Bar ── */}
            <div style={{
                padding: '10px 16px',
                borderTop: '1px solid rgba(0,0,0,0.04)',
                background: 'linear-gradient(180deg, rgba(255,107,0,0.02) 0%, rgba(255,107,0,0.05) 100%)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px rgba(16,185,129,0.5)', animation: 'glowPulse 2s ease-in-out infinite' }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, color: '#1A1A1A' }}>AI Agents</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#10B981', fontWeight: 500 }}>3 running</span>
                    </div>
                    <div style={{
                        width: '14px', height: '14px',
                        border: '2px solid rgba(255,107,0,0.25)', borderTopColor: '#FF6B00',
                        borderRadius: '50%', animation: 'spin 1s linear infinite',
                    }} />
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {agents.map((ag, i) => (
                        <div key={i} className="dash-agent-pill" style={{
                            display: 'flex', alignItems: 'center', gap: '5px',
                            padding: '4px 10px', borderRadius: '8px',
                            background: '#fff', border: '1px solid rgba(0,0,0,0.05)',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        }}>
                            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: ag.color, boxShadow: `0 0 4px ${ag.color}60` }} />
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 500, color: '#555' }}>{ag.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
