import type { Metadata } from 'next';
import DocsSidebar from '@/components/docs/DocsSidebar';
import DocsTableOfContents from '@/components/docs/DocsTableOfContents';

export const metadata: Metadata = {
  title: 'Documentation | OpenAnalyst',
  description: 'Learn how to use OpenAnalyst — the AI-powered analytics platform. Guides, API references, and configuration docs.',
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
      <DocsSidebar />

      <DocsTableOfContents />

      <main
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
