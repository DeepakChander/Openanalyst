'use client';

import { useRef, useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header, Footer } from '@/components';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════ DATA ═══════════ */
const values = [
    { title: 'Innovation', desc: 'We don\'t follow the marketing playbook — we rewrite it. Our AI agents evolve daily, learning from millions of data points to discover strategies no human team could find alone.', icon: '◈', num: '01', highlight: 'AI-first thinking in everything we build', gradient: 'linear-gradient(135deg, #FF6B00, #FF8533)' },
    { title: 'Simplicity', desc: 'The most powerful technology disappears into the workflow. We obsess over removing complexity so you can launch a campaign in 3 clicks, not 30 steps.', icon: '◎', num: '02', highlight: 'Complex problems, elegant solutions', gradient: 'linear-gradient(135deg, #FF8533, #FFB380)' },
    { title: 'Trust', desc: 'Your data never trains our models. Period. We\'re SOC 2 Type II certified, GDPR compliant, and every campaign runs through integrity checks before going live.', icon: '◆', num: '03', highlight: 'Security isn\'t a feature — it\'s the foundation', gradient: 'linear-gradient(135deg, #E85D00, #FF6B00)' },
    { title: 'Impact', desc: 'Vanity metrics don\'t pay the bills. We optimize for revenue, not impressions. Every AI agent is measured by the actual business growth it creates.', icon: '★', num: '04', highlight: 'Real growth, not vanity metrics', gradient: 'linear-gradient(135deg, #CC5200, #E85D00)' },
];

const metrics = [
    { value: 10, suffix: 'K+', label: 'Campaigns Deployed', desc: 'Across 150+ countries' },
    { value: 42, suffix: '', label: 'AI Agents', desc: 'Working 24/7 for you' },
    { value: 99.9, suffix: '%', label: 'Uptime SLA', desc: 'Enterprise-grade reliability' },
    { value: 150, suffix: '+', label: 'Countries Served', desc: 'Global reach, local precision' },
];

const milestones = [
    { year: '2024', quarter: 'Q1', event: 'Founded', desc: 'OpenAnalyst was born from a vision to democratize AI-powered marketing for every business.', icon: '🚀' },
    { year: '2024', quarter: 'Q3', event: 'First 1,000 Users', desc: 'Reached our first major milestone with early adopters from startups and agencies worldwide.', icon: '📈' },
    { year: '2025', quarter: 'Q1', event: '27 Integrations', desc: 'Connected to the entire marketing stack — Gmail, Slack, HubSpot, Google Ads, and more.', icon: '🔗' },
    { year: '2025', quarter: 'Q3', event: '10K+ Campaigns', desc: 'Our AI agents have planned, launched, and optimized over 10,000 marketing campaigns.', icon: '🎯' },
];

const teamPhotos = [
    { src: '/team-2.jpg', label: 'The Full Team', desc: 'Our entire crew — builders, dreamers, and marketing revolutionaries.' },
    { src: '/team-1.jpg', label: 'Leadership Team', desc: 'The core team driving vision and strategy at OpenAnalyst.' },
    { src: '/team-4.jpg', label: 'Engineering Pod', desc: 'The minds behind the AI agents that power your campaigns.' },
    { src: '/team-3.jpg', label: 'Team Bonding', desc: 'We work hard, but we celebrate harder.' },
];

/* ═══════════ 3D HERO — ORBITAL SPHERE ═══════════ */
function OrbitalSphere() {
    const groupRef = useRef<THREE.Group>(null);
    const sphereRef = useRef<THREE.Mesh>(null);
    const ringsRef = useRef<THREE.Group>(null);
    const particlesRef = useRef<THREE.Points>(null);

    const particlePositions = useMemo(() => {
        const pos = new Float32Array(500 * 3);
        for (let i = 0; i < 500; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 2.5 + Math.random() * 1.5;
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, []);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.08;
            groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
        }
        if (sphereRef.current) {
            sphereRef.current.rotation.y = t * 0.15;
            sphereRef.current.rotation.z = t * 0.05;
        }
        if (ringsRef.current) {
            ringsRef.current.rotation.z = t * 0.12;
            ringsRef.current.rotation.x = Math.sin(t * 0.08) * 0.2;
        }
        if (particlesRef.current) {
            particlesRef.current.rotation.y = -t * 0.03;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Core sphere with wireframe */}
            <mesh ref={sphereRef}>
                <icosahedronGeometry args={[1.5, 3]} />
                <meshStandardMaterial
                    color="#FF6B00"
                    emissive="#FF6B00"
                    emissiveIntensity={0.15}
                    wireframe
                    transparent
                    opacity={0.35}
                />
            </mesh>
            {/* Inner glow sphere */}
            <mesh>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshStandardMaterial
                    color="#FF6B00"
                    emissive="#FF8533"
                    emissiveIntensity={0.4}
                    transparent
                    opacity={0.08}
                    roughness={0.1}
                    metalness={0.9}
                />
            </mesh>
            {/* Orbital rings */}
            <group ref={ringsRef}>
                {[0, 1, 2].map((i) => (
                    <mesh key={i} rotation={[Math.PI / 2 + i * 0.4, i * 0.6, i * 0.3]}>
                        <torusGeometry args={[2.2 + i * 0.3, 0.008, 16, 100]} />
                        <meshStandardMaterial
                            color="#FF6B00"
                            emissive="#FF8533"
                            emissiveIntensity={0.6 - i * 0.15}
                            transparent
                            opacity={0.4 - i * 0.1}
                        />
                    </mesh>
                ))}
            </group>
            {/* Orbiting particles */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
                </bufferGeometry>
                <pointsMaterial
                    color="#FF6B00"
                    size={0.02}
                    transparent
                    opacity={0.5}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>
        </group>
    );
}

function HeroScene3D() {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            style={{ width: '100%', height: '100%' }}
            gl={{ alpha: true, antialias: true }}
        >
            <ambientLight intensity={0.15} />
            <pointLight position={[5, 5, 5]} intensity={0.5} color="#FF6B00" />
            <pointLight position={[-4, -3, 4]} intensity={0.3} color="#FFB380" />
            <directionalLight position={[0, 3, 5]} intensity={0.2} />
            <OrbitalSphere />
        </Canvas>
    );
}

/* ═══════════ 3D VALUES SCENE — Floating Geometry ═══════════ */
function FloatingGeometry() {
    const groupRef = useRef<THREE.Group>(null);
    const shapes = useMemo(() => {
        const items: { pos: [number, number, number]; type: string; scale: number; speed: number }[] = [];
        for (let i = 0; i < 30; i++) {
            items.push({
                pos: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4],
                type: ['box', 'octahedron', 'tetrahedron', 'sphere'][Math.floor(Math.random() * 4)],
                scale: 0.08 + Math.random() * 0.18,
                speed: 0.2 + Math.random() * 0.5,
            });
        }
        return items;
    }, []);

    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    });

    return (
        <group ref={groupRef}>
            {shapes.map((s, i) => (
                <FloatingShape key={i} {...s} index={i} />
            ))}
        </group>
    );
}

function FloatingShape({ pos, type, scale, speed, index }: {
    pos: [number, number, number]; type: string; scale: number; speed: number; index: number;
}) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.getElapsedTime();
        ref.current.rotation.x = t * speed + index;
        ref.current.rotation.y = t * speed * 0.7 + index * 2;
        ref.current.position.y = pos[1] + Math.sin(t * 0.5 + index) * 0.3;
    });

    const geo = type === 'box' ? <boxGeometry args={[1, 1, 1]} /> :
        type === 'octahedron' ? <octahedronGeometry args={[1]} /> :
            type === 'tetrahedron' ? <tetrahedronGeometry args={[1]} /> :
                <sphereGeometry args={[1, 8, 8]} />;

    return (
        <mesh ref={ref} position={pos} scale={scale}>
            {geo}
            <meshStandardMaterial
                color="#FF6B00"
                emissive="#FF6B00"
                emissiveIntensity={0.3}
                wireframe
                transparent
                opacity={0.25}
            />
        </mesh>
    );
}

/* ═══════════ 3D TIMELINE — Helix Path ═══════════ */
function TimelineHelix() {
    const groupRef = useRef<THREE.Group>(null);
    const pointsRef = useRef<THREE.Points>(null);
    const count = 300;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const t = (i / count) * Math.PI * 6;
            const r = 1.8;
            pos[i * 3] = Math.cos(t) * r;
            pos[i * 3 + 1] = (i / count) * 6 - 3;
            pos[i * 3 + 2] = Math.sin(t) * r;
        }
        return pos;
    }, []);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                </bufferGeometry>
                <pointsMaterial
                    color="#FF6B00"
                    size={0.04}
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>
            {/* Milestone markers */}
            {[0, 1, 2, 3].map((i) => {
                const t = (i / 4) * Math.PI * 6;
                const r = 1.8;
                return (
                    <mesh key={i} position={[Math.cos(t) * r, (i / 4) * 6 - 3, Math.sin(t) * r]}>
                        <sphereGeometry args={[0.1, 16, 16]} />
                        <meshStandardMaterial color="#FF6B00" emissive="#FF8533" emissiveIntensity={0.8} />
                    </mesh>
                );
            })}
        </group>
    );
}

/* ═══════════ 3D CULTURE SCENE — Particle Cloud ═══════════ */
function ParticleCloud() {
    const ref = useRef<THREE.Points>(null);
    const count = 800;

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 1 + Math.random() * 3;
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
            // Orange spectrum colors
            const hue = 0.05 + Math.random() * 0.08;
            const color = new THREE.Color().setHSL(hue, 0.9, 0.5 + Math.random() * 0.3);
            col[i * 3] = color.r;
            col[i * 3 + 1] = color.g;
            col[i * 3 + 2] = color.b;
        }
        return [pos, col];
    }, []);

    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.y = clock.getElapsedTime() * 0.05;
            ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.1;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color" args={[colors, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.025}
                vertexColors
                transparent
                opacity={0.7}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

/* ═══════════ ANIMATED COUNTER ═══════════ */
function AnimatedCounter({ value, suffix = '', decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.5 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!visible || !ref.current) return;
        const obj = { val: 0 };
        gsap.to(obj, {
            val: value, duration: 2.5, ease: 'power2.out',
            onUpdate: () => {
                if (ref.current) ref.current.textContent = (decimals > 0 ? obj.val.toFixed(decimals) : Math.round(obj.val)) + suffix;
            },
        });
    }, [visible, value, suffix, decimals]);

    return <span ref={ref}>0{suffix}</span>;
}

/* ═══════════ 3D TILT CARD ═══════════ */
function TiltCard({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        cardRef.current.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.02, 1.02, 1.02)`;
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    }, []);

    return (
        <div
            ref={cardRef}
            className={className}
            style={{ ...style, transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)', willChange: 'transform' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
}

/* ═══════════ PHOTO CARD WITH B&W HOVER ═══════════ */
function PhotoCard({ photo, index }: { photo: typeof teamPhotos[0]; index: number }) {
    const [hovered, setHovered] = useState(false);

    return (
        <TiltCard
            className="gallery-item"
            style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                height: index === 0 ? '500px' : '380px',
                gridRow: index === 0 ? 'span 2' : undefined,
            }}
        >
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{ width: '100%', height: '100%', position: 'relative' }}
            >
                <img
                    src={photo.src}
                    alt={photo.label}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: hovered ? 'grayscale(0%) brightness(1.05)' : 'grayscale(80%) brightness(0.7)',
                        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: hovered ? 'scale(1.05)' : 'scale(1)',
                    }}
                />
                {/* Gradient overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: hovered
                        ? 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.8) 100%)'
                        : 'linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.6) 100%)',
                    transition: 'all 0.6s ease',
                }} />
                {/* Orange accent line */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
                    background: 'linear-gradient(90deg, var(--orange), var(--orange-hover))',
                    transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }} />
                {/* Text content */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px',
                    transform: hovered ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'transform 0.5s ease',
                }}>
                    <h4 style={{
                        fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700,
                        color: '#fff', marginBottom: '6px', letterSpacing: '-0.01em',
                    }}>{photo.label}</h4>
                    <p style={{
                        fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.7)',
                        lineHeight: 1.5, opacity: hovered ? 1 : 0,
                        transition: 'opacity 0.4s ease 0.1s',
                    }}>{photo.desc}</p>
                </div>
                {/* Corner badge */}
                <div style={{
                    position: 'absolute', top: '16px', right: '16px',
                    padding: '4px 12px', borderRadius: '999px',
                    background: 'rgba(255,107,0,0.2)', border: '1px solid rgba(255,107,0,0.3)',
                    backdropFilter: 'blur(8px)',
                    fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#FF8533',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(-8px)',
                    transition: 'all 0.4s ease',
                }}>
                    {String(index + 1).padStart(2, '0')}
                </div>
            </div>
        </TiltCard>
    );
}

/* ═══════════ MAIN PAGE ═══════════ */
export default function AboutPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouse);
        return () => window.removeEventListener('mousemove', handleMouse);
    }, []);

    useGSAP(() => {
        // Hero animations
        gsap.from('.hero-line', { y: '120%', duration: 1.4, ease: 'power4.out', stagger: 0.08, delay: 0.2 });
        gsap.from('.hero-sub', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.9 });
        gsap.from('.hero-badge-anim', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.1 });
        gsap.from('.hero-stats', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.3 });
        gsap.from('.hero-3d-container', { scale: 0.8, opacity: 0, duration: 1.5, ease: 'power3.out', delay: 0.5 });

        // Mission cards
        gsap.fromTo('.mission-card-l', { x: -80, opacity: 0 }, {
            x: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '.mission-section', start: 'top 75%' },
        });
        gsap.fromTo('.mission-card-r', { x: 80, opacity: 0 }, {
            x: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '.mission-section', start: 'top 75%' },
        });

        // Values — stagger
        gsap.fromTo('.value-card', { y: 80, opacity: 0, scale: 0.9 }, {
            y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.values-section', start: 'top 80%' },
        });

        // Metrics
        gsap.fromTo('.metric-block', { y: 60, opacity: 0 }, {
            y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: '.metrics-section', start: 'top 85%' },
        });

        // Timeline items
        gsap.utils.toArray<HTMLElement>('.tl-item').forEach((el, i) => {
            gsap.fromTo(el, { y: 50, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: i * 0.1,
                scrollTrigger: { trigger: el, start: 'top 90%' },
            });
        });

        // Timeline progress line
        gsap.fromTo('.tl-progress', { scaleY: 0 }, {
            scaleY: 1, ease: 'none',
            scrollTrigger: { trigger: '.timeline-section', start: 'top 60%', end: 'bottom 50%', scrub: 1 },
        });

        // Gallery items stagger
        gsap.fromTo('.gallery-item', { y: 60, opacity: 0, scale: 0.95 }, {
            y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.gallery-section', start: 'top 80%' },
        });

        // CTA section
        gsap.fromTo('.cta-content', { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '.cta-section', start: 'top 80%' },
        });

        // Section headings
        gsap.utils.toArray<HTMLElement>('.sec-head').forEach(el => {
            gsap.fromTo(el, { y: 40, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 92%' },
            });
        });

    }, { scope: pageRef });

    return (
        <div ref={pageRef} style={{ minHeight: '100vh', background: '#FFFFFF' }}>
            <Header />

            {/* ═══════════ HERO — Cinematic Full-Screen ═══════════ */}
            <section style={{
                minHeight: '100vh', display: 'flex', alignItems: 'center',
                position: 'relative', overflow: 'hidden', paddingTop: '80px',
                background: '#FFFFFF',
            }}>
                {/* Dot grid */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.08,
                    backgroundImage: 'radial-gradient(circle, rgba(255,107,0,0.15) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 80%)',
                }} />

                {/* Ambient glow orbs */}
                <div style={{
                    position: 'absolute', top: '5%', right: '10%', width: '700px', height: '700px',
                    background: 'radial-gradient(circle, rgba(255,107,0,0.05) 0%, transparent 70%)',
                    pointerEvents: 'none', filter: 'blur(100px)',
                }} />
                <div style={{
                    position: 'absolute', bottom: '10%', left: '5%', width: '500px', height: '500px',
                    background: 'radial-gradient(circle, rgba(255,133,51,0.04) 0%, transparent 70%)',
                    pointerEvents: 'none', filter: 'blur(80px)',
                }} />

                <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 2, width: '100%' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '60px', alignItems: 'center' }}>
                        {/* Left — Typography */}
                        <div>
                            {/* Badge */}
                            <div className="hero-badge-anim" style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                padding: '6px 16px', borderRadius: '999px', marginBottom: '36px',
                                border: '1px solid rgba(255,107,0,0.25)', background: 'rgba(255,107,0,0.06)',
                            }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--orange)', animation: 'glowPulse 2s ease infinite' }} />
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    About OpenAnalyst
                                </span>
                            </div>

                            {/* Kinetic Title */}
                            <h1 style={{ marginBottom: '36px' }}>
                                {['We Build the', 'Future of', 'AI Marketing'].map((line, i) => (
                                    <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                                        <span className="hero-line" style={{
                                            display: 'block',
                                            fontFamily: 'var(--font-heading)',
                                            fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
                                            fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em',
                                            ...(i === 2 ? {
                                                background: 'linear-gradient(135deg, #FF8533, #FF6B00, #E85D00)',
                                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                            } : { color: '#1A1A1A' }),
                                        }}>
                                            {line}
                                        </span>
                                    </span>
                                ))}
                            </h1>

                            {/* Subtitle */}
                            <p className="hero-sub" style={{
                                maxWidth: '500px', marginBottom: '48px',
                                fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
                                color: 'rgba(26,26,26,0.55)', lineHeight: 1.8,
                                fontFamily: 'var(--font-body)',
                            }}>
                                Born from a belief that every business deserves an AI-powered marketing team.
                                We build intelligent agents that plan, launch, and optimize campaigns — so you can focus on what matters.
                            </p>

                            {/* Stats strip */}
                            <div className="hero-stats" style={{
                                display: 'flex', gap: '48px', paddingTop: '32px',
                                borderTop: '1px solid rgba(0,0,0,0.06)',
                            }}>
                                {[{ val: 'Est. 2024', label: 'Founded' }, { val: '30+', label: 'Team Members' }, { val: '10K+', label: 'Campaigns' }].map((s, i) => (
                                    <div key={i}>
                                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800, color: 'var(--orange)', letterSpacing: '-0.02em' }}>{s.val}</div>
                                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(26,26,26,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right — 3D Orbital Sphere */}
                        <div className="hero-3d-container" style={{ position: 'relative', height: '580px' }}>
                            <Suspense fallback={null}>
                                <HeroScene3D />
                            </Suspense>
                            {/* Floating badges */}
                            <div className="hero-badge-anim" style={{
                                position: 'absolute', top: '12%', right: '8%',
                                padding: '10px 18px', borderRadius: '12px',
                                background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,107,0,0.15)',
                                backdropFilter: 'blur(12px)', fontFamily: 'var(--font-mono)',
                                fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.06em',
                                boxShadow: '0 8px 32px rgba(255,107,0,0.08)',
                                animation: 'float 6s ease-in-out infinite',
                            }}>
                                <span style={{ marginRight: '6px' }}>◈</span> 42 AI AGENTS
                            </div>
                            <div className="hero-badge-anim" style={{
                                position: 'absolute', bottom: '18%', left: '3%',
                                padding: '10px 18px', borderRadius: '12px',
                                background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,107,0,0.15)',
                                backdropFilter: 'blur(12px)', fontFamily: 'var(--font-mono)',
                                fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.06em',
                                boxShadow: '0 8px 32px rgba(255,107,0,0.08)',
                                animation: 'float 6s ease-in-out infinite 1s',
                            }}>
                                <span style={{ marginRight: '6px' }}>◎</span> 99.9% UPTIME
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div style={{
                    position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 2,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(26,26,26,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll to explore</span>
                    <div style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg, var(--orange), transparent)' }} />
                </div>
            </section>

            {/* ═══════════ MISSION & VISION ═══════════ */}
            <section className="mission-section" style={{
                padding: '120px 24px', background: '#FAFAFA', position: 'relative',
            }}>
                {/* Background number */}
                <span style={{
                    position: 'absolute', top: '40px', right: '40px',
                    fontFamily: 'var(--font-heading)', fontSize: 'clamp(8rem, 15vw, 14rem)',
                    fontWeight: 900, color: 'rgba(255,107,0,0.03)', lineHeight: 1, pointerEvents: 'none',
                }}>01</span>

                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="sec-head" style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <span style={{
                            display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--orange)',
                            textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '20px',
                            padding: '6px 16px', borderRadius: '999px', border: '1px solid rgba(255,107,0,0.2)', background: 'rgba(255,107,0,0.04)',
                        }}>Purpose</span>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800, letterSpacing: '-0.03em', color: '#1A1A1A',
                        }}>
                            Why we <span className="text-gradient">exist</span>
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        {/* Mission */}
                        <TiltCard className="mission-card-l" style={{
                            padding: '52px 44px', borderRadius: '24px',
                            background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)',
                            position: 'relative', overflow: 'hidden',
                        }}>
                            <div style={{
                                position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px',
                                background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)', pointerEvents: 'none',
                            }} />
                            <div style={{
                                width: '52px', height: '52px', borderRadius: '16px', marginBottom: '28px',
                                background: 'linear-gradient(135deg, rgba(255,107,0,0.12), rgba(255,107,0,0.04))',
                                border: '1px solid rgba(255,107,0,0.15)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
                            }}>◎</div>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--orange)', marginBottom: '16px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                Our Mission
                            </p>
                            <p style={{ fontSize: '19px', color: '#1A1A1A', lineHeight: 1.8, fontFamily: 'var(--font-body)', fontWeight: 400 }}>
                                To democratize marketing excellence through AI agents that act as your expert marketing team, available 24/7 — making world-class marketing accessible to every business, everywhere.
                            </p>
                        </TiltCard>

                        {/* Vision */}
                        <TiltCard className="mission-card-r" style={{
                            padding: '52px 44px', borderRadius: '24px',
                            background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.06)',
                            position: 'relative', overflow: 'hidden',
                        }}>
                            <div style={{
                                position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px',
                                background: 'radial-gradient(circle, rgba(255,107,0,0.1) 0%, transparent 70%)', pointerEvents: 'none',
                            }} />
                            <div style={{
                                width: '52px', height: '52px', borderRadius: '16px', marginBottom: '28px',
                                background: 'linear-gradient(135deg, rgba(255,107,0,0.25), rgba(255,107,0,0.1))',
                                border: '1px solid rgba(255,107,0,0.3)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
                            }}>◈</div>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#FF8533', marginBottom: '16px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                Our Vision
                            </p>
                            <p style={{ fontSize: '19px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, fontFamily: 'var(--font-body)', fontWeight: 400 }}>
                                A world where AI handles the complexity of marketing — targeting, optimization, personalization — while humans focus on creativity, strategy, and building real connections with their audience.
                            </p>
                        </TiltCard>
                    </div>
                </div>
            </section>

            {/* ═══════════ METRICS — Giant Numbers ═══════════ */}
            <section className="metrics-section" style={{
                padding: '100px 24px', background: '#FFFFFF', position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px',
                        background: 'rgba(0,0,0,0.06)', borderRadius: '24px', overflow: 'hidden',
                    }}>
                        {metrics.map((m, i) => (
                            <div key={i} className="metric-block" style={{
                                padding: '56px 36px', textAlign: 'center', background: '#FFFFFF',
                                position: 'relative',
                                transition: 'background 0.4s ease',
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,107,0,0.02)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = '#FFFFFF'; }}
                            >
                                <div style={{
                                    fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                                    fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1,
                                    background: 'linear-gradient(135deg, #FF6B00, #E85D00)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                    marginBottom: '12px',
                                }}>
                                    <AnimatedCounter value={m.value} suffix={m.suffix} decimals={m.value === 99.9 ? 1 : 0} />
                                </div>
                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: '#1A1A1A', marginBottom: '6px' }}>
                                    {m.label}
                                </div>
                                <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(26,26,26,0.45)' }}>
                                    {m.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ VALUES — Bento Grid with 3D ═══════════ */}
            <section className="values-section" style={{
                padding: '120px 24px', background: '#FAFAFA', position: 'relative', overflow: 'hidden',
            }}>
                {/* Background number */}
                <span style={{
                    position: 'absolute', top: '40px', left: '40px',
                    fontFamily: 'var(--font-heading)', fontSize: 'clamp(8rem, 15vw, 14rem)',
                    fontWeight: 900, color: 'rgba(255,107,0,0.03)', lineHeight: 1, pointerEvents: 'none',
                }}>02</span>

                <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div className="sec-head" style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <span style={{
                            display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--orange)',
                            textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '20px',
                            padding: '6px 16px', borderRadius: '999px', border: '1px solid rgba(255,107,0,0.2)', background: 'rgba(255,107,0,0.04)',
                        }}>Our Values</span>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800, letterSpacing: '-0.03em', color: '#1A1A1A',
                        }}>
                            What drives <span className="text-gradient">everything</span> we do
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {values.map((v, i) => (
                            <TiltCard key={i} className="value-card" style={{
                                padding: '44px 40px', borderRadius: '24px',
                                background: i === 0 ? '#1A1A1A' : '#FFFFFF',
                                border: `1px solid ${i === 0 ? 'rgba(255,107,0,0.15)' : 'rgba(0,0,0,0.06)'}`,
                                position: 'relative', overflow: 'hidden',
                            }}>
                                {/* Accent glow */}
                                <div style={{
                                    position: 'absolute', top: '-20px', right: '-20px', width: '140px', height: '140px',
                                    background: `radial-gradient(circle, rgba(255,107,0,${i === 0 ? '0.12' : '0.05'}) 0%, transparent 70%)`,
                                    pointerEvents: 'none',
                                }} />
                                {/* Number */}
                                <span style={{
                                    position: 'absolute', top: '20px', right: '24px',
                                    fontFamily: 'var(--font-heading)', fontSize: '64px', fontWeight: 900,
                                    color: i === 0 ? 'rgba(255,107,0,0.08)' : 'rgba(0,0,0,0.03)',
                                    lineHeight: 1,
                                }}>{v.num}</span>

                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '14px', marginBottom: '24px',
                                    background: v.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '20px', color: '#fff',
                                }}>{v.icon}</div>

                                <h3 style={{
                                    fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700,
                                    color: i === 0 ? '#fff' : '#1A1A1A', marginBottom: '12px', letterSpacing: '-0.01em',
                                }}>{v.title}</h3>

                                <p style={{
                                    fontFamily: 'var(--font-body)', fontSize: '15px',
                                    color: i === 0 ? 'rgba(255,255,255,0.6)' : 'rgba(26,26,26,0.55)',
                                    lineHeight: 1.75, marginBottom: '20px',
                                }}>{v.desc}</p>

                                <div style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    padding: '8px 16px', borderRadius: '999px',
                                    background: i === 0 ? 'rgba(255,107,0,0.15)' : 'rgba(255,107,0,0.06)',
                                    border: `1px solid ${i === 0 ? 'rgba(255,107,0,0.3)' : 'rgba(255,107,0,0.12)'}`,
                                }}>
                                    <span style={{
                                        width: '5px', height: '5px', borderRadius: '50%', background: 'var(--orange)',
                                    }} />
                                    <span style={{
                                        fontFamily: 'var(--font-mono)', fontSize: '11px',
                                        color: i === 0 ? '#FF8533' : 'var(--orange)',
                                        letterSpacing: '0.04em',
                                    }}>{v.highlight}</span>
                                </div>
                            </TiltCard>
                        ))}
                    </div>

                    {/* 3D floating geometry background */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        pointerEvents: 'none', opacity: 0.4, zIndex: 0,
                    }}>
                        <Suspense fallback={null}>
                            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ width: '100%', height: '100%' }} gl={{ alpha: true }}>
                                <ambientLight intensity={0.2} />
                                <FloatingGeometry />
                            </Canvas>
                        </Suspense>
                    </div>
                </div>
            </section>

            {/* ═══════════ TEAM GALLERY — Cinematic Photos ═══════════ */}
            <section className="gallery-section" style={{
                padding: '120px 24px', background: '#FFFFFF', position: 'relative', overflow: 'hidden',
            }}>
                {/* Background number */}
                <span style={{
                    position: 'absolute', top: '40px', right: '40px',
                    fontFamily: 'var(--font-heading)', fontSize: 'clamp(8rem, 15vw, 14rem)',
                    fontWeight: 900, color: 'rgba(255,107,0,0.03)', lineHeight: 1, pointerEvents: 'none',
                }}>03</span>

                <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div className="sec-head" style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <span style={{
                            display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--orange)',
                            textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '20px',
                            padding: '6px 16px', borderRadius: '999px', border: '1px solid rgba(255,107,0,0.2)', background: 'rgba(255,107,0,0.04)',
                        }}>Our Team</span>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800, letterSpacing: '-0.03em', color: '#1A1A1A',
                        }}>
                            Meet the <span className="text-gradient">people</span> behind the AI
                        </h2>
                        <p style={{
                            fontFamily: 'var(--font-body)', fontSize: '17px', color: 'rgba(26,26,26,0.5)',
                            maxWidth: '600px', margin: '20px auto 0', lineHeight: 1.7,
                        }}>
                            A team of engineers, designers, and marketers united by a shared mission — making AI-powered marketing accessible to everyone.
                        </p>
                    </div>

                    {/* Masonry photo grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1.2fr 1fr',
                        gridTemplateRows: 'auto auto',
                        gap: '20px',
                    }}>
                        {teamPhotos.map((photo, i) => (
                            <PhotoCard key={i} photo={photo} index={i} />
                        ))}
                    </div>

                    {/* Team stats strip */}
                    <div style={{
                        display: 'flex', justifyContent: 'center', gap: '64px', marginTop: '48px',
                        paddingTop: '40px', borderTop: '1px solid rgba(0,0,0,0.06)',
                    }}>
                        {[
                            { val: '30+', label: 'Team Members' },
                            { val: '8', label: 'Countries' },
                            { val: '4.9/5', label: 'Glassdoor Rating' },
                            { val: '95%', label: 'Retention Rate' },
                        ].map((s, i) => (
                            <div key={i} className="gallery-item" style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 800,
                                    color: 'var(--orange)', letterSpacing: '-0.02em',
                                }}>{s.val}</div>
                                <div style={{
                                    fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(26,26,26,0.4)',
                                    letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '4px',
                                }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ TIMELINE — Journey ═══════════ */}
            <section className="timeline-section" style={{
                padding: '120px 24px', background: '#FAFAFA', position: 'relative', overflow: 'hidden',
            }}>
                {/* Background number */}
                <span style={{
                    position: 'absolute', top: '40px', left: '40px',
                    fontFamily: 'var(--font-heading)', fontSize: 'clamp(8rem, 15vw, 14rem)',
                    fontWeight: 900, color: 'rgba(255,107,0,0.03)', lineHeight: 1, pointerEvents: 'none',
                }}>04</span>

                <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div className="sec-head" style={{ textAlign: 'center', marginBottom: '72px' }}>
                        <span style={{
                            display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--orange)',
                            textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '20px',
                            padding: '6px 16px', borderRadius: '999px', border: '1px solid rgba(255,107,0,0.2)', background: 'rgba(255,107,0,0.04)',
                        }}>Our Journey</span>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800, letterSpacing: '-0.03em', color: '#1A1A1A',
                        }}>
                            How we got <span className="text-gradient">here</span>
                        </h2>
                    </div>

                    {/* Vertical Timeline */}
                    <div style={{ position: 'relative', paddingLeft: '48px' }}>
                        {/* Progress line */}
                        <div style={{
                            position: 'absolute', left: '15px', top: 0, bottom: 0, width: '2px',
                            background: 'rgba(0,0,0,0.06)',
                        }}>
                            <div className="tl-progress" style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
                                background: 'linear-gradient(180deg, var(--orange), rgba(255,107,0,0.2))',
                                transformOrigin: 'top',
                            }} />
                        </div>

                        {milestones.map((m, i) => (
                            <div key={i} className="tl-item" style={{
                                position: 'relative', marginBottom: i < milestones.length - 1 ? '56px' : 0,
                            }}>
                                {/* Dot */}
                                <div style={{
                                    position: 'absolute', left: '-41px', top: '6px',
                                    width: '14px', height: '14px', borderRadius: '50%',
                                    background: 'var(--orange)', border: '3px solid #FAFAFA',
                                    boxShadow: '0 0 0 3px rgba(255,107,0,0.2)',
                                }} />

                                <TiltCard style={{
                                    padding: '32px 36px', borderRadius: '20px',
                                    background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)',
                                    position: 'relative', overflow: 'hidden',
                                }}>
                                    {/* Quarter badge */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                        <span style={{
                                            fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--orange)',
                                            padding: '4px 10px', borderRadius: '999px',
                                            border: '1px solid rgba(255,107,0,0.2)', background: 'rgba(255,107,0,0.04)',
                                            letterSpacing: '0.08em',
                                        }}>{m.year} {m.quarter}</span>
                                        <span style={{ fontSize: '18px' }}>{m.icon}</span>
                                    </div>

                                    <h3 style={{
                                        fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700,
                                        color: '#1A1A1A', marginBottom: '10px', letterSpacing: '-0.01em',
                                    }}>{m.event}</h3>

                                    <p style={{
                                        fontFamily: 'var(--font-body)', fontSize: '15px',
                                        color: 'rgba(26,26,26,0.55)', lineHeight: 1.7,
                                    }}>{m.desc}</p>
                                </TiltCard>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ CULTURE — Immersive Dark Section ═══════════ */}
            <section style={{
                padding: '120px 24px', background: '#111111', position: 'relative', overflow: 'hidden',
            }}>
                {/* 3D particle cloud background */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5,
                }}>
                    <Suspense fallback={null}>
                        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: '100%', height: '100%' }} gl={{ alpha: true }}>
                            <ParticleCloud />
                        </Canvas>
                    </Suspense>
                </div>

                <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div className="sec-head" style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <span style={{
                            display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#FF8533',
                            textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '20px',
                            padding: '6px 16px', borderRadius: '999px', border: '1px solid rgba(255,107,0,0.25)', background: 'rgba(255,107,0,0.08)',
                        }}>Culture</span>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800, letterSpacing: '-0.03em', color: '#FFFFFF',
                        }}>
                            How we <span style={{
                                background: 'linear-gradient(135deg, #FF8533, #FF6B00, #E85D00)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            }}>work</span>
                        </h2>
                    </div>

                    {/* Culture grid */}
                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px',
                    }}>
                        {[
                            { title: 'Remote-First', desc: 'Work from anywhere. We believe great talent isn\'t bound by geography.', icon: '🌍' },
                            { title: 'Ship Fast', desc: 'Weekly releases, daily deployments. We move at startup speed, always.', icon: '🚀' },
                            { title: 'Radical Transparency', desc: 'Open books, open roadmap. Everyone sees the full picture.', icon: '🔍' },
                            { title: 'Customer Obsessed', desc: 'Every feature starts with a customer problem, not a hypothesis.', icon: '💡' },
                            { title: 'Learn & Grow', desc: '$5K annual learning budget, internal tech talks, and mentorship.', icon: '📚' },
                            { title: 'Play to Win', desc: 'We celebrate wins big and small. Growth is a team sport here.', icon: '🏆' },
                        ].map((item, i) => (
                            <TiltCard key={i} className="sec-head" style={{
                                padding: '36px 28px', borderRadius: '20px',
                                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                                backdropFilter: 'blur(8px)',
                                transition: 'all 0.4s ease',
                                cursor: 'default',
                            }}>
                                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{item.icon}</div>
                                <h3 style={{
                                    fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700,
                                    color: '#FFFFFF', marginBottom: '10px',
                                }}>{item.title}</h3>
                                <p style={{
                                    fontFamily: 'var(--font-body)', fontSize: '14px',
                                    color: 'rgba(255,255,255,0.5)', lineHeight: 1.7,
                                }}>{item.desc}</p>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ CTA — Join Us ═══════════ */}
            <section className="cta-section" style={{
                padding: '120px 24px', background: '#FFFFFF', position: 'relative', overflow: 'hidden',
            }}>
                {/* Ambient glow */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '800px', height: '400px',
                    background: 'radial-gradient(ellipse, rgba(255,107,0,0.06) 0%, transparent 70%)',
                    pointerEvents: 'none', filter: 'blur(80px)',
                }} />

                <div className="cta-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <span style={{
                        display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--orange)',
                        textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '20px',
                        padding: '6px 16px', borderRadius: '999px', border: '1px solid rgba(255,107,0,0.2)', background: 'rgba(255,107,0,0.04)',
                    }}>Join Us</span>

                    <h2 style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 800, letterSpacing: '-0.03em', color: '#1A1A1A', marginBottom: '24px',
                    }}>
                        Ready to build the <span className="text-gradient">future</span>?
                    </h2>

                    <p style={{
                        fontFamily: 'var(--font-body)', fontSize: '17px', color: 'rgba(26,26,26,0.5)',
                        maxWidth: '560px', margin: '0 auto 40px', lineHeight: 1.7,
                    }}>
                        We&apos;re always looking for exceptional people who want to push the boundaries of what AI can do for marketing.
                    </p>

                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="/careers" className="btn-primary" style={{ textDecoration: 'none' }}>
                            View Open Positions
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                        <a href="/contact" className="btn-outline" style={{ textDecoration: 'none' }}>
                            Get in Touch
                        </a>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Responsive styles */}
            <style>{`
                @media (max-width: 1024px) {
                    .about-hero-grid { grid-template-columns: 1fr !important; }
                }
                @media (max-width: 768px) {
                    section > div > div[style*="grid-template-columns: 1.3fr"] {
                        grid-template-columns: 1fr !important;
                        text-align: center;
                        gap: 40px !important;
                    }
                    section > div > div[style*="grid-template-columns: 1fr 1fr"] {
                        grid-template-columns: 1fr !important;
                    }
                    section > div > div[style*="grid-template-columns: repeat(4"] {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    section > div > div[style*="grid-template-columns: repeat(3"] {
                        grid-template-columns: 1fr !important;
                    }
                    section > div > div[style*="grid-template-columns: 1.2fr"] {
                        grid-template-columns: 1fr !important;
                    }
                    .hero-3d-container { height: 350px !important; }
                    .hero-stats { flex-wrap: wrap !important; gap: 24px !important; justify-content: center !important; }
                    .hero-badge-anim[style*="position: absolute"] { display: none; }
                }
            `}</style>
        </div>
    );
}
