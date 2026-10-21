import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Compass, ShieldCheck, Check, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * AboutPrinciples — Asymmetric Editorial & Technical Blueprint Section
 * Inspired by Son Daven's expansive light surfaces, generous negative space,
 * architectural linework, and rigorous precision typography.
 */
export default function AboutPrinciples({ onOpenConsultation }) {
  const sectionRef = useRef(null);
  const narrativeRef = useRef(null);
  const blueprintRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Entrance animation for narrative items
      gsap.fromTo(
        '.about-pillar-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Blueprint schematic line draw-in
      gsap.fromTo(
        blueprintRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: blueprintRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const technicalPillars = [
    {
      index: '01',
      title: 'Rigor Analitis & Toleransi Terukur',
      desc: 'Kepatuhan mutlak terhadap parameter batas tegangan, kalkulasi momen gaya, dan validasi komputasi bertingkat sebelum eksekusi konstruksi.',
      metric: 'VERIFIKASI NUMERIK',
      accent: 'text-[#0B70AD]',
    },
    {
      index: '02',
      title: 'Pemodelan Parametrik Terintegrasi',
      desc: 'Pemanfaatan representasi 3D terkoordinasi dan simulasi struktural digital untuk mengeliminasi deviasi antara perancangan dan kondisi riil.',
      metric: 'INTEGRASI SPASIAL',
      accent: 'text-[#1B3459]',
    },
    {
      index: '03',
      title: 'Kelincahan Lapangan Bertanggung Jawab',
      desc: 'Formulasi rekayasa adaptif yang responsif terhadap variabel tak terduga di lapangan tanpa sedikit pun mengorbankan faktor keselamatan struktur.',
      metric: 'ADAPTABILITAS AKUNTABEL',
      accent: 'text-[#C91C22]',
    },
  ];

  return (
    <section
      id="tentang"
      ref={sectionRef}
      className="relative w-full bg-[#F4F6F9] text-[#1B3459] py-32 md:py-44 px-6 md:px-14 z-20 transition-colors duration-500 overflow-hidden"
    >
      {/* Precision Blueprint Coordinate Grid on Light Neutral Surface */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#1B3459_0.75px,transparent_0.75px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header: Son Daven Editorial Scale */}
        <div className="border-b border-[#1B3459]/15 pb-12 mb-20">
          <div className="flex items-center space-x-3 mb-6 font-mono text-xs text-[#0B70AD] tracking-widest uppercase font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#0B70AD]" />
            <span>[ 03 // IDENTITAS & PRINSIP REKAYASA ]</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
            <div className="lg:col-span-7">
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1B3459] tracking-tight leading-[1.08] font-normal">
                Pendekatan Terstruktur.
                <span className="block text-[#0B70AD] italic font-light">
                  Eksekusi Adaptif.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p className="font-sans text-base md:text-lg text-[#1B3459]/80 font-light leading-relaxed">
                Tara Rekayasa dibangun atas komitmen mendalam terhadap integritas teknis, disiplin analisis data, dan kelincahan metodologis dalam memecahkan tantangan rekayasa modern.
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Asymmetric Editorial Spread: Narrative on Left, Technical Blueprint on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Left Column (7 cols): Deep Narrative & Three Architectural Pillars */}
          <div ref={narrativeRef} className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <div className="font-mono text-xs text-[#0B70AD] uppercase tracking-widest font-semibold">
                [ 03.1 // FILOSOFI OPERASIONAL ]
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#1B3459] tracking-tight font-normal leading-snug">
                Presisi kalkulasi bukan sekadar angka di atas kertas, melainkan janji ketahanan struktural di lapangan.
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#1B3459]/75 leading-relaxed font-light">
                Kami memandang setiap rancang bangun sebagai kesatuan sistemik yang memerlukan ketelitian pada setiap parameter toleransi. Menghadapi kebutuhan lapangan yang dinamis, kerangka kerja kami memadukan kepatuhan baku mutu teknis dengan eksplorasi teknologi pemodelan 3D terkomputasi guna menghasilkan solusi yang efisien, kokoh, dan akuntabel.
              </p>
            </div>

            {/* Three Technical Pillars with Hairline Datum Lines */}
            <div className="space-y-8 pt-4">
              {technicalPillars.map((pillar) => (
                <div
                  key={pillar.index}
                  className="about-pillar-item border-t border-[#1B3459]/15 pt-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start group hover:border-[#0B70AD] transition-colors"
                >
                  <div className="sm:col-span-2 font-mono text-xs font-bold text-[#0B70AD] tracking-wider">
                    [ {pillar.index} ]
                  </div>
                  <div className="sm:col-span-7 space-y-1.5">
                    <h4 className="font-serif text-xl sm:text-2xl text-[#1B3459] font-normal tracking-tight group-hover:text-[#0B70AD] transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[#1B3459]/70 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="sm:col-span-3 sm:text-right font-mono text-[10px] text-[#1B3459]/50 tracking-wider">
                    {pillar.metric}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center space-x-3 border-2 border-[#1B3459] hover:border-[#0B70AD] bg-[#1B3459] hover:bg-[#0B70AD] text-white px-7 py-4 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer font-semibold shadow-md"
              >
                <span>[ KONSULTASIKAN KEBUTUHAN REKAYASA ]</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Precision Engineering Blueprint Schematic */}
          <div
            ref={blueprintRef}
            className="lg:col-span-5 bg-white border border-[#1B3459]/15 p-8 relative shadow-sm select-none"
          >
            {/* Blueprint Technical Header */}
            <div className="flex items-center justify-between border-b border-[#1B3459]/10 pb-4 mb-6 font-mono text-[11px] text-[#1B3459]/60">
              <span className="text-[#0B70AD] font-bold">[ DATUM REKAYASA // REF-A1 ]</span>
              <span>SKALA 1:1</span>
            </div>

            {/* Architectural Isometric Vector Diagram */}
            <div className="relative aspect-[4/3] w-full bg-[#F8FAFC] border border-[#1B3459]/10 flex items-center justify-center p-6 overflow-hidden">
              {/* Background Coordinate Lines */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1B3459_1px,transparent_1px),linear-gradient(to_bottom,#1B3459_1px,transparent_1px)] bg-[size:16px_16px]" />

              <svg
                viewBox="0 0 320 220"
                className="w-full h-full relative z-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Structural Load Truss Vectors */}
                <path
                  d="M40 180L160 40L280 180H40Z"
                  stroke="#1B3459"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <path
                  d="M160 40V180"
                  stroke="#0B70AD"
                  strokeWidth="2"
                />
                <path
                  d="M100 110L220 110"
                  stroke="#1B3459"
                  strokeWidth="1.25"
                />
                <path
                  d="M100 110L160 180L220 110"
                  stroke="#C91C22"
                  strokeWidth="1.5"
                />

                {/* Nodes & Strain Coordinates */}
                <circle cx="160" cy="40" r="4" fill="#C91C22" />
                <circle cx="40" cy="180" r="3.5" fill="#1B3459" />
                <circle cx="280" cy="180" r="3.5" fill="#1B3459" />
                <circle cx="100" cy="110" r="3" fill="#0B70AD" />
                <circle cx="220" cy="110" r="3" fill="#0B70AD" />
                <circle cx="160" cy="180" r="3.5" fill="#1B3459" />

                {/* Technical Dimension Annotations */}
                <text x="165" y="36" fill="#C91C22" fontSize="9" fontFamily="monospace">APEX NODE [F_z]</text>
                <text x="18" y="196" fill="#1B3459" fontSize="8" fontFamily="monospace">SUPPORT N_01</text>
                <text x="240" y="196" fill="#1B3459" fontSize="8" fontFamily="monospace">SUPPORT N_02</text>
                <text x="165" y="116" fill="#0B70AD" fontSize="8" fontFamily="monospace">NEUTRAL AXIS</text>
              </svg>

              {/* Technical Calibration Watermark */}
              <div className="absolute bottom-2 right-3 font-mono text-[9px] text-[#1B3459]/40">
                TOLERANSI TEKNIS TERUKUR
              </div>
            </div>

            {/* Technical Parameters Table */}
            <div className="mt-6 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#1B3459]/10 pb-2 text-[#1B3459]/80">
                <span>METODOLOGI KAJIAN:</span>
                <span className="font-semibold text-[#1B3459]">ANALISIS FINITE ELEMENT & CAD</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#1B3459]/10 pb-2 text-[#1B3459]/80">
                <span>VALIDASI GEOMETRI:</span>
                <span className="font-semibold text-[#0B70AD]">PEMODELAN PARAMETRIK 3D</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#1B3459]/10 pb-2 text-[#1B3459]/80">
                <span>STANDAR INTEGRITAS:</span>
                <span className="font-semibold text-[#1B3459]">DISIPLIN REKAYASA TARA</span>
              </div>
            </div>

            {/* Official Mark Verification Footer */}
            <div className="mt-6 pt-4 border-t border-[#1B3459]/10 flex items-center justify-between font-mono text-[10px] text-[#1B3459]/50">
              <div className="flex items-center space-x-2">
                <img
                  src="/assets/logo-tara-rekayasa.png"
                  alt="Tara Mark"
                  className="w-4 h-4 object-contain"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                <span className="tracking-wider uppercase font-medium text-[#1B3459]">TARA REKAYASA</span>
              </div>
              <span>DOKUMEN FILOSOFI 2026</span>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Architectural Anchor */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[#1B3459]/15 pt-12 font-mono">
          <div>
            <div className="text-3xl sm:text-4xl font-serif text-[#0B70AD] font-normal tracking-tight">Presisi</div>
            <div className="text-[11px] text-[#1B3459]/60 uppercase mt-1 tracking-wider">Kepatuhan Baku Mutu</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif text-[#1B3459] font-normal tracking-tight">Terstruktur</div>
            <div className="text-[11px] text-[#1B3459]/60 uppercase mt-1 tracking-wider">Kerangka Metodologis</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif text-[#C91C22] font-normal tracking-tight">Adaptif</div>
            <div className="text-[11px] text-[#1B3459]/60 uppercase mt-1 tracking-wider">Responsif Dinamika Medan</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif text-[#1B3459] font-normal tracking-tight">Akuntabel</div>
            <div className="text-[11px] text-[#1B3459]/60 uppercase mt-1 tracking-wider">Integritas Dokumen Teknik</div>
          </div>
        </div>
      </div>
    </section>
  );
}
