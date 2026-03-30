'use client';

import React from 'react';

interface GlowDotProps {
    color?: string;
    size?: number;
    pulse?: boolean;
}

export default function GlowDot({ color = '#FF6B00', size = 6, pulse = true }: GlowDotProps) {
    return (
        <span style={{
            width: size, height: size, borderRadius: '50%',
            background: color,
            boxShadow: `0 0 ${size * 2}px ${color}80`,
            display: 'inline-block', flexShrink: 0,
            animation: pulse ? 'status-pulse 2s ease-in-out infinite' : 'none',
        }} />
    );
}
