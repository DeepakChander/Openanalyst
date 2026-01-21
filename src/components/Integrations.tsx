'use client';

import React from 'react';

const Integrations: React.FC = () => {
    const tools = [
        'Slack', 'Discord', 'Notion', 'GitHub', 'Linear', 'Jira', 'Figma', 'Zoom', 'Google Drive'
    ];

    // Duplicate list 4 times to ensure it fills wide screens and loops seamlessly
    const marqueeTools = [...tools, ...tools, ...tools, ...tools];

    return (
        <section className="py-20 bg-white overflow-hidden border-b border-black/5 relative items-center flex">
            <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/3">
                    <h2 className="text-3xl font-heading font-bold text-black mb-4">
                        Works with your <span className="text-accent-teal">favorite tools</span>
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Connect OpenAnalyst with your existing stack in seconds. No complex setup required.
                    </p>
                    <a href="/integrations" className="text-brand-primary hover:text-black transition-colors font-medium inline-flex items-center gap-2">
                        View all integrations
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                </div>

                <div className="md:w-2/3 w-full relative">
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-20" />
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-20" />

                    <div className="flex gap-4 overflow-hidden mask-image-gradient">
                        <div className="flex gap-4 animate-marquee-scroll min-w-max">
                            {marqueeTools.map((tool, i) => (
                                <div key={i} className="px-6 py-3 bg-white border border-black/10 rounded-full text-gray-700 font-medium whitespace-nowrap hover:border-brand-primary hover:text-brand-primary transition-colors shadow-sm">
                                    {tool}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Integrations;
