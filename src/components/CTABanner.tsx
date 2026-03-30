'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import GradientMeshBg from './ui/GradientMeshBg';

export default function CTABanner() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '120px 24px' }}>
      <GradientMeshBg
        intensity={1.2}
        colors={[
          { color: 'rgba(0,0,0,0.15)', x: '40%', y: '30%' },
          { color: 'rgba(0,0,0,0.1)', x: '70%', y: '60%' },
          { color: 'rgba(0,0,0,0.08)', x: '20%', y: '70%' },
        ]}
      />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="heading-md"
          style={{ marginBottom: 16 }}
        >
          Ready to{' '}
          <span className="text-gradient">automate</span>
          {' '}your marketing?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ color: 'var(--text-secondary)', fontSize: 18, marginBottom: 40, lineHeight: 1.6 }}
        >
          Start your free trial today. No credit card required.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link href="/contact" className="btn-primary">
            Start Free Trial
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
          <Link href="/contact" className="btn-outline">
            Talk to Sales
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
