import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FilosofiSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [linePaths, setLinePaths] = useState([]);

  const sectionRef = useRef(null);
  const arenaRef = useRef(null);
  const logoBoxRef = useRef(null);

  // References for anchor points on text and logo
  const textAnchorRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const hotspotRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const elements = [
    {
      id: 'atom-merah',
      num: '01',
      side: 'right',
      title: 'Titik Atom Merah',
      tag: 'INTI PRESISI',
      // Center red atom
      hotspotPos: { left: '50%', top: '43.5%' },
      desc: 'Poros energi rekayasa dan fokus tunggal pada presisi tanpa kompromi. Menjadi tumpuan stabil bagi seluruh kalkulasi sistem rancang bangun.',
    },
    {
      id: 'atom-ligan',
      num: '02',
      side: 'left',
      title: 'Struktur Atom & Ligan',
      tag: 'SINKRONISASI PARTIKEL',
      // Top-left outer atom node
      hotspotPos: { left: '31%', top: '34%' },
      desc: 'Sinergi partikel mikro yang saling mengikat harmonis. Setiap komponen dirancang saling mengunci guna menopang ketahanan struktur makro.',
    },
    {
      id: 'segitiga',
      num: '03',
      side: 'right',
      title: 'Formasi Segitiga',
      tag: 'STABILITAS STRUKTURAL',
      // Right truss vertex
      hotspotPos: { left: '69%', top: '47%' },
      desc: 'Poligon paling kaku dalam mekanika struktur yang mendistribusikan beban secara merata tanpa deformasi, mengarah ke atas menuju kemajuan.',
    },
    {
      id: 'gelombang',
      num: '04',
      side: 'left',
      title: 'Tiga Garis Gelombang',
      tag: 'DINAMIKA FLUIDA',
      // Left crest of the wave curves (clean exit to the left without crossing the logo)
      hotspotPos: { left: '35%', top: '69%' },
      desc: 'Kurva dinamis yang merefleksikan kelenturan operasional dan adaptabilitas tinggi dalam merespons tantangan medan lapangan.',
    },
  ];

  // Dynamically compute clean white pointer lines between logo hotspots and text blocks
  const updateLines = useCallback(() => {
    if (!arenaRef.current) return;
    const arenaRect = arenaRef.current.getBoundingClientRect();
    if (arenaRect.width === 0 || arenaRect.height === 0) return;

    const paths = elements.map((el, idx) => {
      const anchorEl = textAnchorRefs[idx]?.current;
      const spotEl = hotspotRefs[idx]?.current;
      if (!anchorEl || !spotEl) return null;

      const anchorRect = anchorEl.getBoundingClientRect();
      const spotRect = spotEl.getBoundingClientRect();

      const isLeft = el.side === 'left';

      // Anchor point on the text side
      const textX = isLeft
        ? anchorRect.right - arenaRect.left + 10
        : anchorRect.left - arenaRect.left - 10;
      const textY = anchorRect.top + anchorRect.height / 2 - arenaRect.top;

      // Hotspot point directly on logo
      const logoX = spotRect.left + spotRect.width / 2 - arenaRect.left;
      const logoY = spotRect.top + spotRect.height / 2 - arenaRect.top;

      // Draw path FROM logo TO text (so animation shoots outward to the text)
      const leadOut = isLeft ? 32 : -32;
      const midX = textX + leadOut;
      const d = `M ${logoX} ${logoY} L ${midX} ${textY} L ${textX} ${textY}`;

      return {
        id: el.id,
        logoX,
        logoY,
        textX,
        textY,
        d,
        isLeft,
      };
    });

    setLinePaths(paths.filter(Boolean));
  }, []);

  useEffect(() => {
    updateLines();
    const handleResize = () => updateLines();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, { passive: true });

    let ro;
    if (typeof ResizeObserver !== 'undefined' && arenaRef.current) {
      ro = new ResizeObserver(updateLines);
      ro.observe(arenaRef.current);
    }

    const t = setTimeout(updateLines, 200);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
      if (ro) ro.disconnect();
      clearTimeout(t);
    };
  }, [updateLines]);

  // GSAP ScrollTrigger Scroll-Driven Entrance Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 25%',
          scrub: 0.7, // Smooth scrub so it animates naturally as user scrolls down
        },
      });

      // 1. Logo scales up and fades in
      tl.fromTo(
        logoBoxRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'power2.out', duration: 0.4 },
        0
      );

      // 2. Hotspot pins scale in on the logo
      tl.fromTo(
        '.logo-hotspot-pin',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.05, ease: 'back.out(2)', duration: 0.3 },
        0.15
      );

      // 3. White lines DRAW OUTWARD from the logo towards the text
      tl.fromTo(
        '.filosofi-svg-line',
        { strokeDashoffset: 1, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, stagger: 0.08, ease: 'power2.out', duration: 0.6 },
        0.2
      );

      // 4. Left texts glide in smoothly from left to right
      tl.fromTo(
        '.filosofi-text-left',
        { x: -28, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, ease: 'power2.out', duration: 0.5 },
        0.35
      );

      // 5. Right texts glide in smoothly from right to left
      tl.fromTo(
        '.filosofi-text-right',
        { x: 28, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, ease: 'power2.out', duration: 0.5 },
        0.35
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [linePaths]);

  return (
    <section
      id="filosofi"
      ref={sectionRef}
      className="relative w-full bg-[#070E1A] text-[#F8FAFC] py-24 md:py-32 px-6 md:px-14 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Simple & Clean Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <div className="font-mono text-xs text-[#0B70AD] tracking-widest uppercase mb-3">
            [ 04 // FILOSOFI LOGO ]
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight font-normal mb-3">
            Filosofi Logo
          </h2>
          <p className="font-sans text-sm md:text-base text-white/60 font-light leading-relaxed">
            Dekonstruksi empat elemen visual yang membentuk doktrin rekayasa Tara Rekayasa.
          </p>
        </div>

        {/* Clean Centerpiece Arena: NO BOXES, PURE WHITE LINES & TEXT */}
        <div
          ref={arenaRef}
          className="relative w-full py-8 md:py-14"
        >
          {/* Dynamic Clean White SVG Lines Layer (PLACED ON TOP z-30 SO NEVER OBSTRUCTED) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-30 hidden lg:block"
            xmlns="http://www.w3.org/2000/svg"
          >
            {linePaths.map((line, idx) => {
              const isHovered = hoveredIdx === idx;
              const hasHover = hoveredIdx !== null;
              const opacity = isHovered ? 1 : hasHover ? 0.25 : 0.85;

              return (
                <g key={line.id} style={{ opacity, transition: 'opacity 0.2s ease' }}>
                  {/* Subtle outer glow for hover */}
                  {isHovered && (
                    <path
                      d={line.d}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="3.5"
                      strokeOpacity="0.4"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Clean Crisp White Line (Animates outward from logo to text) */}
                  <path
                    d={line.d}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth={isHovered ? 1.5 : 1}
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray={1}
                    className="filosofi-svg-line"
                  />

                  {/* Terminal Point at Text */}
                  <circle
                    cx={line.textX}
                    cy={line.textY}
                    r={isHovered ? 3.5 : 2.5}
                    fill="#FFFFFF"
                  />

                  {/* Hotspot Target Point on Logo */}
                  <circle
                    cx={line.logoX}
                    cy={line.logoY}
                    r={isHovered ? 4.5 : 3}
                    fill="#FFFFFF"
                  />
                  {isHovered && (
                    <circle
                      cx={line.logoX}
                      cy={line.logoY}
                      r="10"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1"
                      strokeOpacity="0.6"
                      className="animate-ping"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* 3-Column Responsive Layout: Left Text - Center Logo - Right Text */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-20">
            {/* ========================================================= */}
            {/* LEFT COLUMN: Pure Text without Boxes (Struktur Atom & Gelombang) */}
            {/* ========================================================= */}
            <div className="lg:col-span-4 flex flex-col space-y-14 sm:space-y-20 order-2 lg:order-1 lg:text-right">
              {/* Element 02: Struktur Atom & Ligan */}
              {(() => {
                const item = elements[1];
                const isHovered = hoveredIdx === 1;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredIdx(1)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="filosofi-text-left cursor-pointer transition-opacity duration-200"
                    style={{ opacity: hoveredIdx !== null && !isHovered ? 0.35 : 1 }}
                  >
                    <div className="font-mono text-xs text-white/50 tracking-wider uppercase mb-1">
                      {item.num} // {item.tag}
                    </div>
                    <div className="flex items-center lg:justify-end space-x-2 mb-2">
                      <h3 className="font-serif text-2xl text-white font-medium tracking-tight">
                        {item.title}
                      </h3>
                      {/* Explicit Anchor for SVG Line */}
                      <span ref={textAnchorRefs[1]} className="w-1.5 h-1.5 rounded-full bg-white/40 hidden lg:inline-block" />
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-sm lg:ml-auto">
                      {item.desc}
                    </p>
                  </div>
                );
              })()}

              {/* Element 04: Tiga Garis Gelombang */}
              {(() => {
                const item = elements[3];
                const isHovered = hoveredIdx === 3;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredIdx(3)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="filosofi-text-left cursor-pointer transition-opacity duration-200"
                    style={{ opacity: hoveredIdx !== null && !isHovered ? 0.35 : 1 }}
                  >
                    <div className="font-mono text-xs text-white/50 tracking-wider uppercase mb-1">
                      {item.num} // {item.tag}
                    </div>
                    <div className="flex items-center lg:justify-end space-x-2 mb-2">
                      <h3 className="font-serif text-2xl text-white font-medium tracking-tight">
                        {item.title}
                      </h3>
                      {/* Explicit Anchor for SVG Line */}
                      <span ref={textAnchorRefs[3]} className="w-1.5 h-1.5 rounded-full bg-white/40 hidden lg:inline-block" />
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-sm lg:ml-auto">
                      {item.desc}
                    </p>
                  </div>
                );
              })()}
            </div>

            {/* ========================================================= */}
            {/* CENTER COLUMN: Logo with Clean Hotspot Target Points */}
            {/* ========================================================= */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2 my-6 lg:my-0">
              <div
                ref={logoBoxRef}
                className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center select-none"
              >
                {/* Logo Image */}
                <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center">
                  <img
                    src="/assets/logo-tara-rekayasa.png"
                    alt="Logo Tara Rekayasa"
                    className="w-full h-full object-contain filter drop-shadow-[0_8px_30px_rgba(11,112,173,0.3)] transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />

                  {/* 4 Clean White Pins on Logo */}
                  {/* Pin 0: Atom Merah */}
                  <div
                    ref={hotspotRefs[0]}
                    style={{ left: elements[0].hotspotPos.left, top: elements[0].hotspotPos.top }}
                    onMouseEnter={() => setHoveredIdx(0)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="logo-hotspot-pin absolute -translate-x-1/2 -translate-y-1/2 z-40 cursor-pointer"
                  >
                    <div className="relative flex items-center justify-center">
                      <span className={`w-3 h-3 rounded-full border border-white bg-white transition-transform duration-200 ${hoveredIdx === 0 ? 'scale-150' : 'scale-100 opacity-90'}`} />
                    </div>
                  </div>

                  {/* Pin 1: Struktur Atom & Ligan */}
                  <div
                    ref={hotspotRefs[1]}
                    style={{ left: elements[1].hotspotPos.left, top: elements[1].hotspotPos.top }}
                    onMouseEnter={() => setHoveredIdx(1)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="logo-hotspot-pin absolute -translate-x-1/2 -translate-y-1/2 z-40 cursor-pointer"
                  >
                    <div className="relative flex items-center justify-center">
                      <span className={`w-3 h-3 rounded-full border border-white bg-white transition-transform duration-200 ${hoveredIdx === 1 ? 'scale-150' : 'scale-100 opacity-90'}`} />
                    </div>
                  </div>

                  {/* Pin 2: Formasi Segitiga */}
                  <div
                    ref={hotspotRefs[2]}
                    style={{ left: elements[2].hotspotPos.left, top: elements[2].hotspotPos.top }}
                    onMouseEnter={() => setHoveredIdx(2)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="logo-hotspot-pin absolute -translate-x-1/2 -translate-y-1/2 z-40 cursor-pointer"
                  >
                    <div className="relative flex items-center justify-center">
                      <span className={`w-3 h-3 rounded-full border border-white bg-white transition-transform duration-200 ${hoveredIdx === 2 ? 'scale-150' : 'scale-100 opacity-90'}`} />
                    </div>
                  </div>

                  {/* Pin 3: Tiga Garis Gelombang */}
                  <div
                    ref={hotspotRefs[3]}
                    style={{ left: elements[3].hotspotPos.left, top: elements[3].hotspotPos.top }}
                    onMouseEnter={() => setHoveredIdx(3)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="logo-hotspot-pin absolute -translate-x-1/2 -translate-y-1/2 z-40 cursor-pointer"
                  >
                    <div className="relative flex items-center justify-center">
                      <span className={`w-3 h-3 rounded-full border border-white bg-white transition-transform duration-200 ${hoveredIdx === 3 ? 'scale-150' : 'scale-100 opacity-90'}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* RIGHT COLUMN: Pure Text without Boxes (Atom Merah & Segitiga) */}
            {/* ========================================================= */}
            <div className="lg:col-span-4 flex flex-col space-y-14 sm:space-y-20 order-3 text-left">
              {/* Element 01: Titik Atom Merah */}
              {(() => {
                const item = elements[0];
                const isHovered = hoveredIdx === 0;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredIdx(0)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="filosofi-text-right cursor-pointer transition-opacity duration-200"
                    style={{ opacity: hoveredIdx !== null && !isHovered ? 0.35 : 1 }}
                  >
                    <div className="font-mono text-xs text-white/50 tracking-wider uppercase mb-1">
                      {item.num} // {item.tag}
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      {/* Explicit Anchor for SVG Line */}
                      <span ref={textAnchorRefs[0]} className="w-1.5 h-1.5 rounded-full bg-white/40 hidden lg:inline-block" />
                      <h3 className="font-serif text-2xl text-white font-medium tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-sm">
                      {item.desc}
                    </p>
                  </div>
                );
              })()}

              {/* Element 03: Formasi Segitiga */}
              {(() => {
                const item = elements[2];
                const isHovered = hoveredIdx === 2;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredIdx(2)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="filosofi-text-right cursor-pointer transition-opacity duration-200"
                    style={{ opacity: hoveredIdx !== null && !isHovered ? 0.35 : 1 }}
                  >
                    <div className="font-mono text-xs text-white/50 tracking-wider uppercase mb-1">
                      {item.num} // {item.tag}
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      {/* Explicit Anchor for SVG Line */}
                      <span ref={textAnchorRefs[2]} className="w-1.5 h-1.5 rounded-full bg-white/40 hidden lg:inline-block" />
                      <h3 className="font-serif text-2xl text-white font-medium tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-sm">
                      {item.desc}
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
