'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

interface LogoItem {
  name: string;
  svg: string; // inline SVG path
  color: string;
}

const LOGOS: LogoItem[] = [
  {
    name: 'Gmail',
    color: '#EA4335',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>`,
  },
  {
    name: 'Slack',
    color: '#4A154B',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>`,
  },
  {
    name: 'HubSpot',
    color: '#FF7A59',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.267-1.984v-.066A2.2 2.2 0 0 0 17.23.833h-.066a2.2 2.2 0 0 0-2.2 2.2v.067c0 .86.5 1.6 1.222 1.96V7.93a5.552 5.552 0 0 0-3.015 1.53l-7.94-6.17a2.278 2.278 0 0 0 .064-.502 2.293 2.293 0 1 0-2.293 2.293c.476 0 .91-.153 1.274-.404l7.834 6.091a5.578 5.578 0 0 0-.9 3.04 5.58 5.58 0 0 0 1.004 3.207l-2.39 2.39a1.788 1.788 0 0 0-.533-.088 1.814 1.814 0 1 0 1.814 1.814c0-.185-.037-.36-.096-.524l2.348-2.348a5.588 5.588 0 1 0 4.587-10.328zm-.978 8.238a2.764 2.764 0 0 1-2.772-2.772 2.764 2.764 0 0 1 2.772-2.772 2.764 2.764 0 0 1 2.772 2.772 2.764 2.764 0 0 1-2.772 2.772z"/></svg>`,
  },
  {
    name: 'Google Ads',
    color: '#4285F4',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.9998 22.6978a3.9953 3.9953 0 0 1-3.464-5.997l7.996-13.86a4 4 0 0 1 7.322.402L23.8498 18.7a3.995 3.995 0 0 1-3.462 5.998H3.9998Zm.002-5.994a2 2 0 1 0-.001 4.001 2 2 0 0 0 .001-4.001z"/></svg>`,
  },
  {
    name: 'Meta',
    color: '#0081FB',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a4.892 4.892 0 0 0 1.873 2.839c.834.56 1.765.739 2.59.539.91-.218 1.726-.826 2.434-1.582a.248.248 0 0 0-.36-.345c-.601.594-1.196 1.04-1.835 1.22-.637.178-1.283.066-1.906-.36a4.153 4.153 0 0 1-1.547-2.386c-.12-.503-.18-1.063-.18-1.672 0-2.4.654-4.937 1.845-6.88C4.3 5.882 5.747 4.78 7.18 4.78c1.04 0 1.94.556 2.76 1.42.24.254.47.53.69.82l.07.093c1.39 1.87 2.25 4.27 3.43 6.11.45.7.95 1.32 1.52 1.78.65.52 1.38.84 2.22.84 1.2 0 2.24-.67 3.01-1.72.82-1.12 1.38-2.72 1.56-4.63.04-.36.06-.74.06-1.13 0-1.46-.34-2.75-.95-3.78-.66-1.1-1.65-1.83-2.87-1.83-1.17 0-2.2.72-3.04 1.76-.9 1.12-1.67 2.71-2.25 4.48-.4 1.24-.73 2.58-1.04 3.78-.34 1.29-.66 2.37-1.07 3.14-.43.79-.93 1.27-1.62 1.27-.67 0-1.28-.46-1.82-1.2-.57-.8-1.04-1.9-1.39-3.16a20.6 20.6 0 0 1-.62-3.37c-.15-1.18-.2-2.27-.2-3.04 0-1.87.38-3.47 1.1-4.6.6-.93 1.38-1.47 2.28-1.47.8 0 1.49.47 2.09 1.14l.04.04c.19.22.38.46.56.71.11.16.33.12.38-.06.07-.26.11-.53.11-.81 0-.87-.28-1.63-.82-2.19a3.31 3.31 0 0 0-2.4-1.01zm10.167.082c-.68 0-1.32.42-1.89 1.1-.64.77-1.18 1.9-1.6 3.24-.35 1.13-.64 2.38-.92 3.61-.3 1.31-.57 2.5-.92 3.4-.37.96-.79 1.54-1.32 1.54-.38 0-.74-.3-1.05-.77-.36-.53-.64-1.3-.83-2.2a15.55 15.55 0 0 1-.3-2.45c-.04-.62-.07-1.2-.07-1.74 0-1.56.27-2.94.78-3.93.43-.83 1-1.34 1.64-1.34.53 0 1 .32 1.38.85.35.47.6 1.1.73 1.82.02.14.18.2.28.1a5.3 5.3 0 0 1 1.2-1.04c.76-.48 1.58-.72 2.42-.72.72 0 1.3.24 1.75.66.48.43.81 1.06 1.01 1.8.19.67.27 1.44.27 2.28 0 .36-.02.73-.05 1.09-.16 1.77-.69 3.25-1.38 4.25-.65.93-1.41 1.41-2.17 1.41-.5 0-.93-.2-1.33-.56-.42-.38-.8-.93-1.14-1.6-.76-1.45-1.22-3.54-2.13-5.3-.26-.5-.54-.97-.85-1.37-.69-.9-1.5-1.47-2.52-1.47z"/></svg>`,
  },
  {
    name: 'LinkedIn',
    color: '#0A66C2',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  },
  {
    name: 'Stripe',
    color: '#635BFF',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-7.076-2.19l-.893 5.575C4.746 22.77 7.614 24 12.014 24c2.6 0 4.718-.67 6.22-1.918 1.627-1.348 2.408-3.28 2.408-5.638 0-4.106-2.508-5.82-6.666-7.294z"/></svg>`,
  },
  {
    name: 'TikTok',
    color: '#FF0050',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`,
  },
  {
    name: 'YouTube',
    color: '#FF0000',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  },
  {
    name: 'Shopify',
    color: '#7AB55C',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104zm-1.024-17.979c0-.136-.027-.248-.054-.353-.312-.844-.871-1.617-1.523-2.133-.775.416-1.259 1.262-1.484 2.12.509-.152 1.047-.304 1.569-.458.171-.048.338-.098.505-.146.003-.009.006-.02.006-.03h-.019zm-1.011-3.408C12.893 2.27 12.39 2.032 11.827 2.032c-.271 0-.56.057-.844.17.784.738 1.265 1.804 1.443 2.893.461-.136.932-.271 1.371-.397-.164-.831-.503-1.533-.995-2.106zm-2.169.497c-.984.44-2.067.918-3.14 1.397.6-2.295 1.725-3.422 2.769-3.864.093.203.179.416.25.646.042.133.084.281.121.427v.012l-.019.006c.005-.007.013-.017.019-.024zm-1.564-2.4c-.233 0-.479.048-.723.147C7.059 1.834 5.631 4.263 5.09 7.262l3.563-1.084c-.335-2.004-1.168-3.367-2.084-3.99-.033-.014-.065-.035-.098-.045-.221-.122-.453-.189-.693-.189l.001.001v-.001zM6.95 23.394l1.96-7.259c.003-.011.006-.022.007-.033l-.003-.001s-.79-4.274-.84-4.552c-.05-.276-.173-.386-.297-.386-.124 0-.645.15-.645.15L5.459 18.86l1.491 4.534z"/></svg>`,
  },
];

// Inner ring: first 5, Outer ring: last 5
const INNER_LOGOS = LOGOS.slice(0, 5);
const OUTER_LOGOS = LOGOS.slice(5);

const LogoCard: React.FC<{
  logo: LogoItem;
  index: number;
  ring: 'inner' | 'outer';
  totalInRing: number;
  isInView: boolean;
}> = ({ logo, index, ring, totalInRing, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 20 });

  const angle = (index / totalInRing) * 360;
  const radius = ring === 'inner' ? 140 : 240;
  const orbitDuration = ring === 'inner' ? 60 : 90;
  const direction = ring === 'inner' ? 1 : -1;

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
          width: 64,
          height: 64,
          marginLeft: -32,
          marginTop: -32,
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
              width: 64,
              height: 64,
              borderRadius: 16,
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
            <div
              style={{
                width: 28,
                height: 28,
                color: isHovered ? logo.color : 'rgba(255,255,255,0.6)',
                transition: 'color 0.3s',
              }}
              dangerouslySetInnerHTML={{ __html: logo.svg }}
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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#08080f',
        padding: '100px 0',
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
        maxWidth: 600,
        height: 560,
        margin: '0 auto',
      }}>
        {/* Orbital rings (SVG) */}
        <svg
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 560,
            height: 560,
            pointerEvents: 'none',
          }}
          viewBox="-280 -280 560 560"
        >
          {/* Inner ring */}
          <motion.circle
            cx="0" cy="0" r="140"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
            strokeDasharray="4 8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          {/* Outer ring */}
          <motion.circle
            cx="0" cy="0" r="240"
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
            cx="0" cy="0" r="140"
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
            transform: 'translate(-50%, -50%)',
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
          }}>
            <span style={{
              fontSize: 18,
              fontWeight: 800,
              color: '#fff',
              fontFamily: 'var(--font-heading, var(--font-body))',
              letterSpacing: '-0.02em',
            }}>
              OA
            </span>
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
