'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Badge from './Badge';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  badge?: string;
  title: string;
  gradientWord?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({ badge, title, gradientWord, subtitle, align = 'center', className = '' }: SectionHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!headingRef.current) return;
    const words = headingRef.current.querySelectorAll('.sh-word');
    gsap.fromTo(words,
      { opacity: 0, y: 20, filter: 'blur(4px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)',
        stagger: 0.05,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          once: true,
        }
      }
    );
  }, []);

  const renderTitle = () => {
    const words = title.split(' ');
    return words.map((word, i) => {
      const isGradient = gradientWord && word.toLowerCase() === gradientWord.toLowerCase();
      return (
        <span
          key={i}
          className={`sh-word ${isGradient ? 'text-gradient' : ''}`}
          style={{
            display: 'inline-block',
            marginRight: '0.3em',
            opacity: 0,
          }}
        >
          {word}
        </span>
      );
    });
  };

  return (
    <div className={className} style={{ textAlign: align, marginBottom: 64 }}>
      {badge && (
        <div style={{ marginBottom: 20, display: 'flex', justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
          <Badge text={badge} />
        </div>
      )}
      <h2
        ref={headingRef}
        className="heading-md"
        style={{ maxWidth: align === 'center' ? 700 : undefined, margin: align === 'center' ? '0 auto' : undefined }}
      >
        {renderTitle()}
      </h2>
      {subtitle && (
        <p
          className="body-lg"
          style={{
            maxWidth: 560,
            margin: align === 'center' ? '20px auto 0' : '20px 0 0',
            color: 'var(--text-secondary)',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
