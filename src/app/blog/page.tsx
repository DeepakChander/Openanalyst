import { Header, Footer } from '@/components';

export default function BlogPage() {
    const posts = [
        { category: 'AI & Data', title: 'The Future of Autonomous Analytics Agents', excerpt: 'How AI agents are transforming the way businesses interact with their data warehouses and reducing time-to-insight by 90%.' },
        { category: 'Product', title: 'Introducing OpenAnalyst 2.0', excerpt: 'Our biggest update yet brings new AI models, faster processing, and enhanced collaboration features.' },
        { category: 'Tutorial', title: 'Getting Started with Data Visualization', excerpt: 'A comprehensive guide to creating compelling data stories with OpenAnalyst\'s visualization tools.' },
        { category: 'Case Study', title: 'How TechCorp Reduced Analysis Time by 80%', excerpt: 'Learn how a Fortune 500 company transformed their analytics workflow with OpenAnalyst.' },
        { category: 'AI & Data', title: 'Understanding Large Language Models', excerpt: 'A deep dive into how LLMs power modern analytics and what it means for your business.' },
        { category: 'Product', title: 'New Integration: Salesforce Connector', excerpt: 'Connect your Salesforce data directly to OpenAnalyst for seamless CRM analytics.' },
    ];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1, paddingTop: '128px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: 700,
                        marginBottom: '48px',
                        textAlign: 'center',
                        color: '#ffffff'
                    }}>
                        Latest Insights
                    </h1>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '32px'
                    }}>
                        {posts.map((post, i) => (
                            <article key={i} style={{ cursor: 'pointer' }}>
                                <div style={{
                                    aspectRatio: '16/9',
                                    backgroundColor: '#18181b',
                                    borderRadius: '12px',
                                    marginBottom: '24px',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(135deg, #18181b, #000000)'
                                    }} />
                                </div>
                                <span style={{
                                    color: '#ff8552',
                                    fontSize: '0.875rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    {post.category}
                                </span>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    marginTop: '8px',
                                    marginBottom: '12px',
                                    color: '#ffffff',
                                    lineHeight: 1.3
                                }}>
                                    {post.title}
                                </h3>
                                <p style={{
                                    color: '#9ca3af',
                                    lineHeight: 1.6,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {post.excerpt}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
