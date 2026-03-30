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
        const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
        el.setAttribute('id', id);
        items.push({ id, text, level: el.tagName === 'H2' ? 2 : 3 });
      });
      setHeadings(items);
      if (items.length > 0) setActiveId(items[0].id);
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (headings.length === 0) return;
    if (observerRef.current) observerRef.current.disconnect();

    const callback: IntersectionObserverCallback = (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length > 0) setActiveId(visible[0].target.id);
    };

    observerRef.current = new IntersectionObserver(callback, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });
    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observerRef.current?.observe(el);
    });
    return () => { observerRef.current?.disconnect(); };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="hidden xl:block" style={{
      position: 'fixed', top: 40, right: 28, width: 320,
      maxHeight: 'calc(100vh - 80px)', overflowY: 'auto',
    }}>
      <div style={{
        border: '1px solid var(--border-default)', backgroundColor: 'var(--bg-white)',
        padding: 28, borderRadius: 12,
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
          paddingBottom: 16, borderBottom: '1px solid var(--border-subtle)',
        }}>
          <div style={{
            width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'var(--orange-light)', border: '1px solid rgba(255,107,0,0.15)',
            borderRadius: 6, flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
          </div>
          <span style={{
            fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase',
            letterSpacing: '0.06em', fontFamily: 'var(--font-mono)',
          }}>On this page</span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            const isH3 = heading.level === 3;
            return (
              <a key={heading.id} href={`#${heading.id}`} className="docs-toc-item"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(heading.id);
                  if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActiveId(heading.id); }
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: isH3 ? '7px 12px 7px 24px' : '7px 12px',
                  fontSize: isH3 ? 13 : 14, lineHeight: 1.5,
                  fontWeight: isActive ? 600 : isH3 ? 400 : 500,
                  color: isActive ? 'var(--orange)' : isH3 ? 'var(--text-muted)' : 'var(--text-secondary)',
                  textDecoration: 'none', transition: 'all 0.2s ease',
                  borderLeft: isActive ? '2px solid var(--orange)' : '2px solid transparent',
                  backgroundColor: isActive ? 'rgba(255,107,0,0.04)' : 'transparent',
                  marginLeft: -1, borderRadius: '0 4px 4px 0',
                }}
              >{heading.text}</a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
