'use client';

import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

interface Benefit {
    title: string;
    description: string;
}

const benefits: Benefit[] = [
    {
        title: 'SPEED',
        description: 'Faster time-to-value with our enterprise-grade AI solutions and AI agents at the click of a button.',
    },
    {
        title: 'CONTROL',
        description: 'Full control over your data and AI models. Deploy on-premise or in your private cloud with enterprise-grade security and compliance controls.',
    },
    {
        title: 'FLEXIBILITY',
        description: 'Take custom AI models and connect to any AI model, data source, enterprise apps or company infrastructure you control.',
    },
    {
        title: 'DEEP CAPABILITIES',
        description: 'AI agent platform with the depth to add the every enterprise-class workflow, bot models and extensions management to deploy as one.',
    },
];

const steps = [
    { number: 1, label: 'STEP 1' },
    { number: 2, label: 'STEP 2' },
    { number: 3, label: 'STEP 3' },
    { number: 4, label: 'STEP 4' },
];

const WhatSetsApart: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    gsap.registerPlugin(ScrollTrigger, useGSAP);

    useGSAP(() => {
        // Header entrance
        gsap.from('.wsa-header', {
            y: -30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            }
        });

        // Steps entrance
        gsap.from('.wsa-steps', {
            x: -50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 75%',
            }
        });

        // Benefits entrance
        gsap.from('.wsa-benefit', {
            x: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%',
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 md:py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="wsa-header mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold uppercase tracking-tight">
                        <span className="text-black block">WHAT SETS</span>
                        <span className="text-brand-primary block">OPENANALYST</span>
                        <span className="text-black block">APART</span>
                    </h2>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20">
                    {/* Left Side - Steps with Process Visualization */}
                    <div className="wsa-steps relative">
                        {/* Step Counter */}
                        <div className="mb-8">
                            <span className="text-gray-500 font-mono text-sm tracking-wider">
                                | STEP {activeStep + 1}
                            </span>
                        </div>

                        {/* Process Circle Visualization */}
                        <div className="relative flex items-center justify-center mb-12">
                            <div className="relative w-40 h-40 md:w-52 md:h-52">
                                {/* Grid of dots */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="grid grid-cols-8 gap-2">
                                        {Array.from({ length: 64 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i % 8 < 4 && Math.floor(i / 8) < 4
                                                    ? 'bg-black/40'
                                                    : 'bg-black/20'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Outer ring */}
                                <div className="absolute inset-0 border-2 border-black/10 rounded-full" />

                                {/* Progress arc */}
                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle
                                        cx="50%"
                                        cy="50%"
                                        r="48%"
                                        fill="none"
                                        stroke="rgba(0,0,0,0.05)"
                                        strokeWidth="2"
                                    />
                                    <circle
                                        cx="50%"
                                        cy="50%"
                                        r="48%"
                                        fill="none"
                                        stroke="#ff8552"
                                        strokeWidth="2"
                                        strokeDasharray={`${(activeStep + 1) * 25}%, 100%`}
                                        className="transition-all duration-500"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Steps Timeline */}
                        <div className="relative pl-8">
                            {/* Vertical Line */}
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-black/10" />

                            {/* Steps */}
                            <div className="space-y-8">
                                {steps.map((step, index) => (
                                    <div
                                        key={index}
                                        className={`relative cursor-pointer transition-all duration-300 ${activeStep === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                                            }`}
                                        onClick={() => setActiveStep(index)}
                                    >
                                        {/* Dot on timeline */}
                                        <div
                                            className={`absolute -left-8 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300 ${activeStep === index
                                                ? 'bg-brand-primary shadow-[0_0_10px_#ff8552]'
                                                : 'bg-black/30'
                                                }`}
                                        />

                                        {/* Step content */}
                                        <div className="py-2">
                                            <span
                                                className={`font-mono text-sm tracking-wider ${activeStep === index ? 'text-black' : 'text-gray-500'
                                                    }`}
                                            >
                                                {step.label}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Active Step Content Only */}
                    <div className="flex items-center">
                        <div className="wsa-benefit">
                            <div
                                key={activeStep}
                                className="animate-fadeIn"
                            >
                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-black mb-6 tracking-wide">
                                    {benefits[activeStep].title}
                                </h3>
                                <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-lg">
                                    {benefits[activeStep].description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatSetsApart;
