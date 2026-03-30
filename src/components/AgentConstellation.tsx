'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface AgentDef {
  name: string;
  color: string;
  orbitRadius: number;
  speed: number;
  tiltX: number;
  tiltZ: number;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const AGENTS: AgentDef[] = [
  { name: 'Vibe Marketer', color: '#FF6B00', orbitRadius: 3.0, speed: 0.25, tiltX: 0.3, tiltZ: 0.1 },
  { name: 'SEO Strategist', color: '#14B8A6', orbitRadius: 3.5, speed: 0.18, tiltX: -0.2, tiltZ: 0.4 },
  { name: 'Ad Optimizer', color: '#3B82F6', orbitRadius: 2.8, speed: 0.32, tiltX: 0.5, tiltZ: -0.3 },
  { name: 'Content Writer', color: '#10B981', orbitRadius: 3.2, speed: 0.22, tiltX: -0.4, tiltZ: 0.2 },
  { name: 'Analytics Pro', color: '#F59E0B', orbitRadius: 2.6, speed: 0.38, tiltX: 0.1, tiltZ: -0.5 },
];

/* ------------------------------------------------------------------ */
/*  Central glowing icosahedron                                        */
/* ------------------------------------------------------------------ */

function CentralCore() {
  const wireRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.15;
      wireRef.current.rotation.x = t * 0.08;
    }
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.8 + Math.sin(t * 1.5) * 0.3;
    }
  });

  return (
    <group>
      {/* Inner solid sphere for depth */}
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color="#FF6B00"
          transparent
          opacity={0.12}
          emissive="#FF6B00"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Wireframe icosahedron */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          ref={matRef}
          color="#FF6B00"
          emissive="#FF6B00"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Single orbiting agent node                                         */
/* ------------------------------------------------------------------ */

function AgentNode({ agent }: { agent: AgentDef }) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const col = useMemo(() => new THREE.Color(agent.color), [agent.color]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const angle = t * agent.speed;
    const x = Math.cos(angle) * agent.orbitRadius;
    const z = Math.sin(angle) * agent.orbitRadius;
    if (groupRef.current) {
      groupRef.current.position.set(x, 0, z);
    }
  });

  return (
    <group rotation={[agent.tiltX, 0, agent.tiltZ]}>
      {/* Orbit trail ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[agent.orbitRadius, 0.008, 8, 128]} />
        <meshBasicMaterial color={agent.color} transparent opacity={0.15} />
      </mesh>

      {/* Orbiting node */}
      <group ref={groupRef}>
        <mesh ref={sphereRef}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color={agent.color}
            emissive={agent.color}
            emissiveIntensity={1.2}
          />
        </mesh>

        {/* Glow halo */}
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color={agent.color} transparent opacity={0.15} />
        </mesh>

        {/* Label */}
        <Html
          center
          distanceFactor={8}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              color: col.getStyle(),
              fontSize: '11px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.03em',
              textShadow: `0 0 8px ${agent.color}88`,
              background: 'rgba(0,0,0,0.45)',
              padding: '2px 8px',
              borderRadius: '4px',
              display: 'block',
              transform: 'translateY(-22px)',
            }}
          >
            {agent.name}
          </span>
        </Html>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Particle field                                                     */
/* ------------------------------------------------------------------ */

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const baseColor = new THREE.Color('#FF6B00');

    for (let i = 0; i < count; i++) {
      // Random point inside a sphere of radius 5
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 5 * Math.cbrt(Math.random());
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Slight color variation around orange
      const variation = 0.7 + Math.random() * 0.3;
      col[i * 3] = baseColor.r * variation;
      col[i * 3 + 1] = baseColor.g * variation;
      col[i * 3 + 2] = baseColor.b * variation;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
      ref.current.rotation.x = clock.getElapsedTime() * 0.008;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene root with mouse interaction                                  */
/* ------------------------------------------------------------------ */

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      const targetX = pointer.y * 0.15;
      const targetY = pointer.x * 0.15;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} color="#FF6B00" intensity={2} distance={20} />
      <pointLight position={[-4, -3, 4]} color="#FFF5E6" intensity={1.5} distance={18} />

      {/* Interactive group */}
      <group ref={groupRef}>
        <CentralCore />
        {AGENTS.map((agent) => (
          <AgentNode key={agent.name} agent={agent} />
        ))}
        <ParticleField />
      </group>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Inner scene component (used inside Canvas)                         */
/* ------------------------------------------------------------------ */

function AgentConstellation() {
  return <SceneContent />;
}

/* ------------------------------------------------------------------ */
/*  Wrapper with Canvas                                                */
/* ------------------------------------------------------------------ */

function AgentConstellationScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <AgentConstellation />
    </Canvas>
  );
}

export { AgentConstellation };
export default AgentConstellationScene;
