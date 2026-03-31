'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const WORDS = ['Campaigns', 'Analytics', 'Content', 'Ads', 'SEO'];
const WORD_COLORS: Record<string, string> = {
    Campaigns: '#FF6B00',
    Analytics: '#8B5CF6',
    Content: '#10B981',
    Ads: '#3B82F6',
    SEO: '#F59E0B',
};

/* ═══════════════════════════════════════════════
   WebGL Shader Background — Animated cosmic flow
   ═══════════════════════════════════════════════ */

const SHADER_SOURCE = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform vec2 touch;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}

float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) { t+=a*noise(p); p*=2.*m; a*=.5; }
  return t;
}

float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a); d=a; p*=2./(i+1.);
  }
  return t;
}

void main(void) {
  vec2 uv=(FC-.5*R)/MN, st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
  }
  O=vec4(col,1);
}`;

const VERTEX_SOURCE = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

function ShaderBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const gl = canvas.getContext('webgl2');
        if (!gl) return;

        const dpr = Math.max(1, 0.5 * window.devicePixelRatio);

        const resize = () => {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        resize();

        // Compile shaders
        const vs = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vs, VERTEX_SOURCE);
        gl.compileShader(vs);

        const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fs, SHADER_SOURCE);
        gl.compileShader(fs);

        if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
            console.error('Shader error:', gl.getShaderInfoLog(fs));
            return;
        }

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

        const position = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

        const resolutionLoc = gl.getUniformLocation(program, 'resolution');
        const timeLoc = gl.getUniformLocation(program, 'time');
        const touchLoc = gl.getUniformLocation(program, 'touch');

        let mouseX = 0, mouseY = 0;
        const handleMouse = (e: MouseEvent) => {
            mouseX = e.clientX * dpr;
            mouseY = canvas.height - e.clientY * dpr;
        };
        canvas.addEventListener('mousemove', handleMouse);

        const render = (now: number) => {
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(program);
            gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
            gl.uniform1f(timeLoc, now * 0.001);
            gl.uniform2f(touchLoc, mouseX, mouseY);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            rafRef.current = requestAnimationFrame(render);
        };

        rafRef.current = requestAnimationFrame(render);
        window.addEventListener('resize', resize);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouse);
            gl.deleteProgram(program);
            gl.deleteShader(vs);
            gl.deleteShader(fs);
        };
    }, []);

    return (
        <canvas ref={canvasRef} style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            touchAction: 'none',
        }} />
    );
}

/* ── Cycling word with color ── */
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
        <span style={{ position: 'relative', display: 'inline-block' }}>
            <span ref={wordRef} style={{ display: 'inline-block', color }}>{word}</span>
            <span style={{
                position: 'absolute', bottom: -4, left: 0, right: 0,
                height: 4, borderRadius: 2,
                background: `linear-gradient(90deg, ${color}, ${color}60)`,
            }} />
        </span>
    );
}

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo('.hero-word',
            { y: 80, opacity: 0, filter: 'blur(8px)', rotateX: 40 },
            { y: 0, opacity: 1, filter: 'blur(0px)', rotateX: 0, stagger: { each: 0.08, from: 'start' }, duration: 1, ease: 'power4.out' },
        0.5);

        tl.fromTo('.hero-cycling',
            { y: 40, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' },
        1.1);

        tl.fromTo('.hero-subtitle',
            { y: 20, opacity: 0, filter: 'blur(4px)' },
            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7 },
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
        <section id="hero-section" ref={heroRef} style={{
            position: 'relative', overflow: 'hidden',
            minHeight: '100vh', display: 'flex', alignItems: 'center',
            background: 'radial-gradient(ellipse at 50% 40%, #2a1a0a 0%, #0f0800 40%, #000000 100%)',
        }}>
            {/* WebGL Shader Background (renders on top of CSS fallback) */}
            <ShaderBackground />

            {/* Content overlay */}
            <div style={{
                position: 'relative', zIndex: 10,
                maxWidth: 900, margin: '0 auto',
                padding: '160px 24px 100px',
                textAlign: 'center',
            }}>
                {/* Headline */}
                <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(3rem, 7vw, 5rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.04em',
                    marginBottom: 8,
                    perspective: 1000,
                }}>
                    {['AI', 'agents', 'that', 'run'].map((word, i) => (
                        <span key={i} className="hero-word" style={{
                            display: 'inline-block', marginRight: '0.25em',
                            fontWeight: ['AI', 'agents'].includes(word) ? 800 : 400,
                            color: word === 'AI' ? '#FF6B00' : '#FAFAFA',
                        }}>{word}</span>
                    ))}
                    <br />
                    <span className="hero-word" style={{
                        display: 'inline-block', marginRight: '0.25em',
                        fontWeight: 400, color: '#FAFAFA',
                    }}>your</span>
                    <span className="hero-cycling" style={{ display: 'inline-block' }}>
                        <CyclingWord words={WORDS} />
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle" style={{
                    fontSize: 'clamp(16px, 1.8vw, 20px)',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.7,
                    maxWidth: 560, margin: '28px auto 40px',
                }}>
                    Autonomous agents that plan, create, and optimize your marketing
                    across every channel. Measurable results in days, not months.
                </p>

                {/* CTAs */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginBottom: 48 }}>
                    <a href="https://app.openanalyst.com" className="hero-cta" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '15px 32px', fontSize: 16, fontWeight: 600,
                        color: '#000', background: 'linear-gradient(135deg, #FF6B00, #F59E0B)',
                        borderRadius: 'var(--radius-full)', textDecoration: 'none',
                        transition: 'all 0.3s var(--ease-out)',
                        boxShadow: '0 4px 24px rgba(255,107,0,0.3)',
                    }}>
                        Start free trial
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                    <a href="#how-it-works" className="hero-cta" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '15px 32px', fontSize: 16, fontWeight: 500,
                        color: 'rgba(255,255,255,0.8)',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 'var(--radius-full)', textDecoration: 'none',
                        backdropFilter: 'blur(12px)',
                        transition: 'all 0.3s var(--ease-out)',
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16" fill="currentColor" stroke="none" /></svg>
                        See how it works
                    </a>
                </div>

                {/* Social proof */}
                <div className="hero-proof" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 16, fontSize: 14, color: 'rgba(255,255,255,0.5)',
                }}>
                    <div style={{ display: 'flex' }}>
                        {['Maren', 'Kael', 'Priya'].map((s, i) => (
                            <img key={s}
                                src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${s}&backgroundColor=${['ffd5dc', 'c0aede', 'b6e3f4'][i]}`}
                                alt="" width={32} height={32}
                                style={{
                                    width: 32, height: 32, borderRadius: '50%',
                                    border: '2px solid rgba(0,0,0,0.5)',
                                    marginLeft: i > 0 ? -10 : 0, zIndex: 3 - i,
                                    position: 'relative', background: '#222',
                                }}
                            />
                        ))}
                    </div>
                    <span><strong style={{ color: '#FAFAFA', fontWeight: 600 }}>2,400+</strong> teams</span>
                    <span style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        <strong style={{ color: '#FAFAFA', fontWeight: 600 }}>4.9</strong>/5
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
