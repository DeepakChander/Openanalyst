'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Button from './Button';

const Stats: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    gsap.registerPlugin(ScrollTrigger, useGSAP);

    useGSAP(() => {
        const elements = gsap.utils.toArray<HTMLElement>('.reveal-element');

        gsap.from(elements, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 bg-white text-black relative overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Header Section */}
                <div className="mb-12 reveal-element">
                    <div className="flex items-center gap-2 mb-6">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-primary">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 8L16 12L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-mono text-sm tracking-wider uppercase text-gray-500">/ WHO WE ARE</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] max-w-5xl tracking-tight text-black">
                        Transforming raw data into actionable insights. We build AI-powered analytics tools that help businesses make smarter, faster decisions with confidence.
                    </h2>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column (Metrics + CTA) - Spans 7 columns */}
                    <div className="lg:col-span-7 flex flex-col gap-6">

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Card 1: 500+ Completed Projects (Light Theme) */}
                            <div className="reveal-element relative p-8 rounded-3xl overflow-hidden min-h-[240px] flex flex-col justify-end group bg-gray-50 border border-black/5">
                                {/* Gradient Effect */}
                                {/* Gradient & Pattern Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-purple-500/10 z-0"></div>
                                <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                                <div className="absolute top-0 right-0 p-10 bg-brand-primary/20 blur-3xl rounded-full w-32 h-32"></div>

                                <div className="relative z-10 text-black">
                                    <h3 className="text-6xl font-bold mb-2">2K+</h3>
                                    <p className="text-lg text-gray-600">Beta Users</p>
                                </div>
                            </div>

                            {/* Card 2: Integrations */}
                            <div className="reveal-element relative p-8 bg-white border border-black/5 rounded-3xl min-h-[240px] flex flex-col justify-center">
                                <h3 className="text-6xl font-bold mb-2 text-brand-primary">24+</h3>
                                <p className="text-lg text-gray-600">Integrations</p>
                            </div>

                            {/* Card 3: 24 Trusted Partners (Light) */}
                            <div className="reveal-element relative p-8 bg-white border border-black/5 rounded-3xl min-h-[240px] flex flex-col justify-center">
                                <h3 className="text-6xl font-bold mb-2 text-brand-primary">99.9%</h3>
                                <p className="text-lg text-gray-600">System Uptime</p>
                            </div>

                            {/* Card 4: Time Saved */}
                            <div className="reveal-element relative p-8 rounded-3xl overflow-hidden min-h-[240px] flex flex-col justify-end bg-gray-50 border border-black/5">
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent z-0"></div>
                                {/* Diagonal lines texture */}
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}></div>

                                <div className="relative z-10 text-black">
                                    <h3 className="text-6xl font-bold mb-2">10x</h3>
                                    <p className="text-lg text-gray-600">Faster Insights</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Top Button */}
                        <div className="reveal-element">
                            <Button href="/about" variant="fill" className="w-full justify-between !bg-black !text-white hover:!bg-gray-800">
                                More About Us
                            </Button>
                        </div>
                    </div>

                    {/* Right Column (Video) - Spans 5 columns */}
                    <div className="lg:col-span-5 reveal-element h-full min-h-[500px] lg:min-h-0">
                        <div className="relative h-full w-full rounded-3xl overflow-hidden bg-gray-100 group cursor-pointer border border-black/5">
                            {/* Placeholder for Video/Image */}
                            <div className="absolute inset-0 bg-transparent"></div>
                            {/* Optional: Add an actual image tag here if available */}
                            <img
                                src="/images/hero_bg.png"
                                alt="Founder"
                                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                            />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
