'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Button from './Button';

interface Service {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
}

const services: Service[] = [
    {
        id: 1,
        title: 'REAL TIME DATA INSIGHTS',
        description: 'Instant visibility into your key performance indicators with milli-second latency updates and live trend tracking.',
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ),
    },
    {
        id: 2,
        title: 'PREDICTIVE ANALYTICS',
        description: 'Leverage advanced machine learning models to forecast market shifts and customer behavior with up to 94% accuracy.',
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
    },
    {
        id: 3,
        title: 'AUTOMATE REPORTING',
        description: 'Eliminate manual data compilation. Schedule custom, pixel-perfect reports to be delivered to stakeholders automatically.',
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        ),
    },
    {
        id: 4,
        title: 'DATA INTEGRATIONS',
        description: 'Seamlessly connect with 100+ platforms including Salesforce, HubSpot, and Google Analytics in just a few clicks.',
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
        ),
    },
    {
        id: 5,
        title: 'CUSTOMIZABLE VISUALIZATIONS',
        description: 'Transform raw numbers into compelling stories with our drag-and-drop builder featuring 50+ chart types.',
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                <path d="M22 12A10 10 0 0 0 12 2v10z" />
            </svg>
        ),
    },
    {
        id: 6,
        title: 'COLLABORATIVE WORKSPACE',
        description: 'Built for teams. Annotate charts, share dashboards, and drive decisions together in a unified environment.',
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        id: 7,
        title: 'ENTERPRISE SECURITY',
        description: 'Bank-grade AES-256 encryption, SOC2 Type II compliance, and granular role-based access control for your peace of mind.',
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
    },
];

const Features: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    gsap.registerPlugin(ScrollTrigger, useGSAP);

    useGSAP(() => {
        // Simple reveal for list items
        const items = gsap.utils.toArray<HTMLElement>('.service-item');

        gsap.from(items, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.services-list',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 bg-white text-black relative">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Left Column - Sticky Header */}
                    <div className="lg:col-span-5 relative">
                        <div className="lg:sticky lg:top-32">
                            <div className="flex items-center gap-2 mb-8">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-primary">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                                </svg>
                                <span className="font-mono text-sm tracking-widest uppercase text-black font-semibold">/ OUR SERVICES</span>
                            </div>

                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1] mb-12 tracking-tight text-black">
                                HERES WHAT <span className="text-brand-primary">OPENANALYST</span> CAN DO FOR YOU
                            </h2>

                            <Button href="/contact" variant="fill" className="!bg-black !text-white hover:!bg-gray-800">
                                Work With Us
                            </Button>
                        </div>
                    </div>

                    {/* Right Column - Service List */}
                    <div className="lg:col-span-7">
                        <div className="mb-16 lg:mb-24 pt-4">
                            <p className="text-xl md:text-2xl text-gray-600 max-w-xl leading-relaxed">
                                Design solutions that fuse creativity, clarity, and motion.
                            </p>
                        </div>

                        <div className="services-list flex flex-col">
                            {/* Top divider */}
                            <div className="h-px bg-black/10 w-12 mb-8"></div>

                            {services.map((service) => (
                                <div key={service.id} className="service-item group border-b border-black/5 py-12 first:pt-0">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                                        {/* Number */}
                                        <div className="md:col-span-2">
                                            <span className="text-6xl font-bold text-brand-primary leading-none block group-hover:translate-x-2 transition-transform duration-300">
                                                {service.id}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="md:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                            <div className="flex items-start gap-4">
                                                <div className="text-brand-primary p-2 bg-brand-primary/5 rounded-lg">
                                                    {service.icon}
                                                </div>
                                                <h3 className="text-2xl font-bold uppercase tracking-wider text-black group-hover:text-brand-primary transition-colors duration-300">
                                                    {service.title}
                                                </h3>
                                            </div>
                                            <p className="text-gray-500 leading-relaxed text-base">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Bottom Divider Indicator */}
                            <div className="h-1 w-12 bg-blue-500 mt-0 mx-auto lg:mx-0 opacity-0"></div>
                            {/* Bottom small blue dash from design */}
                            <div className="w-8 h-1 bg-blue-500 mt-4 rounded-full"></div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Features;
