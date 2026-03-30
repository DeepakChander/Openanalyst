'use client';

interface GradientMeshBgProps {
  className?: string;
  intensity?: number;
  colors?: { color: string; x: string; y: string }[];
}

const defaultColors = [
  { color: 'rgba(0,0,0,0.12)', x: '30%', y: '20%' },
  { color: 'rgba(0,0,0,0.08)', x: '70%', y: '70%' },
  { color: 'rgba(0,0,0,0.06)', x: '20%', y: '80%' },
];

export default function GradientMeshBg({ className = '', intensity = 1, colors = defaultColors }: GradientMeshBgProps) {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {colors.map((blob, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '60%',
            height: '60%',
            left: blob.x,
            top: blob.y,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            opacity: intensity,
            animation: `meshFloat ${12 + i * 4}s ease-in-out infinite`,
            animationDelay: `${i * -3}s`,
            filter: 'blur(40px)',
          }}
        />
      ))}
      {/* Noise texture overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }} />
    </div>
  );
}
