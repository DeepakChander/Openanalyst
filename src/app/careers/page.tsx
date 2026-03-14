'use client';

import { useRef, useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Torus, Box, Icosahedron, Octahedron, OrbitControls } from '@react-three/drei';
import { Header, Footer } from '@/components';
import Magnetic from '@/components/Magnetic';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════ */

const values = [
    {
        tag: 'CULTURE',
        title: 'Remote-First DNA',
        desc: 'Work from anywhere on Earth. Great talent isn\'t bound by zip codes — we\'ve built async-first workflows that let you do your best work, wherever you are.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
        gradient: 'linear-gradient(135deg, #FF6B00 0%, #FF8533 100%)',
    },
    {
        tag: 'INNOVATION',
        title: 'Ship Fast, Learn Faster',
        desc: 'We deploy daily. Experiment boldly, iterate relentlessly, and celebrate the audacity to try new things. Failure is feedback.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
        gradient: 'linear-gradient(135deg, #E85D00 0%, #FF6B00 100%)',
    },
    {
        tag: 'GROWTH',
        title: 'Compound Your Skills',
        desc: '$5K/yr learning budget. Courses, conferences, certifications — invest in yourself and we\'ll match your ambition.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        ),
        gradient: 'linear-gradient(135deg, #FF8533 0%, #FFB380 100%)',
    },
    {
        tag: 'COMMUNITY',
        title: 'Open Source Heart',
        desc: 'We build in public and contribute back. Our tools are used by thousands — you\'ll ship code that matters beyond our walls.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        gradient: 'linear-gradient(135deg, #FF6B00 0%, #E85D00 100%)',
    },
];

const benefits = [
    {
        title: 'Meaningful Equity',
        desc: 'Own a piece of the future — every team member holds real equity from day one.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
            </svg>
        ),
    },
    {
        title: 'Flexible Hours',
        desc: 'No clock-watching. We measure output, not hours. Design your day around your life.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
        ),
    },
    {
        title: 'Health & Wellness',
        desc: 'Full medical, dental, vision + $200/mo wellness stipend for gym, therapy, or whatever fuels you.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        ),
    },
    {
        title: 'Team Retreats',
        desc: 'Annual offsites in inspiring locations. Last year: Lisbon. This year: Tokyo.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
        ),
    },
    {
        title: 'Latest Hardware',
        desc: 'MacBook Pro M4, 4K display, ergonomic setup — whatever tools you need to do your best work.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
    },
    {
        title: 'Parental Leave',
        desc: '16 weeks fully-paid parental leave for all new parents. Because family comes first.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        title: 'Unlimited PTO',
        desc: 'Take what you need. Minimum 3 weeks enforced — we mean it. Rest is productive.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
        ),
    },
    {
        title: 'Learning Budget',
        desc: '$5,000/yr for courses, books, conferences. We invest in your growth relentlessly.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
        ),
    },
];

const departments = [
    {
        name: 'Engineering',
        emoji: '⚡',
        color: '#FF6B00',
        roles: [
            { title: 'Senior Full-Stack Engineer', location: 'Remote · Worldwide', type: 'Full-time' },
            { title: 'ML/AI Engineer', location: 'Remote · Worldwide', type: 'Full-time' },
            { title: 'Platform Engineer', location: 'Remote · Worldwide', type: 'Full-time' },
            { title: 'Frontend Engineer (React)', location: 'Remote · Worldwide', type: 'Full-time' },
        ],
    },
    {
        name: 'Product & Design',
        emoji: '✦',
        color: '#E85D00',
        roles: [
            { title: 'Product Manager', location: 'Remote · US/EU', type: 'Full-time' },
            { title: 'Senior Product Designer', location: 'Remote · Worldwide', type: 'Full-time' },
            { title: 'UX Researcher', location: 'Remote · US/EU', type: 'Full-time' },
        ],
    },
    {
        name: 'Marketing & Growth',
        emoji: '◈',
        color: '#FF8533',
        roles: [
            { title: 'Growth Lead', location: 'Remote · US', type: 'Full-time' },
            { title: 'Content Strategist', location: 'Remote · Worldwide', type: 'Full-time' },
            { title: 'Developer Advocate', location: 'Remote · Worldwide', type: 'Full-time' },
        ],
    },
    {
        name: 'Operations',
        emoji: '○',
        color: '#FFB380',
        roles: [
            { title: 'People Operations Lead', location: 'Remote · US/EU', type: 'Full-time' },
            { title: 'Business Development', location: 'Remote · US', type: 'Full-time' },
            { title: 'Customer Success Manager', location: 'Remote · Worldwide', type: 'Full-time' },
        ],
    },
];

const hiringSteps = [
    {
        num: '01',
        title: 'Apply',
        desc: 'Submit your application. Every one is read by a human — no AI screening, no black boxes.',
        duration: '< 1 min',
    },
    {
        num: '02',
        title: 'Intro Call',
        desc: '30-minute conversation about your goals, your craft, and what excites you about OpenAnalyst.',
        duration: '30 min',
    },
    {
        num: '03',
        title: 'Deep Dive',
        desc: 'A hands-on challenge relevant to your role. We want to see how you think, not trick you.',
        duration: '2-3 hrs',
    },
    {
        num: '04',
        title: 'Team Meet',
        desc: 'Meet your future teammates. Culture fit goes both ways — interview us too.',
        duration: '45 min',
    },
    {
        num: '05',
        title: 'Offer',
        desc: 'We move fast. Expect a decision within 5 business days and an offer designed to excite.',
        duration: '< 5 days',
    },
];

const testimonials = [
    {
        quote: 'I\'ve never worked at a place where I felt this much ownership over what I build. Every engineer here ships features that touch thousands of users weekly.',
        name: 'Sarah Chen',
        role: 'Senior Engineer',
        tenure: '1.5 years',
    },
    {
        quote: 'The learning culture is real. I went from junior to leading our ML pipeline in under a year. They invest in your growth, not just talk about it.',
        name: 'Marcus Rivera',
        role: 'ML Engineer',
        tenure: '2 years',
    },
    {
        quote: 'Remote-first done right. Async communication, no surveillance tools, trust by default. I do my best work from anywhere.',
        name: 'Aisha Patel',
        role: 'Product Designer',
        tenure: '1 year',
    },
    {
        quote: 'The speed at which we ship is addictive. We went from idea to production feature in 3 days last sprint. The autonomy here is unmatched.',
        name: 'James Okoro',
        role: 'Platform Engineer',
        tenure: '8 months',
    },
];

const lifeImages = [
    { label: 'Tokyo Offsite 2025', tag: 'RETREAT', aspect: 'tall', emoji: '🗼', gradient: 'linear-gradient(135deg, #FF6B00 0%, #FF8533 50%, #FFB380 100%)' },
    { label: 'Hack Week Finals', tag: 'CULTURE', aspect: 'wide', emoji: '🚀', gradient: 'linear-gradient(135deg, #1A1A1A 0%, #333 50%, #555 100%)' },
    { label: 'Team Standup', tag: 'DAILY', aspect: 'square', emoji: '☕', gradient: 'linear-gradient(135deg, #E85D00 0%, #FF6B00 50%, #FF8533 100%)' },
    { label: 'Product Launch Day', tag: 'MILESTONE', aspect: 'wide', emoji: '🎉', gradient: 'linear-gradient(135deg, #FF8533 0%, #FFB380 50%, #FFD9B3 100%)' },
    { label: 'Design Sprint', tag: 'WORKSHOP', aspect: 'tall', emoji: '🎨', gradient: 'linear-gradient(135deg, #2A1A0A 0%, #4A2A0A 50%, #6A3A0A 100%)' },
    { label: 'Friday Demos', tag: 'CULTURE', aspect: 'square', emoji: '🎤', gradient: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #2A2A2A 100%)' },
];

const marqueeItems = [
    'BUILD WITH PURPOSE', 'SHIP DAILY', 'THINK IN SYSTEMS',
    'QUESTION EVERYTHING', 'MOVE FAST', 'STAY CURIOUS',
    'OWN YOUR CRAFT', 'EMBRACE AMBIGUITY', 'DEFAULT TO ACTION',
    'LEARN IN PUBLIC',
];

const stats = [
    { num: 100, suffix: '%', label: 'Remote' },
    { num: 13, suffix: '+', label: 'Open Roles' },
    { num: 12, suffix: '', label: 'Countries' },
    { num: 4.9, suffix: '★', label: 'Glassdoor' },
    { num: 3, suffix: 'x', label: 'Growth YoY' },
];

/* ══════════════════════════════════════════════════════════════
   3D SCENES
   ══════════════════════════════════════════════════════════════ */

/* ─── Hero Particle Galaxy ─── */
function HeroParticles({ count = 800 }: { count?: number }) {
    const mesh = useRef<THREE.Points>(null);
    const { viewport } = useThree();

    const [positions, sizes] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const sz = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 2 + Math.random() * 4;
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
            sz[i] = Math.random() * 3 + 0.5;
        }
        return [pos, sz];
    }, [count]);

    const geomRef = useRef<THREE.BufferGeometry>(null);

    useEffect(() => {
        if (!geomRef.current) return;
        geomRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }, [positions]);

    useFrame((state) => {
        if (!mesh.current) return;
        mesh.current.rotation.y = state.clock.elapsedTime * 0.03;
        mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry ref={geomRef} />
            <pointsMaterial
                size={0.025}
                color="#FF6B00"
                transparent
                opacity={0.6}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

/* ─── Hero Floating Geometries ─── */
function HeroGeometries() {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!group.current) return;
        group.current.rotation.y = state.clock.elapsedTime * 0.05;
    });

    return (
        <group ref={group}>
            {/* Central morphing sphere */}
            <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
                <Sphere args={[1.2, 64, 64]} position={[0, 0, 0]}>
                    <MeshDistortMaterial
                        color="#FF6B00"
                        transparent
                        opacity={0.15}
                        distort={0.4}
                        speed={2}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </Sphere>
            </Float>

            {/* Orbiting torus */}
            <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.4}>
                <Torus args={[2.8, 0.02, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
                    <meshStandardMaterial color="#FF8533" transparent opacity={0.4} emissive="#FF6B00" emissiveIntensity={0.3} />
                </Torus>
            </Float>

            {/* Second torus */}
            <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.5}>
                <Torus args={[3.5, 0.015, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
                    <meshStandardMaterial color="#E85D00" transparent opacity={0.25} emissive="#FF6B00" emissiveIntensity={0.2} />
                </Torus>
            </Float>

            {/* Floating icosahedron */}
            <Float speed={2.5} rotationIntensity={1.2} floatIntensity={0.8}>
                <Icosahedron args={[0.4]} position={[2.5, 1.2, -1]}>
                    <meshStandardMaterial color="#FF6B00" wireframe transparent opacity={0.5} emissive="#FF8533" emissiveIntensity={0.5} />
                </Icosahedron>
            </Float>

            {/* Floating octahedron */}
            <Float speed={1.8} rotationIntensity={1.5} floatIntensity={0.6}>
                <Octahedron args={[0.35]} position={[-2.2, -0.8, 0.5]}>
                    <meshStandardMaterial color="#FF8533" wireframe transparent opacity={0.4} emissive="#FF6B00" emissiveIntensity={0.4} />
                </Octahedron>
            </Float>

            {/* Small floating boxes */}
            {[
                [-1.8, 2, -2],
                [2.8, -1.5, -1.5],
                [-3, 0.5, 1],
                [1.5, -2.2, 0.8],
            ].map((pos, i) => (
                <Float key={i} speed={1 + i * 0.5} rotationIntensity={2} floatIntensity={1}>
                    <Box args={[0.15, 0.15, 0.15]} position={pos as [number, number, number]}>
                        <meshStandardMaterial
                            color="#FF6B00"
                            transparent
                            opacity={0.3 + i * 0.1}
                            emissive="#FF8533"
                            emissiveIntensity={0.3}
                        />
                    </Box>
                </Float>
            ))}
        </group>
    );
}

/* ─── Values Section 3D Scene ─── */
function ValuesScene() {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!group.current) return;
        group.current.rotation.y = state.clock.elapsedTime * 0.08;
        group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.15;
    });

    return (
        <group ref={group}>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <Icosahedron args={[1.5]} position={[0, 0, 0]}>
                    <MeshWobbleMaterial
                        color="#FF6B00"
                        transparent
                        opacity={0.12}
                        factor={0.3}
                        speed={1.5}
                        wireframe
                    />
                </Icosahedron>
            </Float>
            {/* Orbiting dots */}
            {Array.from({ length: 30 }).map((_, i) => {
                const angle = (i / 30) * Math.PI * 2;
                const r = 2 + Math.sin(i * 1.5) * 0.5;
                return (
                    <Float key={i} speed={0.5 + (i % 3) * 0.3} floatIntensity={0.3}>
                        <Sphere args={[0.03]} position={[Math.cos(angle) * r, Math.sin(angle * 0.7) * 1.5, Math.sin(angle) * r]}>
                            <meshStandardMaterial color="#FF8533" emissive="#FF6B00" emissiveIntensity={0.8} />
                        </Sphere>
                    </Float>
                );
            })}
        </group>
    );
}

/* ─── Benefits Section 3D ─── */
function BenefitsScene() {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!group.current) return;
        group.current.rotation.y = state.clock.elapsedTime * 0.06;
    });

    return (
        <group ref={group}>
            {/* DNA-like double helix */}
            {Array.from({ length: 40 }).map((_, i) => {
                const t = i / 40;
                const angle = t * Math.PI * 4;
                const y = (t - 0.5) * 6;
                return (
                    <group key={i}>
                        <Float speed={0.8} floatIntensity={0.2}>
                            <Sphere args={[0.06]} position={[Math.cos(angle) * 1.5, y, Math.sin(angle) * 1.5]}>
                                <meshStandardMaterial color="#FF6B00" emissive="#FF8533" emissiveIntensity={0.6} transparent opacity={0.7} />
                            </Sphere>
                        </Float>
                        <Float speed={0.8} floatIntensity={0.2}>
                            <Sphere args={[0.06]} position={[Math.cos(angle + Math.PI) * 1.5, y, Math.sin(angle + Math.PI) * 1.5]}>
                                <meshStandardMaterial color="#FF8533" emissive="#FF6B00" emissiveIntensity={0.4} transparent opacity={0.5} />
                            </Sphere>
                        </Float>
                        {/* Connecting bar */}
                        {i % 3 === 0 && (
                            <mesh position={[0, y, 0]} rotation={[0, angle, Math.PI / 2]}>
                                <cylinderGeometry args={[0.008, 0.008, 3, 8]} />
                                <meshStandardMaterial color="#FF6B00" transparent opacity={0.15} />
                            </mesh>
                        )}
                    </group>
                );
            })}
        </group>
    );
}

/* ─── Hiring Timeline 3D ─── */
function TimelineScene() {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!group.current) return;
        group.current.rotation.y = state.clock.elapsedTime * 0.1;
        group.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    });

    return (
        <group ref={group}>
            {/* Rotating rings */}
            {[1, 1.5, 2, 2.5, 3].map((r, i) => (
                <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.5}>
                    <Torus args={[r, 0.01, 16, 64]} rotation={[Math.PI / 2 + i * 0.3, i * 0.5, 0]}>
                        <meshStandardMaterial
                            color="#FF6B00"
                            transparent
                            opacity={0.3 - i * 0.04}
                            emissive="#FF8533"
                            emissiveIntensity={0.3}
                        />
                    </Torus>
                </Float>
            ))}
            {/* Center glow sphere */}
            <Sphere args={[0.3, 32, 32]}>
                <MeshDistortMaterial
                    color="#FF6B00"
                    transparent
                    opacity={0.25}
                    distort={0.5}
                    speed={3}
                />
            </Sphere>
        </group>
    );
}

/* ─── CTA Section 3D ─── */
function CTAScene() {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!group.current) return;
        group.current.rotation.y = state.clock.elapsedTime * 0.04;
        group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    });

    return (
        <group ref={group}>
            {/* Exploding particles */}
            {Array.from({ length: 200 }).map((_, i) => {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const r = 1.5 + Math.random() * 3;
                return (
                    <Float key={i} speed={0.5 + Math.random()} floatIntensity={0.5}>
                        <Sphere
                            args={[0.015 + Math.random() * 0.02]}
                            position={[
                                r * Math.sin(phi) * Math.cos(theta),
                                r * Math.sin(phi) * Math.sin(theta),
                                r * Math.cos(phi),
                            ]}
                        >
                            <meshStandardMaterial
                                color={i % 3 === 0 ? '#FF6B00' : i % 3 === 1 ? '#FF8533' : '#E85D00'}
                                emissive="#FF6B00"
                                emissiveIntensity={0.8}
                                transparent
                                opacity={0.6}
                            />
                        </Sphere>
                    </Float>
                );
            })}
            {/* Central morphing form */}
            <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
                <Sphere args={[1, 64, 64]}>
                    <MeshDistortMaterial
                        color="#FF6B00"
                        transparent
                        opacity={0.1}
                        distort={0.6}
                        speed={1.5}
                        roughness={0}
                        metalness={1}
                    />
                </Sphere>
            </Float>
        </group>
    );
}

/* ─── Testimonials 3D Background ─── */
function TestimonialsScene() {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!group.current) return;
        group.current.rotation.y = state.clock.elapsedTime * 0.03;
    });

    return (
        <group ref={group}>
            {/* Floating quote-like shapes */}
            {Array.from({ length: 60 }).map((_, i) => {
                const x = (Math.random() - 0.5) * 10;
                const y = (Math.random() - 0.5) * 6;
                const z = (Math.random() - 0.5) * 6;
                return (
                    <Float key={i} speed={0.3 + Math.random() * 0.5} floatIntensity={0.4}>
                        <Box args={[0.05, 0.05, 0.05]} position={[x, y, z]} rotation={[Math.random(), Math.random(), Math.random()]}>
                            <meshStandardMaterial
                                color="#FF6B00"
                                transparent
                                opacity={0.15 + Math.random() * 0.2}
                                emissive="#FF8533"
                                emissiveIntensity={0.3}
                            />
                        </Box>
                    </Float>
                );
            })}
        </group>
    );
}

/* ─── Positions Section 3D ─── */
function PositionsScene() {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!group.current) return;
        group.current.rotation.y = state.clock.elapsedTime * 0.07;
    });

    return (
        <group ref={group}>
            {/* Grid of floating cubes */}
            {Array.from({ length: 4 }).map((_, row) =>
                Array.from({ length: 4 }).map((_, col) => {
                    const x = (col - 1.5) * 1.2;
                    const y = (row - 1.5) * 1.2;
                    return (
                        <Float key={`${row}-${col}`} speed={1 + (row + col) * 0.2} floatIntensity={0.5} rotationIntensity={0.8}>
                            <Box args={[0.3, 0.3, 0.3]} position={[x, y, 0]}>
                                <meshStandardMaterial
                                    color="#FF6B00"
                                    transparent
                                    opacity={0.08 + (row + col) * 0.02}
                                    wireframe
                                    emissive="#FF8533"
                                    emissiveIntensity={0.2}
                                />
                            </Box>
                        </Float>
                    );
                })
            )}
        </group>
    );
}

/* ─── Life Section 3D ─── */
function LifeScene() {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!group.current) return;
        group.current.rotation.z = state.clock.elapsedTime * 0.02;
    });

    return (
        <group ref={group}>
            {/* Constellation pattern */}
            {Array.from({ length: 50 }).map((_, i) => {
                const angle = (i / 50) * Math.PI * 2;
                const r = 1.5 + Math.sin(i * 0.8) * 1;
                return (
                    <Float key={i} speed={0.5 + (i % 5) * 0.2} floatIntensity={0.3}>
                        <Sphere args={[0.04]} position={[Math.cos(angle) * r, Math.sin(angle) * r, (Math.random() - 0.5) * 2]}>
                            <meshStandardMaterial color="#FF6B00" emissive="#FF8533" emissiveIntensity={0.9} transparent opacity={0.5} />
                        </Sphere>
                    </Float>
                );
            })}
        </group>
    );
}

/* ─── Reusable 3D Canvas Wrapper ─── */
function Scene3D({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
    return (
        <div className={className} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...style }}>
            <Canvas
                camera={{ position: [0, 0, 6], fov: 55 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} color="#FF8533" intensity={0.5} />
                <pointLight position={[-5, -3, 4]} color="#FFF4EB" intensity={0.3} />
                <Suspense fallback={null}>
                    {children}
                </Suspense>
            </Canvas>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
   UTILITY COMPONENTS
   ══════════════════════════════════════════════════════════════ */

/* ─── Animated Counter ─── */
function AnimatedNum({ target, suffix = '' }: { target: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [val, setVal] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                let start = 0;
                const duration = 2000;
                const startTime = performance.now();
                const isFloat = !Number.isInteger(target);
                const tick = (now: number) => {
                    const progress = Math.min((now - startTime) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    start = isFloat ? parseFloat((eased * target).toFixed(1)) : Math.round(eased * target);
                    setVal(start);
                    if (progress < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── 3D Tilt Card ─── */
function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateX = (y - 0.5) * -10;
        const rotateY = (x - 0.5) * 10;
        gsap.to(cardRef.current, {
            rotateX,
            rotateY,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 800,
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.4)',
        });
    }, []);

    return (
        <div
            ref={cardRef}
            className={className}
            style={{ transformStyle: 'preserve-3d', ...style }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
}

/* ─── Section Header ─── */
function SectionHeader({ tag, title, highlight, desc, align = 'left', light = false }: {
    tag: string; title: string; highlight: string; desc?: string; align?: 'left' | 'center'; light?: boolean;
}) {
    return (
        <div className="c-reveal" style={{
            textAlign: align, marginBottom: '56px',
            ...(align === 'left' ? { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: '20px' } : {}),
        }}>
            <div>
                <div style={{
                    display: align === 'center' ? 'inline-flex' : 'flex',
                    alignItems: 'center', gap: '10px', marginBottom: '16px',
                }}>
                    <span style={{
                        width: '8px', height: '8px', transform: 'rotate(45deg)',
                        backgroundColor: 'var(--rust)',
                    }} />
                    <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '11px',
                        color: 'var(--rust)', letterSpacing: '4px',
                        textTransform: 'uppercase',
                    }}>{tag}</span>
                </div>
                <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                    fontWeight: 700, color: light ? '#fff' : 'var(--text-dark)', lineHeight: 1.1,
                }}>
                    {title}{' '}
                    <span style={{
                        background: 'linear-gradient(135deg, var(--rust), var(--rust-light))',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>{highlight}</span>
                </h2>
            </div>
            {desc && align === 'left' && (
                <p style={{
                    fontSize: '0.95rem', color: light ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)',
                    lineHeight: 1.75, fontFamily: 'var(--font-body)', maxWidth: '360px', paddingTop: '8px',
                }}>{desc}</p>
            )}
            {desc && align === 'center' && (
                <p style={{
                    fontSize: '0.95rem', color: light ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)',
                    lineHeight: 1.75, fontFamily: 'var(--font-body)', maxWidth: '520px', margin: '16px auto 0',
                }}>{desc}</p>
            )}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════ */

export default function CareersPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const [activeDept, setActiveDept] = useState<string | null>(null);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    /* Auto-rotate testimonials */
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    /* GSAP Animations */
    useGSAP(() => {
        /* ── Hero ── */
        gsap.utils.toArray<HTMLElement>('.hero-line-mask').forEach((el, i) => {
            gsap.from(el, {
                y: '120%', opacity: 0,
                duration: 1.2, delay: 0.4 + i * 0.15,
                ease: 'power4.out',
            });
        });
        gsap.from('.hero-badge', { y: 24, opacity: 0, duration: 0.9, delay: 0.2, ease: 'power3.out' });
        gsap.from('.hero-sub', { y: 30, opacity: 0, duration: 1, delay: 0.8, ease: 'power3.out' });
        gsap.from('.hero-actions', { y: 24, opacity: 0, duration: 0.9, delay: 1.1, ease: 'power3.out' });
        gsap.from('.hero-scroll-hint', { opacity: 0, duration: 1.2, delay: 1.5, ease: 'power2.out' });
        gsap.from('.hero-stat-strip', { y: 20, opacity: 0, duration: 0.8, delay: 1.3, ease: 'power3.out' });

        /* ── Marquee ── */
        const mInner = document.querySelector('.careers-marquee-inner') as HTMLElement;
        if (mInner) {
            gsap.to(mInner, { xPercent: -50, duration: 35, ease: 'none', repeat: -1 });
        }

        /* ── Generic reveals ── */
        gsap.utils.toArray<HTMLElement>('.c-reveal').forEach((el) => {
            gsap.fromTo(el,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 90%', once: true } },
            );
        });

        /* ── Value cards ── */
        gsap.fromTo('.val-card',
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.values-grid', start: 'top 90%', once: true } },
        );

        /* ── Stats ── */
        gsap.fromTo('.stat-item',
            { y: 30, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.6, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: '.stats-strip', start: 'top 90%', once: true } },
        );

        /* ── Life gallery ── */
        gsap.fromTo('.life-card',
            { y: 50, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.life-grid', start: 'top 90%', once: true } },
        );

        /* ── Benefits ── */
        gsap.fromTo('.perk-card',
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.06, duration: 0.65, ease: 'power3.out',
            scrollTrigger: { trigger: '.perks-grid', start: 'top 90%', once: true } },
        );

        /* ── Department cards ── */
        gsap.fromTo('.dept-card',
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.dept-grid', start: 'top 90%', once: true } },
        );

        /* ── Hiring steps ── */
        gsap.fromTo('.hire-step',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.hiring-timeline', start: 'top 85%', once: true } },
        );
        gsap.from('.hire-line-progress', {
            scaleX: 0, transformOrigin: 'left center',
            duration: 2, ease: 'power2.out',
            scrollTrigger: { trigger: '.hiring-timeline', start: 'top 75%', once: true },
        });

        /* ── Testimonial cards ── */
        gsap.fromTo('.testimonial-section',
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.testimonial-section', start: 'top 90%', once: true } },
        );

        /* ── CTA ── */
        gsap.fromTo('.cta-line',
            { y: '100%', opacity: 0 },
            { y: '0%', opacity: 1, stagger: 0.12, duration: 1, ease: 'power4.out',
            scrollTrigger: { trigger: '.careers-cta', start: 'top 85%', once: true } },
        );

    }, { scope: pageRef });

    return (
        <div ref={pageRef} className="careers-page" style={{ minHeight: '100vh', overflow: 'hidden' }}>
            <Header />
            <main>

                {/* ═══════════════════════════════════════════════
                    SECTION 1: HERO — IMMERSIVE 3D GALAXY
                   ═══════════════════════════════════════════════ */}
                <section className="careers-hero" style={{
                    position: 'relative', minHeight: '100vh',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', backgroundColor: '#0A0A0A',
                }}>
                    {/* 3D Background */}
                    <Scene3D>
                        <HeroParticles count={600} />
                        <HeroGeometries />
                    </Scene3D>

                    {/* Gradient overlays */}
                    <div style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none',
                        background: `
                            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,107,0,0.08) 0%, transparent 60%),
                            radial-gradient(ellipse 50% 40% at 20% 80%, rgba(255,107,0,0.04) 0%, transparent 50%),
                            linear-gradient(180deg, rgba(10,10,10,0.3) 0%, transparent 30%, transparent 70%, rgba(10,10,10,0.8) 100%)
                        `,
                    }} />

                    {/* Grid lines */}
                    <div style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '80px 80px',
                    }} />

                    {/* Content */}
                    <div style={{
                        position: 'relative', zIndex: 2, textAlign: 'center',
                        maxWidth: '960px', padding: '0 24px',
                    }}>
                        {/* Badge */}
                        <div className="hero-badge" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                            padding: '8px 22px', borderRadius: '9999px',
                            border: '1px solid rgba(255,107,0,0.25)',
                            backgroundColor: 'rgba(255,107,0,0.08)',
                            backdropFilter: 'blur(16px)',
                            marginBottom: '40px',
                        }}>
                            <span style={{
                                width: '6px', height: '6px', borderRadius: '50%',
                                backgroundColor: '#2ecc71',
                                boxShadow: '0 0 12px rgba(46,204,113,0.6)',
                                animation: 'pulse-dot 2s ease-in-out infinite',
                            }} />
                            <span style={{
                                fontFamily: 'var(--font-mono)', fontSize: '11px',
                                color: 'rgba(255,255,255,0.8)', letterSpacing: '3px',
                                textTransform: 'uppercase', fontWeight: 500,
                            }}>
                                We&apos;re Hiring — {departments.reduce((sum, d) => sum + d.roles.length, 0)} Open Roles
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 style={{
                            fontFamily: 'var(--font-heading)', fontWeight: 800,
                            fontSize: 'clamp(3rem, 8.5vw, 7rem)',
                            lineHeight: 0.95, letterSpacing: '-0.03em',
                            marginBottom: '32px',
                        }}>
                            <span style={{ display: 'block', overflow: 'hidden' }}>
                                <span className="hero-line-mask" style={{ display: 'block', color: '#fff' }}>
                                    Build the
                                </span>
                            </span>
                            <span style={{ display: 'block', overflow: 'hidden' }}>
                                <span className="hero-line-mask" style={{
                                    display: 'block',
                                    background: 'linear-gradient(135deg, #FF6B00, #FF8533, #FFB380)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                }}>
                                    Future of AI
                                </span>
                            </span>
                            <span style={{ display: 'block', overflow: 'hidden' }}>
                                <span className="hero-line-mask" style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '0.5em' }}>
                                    with us
                                </span>
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="hero-sub" style={{
                            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                            color: 'rgba(255,255,255,0.55)',
                            lineHeight: 1.8, fontFamily: 'var(--font-body)',
                            maxWidth: '540px', margin: '0 auto 44px',
                        }}>
                            Join a team of builders, thinkers, and creators redefining how businesses
                            grow with AI-powered marketing intelligence.
                        </p>

                        {/* CTA Buttons */}
                        <div className="hero-actions" style={{
                            display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap',
                        }}>
                            <Magnetic>
                                <a href="#open-roles" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                                    padding: '16px 40px', fontSize: '13px',
                                    fontFamily: 'var(--font-mono)', fontWeight: 600,
                                    color: '#fff', backgroundColor: '#FF6B00',
                                    borderRadius: '9999px', textDecoration: 'none',
                                    transition: 'all 0.35s ease',
                                    boxShadow: '0 8px 40px rgba(255,107,0,0.4)',
                                    letterSpacing: '1.5px',
                                }}>
                                    VIEW OPEN ROLES
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M7 17l9.2-9.2M17 17V8H8" />
                                    </svg>
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a href="#culture" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    padding: '16px 40px', fontSize: '13px',
                                    fontFamily: 'var(--font-mono)', fontWeight: 600,
                                    color: 'rgba(255,255,255,0.8)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    borderRadius: '9999px', textDecoration: 'none',
                                    transition: 'all 0.35s ease',
                                    backdropFilter: 'blur(12px)',
                                    backgroundColor: 'rgba(255,255,255,0.04)',
                                    letterSpacing: '1.5px',
                                }}>
                                    OUR CULTURE
                                </a>
                            </Magnetic>
                        </div>

                        {/* Mini stats in hero */}
                        <div className="hero-stat-strip" style={{
                            display: 'flex', justifyContent: 'center', gap: '40px',
                            marginTop: '60px', flexWrap: 'wrap',
                        }}>
                            {[
                                { label: 'Team Members', value: '45+' },
                                { label: 'Countries', value: '12' },
                                { label: 'Raised', value: '$18M' },
                            ].map((s) => (
                                <div key={s.label} style={{ textAlign: 'center' }}>
                                    <div style={{
                                        fontFamily: 'var(--font-heading)', fontSize: '1.4rem',
                                        fontWeight: 700, color: '#FF8533',
                                    }}>{s.value}</div>
                                    <div style={{
                                        fontFamily: 'var(--font-mono)', fontSize: '9px',
                                        color: 'rgba(255,255,255,0.35)', letterSpacing: '2px',
                                        textTransform: 'uppercase', marginTop: '4px',
                                    }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="hero-scroll-hint" style={{
                        position: 'absolute', bottom: '36px', left: '50%',
                        transform: 'translateX(-50%)', display: 'flex',
                        flexDirection: 'column', alignItems: 'center', gap: '8px',
                    }}>
                        <span style={{
                            fontFamily: 'var(--font-mono)', fontSize: '10px',
                            color: 'rgba(255,255,255,0.25)', letterSpacing: '3px',
                            textTransform: 'uppercase',
                        }}>Scroll</span>
                        <div style={{
                            width: '1px', height: '36px',
                            background: 'linear-gradient(180deg, rgba(255,107,0,0.6) 0%, transparent 100%)',
                            animation: 'scroll-line 2s ease-in-out infinite',
                        }} />
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    SECTION 2: MARQUEE STRIP
                   ═══════════════════════════════════════════════ */}
                <div style={{
                    overflow: 'hidden', padding: '20px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    background: '#0A0A0A',
                }}>
                    <div className="careers-marquee-inner" style={{
                        display: 'flex', whiteSpace: 'nowrap', width: 'max-content',
                    }}>
                        {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
                            <span key={i} style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
                                fontWeight: 700, color: 'rgba(255,255,255,0.25)',
                                padding: '0 36px', letterSpacing: '4px',
                                display: 'inline-flex', alignItems: 'center', gap: '36px',
                            }}>
                                {item}
                                <span style={{
                                    width: '4px', height: '4px',
                                    transform: 'rotate(45deg)',
                                    backgroundColor: '#FF6B00', flexShrink: 0, opacity: 0.6,
                                }} />
                            </span>
                        ))}
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════
                    SECTION 3: CULTURE VALUES — WITH 3D
                   ═══════════════════════════════════════════════ */}
                <section id="culture" style={{
                    padding: '120px 24px 100px',
                    backgroundColor: '#FFFFFF',
                    position: 'relative', overflow: 'hidden',
                }}>
                    {/* 3D Background */}
                    <Scene3D style={{ opacity: 0.4 }}>
                        <ValuesScene />
                    </Scene3D>

                    <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                        <SectionHeader
                            tag="Our Values"
                            title="What Drives"
                            highlight="Everything"
                            desc="Culture isn't a perk list — it's how we operate every single day. These aren't aspirational; they're operational."
                        />

                        <div className="values-grid" style={{
                            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px',
                        }}>
                            {values.map((v, idx) => (
                                <TiltCard key={v.title} className="val-card" style={{
                                    padding: '36px 24px', borderRadius: '20px',
                                    backgroundColor: '#ffffff',
                                    border: '1px solid rgba(0,0,0,0.06)',
                                    transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
                                    cursor: 'default', position: 'relative', overflow: 'hidden',
                                }}>
                                    {/* Gradient corner accent */}
                                    <div style={{
                                        position: 'absolute', top: 0, right: 0, width: '150px', height: '150px',
                                        background: `radial-gradient(circle at top right, rgba(255,107,0,0.06) 0%, transparent 70%)`,
                                        pointerEvents: 'none',
                                    }} />
                                    {/* Bottom gradient line */}
                                    <div style={{
                                        position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
                                        background: v.gradient, opacity: 0, transition: 'opacity 0.4s ease',
                                    }} className="val-card-line" />

                                    <div style={{
                                        width: '52px', height: '52px', borderRadius: '16px',
                                        background: 'rgba(255,107,0,0.06)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#FF6B00', marginBottom: '24px',
                                        transition: 'all 0.4s ease',
                                    }}>{v.icon}</div>

                                    <span style={{
                                        fontFamily: 'var(--font-mono)', fontSize: '9px',
                                        color: '#FF6B00', letterSpacing: '3px', textTransform: 'uppercase',
                                        marginBottom: '10px', display: 'block', opacity: 0.7,
                                    }}>{v.tag}</span>

                                    <h4 style={{
                                        fontFamily: 'var(--font-heading)', fontSize: '1.15rem',
                                        fontWeight: 700, color: '#1A1A1A', marginBottom: '10px',
                                    }}>{v.title}</h4>

                                    <p style={{
                                        color: 'var(--text-muted)', fontSize: '0.85rem',
                                        lineHeight: 1.75, fontFamily: 'var(--font-body)',
                                    }}>{v.desc}</p>

                                    {/* Number watermark */}
                                    <div style={{
                                        position: 'absolute', top: '16px', right: '20px',
                                        fontFamily: 'var(--font-heading)', fontSize: '4rem',
                                        fontWeight: 800, color: 'rgba(255,107,0,0.04)',
                                        lineHeight: 1, pointerEvents: 'none',
                                    }}>0{idx + 1}</div>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    SECTION 4: STATS STRIP — DARK
                   ═══════════════════════════════════════════════ */}
                <div className="stats-strip" style={{
                    padding: '56px 24px',
                    backgroundColor: '#0A0A0A',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}>
                    <div style={{
                        maxWidth: '1000px', margin: '0 auto',
                        display: 'grid', gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: '24px',
                    }}>
                        {stats.map((s) => (
                            <div key={s.label} className="stat-item" style={{
                                textAlign: 'center', padding: '8px 0',
                                position: 'relative',
                            }}>
                                <div style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                                    fontWeight: 800, color: '#FF8533', lineHeight: 1.1,
                                }}>
                                    <AnimatedNum target={s.num} suffix={s.suffix} />
                                </div>
                                <div style={{
                                    fontFamily: 'var(--font-mono)', fontSize: '10px',
                                    color: 'rgba(255,255,255,0.35)', marginTop: '8px',
                                    textTransform: 'uppercase', letterSpacing: '3px',
                                }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════
                    SECTION 5: LIFE AT OPENANALYST — BENTO GRID
                   ═══════════════════════════════════════════════ */}
                <section style={{
                    padding: '120px 24px 100px',
                    backgroundColor: '#FFFFFF',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <Scene3D style={{ opacity: 0.3 }}>
                        <LifeScene />
                    </Scene3D>

                    <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                        <SectionHeader
                            tag="Life at OpenAnalyst"
                            title="Where Work Meets"
                            highlight="Wonder"
                            desc="From Tokyo offsites to Friday demo days — glimpses into what makes this team special."
                        />

                        <div className="life-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gridTemplateRows: 'repeat(2, 220px)',
                            gap: '16px',
                        }}>
                            {lifeImages.map((img, i) => (
                                <div key={i} className="life-card" style={{
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    gridColumn: i === 1 || i === 3 ? 'span 2' : 'span 1',
                                    cursor: 'default',
                                    transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
                                    background: img.gradient,
                                    minHeight: '220px',
                                }}
                                    onMouseEnter={(e) => {
                                        const el = e.currentTarget;
                                        el.style.transform = 'translateY(-4px) scale(1.01)';
                                        el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        const el = e.currentTarget;
                                        el.style.transform = 'translateY(0) scale(1)';
                                        el.style.boxShadow = 'none';
                                    }}
                                >
                                    {/* Noise texture overlay */}
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.08\'/%3E%3C/svg%3E")',
                                        opacity: 0.4,
                                    }} />

                                    {/* Emoji placeholder for image */}
                                    <div style={{
                                        position: 'absolute', top: '50%', left: '50%',
                                        transform: 'translate(-50%, -55%)',
                                        fontSize: i === 1 || i === 3 ? '64px' : '48px',
                                        filter: 'grayscale(0.1)',
                                        opacity: 0.9,
                                    }}>
                                        {img.emoji}
                                    </div>

                                    {/* Image placeholder badge */}
                                    <div style={{
                                        position: 'absolute', top: '16px', right: '16px',
                                        display: 'flex', alignItems: 'center', gap: '6px',
                                        backgroundColor: 'rgba(255,255,255,0.15)',
                                        backdropFilter: 'blur(10px)',
                                        padding: '6px 12px', borderRadius: '8px',
                                    }}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" width="14" height="14">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <polyline points="21 15 16 10 5 21" />
                                        </svg>
                                        <span style={{
                                            fontFamily: 'var(--font-mono)', fontSize: '9px',
                                            color: 'rgba(255,255,255,0.7)', letterSpacing: '1px',
                                        }}>PHOTO</span>
                                    </div>

                                    {/* Bottom content */}
                                    <div style={{
                                        position: 'absolute', bottom: 0, left: 0, right: 0,
                                        padding: '60px 24px 24px',
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                                    }}>
                                        <span style={{
                                            fontFamily: 'var(--font-mono)', fontSize: '9px',
                                            color: 'rgba(255,255,255,0.7)', letterSpacing: '3px', textTransform: 'uppercase',
                                            marginBottom: '6px', display: 'block',
                                        }}>{img.tag}</span>
                                        <span style={{
                                            fontFamily: 'var(--font-heading)', fontSize: '1.05rem',
                                            fontWeight: 700, color: '#FFFFFF',
                                        }}>{img.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    SECTION 6: BENEFITS & PERKS — WITH 3D DNA
                   ═══════════════════════════════════════════════ */}
                <section style={{
                    padding: '120px 24px 100px',
                    backgroundColor: '#FAFAFA',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <Scene3D style={{ opacity: 0.35 }}>
                        <BenefitsScene />
                    </Scene3D>

                    <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                        <SectionHeader
                            tag="Benefits & Perks"
                            title="Built for"
                            highlight="Your Best Work"
                            desc="We handle the logistics so you can focus on building extraordinary things."
                        />

                        <div className="perks-grid" style={{
                            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px',
                        }}>
                            {benefits.map((b, i) => (
                                <TiltCard key={b.title} className="perk-card" style={{
                                    padding: '32px 20px', borderRadius: '20px',
                                    backgroundColor: '#ffffff',
                                    border: '1px solid rgba(0,0,0,0.06)',
                                    transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
                                    cursor: 'default', position: 'relative', overflow: 'hidden',
                                }}>
                                    {/* Hover glow */}
                                    <div style={{
                                        position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
                                        background: 'radial-gradient(circle, rgba(255,107,0,0.03) 0%, transparent 50%)',
                                        pointerEvents: 'none', opacity: 0, transition: 'opacity 0.4s ease',
                                    }} className="perk-glow" />

                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: '14px',
                                        backgroundColor: 'rgba(255,107,0,0.06)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#FF6B00', marginBottom: '20px',
                                    }}>{b.icon}</div>

                                    <h4 style={{
                                        fontFamily: 'var(--font-heading)', fontSize: '1rem',
                                        fontWeight: 700, color: '#1A1A1A', marginBottom: '8px',
                                    }}>{b.title}</h4>

                                    <p style={{
                                        color: 'var(--text-muted)', fontSize: '0.83rem',
                                        lineHeight: 1.7, fontFamily: 'var(--font-body)',
                                    }}>{b.desc}</p>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    SECTION 7: EMPLOYEE TESTIMONIALS — WITH 3D
                   ═══════════════════════════════════════════════ */}
                <section className="testimonial-section" style={{
                    padding: '120px 24px 100px',
                    backgroundColor: '#0A0A0A',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <Scene3D style={{ opacity: 0.5 }}>
                        <TestimonialsScene />
                    </Scene3D>

                    <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                        <SectionHeader
                            tag="Testimonials"
                            title="Hear From"
                            highlight="The Team"
                            align="center"
                            light
                        />

                        {/* Active testimonial */}
                        <div style={{
                            position: 'relative', minHeight: '280px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            {testimonials.map((t, i) => (
                                <div key={i} style={{
                                    position: i === activeTestimonial ? 'relative' : 'absolute',
                                    opacity: i === activeTestimonial ? 1 : 0,
                                    transform: i === activeTestimonial ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                                    transition: 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
                                    textAlign: 'center',
                                    maxWidth: '700px',
                                    pointerEvents: i === activeTestimonial ? 'auto' : 'none',
                                }}>
                                    {/* Quote mark */}
                                    <div style={{
                                        fontFamily: 'var(--font-heading)', fontSize: '6rem',
                                        color: 'rgba(255,107,0,0.15)', lineHeight: 0.8,
                                        marginBottom: '-20px',
                                    }}>&ldquo;</div>

                                    <p style={{
                                        fontFamily: 'var(--font-body)', fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                                        color: 'rgba(255,255,255,0.85)', lineHeight: 1.8,
                                        fontStyle: 'italic', marginBottom: '32px',
                                    }}>{t.quote}</p>

                                    <div>
                                        {/* Avatar placeholder */}
                                        <div style={{
                                            width: '48px', height: '48px', borderRadius: '50%',
                                            backgroundColor: 'rgba(255,107,0,0.15)',
                                            border: '2px solid rgba(255,107,0,0.3)',
                                            margin: '0 auto 12px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontFamily: 'var(--font-heading)', fontSize: '1.1rem',
                                            fontWeight: 700, color: '#FF8533',
                                        }}>
                                            {t.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div style={{
                                            fontFamily: 'var(--font-heading)', fontSize: '1rem',
                                            fontWeight: 700, color: '#fff',
                                        }}>{t.name}</div>
                                        <div style={{
                                            fontFamily: 'var(--font-mono)', fontSize: '11px',
                                            color: 'rgba(255,255,255,0.4)', marginTop: '4px',
                                            letterSpacing: '1px',
                                        }}>{t.role} · {t.tenure}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Dots */}
                        <div style={{
                            display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px',
                        }}>
                            {testimonials.map((_, i) => (
                                <button key={i} onClick={() => setActiveTestimonial(i)} style={{
                                    width: i === activeTestimonial ? '32px' : '8px',
                                    height: '8px', borderRadius: '9999px', border: 'none',
                                    backgroundColor: i === activeTestimonial ? '#FF6B00' : 'rgba(255,255,255,0.15)',
                                    cursor: 'pointer',
                                    transition: 'all 0.4s ease',
                                }} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    SECTION 8: OPEN POSITIONS — WITH 3D
                   ═══════════════════════════════════════════════ */}
                <section id="open-roles" style={{
                    padding: '120px 24px 100px',
                    backgroundColor: '#FFFFFF',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <Scene3D style={{ opacity: 0.25 }}>
                        <PositionsScene />
                    </Scene3D>

                    <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                        <SectionHeader
                            tag="Open Positions"
                            title="Find Your"
                            highlight="Role"
                            desc="Every role is remote-first with equity. All positions are actively hiring."
                        />

                        {/* Department filter tabs */}
                        <div className="c-reveal" style={{
                            display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap',
                        }}>
                            <button
                                onClick={() => setActiveDept(null)}
                                style={{
                                    padding: '10px 24px', borderRadius: '9999px',
                                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                                    letterSpacing: '1.5px', fontWeight: 600,
                                    border: '1px solid',
                                    borderColor: !activeDept ? '#FF6B00' : 'rgba(0,0,0,0.1)',
                                    backgroundColor: !activeDept ? 'rgba(255,107,0,0.08)' : 'transparent',
                                    color: !activeDept ? '#FF6B00' : '#8A8A8A',
                                    cursor: 'pointer', transition: 'all 0.3s ease',
                                    textTransform: 'uppercase',
                                }}
                            >
                                All ({departments.reduce((s, d) => s + d.roles.length, 0)})
                            </button>
                            {departments.map((dept) => (
                                <button
                                    key={dept.name}
                                    onClick={() => setActiveDept(dept.name)}
                                    style={{
                                        padding: '10px 24px', borderRadius: '9999px',
                                        fontFamily: 'var(--font-mono)', fontSize: '11px',
                                        letterSpacing: '1.5px', fontWeight: 600,
                                        border: '1px solid',
                                        borderColor: activeDept === dept.name ? '#FF6B00' : 'rgba(0,0,0,0.1)',
                                        backgroundColor: activeDept === dept.name ? 'rgba(255,107,0,0.08)' : 'transparent',
                                        color: activeDept === dept.name ? '#FF6B00' : '#8A8A8A',
                                        cursor: 'pointer', transition: 'all 0.3s ease',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {dept.name} ({dept.roles.length})
                                </button>
                            ))}
                        </div>

                        {/* Job listings */}
                        <div className="dept-grid" style={{
                            display: 'flex', flexDirection: 'column', gap: '12px',
                        }}>
                            {departments
                                .filter((dept) => !activeDept || dept.name === activeDept)
                                .map((dept) => (
                                    <div key={dept.name}>
                                        {/* Department header */}
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: '12px',
                                            padding: '16px 0 12px',
                                        }}>
                                            <span style={{ fontSize: '16px' }}>{dept.emoji}</span>
                                            <h3 style={{
                                                fontFamily: 'var(--font-heading)', fontSize: '1.1rem',
                                                fontWeight: 700, color: '#1A1A1A',
                                            }}>{dept.name}</h3>
                                            <span style={{
                                                fontFamily: 'var(--font-mono)', fontSize: '10px',
                                                color: '#FF6B00', backgroundColor: 'rgba(255,107,0,0.08)',
                                                padding: '4px 12px', borderRadius: '9999px',
                                                letterSpacing: '1px',
                                            }}>{dept.roles.length} ROLES</span>
                                        </div>

                                        {/* Role cards */}
                                        {dept.roles.map((role) => (
                                            <a
                                                key={role.title}
                                                href={`mailto:careers@openanalyst.com?subject=Application: ${role.title}`}
                                                className="dept-card"
                                                style={{
                                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                    padding: '20px 24px', borderRadius: '16px',
                                                    backgroundColor: '#F8F8F8',
                                                    border: '1px solid rgba(0,0,0,0.05)',
                                                    textDecoration: 'none', transition: 'all 0.35s ease',
                                                    marginBottom: '8px',
                                                }}
                                                onMouseEnter={(e) => {
                                                    const el = e.currentTarget;
                                                    el.style.backgroundColor = 'rgba(255,107,0,0.04)';
                                                    el.style.borderColor = 'rgba(255,107,0,0.15)';
                                                    el.style.transform = 'translateX(6px)';
                                                    el.style.boxShadow = '0 4px 20px rgba(255,107,0,0.06)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    const el = e.currentTarget;
                                                    el.style.backgroundColor = '#F8F8F8';
                                                    el.style.borderColor = 'rgba(0,0,0,0.05)';
                                                    el.style.transform = 'translateX(0)';
                                                    el.style.boxShadow = 'none';
                                                }}
                                            >
                                                <div>
                                                    <div style={{
                                                        fontFamily: 'var(--font-heading)', fontSize: '1rem',
                                                        fontWeight: 600, color: '#1A1A1A', marginBottom: '4px',
                                                    }}>{role.title}</div>
                                                    <div style={{
                                                        fontFamily: 'var(--font-mono)', fontSize: '11px',
                                                        color: 'var(--text-muted)', letterSpacing: '0.5px',
                                                    }}>{role.location} · {role.type}</div>
                                                </div>
                                                <div style={{
                                                    display: 'flex', alignItems: 'center', gap: '8px',
                                                }}>
                                                    <span style={{
                                                        fontFamily: 'var(--font-mono)', fontSize: '11px',
                                                        color: '#FF6B00', fontWeight: 600, letterSpacing: '1.5px',
                                                    }}>APPLY</span>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round">
                                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    SECTION 9: HOW WE HIRE — TIMELINE WITH 3D
                   ═══════════════════════════════════════════════ */}
                <section className="hiring-timeline" style={{
                    padding: '120px 24px 100px',
                    backgroundColor: '#FAFAFA',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <Scene3D style={{ opacity: 0.3 }}>
                        <TimelineScene />
                    </Scene3D>

                    <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                        <SectionHeader
                            tag="Process"
                            title="How We"
                            highlight="Hire"
                            align="center"
                            desc="Transparent, respectful, and fast. Average time from application to offer: 12 days."
                        />

                        {/* Horizontal timeline */}
                        <div style={{ position: 'relative', padding: '20px 0' }}>
                            {/* Progress line */}
                            <div style={{
                                position: 'absolute', top: '44px', left: '10%', right: '10%',
                                height: '2px', backgroundColor: 'rgba(0,0,0,0.06)',
                            }}>
                                <div className="hire-line-progress" style={{
                                    width: '100%', height: '100%',
                                    background: 'linear-gradient(90deg, #FF6B00, #FF8533, rgba(255,107,0,0.2))',
                                }} />
                            </div>

                            <div style={{
                                display: 'grid', gridTemplateColumns: `repeat(${hiringSteps.length}, 1fr)`, gap: '0',
                            }}>
                                {hiringSteps.map((step) => (
                                    <div key={step.num} className="hire-step" style={{
                                        textAlign: 'center', padding: '0 12px', position: 'relative',
                                    }}>
                                        <div style={{
                                            width: '56px', height: '56px', borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #FF6B00, #FF8533)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontFamily: 'var(--font-mono)', fontSize: '14px',
                                            fontWeight: 700, color: '#fff',
                                            margin: '0 auto 20px',
                                            boxShadow: '0 6px 24px rgba(255,107,0,0.25), 0 0 0 6px rgba(255,107,0,0.08)',
                                            position: 'relative', zIndex: 1,
                                        }}>{step.num}</div>

                                        <h4 style={{
                                            fontFamily: 'var(--font-heading)', fontSize: '1.05rem',
                                            fontWeight: 700, color: '#1A1A1A', marginBottom: '8px',
                                        }}>{step.title}</h4>

                                        <p style={{
                                            color: 'var(--text-muted)', fontSize: '0.83rem',
                                            lineHeight: 1.65, fontFamily: 'var(--font-body)',
                                            marginBottom: '12px',
                                        }}>{step.desc}</p>

                                        <span style={{
                                            fontFamily: 'var(--font-mono)', fontSize: '10px',
                                            color: '#FF6B00', backgroundColor: 'rgba(255,107,0,0.06)',
                                            padding: '4px 12px', borderRadius: '9999px',
                                            letterSpacing: '1px',
                                        }}>{step.duration}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    SECTION 10: DIVERSITY & INCLUSION
                   ═══════════════════════════════════════════════ */}
                <section style={{
                    padding: '120px 24px 100px',
                    backgroundColor: '#FFFFFF',
                    position: 'relative',
                }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <div className="c-reveal" style={{
                            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px',
                            alignItems: 'center',
                        }}>
                            {/* Left - Text */}
                            <div>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px',
                                }}>
                                    <span style={{
                                        width: '8px', height: '8px', transform: 'rotate(45deg)',
                                        backgroundColor: '#FF6B00',
                                    }} />
                                    <span style={{
                                        fontFamily: 'var(--font-mono)', fontSize: '11px',
                                        color: '#FF6B00', letterSpacing: '4px',
                                        textTransform: 'uppercase',
                                    }}>Diversity & Belonging</span>
                                </div>

                                <h2 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                                    fontWeight: 700, color: '#1A1A1A', lineHeight: 1.15,
                                    marginBottom: '20px',
                                }}>
                                    Different Minds,{' '}
                                    <span style={{
                                        background: 'linear-gradient(135deg, #FF6B00, #FF8533)',
                                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                    }}>Shared Mission</span>
                                </h2>

                                <p style={{
                                    color: 'var(--text-muted)', fontSize: '0.95rem',
                                    lineHeight: 1.8, fontFamily: 'var(--font-body)', marginBottom: '28px',
                                }}>
                                    We believe the best products are built by diverse teams. We&apos;re committed to creating
                                    an environment where everyone can bring their full self to work and thrive.
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {[
                                        { label: 'Women in Engineering', value: '42%' },
                                        { label: 'Underrepresented Minorities', value: '38%' },
                                        { label: 'Countries Represented', value: '12' },
                                    ].map((stat) => (
                                        <div key={stat.label} style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            padding: '14px 20px', borderRadius: '14px',
                                            backgroundColor: '#F8F8F8',
                                            border: '1px solid rgba(0,0,0,0.04)',
                                        }}>
                                            <span style={{
                                                fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                                                color: '#1A1A1A', fontWeight: 500,
                                            }}>{stat.label}</span>
                                            <span style={{
                                                fontFamily: 'var(--font-heading)', fontSize: '1.2rem',
                                                fontWeight: 700, color: '#FF6B00',
                                            }}>{stat.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right - Visual */}
                            <div style={{
                                position: 'relative', height: '400px',
                                borderRadius: '24px', overflow: 'hidden',
                                backgroundColor: '#0A0A0A',
                            }}>
                                <Scene3D style={{ position: 'relative' }}>
                                    {/* Diversity constellation */}
                                    {Array.from({ length: 12 }).map((_, i) => {
                                        const angle = (i / 12) * Math.PI * 2;
                                        const r = 1.8;
                                        return (
                                            <Float key={i} speed={1 + (i % 3) * 0.3} floatIntensity={0.5}>
                                                <Sphere args={[0.15 + (i % 3) * 0.05]} position={[Math.cos(angle) * r, Math.sin(angle) * r, 0]}>
                                                    <meshStandardMaterial
                                                        color={i % 3 === 0 ? '#FF6B00' : i % 3 === 1 ? '#FF8533' : '#FFB380'}
                                                        emissive="#FF6B00"
                                                        emissiveIntensity={0.5}
                                                        transparent
                                                        opacity={0.7}
                                                    />
                                                </Sphere>
                                            </Float>
                                        );
                                    })}
                                    {/* Central connected sphere */}
                                    <Float speed={1} floatIntensity={0.3}>
                                        <Sphere args={[0.4, 32, 32]}>
                                            <MeshDistortMaterial
                                                color="#FF6B00"
                                                transparent
                                                opacity={0.2}
                                                distort={0.3}
                                                speed={2}
                                            />
                                        </Sphere>
                                    </Float>
                                </Scene3D>

                                {/* Overlay text */}
                                <div style={{
                                    position: 'absolute', bottom: '24px', left: '24px', right: '24px',
                                    zIndex: 2,
                                }}>
                                    <div style={{
                                        fontFamily: 'var(--font-heading)', fontSize: '1.6rem',
                                        fontWeight: 700, color: '#fff', lineHeight: 1.2,
                                    }}>
                                        12 countries.
                                        <br />
                                        <span style={{ color: '#FF8533' }}>One team.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    SECTION 11: CTA — CONVINCE US WITH 3D
                   ═══════════════════════════════════════════════ */}
                <section className="careers-cta" style={{
                    padding: '140px 24px',
                    backgroundColor: '#0A0A0A',
                    position: 'relative', textAlign: 'center', overflow: 'hidden',
                }}>
                    {/* 3D Background */}
                    <Scene3D style={{ opacity: 0.6 }}>
                        <CTAScene />
                    </Scene3D>

                    {/* Gradient overlay */}
                    <div style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none',
                        background: `
                            radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,107,0,0.1) 0%, transparent 70%),
                            radial-gradient(ellipse 80% 30% at 50% 100%, rgba(255,107,0,0.06) 0%, transparent 60%)
                        `,
                    }} />

                    <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
                        <div style={{ overflow: 'hidden', marginBottom: '4px' }}>
                            <h2 className="cta-line" style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                                fontWeight: 800, lineHeight: 1.05,
                                color: '#fff',
                            }}>
                                Don&apos;t see your role?
                            </h2>
                        </div>
                        <div style={{ overflow: 'hidden', marginBottom: '28px' }}>
                            <h2 className="cta-line" style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                                fontWeight: 800, lineHeight: 1.05,
                                background: 'linear-gradient(135deg, #FF6B00, #FF8533, #FFB380)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            }}>
                                Convince us.
                            </h2>
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                            <p className="cta-line" style={{
                                fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8,
                                fontFamily: 'var(--font-body)', maxWidth: '500px', margin: '0 auto 40px',
                            }}>
                                Exceptional talent doesn&apos;t wait for the right listing — it creates the role.
                                Send us your story.
                            </p>
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                            <div className="cta-line">
                                <Magnetic>
                                    <a href="mailto:careers@openanalyst.com?subject=I%20Want%20to%20Build%20With%20You" style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '12px',
                                        padding: '20px 48px', fontSize: '13px',
                                        fontFamily: 'var(--font-mono)', fontWeight: 700,
                                        color: '#fff', backgroundColor: '#FF6B00',
                                        borderRadius: '9999px', textDecoration: 'none',
                                        transition: 'all 0.35s ease',
                                        boxShadow: '0 12px 50px rgba(255,107,0,0.4)',
                                        letterSpacing: '2px',
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#FF8533';
                                            e.currentTarget.style.transform = 'scale(1.05)';
                                            e.currentTarget.style.boxShadow = '0 16px 60px rgba(255,107,0,0.5)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#FF6B00';
                                            e.currentTarget.style.transform = 'scale(1)';
                                            e.currentTarget.style.boxShadow = '0 12px 50px rgba(255,107,0,0.4)';
                                        }}
                                    >
                                        SAY HELLO
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <path d="M7 17l9.2-9.2M17 17V8H8" />
                                        </svg>
                                    </a>
                                </Magnetic>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    STYLES
                   ═══════════════════════════════════════════════ */}
                <style>{`
                    /* Hide footer CTA on careers page */
                    .careers-page .footer-cta-section { display: none !important; }
                    .careers-page .footer-brand-marquee { display: none !important; }

                    @keyframes pulse-dot {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.4; }
                    }

                    @keyframes scroll-line {
                        0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
                        30% { transform: scaleY(1); transform-origin: top; opacity: 1; }
                        70% { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
                        100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
                    }

                    /* Value card hover line */
                    .val-card:hover .val-card-line { opacity: 1 !important; }
                    .val-card:hover { border-color: rgba(255,107,0,0.15) !important; box-shadow: 0 20px 60px rgba(255,107,0,0.06) !important; }

                    /* Perk card hover glow */
                    .perk-card:hover .perk-glow { opacity: 1 !important; }
                    .perk-card:hover { border-color: rgba(255,107,0,0.15) !important; box-shadow: 0 16px 50px rgba(255,107,0,0.06) !important; }

                    /* Responsive */
                    @media (max-width: 1024px) {
                        .values-grid { grid-template-columns: repeat(2, 1fr) !important; }
                        .perks-grid { grid-template-columns: repeat(2, 1fr) !important; }
                    }
                    @media (max-width: 900px) {
                        .c-reveal > div:first-child + div { display: none; }
                        .life-grid { grid-template-columns: repeat(2, 1fr) !important; }
                        .life-grid > div { grid-column: span 1 !important; }
                    }
                    @media (max-width: 768px) {
                        .values-grid { grid-template-columns: 1fr !important; }
                        .perks-grid { grid-template-columns: 1fr !important; }
                        .life-grid { grid-template-columns: 1fr !important; grid-template-rows: auto !important; }
                        .life-grid > div { height: 200px !important; }
                        .stats-strip > div { grid-template-columns: repeat(2, 1fr) !important; }
                        .hiring-timeline div[style*="grid-template-columns"] {
                            grid-template-columns: 1fr !important;
                            gap: 32px !important;
                        }
                        .hiring-timeline .hire-line-progress { display: none !important; }
                        section:has(.c-reveal > div[style*="grid-template-columns: 1fr 1fr"]) .c-reveal {
                            grid-template-columns: 1fr !important;
                        }
                    }
                    @media (max-width: 640px) {
                        .stats-strip > div { grid-template-columns: repeat(2, 1fr) !important; }
                    }
                `}</style>
            </main>
            <Footer />
        </div>
    );
}
