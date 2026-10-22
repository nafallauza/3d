import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowDown, Sparkles, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicHero({ onOpenConsultation }) {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const telemetryRef = useRef(null);
  const framingRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Staggered entrance for headline masks
      tl.fromTo(
        '.hero-line-inner',
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.15, stagger: 0.16 },
        0.1
      );

      // Subtitle paragraph reveal
      tl.fromTo(
        subtextRef.current,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85 },
        0.4
      );

      // Primary CTA Buttons
      tl.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75 },
        0.55
      );

      // 3D Stage Framing Annotations
      tl.fromTo(
        framingRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.9 },
        0.5
      );

      // Bottom Architectural Metadata Bar Entrance
      tl.fromTo(
        telemetryRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85 },
        0.65
      );

      // Coordinated Spatial Scene Exit Transition into Manifesto
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom 30%',
          scrub: 0.8,
        },
      });

      // Headline and subtext lift upward with optical mask fade
      exitTl.to([headlineRef.current, subtextRef.current, ctaRef.current], {
        y: -80,
        opacity: 0,
        ease: 'power1.inOut',
      }, 0);

      // Bottom Metadata Bar slides downward out of view, clearing spatial corridor
      exitTl.to(telemetryRef.current, {
        y: 40,
        opacity: 0,
        ease: 'power1.inOut',
      }, 0);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between px-6 md:px-14 pt-32 pb-12 z-20 overflow-hidden select-none"
    >
      {/* Background Architectural Watermark */}
      <div className="absolute right-0 top-1/4 select-none pointer-events-none opacity-[0.03] font-serif text-[18vw] leading-none text-white font-bold tracking-tighter">
        TARA
      </div>

      {/* Main Hero Staging: Left Editorial Narrative + Right Dedicated 3D Corridor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 my-auto py-4">
        {/* Left Column: Monolithic Headline, Discipline Code, & Direct CTAs */}
        <div
          id="hero-editorial-column"
          className="lg:col-span-7 xl:col-span-6 space-y-6 select-none"
        >
          <div className="flex items-center space-x-3 font-mono text-[11px] text-[#0B70AD] tracking-[0.25em] uppercase font-semibold select-none">
            <span className="w-2 h-2 rounded-full bg-[#0B70AD] animate-pulse" />
            <span>[ DISIPLIN REKAYASA &bull; METODOLOGI TERUKUR ]</span>
          </div>

          {/* Monumental Editorial Headline with Overflow Line Masks */}
          <h1
            ref={headlineRef}
            className="font-serif text-4xl sm:text-6xl md:text-7xl xl:text-8xl tracking-tight leading-[1.08] select-none"
          >
            <div className="overflow-hidden pb-3 pt-1">
              <span className="hero-line-inner block text-white select-none">
                Presisi dalam Detail.
              </span>
            </div>
            <div className="overflow-hidden pb-4 pt-1">
              <span className="hero-line-inner block text-[#0B70AD] select-none">
                Inovasi dalam Rekayasa.
              </span>
            </div>
          </h1>

          <p
            ref={subtextRef}
            className="font-sans text-base md:text-lg text-white/75 max-w-xl font-light leading-relaxed pt-2 select-none"
          >
            Tara Rekayasa mengedepankan ketelitian kalkulasi, integritas struktur, dan kolaborasi metodologis dalam membangun pendekatan rekayasa yang terstruktur serta adaptif.
          </p>

          {/* Primary Action Buttons */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => onOpenConsultation()}
              className="flex items-center space-x-2 bg-[#0B70AD] hover:bg-white hover:text-[#070E1A] text-white px-6 py-3.5 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer font-bold border border-[#0B70AD] shadow-lg shadow-[#0B70AD]/25"
            >
              <span>[ INISIASI KONSULTASI ]</span>
              <ArrowUpRight size={14} />
            </button>

            <a
              href="#manifesto"
              className="group flex items-center space-x-2 border border-white/20 hover:border-[#0B70AD] bg-[#0D192E]/80 backdrop-blur-sm text-white px-5 py-3.5 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer"
            >
              <span>[ JELAJAHI ]</span>
              <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform text-[#0B70AD]" />
            </a>
          </div>
        </div>

        {/* Dedicated Pure Visual Stage for 3D Model */}
        <div
          id="hero-3d-stage"
          ref={framingRef}
          className="flex h-[240px] sm:h-[280px] lg:h-[460px] xl:h-[520px] lg:col-span-5 xl:col-span-6 relative pointer-events-none flex-col justify-end items-center lg:items-end p-4 select-none my-2 lg:my-0"
        >
          {/* Minimal Interaction Hint - Understated & Tasteful */}
          <div className="font-mono text-[10px] text-white/40 flex items-center space-x-2 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B70AD] animate-pulse" />
            <span>DRAG UNTUK ROTASI 360&deg;</span>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Architectural Metadata Bar (Sondaven-grade Negative Space & Elegance) */}
      <div
        ref={telemetryRef}
        className="border-t border-white/10 pt-6 relative z-10 select-none font-mono text-xs text-white/50"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-[#0B70AD]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B70AD] animate-pulse" />
            <span className="tracking-[0.2em] uppercase font-semibold text-[10px] sm:text-xs">
              [ 01 // DOKUMEN REKAYASA &bull; METODOLOGI TERSTRUKTUR & ADAPTIF ]
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-2 text-white/40 text-[11px] tracking-wider">
            <span>KELAS SISTEM:</span>
            <span className="text-white/70">ELEMEN STRUKTURAL PEMODELAN 3D KOMPUTASI</span>
          </div>

          <div className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors text-[11px] tracking-widest uppercase">
            <span>SCROLL UNTUK EKSPLORASI</span>
            <ArrowDown size={12} className="text-[#0B70AD] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
