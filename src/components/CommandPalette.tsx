'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const pages = [
  { name: 'Home', path: '/', description: 'Landing page' },
  { name: 'About', path: '/about', description: 'About OpenAnalyst' },
  { name: 'Features', path: '/features', description: 'AI-powered marketing features' },
  { name: 'Solutions by Agents', path: '/solutions-by-agents', description: 'Meet your AI agents' },
  { name: 'Integrations', path: '/integrations', description: 'Connect 27+ marketing tools' },
  { name: 'Resources', path: '/resources', description: 'Blog, case studies & FAQs' },
  { name: 'Changelog', path: '/changelog', description: 'Product updates & releases' },
  { name: 'Documentation', path: '/docs', description: 'Get started & API docs' },
  { name: 'Contact', path: '/contact', description: 'Get in touch' },
  { name: 'Careers', path: '/careers', description: 'Join the team' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const filtered = pages.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleOpen = useCallback(() => {
    setOpen(true);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setQuery('');
  }, []);

  const navigate = useCallback((path: string) => {
    handleClose();
    router.push(path);
  }, [handleClose, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (open) handleClose();
        else handleOpen();
      }
      if (!open) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => (i + 1) % filtered.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => (i - 1 + filtered.length) % filtered.length);
      }
      if (e.key === 'Enter' && filtered[selectedIndex]) {
        navigate(filtered[selectedIndex].path);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filtered, selectedIndex, handleOpen, handleClose, navigate]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(8px)',
              zIndex: 10010,
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: 560,
              zIndex: 10011,
              padding: '0 16px',
            }}
          >
            <div style={{
              background: 'rgba(17,17,17,0.95)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '16px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  autoFocus
                  placeholder="Search pages..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                  }}
                />
                <kbd style={{
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                }}>ESC</kbd>
              </div>

              <div style={{ maxHeight: 320, overflowY: 'auto', padding: '8px' }}>
                {filtered.length === 0 ? (
                  <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
                    No results found
                  </div>
                ) : (
                  filtered.map((page, i) => (
                    <div
                      key={page.path}
                      onClick={() => navigate(page.path)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '12px 16px',
                        borderRadius: 10,
                        cursor: 'pointer',
                        background: i === selectedIndex ? 'rgba(255,255,255,0.06)' : 'transparent',
                        transition: 'background 0.15s ease',
                      }}
                    >
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: i === selectedIndex ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.04)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'background 0.15s ease',
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={i === selectedIndex ? '#111111' : 'var(--text-muted)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>
                        </svg>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: i === selectedIndex ? 'var(--text-primary)' : 'var(--text-secondary)',
                          transition: 'color 0.15s ease',
                        }}>{page.name}</div>
                        <div style={{
                          fontSize: 12,
                          color: 'var(--text-muted)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>{page.description}</div>
                      </div>
                      {i === selectedIndex && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 10 4 15 9 20"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/>
                        </svg>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                fontSize: 11,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <kbd style={{ padding: '1px 5px', borderRadius: 4, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>↑↓</kbd> navigate
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <kbd style={{ padding: '1px 5px', borderRadius: 4, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>↵</kbd> open
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
