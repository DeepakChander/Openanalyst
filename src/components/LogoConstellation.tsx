'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

interface LogoItem {
  name: string;
  icon: string; // CDN logo URL
  color: string;
}

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const SI = 'https://cdn.simpleicons.org';

const LOGOS: LogoItem[] = [
  { name: 'Gmail', color: '#EA4335', icon: `${SI}/gmail/EA4335` },
  { name: 'Slack', color: '#E01E5A', icon: 'https://img.icons8.com/color/96/slack-new.png' },
  { name: 'HubSpot', color: '#FF7A59', icon: `${SI}/hubspot/FF7A59` },
  { name: 'Google Ads', color: '#4285F4', icon: `${SI}/googleads/4285F4` },
  { name: 'Meta', color: '#0081FB', icon: `${SI}/meta/0081FB` },
  { name: 'LinkedIn', color: '#0A66C2', icon: 'https://img.icons8.com/color/96/linkedin.png' },
  { name: 'Stripe', color: '#635BFF', icon: `${SI}/stripe/635BFF` },
  { name: 'TikTok', color: '#FF0050', icon: `${SI}/tiktok/FF0050` },
  { name: 'YouTube', color: '#FF0000', icon: `${SI}/youtube/FF0000` },
  { name: 'Shopify', color: '#7AB55C', icon: `${SI}/shopify/7AB55C` },
  { name: 'Notion', color: '#000000', icon: `${SI}/notion/FFFFFF` },
  { name: 'Salesforce', color: '#00A1E0', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg' },
  { name: 'WhatsApp', color: '#25D366', icon: `${SI}/whatsapp/25D366` },
  { name: 'Zoom', color: '#0B5CFF', icon: `${SI}/zoom/0B5CFF` },
  { name: 'Airtable', color: '#18BFFF', icon: `${SI}/airtable/18BFFF` },
];

// Inner ring: first 5, Middle ring: next 5, Outer ring: last 5
const INNER_LOGOS = LOGOS.slice(0, 5);
const OUTER_LOGOS = LOGOS.slice(5, 10);
const THIRD_LOGOS = LOGOS.slice(10, 15);

const LogoCard: React.FC<{
  logo: LogoItem;
  index: number;
  ring: 'inner' | 'outer' | 'third';
  totalInRing: number;
  isInView: boolean;
}> = ({ logo, index, ring, totalInRing, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 20 });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const angle = (index / totalInRing) * 360;
  const radius = ring === 'inner' ? (isMobile ? 70 : 110) : ring === 'outer' ? (isMobile ? 120 : 190) : (isMobile ? 160 : 270);
  const orbitDuration = ring === 'inner' ? 50 : ring === 'outer' ? 70 : 90;
  const direction = ring === 'inner' ? 1 : ring === 'outer' ? -1 : 1;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) * 0.15;
    const dy = (e.clientY - centerY) * 0.15;
    mouseX.set(dx);
    mouseY.set(dy);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      className="logo-orbit-item"
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? {
        opacity: 1,
        scale: 1,
        rotate: [angle, angle + 360 * direction],
      } : { opacity: 0, scale: 0 }}
      transition={{
        opacity: { duration: 0.6, delay: 0.3 + index * 0.1 },
        scale: { duration: 0.6, delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 },
        rotate: {
          duration: orbitDuration,
          repeat: Infinity,
          ease: 'linear',
          delay: 0.3 + index * 0.1,
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          position: 'absolute',
          width: 52,
          height: 52,
          marginLeft: -26,
          marginTop: -26,
          transform: `translateX(${radius}px)`,
        }}
      >
        {/* Counter-rotate to keep logo upright */}
        <motion.div
          animate={isInView ? {
            rotate: [-(angle), -(angle + 360 * direction)],
          } : {}}
          transition={{
            rotate: {
              duration: orbitDuration,
              repeat: Infinity,
              ease: 'linear',
              delay: 0.3 + index * 0.1,
            },
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <motion.div
            animate={isHovered ? { scale: 1.15 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              background: isHovered
                ? `rgba(255,255,255,0.12)`
                : 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: `1px solid ${isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
              boxShadow: isHovered
                ? `0 0 30px ${logo.color}40, 0 8px 32px rgba(0,0,0,0.3)`
                : `0 0 15px ${logo.color}15, 0 4px 16px rgba(0,0,0,0.2)`,
              cursor: 'pointer',
              transition: 'background 0.3s, border 0.3s, box-shadow 0.3s',
            }}
          >
            <img
              src={logo.icon}
              alt={logo.name}
              width={28}
              height={28}
              style={{
                width: 28,
                height: 28,
                objectFit: 'contain',
                opacity: isHovered ? 1 : 0.7,
                transition: 'opacity 0.3s',
              }}
            />
            <span style={{
              fontSize: 8,
              fontWeight: 600,
              letterSpacing: '0.05em',
              color: isHovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              transition: 'color 0.3s',
              whiteSpace: 'nowrap',
            }}>
              {logo.name}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const LogoConstellation: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [mounted, setMounted] = useState(false);
  const [containerSize, setContainerSize] = useState(560);

  useEffect(() => {
    setMounted(true);
    const updateSize = () => {
      setContainerSize(window.innerWidth < 600 ? Math.min(280, window.innerWidth - 40) : 580);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#08080f',
        padding: '60px 0 40px',
      }}
    >
      {/* Noise overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
        pointerEvents: 'none',
      }} />

      {/* Radial gradient backdrop */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(255,107,0,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 60, position: 'relative', zIndex: 2 }}
      >
        <span style={{
          display: 'inline-block',
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#FF6B00',
          marginBottom: 16,
          fontFamily: 'var(--font-body)',
        }}>
          Integrations
        </span>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 700,
          color: '#fff',
          margin: 0,
          fontFamily: 'var(--font-heading, var(--font-body))',
          lineHeight: 1.2,
        }}>
          Connects with your stack
        </h2>
        <p style={{
          fontSize: 16,
          color: 'rgba(255,255,255,0.5)',
          marginTop: 12,
          fontFamily: 'var(--font-body)',
          maxWidth: 420,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Seamlessly integrates with the platforms you already use
        </p>
      </motion.div>

      {/* Constellation container */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: containerSize,
        height: containerSize,
        margin: '0 auto',
      }}>
        {/* Orbital rings (SVG) */}
        <svg
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: containerSize,
            height: containerSize,
            pointerEvents: 'none',
          }}
          viewBox="-280 -280 560 560"
        >
          {/* Inner ring */}
          <motion.circle
            cx="0" cy="0" r={containerSize < 400 ? 70 : 110}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
            strokeDasharray="4 8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          {/* Middle ring */}
          <motion.circle
            cx="0" cy="0" r={containerSize < 400 ? 120 : 190}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
            strokeDasharray="4 12"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          {/* Outer ring */}
          <motion.circle
            cx="0" cy="0" r={containerSize < 400 ? 160 : 270}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
            strokeDasharray="4 12"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          {/* Glow ring for inner */}
          <motion.circle
            cx="0" cy="0" r={containerSize < 400 ? 70 : 110}
            fill="none"
            stroke="rgba(255,107,0,0.08)"
            strokeWidth="2"
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* Center hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, type: 'spring', stiffness: 200 }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: -50,
            marginTop: -50,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,0,0.15) 0%, rgba(255,107,0,0.05) 50%, transparent 70%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          {/* Pulsing glow */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.15, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,107,0,0.2) 0%, transparent 70%)',
            }}
          />
          <div style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF6B00, #FF8533)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(255,107,0,0.3), 0 0 80px rgba(255,107,0,0.1)',
            border: '2px solid rgba(255,255,255,0.15)',
            position: 'relative',
            zIndex: 2,
            overflow: 'hidden',
          }}>
            <img src="/images/new-logo.png" alt="OA" width={36} height={36} style={{ objectFit: 'contain' }} />
          </div>
        </motion.div>

        {/* Logo cards */}
        {mounted && (
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 0,
            height: 0,
          }}>
            {INNER_LOGOS.map((logo, i) => (
              <LogoCard
                key={logo.name}
                logo={logo}
                index={i}
                ring="inner"
                totalInRing={INNER_LOGOS.length}
                isInView={isInView}
              />
            ))}
            {OUTER_LOGOS.map((logo, i) => (
              <LogoCard
                key={logo.name}
                logo={logo}
                index={i}
                ring="outer"
                totalInRing={OUTER_LOGOS.length}
                isInView={isInView}
              />
            ))}
            {THIRD_LOGOS.map((logo, i) => (
              <LogoCard
                key={logo.name}
                logo={logo}
                index={i}
                ring="third"
                totalInRing={THIRD_LOGOS.length}
                isInView={isInView}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
        style={{
          width: 120,
          height: 2,
          background: 'linear-gradient(90deg, transparent, #FF6B00, transparent)',
          margin: '50px auto 0',
          borderRadius: 1,
        }}
      />

      <style>{`
        @keyframes dash-flow {
          to { stroke-dashoffset: -24; }
        }
        .logo-orbit-item {
          z-index: 5;
        }
      `}</style>
    </section>
  );
};

export default LogoConstellation;
