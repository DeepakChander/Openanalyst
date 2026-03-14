'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'OpenAnalyst transformed our campaign workflow. 3x ROI in the first month.',
    name: 'Sarah Chen',
    title: 'VP Marketing',
    company: 'TechFlow',
  },
  {
    quote: 'The AI agents handle what used to take our team a full week. Game changer.',
    name: 'Marcus Rivera',
    title: 'Growth Lead',
    company: 'ScaleUp',
  },
  {
    quote: 'Finally, AI marketing that actually delivers. Our engagement rates are through the roof.',
    name: 'Emily Watson',
    title: 'CMO',
    company: 'DataDrive',
  },
  {
    quote: 'We replaced 4 separate tools with OpenAnalyst. The ROI speaks for itself.',
    name: 'James Park',
    title: 'Founder',
    company: 'NextGen Labs',
  },
];

const companyLogos = ['TechFlow', 'ScaleUp', 'DataDrive', 'NextGen Labs', 'Acme Corp', 'Hyperion'];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || index === active) return;
      setIsAnimating(true);

      const card = cardRef.current;
      if (!card) return;

      gsap.to(card, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setActive(index);
          gsap.fromTo(
            card,
            { opacity: 0, y: -20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: 'power2.out',
              onComplete: () => setIsAnimating(false),
            }
          );
        },
      });
    },
    [active, isAnimating]
  );

  // Auto-rotate every 5s
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % testimonials.length;
        const card = cardRef.current;
        if (card) {
          gsap.to(card, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
              gsap.fromTo(
                card,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
              );
            },
          });
        }
        return next;
      });
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Scroll-triggered entrance animations
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 30%',
          toggleActions: 'play none none none',
        },
      });

      tl.from('.testimonials-heading', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power3.out',
      })
        .from(
          '.testimonials-subheading',
          {
            opacity: 0,
            y: 30,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .from(
          '.testimonials-quote-mark',
          {
            opacity: 0,
            scale: 0.5,
            duration: 0.5,
            ease: 'back.out(1.7)',
          },
          '-=0.2'
        )
        .from(
          '.testimonials-card',
          {
            opacity: 0,
            y: 50,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .from(
          '.testimonials-dots',
          {
            opacity: 0,
            y: 20,
            duration: 0.4,
            ease: 'power3.out',
          },
          '-=0.2'
        )
        .from(
          '.testimonials-logos',
          {
            opacity: 0,
            y: 30,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.2'
        );
    },
    { scope: sectionRef }
  );

  const current = testimonials[active];

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#FFFFFF',
        padding: '6rem 1.5rem',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        {/* Section heading */}
        <h2
          className="testimonials-heading"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#1A1A1A',
            marginBottom: '0.75rem',
            lineHeight: 1.2,
          }}
        >
          Trusted by Growth Teams
        </h2>
        <p
          className="testimonials-subheading"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-muted)',
            marginBottom: '3rem',
            maxWidth: '560px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          See why marketing leaders choose OpenAnalyst to power their campaigns.
        </p>

        {/* Decorative quote mark */}
        <div
          className="testimonials-quote-mark"
          style={{
            fontSize: 'clamp(5rem, 10vw, 8rem)',
            lineHeight: 1,
            fontFamily: 'Georgia, serif',
            color: 'var(--rust)',
            opacity: 0.35,
            userSelect: 'none',
            marginBottom: '-2rem',
          }}
          aria-hidden="true"
        >
          {'\u201C'}
        </div>

        {/* Testimonial card */}
        <div
          ref={cardRef}
          className="testimonials-card"
          style={{
            background: '#FAFAFA',
            border: '1px solid #E5E5E5',
            borderRadius: '16px',
            padding: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: '2rem',
          }}
        >
          <blockquote
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              color: '#1A1A1A',
              lineHeight: 1.6,
              fontStyle: 'italic',
              marginBottom: '2rem',
              position: 'relative',
            }}
          >
            {'\u201C'}{current.quote}{'\u201D'}
          </blockquote>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            {/* Avatar placeholder */}
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF6B00, #FF8533)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#FFFFFF',
                flexShrink: 0,
              }}
            >
              {current.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div style={{ textAlign: 'left' }}>
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: '#1A1A1A',
                  margin: 0,
                }}
              >
                {current.name}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  margin: 0,
                }}
              >
                {current.title} at{' '}
                <span style={{ color: '#FF6B00' }}>{current.company}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Dot navigation */}
        <div
          className="testimonials-dots"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.6rem',
            marginBottom: '3.5rem',
          }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: i === active ? '28px' : '10px',
                height: '10px',
                borderRadius: '999px',
                border: 'none',
                background: i === active ? '#FF6B00' : '#E5E5E5',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Company logos strip */}
        <div className="testimonials-logos">
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '1.5rem',
            }}
          >
            Trusted by innovative teams
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'clamp(1.5rem, 4vw, 3rem)',
            }}
          >
            {companyLogos.map((logo) => (
              <span
                key={logo}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  opacity: 0.55,
                  letterSpacing: '0.03em',
                  transition: 'opacity 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLSpanElement).style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLSpanElement).style.opacity = '0.55';
                }}
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
