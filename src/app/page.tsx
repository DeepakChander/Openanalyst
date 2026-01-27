import {
  Header,
  Hero,
  Stats,
  Features,
  WhatSetsApart,
  HowItWorks,
  Testimonials,
  Integrations,
  Pricing,
  Footer
} from '@/components';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <WhatSetsApart />
        <HowItWorks />
        <Integrations />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
