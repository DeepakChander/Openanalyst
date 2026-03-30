'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { docsNavigation } from '@/lib/docs/navigation';

export default function DocsSidebar() {
  const pathname = usePathname();
  const currentSlug = pathname.replace(/^\/docs\/?/, '').replace(/\/$/, '');

  useEffect(() => {
    const active = document.querySelector('[data-sidebar-active="true"]');
    if (active) active.scrollIntoView({ block: 'nearest' });
  }, [pathname]);

  return (
    <aside className="hidden lg:block" style={{
      position: 'fixed', top: 0, left: 0, bottom: 0, width: '272px', zIndex: 40,
      backgroundColor: 'var(--bg-surface)', borderRight: '1px solid var(--border-default)',
      overflowY: 'auto', overflowX: 'hidden',
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid var(--border-default)' }}>
        <Link href="/docs" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #FF6B00, #E85D00)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', flexShrink: 0,
          }}>
            <img src="/images/logo.png" alt="OpenAnalyst Logo" style={{ width: 22, height: 22, objectFit: 'contain' }} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2, fontFamily: 'var(--font-heading)' }}>OpenAnalyst</span>
            <span style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--orange)', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 2, fontFamily: 'var(--font-mono)' }}>Documentation</span>
          </div>
        </Link>
      </div>

      {/* Back link */}
      <div style={{ padding: '12px 16px 4px' }}>
        <Link href="/" className="docs-back-link" style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px',
          fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', borderRadius: 6, transition: 'all 0.15s ease',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          Back to OpenAnalyst
        </Link>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '8px 16px 32px' }}>
        {docsNavigation.map((section, sectionIndex) => (
          <div key={section.title || `section-${sectionIndex}`} style={{ marginBottom: section.title ? 8 : 0 }}>
            {section.title && (
              <h3 style={{
                fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase',
                letterSpacing: '0.08em', padding: '16px 12px 6px', margin: 0, fontFamily: 'var(--font-mono)',
              }}>{section.title}</h3>
            )}
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {section.items.map((item) => {
                const isActive = currentSlug === item.slug;
                const href = item.slug ? `/docs/${item.slug}` : '/docs';
                return (
                  <li key={item.slug}>
                    <Link href={href} data-sidebar-active={isActive ? 'true' : undefined}
                      className={isActive ? 'docs-sidebar-active' : 'docs-sidebar-item'}
                      style={{
                        display: 'block', padding: '7px 12px', fontSize: 14,
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? 'var(--orange)' : 'var(--text-secondary)',
                        textDecoration: 'none', borderRadius: 6,
                        backgroundColor: isActive ? 'rgba(255,107,0,0.06)' : 'transparent',
                        borderLeft: isActive ? '2px solid var(--orange)' : '2px solid transparent',
                        transition: 'all 0.15s ease', lineHeight: 1.5,
                      }}
                    >{item.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer CTA */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-default)', marginTop: 'auto' }}>
        <a href="https://app.openanalyst.com" target="_blank" rel="noopener noreferrer"
          className="docs-open-app-btn"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '10px 16px', fontSize: 13, fontWeight: 600,
            color: '#ffffff', backgroundColor: 'var(--orange)', borderRadius: 8,
            textDecoration: 'none', transition: 'all 0.2s ease',
          }}
        >
          Open App
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      </div>
    </aside>
  );
}
