'use client';

import { useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header, Footer } from '@/components';

gsap.registerPlugin(ScrollTrigger);

/* ═══ DATA ═══ */
const values = [
    { tag: 'CULTURE', title: 'Remote-First DNA', desc: 'Work from anywhere. We\'ve built async-first workflows that let you do your best work, wherever you are.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
    { tag: 'INNOVATION', title: 'Ship Fast, Learn Faster', desc: 'We deploy daily. Experiment boldly, iterate relentlessly. Failure is feedback.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
    { tag: 'GROWTH', title: 'Compound Your Skills', desc: '$5K/yr learning budget. Courses, conferences, certifications — we match your ambition.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
    { tag: 'COMMUNITY', title: 'Open Source Heart', desc: 'We build in public. Our tools are used by thousands — ship code that matters.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
];

const benefits = [
    { title: 'Meaningful Equity', desc: 'Real equity from day one — own a piece of the future.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg> },
    { title: 'Flexible Hours', desc: 'We measure output, not hours. Design your day.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
    { title: 'Health & Wellness', desc: 'Full medical + $200/mo wellness stipend.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
    { title: 'Team Retreats', desc: 'Annual offsites. Last: Lisbon. Next: Tokyo.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
    { title: 'Latest Hardware', desc: 'MacBook Pro M4, 4K display, ergonomic setup.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
    { title: 'Unlimited PTO', desc: 'Minimum 3 weeks enforced. Rest is productive.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> },
];

const departments = [
    { name: 'Engineering', color: '#FF6B00', roles: [
        { title: 'Senior Full-Stack Engineer', location: 'Remote · Worldwide', type: 'Full-time' },
        { title: 'ML/AI Engineer', location: 'Remote · Worldwide', type: 'Full-time' },
        { title: 'Platform Engineer', location: 'Remote · Worldwide', type: 'Full-time' },
        { title: 'Frontend Engineer (React)', location: 'Remote · Worldwide', type: 'Full-time' },
    ]},
    { name: 'Product & Design', color: '#8B5CF6', roles: [
        { title: 'Product Manager', location: 'Remote · US/EU', type: 'Full-time' },
        { title: 'Senior Product Designer', location: 'Remote · Worldwide', type: 'Full-time' },
    ]},
    { name: 'Marketing & Growth', color: '#10B981', roles: [
        { title: 'Growth Lead', location: 'Remote · US', type: 'Full-time' },
        { title: 'Content Strategist', location: 'Remote · Worldwide', type: 'Full-time' },
    ]},
    { name: 'Operations', color: '#F59E0B', roles: [
        { title: 'Customer Success Manager', location: 'Remote · Worldwide', type: 'Full-time' },
        { title: 'Business Development', location: 'Remote · US', type: 'Full-time' },
    ]},
];

const hiringSteps = [
    { num: '01', title: 'Apply', desc: 'Every application read by a human.', dur: '< 1 min' },
    { num: '02', title: 'Intro Call', desc: '30-min conversation about your goals.', dur: '30 min' },
    { num: '03', title: 'Deep Dive', desc: 'Hands-on challenge relevant to your role.', dur: '2-3 hrs' },
    { num: '04', title: 'Team Meet', desc: 'Meet your future teammates. Interview us too.', dur: '45 min' },
    { num: '05', title: 'Offer', desc: 'Decision within 5 business days.', dur: '< 5 days' },
];

export default function CareersPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const heroInnerRef = useRef<HTMLDivElement>(null);
    const [openDept, setOpenDept] = useState<number | null>(0);
    const deptRefs = useRef<(HTMLDivElement | null)[]>([]);

    const toggleDept = useCallback((index: number) => {
        const el = deptRefs.current[index];
        if (!el) return;
        if (openDept === index) {
            gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.inOut', onComplete: () => setOpenDept(null) });
        } else {
            if (openDept !== null && deptRefs.current[openDept]) {
                gsap.to(deptRefs.current[openDept]!, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.inOut' });
            }
            setOpenDept(index);
            gsap.set(el, { height: 'auto', opacity: 1 });
            const h = el.offsetHeight;
            gsap.fromTo(el, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.35, ease: 'power2.out' });
        }
    }, [openDept]);

    useGSAP(() => {
        gsap.fromTo('.car-hero-label', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.2 });
        gsap.fromTo('.car-hero-heading', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out', delay: 0.3 });
        gsap.fromTo('.car-hero-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.7 });
        gsap.fromTo('.car-hero-stats > div', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, delay: 0.9 });

        gsap.utils.toArray<HTMLElement>('.car-reveal').forEach(el => {
            gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
        });

        gsap.fromTo('.car-value-card', { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.car-values', start: 'top 85%' } });
        gsap.fromTo('.car-benefit', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: '.car-benefits', start: 'top 90%', toggleActions: 'play none none none' } });
        gsap.fromTo('.car-step', { x: -30, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.car-process', start: 'top 85%' } });

        /* ── Hero 3D perspective scroll ── */
        if (heroInnerRef.current) {
            gsap.to(heroInnerRef.current, {
                y: 80,
                scale: 0.92,
                rotateX: -5,
                opacity: 0.6,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroInnerRef.current.parentElement,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }
    }, { scope: pageRef });

    return (
        <div ref={pageRef} style={{ minHeight: '100vh' }}>
            <Header />

            {/* HERO — Light (with stat bar below heading) */}
            <section className="light-section" style={{ paddingTop: 'clamp(100px, 15vw, 160px)', paddingBottom: 80, background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden', perspective: 1200 }}>
                <div ref={heroInnerRef} style={{ transformOrigin: 'center top' }}>
                {/* Grid background */}
                <div aria-hidden="true" style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: 'linear-gradient(to right, rgba(15,23,42,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.07) 1px, transparent 1px)',
                    backgroundSize: '56px 56px',
                    maskImage: 'radial-gradient(ellipse 80% 85% at 50% 40%, black 0%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 85% at 50% 40%, black 0%, transparent 70%)',
                }} />
                <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: '10%', width: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(255,107,0,0.25) 0%, rgba(255,107,0,0.5) 50%, transparent 100%)' }} />
                <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: '25%', width: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(255,107,0,0.15) 0%, rgba(255,107,0,0.25) 50%, transparent 100%)' }} />
                <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, right: '25%', width: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.25) 50%, transparent 100%)' }} />
                <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, right: '10%', width: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.5) 50%, transparent 100%)' }} />
                <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: '38%', height: 1, pointerEvents: 'none', background: 'linear-gradient(to right, transparent 0%, rgba(255,107,0,0.3) 30%, rgba(139,92,246,0.3) 70%, transparent 100%)' }} />

                <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <div className="car-hero-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, marginBottom: 32, border: '1px solid rgba(255,107,0,0.2)', background: 'rgba(255,107,0,0.06)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF6B00', boxShadow: '0 0 8px rgba(255,107,0,0.5)' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '0.1em' }}>We&apos;re Hiring</span>
                    </div>

                    <h1 className="car-hero-heading" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 0 }}>
                        Join the <span style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #FF8533 40%, #F59E0B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Revolution</span>
                    </h1>

                    <p className="car-hero-sub" style={{ maxWidth: 520, margin: '28px auto 40px', fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        We&apos;re building the future of AI marketing. Join a remote-first team shipping products used by thousands.
                    </p>
                    <div className="car-hero-stats" style={{ display: 'flex', gap: 32, justifyContent: 'center', paddingTop: 28, borderTop: '1px solid var(--border)' }}>
                        {[{ val: '100%', label: 'Remote' }, { val: '13+', label: 'Open Roles' }, { val: '12', label: 'Countries' }, { val: '4.9', label: 'Glassdoor' }].map((s, i) => (
                            <div key={i}>
                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 800, color: 'var(--orange)' }}>{s.val}</div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </section>

            {/* CULTURE VALUES — Light (first card dark accent) */}
            <section className="car-values light-section" style={{ padding: 'clamp(60px, 10vw, 120px) 24px', background: 'var(--bg-surface)' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div className="car-reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
                        <p className="label-mono" style={{ color: 'var(--orange)', marginBottom: 12 }}>Culture</p>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>What makes us <span className="text-gradient">different</span></h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                        {values.map((v, i) => (
                            <div key={i} className="car-value-card" style={{ padding: '36px 32px', borderRadius: 20, background: i === 0 ? 'var(--bg-dark)' : 'var(--bg-white)', border: `1px solid ${i === 0 ? 'rgba(255,107,0,0.15)' : 'var(--border)'}`, position: 'relative', overflow: 'hidden' }}>
                                <span style={{ position: 'absolute', top: 12, right: 16, fontFamily: 'var(--font-mono)', fontSize: 10, color: i === 0 ? 'rgba(255,107,0,0.4)' : 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{v.tag}</span>
                                <div style={{ width: 44, height: 44, borderRadius: 12, marginBottom: 18, background: i === 0 ? '#FF6B00' : 'var(--orange-light)', color: i === 0 ? '#fff' : 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{v.icon}</div>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: i === 0 ? '#FAFAFA' : 'var(--text-primary)', marginBottom: 10 }}>{v.title}</h3>
                                <p style={{ fontSize: 14, color: i === 0 ? 'var(--text-on-dark-secondary)' : 'var(--text-secondary)', lineHeight: 1.7 }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* LIFE AT OPENANALYST — Light Photo Grid */}
            <section className="light-section" style={{ padding: '80px 24px', background: 'var(--bg-white)' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div className="car-reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
                        <p className="label-mono" style={{ color: 'var(--orange)', marginBottom: 12 }}>Life at OpenAnalyst</p>
                    </div>
                    <div className="car-photo-grid" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr', gridTemplateRows: '200px 200px', gap: 12 }}>
                        {[
                            { src: '/images/culture/office.jpg', span: '1 / 2', row: '1 / 3' },
                            { src: '/images/culture/workshop.jpg', span: '2 / 3', row: '1 / 2' },
                            { src: '/images/culture/remote.jpg', span: '3 / 4', row: '1 / 2' },
                            { src: '/images/culture/event.jpg', span: '2 / 3', row: '2 / 3' },
                            { src: '/images/culture/workshop2.png', span: '3 / 4', row: '2 / 3' },
                        ].map((photo, i) => (
                            <div key={i} className="car-reveal ai-img-container" style={{
                                gridColumn: photo.span, gridRow: photo.row,
                                borderRadius: 16, position: 'relative', border: '1px solid var(--border)', overflow: 'hidden',
                            }}>
                                <img src={photo.src} alt="Life at OpenAnalyst" style={{
                                    width: '100%', height: '100%',
                                    transition: 'transform 0.6s var(--ease-spring)',
                                }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* OPEN POSITIONS — Light */}
            <section className="light-section" style={{ padding: 'clamp(60px, 10vw, 120px) 24px', background: 'var(--bg-surface)' }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <div className="car-reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
                        <p className="label-mono" style={{ color: 'var(--orange)', marginBottom: 12 }}>Open Roles</p>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>Find your <span className="text-gradient">role</span></h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {departments.map((dept, di) => (
                            <div key={dept.name} className="car-reveal" style={{ borderRadius: 16, background: 'var(--bg-white)', border: `1px solid ${openDept === di ? dept.color + '40' : 'var(--border)'}`, overflow: 'hidden', transition: 'border-color 0.3s ease' }}>
                                <button onClick={() => toggleDept(di)} style={{
                                    width: '100%', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: dept.color, boxShadow: `0 0 8px ${dept.color}40` }} />
                                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{dept.name}</span>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', padding: '2px 8px', borderRadius: 6, background: 'var(--bg-surface)' }}>{dept.roles.length} roles</span>
                                    </div>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: dept.color, transition: 'transform 0.3s ease', transform: openDept === di ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                                </button>
                                <div ref={(el) => { deptRefs.current[di] = el; }} style={{ height: openDept === di ? 'auto' : 0, opacity: openDept === di ? 1 : 0, overflow: 'hidden' }}>
                                    <div style={{ padding: '0 24px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {dept.roles.map((role, ri) => (
                                            <a key={ri} href="mailto:careers@openanalyst.com" style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px',
                                                borderRadius: 12, background: 'var(--bg-surface)', border: '1px solid var(--border)',
                                                textDecoration: 'none', transition: 'all 0.3s ease',
                                            }}
                                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${dept.color}30`; e.currentTarget.style.background = 'var(--bg-primary)'; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-surface)'; }}
                                            >
                                                <div>
                                                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>{role.title}</div>
                                                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{role.location} · {role.type}</div>
                                                </div>
                                                <span style={{ fontSize: 13, color: dept.color, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>Apply &rarr;</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BENEFITS — Light */}
            <section className="car-benefits light-section" style={{ padding: 'clamp(60px, 10vw, 120px) 24px', background: 'var(--bg-white)' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <div className="car-reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
                        <p className="label-mono" style={{ color: 'var(--orange)', marginBottom: 12 }}>Benefits</p>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>Perks that <span className="text-gradient">matter</span></h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                        {benefits.map((b, i) => (
                            <div key={i} className="car-benefit" style={{ padding: '28px 24px', borderRadius: 20, background: 'var(--bg-surface)', border: '1px solid var(--border)', transition: 'all 0.3s ease' }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,107,0,0.2)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                <div style={{ width: 40, height: 40, borderRadius: 12, marginBottom: 14, background: 'var(--orange-light)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{b.icon}</div>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{b.title}</h3>
                                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HIRING PROCESS — Light */}
            <section className="car-process light-section" style={{ padding: 'clamp(60px, 10vw, 120px) 24px', background: 'var(--bg-surface)' }}>
                <div style={{ maxWidth: 700, margin: '0 auto' }}>
                    <div className="car-reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
                        <p className="label-mono" style={{ color: 'var(--orange)', marginBottom: 12 }}>Process</p>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>How we <span className="text-gradient">hire</span></h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {hiringSteps.map((step, i) => (
                            <div key={i} className="car-step" style={{ display: 'flex', alignItems: 'flex-start', gap: 20, padding: '24px 20px', borderRadius: 16, background: 'var(--bg-white)', border: '1px solid var(--border)' }}>
                                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 900, color: 'rgba(255,107,0,0.15)', lineHeight: 1, flexShrink: 0 }}>{step.num}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{step.title}</h3>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', padding: '2px 8px', borderRadius: 6, background: 'var(--bg-surface)' }}>{step.dur}</span>
                                    </div>
                                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA — Light */}
            <section className="light-section" style={{ padding: '100px 24px', background: 'var(--bg-white)' }}>
                <div className="car-reveal" style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '-0.03em' }}>
                        Ready to build the <span className="text-gradient">future</span>?
                    </h2>
                    <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.7 }}>
                        Don&apos;t see your role? We&apos;re always looking for exceptional people.
                    </p>
                    <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="mailto:careers@openanalyst.com" className="btn-primary" style={{ textDecoration: 'none' }}>Send Your Resume <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                        <a href="/contact" className="btn-outline" style={{ textDecoration: 'none' }}>Contact Us</a>
                    </div>
                </div>
            </section>

            <Footer
                ctaWords={['Shape', 'the', 'future', 'of marketing.']}
                ctaHighlight="marketing."
                ctaSubtitle="Join a team obsessed with building AI that marketers actually love."
            />

            <style>{`
                @media (max-width: 1024px) {
                    .car-benefits > div > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 768px) {
                    .car-values > div > div:last-child { grid-template-columns: 1fr !important; }
                    .car-benefits > div > div:last-child { grid-template-columns: 1fr !important; }
                    .car-hero-stats { flex-wrap: wrap !important; gap: 20px !important; }
                    .car-photo-grid { grid-template-columns: 1fr 1fr !important; grid-template-rows: auto !important; }
                    .car-photo-grid > * { grid-column: span 1 !important; grid-row: span 1 !important; }
                    .car-photo-grid > *:first-child { grid-column: 1 / -1 !important; }
                }
                @media (max-width: 480px) {
                    .car-hero-stats > div { flex: 0 0 45% !important; text-align: center; }
                    .car-photo-grid { grid-template-columns: 1fr !important; }
                    .car-photo-grid > *:first-child { grid-column: span 1 !important; }
                }
            `}</style>
        </div>
    );
}
