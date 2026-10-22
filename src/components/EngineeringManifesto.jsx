import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EngineeringManifesto() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const words = textRef.current.querySelectorAll('.manifesto-word');

      // Optical de-blur scrub synchronized with Lenis scroll
      // Words visibly transition from dark (#334155, blur) to bright white (#FFFFFF, crisp)
      // The illumination is accelerated so that by the time the text is centered/full in view, all words are 100% white
      gsap.fromTo(
        words,
        {
          opacity: 0.18,
          filter: 'blur(7px)',
          color: '#334155',
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          color: '#FFFFFF',
          stagger: 0.03,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 78%',
            end: 'top 28%',
            scrub: 0.6,
          },
        }
      );

      // Smooth exit handoff into incoming Tentang Kami curtain
      gsap.to(textRef.current, {
        opacity: 0.15,
        y: -40,
        ease: 'power1.in',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom 80%',
          end: 'bottom 30%',
          scrub: 0.6,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const statement =
    'Di balik setiap konstruksi kokoh dan inovasi rekayasa yang berdaya tahan tinggi, terdapat komitmen mendalam terhadap presisi kalkulasi, kejelasan struktur, dan keberanian untuk beradaptasi melampaui batas konvensional.';

  const words = statement.split(' ');

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative min-h-[90vh] px-6 md:px-14 py-36 border-t border-white/10 flex flex-col justify-center bg-transparent z-20 overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Big Optical De-blur Statement in 2-Column Editorial Grid: 3D Left + Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-12">
          {/* Left Column: Dedicated open visual corridor for 3D model stage */}
          <div
            id="manifesto-3d-stage"
            className="hidden lg:block lg:col-span-6 xl:col-span-6 min-h-[420px] pointer-events-none select-none order-2 lg:order-1"
          />

          {/* Right Column: Section Pill & Manifesto Statement */}
          <div
            id="manifesto-editorial-column"
            className="lg:col-span-6 xl:col-span-6 max-w-xl lg:ml-auto select-none order-1 lg:order-2"
          >
            {/* Section Pill Label */}
            <div className="flex items-center space-x-3 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#0B70AD] animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-[#0B70AD] uppercase">
                [ 02 // MANIFESTO REKAYASA &bull; FILOSOFI KARYA ]
              </span>
            </div>

            <div
              ref={textRef}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] tracking-tight leading-[1.22] select-none"
            >
              {words.map((word, idx) => (
                <span
                  key={idx}
                  className="manifesto-word inline-block mr-[0.28em] will-change-[filter,opacity]"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Coordinate Footnote */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-white/10 pt-8 items-center font-mono text-xs text-white/50">
          <div className="md:col-span-6 flex items-center space-x-3">
            <span className="text-[#C91C22]">✦</span>
            <span className="text-white/80 tracking-wider">
              PRINSIP DASAR: INTEGRITAS &bull; DISIPLIN &bull; AKURASI
            </span>
          </div>

          <div className="md:col-span-6 flex md:justify-end space-x-6 text-[11px] text-white/40">
            <span>DOKUMEN MANIFESTO</span>
            <span>&bull;</span>
            <span>DRAF EDITORIAL 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
