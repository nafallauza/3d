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
            duration: 1.0,
            ease: 'power4.inOut',
            onComplete: () => {
              if (onComplete) onComplete();
            }
          });
        }, 300);
      } else {
        setPercent(current);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#1a1715] text-[#a89474] flex flex-col justify-between p-8 md:p-14 select-none pointer-events-auto overflow-hidden"
    >
      {/* Background Cinematic Video Loop */}
      <div className="absolute inset-0 z-0 opacity-25 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          <source src="https://assets.sondaven.com/preloader_sheep.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1715] via-transparent to-[#1a1715]" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 flex justify-between items-center border-b border-[#a89474]/20 pb-4 font-mono text-xs tracking-widest uppercase">
        <span className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#a89474] animate-ping" />
          <span>[ INITIALIZING CARPATHIAN SPATIAL ARCHITECTURE ]</span>
        </span>
        <span>YAREMCHE — ELEVATION 585M ASL</span>
      </div>

      {/* Center Brand */}
      <div className="relative z-10 my-auto max-w-4xl">
        <span className="font-mono text-xs tracking-[0.3em] text-[#a89474]/80 uppercase block mb-3">
          [ SANCTUARY AT THE FOOTHILLS OF ANCIENT RIDGE ]
        </span>
        <h1 className="font-serif text-6xl md:text-9xl tracking-tighter text-[#f5f1ea] leading-none mb-4">
          Son Daven
        </h1>
        <div className="font-mono text-xs tracking-widest text-[#a89474] flex items-center space-x-3">
          <span>BY BLAGO ARCHITECTURAL VENTURES</span>
          <span>•</span>
          <span>EST. 2026</span>
        </div>
      </div>

      {/* Bottom Counter & Loading Bar */}
      <div className="relative z-10 border-t border-[#a89474]/20 pt-6 flex items-end justify-between font-mono">
        <div>
          <div className="text-[10px] text-[#a89474]/60 tracking-widest uppercase mb-2">
            [ LOADING WEBGL SHADERS & 3D ASSETS ]
          </div>
          <div className="w-56 md:w-96 h-[2px] bg-[#a89474]/20 relative overflow-hidden">
            <div
              className="h-full bg-[#a89474] transition-all duration-75"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Large Digits Counter */}
        <div className="font-serif text-6xl md:text-8xl text-[#f5f1ea] tracking-tight leading-none">
          {percent < 10 ? `0${percent}` : percent}%
        </div>
      </div>
    </div>
  );
}
