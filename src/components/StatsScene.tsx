'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Floating analytics ring ─── */
function AnalyticsRing({ position, color, size = 1, speed = 0.3 }: { position: [number, number, number]; color: string; size?: number; speed?: number }) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.x = state.clock.elapsedTime * speed;
        ref.current.rotation.z = state.clock.elapsedTime * speed * 0.7;
    });

    return (
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh ref={ref} position={position} scale={size}>
                <torusGeometry args={[1, 0.015, 16, 80]} />
                <meshStandardMaterial color={color} transparent opacity={0.18} />
            </mesh>
        </Float>
    );
}

/* ─── Data node (small sphere) ─── */
function DataNode({ position, color, size = 0.06 }: { position: [number, number, number]; color: string; size?: number }) {
    return (
        <Float speed={2} rotationIntensity={0} floatIntensity={1.5}>
            <mesh position={position}>
                <sphereGeometry args={[size, 16, 16]} />
                <meshStandardMaterial color={color} transparent opacity={0.35} emissive={color} emissiveIntensity={0.3} />
            </mesh>
        </Float>
    );
}

/* ─── Floating particles ─── */
function Particles({ count = 50 }: { count?: number }) {
    const ref = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 16;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2;
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.025} color="#111111" transparent opacity={0.25} sizeAttenuation />
        </points>
    );
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 3, 3]} intensity={0.3} color="#111111" />
            <pointLight position={[-5, -2, 2]} intensity={0.2} color="#666666" />

            {/* Analytics rings at various positions */}
            <AnalyticsRing position={[-4, 1, -3]} color="#111111" size={1.5} speed={0.2} />
            <AnalyticsRing position={[4, -0.5, -4]} color="#666666" size={1.2} speed={0.25} />
            <AnalyticsRing position={[0, 1.5, -3.5]} color="#333333" size={0.9} speed={0.15} />
            <AnalyticsRing position={[-2, -1, -2.5]} color="#555555" size={0.7} speed={0.3} />

            {/* Data nodes */}
            <DataNode position={[-3, 0.5, -2]} color="#111111" size={0.08} />
            <DataNode position={[3, 1, -2.5]} color="#666666" size={0.06} />
            <DataNode position={[1, -1, -1.5]} color="#555555" size={0.07} />
            <DataNode position={[-1, 1.5, -3]} color="#333333" size={0.05} />
            <DataNode position={[5, 0, -3]} color="#333333" size={0.06} />
            <DataNode position={[-5, -1, -2]} color="#111111" size={0.05} />

            {/* Particles */}
            <Particles count={60} />
        </>
    );
}

export default function StatsScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 40 }}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
        >
            <Scene />
        </Canvas>
    );
}
