'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

interface LogoItem {
  name: string;
  src: string;
  color?: string;
}

interface MarqueeItem {
  text: string;
  icon?: React.ReactNode;
}

interface MarqueeStripProps {
  items?: string[] | MarqueeItem[];
  logos?: LogoItem[];
  speed?: number;
  separator?: string;
  className?: string;
  dark?: boolean;
}

const MarqueeStrip: React.FC<MarqueeStripProps> = ({
  items,
  logos,
  speed = 35,
  separator = '•',
  className = '',
  dark = true,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const buildTween = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    tweenRef.current?.kill();

    const halfWidth = track.scrollWidth / 2;
    const duration = halfWidth / speed;

    gsap.set(track, { x: 0 });

    tweenRef.current = gsap.to(track, {
      x: -halfWidth,
      duration,
      ease: 'none',
      repeat: -1,
    });
  }, [speed]);

  useEffect(() => {
    buildTween();

    const handleResize = () => buildTween();
    window.addEventListener('resize', handleResize);

    return () => {
      tweenRef.current?.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, [buildTween]);

  const handleMouseEnter = () => tweenRef.current?.pause();
  const handleMouseLeave = () => tweenRef.current?.resume();

  const borderColor = dark ? 'rgba(255,255,255,0.08)' : 'var(--border)';
  const isLogoMode = logos && logos.length > 0;

  const textColor = dark ? 'var(--text-muted)' : 'var(--text-secondary)';
  const dotColor = 'var(--orange)';

  const itemStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(11px, 2.5vw, 14px)',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: textColor,
    flexShrink: 0,
  };

  const sepStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: isLogoMode ? '10px' : '14px',
    color: dotColor,
    margin: isLogoMode ? '0 48px' : '0 16px',
    flexShrink: 0,
    opacity: isLogoMode ? 0.4 : 1,
  };

  const renderTextItems = () =>
    (items || []).map((item, i) => {
      const text = typeof item === 'string' ? item : item.text;
      const icon = typeof item === 'string' ? null : item.icon;
      return (
        <React.Fragment key={i}>
          <span style={{ ...itemStyle, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            {icon && <span style={{ display: 'inline-flex', flexShrink: 0, opacity: 0.7 }}>{icon}</span>}
            {text}
          </span>
          <span style={sepStyle}>{separator}</span>
        </React.Fragment>
      );
    });

  const renderLogoItems = () =>
    (logos || []).map((logo, i) => (
      <React.Fragment key={i}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexShrink: 0,
        }}>
          <img
            src={logo.src}
            alt={logo.name}
            width={36}
            height={36}
            loading="lazy"
            style={{
              objectFit: 'contain',
              flexShrink: 0,
            }}
          />
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            fontWeight: 600,
            color: dark ? '#FAFAFA' : 'var(--text-primary)',
            letterSpacing: '0.01em',
            flexShrink: 0,
            opacity: 0.9,
          }}>
            {logo.name}
          </span>
        </div>
        <span style={sepStyle}>{separator}</span>
      </React.Fragment>
    ));

  return (
    <div
      className={`marquee-strip ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        overflow: 'hidden',
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        maskImage:
          'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          willChange: 'transform',
          padding: isLogoMode ? '28px 0' : '12px 0',
        }}
      >
        {isLogoMode ? (
          <>
            {renderLogoItems()}
            {renderLogoItems()}
          </>
        ) : (
          <>
            {renderTextItems()}
            {renderTextItems()}
          </>
        )}
      </div>
    </div>
  );
};

export default MarqueeStrip;
