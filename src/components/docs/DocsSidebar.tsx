'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { docsNavigation } from '@/lib/docs/navigation';

export default function DocsSidebar() {
  const pathname = usePathname();

  const currentSlug = pathname
    .replace(/^\/docs\/?/, '')
    .replace(/\/$/, '');

  useEffect(() => {
    const active = document.querySelector('[data-sidebar-active="true"]');
    if (active) {
      active.scrollIntoView({ block: 'nearest' });
    }
  }, [pathname]);

  return (
    <aside
      className="hidden lg:block"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '272px',
        zIndex: 40,
        backgroundColor: '#fafafa',
        borderRight: '1px solid #e5e7eb',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      {/* Logo / Title */}
      <div
        style={{
          padding: '24px 24px 20px',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <Link
          href="/docs"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
          }}
        >
          <img
            src="/images/logo.png"
            alt="OpenAnalyst Logo"
            style={{
              width: '32px',
              height: '32px',
              objectFit: 'contain',
              flexShrink: 0,
            }}
          />
          <div>
            <span
              style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: 700,
                color: '#111827',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              OpenAnalyst
            </span>
            <span
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 500,
                color: '#ff8552',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginTop: '2px',
              }}
            >
              Documentation
            </span>
          </div>
        </Link>
      </div>

      {/* Back to main site */}
      <div style={{ padding: '12px 16px 4px' }}>
        <Link
          href="/"
          className="docs-back-link"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            fontSize: '13px',
            color: '#6b7280',
            textDecoration: 'none',
            borderRadius: '6px',
            transition: 'all 0.15s ease',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          Back to OpenAnalyst
        </Link>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '8px 16px 32px' }}>
        {docsNavigation.map((section, sectionIndex) => (
          <div key={section.title || `section-${sectionIndex}`} style={{ marginBottom: section.title ? '8px' : '0' }}>
            {section.title && (
              <h3
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#9ca3af',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '16px 12px 6px',
                  margin: 0,
                }}
              >
                {section.title}
              </h3>
            )}
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {section.items.map((item) => {
                const isActive = currentSlug === item.slug;
                const href = item.slug ? `/docs/${item.slug}` : '/docs';

                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      data-sidebar-active={isActive ? 'true' : undefined}
                      className={isActive ? 'docs-sidebar-active' : 'docs-sidebar-item'}
                      style={{
                        display: 'block',
                        padding: '7px 12px',
                        fontSize: '14px',
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? '#ff8552' : '#4b5563',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        backgroundColor: isActive ? 'rgba(255, 133, 82, 0.08)' : 'transparent',
                        borderLeft: isActive ? '2px solid #ff8552' : '2px solid transparent',
                        transition: 'all 0.15s ease',
                        lineHeight: 1.5,
                      }}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: '16px 24px',
          borderTop: '1px solid #e5e7eb',
          marginTop: 'auto',
        }}
      >
        <a
          href="https://app.openanalyst.com"
          target="_blank"
          rel="noopener noreferrer"
          className="docs-open-app-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px 16px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#ffffff',
            backgroundColor: '#ff8552',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
        >
          Open App
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </aside>
  );
}
