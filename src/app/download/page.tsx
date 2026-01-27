import { Header, Footer } from '@/components';

export default function DownloadPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header />
            <main className="flex-1 pt-32 pb-20 container mx-auto px-4 text-center">
                {/* Hero Section */}
                <div className="mb-4">
                    <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300 mb-6">
                        Desktop Application
                    </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
                    Download <span style={{ color: '#22c55e' }}>OpenAnalyst</span>
                </h1>
                <p className="text-xl text-gray-400 mb-4 max-w-2xl mx-auto">
                    Your AI-powered analytics companion. Connect your data sources,
                    ask questions in plain English, and get instant insights.
                </p>
                <p className="text-sm text-gray-500 mb-12">
                    Available for macOS and Windows • Free to get started
                </p>

                {/* Download Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
                    {/* macOS Download Button */}
                    <a
                        href="https://openanalyst-releases.s3.amazonaws.com/latest/OpenAnalyst-mac-arm64.dmg.zip"
                        className="group relative px-8 py-5 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-4 min-w-[280px] shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        {/* Apple Logo */}
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.71-3.06 1.58-.69.8-1.27 2.07-1.12 3.16 1.17.09 2.38-.79 3.11-1.63z" />
                        </svg>
                        <div className="text-left">
                            <div className="text-xs text-gray-500 font-normal">Download for</div>
                            <div className="text-lg">macOS</div>
                        </div>
                        <svg className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </a>

                    {/* Windows Download Button */}
                    <a
                        href="https://openanalyst-releases.s3.amazonaws.com/latest/OpenAnalyst-win-x64.zip"
                        className="group relative px-8 py-5 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-4 min-w-[280px] hover:scale-105"
                    >
                        {/* Windows Logo */}
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M0 3.449L9.75 2.134v9.3L0 11.6V3.449zm10.649-1.6l13.353-1.854v11.3l-13.353.07V1.849zm0 20.306l13.353 1.849v-11.17l-13.353.054v9.267zM0 20.556l9.75 1.309v-9.155L0 12.56v7.996z" />
                        </svg>
                        <div className="text-left">
                            <div className="text-xs text-gray-400 font-normal group-hover:text-gray-500">Download for</div>
                            <div className="text-lg">Windows</div>
                        </div>
                        <svg className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </a>
                </div>

                {/* System Requirements */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8">System Requirements</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* macOS Requirements */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left">
                            <div className="flex items-center gap-3 mb-4">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.71-3.06 1.58-.69.8-1.27 2.07-1.12 3.16 1.17.09 2.38-.79 3.11-1.63z" />
                                </svg>
                                <h3 className="text-lg font-semibold">macOS</h3>
                            </div>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li className="flex items-center gap-2">
                                    <span style={{ color: '#22c55e' }}>✓</span> macOS 11 (Big Sur) or later
                                </li>
                                <li className="flex items-center gap-2">
                                    <span style={{ color: '#22c55e' }}>✓</span> Apple Silicon (M1/M2/M3) or Intel
                                </li>
                                <li className="flex items-center gap-2">
                                    <span style={{ color: '#22c55e' }}>✓</span> 4 GB RAM minimum
                                </li>
                                <li className="flex items-center gap-2">
                                    <span style={{ color: '#22c55e' }}>✓</span> 500 MB disk space
                                </li>
                            </ul>
                        </div>

                        {/* Windows Requirements */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left">
                            <div className="flex items-center gap-3 mb-4">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M0 3.449L9.75 2.134v9.3L0 11.6V3.449zm10.649-1.6l13.353-1.854v11.3l-13.353.07V1.849zm0 20.306l13.353 1.849v-11.17l-13.353.054v9.267zM0 20.556l9.75 1.309v-9.155L0 12.56v7.996z" />
                                </svg>
                                <h3 className="text-lg font-semibold">Windows</h3>
                            </div>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li className="flex items-center gap-2">
                                    <span style={{ color: '#22c55e' }}>✓</span> Windows 10 (64-bit) or later
                                </li>
                                <li className="flex items-center gap-2">
                                    <span style={{ color: '#22c55e' }}>✓</span> x64 processor
                                </li>
                                <li className="flex items-center gap-2">
                                    <span style={{ color: '#22c55e' }}>✓</span> 4 GB RAM minimum
                                </li>
                                <li className="flex items-center gap-2">
                                    <span style={{ color: '#22c55e' }}>✓</span> 500 MB disk space
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-20 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8">What&apos;s Included</h2>
                    <div className="grid sm:grid-cols-3 gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}>
                                <svg className="w-6 h-6" style={{ color: '#22c55e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold mb-2">Instant Setup</h3>
                            <p className="text-sm text-gray-400">No complex configuration. Install and start analyzing in minutes.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}>
                                <svg className="w-6 h-6" style={{ color: '#22c55e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold mb-2">Secure & Private</h3>
                            <p className="text-sm text-gray-400">Your data stays on your machine. Enterprise-grade security.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}>
                                <svg className="w-6 h-6" style={{ color: '#22c55e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </div>
                            <h3 className="font-semibold mb-2">Auto Updates</h3>
                            <p className="text-sm text-gray-400">Always get the latest features with automatic updates.</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-20 p-8 rounded-2xl border border-white/10" style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(0, 0, 0, 0.5))' }}>
                    <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-gray-400 mb-6">Explore our pricing plans and find the perfect fit for your needs.</p>
                    <a
                        href="/pricing"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                        style={{ backgroundColor: '#22c55e', color: '#000000' }}
                    >
                        View Pricing
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </main>
            <Footer />
        </div>
    );
}
