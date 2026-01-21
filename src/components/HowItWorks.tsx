'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

// SVG Icons
const FolderIcon = ({ open = false }: { open?: boolean }) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill={open ? "#fbbf24" : "#6b7280"}>
        {open ? <path d="M3 4a1 1 0 011-1h6l2 2h8a1 1 0 011 1v2H3V4zm0 4h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" /> : <path d="M3 4a1 1 0 011-1h6l2 2h8a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />}
    </svg>
);

const FileIcon = ({ type = 'ts' }: { type?: string }) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={type === 'ts' ? '#3b82f6' : '#6b7280'} strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
);

const PlayIcon = () => (<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>);
const PauseIcon = () => (<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>);
const VolumeIcon = ({ muted = false }: { muted?: boolean }) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {muted ? <><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M23 9l-6 6M17 9l6 6" /></> : <><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" /></>}
    </svg>
);
const ChartIcon = () => (<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>);
const DesktopIcon = () => (<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>);
const BrowserIcon = () => (<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>);
const MobileIcon = () => (<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>);
const MicIcon = () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" /></svg>);
const SendIcon = () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>);

// Sample queries and responses
const sampleQueries = ["Analyze competitor SEO strategies", "Top marketing trends 2024", "Best ad copy for tech"];
const thinkingSteps = ["Searching data sources...", "Analyzing patterns...", "Generating insights...", "Preparing response..."];
const dataSources = ['HubSpot', 'SEMrush', 'Moz', 'Neil Patel'];
const generateChartData = () => ({ keywords: [65, 78, 52, 89, 72, 94, 68], backlinks: [45, 52, 48, 61, 55, 67, 72], traffic: [120, 135, 142, 158, 165, 178, 195] });

const MAX_FREE_ANALYSES = 6;

const HowItWorks: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [query, setQuery] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [typedResponse, setTypedResponse] = useState('');
    const [currentThinkingStep, setCurrentThinkingStep] = useState(0);
    const [showThinking, setShowThinking] = useState(false);
    const [analysisCount, setAnalysisCount] = useState(0);
    const [showLimitModal, setShowLimitModal] = useState(false);
    const [activeTab, setActiveTab] = useState<'desktop' | 'web' | 'mobile'>('desktop');
    const [activeFile, setActiveFile] = useState('analysis.ts');
    const [isPlaying, setIsPlaying] = useState(false);
    const [voiceProgress, setVoiceProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [waveformBars] = useState(() => Array.from({ length: 30 }, () => Math.random() * 60 + 20));
    const [chartData, setChartData] = useState(generateChartData());
    const [showCharts, setShowCharts] = useState(false);
    const [audioDuration, setAudioDuration] = useState(0);
    const [hasTyped, setHasTyped] = useState(false);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Chat history for Claude-like view
    const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'ai', content: string, isVoice?: boolean }>>([
        { role: 'ai', content: 'Hello! I\'m OpenAnalyst. Ask me anything about marketing, SEO, or growth strategies.' }
    ]);

    // Voice synthesis
    const speakText = useCallback((text: string, startFromProgress = 0) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

            const startIndex = Math.floor((startFromProgress / 100) * text.length);
            const remainingText = text.slice(startIndex).replace(/[*→#•]/g, '');

            const utterance = new SpeechSynthesisUtterance(remainingText);
            utterance.rate = 1;
            utterance.volume = isMuted ? 0 : 1;

            const words = remainingText.split(' ').length;
            const estimatedDuration = (words / 150) * 60 * 1000;
            setAudioDuration(estimatedDuration);

            const startTime = Date.now();
            progressIntervalRef.current = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const progressFromStart = (elapsed / estimatedDuration) * (100 - startFromProgress);
                const totalProgress = Math.min(startFromProgress + progressFromStart, 100);
                setVoiceProgress(totalProgress);
                if (totalProgress >= 100) {
                    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
                    setIsPlaying(false);
                }
            }, 100);

            utterance.onend = () => {
                if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
                setVoiceProgress(100);
                setIsPlaying(false);
            };

            window.speechSynthesis.speak(utterance);
        }
    }, [isMuted]);

    const stopSpeaking = useCallback(() => {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }, []);

    const generateResponse = useCallback((userQuery: string) => {
        const q = userQuery.toLowerCase();
        if (q.includes('seo') || q.includes('competitor')) {
            return `Based on HubSpot, SEMrush, and Moz data:

Keyword Gap: Competitors rank for 2,400 keywords you're missing. Focus on long-tail opportunities.

Backlinks: Average competitor has 12K referring domains. Build quality backlinks through guest posting.

Content Strategy: Top performers publish 3-4 posts weekly.

Recommendations:
• Target 15-20 low-competition keywords monthly
• Build 50+ quality backlinks
• Improve page speed to under 2.5s LCP`;
        }
        if (q.includes('trend') || q.includes('2024')) {
            return `Marketing Trends 2024:

AI Personalization: 78% of marketers now use AI for campaign optimization.

Short-Form Video: TikTok/Reels drive 2.5x more engagement than static posts.

Zero-Party Data: 65% shifting from third-party cookies.

Key Insight: AI + authentic storytelling = 3.2x better ROI`;
        }
        return `Marketing Analysis Results:

CTR Benchmark: 2.4% industry average. Target 3%+.
Best Posting: Tuesday-Thursday, 9-11 AM.
Email Open Rates: 21.5% average.

Quick Wins:
• A/B test headlines (+15% improvement)
• Add interactive elements
• Exit-intent popups (10-15% recovery)`;
    }, []);

    gsap.registerPlugin(ScrollTrigger, useGSAP);

    useGSAP(() => {
        gsap.from('.ide-window', { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } });
    }, { scope: containerRef });

    // Thinking animation
    useEffect(() => {
        if (!showThinking) return;
        const interval = setInterval(() => {
            setCurrentThinkingStep(prev => {
                if (prev >= thinkingSteps.length - 1) {
                    clearInterval(interval);
                    setShowThinking(false);
                    setShowResults(true);
                    setShowCharts(true);
                    setChartData(generateChartData());

                    // Add AI response to chat
                    setChatMessages(prev => [...prev, { role: 'ai', content: generateResponse(query), isVoice: true }]);
                    return prev;
                }
                return prev + 1;
            });
        }, 400);
        return () => clearInterval(interval);
    }, [showThinking, query, generateResponse]);

    // Typing effect
    useEffect(() => {
        if (!showResults || hasTyped) return;
        const response = generateResponse(query);
        let index = 0;
        const interval = setInterval(() => {
            if (index <= response.length) {
                setTypedResponse(response.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
                setHasTyped(true);
            }
        }, 8);
        return () => clearInterval(interval);
    }, [showResults, query, generateResponse, hasTyped]);

    // Voice playback
    useEffect(() => {
        if (!showResults) return;
        if (isPlaying) speakText(generateResponse(query), voiceProgress);
        else stopSpeaking();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying]);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        if (analysisCount >= MAX_FREE_ANALYSES) { setShowLimitModal(true); return; }

        // Add user message to chat
        setChatMessages(prev => [...prev, { role: 'user', content: query }]);

        setIsAnalyzing(true);
        setShowResults(false);
        setShowCharts(false);
        setTypedResponse('');
        setCurrentThinkingStep(0);
        setIsPlaying(false);
        setVoiceProgress(0);
        setHasTyped(false);

        setTimeout(() => {
            setIsAnalyzing(false);
            setShowThinking(true);
            setAnalysisCount(prev => prev + 1);
        }, 800);
    }, [query, analysisCount]);

    const remainingAnalyses = MAX_FREE_ANALYSES - analysisCount;

    // Mini Chart
    const MiniChart = ({ data, color, label }: { data: number[], color: string, label: string }) => (
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-[10px] font-medium">{label}</span>
                <span className="text-xs font-medium" style={{ color }}>{data[data.length - 1]}</span>
            </div>
            <div className="flex items-end gap-1 h-12">
                {data.map((val, i) => (<div key={i} className="flex-1 rounded-sm transition-all" style={{ height: `${(val / Math.max(...data)) * 100}%`, backgroundColor: color, opacity: 0.8 }} />))}
            </div>
        </div>
    );

    // Voice Player Component
    const VoicePlayer = ({ compact = false }: { compact?: boolean }) => (
        <div className={`flex items-center gap-2 ${compact ? 'p-2' : 'p-3'} bg-white/5 rounded-lg border border-white/10`}>
            <button onClick={() => { if (isPlaying) setIsPlaying(false); else { if (voiceProgress >= 100) setVoiceProgress(0); setIsPlaying(true); } }} className={`${compact ? 'p-1.5' : 'p-2.5'} bg-brand-primary hover:bg-brand-primary/80 rounded-full text-white transition-colors`}>
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <div className="flex-1 relative h-6 flex items-center gap-[2px] cursor-pointer" onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); const newProgress = ((e.clientX - rect.left) / rect.width) * 100; setVoiceProgress(newProgress); if (isPlaying) speakText(generateResponse(query), newProgress); }}>
                {waveformBars.map((height, i) => { const barProgress = (i / waveformBars.length) * 100; return (<div key={i} className={`flex-1 rounded-full transition-all ${barProgress <= voiceProgress ? 'bg-brand-primary' : 'bg-gray-600'}`} style={{ height: `${(isPlaying ? height : height * 0.6) * (compact ? 0.5 : 1)}px` }} />); })}
            </div>
            <button onClick={() => setIsMuted(!isMuted)} className="p-1.5 hover:bg-white/10 rounded text-gray-400"><VolumeIcon muted={isMuted} /></button>
            <span className="text-gray-500 text-[10px] font-mono w-6">{audioDuration > 0 ? `${Math.ceil((audioDuration / 1000) * (1 - voiceProgress / 100))}s` : '0s'}</span>
        </div>
    );

    // ================== DESKTOP IDE VIEW ==================
    const DesktopIDEView = () => (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            {/* Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-black/5" />
                        <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-black/5" />
                        <div className="w-3 h-3 rounded-full bg-[#28c840] border border-black/5" />
                    </div>
                    <span className="text-gray-600 text-xs font-mono">OpenAnalyst — Desktop IDE</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-medium flex items-center gap-1.5 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Connected
                    </span>
                    <span className="text-gray-500 text-xs">{remainingAnalyses} left</span>
                </div>
            </div>

            {/* IDE Content */}
            <div className="grid grid-cols-[180px_1fr_240px] h-[50vh] min-h-[360px]">
                {/* Sidebar */}
                <div className="bg-gray-50 border-r border-gray-200 p-3 text-xs font-mono overflow-auto">
                    <div className="text-gray-500 uppercase text-[10px] mb-2 tracking-widest font-semibold">Explorer</div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-700 py-1.5 px-2 rounded-lg bg-white shadow-sm border border-gray-100"><FolderIcon open /> marketing-analysis</div>
                        <div className="pl-3 space-y-0.5">
                            {['src', 'data-sources'].map(f => (<div key={f} className="flex items-center gap-2 text-gray-500 py-1 px-2 rounded hover:bg-gray-100 cursor-pointer"><FolderIcon /> {f}</div>))}
                            <div className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer ${activeFile === 'analysis.ts' ? 'text-gray-900 bg-brand-primary/10 border-l-2 border-brand-primary' : 'text-gray-500 hover:bg-gray-100'}`} onClick={() => setActiveFile('analysis.ts')}><FileIcon type="ts" /> analysis.ts</div>
                            <div className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer ${activeFile === 'config.json' ? 'text-gray-900 bg-brand-primary/10 border-l-2 border-brand-primary' : 'text-gray-500 hover:bg-gray-100'}`} onClick={() => setActiveFile('config.json')}><FileIcon type="json" /> config.json</div>
                        </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-200">
                        <div className="text-gray-500 uppercase text-[10px] mb-2 tracking-widest font-semibold">Sources</div>
                        {dataSources.map((src, i) => (<div key={i} className="flex items-center gap-2 text-emerald-600 text-[11px] py-0.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{src}</div>))}
                    </div>
                </div>

                {/* Editor */}
                <div className="bg-white flex flex-col">
                    <div className="flex items-center bg-gray-50 border-b border-gray-200">
                        <div className="px-4 py-2 bg-white text-gray-800 text-xs border-t-2 border-t-brand-primary flex items-center gap-2 border-r border-gray-200"><span className="text-blue-600">TS</span> analysis.ts</div>
                    </div>
                    <div className="flex-1 p-4 overflow-auto font-mono text-sm">
                        <div className="mb-4">
                            <div className="text-gray-400 text-xs mb-2"><span className="text-purple-500">//</span> Ask OpenAnalyst</div>
                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Generate marketing analysis..." className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 text-xs focus:border-brand-primary focus:outline-none placeholder:text-gray-400" />
                                <button type="submit" disabled={isAnalyzing || !query.trim()} className="px-4 py-2 bg-gradient-to-r from-brand-primary to-orange-500 disabled:from-gray-300 disabled:to-gray-400 text-white text-xs rounded-lg font-medium flex items-center gap-2"><PlayIcon /> Run</button>
                            </form>
                            <div className="flex gap-2 mt-2">{sampleQueries.map((q, i) => (<button key={i} onClick={() => setQuery(q)} className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-[10px] rounded transition-all">{q}</button>))}</div>
                        </div>
                        {showResults && (
                            <div className={`flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200`}>
                                <button onClick={() => { if (isPlaying) setIsPlaying(false); else { if (voiceProgress >= 100) setVoiceProgress(0); setIsPlaying(true); } }} className={`p-2.5 bg-brand-primary hover:bg-brand-primary/80 rounded-full text-white transition-colors`}>
                                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                                </button>
                                <div className="flex-1 relative h-6 flex items-center gap-[2px] cursor-pointer" onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); const newProgress = ((e.clientX - rect.left) / rect.width) * 100; setVoiceProgress(newProgress); if (isPlaying) speakText(generateResponse(query), newProgress); }}>
                                    {waveformBars.map((height, i) => { const barProgress = (i / waveformBars.length) * 100; return (<div key={i} className={`flex-1 rounded-full transition-all ${barProgress <= voiceProgress ? 'bg-brand-primary' : 'bg-gray-300'}`} style={{ height: `${(isPlaying ? height : height * 0.6) + 'px'}` }} />); })}
                                </div>
                                <button onClick={() => setIsMuted(!isMuted)} className="p-1.5 hover:bg-gray-200 rounded text-gray-500"><VolumeIcon muted={isMuted} /></button>
                                <span className="text-gray-500 text-[10px] font-mono w-6">{audioDuration > 0 ? `${Math.ceil((audioDuration / 1000) * (1 - voiceProgress / 100))}s` : '0s'}</span>
                            </div>
                        )}
                        {(showThinking || isAnalyzing) && (<div className="text-amber-600 text-xs space-y-1 my-3 p-2 bg-amber-50 rounded border border-amber-100">{thinkingSteps.slice(0, currentThinkingStep + 1).map((step, i) => (<div key={i} className={i === currentThinkingStep ? 'text-amber-700 font-medium' : 'text-gray-500'}>• {step}</div>))}</div>)}
                        {showResults && (<pre className="text-gray-800 text-xs whitespace-pre-wrap mt-3">{typedResponse}<span className="animate-pulse text-brand-primary">|</span></pre>)}
                        {!showResults && !showThinking && !isAnalyzing && (<div className="text-gray-400 text-xs mt-2">// Type a question or select a sample query</div>)}
                    </div>
                </div>

                {/* Right Panel */}
                <div className="bg-gray-50 border-l border-gray-200 flex flex-col">
                    <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 flex items-center gap-2"><ChartIcon /> <span className="text-gray-600 text-xs">Analytics</span></div>
                    <div className="flex-1 p-2 overflow-auto">
                        {showCharts ? (<div className="space-y-2">
                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-500 text-[10px] font-medium">Keywords</span>
                                    <span className="text-xs font-medium text-[#10b981]">{chartData.keywords[chartData.keywords.length - 1]}</span>
                                </div>
                                <div className="flex items-end gap-1 h-12">
                                    {chartData.keywords.map((val, i) => (<div key={i} className="flex-1 rounded-sm transition-all bg-[#10b981]" style={{ height: `${(val / Math.max(...chartData.keywords)) * 100}%`, opacity: 0.8 }} />))}
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-500 text-[10px] font-medium">Backlinks</span>
                                    <span className="text-xs font-medium text-[#3b82f6]">{chartData.backlinks[chartData.backlinks.length - 1]}</span>
                                </div>
                                <div className="flex items-end gap-1 h-12">
                                    {chartData.backlinks.map((val, i) => (<div key={i} className="flex-1 rounded-sm transition-all bg-[#3b82f6]" style={{ height: `${(val / Math.max(...chartData.backlinks)) * 100}%`, opacity: 0.8 }} />))}
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-500 text-[10px] font-medium">Traffic</span>
                                    <span className="text-xs font-medium text-[#f59e0b]">{chartData.traffic[chartData.traffic.length - 1]}</span>
                                </div>
                                <div className="flex items-end gap-1 h-12">
                                    {chartData.traffic.map((val, i) => (<div key={i} className="flex-1 rounded-sm transition-all bg-[#f59e0b]" style={{ height: `${(val / Math.max(...chartData.traffic)) * 100}%`, opacity: 0.8 }} />))}
                                </div>
                            </div>
                        </div>) : (<div className="h-full flex items-center justify-center text-gray-400 text-xs text-center p-4">Run analysis to see charts</div>)}
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <div className="bg-gray-100 border-t border-gray-200 px-4 py-1.5 flex items-center gap-4 text-[10px] font-mono">
                <span className="text-gray-500">TERMINAL</span>
                <span className="text-gray-400">|</span>
                <span className="text-emerald-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{remainingAnalyses} remaining</span>
                <Link href="/pricing" className="ml-auto text-brand-primary hover:text-orange-600 font-medium">Upgrade →</Link>
            </div>
        </div>
    );

    // ================== WEB IDE VIEW (Claude-like) ==================
    const WebIDEView = () => (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-orange-500 flex items-center justify-center text-white font-bold text-sm">O</div>
                    <span className="text-gray-800 font-medium">OpenAnalyst</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] rounded-full font-medium">Pro</span>
                </div>
                <span className="text-gray-400 text-xs">{remainingAnalyses} queries left</span>
            </div>

            {/* Chat Area */}
            <div className="h-[46vh] min-h-[320px] overflow-auto bg-gray-50 p-4 space-y-4">
                {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-brand-primary text-white rounded-br-md shadow-md' : 'bg-white text-gray-700 border border-gray-200 rounded-bl-md shadow-sm'}`}>
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            {msg.role === 'ai' && msg.isVoice && (
                                <div className="mt-2 pt-2 border-t border-gray-100">
                                    <div className={`flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100`}>
                                        <button onClick={() => { if (isPlaying) setIsPlaying(false); else { if (voiceProgress >= 100) setVoiceProgress(0); setIsPlaying(true); } }} className={`p-1.5 bg-brand-primary hover:bg-brand-primary/80 rounded-full text-white transition-colors`}>
                                            {isPlaying ? <PauseIcon /> : <PlayIcon />}
                                        </button>
                                        <div className="flex-1 relative h-6 flex items-center gap-[2px] cursor-pointer" onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); const newProgress = ((e.clientX - rect.left) / rect.width) * 100; setVoiceProgress(newProgress); if (isPlaying) speakText(generateResponse(query), newProgress); }}>
                                            {waveformBars.map((height, i) => { const barProgress = (i / waveformBars.length) * 100; return (<div key={i} className={`flex-1 rounded-full transition-all ${barProgress <= voiceProgress ? 'bg-brand-primary' : 'bg-gray-300'}`} style={{ height: `${(isPlaying ? height : height * 0.6) * 0.5}px` }} />); })}
                                        </div>
                                        <button onClick={() => setIsMuted(!isMuted)} className="p-1.5 hover:bg-gray-200 rounded text-gray-400"><VolumeIcon muted={isMuted} /></button>
                                        <span className="text-gray-500 text-[10px] font-mono w-6">{audioDuration > 0 ? `${Math.ceil((audioDuration / 1000) * (1 - voiceProgress / 100))}s` : '0s'}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {(showThinking || isAnalyzing) && (
                    <div className="flex justify-start">
                        <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-200">
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                                <span className="text-xs">{thinkingSteps[currentThinkingStep]}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask anything about marketing..." className="flex-1 bg-gray-100 border-0 rounded-full px-4 py-2.5 text-gray-800 text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none placeholder:text-gray-400" />
                    <button type="submit" disabled={isAnalyzing || !query.trim()} className="p-2.5 bg-brand-primary hover:bg-brand-primary/90 disabled:bg-gray-300 text-white rounded-full transition-colors"><SendIcon /></button>
                </form>
            </div>
        </div>
    );

    // ================== MOBILE APP VIEW (SMS-style) ==================
    const MobileAppView = () => (
        <div className="mx-auto" style={{ maxWidth: '320px' }}>
            {/* Phone Frame */}
            <div className="bg-gray-200 rounded-[2.5rem] p-2 shadow-2xl border border-white">
                <div className="bg-white rounded-[2rem] overflow-hidden relative border border-gray-100">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10" />

                    {/* Screen */}
                    <div className="bg-white min-h-[480px]">
                        {/* Header */}
                        <div className="pt-8 pb-3 px-4 flex items-center justify-between border-b border-gray-100 bg-white">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary to-orange-500 flex items-center justify-center text-white text-xs font-bold">OA</div>
                                <div>
                                    <div className="text-black text-sm font-medium">OpenAnalyst</div>
                                    <div className="text-emerald-500 text-[10px]">Online</div>
                                </div>
                            </div>
                            <div className="flex gap-3 text-gray-400">
                                <MicIcon />
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="h-[340px] overflow-auto p-3 space-y-3 bg-gray-50">
                            {chatMessages.slice(-4).map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] rounded-2xl px-3 py-2 ${msg.role === 'user' ? 'bg-brand-primary text-white rounded-br-sm' : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-sm'}`}>
                                        <p className="text-xs leading-relaxed">{msg.content.slice(0, 150)}{msg.content.length > 150 ? '...' : ''}</p>
                                        {msg.role === 'ai' && msg.isVoice && (
                                            <div className="mt-2 flex items-center gap-2">
                                                <button onClick={() => setIsPlaying(!isPlaying)} className="w-6 h-6 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">{isPlaying ? <PauseIcon /> : <PlayIcon />}</button>
                                                <div className="flex-1 h-3 flex items-center gap-[1px]">
                                                    {waveformBars.slice(0, 20).map((h, j) => (<div key={j} className={`flex-1 rounded-full ${(j / 20) * 100 <= voiceProgress ? 'bg-brand-primary' : 'bg-gray-300'}`} style={{ height: `${h * 0.3}px` }} />))}
                                                </div>
                                                <span className="text-[9px] text-gray-400">0:12</span>
                                            </div>
                                        )}
                                        <div className="text-[9px] text-right mt-1 opacity-60">{msg.role === 'user' ? '✓✓' : ''} 12:0{i}</div>
                                    </div>
                                </div>
                            ))}
                            {(showThinking || isAnalyzing) && (
                                <div className="flex justify-start">
                                    <div className="bg-white rounded-2xl rounded-bl-sm px-3 py-2 shadow-sm border border-gray-100">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Bar */}
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-white border-t border-gray-100">
                            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Message..." className="flex-1 bg-gray-100 border-0 rounded-full px-4 py-2 text-gray-800 text-xs focus:outline-none placeholder:text-gray-400" />
                                {query.trim() ? (
                                    <button type="submit" className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white"><SendIcon /></button>
                                ) : (
                                    <button type="button" className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white"><MicIcon /></button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Limit Modal */}
            {showLimitModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-xl">
                    <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-8 max-w-md mx-4 text-center shadow-lg border border-white/50">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center shadow-lg">
                            <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Limit Reached</h3>
                        <p className="text-gray-500 mb-6">You&apos;ve used all {MAX_FREE_ANALYSES} free analyses.</p>
                        <div className="flex gap-3 justify-center">
                            <button onClick={() => setShowLimitModal(false)} className="px-5 py-2.5 bg-white/60 border border-gray-200 text-gray-600 rounded-xl hover:bg-white text-sm font-medium">Later</button>
                            <Link href="/pricing" className="px-6 py-2.5 bg-gradient-to-r from-brand-primary to-orange-500 text-white rounded-xl font-semibold text-sm">View Pricing</Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Section */}
            <section ref={containerRef} className="hidden md:flex py-24 lg:py-32 min-h-screen relative flex-col items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)' }}>
                {/* Decorative */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-brand-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                </div>

                {/* Header */}
                <div className="relative z-10 text-center mb-8 px-4">
                    <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
                        One AI, <span className="bg-gradient-to-r from-brand-primary via-orange-500 to-red-500 bg-clip-text text-transparent">Every Platform</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">Desktop IDE, Web Interface, or Mobile App — seamless AI-powered marketing analysis everywhere.</p>
                </div>

                {/* CTA */}
                <Link href="/waitlist" className="relative z-10 mb-8 group">
                    <div className="px-7 py-3 bg-white/70 backdrop-blur-xl border border-white/80 rounded-full text-gray-800 font-medium text-sm shadow-md hover:shadow-lg hover:border-brand-primary/30 transition-all flex items-center gap-2">
                        Get started <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                </Link>

                {/* Platform Tabs */}
                <div className="relative z-10 flex items-center gap-1 mb-6 bg-white/50 backdrop-blur-xl rounded-full p-1.5 shadow-sm border border-white/60">
                    {[
                        { id: 'desktop', label: 'Desktop IDE', icon: <DesktopIcon /> },
                        { id: 'web', label: 'Web App', icon: <BrowserIcon /> },
                        { id: 'mobile', label: 'Mobile', icon: <MobileIcon /> }
                    ].map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id as 'desktop' | 'web' | 'mobile')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-white text-gray-900 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}>
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* IDE Window */}
                <div className="ide-window relative z-10 w-full max-w-6xl mx-auto px-4">
                    <div className="p-1 rounded-2xl bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.15)]">
                        {activeTab === 'desktop' && <DesktopIDEView />}
                        {activeTab === 'web' && <WebIDEView />}
                        {activeTab === 'mobile' && <MobileAppView />}
                    </div>
                </div>
            </section>

            {/* Mobile */}
            <section className="md:hidden py-24 bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center px-6 text-center">
                <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg"><DesktopIcon /></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Desktop Experience</h3>
                <p className="text-gray-500 text-sm max-w-xs">Visit on desktop to explore our multi-platform IDE demo.</p>
            </section>
        </>
    );
};

export default HowItWorks;
