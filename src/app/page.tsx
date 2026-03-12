import {
  Header,
  Hero,
  Stats,
  Features,
  HowItWorks,
  LLMModels,
  Pricing,
  Footer
} from '@/components';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <LLMModels />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
