'use client';

import React, { useRef, useState } from 'react';
import Button from './Button';

const Pricing: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
    const [activeModelTab, setActiveModelTab] = useState('openanalyst');
    const [showAllIntegrations, setShowAllIntegrations] = useState(false);

    const plans = [
        {
            name: 'Free',
            tagline: 'Get started with basic features',
            monthlyPrice: 0,
            annualPrice: 0,
            credits: '300',
            creditsLabel: 'credits/mo',
            features: [
                'Access to basic models',
                '300 credits per month',
                'Community support',
                '5 integrations',
                'Basic analytics',
            ],
            cta: 'GET STARTED',
            featured: false,
            href: '/waitlist',
        },
        {
            name: 'Basic',
            tagline: 'For individuals & small projects',
            monthlyPrice: 19,
            annualPrice: 12,
            credits: '2,000',
            creditsLabel: 'credits/mo',
            features: [
                'All Free features',
                '2,000 credits per month',
                'Email support',
                '12 integrations',
                'Standard analytics',
                'API access',
            ],
            cta: 'START BASIC',
            featured: false,
            href: '/waitlist',
        },
        {
            name: 'Pro',
            tagline: 'For growing teams & businesses',
            monthlyPrice: 59,
            annualPrice: 30,
            credits: '7,200',
            creditsLabel: 'credits/mo',
            bonus: '20%',
            features: [
                'All Basic features',
                '6,000 + 20% bonus credits',
                'Priority support',
                'All 24 integrations',
                'Advanced analytics',
                'Custom workflows',
                'Team collaboration',
            ],
            cta: 'START PRO',
            featured: true,
            href: '/waitlist',
        },
        {
            name: 'Max',
            tagline: 'For power users & agencies',
            monthlyPrice: 199,
            annualPrice: 120,
            credits: '30,000',
            creditsLabel: 'credits/mo',
            bonus: '50%',
            features: [
                'All Pro features',
                '20,000 + 50% bonus credits',
                'Dedicated support',
                'All 24 integrations',
                'White-label options',
                'Advanced API access',
                'Custom model fine-tuning',
                'Priority processing',
            ],
            cta: 'START MAX',
            featured: false,
            href: '/waitlist',
        },
        {
            name: 'Enterprise',
            tagline: 'For organizations at scale',
            monthlyPrice: null,
            annualPrice: null,
            credits: 'Unlimited',
            creditsLabel: 'custom credits',
            features: [
                'All Max features',
                'Unlimited credits',
                '24/7 dedicated support',
                'Custom integrations',
                'SLA & compliance ready',
                'On-premise deployment',
                'Dedicated account manager',
                'Custom contracts',
            ],
            cta: 'CONTACT SALES',
            featured: false,
            href: '/contact',
        },
    ];

    const getPrice = (plan: typeof plans[0]) => {
        if (plan.monthlyPrice === null) return 'Custom';
        if (billingCycle === 'annual') {
            return `$${plan.annualPrice}`;
        }
        return `$${plan.monthlyPrice}`;
    };

    const getPeriodLabel = () => {
        return billingCycle === 'annual' ? '/mo' : '/mo';
    };

    // LLM Model Pricing Data
    const llmModels = {
        openai: {
            title: 'OpenAI Models',
            models: [
                { name: 'GPT-4 Turbo', inputCredits: '2,000 credits / 1M', outputCredits: '6,000 credits / 1M' },
                { name: 'GPT-4o', inputCredits: '1,000 credits / 1M', outputCredits: '3,000 credits / 1M' },
                { name: 'GPT-4o Mini', inputCredits: '30 credits / 1M', outputCredits: '120 credits / 1M' },
                { name: 'GPT-3.5 Turbo', inputCredits: '100 credits / 1M', outputCredits: '300 credits / 1M' },
            ]
        },
        claude4: {
            title: 'Anthropic Models - Claude 4 Series',
            models: [
                { name: 'Claude Opus 4', inputCredits: '3,000 credits / 1M', outputCredits: '15,000 credits / 1M' },
                { name: 'Claude Sonnet 4', inputCredits: '600 credits / 1M', outputCredits: '3,000 credits / 1M' },
                { name: 'Claude Haiku 3.5', inputCredits: '160 credits / 1M', outputCredits: '800 credits / 1M' },
            ]
        },
        claude3: {
            title: 'Anthropic Models - Claude 3 Series',
            models: [
                { name: 'Claude 3 Opus', inputCredits: '3,000 credits / 1M', outputCredits: '15,000 credits / 1M' },
                { name: 'Claude 3.5 Sonnet', inputCredits: '600 credits / 1M', outputCredits: '3,000 credits / 1M' },
                { name: 'Claude 3 Haiku', inputCredits: '50 credits / 1M', outputCredits: '250 credits / 1M' },
            ]
        },
        deepseek: {
            title: 'DeepSeek Models',
            models: [
                { name: 'DeepSeek V3.2', inputCredits: '28 credits / 1M', outputCredits: '56 credits / 1M' },
            ]
        },
        qwen: {
            title: 'Qwen Models',
            models: [
                { name: 'Qwen3 Coder', inputCredits: '36 credits / 1M', outputCredits: '140 credits / 1M' },
                { name: 'Qwen3 Coder (Free)', inputCredits: 'FREE', outputCredits: 'FREE', isFree: true },
            ]
        },
        openanalyst: {
            title: 'OpenAnalyst Models',
            models: [
                { name: 'OpenAnalyst Max Beta', inputCredits: '28 credits / 1M', outputCredits: '56 credits / 1M' },
                { name: 'OpenAnalyst Beta', inputCredits: '36 credits / 1M', outputCredits: '140 credits / 1M' },
            ]
        },
    };

    // API Integrations Data - Flat array for better display
    // API Integrations Data - Using img tags with brand logos from CDN
    const SI = 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons';
    const allIntegrations: { name: string; category: string; icon: React.ReactNode }[] = [
        { name: 'Gmail', category: 'Email', icon: <img src={`${SI}/gmail.svg`} alt="Gmail" width="24" height="24" /> },
        { name: 'Outlook', category: 'Email', icon: <img src={`${SI}/microsoftoutlook.svg`} alt="Outlook" width="24" height="24" /> },
        { name: 'Slack', category: 'Communication', icon: <img src={`${SI}/slack.svg`} alt="Slack" width="24" height="24" /> },
        { name: 'WhatsApp', category: 'Communication', icon: <img src={`${SI}/whatsapp.svg`} alt="WhatsApp" width="24" height="24" /> },
        { name: 'Google Calendar', category: 'Google', icon: <img src={`${SI}/googlecalendar.svg`} alt="Google Calendar" width="24" height="24" /> },
        { name: 'Google Docs', category: 'Google', icon: <img src={`${SI}/googledocs.svg`} alt="Google Docs" width="24" height="24" /> },
        { name: 'Google Sheets', category: 'Google', icon: <img src={`${SI}/googlesheets.svg`} alt="Google Sheets" width="24" height="24" /> },
        { name: 'Google Drive', category: 'Google', icon: <img src={`${SI}/googledrive.svg`} alt="Google Drive" width="24" height="24" /> },
        { name: 'Google Meet', category: 'Google', icon: <img src={`${SI}/googlemeet.svg`} alt="Google Meet" width="24" height="24" /> },
        { name: 'Google BigQuery', category: 'Google', icon: <img src={`${SI}/googlebigquery.svg`} alt="Google BigQuery" width="24" height="24" /> },
        { name: 'Google Ads', category: 'Google', icon: <img src={`${SI}/googleads.svg`} alt="Google Ads" width="24" height="24" /> },
        { name: 'Google Maps', category: 'Google', icon: <img src={`${SI}/googlemaps.svg`} alt="Google Maps" width="24" height="24" /> },
        { name: 'Zoom', category: 'Video', icon: <img src={`${SI}/zoom.svg`} alt="Zoom" width="24" height="24" /> },
        { name: 'YouTube', category: 'Video', icon: <img src={`${SI}/youtube.svg`} alt="YouTube" width="24" height="24" /> },
        { name: 'Notion', category: 'Productivity', icon: <img src={`${SI}/notion.svg`} alt="Notion" width="24" height="24" /> },
        { name: 'Airtable', category: 'Productivity', icon: <img src={`${SI}/airtable.svg`} alt="Airtable" width="24" height="24" /> },
        { name: 'Linear', category: 'Productivity', icon: <img src={`${SI}/linear.svg`} alt="Linear" width="24" height="24" /> },
        { name: 'Calendly', category: 'Productivity', icon: <img src={`${SI}/calendly.svg`} alt="Calendly" width="24" height="24" /> },
        { name: 'LinkedIn', category: 'Social', icon: <img src={`${SI}/linkedin.svg`} alt="LinkedIn" width="24" height="24" /> },
        { name: 'Facebook', category: 'Social', icon: <img src={`${SI}/facebook.svg`} alt="Facebook" width="24" height="24" /> },
        { name: 'HubSpot', category: 'Marketing', icon: <img src={`${SI}/hubspot.svg`} alt="HubSpot" width="24" height="24" /> },
        { name: 'Supabase', category: 'Database', icon: <img src={`${SI}/supabase.svg`} alt="Supabase" width="24" height="24" /> },
        { name: 'Stripe', category: 'Payment', icon: <img src={`${SI}/stripe.svg`} alt="Stripe" width="24" height="24" /> },
        { name: 'Dropbox', category: 'Storage', icon: <img src={`${SI}/dropbox.svg`} alt="Dropbox" width="24" height="24" /> },
    ];

    const modelTabs = [
        { id: 'openanalyst', label: 'OpenAnalyst' },
        { id: 'openai', label: 'OpenAI' },
        { id: 'claude4', label: 'Claude 4' },
        { id: 'claude3', label: 'Claude 3' },
        { id: 'deepseek', label: 'DeepSeek' },
        { id: 'qwen', label: 'Qwen' },
    ];

    const displayedIntegrations = showAllIntegrations ? allIntegrations : allIntegrations.slice(0, 12);

    return (
        <section ref={containerRef} className="py-24 lg:py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10 max-w-7xl">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <svg className="w-5 h-5 text-brand-primary" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                        <span className="text-brand-primary font-mono text-sm tracking-wider">/PRICING</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Choose the plan that fits your needs. All plans include access to our powerful AI analytics platform with flexible credit-based usage.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex items-center bg-gray-200 rounded-full p-1.5 border border-gray-300">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${billingCycle === 'monthly'
                                ? 'bg-black text-white shadow-lg'
                                : 'bg-transparent text-gray-600 hover:text-black'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('annual')}
                            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${billingCycle === 'annual'
                                ? 'bg-black text-white shadow-lg'
                                : 'bg-transparent text-gray-600 hover:text-black'
                                }`}
                        >
                            Annual
                            <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                -40%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Billing Info */}
                <p className="text-center text-sm text-gray-500 mb-8">
                    {billingCycle === 'annual'
                        ? 'Billed annually. Cancel anytime.'
                        : 'Billed monthly. Switch to annual and save 40%.'}
                </p>

                {/* Pricing Cards - All 5 in One Row */}
                <div className="flex gap-4 mb-24 overflow-x-auto pb-4 px-4 -mx-4 lg:overflow-visible lg:px-0 lg:mx-0 lg:justify-center">
                    {plans.map((plan, index) => (
                        <a
                            key={plan.name}
                            href={plan.href}
                            style={plan.featured ? { backgroundColor: '#000000' } : undefined}
                            className={`pricing-card relative rounded-2xl overflow-hidden transition-all duration-300 flex flex-col flex-shrink-0 w-[260px] lg:w-[220px] xl:w-[240px] cursor-pointer no-underline ${plan.featured
                                ? 'border-2 border-brand-primary shadow-2xl hover:shadow-[0_0_30px_rgba(255,133,82,0.3)]'
                                : 'bg-white border border-gray-200 hover:border-brand-primary shadow-sm hover:shadow-lg'
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.featured && (
                                <div className="absolute top-0 left-0 right-0 bg-brand-primary text-xs font-bold py-1.5 text-center uppercase tracking-wider" style={{ color: '#ffffff' }}>
                                    Most Popular
                                </div>
                            )}

                            {/* Card Content */}
                            <div className={`p-5 flex-1 flex flex-col ${plan.featured ? 'pt-9' : ''}`}>
                                {/* Plan Number */}
                                <span
                                    className="text-xs font-mono mb-1"
                                    style={{ color: plan.featured ? '#ff8552' : '#9ca3af' }}
                                >
                                    0{index + 1}
                                </span>

                                {/* Plan Name */}
                                <h3
                                    className="text-lg font-bold mb-1"
                                    style={{ color: plan.featured ? '#ffffff' : '#000000' }}
                                >
                                    {plan.name}
                                </h3>

                                {/* Tagline */}
                                <p
                                    className="text-xs mb-4"
                                    style={{ color: plan.featured ? '#9ca3af' : '#6b7280' }}
                                >
                                    {plan.tagline}
                                </p>

                                {/* Price */}
                                <div className="mb-1">
                                    <span
                                        className="text-3xl font-bold transition-all duration-300"
                                        style={{ color: plan.featured ? '#ffffff' : '#000000' }}
                                    >
                                        {getPrice(plan)}
                                    </span>
                                    {plan.monthlyPrice !== null && (
                                        <span
                                            className="text-sm"
                                            style={{ color: plan.featured ? '#9ca3af' : '#6b7280' }}
                                        >
                                            /mo
                                        </span>
                                    )}
                                </div>

                                {/* Original price for annual */}
                                {billingCycle === 'annual' && plan.monthlyPrice !== null && plan.monthlyPrice > 0 ? (
                                    <p className="text-xs mb-3" style={{ color: plan.featured ? '#6b7280' : '#9ca3af' }}>
                                        <span className="line-through">${plan.monthlyPrice}/mo</span>
                                        <span className="ml-1 font-semibold" style={{ color: '#22c55e' }}>Save ${(plan.monthlyPrice - plan.annualPrice) * 12}/yr</span>
                                    </p>
                                ) : (
                                    <div className="mb-3 h-4"></div>
                                )}

                                {/* Credits */}
                                <div
                                    className="text-xs mb-4 flex items-center gap-1.5 flex-wrap"
                                    style={{ color: plan.featured ? '#d1d5db' : '#4b5563' }}
                                >
                                    <svg className="w-3.5 h-3.5" style={{ color: '#ff8552' }} viewBox="0 0 24 24" fill="currentColor">
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                    <span className="font-semibold">{plan.credits}</span>
                                    <span>{plan.creditsLabel}</span>
                                    {plan.bonus && (
                                        <span className="text-xs px-1.5 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' }}>
                                            +{plan.bonus}
                                        </span>
                                    )}
                                </div>

                                {/* Features */}
                                <ul className="space-y-2 mb-4 flex-1">
                                    {plan.features.slice(0, 5).map((feature, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-1.5 text-xs"
                                            style={{ color: plan.featured ? '#d1d5db' : '#4b5563' }}
                                        >
                                            <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#ff8552' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                    {plan.features.length > 5 && (
                                        <li className="text-xs" style={{ color: plan.featured ? '#9ca3af' : '#6b7280' }}>
                                            +{plan.features.length - 5} more features
                                        </li>
                                    )}
                                </ul>

                                {/* CTA Button */}
                                <Button
                                    href={plan.href}
                                    variant={plan.featured ? 'fill' : 'stroke'}
                                    className={`w-full justify-center text-sm ${!plan.featured ? '!border-gray-300 !text-black hover:!bg-gray-50' : ''}`}
                                >
                                    {plan.cta}
                                </Button>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Credit Info Banner */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 mb-24 border border-gray-200">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-brand-primary rounded-2xl flex items-center justify-center shadow-lg">
                                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-black text-lg">1 credit = $0.01</h4>
                                <p className="text-gray-600">Transparent pricing with no hidden fees</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl border border-gray-200">
                            <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold text-black">14-day money-back guarantee</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Credit Usage Section */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <svg className="w-5 h-5 text-brand-primary" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <span className="text-brand-primary font-mono text-sm tracking-wider">/CREDIT USAGE</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">
                            LLM Model Pricing
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Use your credits flexibly across different AI models. Choose the right model for your task.
                        </p>
                    </div>

                    {/* Model Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {modelTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveModelTab(tab.id)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeModelTab === tab.id
                                    ? 'bg-black text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Model Table */}
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden max-w-4xl mx-auto shadow-sm">
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                            <h4 className="font-bold text-black">{llmModels[activeModelTab as keyof typeof llmModels].title}</h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/50">
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Model</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Input Tokens</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Output Tokens</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {llmModels[activeModelTab as keyof typeof llmModels].models.map((model, index) => (
                                        <tr key={index} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="font-medium text-black">{model.name}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-sm font-mono ${(model as { isFree?: boolean }).isFree ? 'text-green-600 font-bold' : 'text-gray-600'}`}>
                                                    {model.inputCredits}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-sm font-mono ${(model as { isFree?: boolean }).isFree ? 'text-green-600 font-bold' : 'text-gray-600'}`}>
                                                    {model.outputCredits}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* API Integrations Section - New Design */}
                <div>
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <svg className="w-5 h-5 text-brand-primary" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <span className="text-brand-primary font-mono text-sm tracking-wider">/INTEGRATIONS</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">
                            Powerful Integrations
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Connect with your favorite tools and services seamlessly. All integrations included with Pro and above.
                        </p>
                    </div>

                    {/* Integration Count Badge */}
                    <div className="flex justify-center mb-10">
                        <div className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full">
                            <svg className="w-5 h-5 text-brand-primary" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <span className="font-semibold">24 Total Integrations</span>
                        </div>
                    </div>

                    {/* Integrations Grid - New Design */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {displayedIntegrations.map((integration, index) => (
                            <div
                                key={index}
                                className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-brand-primary hover:shadow-lg transition-all duration-300 cursor-pointer"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 bg-gray-100 group-hover:bg-brand-primary/10 rounded-xl flex items-center justify-center mb-3 transition-colors">
                                        {integration.icon}
                                    </div>
                                    <h4 className="font-semibold text-black text-sm mb-1">{integration.name}</h4>
                                    <span className="text-xs text-gray-400 uppercase tracking-wider">{integration.category}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Show More/Less Button */}
                    {allIntegrations.length > 12 && (
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={() => setShowAllIntegrations(!showAllIntegrations)}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-black font-medium rounded-full transition-all duration-300"
                            >
                                {showAllIntegrations ? (
                                    <>
                                        Show Less
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M18 15l-6-6-6 6" />
                                        </svg>
                                    </>
                                ) : (
                                    <>
                                        Show All {allIntegrations.length} Integrations
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Bottom CTA */}
                <div className="mt-24 text-center">
                    <div className="bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a1008] rounded-3xl p-12 md:p-20 relative overflow-hidden border border-white/[0.06]">
                        {/* Background decorations */}
                        <div className="absolute top-[-80px] right-[-80px] w-[300px] h-[300px] bg-brand-primary/15 rounded-full blur-[100px]"></div>
                        <div className="absolute bottom-[-60px] left-[-60px] w-[250px] h-[250px] bg-brand-primary/10 rounded-full blur-[80px]"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-primary/[0.04] rounded-full blur-[120px]"></div>

                        <div className="relative z-10">
                            <span className="inline-block text-brand-primary text-[11px] font-semibold uppercase tracking-[0.25em] mb-5">Get Started Today</span>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-[1.1]">
                                Ready to get started?
                            </h3>
                            <p className="text-gray-400 mb-10 max-w-lg mx-auto text-base md:text-lg leading-relaxed">
                                Join thousands of users already using OpenAnalyst to unlock deeper insights with AI.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button href="/waitlist" variant="fill" className="!bg-brand-primary !border-brand-primary !px-8 !py-3.5 !text-sm !font-semibold !tracking-wider">
                                    JOIN WAITLIST
                                </Button>
                                <Button href="/contact" variant="stroke" className="!border-white/20 !text-white hover:!bg-white/10 !px-8 !py-3.5 !text-sm !font-semibold !tracking-wider backdrop-blur-sm">
                                    CONTACT SALES
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
