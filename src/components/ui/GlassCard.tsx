'use client';

import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  accentTop?: string;
  padding?: string | number;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function GlassCard({ children, className = '', glowColor = 'rgba(0,0,0,0.06)', accentTop, padding = 32, onClick, style }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
      onClick={onClick}
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 20,
        padding,
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : undefined,
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease',
        ...style,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(255,255,255,0.12)';
        el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${glowColor}`;
        el.style.background = 'rgba(255,255,255,0.05)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(255,255,255,0.06)';
        el.style.boxShadow = 'none';
        el.style.background = 'rgba(255,255,255,0.03)';
      }}
    >
      {accentTop && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: accentTop,
        }} />
      )}
      {children}
    </motion.div>
  );
}
