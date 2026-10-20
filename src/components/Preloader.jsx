import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const isNoPreload = window.location.search.includes('nopreload') || sessionStorage.getItem('has_preloaded') === 'true';
    if (isNoPreload) {
      setPercent(100);
      if (containerRef.current) {
        containerRef.current.style.display = 'none';
      }
      if (onComplete) onComplete();
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setPercent(100);
        sessionStorage.setItem('has_preloaded', 'true');

        setTimeout(() => {
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: 'power4.inOut',
            onComplete: () => {
              if (onComplete) onComplete();
            }
          });
        }, 250);
      } else {
        setPercent(current);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#070E1A] text-[#F8FAFC] flex flex-col justify-between p-8 md:p-14 select-none pointer-events-auto overflow-hidden"
    >
      {/* Precision Blueprint Grid Texture */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-[radial-gradient(#0B70AD_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Top Header */}
      <div className="relative z-10 flex justify-between items-center border-b border-white/10 pb-4 font-mono text-xs tracking-widest uppercase">
        <span className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#0B70AD] animate-ping" />
          <span className="text-white/80">[ INISIALISASI ARSITEKTUR REKAYASA PRESISI ]</span>
        </span>
        <span className="text-[#0B70AD] hidden sm:inline">TARA REKAYASA • 2026</span>
      </div>

      {/* Center Brand */}
      <div className="relative z-10 my-auto max-w-4xl">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src="/assets/logo-tara-rekayasa.png"
            alt="Logo Tara Rekayasa"
            className="w-12 h-12 object-contain filter drop-shadow-[0_2px_10px_rgba(11,112,173,0.4)]"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <span className="font-mono text-xs tracking-[0.25em] text-[#0B70AD] uppercase">
            [ STRUCTURAL • ADAPTIVE • INNOVATIVE ]
          </span>
        </div>

        <h1 className="font-serif text-5xl md:text-8xl tracking-tight text-white leading-none mb-4">
          Tara Rekayasa
        </h1>

        <p className="font-sans text-sm md:text-base text-white/70 max-w-xl font-light">
          Presisi dalam Detail. Inovasi dalam Rekayasa.
        </p>
      </div>

      {/* Bottom Counter & Loading Bar */}
      <div className="relative z-10 border-t border-white/10 pt-6 flex items-end justify-between font-mono">
        <div>
          <div className="text-[10px] text-white/50 tracking-widest uppercase mb-2 flex items-center space-x-2">
            <span>[ MEMUAT ASSET 3D & STRUKTUR ]</span>
            <span className="text-[#C91C22]">✦</span>
          </div>
          <div className="w-56 md:w-96 h-[2px] bg-white/10 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#1B3459] via-[#0B70AD] to-[#C91C22] transition-all duration-75"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Large Digits Counter */}
        <div className="font-serif text-6xl md:text-8xl text-white tracking-tight leading-none">
          {percent < 10 ? `0${percent}` : percent}%
        </div>
      </div>
    </div>
  );
}
