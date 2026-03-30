'use client';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'dark' | 'surface' | 'elevated';
  noPadding?: boolean;
}

export default function SectionWrapper({ children, className = '', id, variant = 'dark', noPadding = false }: SectionWrapperProps) {
  const bgMap = {
    dark: 'var(--bg-base)',
    surface: 'var(--bg-surface)',
    elevated: 'var(--bg-elevated)',
  };

  return (
    <section
      id={id}
      className={className}
      style={{
        background: bgMap[variant],
        padding: noPadding ? 0 : undefined,
      }}
    >
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: noPadding ? 0 : '120px 24px',
      }}>
        {children}
      </div>
    </section>
  );
}
