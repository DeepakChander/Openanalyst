import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { docsNavigation } from '@/lib/docs/navigation';
import { gettingStartedPages } from '@/lib/docs/content-getting-started';
import { usagePages } from '@/lib/docs/content-usage';
import { configurePages } from '@/lib/docs/content-configure';
import { developPages } from '@/lib/docs/content-develop';

const allPages = {
  ...gettingStartedPages,
  ...usagePages,
  ...configurePages,
  ...developPages,
};

const allNavItems = docsNavigation.flatMap((section) => section.items);

function getNavigation(currentSlug: string) {
  const index = allNavItems.findIndex((item) => item.slug === currentSlug);
  return {
    prev: index > 0 ? allNavItems[index - 1] : null,
    next: index < allNavItems.length - 1 ? allNavItems[index + 1] : null,
  };
}

export async function generateStaticParams() {
  const slugs = allNavItems.map((item) => item.slug).filter(Boolean);
  return [
    { slug: undefined },
    ...slugs.map((slug) => ({ slug: [slug] })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const currentSlug = slug ? slug.join('/') : '';
  const page = allPages[currentSlug];

  return {
    title: page
      ? `${page.title} | OpenAnalyst Docs`
      : 'Documentation | OpenAnalyst',
    description:
      page?.description || 'OpenAnalyst documentation and guides.',
  };
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const currentSlug = slug ? slug.join('/') : '';
  const page = allPages[currentSlug];

  if (!page) {
    notFound();
  }

  const { prev, next } = getNavigation(currentSlug);

  return (
    <article>
      {/* Page Header */}
      <header style={{ marginBottom: '40px' }}>
        <h1
          style={{
            fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: '16px',
            fontFamily: 'var(--font-heading)',
          }}
        >
          {page.title}
        </h1>
        <p
          style={{
            fontSize: '17px',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            maxWidth: '640px',
          }}
        >
          {page.description}
        </p>
        <div
          style={{
            marginTop: '24px',
            height: '1px',
            background: 'linear-gradient(to right, rgba(255, 107, 0, 0.3), transparent)',
          }}
        />
      </header>

      {/* Page Content */}
      <div className="docs-content">{page.content}</div>

      {/* Previous / Next Navigation */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px',
          marginTop: '72px',
          paddingTop: '40px',
          borderTop: '1px solid var(--border-default)',
        }}
      >
        {prev ? (
          <Link
            href={prev.slug ? `/docs/${prev.slug}` : '/docs'}
            className="group docs-pn-link"
            style={{
              display: 'flex',
              alignItems: 'stretch',
              overflow: 'hidden',
              border: '1px solid var(--border-default)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              flex: '1',
              maxWidth: '48%',
            }}
          >
            <span
              className="docs-pn-arrow-prev"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 16px',
                borderRight: '1px solid var(--border-subtle)',
                transition: 'all 0.3s ease',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-secondary)' }}>
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '14px 20px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                Previous
              </span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                {prev.title}
              </span>
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/docs/${next.slug}`}
            className="group docs-pn-link"
            style={{
              display: 'flex',
              alignItems: 'stretch',
              overflow: 'hidden',
              border: '1px solid var(--border-default)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              flex: '1',
              maxWidth: '48%',
              marginLeft: 'auto',
            }}
          >
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px', padding: '14px 20px', flex: 1 }}>
              <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                Next
              </span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                {next.title}
              </span>
            </span>
            <span
              className="docs-pn-arrow-next"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 16px',
                borderLeft: '1px solid var(--border-subtle)',
                transition: 'all 0.3s ease',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-secondary)' }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
}
