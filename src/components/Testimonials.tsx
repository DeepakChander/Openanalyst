'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

const Testimonials: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    gsap.registerPlugin(ScrollTrigger, useGSAP);

    const testimonials = [
        {
            name: 'Sarah Jenks',
            role: 'Head of Data, TechCorp',
            comment: 'OpenAnalyst transformed how we process big data. The AI agents are incredibly accurate and intuitive.',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            name: 'Michael Chen',
            role: 'CTO, StartUp Inc',
            comment: 'The speed at which we can generate reports now is mind-blowing. Weeks of work compressed into minutes.',
            image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            name: 'Elena Rodriguez',
            role: 'Marketing Director, GrowthCo',
            comment: 'Finally, an analytics tool that doesn\'t require a PhD to use. I can ask simple questions and get deep insights.',
            image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
    ];

    useGSAP(() => {
        gsap.from('.testimonial-card', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 bg-brand-secondary relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-black mb-6">
                        LOVED BY <span className="text-brand-primary">INNOVATORS</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="testimonial-card p-8 rounded-2xl bg-white border border-black/5 hover:border-brand-primary/30 transition-all duration-300 hover:-translate-y-2 group"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-brand-warning fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                "{item.comment}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-secondary to-gray-300 p-[2px]">
                                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-black group-hover:text-brand-primary transition-colors">
                                        {item.name}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        {item.role}
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

export default Testimonials;
