import type { Metadata } from 'next';
import DocsSidebar from '@/components/docs/DocsSidebar';
import DocsTableOfContents from '@/components/docs/DocsTableOfContents';

export const metadata: Metadata = {
  title: 'Documentation - Guides, API Reference & Setup',
  description:
    'OpenAnalyst documentation: getting started guides, API references, agent configuration, integration setup, and CLI usage. Everything you need to automate marketing with AI.',
  keywords: [
    'OpenAnalyst documentation',
    'AI marketing API',
    'marketing automation docs',
    'OpenAnalyst setup guide',
    'AI agent configuration',
  ],
  alternates: {
    canonical: 'https://openanalyst.com/docs/',
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        color: '#1f2937',
      }}
    >
      <div className="docs-sidebar-desktop">
        <DocsSidebar />
      </div>

      <div className="docs-toc-desktop">
        <DocsTableOfContents />
      </div>

      <main
        className="docs-main-content"
        style={{
          minHeight: '100vh',
          marginLeft: '272px',
        }}
      >
        <div
          style={{
            maxWidth: '780px',
            padding: '48px 40px 80px 120px',
          }}
          className="xl:mr-80"
        >
          {children}
        </div>
      </main>
    </div>
  );
}
