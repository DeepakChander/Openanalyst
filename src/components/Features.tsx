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
}

const services: Service[] = [
    {
        id: 1,
        title: 'REAL TIME DATA INSIGHTS',
        description: 'Monitor your business performance with live dashboards that update as your data changes',
    },
    {
        id: 2,
        title: 'PREDICTIVE ANALYTICS',
        description: 'Anticipate market trends and customer behavior with our advanced forecasting models',
    },
    {
        id: 3,
        title: 'AUTOMATE REPORTING',
        description: 'Save hours each week with customizable reports that generate and distribute automatically.',
    },
    {
        id: 4,
        title: 'DATA INTEGRATIONS',
        description: 'Connect all your data sources in one place, from CRM systems to financial platforms.',
    },
    {
        id: 5,
        title: 'CUSTOMIZABLE VISUALIZATIONS',
        description: 'Create stunning charts and graphs that tell the story your data holds',
    },
    {
        id: 6,
        title: 'COLLABORATIVE WORKSPACE',
        description: 'Share insights and annotations with your team in real-time',
    },
    {
        id: 7,
        title: 'ENTERPRISE SECURITY',
        description: 'Protect your sensitive data with bank-level encryption and compliance standards',
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
                                            <h3 className="text-2xl font-bold uppercase tracking-wider text-black group-hover:text-brand-primary transition-colors duration-300">
                                                {service.title}
                                            </h3>
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
