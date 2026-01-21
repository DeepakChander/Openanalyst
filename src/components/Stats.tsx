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
                        Empowering brands through intelligent design. We craft sleek, high-performance interfaces and digital experiences rooted in clarity and creative precision.
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
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-purple-500/5 z-0"></div>
                                <div className="absolute top-0 right-0 p-10 bg-brand-primary/10 blur-3xl rounded-full w-32 h-32"></div>

                                <div className="relative z-10 text-black">
                                    <h3 className="text-6xl font-bold mb-2">500+</h3>
                                    <p className="text-lg text-gray-600">Completed Projects</p>
                                </div>
                            </div>

                            {/* Card 2: 10x Automation Efficiency (Light) */}
                            <div className="reveal-element relative p-8 bg-white border border-black/5 rounded-3xl min-h-[240px] flex flex-col justify-center">
                                <h3 className="text-6xl font-bold mb-2 text-brand-primary">10x</h3>
                                <p className="text-lg text-gray-600">Automation Efficiency</p>
                            </div>

                            {/* Card 3: 24 Trusted Partners (Light) */}
                            <div className="reveal-element relative p-8 bg-white border border-black/5 rounded-3xl min-h-[240px] flex flex-col justify-center">
                                <h3 className="text-6xl font-bold mb-2 text-brand-primary">24</h3>
                                <p className="text-lg text-gray-600">Trusted Partners</p>
                            </div>

                            {/* Card 4: 98% Real-Time Delivery (Light Theme) */}
                            <div className="reveal-element relative p-8 rounded-3xl overflow-hidden min-h-[240px] flex flex-col justify-end bg-gray-50 border border-black/5">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent z-0"></div>
                                {/* Abstract lines or texture */}
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                                <div className="relative z-10 text-black">
                                    <h3 className="text-6xl font-bold mb-2">98%</h3>
                                    <p className="text-lg text-gray-600">Real-Time Delivery</p>
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

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/80 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-300 shadow-xl">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center pl-1 shadow-inner">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-brand-primary">
                                            <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
