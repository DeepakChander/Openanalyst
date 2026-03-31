'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const WORDS = ['Campaigns', 'Analytics', 'Content', 'Ads', 'SEO'];
const WORD_COLORS: Record<string, string> = {
    Campaigns: '#FF6B00', Analytics: '#8B5CF6', Content: '#10B981', Ads: '#3B82F6', SEO: '#F59E0B',
};

const defaultShaderSource = `#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 resolution;
uniform float time;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = p * 2.0 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec2 p = uv * 3.0;

  float t = time * 0.15;

  float n1 = fbm(p + vec2(t, t * 0.7));
  float n2 = fbm(p + vec2(n1 * 1.5 + t * 0.5, n1 * 1.2));
  float n3 = fbm(p + vec2(n2 * 1.3, n2 * 0.9 + t * 0.3));

  // Warm orange/amber color palette
  vec3 c1 = vec3(0.12, 0.04, 0.0);   // deep brown
  vec3 c2 = vec3(0.4, 0.15, 0.02);   // warm brown
  vec3 c3 = vec3(0.8, 0.35, 0.05);   // orange
  vec3 c4 = vec3(1.0, 0.6, 0.1);     // bright amber

  vec3 col = mix(c1, c2, n1);
  col = mix(col, c3, n2 * 0.6);
  col = mix(col, c4, n3 * 0.3);

  // Add subtle light streaks
  float streak = pow(n3, 3.0) * 1.5;
  col += vec3(streak * 0.8, streak * 0.4, streak * 0.1);

  // Vignette
  float vig = 1.0 - length((uv - 0.5) * 1.5);
  col *= smoothstep(0.0, 0.7, vig);

  fragColor = vec4(col, 1.0);
}`;

const vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

/* ═══ Full WebGL Shader Background — exact reference implementation ═══ */
function ShaderCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const gl = canvas.getContext('webgl2');
        if (!gl) return;

        let dpr = Math.max(1, 0.5 * window.devicePixelRatio);
        let mouseCoords = [0, 0];
        let mouseMove = [0, 0];
        let active = false;

        // Resize
        const resize = () => {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        resize();

        // Compile shader
        const compile = (type: number, source: string) => {
            const shader = gl.createShader(type)!;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Shader error:', gl.getShaderInfoLog(shader));
            }
            return shader;
        };

        const vs = compile(gl.VERTEX_SHADER, vertexSrc);
        const fs = compile(gl.FRAGMENT_SHADER, defaultShaderSource);

        const program = gl.createProgram()!;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program error:', gl.getProgramInfoLog(program));
            return;
        }

        // Buffer
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);

        const posAttr = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(posAttr);
        gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

        const uResolution = gl.getUniformLocation(program, 'resolution');
        const uTime = gl.getUniformLocation(program, 'time');

        // Pointer events
        const mapCoords = (x: number, y: number): [number, number] => [x * dpr, canvas.height - y * dpr];

        canvas.addEventListener('pointerdown', (e) => {
            active = true;
            mouseCoords = mapCoords(e.clientX, e.clientY);
        });
        canvas.addEventListener('pointerup', () => { active = false; });
        canvas.addEventListener('pointerleave', () => { active = false; });
        canvas.addEventListener('pointermove', (e) => {
            if (active) {
                mouseCoords = mapCoords(e.clientX, e.clientY);
                mouseMove = [mouseMove[0] + e.movementX, mouseMove[1] + e.movementY];
            }
        });

        // Render loop
        const render = (now: number) => {
            if (gl.isContextLost()) return;
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(program);
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.uniform2f(uResolution, canvas.width, canvas.height);
            gl.uniform1f(uTime, now * 1e-3);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            rafRef.current = requestAnimationFrame(render);
        };

        rafRef.current = requestAnimationFrame(render);
        window.addEventListener('resize', resize);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
            gl.deleteProgram(program);
            gl.deleteShader(vs);
            gl.deleteShader(fs);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ touchAction: 'none' }} />;
}

/* ── Cycling word ── */
function CyclingWord({ words }: { words: string[] }) {
    const [index, setIndex] = useState(0);
    const wordRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!wordRef.current) return;
            gsap.to(wordRef.current, {
                y: -16, opacity: 0, filter: 'blur(6px)', duration: 0.35, ease: 'power2.in',
                onComplete: () => {
                    setIndex(prev => (prev + 1) % words.length);
                    if (wordRef.current) {
                        gsap.fromTo(wordRef.current,
                            { y: 16, opacity: 0, filter: 'blur(6px)' },
                            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.45, ease: 'power2.out' }
                        );
                    }
                }
            });
        }, 2800);
        return () => clearInterval(interval);
    }, [words]);

    const word = words[index];
    const color = WORD_COLORS[word] || '#FF6B00';

    return (
        <span className="relative inline-block">
            <span ref={wordRef} className="inline-block" style={{ color }}>{word}</span>
            <span className="absolute bottom-[-4px] left-0 right-0 h-1 rounded-sm" style={{ background: `linear-gradient(90deg, ${color}, ${color}60)` }} />
        </span>
    );
}

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const tl = gsap.timeline();

        tl.fromTo('.hero-word',
            { y: 80, opacity: 0, filter: 'blur(8px)' },
            { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.08, duration: 1, ease: 'power4.out' },
        0.5);
        tl.fromTo('.hero-cycling',
            { y: 40, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' },
        1.1);
        tl.fromTo('.hero-subtitle',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 },
        1.4);
        tl.fromTo('.hero-cta',
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
        1.7);
        tl.fromTo('.hero-proof',
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
        2.0);
    }, { scope: heroRef });

    return (
        <section id="hero-section" ref={heroRef} className="relative overflow-hidden min-h-screen flex items-center bg-black">
            {/* Shader background */}
            <ShaderCanvas />

            {/* Content */}
            <div className="relative z-10 max-w-[900px] mx-auto px-6 py-40 text-center">
                {/* Trust badge */}
                <div className="mb-8 hero-cta">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500/10 backdrop-blur-md border border-orange-300/20 rounded-full text-sm">
                        <span className="text-amber-300">✨</span>
                        <span className="text-orange-200/90 font-medium">Trusted by 2,400+ marketing teams</span>
                    </div>
                </div>

                {/* Headline */}
                <h1 className="font-heading leading-[1.05] tracking-[-0.04em] mb-2" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 7vw, 5rem)' }}>
                    {['AI', 'agents', 'that', 'run'].map((word, i) => (
                        <span key={i} className="hero-word inline-block mr-[0.25em]" style={{
                            fontWeight: ['AI', 'agents'].includes(word) ? 800 : 400,
                            color: word === 'AI' ? '#FF6B00' : '#FAFAFA',
                        }}>{word}</span>
                    ))}
                    <br />
                    <span className="hero-word inline-block mr-[0.25em]" style={{ fontWeight: 400, color: '#FAFAFA' }}>your</span>
                    <span className="hero-cycling inline-block">
                        <CyclingWord words={WORDS} />
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle text-orange-100/70 leading-relaxed max-w-[560px] mx-auto mt-7 mb-10" style={{ fontSize: 'clamp(16px, 1.8vw, 20px)' }}>
                    Autonomous agents that plan, create, and optimize your marketing across every channel. Measurable results in days.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <a href="https://app.openanalyst.com" className="hero-cta px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 no-underline inline-flex items-center gap-2">
                        Start free trial
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                    <a href="#how-it-works" className="hero-cta px-8 py-4 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-300/20 hover:border-orange-300/40 text-orange-100 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm no-underline inline-flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16" fill="currentColor" stroke="none" /></svg>
                        See how it works
                    </a>
                </div>

                {/* Social proof */}
                <div className="hero-proof flex items-center justify-center gap-4 text-sm text-white/40">
                    <div className="flex">
                        {['Maren', 'Kael', 'Priya'].map((s, i) => (
                            <img key={s} src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${s}&backgroundColor=${['ffd5dc', 'c0aede', 'b6e3f4'][i]}`}
                                alt="" width={32} height={32}
                                className="rounded-full border-2 border-black/50 relative" style={{ width: 32, height: 32, marginLeft: i > 0 ? -10 : 0, zIndex: 3 - i, background: '#222' }}
                            />
                        ))}
                    </div>
                    <span><strong className="text-white font-semibold">2,400+</strong> teams</span>
                    <span className="w-px h-4 bg-white/15" />
                    <span className="flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        <strong className="text-white font-semibold">4.9</strong>/5
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
