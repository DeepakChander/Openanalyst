'use client';

/**
 * Pure CSS/SVG animated globe — no WebGL, works everywhere.
 * Uses a dot-grid texture scrolling inside a clipped sphere with 3D lighting.
 */
export default function Globe({ size = 480 }: { size?: number }) {
    // Generate dot grid rows (equirectangular → spherical density)
    const rows = 32;
    const cols = 64;

    return (
        <div className="css-globe-wrap" style={{ position: 'relative', width: '100%', maxWidth: size, aspectRatio: '1 / 1', margin: '0 auto' }}>

            {/* Outer atmospheric glow */}
            <div style={{
                position: 'absolute', inset: -40, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,107,0,0.07) 30%, rgba(255,107,0,0.02) 50%, transparent 70%)',
                filter: 'blur(30px)', pointerEvents: 'none',
            }} />

            {/* Sphere container */}
            <div style={{
                position: 'relative', width: '100%', height: '100%',
                borderRadius: '50%', overflow: 'hidden',
                boxShadow: '0 0 80px rgba(255,107,0,0.06), inset 0 0 80px rgba(0,0,0,0.5)',
            }}>
                {/* Base sphere color */}
                <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    background: 'radial-gradient(circle at 38% 35%, #1e1e24 0%, #141418 60%, #0a0a0d 100%)',
                }} />

                {/* Scrolling dot-grid world texture (doubled width for seamless loop) */}
                <div className="globe-texture" style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '200%', height: '100%',
                    animation: 'globeScroll 30s linear infinite',
                }}>
                    <svg viewBox={`0 0 ${cols * 2 * 10} ${rows * 10}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        {/* First copy */}
                        {Array.from({ length: rows }, (_, r) => {
                            const lat = (r / (rows - 1)) * Math.PI;
                            const density = Math.sin(lat);
                            const actualCols = Math.max(4, Math.round(cols * density));
                            return Array.from({ length: actualCols }, (_, c) => {
                                const x = (c / actualCols) * cols * 10;
                                const y = r * 10 + 5;
                                const opacity = 0.15 + density * 0.35;
                                return (
                                    <circle key={`a-${r}-${c}`} cx={x} cy={y} r={1.2}
                                        fill="#ffffff" opacity={opacity} />
                                );
                            });
                        })}
                        {/* Second copy (offset for seamless scroll) */}
                        {Array.from({ length: rows }, (_, r) => {
                            const lat = (r / (rows - 1)) * Math.PI;
                            const density = Math.sin(lat);
                            const actualCols = Math.max(4, Math.round(cols * density));
                            return Array.from({ length: actualCols }, (_, c) => {
                                const x = cols * 10 + (c / actualCols) * cols * 10;
                                const y = r * 10 + 5;
                                const opacity = 0.15 + density * 0.35;
                                return (
                                    <circle key={`b-${r}-${c}`} cx={x} cy={y} r={1.2}
                                        fill="#ffffff" opacity={opacity} />
                                );
                            });
                        })}
                    </svg>
                </div>

                {/* 3D lighting overlay — makes the sphere look 3D */}
                <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    background: `
                        radial-gradient(circle at 35% 30%, rgba(255,255,255,0.06) 0%, transparent 50%),
                        radial-gradient(circle at 70% 75%, rgba(0,0,0,0.6) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,0.8) 100%)
                    `,
                    pointerEvents: 'none',
                }} />

                {/* Edge rim highlight */}
                <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: 'inset 0 0 30px rgba(255,107,0,0.03)',
                    pointerEvents: 'none',
                }} />

                {/* City markers on the sphere surface */}
                {[
                    { name: 'SF', x: 15, y: 38, color: '#FF6B00' },
                    { name: 'London', x: 47, y: 30, color: '#3B82F6' },
                    { name: 'Dubai', x: 57, y: 42, color: '#14B8A6' },
                    { name: 'Mumbai', x: 64, y: 46, color: '#10B981' },
                    { name: 'Singapore', x: 72, y: 55, color: '#8B5CF6' },
                    { name: 'Tokyo', x: 82, y: 34, color: '#F59E0B' },
                    { name: 'São Paulo', x: 28, y: 68, color: '#F97316' },
                    { name: 'Sydney', x: 85, y: 70, color: '#EC4899' },
                ].map((city, i) => {
                    // Calculate distance from center for 3D depth effect
                    const dx = city.x - 50;
                    const dy = city.y - 50;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const depth = Math.max(0, 1 - dist / 50);
                    if (depth < 0.2) return null; // hide dots near edges (behind the globe)
                    return (
                        <div key={i} style={{
                            position: 'absolute',
                            left: `${city.x}%`, top: `${city.y}%`,
                            transform: 'translate(-50%, -50%)',
                            zIndex: 2,
                        }}>
                            {/* Pulse ring */}
                            <div style={{
                                position: 'absolute',
                                top: '50%', left: '50%',
                                width: 24, height: 24,
                                transform: 'translate(-50%, -50%)',
                                borderRadius: '50%',
                                border: `1.5px solid ${city.color}`,
                                opacity: 0,
                                animation: `globePulse 3s ease-out infinite ${i * 0.35}s`,
                            }} />
                            {/* Glow */}
                            <div style={{
                                position: 'absolute',
                                top: '50%', left: '50%',
                                width: 16, height: 16,
                                transform: 'translate(-50%, -50%)',
                                borderRadius: '50%',
                                background: city.color,
                                opacity: 0.15 * depth,
                                filter: 'blur(6px)',
                            }} />
                            {/* Core dot */}
                            <div style={{
                                width: 7 * depth, height: 7 * depth,
                                borderRadius: '50%',
                                background: city.color,
                                boxShadow: `0 0 8px ${city.color}90`,
                                opacity: 0.6 + depth * 0.4,
                            }} />
                        </div>
                    );
                })}
            </div>

            {/* Animated ring orbiting the globe */}
            <div style={{
                position: 'absolute', inset: -8,
                borderRadius: '50%',
                border: '1px solid rgba(255,107,0,0.08)',
                animation: 'globeRing 12s linear infinite',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', inset: -20,
                borderRadius: '50%',
                border: '1px dashed rgba(255,255,255,0.03)',
                pointerEvents: 'none',
            }} />

            <style>{`
                @keyframes globeScroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                @keyframes globePulse {
                    0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.6; }
                    100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
                }
                @keyframes globeRing {
                    from { transform: rotateX(65deg) rotateZ(0deg); }
                    to { transform: rotateX(65deg) rotateZ(360deg); }
                }
                .css-globe-wrap { perspective: 800px; }
            `}</style>
        </div>
    );
}
