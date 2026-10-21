import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Velocity-Paced Marquee without text distortion
 * Modulates ticker speed smoothly based on scroll momentum while preserving 100% typographic stability.
 */
export default function MarqueeTicker() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const items = [
    { text: 'PRESISI DALAM DETAIL', color: 'text-[#0B70AD]' },
    { text: 'INOVASI DALAM REKAYASA', color: 'text-white' },
    { text: 'PENDEKATAN TERSTRUKTUR & ADAPTIF', color: 'text-[#C91C22]' },
    { text: 'STRUKTUR ATOM & LIGAN', color: 'text-[#0B70AD]' },
    { text: 'STABILITAS FORMASI SEGITIGA', color: 'text-white' },
    { text: 'DINAMIKA GARIS GELOMBANG', color: 'text-[#C91C22]' },
    { text: 'KOLABORASI RUANG TERBUKA', color: 'text-[#0B70AD]' },
    { text: 'INTEGRITAS REKAYASA PRESISI', color: 'text-white' },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      // Continuous horizontal movement loop
      const loop = gsap.to(track, {
        xPercent: -50,
        ease: 'none',
        duration: 26,
        repeat: -1,
      });

      // Modulate loop speed dynamically based on scroll velocity without any skew distortion
      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity()); // px/sec
          const targetScale = gsap.utils.clamp(1.0, 2.6, 1.0 + velocity / 750);

          gsap.to(loop, {
            timeScale: targetScale,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden py-3 bg-[#070E1A]/50 backdrop-blur-sm text-[#F8FAFC] border-y border-white/10 select-none font-mono text-[10px] tracking-[0.25em] uppercase relative z-10"
    >
      <div
        ref={trackRef}
        className="whitespace-nowrap flex items-center will-change-transform w-fit opacity-80 hover:opacity-100 transition-opacity"
      >
        {items.concat(items).concat(items).map((item, idx) => (
          <span key={idx} className="flex items-center space-x-6 mx-6">
            <span className={`${item.color} font-medium`}>{item.text}</span>
            <span className="text-[#C91C22]/80">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
