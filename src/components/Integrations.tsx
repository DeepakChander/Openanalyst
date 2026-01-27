'use client';

import React from 'react';

const SI = 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons';

const toolsData: { name: string; slug: string }[] = [
    { name: 'Slack', slug: 'slack' },
    { name: 'Discord', slug: 'discord' },
    { name: 'Notion', slug: 'notion' },
    { name: 'GitHub', slug: 'github' },
    { name: 'Linear', slug: 'linear' },
    { name: 'Jira', slug: 'jira' },
    { name: 'Figma', slug: 'figma' },
    { name: 'Zoom', slug: 'zoom' },
    { name: 'Google Drive', slug: 'googledrive' },
    { name: 'Salesforce', slug: 'salesforce' },
    { name: 'HubSpot', slug: 'hubspot' },
    { name: 'Zendesk', slug: 'zendesk' },
    { name: 'Intercom', slug: 'intercom' },
    { name: 'Shopify', slug: 'shopify' },
    { name: 'Stripe', slug: 'stripe' },
    { name: 'Asana', slug: 'asana' },
    { name: 'Trello', slug: 'trello' },
    { name: 'Teams', slug: 'microsoftteams' },
];

const Integrations: React.FC = () => {

    const marqueeTools = [...toolsData, ...toolsData, ...toolsData, ...toolsData];

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
                                <div key={i} className="px-5 py-3 bg-white border border-black/10 rounded-full text-gray-700 font-medium whitespace-nowrap hover:border-brand-primary hover:text-brand-primary transition-colors shadow-sm flex items-center gap-2.5">
                                    <img src={`${SI}/${tool.slug}.svg`} alt={tool.name} width="20" height="20" />
                                    {tool.name}
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
