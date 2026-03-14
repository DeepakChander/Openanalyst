'use client';

import { useEffect, useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════
   3D ANIMATED NETWORK GRID BACKGROUND
   — Floating nodes connected by glowing lines with flowing
   particles, inspired by Stripe/Linear/Vercel hero backgrounds
   ═══════════════════════════════════════════════════════════════ */

/* ─── Animated Grid Lines ─── */
function GridLines() {
    const linesRef = useRef<THREE.Group>(null);
    const gridRef = useRef<THREE.LineSegments>(null);

    const gridGeo = useMemo(() => {
        const points: number[] = [];
        // Horizontal lines
        for (let i = -8; i <= 8; i += 1.6) {
            points.push(-12, i, 0, 12, i, 0);
        }
        // Vertical lines
        for (let i = -12; i <= 12; i += 1.6) {
            points.push(i, -8, 0, i, 8, 0);
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
        return geo;
    }, []);

    useFrame((state) => {
        if (!linesRef.current) return;
        linesRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
        linesRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    });

    return (
        <group ref={linesRef} position={[0, 0, -2]}>
            <lineSegments ref={gridRef} geometry={gridGeo}>
                <lineBasicMaterial color="#FF6B00" transparent opacity={0.045} depthWrite={false} />
            </lineSegments>
        </group>
    );
}

/* ─── Network Nodes with Connections ─── */
function NetworkNodes({ count = 35 }: { count?: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const nodesRef = useRef<THREE.InstancedMesh>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    const nodes = useMemo(() => {
        const arr = [];
        for (let i = 0; i < count; i++) {
            arr.push({
                x: (Math.random() - 0.5) * 14,
                y: (Math.random() - 0.5) * 8,
                z: (Math.random() - 0.5) * 3 - 1,
                vx: (Math.random() - 0.5) * 0.003,
                vy: (Math.random() - 0.5) * 0.003,
                size: 0.03 + Math.random() * 0.04,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.5 + Math.random() * 1.5,
            });
        }
        return arr;
    }, [count]);

    // Connection lines between nearby nodes
    const connectionGeo = useMemo(() => {
        return new THREE.BufferGeometry();
    }, []);

    const { viewport } = useThree();

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', handleMouse, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouse);
    }, []);

    useFrame((state) => {
        if (!nodesRef.current) return;
        const dummy = new THREE.Object3D();
        const t = state.clock.elapsedTime;
        const connectionPoints: number[] = [];

        // Update node positions
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            node.x += node.vx;
            node.y += node.vy;

            // Soft bounds
            if (node.x < -7 || node.x > 7) node.vx *= -1;
            if (node.y < -4 || node.y > 4) node.vy *= -1;

            // Mouse influence
            const mx = mouseRef.current.x * viewport.width * 0.5;
            const my = mouseRef.current.y * viewport.height * 0.5;
            const dx = mx - node.x;
            const dy = my - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 3) {
                node.x += dx * 0.0008;
                node.y += dy * 0.0008;
            }

            const pulse = 1 + Math.sin(t * node.pulseSpeed + node.pulse) * 0.3;
            dummy.position.set(node.x, node.y, node.z);
            dummy.scale.setScalar(node.size * pulse);
            dummy.updateMatrix();
            nodesRef.current.setMatrixAt(i, dummy.matrix);
        }
        nodesRef.current.instanceMatrix.needsUpdate = true;

        // Build connections between nearby nodes
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dz = nodes[i].z - nodes[j].z;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (dist < 2.5) {
                    connectionPoints.push(
                        nodes[i].x, nodes[i].y, nodes[i].z,
                        nodes[j].x, nodes[j].y, nodes[j].z,
                    );
                }
            }
        }
        connectionGeo.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(connectionPoints, 3),
        );
    });

    return (
        <group ref={groupRef}>
            {/* Nodes */}
            <instancedMesh ref={nodesRef} args={[undefined, undefined, count]}>
                <sphereGeometry args={[1, 12, 12]} />
                <meshBasicMaterial color="#FF6B00" transparent opacity={0.7} />
            </instancedMesh>

            {/* Connection lines */}
            <lineSegments geometry={connectionGeo}>
                <lineBasicMaterial color="#FF6B00" transparent opacity={0.08} depthWrite={false} />
            </lineSegments>
        </group>
    );
}

/* ─── Flowing Particles along paths ─── */
function FlowingParticles({ count = 120 }: { count?: number }) {
    const meshRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const arr = [];
        for (let i = 0; i < count; i++) {
            arr.push({
                x: (Math.random() - 0.5) * 16,
                y: (Math.random() - 0.5) * 10,
                z: (Math.random() - 0.5) * 4 - 1,
                speed: 0.002 + Math.random() * 0.006,
                angle: Math.random() * Math.PI * 2,
                radius: 0.5 + Math.random() * 2,
                phase: Math.random() * Math.PI * 2,
            });
        }
        return arr;
    }, [count]);

    const positions = useMemo(() => new Float32Array(count * 3), [count]);
    const geoRef = useRef<THREE.BufferGeometry>(null);

    useEffect(() => {
        if (!geoRef.current) return;
        geoRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }, [positions]);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.angle += p.speed;
            positions[i * 3] = p.x + Math.cos(p.angle + p.phase) * p.radius * 0.3;
            positions[i * 3 + 1] = p.y + Math.sin(t * 0.2 + p.phase) * 0.5;
            positions[i * 3 + 2] = p.z + Math.sin(p.angle) * 0.2;
        }
        if (geoRef.current) {
            const attr = geoRef.current.getAttribute('position');
            if (attr) (attr as THREE.BufferAttribute).needsUpdate = true;
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry ref={geoRef} />
            <pointsMaterial
                size={0.02}
                color="#FF8533"
                transparent
                opacity={0.35}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

/* ─── Glowing Accent Orbs ─── */
function GlowOrbs() {
    const orbs = useMemo(() => [
        { pos: [-4, 2, -1] as [number, number, number], size: 0.15, speed: 0.4 },
        { pos: [5, -1.5, -0.5] as [number, number, number], size: 0.12, speed: 0.6 },
        { pos: [2, 3, -1.5] as [number, number, number], size: 0.1, speed: 0.5 },
        { pos: [-3, -2, -0.8] as [number, number, number], size: 0.08, speed: 0.7 },
        { pos: [6, 2.5, -1.2] as [number, number, number], size: 0.13, speed: 0.35 },
    ], []);

    const refs = useRef<(THREE.Mesh | null)[]>([]);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        refs.current.forEach((ref, i) => {
            if (!ref) return;
            const orb = orbs[i];
            ref.position.y = orb.pos[1] + Math.sin(t * orb.speed + i * 1.5) * 0.5;
            ref.position.x = orb.pos[0] + Math.cos(t * orb.speed * 0.7 + i) * 0.3;
            const pulse = 0.7 + Math.sin(t * orb.speed * 2 + i) * 0.3;
            ref.scale.setScalar(orb.size * pulse);
        });
    });

    return (
        <group>
            {orbs.map((orb, i) => (
                <mesh
                    key={i}
                    ref={(el) => { refs.current[i] = el; }}
                    position={orb.pos}
                >
                    <sphereGeometry args={[1, 16, 16]} />
                    <meshBasicMaterial
                        color="#FF6B00"
                        transparent
                        opacity={0.25}
                    />
                </mesh>
            ))}
        </group>
    );
}

/* ─── Horizontal Scan Line Effect ─── */
function ScanLine() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.elapsedTime;
        // Sweep from top to bottom every 8 seconds
        const y = ((t * 0.125) % 1) * 12 - 6;
        meshRef.current.position.y = y;
        (meshRef.current.material as THREE.MeshBasicMaterial).opacity = 0.03 + Math.sin(t * 2) * 0.01;
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -0.5]}>
            <planeGeometry args={[20, 0.08]} />
            <meshBasicMaterial
                color="#FF6B00"
                transparent
                opacity={0.04}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

/* ═══ Main Hero Background Component ═══ */
export default function HeroScene() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Check for reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
        <div style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
        }}>
            <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                style={{ background: 'transparent', pointerEvents: 'none' }}
            >
                <Suspense fallback={null}>
                    <GridLines />
                    <NetworkNodes count={30} />
                    <FlowingParticles count={100} />
                    <GlowOrbs />
                    <ScanLine />
                </Suspense>
            </Canvas>
        </div>
    );
}

/* ═══ Animated Dashboard Mockup ═══ */
export function DashboardMockup() {
    const dashRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !dashRef.current) return;

        // Dynamically import gsap to avoid SSR issues
        import('gsap').then(({ gsap }) => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            const tl = gsap.timeline({ delay: 1.2 });

            tl.from(dashRef.current!, {
                y: 60, opacity: 0, duration: 1, ease: 'power3.out',
            }, 0);

            tl.from('.dash-bar', {
                scaleY: 0, transformOrigin: 'bottom',
                duration: 0.6, stagger: 0.08, ease: 'power2.out',
            }, 0.6);

            tl.from('.dash-line', {
                strokeDashoffset: 300,
                duration: 1.5, ease: 'power2.inOut',
            }, 0.8);

            tl.from('.dash-metric-value', {
                opacity: 0, y: 8, duration: 0.4, stagger: 0.1,
            }, 0.9);

            tl.from('.dash-notif', {
                scale: 0, opacity: 0, duration: 0.4, ease: 'back.out(2)',
            }, 1.5);
        });
    }, [mounted]);

    if (!mounted) return null;

    const barHeights = [45, 62, 38, 78, 55, 85, 68, 90, 72, 58, 82, 95];

    return (
        <div ref={dashRef} style={{
            width: '100%',
            maxWidth: '560px',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 25px 80px rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.04)',
            overflow: 'hidden',
            transform: 'perspective(1200px) rotateY(-4deg) rotateX(2deg)',
            transformStyle: 'preserve-3d',
        }}>
            {/* Top bar */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 20px',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }} />
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FEBC2E' }} />
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840' }} />
                    </div>
                    <span style={{
                        fontFamily: 'var(--font-body)', fontSize: '12px',
                        color: '#999', marginLeft: '8px',
                    }}>
                        OpenAnalyst Dashboard
                    </span>
                </div>
                <div className="dash-notif" style={{
                    padding: '3px 10px', borderRadius: '9999px',
                    background: '#FF6B00', color: '#fff',
                    fontSize: '10px', fontWeight: 700,
                    fontFamily: 'var(--font-body)',
                }}>
                    3 NEW
                </div>
            </div>

            {/* Metric cards */}
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px',
                padding: '16px 20px',
            }}>
                {[
                    { label: 'Campaigns Active', value: '24', change: '+12%', up: true },
                    { label: 'Leads Generated', value: '1.2K', change: '+34%', up: true },
                    { label: 'Avg. ROI', value: '340%', change: '+28%', up: true },
                ].map((m, i) => (
                    <div key={i} style={{
                        background: '#FAFAFA', borderRadius: '12px',
                        padding: '12px', border: '1px solid rgba(0,0,0,0.04)',
                    }}>
                        <div style={{
                            fontFamily: 'var(--font-body)', fontSize: '10px',
                            color: '#999', marginBottom: '4px', textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                        }}>{m.label}</div>
                        <div className="dash-metric-value" style={{
                            fontFamily: 'var(--font-heading)', fontSize: '20px',
                            fontWeight: 800, color: '#1A1A1A', lineHeight: 1,
                        }}>{m.value}</div>
                        <div className="dash-metric-value" style={{
                            fontFamily: 'var(--font-body)', fontSize: '11px',
                            color: '#10B981', fontWeight: 600, marginTop: '4px',
                        }}>
                            {m.up ? '↑' : '↓'} {m.change}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bar chart */}
            <div style={{ padding: '8px 20px 16px' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: '12px',
                }}>
                    <span style={{
                        fontFamily: 'var(--font-body)', fontSize: '12px',
                        fontWeight: 600, color: '#1A1A1A',
                    }}>Campaign Performance</span>
                    <span style={{
                        fontFamily: 'var(--font-body)', fontSize: '10px',
                        color: '#999', padding: '3px 8px',
                        background: '#F5F5F5', borderRadius: '6px',
                    }}>Last 12 months</span>
                </div>
                <div style={{
                    display: 'flex', alignItems: 'flex-end', gap: '6px',
                    height: '80px',
                }}>
                    {barHeights.map((h, i) => (
                        <div key={i} className="dash-bar" style={{
                            flex: 1,
                            height: `${h}%`,
                            borderRadius: '4px 4px 0 0',
                            background: i === barHeights.length - 1
                                ? 'linear-gradient(180deg, #FF6B00, #FF8C3A)'
                                : i >= barHeights.length - 3
                                    ? 'rgba(255,107,0,0.3)'
                                    : 'rgba(255,107,0,0.12)',
                        }} />
                    ))}
                </div>
            </div>

            {/* Line chart area */}
            <div style={{ padding: '0 20px 20px' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: '8px',
                }}>
                    <span style={{
                        fontFamily: 'var(--font-body)', fontSize: '12px',
                        fontWeight: 600, color: '#1A1A1A',
                    }}>Lead Conversion Rate</span>
                    <span style={{
                        fontFamily: 'var(--font-heading)', fontSize: '14px',
                        fontWeight: 800, color: '#FF6B00',
                    }}>67.2%</span>
                </div>
                <svg width="100%" height="50" viewBox="0 0 480 50" fill="none" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(255,107,0,0.15)" />
                            <stop offset="100%" stopColor="rgba(255,107,0,0)" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,40 C40,35 80,30 120,25 C160,20 200,32 240,18 C280,8 320,22 360,12 C400,5 440,10 480,3"
                        fill="url(#lineGrad)"
                        stroke="none"
                    />
                    <path
                        className="dash-line"
                        d="M0,40 C40,35 80,30 120,25 C160,20 200,32 240,18 C280,8 320,22 360,12 C400,5 440,10 480,3"
                        fill="none"
                        stroke="#FF6B00"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="300"
                        strokeDashoffset="0"
                    />
                    <circle cx="480" cy="3" r="4" fill="#FF6B00" />
                    <circle cx="480" cy="3" r="7" fill="rgba(255,107,0,0.2)" />
                </svg>
            </div>

            {/* AI Agent status bar */}
            <div style={{
                padding: '12px 20px',
                borderTop: '1px solid rgba(0,0,0,0.06)',
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'rgba(255,107,0,0.03)',
            }}>
                <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: '#10B981',
                    boxShadow: '0 0 6px rgba(16,185,129,0.5)',
                }} />
                <span style={{
                    fontFamily: 'var(--font-body)', fontSize: '11px',
                    color: '#666',
                }}>
                    AI Agent optimizing <strong style={{ color: '#1A1A1A' }}>3 campaigns</strong> right now...
                </span>
                <div style={{
                    marginLeft: 'auto',
                    width: '14px', height: '14px',
                    border: '2px solid rgba(255,107,0,0.3)',
                    borderTopColor: '#FF6B00',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                }} />
            </div>
        </div>
    );
}
