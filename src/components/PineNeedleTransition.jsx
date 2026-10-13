import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PineNeedleTransition() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    // Smooth subtle parallax scrub without pixel-stretching
    const tween = gsap.fromTo(
      image,
      { yPercent: -5 },
      {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        }
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#2c2824] select-none text-[#f5f0ea]"
    >
      {/* Top Editorial Intro */}
      <div className="relative z-20 w-full bg-[#2c2824] pt-28 pb-10">
        <div className="px-6 md:px-14 max-w-5xl mx-auto text-center">
          <div className="font-mono text-xs tracking-widest text-amber-400 uppercase mb-4 flex items-center justify-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>[ 07 / 12 — THE LIVING CARPATHIAN CANOPY ]</span>
          </div>
          <h2 className="font-serif text-4xl md:text-7xl text-white tracking-tight leading-tight mb-6">
            Where Wilderness Shapes Architecture
          </h2>
          <p className="font-sans text-sm md:text-base text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
            Every volumetric line of Son Daven bows to the ancient pine canopy. The jagged tectonic ridgeline dissolves human geometry into pristine nature.
          </p>
        </div>
      </div>

      {/* The Authentic Sondaven Jagged Needle Transition Fringe (Matches User Screenshot 100%) */}
      <div className="relative z-20 w-full overflow-hidden -mb-20 md:-mb-40 pointer-events-none">
        <img
          src="/assets/transition-dark-02.svg"
          alt="Authentic Sondaven Needle Transition"
          className="w-full h-32 md:h-64 object-fill block scale-y-[-1]"
        />
      </div>

      {/* Panoramic Forest Canopy Scene Below the Needles (Matches Screenshot From 2026-10-13 09-46-50) */}
      <div className="relative z-10 w-full h-[70vh] md:h-[90vh] overflow-hidden bg-[#2c2824]">
        <img
          ref={imageRef}
          src="/assets/final-0.webp"
          alt="Carpathian Pine Forest Canopy"
          className="w-full h-[120%] object-cover object-top will-change-transform filter brightness-100 contrast-105"
        />

        {/* Ambient Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2c2824] via-transparent to-transparent opacity-90" />

        {/* Floating Metadata Badge */}
        <div className="absolute bottom-10 left-6 md:left-14 z-20 font-mono text-xs text-[#f5f0ea] bg-[#2c2824]/90 backdrop-blur-md border border-white/15 p-5 max-w-md shadow-2xl">
          <div className="text-amber-400 mb-1 tracking-wider uppercase text-[10px]">
            [ CANOPY BIOSPHERE PRESERVATION ]
          </div>
          <div className="font-serif text-xl text-white mb-2">
            Relict Carpathian Pines
          </div>
          <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
            Average tree age: 140–280 years. Preserving 94% of the native root biome throughout construction.
          </p>
        </div>
      </div>
    </div>
  );
}
