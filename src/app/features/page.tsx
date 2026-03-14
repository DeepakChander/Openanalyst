'use client';

import { useRef, useState, useEffect, useCallback, Suspense, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header, Footer } from '@/components';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════ DATA ═══════════ */
const integrations = [
    { name: 'Gmail', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg', color: '#EA4335' },
    { name: 'Slack', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg', color: '#E01E5A' },
    { name: 'HubSpot', logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png', color: '#FF7A59' },
    { name: 'Google Ads', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Ads_logo.svg', color: '#4285F4' },
    { name: 'LinkedIn', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png', color: '#0A66C2' },
    { name: 'Stripe', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg', color: '#635BFF' },
    { name: 'Notion', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png', color: '#000000' },
    { name: 'Shopify', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg', color: '#96BF48' },
    { name: 'YouTube', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg', color: '#FF0000' },
    { name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png', color: '#1877F2' },
    { name: 'Zoom', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Zoom_Logo_2022.svg', color: '#2D8CFF' },
    { name: 'Sheets', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg', color: '#34A853' },
    { name: 'Airtable', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Airtable_Logo.svg', color: '#18BFFF' },
    { name: 'Calendly', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Calendly_Logo.png', color: '#006BFF' },
    { name: 'Supabase', logo: 'https://cf-assets.www.cloudflare.com/slt3lc6tev37/5gFRBFABLkFJaOGOUGlBfn/d29b9e2253e47bf44d10bb1e9733e06f/supabase.svg', color: '#3ECF8E' },
    { name: 'Dropbox', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg', color: '#0061FF' },
    { name: 'Analytics', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/77/GAnalytics.svg', color: '#E37400' },
    { name: 'WhatsApp', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg', color: '#25D366' },
    { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg', color: '#0081FB' },
    { name: 'Drive', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg', color: '#4285F4' },
    { name: 'Calendar', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg', color: '#4285F4' },
    { name: 'Salesforce', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg', color: '#00A1E0' },
    { name: 'TikTok', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg', color: '#000000' },
    { name: 'Twitter / X', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg', color: '#000000' },
    { name: 'Mailchimp', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Mailchimp_Logo.svg', color: '#FFE01B' },
    { name: 'Twilio', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Twilio-logo-red.svg', color: '#F22F46' },
    { name: 'Intercom', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Intercom_logo.svg', color: '#6AFDEF' },
];

const features = [
    {
        id: '01',
        title: 'AI-Powered Campaigns',
        subtitle: 'Intelligent Automation',
        description: 'Launch, monitor, and optimize multi-channel marketing campaigns powered by 42 specialist AI agents that understand your brand, audience, and objectives.',
        details: [
            'Multi-channel orchestration across email, social, ads',
            'Real-time performance optimization with AI feedback loops',
            'A/B testing with automated winner selection',
            'Predictive budget allocation across channels',
        ],
        accent: '#FF6B00',
    },
    {
        id: '02',
        title: 'Deep Analytics',
        subtitle: 'Research & Intelligence',
        description: 'Surface insights buried in your data with research agents that analyze competitors, identify market trends, and deliver actionable intelligence.',
        details: [
            'Competitor intelligence with real-time monitoring',
            'Trend detection across social, search, and news',
            'Audience segmentation with behavioral clustering',
            'ROI attribution across touchpoints',
        ],
        accent: '#FF8533',
    },
    {
        id: '03',
        title: 'Universal Integrations',
        subtitle: '27+ Connected Platforms',
        description: 'Connect your entire martech stack. OpenAnalyst orchestrates data across 27+ platforms, creating a unified view of your marketing ecosystem.',
        details: [
            'Gmail, Slack, Google Drive native integrations',
            'Ad platforms: Google, Meta, TikTok, LinkedIn',
            'CRM: HubSpot, Salesforce, Airtable',
            'Payments: Stripe, Shopify, Analytics',
        ],
        accent: '#E85D00',
    },
    {
        id: '04',
        title: 'Agentic Skills',
        subtitle: 'Beyond Simple Automation',
        description: '14 specialized agentic skills that go beyond simple automation — each one a complete workflow engine capable of end-to-end task execution.',
        details: [
            'Content creation with brand voice consistency',
            'Social media scheduling and engagement',
            'Lead scoring and qualification workflows',
            'Custom skill builder for unique workflows',
        ],
        accent: '#FF6B00',
    },
];

/* ═══════════ 3D AI NETWORK SCENE ═══════════ */
function NetworkNode({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        const t = clock.getElapsedTime();
        meshRef.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.12;
        if (glowRef.current) {
            glowRef.current.position.y = meshRef.current.position.y;
            glowRef.current.scale.setScalar(1 + Math.sin(t * 1.5 + position[0] * 2) * 0.15);
        }
    });
    return (
        <group>
            <mesh ref={glowRef} position={position}>
                <sphereGeometry args={[0.22 * scale, 16, 16]} />
                <meshStandardMaterial color={color} transparent opacity={0.15} emissive={color} emissiveIntensity={0.8} />
            </mesh>
            <mesh ref={meshRef} position={position}>
                <sphereGeometry args={[0.12 * scale, 16, 16]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.2} metalness={0.8} />
            </mesh>
        </group>
    );
}

function NetworkEdge({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
    const ref = useRef<THREE.Mesh>(null);
    const { mid, length, rotation } = useMemo(() => {
        const s = new THREE.Vector3(...start);
        const e = new THREE.Vector3(...end);
        const m = s.clone().add(e).multiplyScalar(0.5);
        const dir = e.clone().sub(s);
        const len = dir.length();
        const quat = new THREE.Quaternion();
        quat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
        const euler = new THREE.Euler().setFromQuaternion(quat);
        return { mid: m, length: len, rotation: euler };
    }, [start, end]);

    return (
        <mesh ref={ref} position={[mid.x, mid.y, mid.z]} rotation={rotation}>
            <cylinderGeometry args={[0.006, 0.006, length, 4]} />
            <meshBasicMaterial color={color} transparent opacity={0.15} />
        </mesh>
    );
}

function CentralCore() {
    const groupRef = useRef<THREE.Group>(null);
    const ringRef1 = useRef<THREE.Mesh>(null);
    const ringRef2 = useRef<THREE.Mesh>(null);
    const coreRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (groupRef.current) groupRef.current.rotation.y = t * 0.1;
        if (ringRef1.current) { ringRef1.current.rotation.x = t * 0.3; ringRef1.current.rotation.z = t * 0.1; }
        if (ringRef2.current) { ringRef2.current.rotation.x = -t * 0.2; ringRef2.current.rotation.y = t * 0.25; }
        if (coreRef.current) {
            coreRef.current.rotation.x = t * 0.15;
            coreRef.current.rotation.y = t * 0.2;
            const s = 1 + Math.sin(t * 1.2) * 0.05;
            coreRef.current.scale.setScalar(s);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Core icosahedron */}
            <mesh ref={coreRef}>
                <icosahedronGeometry args={[0.5, 1]} />
                <meshStandardMaterial color="#FF8533" transparent opacity={0.8} roughness={0.1} metalness={0.9} emissive="#FF6B00" emissiveIntensity={0.5} />
            </mesh>
            {/* Wireframe shell */}
            <mesh>
                <icosahedronGeometry args={[0.65, 1]} />
                <meshStandardMaterial color="#FF6B00" wireframe transparent opacity={0.2} />
            </mesh>
            {/* Orbit ring 1 */}
            <mesh ref={ringRef1}>
                <torusGeometry args={[1.0, 0.012, 16, 80]} />
                <meshStandardMaterial color="#FF8533" emissive="#FF6B00" emissiveIntensity={0.5} transparent opacity={0.4} />
            </mesh>
            {/* Orbit ring 2 */}
            <mesh ref={ringRef2} rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[1.3, 0.008, 16, 80]} />
                <meshStandardMaterial color="#FFB380" emissive="#FF8533" emissiveIntensity={0.3} transparent opacity={0.25} />
            </mesh>
        </group>
    );
}

function HeroParticles() {
    const ref = useRef<THREE.Points>(null);
    const count = 300;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 3 + Math.random() * 2;
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, []);

    useFrame(({ clock }) => {
        if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.03;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial color="#FF8533" size={0.025} transparent opacity={0.4} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
        </points>
    );
}

const nodePositions: [number, number, number][] = [
    [-1.8, 1.2, 0.5], [1.5, 1.5, -0.3], [2.0, -0.3, 0.8], [-1.5, -1.3, -0.2],
    [0.3, 2.0, -0.8], [-2.2, -0.2, -0.5], [1.0, -1.8, 0.3], [-0.5, -2.0, 0.6],
    [2.3, 0.8, -0.5], [-1.0, 0.5, 1.2], [0.8, 0.3, -1.5], [-0.3, 1.5, 0.9],
];

const nodeColors = ['#FF8533', '#FFB380', '#FF6B00', '#FFB380', '#FF8533', '#FFB380', '#FF6B00', '#FFB380', '#FF8533', '#FFB380', '#FF6B00', '#FFB380'];

const edges: [number, number][] = [
    [0, 4], [0, 9], [1, 4], [1, 8], [2, 8], [2, 6], [3, 5], [3, 7],
    [4, 11], [5, 9], [6, 7], [9, 11], [10, 1], [10, 3], [11, 0],
];

function HeroNetworkScene() {
    return (
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} style={{ width: '100%', height: '100%' }} gl={{ alpha: true, antialias: true }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.6} color="#FF8533" />
            <pointLight position={[-4, -3, 4]} intensity={0.3} color="#FFF4EB" />
            <directionalLight position={[0, 3, 5]} intensity={0.4} />
            <CentralCore />
            {nodePositions.map((pos, i) => (
                <NetworkNode key={i} position={pos} color={nodeColors[i]} scale={0.7 + Math.random() * 0.6} />
            ))}
            {edges.map(([a, b], i) => (
                <NetworkEdge key={i} start={nodePositions[a]} end={nodePositions[b]} color="#FF8533" />
            ))}
            <HeroParticles />
        </Canvas>
    );
}

/* ═══════════ ANIMATED COUNTER ═══════════ */
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
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
            val: value, duration: 2, ease: 'power2.out',
            onUpdate: () => { if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix; },
        });
    }, [visible, value, suffix]);

    return <span ref={ref}>0{suffix}</span>;
}

/* ═══════════ MAIN PAGE ═══════════ */
export default function FeaturesPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const [activeFeature, setActiveFeature] = useState(0);

    useGSAP(() => {
        gsap.from('.feat-hero-line', { y: 100, opacity: 0, stagger: 0.15, duration: 1.2, ease: 'power4.out', delay: 0.3 });
        gsap.from('.feat-hero-sub', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.9 });
        gsap.from('.feat-hero-cta', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 1.2 });

        gsap.from('.feat-stat', {
            y: 30, stagger: 0.1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.feat-stats-bar', start: 'top 90%', once: true },
        });

        const featurePanels = gsap.utils.toArray<HTMLElement>('.feat-panel');
        featurePanels.forEach((panel, i) => {
            ScrollTrigger.create({
                trigger: panel, start: 'top 60%', end: 'bottom 40%',
                onEnter: () => setActiveFeature(i), onEnterBack: () => setActiveFeature(i),
            });
            gsap.from(panel.querySelector('.feat-panel-content'), {
                x: -40, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: panel, start: 'top 85%', once: true },
            });
            gsap.from(panel.querySelector('.feat-panel-visual'), {
                x: 40, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: panel, start: 'top 85%', once: true },
            });
        });

        gsap.from('.integ-card', {
            y: 20, scale: 0.95, stagger: 0.02, duration: 0.4, ease: 'power2.out',
            scrollTrigger: { trigger: '.integ-section', start: 'top 85%', once: true },
        });
    }, { scope: pageRef });

    return (
        <div ref={pageRef} style={{ minHeight: '100vh' }}>
            <Header />

            {/* ═══════════ HERO — Split: 3D Left + Text Right ═══════════ */}
            <section ref={heroRef} style={{
                minHeight: '100vh', display: 'flex', alignItems: 'center',
                position: 'relative', overflow: 'hidden', paddingTop: '80px',
                backgroundColor: '#FFFFFF', color: '#1A1A1A',
            }}>
                {/* Subtle background elements */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.15,
                    backgroundImage: 'radial-gradient(circle, rgba(255,107,0,0.08) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                    maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 80%)',
                }} />
                <div style={{
                    position: 'absolute', top: '20%', left: '10%', width: '500px', height: '500px',
                    background: 'radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)',
                    pointerEvents: 'none', filter: 'blur(60px)',
                }} />

                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 2, width: '100%' }}>
                    <div className="feat-hero-grid" style={{
                        display: 'grid', gridTemplateColumns: '1fr 1fr',
                        gap: '60px', alignItems: 'center',
                    }}>
                        {/* LEFT — 3D AI Network */}
                        <div className="feat-hero-3d" style={{ position: 'relative', height: '520px' }}>
                            <Suspense fallback={null}>
                                <HeroNetworkScene />
                            </Suspense>
                            {/* Floating label badges around the 3D */}
                            <div className="feat-hero-line" style={{
                                position: 'absolute', top: '12%', left: '5%',
                                padding: '6px 14px', borderRadius: '8px',
                                background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.15)',
                                backdropFilter: 'blur(8px)',
                                fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--rust-light)',
                                letterSpacing: '0.08em',
                            }}>42 AI AGENTS</div>
                            <div className="feat-hero-line" style={{
                                position: 'absolute', bottom: '18%', right: '8%',
                                padding: '6px 14px', borderRadius: '8px',
                                background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.15)',
                                backdropFilter: 'blur(8px)',
                                fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--rust-light)',
                                letterSpacing: '0.08em',
                            }}>27+ INTEGRATIONS</div>
                            <div className="feat-hero-line" style={{
                                position: 'absolute', top: '50%', right: '3%', transform: 'translateY(-50%)',
                                padding: '6px 14px', borderRadius: '8px',
                                background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.15)',
                                backdropFilter: 'blur(8px)',
                                fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--rust-light)',
                                letterSpacing: '0.08em',
                            }}>14 SKILLS</div>
                        </div>

                        {/* RIGHT — Text content */}
                        <div>
                            <div style={{ overflow: 'hidden', marginBottom: '8px' }}>
                                <span className="feat-hero-line" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    fontFamily: 'var(--font-mono)', fontSize: '12px',
                                    color: 'var(--rust-light)', textTransform: 'uppercase', letterSpacing: '0.12em',
                                }}>
                                    <span style={{ width: '24px', height: '1px', background: 'var(--rust)' }} />
                                    Capabilities & Integrations
                                </span>
                            </div>
                            <div style={{ overflow: 'hidden', marginBottom: '8px' }}>
                                <h1 className="feat-hero-line" style={{
                                    fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                                    fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em', color: '#1A1A1A',
                                }}>Every tool</h1>
                            </div>
                            <div style={{ overflow: 'hidden', marginBottom: '28px' }}>
                                <h1 className="feat-hero-line" style={{
                                    fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                                    fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em',
                                }}><span className="text-gradient">you need.</span></h1>
                            </div>
                            <p className="feat-hero-sub" style={{
                                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', color: '#4A4A4A',
                                lineHeight: 1.75, maxWidth: '440px', marginBottom: '36px',
                                fontFamily: 'var(--font-body)',
                            }}>
                                42 AI agents, 14 agentic skills, and 27+ integrations — orchestrated to transform your marketing from reactive to predictive.
                            </p>

                            {/* Stats row */}
                            <div className="feat-hero-sub" style={{
                                display: 'flex', gap: '32px', marginBottom: '36px',
                                paddingBottom: '28px', borderBottom: '1px solid rgba(0,0,0,0.06)',
                            }}>
                                {[{ val: '42+', label: 'AI Agents' }, { val: '14', label: 'Skills' }, { val: '27+', label: 'Integrations' }].map((s, i) => (
                                    <div key={i}>
                                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: 'var(--rust-light)', letterSpacing: '-0.02em' }}>{s.val}</div>
                                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#8A8A8A', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '2px' }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="feat-hero-cta" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                <a href="https://app.openanalyst.com" className="btn-primary">Start Free Trial <span style={{ fontSize: '18px' }}>→</span></a>
                                <a href="#features" className="btn-outline">Explore Features</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 2,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#8A8A8A', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
                    <div style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg, var(--rust), transparent)' }} />
                </div>
            </section>

            {/* ═══════════ STATS BAR — Light ═══════════ */}
            <section className="feat-stats-bar" style={{
                padding: '60px 24px',
                borderBottom: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-ivory)',
            }}>
                <div style={{
                    maxWidth: '1000px', margin: '0 auto',
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', textAlign: 'center',
                }}>
                    {[
                        { value: 42, suffix: '+', label: 'AI Agents' },
                        { value: 14, suffix: '', label: 'Agentic Skills' },
                        { value: 27, suffix: '+', label: 'Integrations' },
                        { value: 99, suffix: '%', label: 'Uptime SLA' },
                    ].map((stat, i) => (
                        <div key={i} className="feat-stat">
                            <div style={{
                                fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)',
                                fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-dark)', marginBottom: '4px',
                            }}>
                                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                            </div>
                            <div style={{
                                fontFamily: 'var(--font-mono)', fontSize: '11px',
                                color: 'var(--rust)', textTransform: 'uppercase', letterSpacing: '0.1em',
                            }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════ FEATURES — Sticky Scroll Panels (Light) ═══════════ */}
            <section id="features" style={{ padding: '120px 0', backgroundColor: 'var(--bg-ivory)', color: 'var(--text-dark)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '100px' }}>
                        <span style={{
                            fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--rust)',
                            textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '16px',
                        }}>Core Features</span>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text-dark)',
                        }}>
                            Built for the future<br /><span className="text-gradient">of marketing</span>
                        </h2>
                    </div>

                    {features.map((feature, i) => (
                        <div key={feature.id} className="feat-panel" style={{
                            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px',
                            alignItems: 'center', minHeight: '70vh', padding: '60px 0',
                            direction: i % 2 !== 0 ? 'rtl' : 'ltr',
                        }}>
                            <div className="feat-panel-content" style={{ direction: 'ltr' }}>
                                <span style={{
                                    fontFamily: 'var(--font-mono)', fontSize: '48px', fontWeight: 800,
                                    color: 'rgba(255,107,0,0.12)', lineHeight: 1, display: 'block', marginBottom: '16px',
                                }}>{feature.id}</span>
                                <span style={{
                                    fontFamily: 'var(--font-mono)', fontSize: '11px', color: feature.accent,
                                    textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '12px',
                                }}>{feature.subtitle}</span>
                                <h3 style={{
                                    fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                                    fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '20px',
                                    color: 'var(--text-dark)',
                                }}>{feature.title}</h3>
                                <p style={{
                                    fontSize: '16px', color: '#4A4A4A', lineHeight: 1.8, marginBottom: '32px',
                                }}>{feature.description}</p>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {feature.details.map((detail, j) => (
                                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: '#4A4A4A' }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: feature.accent, flexShrink: 0, marginTop: '6px' }} />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="feat-panel-visual" style={{ direction: 'ltr' }}>
                                <div style={{
                                    borderRadius: '24px', border: '1px solid var(--border-light)',
                                    backgroundColor: '#0f0d0b', padding: '48px 36px',
                                    position: 'relative', overflow: 'hidden', minHeight: '400px',
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                                }}>
                                    <div style={{
                                        position: 'absolute', top: '-50%', right: '-50%', width: '100%', height: '100%',
                                        background: `radial-gradient(circle, ${feature.accent}20 0%, transparent 70%)`, pointerEvents: 'none',
                                    }} />
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f57' }} />
                                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#febc2e' }} />
                                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28c840' }} />
                                        </div>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#8A8A8A', marginLeft: '8px' }}>
                                            openanalyst — {feature.subtitle.toLowerCase()}
                                        </span>
                                    </div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 2.2, position: 'relative', zIndex: 1, color: '#d4d4d8' }}>
                                        <div><span style={{ color: '#3b82f6' }}>import</span> <span style={{ color: '#98c379' }}>{'{ Agent }'}</span> <span style={{ color: '#3b82f6' }}>from</span> <span style={{ color: '#98c379' }}>&apos;@openanalyst/core&apos;</span></div>
                                        <div style={{ color: '#6b7280' }}>// {feature.subtitle}</div>
                                        <div><span style={{ color: '#3b82f6' }}>const</span> <span style={{ color: '#FF8533' }}>agent</span> = <span style={{ color: '#3b82f6' }}>await</span> Agent.<span style={{ color: '#dcdcaa' }}>create</span>({'{'})</div>
                                        <div style={{ paddingLeft: '24px' }}><span style={{ color: '#FF8533' }}>skill</span>: <span style={{ color: '#98c379' }}>&apos;{feature.title.toLowerCase().replace(/ /g, '-')}&apos;</span>,</div>
                                        <div style={{ paddingLeft: '24px' }}><span style={{ color: '#FF8533' }}>mode</span>: <span style={{ color: '#98c379' }}>&apos;autonomous&apos;</span>,</div>
                                        <div>{'}'})</div>
                                        <div style={{ marginTop: '8px' }}><span style={{ color: '#39ff14' }}>▸</span> <span style={{ color: 'rgba(255,255,255,0.6)' }}>Agent initialized successfully</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════ FEATURE PROGRESS INDICATOR ═══════════ */}
            <div style={{
                position: 'fixed', right: '30px', top: '50%', transform: 'translateY(-50%)', zIndex: 100,
                display: 'flex', flexDirection: 'column', gap: '12px',
            }}>
                {features.map((f, i) => (
                    <div key={i} style={{
                        width: '3px', height: activeFeature === i ? '32px' : '12px', borderRadius: '3px',
                        backgroundColor: activeFeature === i ? 'var(--rust)' : 'rgba(255,107,0,0.2)',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    }} />
                ))}
            </div>

            {/* ═══════════ INTEGRATIONS — Light Theme ═══════════ */}
            <section className="integ-section" style={{
                padding: '120px 24px', backgroundColor: '#ffffff',
                position: 'relative', overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '600px', height: '600px',
                    background: 'radial-gradient(circle, rgba(255,107,0,0.04) 0%, transparent 70%)', pointerEvents: 'none',
                }} />

                <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 24px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <span style={{
                            fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--rust)',
                            textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '16px',
                        }}>Ecosystem</span>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '16px', color: 'var(--text-dark)',
                        }}>Connected to <span className="text-gradient">everything</span></h2>
                        <p style={{ fontSize: '16px', color: '#4A4A4A', maxWidth: '480px', margin: '0 auto' }}>
                            27+ native integrations that sync your entire marketing stack in real-time.
                        </p>
                    </div>

                    <div className="integ-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(9, 1fr)',
                        gridTemplateRows: 'repeat(3, 100px)',
                        gap: '12px',
                    }}>
                        {integrations.map((integ) => (
                            <div
                                key={integ.name}
                                className="integ-card"
                                style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                    gap: '8px', padding: '12px 4px', borderRadius: '14px',
                                    border: '1px solid var(--border-light)',
                                    backgroundColor: '#ffffff',
                                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', cursor: 'default',
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                                    height: '100px',
                                    overflow: 'hidden',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = integ.color + '60';
                                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)';
                                    e.currentTarget.style.boxShadow = `0 8px 24px ${integ.color}20`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border-light)';
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.03)';
                                }}
                            >
                                <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
                                    <img
                                        src={integ.logo}
                                        alt={integ.name}
                                        loading="lazy"
                                        style={{ objectFit: 'contain', width: '36px', height: '36px', display: 'block' }}
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            target.style.display = 'none';
                                            const fallback = target.nextElementSibling as HTMLElement;
                                            if (fallback) fallback.style.display = 'flex';
                                        }}
                                    />
                                    <div style={{
                                        display: 'none', width: '36px', height: '36px', borderRadius: '8px',
                                        backgroundColor: integ.color + '18', color: integ.color,
                                        alignItems: 'center', justifyContent: 'center',
                                        fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-heading)',
                                    }}>{integ.name.charAt(0)}</div>
                                </div>
                                <span style={{
                                    fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500,
                                    color: '#4A4A4A', textAlign: 'center', lineHeight: 1,
                                    overflow: 'hidden', textOverflow: 'ellipsis',
                                    maxWidth: '100%', whiteSpace: 'nowrap', flexShrink: 0,
                                }}>{integ.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            <style>{`
                @media (max-width: 900px) {
                    .feat-hero-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
                    .feat-hero-3d { height: 320px !important; }
                    .feat-panel { grid-template-columns: 1fr !important; gap: 40px !important; direction: ltr !important; min-height: auto !important; padding: 40px 0 !important; }
                    .feat-stats-bar > div { grid-template-columns: repeat(2, 1fr) !important; }
                    .integ-grid { grid-template-columns: repeat(5, 1fr) !important; grid-template-rows: none !important; }
                    .integ-grid .integ-card { height: 100px !important; }
                }
                @media (max-width: 600px) {
                    .feat-stats-bar > div { grid-template-columns: 1fr !important; }
                    .integ-grid { grid-template-columns: repeat(3, 1fr) !important; grid-template-rows: none !important; }
                    .integ-grid .integ-card { height: 90px !important; }
                }
            `}</style>
        </div>
    );
}
