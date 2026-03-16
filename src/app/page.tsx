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
  'AI Marketing',
  'Campaign Automation',
  'Predictive Analytics',
  'Multi-Channel',
  'ROI Optimization',
  'Content Generation',
  'Audience Segmentation',
  'A/B Testing',
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
