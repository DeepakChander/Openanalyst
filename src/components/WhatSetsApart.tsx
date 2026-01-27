'use client';

import React, { useRef } from 'react';
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

const WhatSetsApart: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

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

        // Each step card animates in on scroll
        const stepCards = gsap.utils.toArray<HTMLElement>('.wsa-step-card');
        stepCards.forEach((card, index) => {
            gsap.from(card, {
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'top 40%',
                    toggleActions: 'play none none none',
                }
            });

            // Animate the progress line filling
            const progressLine = card.querySelector('.wsa-progress-fill');
            if (progressLine) {
                gsap.from(progressLine, {
                    scaleY: 0,
                    duration: 0.6,
                    delay: 0.3,
                    ease: 'power2.out',
                    transformOrigin: 'top center',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    }
                });
            }

            // Animate the step number
            const stepNumber = card.querySelector('.wsa-step-number');
            if (stepNumber) {
                gsap.from(stepNumber, {
                    scale: 0,
                    duration: 0.5,
                    delay: 0.2,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    }
                });
            }

            // Animate the title
            const title = card.querySelector('.wsa-step-title');
            if (title) {
                gsap.from(title, {
                    x: 30,
                    opacity: 0,
                    duration: 0.6,
                    delay: 0.4,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    }
                });
            }

            // Animate the description
            const desc = card.querySelector('.wsa-step-desc');
            if (desc) {
                gsap.from(desc, {
                    x: 30,
                    opacity: 0,
                    duration: 0.6,
                    delay: 0.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    }
                });
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

                {/* All Steps - Scroll Reveal */}
                <div className="space-y-0">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="wsa-step-card"
                        >
                            <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-start">
                                {/* Left - Step Indicator */}
                                <div className="flex items-start gap-6">
                                    {/* Timeline */}
                                    <div className="flex flex-col items-center">
                                        {/* Step Number Circle */}
                                        <div className="wsa-step-number w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-brand-primary flex items-center justify-center bg-white relative z-10">
                                            <span className="text-brand-primary font-bold text-lg md:text-xl font-mono">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                        {/* Connecting Line */}
                                        {index < benefits.length - 1 && (
                                            <div className="w-px h-24 md:h-32 bg-gray-200 relative overflow-hidden">
                                                <div className="wsa-progress-fill absolute inset-0 bg-brand-primary" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Step Label */}
                                    <div className="pt-3 lg:hidden">
                                        <span className="text-gray-400 font-mono text-xs tracking-wider uppercase">Step {index + 1}</span>
                                    </div>
                                </div>

                                {/* Right - Content */}
                                <div className={`pb-16 md:pb-24 ${index === benefits.length - 1 ? 'pb-0 md:pb-0' : ''}`}>
                                    <span className="hidden lg:block text-gray-400 font-mono text-xs tracking-wider uppercase mb-3">Step {index + 1}</span>
                                    <h3 className="wsa-step-title text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-black mb-4 tracking-wide">
                                        {benefit.title}
                                    </h3>
                                    <p className="wsa-step-desc text-gray-600 text-base md:text-lg leading-relaxed max-w-xl">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatSetsApart;
