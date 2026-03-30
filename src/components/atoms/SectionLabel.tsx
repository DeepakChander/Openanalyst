'use client';

import React from 'react';

interface SectionLabelProps {
    text: string;
    dark?: boolean;
}

export default function SectionLabel({ text, dark = false }: SectionLabelProps) {
    return (
        <span className="label-mono" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px 6px 12px', borderRadius: 'var(--radius-full)',
            border: `1px solid ${dark ? 'rgba(255,107,0,0.2)' : 'var(--border)'}`,
            background: dark ? 'rgba(255,107,0,0.06)' : 'var(--bg-surface)',
            color: dark ? '#FF8533' : 'var(--orange)',
            marginBottom: 16,
        }}>
            <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--orange)', flexShrink: 0,
                boxShadow: dark ? '0 0 8px rgba(255,107,0,0.5)' : 'none',
            }} />
            {text}
        </span>
    );
}
