'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Button from './Button';

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    gsap.registerPlugin(ScrollTrigger, useGSAP);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Initial Entrance Animations
        tl.from('.hero-top-content', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
            .from('.hero-title-word', {
                y: 100,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: 'power4.out'
            }, '-=0.5');

        // Scroll Animations
        gsap.to('.hero-bg', {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        gsap.to(containerRef.current, {
            yPercent: -10, // Reduced movement since it's full height
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });

    }, { scope: heroRef });

    return (
        <section ref={heroRef} className="relative h-screen max-h-screen flex flex-col overflow-hidden bg-white">
            {/* Background Image - reduced opacity for light theme */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/hero_bg.png"
                    alt="Hero Background"
                    className="w-full h-full object-cover"
                />
            </div>

            <div ref={containerRef} className="container relative z-10 mx-auto px-4 flex flex-col justify-between flex-grow pt-32 pb-20 h-full">

                {/* Hero Top: Description & Buttons */}
                <div className="hero-top-content flex flex-col items-end gap-8 max-w-2xl ml-auto">

                    <p className="hero-description text-xl md:text-2xl text-white leading-relaxed text-right md:pl-20">
                        OpenAnalyst's AI agents turn your data into business intelligence.
                        Transform your data into actionable intelligence with our cutting-edge AI agents.
                        Make smarter decisions, faster than ever before.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-end w-full">
                        <Button href="/waitlist" variant="stroke">
                            Join Waitlist
                        </Button>
                        <Button href="/download" variant="fill">
                            Download Now
                        </Button>
                    </div>
                </div>

                {/* Hero Bottom: Title */}
                <div className="hero-bottom-content mt-auto pt-20">
                    <h1 ref={titleRef} className="font-heading font-bold text-5xl md:text-7xl lg:text-9xl tracking-tight uppercase leading-[0.9] text-left text-white">
                        <span className="hero-title-word block">Unlock Deeper</span>
                        <span className="hero-title-word block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-accent-blue relative inline-block">
                            Insights
                            <span className="absolute bottom-1 md:bottom-3 left-0 right-0 h-1 md:h-2 bg-gradient-to-r from-brand-primary to-accent-blue rounded-full opacity-50" />
                        </span>
                        <span className="hero-title-word block">With AI Agents</span>
                    </h1>
                </div>

                {/* Scroll Indicator (Optional, kept at bottom) */}


            </div>
        </section>
    );
};

export default Hero;
