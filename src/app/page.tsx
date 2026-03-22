import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import {
  Header,
  Hero,
  Footer
} from '@/components';

export const metadata: Metadata = {
  title: "OpenAnalyst - AI Marketing Agent Platform | Automate Campaigns with AI",
  description:
    "OpenAnalyst is the #1 AI marketing agent platform. 42 AI agents automate campaign creation, optimization, and analytics across every channel. 27+ integrations. Start for $1.",
  alternates: {
    canonical: "https://openanalyst.com/",
  },
};

// Lazy load below-the-fold sections
const MarqueeStrip = dynamic(() => import('@/components/MarqueeStrip'), { ssr: true });
const Stats = dynamic(() => import('@/components/Stats'), { ssr: true });
const Features = dynamic(() => import('@/components/Features'), { ssr: true });
const HowItWorks = dynamic(() => import('@/components/HowItWorks'), { ssr: true });
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: true });
const Pricing = dynamic(() => import('@/components/Pricing'), { ssr: true });
const PlatformAvailability = dynamic(() => import('@/components/PlatformAvailability'), { ssr: true });
const LogoConstellation = dynamic(() => import('@/components/LogoConstellation'), { ssr: true });

const MARQUEE_ITEMS = [
  {
    text: 'AI Marketing',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"/></svg>,
  },
  {
    text: 'Campaign Automation',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
  {
    text: 'Predictive Analytics',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  },
  {
    text: 'Multi-Channel',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  },
  {
    text: 'ROI Optimization',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  },
  {
    text: 'Content Generation',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  },
  {
    text: 'Audience Segmentation',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    text: 'A/B Testing',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="8" height="18" rx="2"/><rect x="14" y="3" width="8" height="18" rx="2"/><path d="M5 9h2M16 9h4M5 13h2M16 13h4"/></svg>,
  },
];

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#1A1A1A' }}>
      <Header />
      <main>
        <Hero />
        <MarqueeStrip items={MARQUEE_ITEMS} dark={false} />
        <Stats />
        <Features />
        <LogoConstellation />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <PlatformAvailability />
      </main>
      <Footer />
    </div>
  );
}
