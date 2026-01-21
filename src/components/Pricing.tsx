'use client';

import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Button from './Button';

const Pricing: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isAnnual, setIsAnnual] = useState(false);

    gsap.registerPlugin(ScrollTrigger, useGSAP);

    useGSAP(() => {
        gsap.from('.pricing-card', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 75%',
            }
        });
    }, { scope: containerRef });

    const plans = [
        {
            name: 'Pro Plan',
            tagline: 'For individuals & small projects',
            monthlyPrice: 499,
            features: [
                'Up to 5 custom pages',
                'Brand identity & design system',
                'Copywriting + SEO setup',
                'Priority updates',
            ],
            cta: 'WORK WITH US',
            featured: false,
            href: '/contact',
        },
        {
            name: 'Premium',
            tagline: 'For growing brands & established businesses',
            monthlyPrice: 999,
            features: [
                'Full-scale website (6+ pages)',
                'Advanced animations & motion',
                'Full brand strategy & art direction',
                'Ongoing monthly support',
            ],
            cta: 'WORK WITH US',
            featured: true,
            href: '/contact',
        },
        {
            name: 'Enterprise',
            tagline: 'For organizations & agencies at scale',
            monthlyPrice: null,
            features: [
                'Unlimited pages & projects',
                'Dedicated design team',
                'Custom integrations & APIs',
                '24/7 priority support',
                'SLA & compliance ready',
            ],
            cta: 'CONTACT SALES',
            featured: false,
            href: '/contact',
        },
    ];

    const getPrice = (monthlyPrice: number | null) => {
        if (monthlyPrice === null) return 'Custom';
        const price = isAnnual ? Math.floor(monthlyPrice * 0.8) : monthlyPrice;
        return `$${price}`;
    };

    return (
        <section ref={containerRef} className="py-24 lg:py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10 max-w-6xl">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
                    {/* Section Label - Left */}
                    <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-brand-primary" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                        <span className="text-brand-primary font-mono text-sm tracking-wider">/PRICING</span>
                    </div>

                    {/* Right - Flexible plans text */}
                    <p className="text-gray-600 text-base md:text-right max-w-md">
                        Flexible plans built for creators, startups,<br className="hidden md:block" />
                        and brands — choose what fits your goals
                    </p>
                </div>

                {/* Billing Toggle - Centered */}
                <div className="flex justify-center mb-16">
                    <div className="inline-flex items-center bg-gray-100 rounded-full p-1 border border-black/5">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${!isAnnual
                                ? 'bg-white text-black shadow-sm'
                                : 'text-gray-500 hover:text-black'
                                }`}
                        >
                            MONTHLY
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${isAnnual
                                ? 'bg-white text-black shadow-sm'
                                : 'text-gray-500 hover:text-black'
                                }`}
                        >
                            ANNUAL
                            {!isAnnual && <span className="text-brand-primary text-xs font-bold">-20% OFF</span>}
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.slice(0, 2).map((plan) => (
                        <div
                            key={plan.name}
                            className={`pricing-card relative rounded-2xl overflow-hidden transition-all duration-300 bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md` + (plan.featured ? ' border-brand-primary/20 hover:border-brand-primary/30' : '')}
                        >
                            {/* Card Content */}
                            <div className="p-8">
                                {/* Plan Name */}
                                <h3 className={`text-2xl font-bold mb-1 ${plan.featured ? 'text-brand-primary' : 'text-black'
                                    }`} style={{ fontStyle: 'italic' }}>
                                    {plan.name}
                                </h3>

                                {/* Tagline */}
                                <p className="text-gray-600 text-sm mb-8">
                                    {plan.tagline}
                                </p>

                                {/* Price */}
                                <div className="mb-10">
                                    <span className="text-5xl font-bold text-black tracking-tight">
                                        {getPrice(plan.monthlyPrice)}
                                    </span>
                                    {plan.monthlyPrice !== null && (
                                        <span className="text-gray-500 text-xl">/m</span>
                                    )}
                                </div>

                                {/* Features */}
                                <ul className="space-y-4 mb-10">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                            <svg className="w-4 h-4 text-brand-primary mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA Button - At Bottom */}
                            <div className="px-8 pb-8">
                                <Button
                                    href={plan.href}
                                    variant={plan.featured ? 'fill' : 'stroke'}
                                    className={`w-full justify-center ${!plan.featured ? '!border-gray-300 !text-black hover:!bg-gray-50' : ''}`}
                                >
                                    {plan.cta}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Note */}
                <p className="text-center text-gray-500 text-sm mt-12">
                    All plans include a 14-day money-back guarantee. No questions asked.
                </p>
            </div>
        </section>
    );
};

export default Pricing;
