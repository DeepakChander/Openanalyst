'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

const SI = 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons';

const integrations: { name: string; slug: string; color: string }[] = [
    { name: 'Gmail', slug: 'gmail', color: '#EA4335' },
    { name: 'Google Analytics', slug: 'googleanalytics', color: '#E37400' },
    { name: 'Slack', slug: 'slack', color: '#4A154B' },
    { name: 'WhatsApp', slug: 'whatsapp', color: '#25D366' },
    { name: 'Outlook', slug: 'microsoftoutlook', color: '#0078D4' },
    { name: 'Google Docs', slug: 'googledocs', color: '#4285F4' },
    { name: 'Google Sheets', slug: 'googlesheets', color: '#0F9D58' },
    { name: 'Google Drive', slug: 'googledrive', color: '#4285F4' },
    { name: 'Google BigQuery', slug: 'googlebigquery', color: '#4386FA' },
    { name: 'Google Meet', slug: 'googlemeet', color: '#00897B' },
    { name: 'Google Ads', slug: 'googleads', color: '#4285F4' },
    { name: 'Google Maps', slug: 'googlemaps', color: '#4285F4' },
    { name: 'Google Calendar', slug: 'googlecalendar', color: '#4285F4' },
    { name: 'Zoom', slug: 'zoom', color: '#2D8CFF' },
    { name: 'YouTube', slug: 'youtube', color: '#FF0000' },
    { name: 'Notion', slug: 'notion', color: '#000000' },
    { name: 'Airtable', slug: 'airtable', color: '#18BFFF' },
    { name: 'Linear', slug: 'linear', color: '#5E6AD2' },
    { name: 'Calendly', slug: 'calendly', color: '#006BFF' },
    { name: 'Supabase', slug: 'supabase', color: '#3ECF8E' },
    { name: 'LinkedIn', slug: 'linkedin', color: '#0A66C2' },
    { name: 'Facebook', slug: 'facebook', color: '#1877F2' },
    { name: 'HubSpot', slug: 'hubspot', color: '#FF7A59' },
    { name: 'Meta Ads', slug: 'meta', color: '#0081FB' },
    { name: 'Stripe', slug: 'stripe', color: '#635BFF' },
    { name: 'Dropbox', slug: 'dropbox', color: '#0061FF' },
    { name: 'Shopify', slug: 'shopify', color: '#7AB55C' },
];

const Integrations: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    gsap.registerPlugin(ScrollTrigger, useGSAP);

    useGSAP(() => {
        const cards = gsap.utils.toArray<HTMLElement>('.integration-card');
        gsap.from(cards, {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.03,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 bg-white overflow-hidden relative">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-brand-primary">
                            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" />
                            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        <span className="font-mono text-sm tracking-wider uppercase text-gray-500">/ MCP INTEGRATIONS</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
                        27 MCP Integrations
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Connect your AI marketing agent with the tools you already use. No complex setup required.
                    </p>
                </div>

                {/* Integrations Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
                    {integrations.map((integration, i) => (
                        <div
                            key={i}
                            className="integration-card group relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
                            style={{ perspective: '600px' }}
                            onMouseEnter={(e) => {
                                const card = e.currentTarget;
                                card.style.transform = 'translateY(-4px)';
                                card.style.borderColor = integration.color;
                            }}
                            onMouseLeave={(e) => {
                                const card = e.currentTarget;
                                card.style.transform = 'translateY(0)';
                                card.style.borderColor = '';
                            }}
                        >
                            <div className="flex flex-col items-center text-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                                    style={{ backgroundColor: `${integration.color}15` }}
                                >
                                    <img
                                        src={`${SI}/${integration.slug}.svg`}
                                        alt={integration.name}
                                        width="20"
                                        height="20"
                                    />
                                </div>
                                <span className="text-xs font-medium text-gray-700 leading-tight">{integration.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Integrations;
