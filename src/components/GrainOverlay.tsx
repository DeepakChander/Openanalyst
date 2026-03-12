'use client';

export default function GrainOverlay() {
    return (
        <svg className="grain-overlay" width="100%" height="100%">
            <filter id="grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
    );
}
