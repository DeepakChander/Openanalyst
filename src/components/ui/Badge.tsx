'use client';

import { motion } from 'framer-motion';

interface BadgeProps {
  text: string;
  className?: string;
}

export default function Badge({ text, className = '' }: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 18px',
        borderRadius: 9999,
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.06)',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        fontWeight: 500,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.08em',
        color: '#111111',
      }}
    >
      <span style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: '#111111',
        boxShadow: '0 0 8px rgba(0,0,0,0.5)',
      }} />
      {text}
    </motion.div>
  );
}
