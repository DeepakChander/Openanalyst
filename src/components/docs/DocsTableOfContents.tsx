'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function DocsTableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      const content = document.querySelector('.docs-content');
      if (!content) return;

      const elements = content.querySelectorAll('h2, h3');
      const items: TocItem[] = [];

      elements.forEach((el) => {
        const text = el.textContent?.trim() || '';
        if (!text) return;

        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');

        el.setAttribute('id', id);

        items.push({
          id,
          text,
          level: el.tagName === 'H2' ? 2 : 3,
        });
      });

      setHeadings(items);
      if (items.length > 0) {
        setActiveId(items[0].id);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (headings.length === 0) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const callback: IntersectionObserverCallback = (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0,
    });

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div
      className="hidden xl:block"
      style={{
        position: 'fixed',
        top: '40px',
        right: '28px',
        width: '320px',
        maxHeight: 'calc(100vh - 80px)',
        overflowY: 'auto',
      }}
    >
      {/* Card */}
      <div
        style={{
          border: '1px solid rgba(0,0,0,0.1)',
          backgroundColor: '#ffffff',
          padding: '28px',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff7f3',
              border: '1px solid rgba(255,133,82,0.2)',
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff8552" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </div>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#111827',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            On this page
          </span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            const isH3 = heading.level === 3;

            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className="docs-toc-item"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(heading.id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setActiveId(heading.id);
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: isH3 ? '8px 12px 8px 24px' : '8px 12px',
                  fontSize: isH3 ? '14px' : '15px',
                  lineHeight: 1.5,
                  fontWeight: isActive ? 600 : isH3 ? 400 : 500,
                  color: isActive ? '#ff8552' : isH3 ? '#6b7280' : '#374151',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  borderLeft: isActive
                    ? '2px solid #ff8552'
                    : '2px solid transparent',
                  backgroundColor: isActive
                    ? 'rgba(255,133,82,0.05)'
                    : 'transparent',
                  marginLeft: '-1px',
                }}
              >
                {heading.text}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
