import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
  Activity,
  Layers,
  Cpu,
  ShieldCheck,
  Compass,
  FileCheck,
  Sliders,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProsesSection({ onOpenConsultation }) {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const progressLineRef = useRef(null);
  const [activePhase, setActivePhase] = useState(0);

  // Proposed 5-Phase Conceptual Engineering Methodology (Draft Presentation Structure)
  const phases = [
    {
      num: '01',
      title: 'Struktur',
      subtitle: 'Inisiasi Geometri & Kajian Parameter',
      code: 'TR-MTHD-01',
      tag: 'FASE 01 // INISIASI STRUKTURAL (DRAF USULAN)',
      desc: 'Tahap awal kajian kebutuhan teknis, inventarisasi variabel lapangan, dan perumusan batasan operasional awal sebagai fondasi analisis rekayasa.',
      tolerance: 'Target Toleransi Desain (Draf Rujukan)',
      deliverables: [
        'Kajian batasan beban & gaya struktural',
        'Identifikasi variabel medan & parameter awal',
        'Matriks analisis risiko & ruang lingkup awal',
      ],
    },
    {
      num: '02',
      title: 'Analisis',
      subtitle: 'Simulasi Komputasi & Pemodelan Numerik',
      code: 'TR-MTHD-02',
      tag: 'FASE 02 // SIMULASI KOMPUTASI (KONSEP ILUSTRATIF)',
      desc: 'Eksplorasi kalkulasi komputasi dan pemodelan numerik untuk menganalisis distribusi tegangan, respons struktural, serta skenario beban kritis.',
      tolerance: 'Faktor Keamanan Rujukan (Draf Usulan)',
      deliverables: [
        'Pemodelan komputasi respons beban dinamis',
        'Analisis perilaku material terhadap tegangan',
        'Simulasi skenario beban & faktor keselamatan',
      ],
    },
    {
      num: '03',
      title: 'Perancangan',
      subtitle: 'Sintesis CAD/BIM Terintegrasi',
      code: 'TR-MTHD-03',
      tag: 'FASE 03 // INTEGRASI DETAIL (DRAF USULAN)',
      desc: 'Pengembangan model geometri terintegrasi secara digital, perumusan spesifikasi teknis komponen, serta penyusunan gambar kerja detail.',
      tolerance: 'Sintesis Pemodelan Detail (Draf Rujukan)',
      deliverables: [
        'Model 3D CAD/BIM parametrik terintegrasi',
        'Penyusunan gambar kerja detail (Shop Drawing)',
        'Spesifikasi kebutuhan teknis antarmuka sistem',
      ],
    },
    {
      num: '04',
      title: 'Validasi',
      subtitle: 'Pengujian & Verifikasi Lapangan',
      code: 'TR-MTHD-04',
      tag: 'FASE 04 // PROTOKOL VERIFIKASI (DRAF USULAN)',
      desc: 'Perumusan protokol uji komisioning, penyelarasan instrumentasi di lapangan, dan verifikasi kesesuaian hasil implementasi terhadap model rencana.',
      tolerance: 'Protokol Uji Terukur (Draf Usulan)',
      deliverables: [
        'Rencana protokol pengujian beban & fungsi',
        'Kalibrasi instrumen & sensor operasional',
        'Verifikasi batas toleransi deviasi lapangan',
      ],
    },
    {
      num: '05',
      title: 'Hasil',
      subtitle: 'Dokumentasi & Serah Terima',
      code: 'TR-MTHD-05',
      tag: 'FASE 05 // FINALISASI (DRAF USULAN)',
      desc: 'Penyusunan dokumentasi teknis as-built terstruktur, perumusan panduan pemeliharaan preventif, serta dukungan keberlanjutan performa.',
      tolerance: 'Dokumentasi As-Built & Manual (Draf Final)',
      deliverables: [
        'Penyusunan berkas dokumentasi teknis as-built',
        'Manual pemeliharaan preventif sistem',
        'Rekomendasi pemantauan performa berkala',
      ],
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const phaseIndex = Math.min(
              phases.length - 1,
              Math.floor(p * phases.length)
            );
            setActivePhase(phaseIndex);
            if (progressLineRef.current) {
              progressLineRef.current.style.width = `${Math.round(p * 100)}%`;
            }
          },
        },
      });
    });

    return () => mm.revert();
  }, [phases.length]);

  return (
    <section
      id="proses"
      ref={sectionRef}
      className="relative w-full bg-[#070E1A] text-[#F8FAFC] border-t border-white/10 z-20"
    >
      {/* =========================================================================
          DESKTOP PINNED HORIZONTAL SCROLL STORY (>= 1024px)
          Cinematic Widescreen Editorial Spread Architecture
          ========================================================================= */}
      <div
        ref={pinRef}
        className="hidden lg:flex h-screen w-full flex-col justify-between overflow-hidden relative"
      >
        {/* Top Pinned Architectural Telemetry Header */}
        <div className="w-full border-b border-white/15 bg-[#070E1A]/95 backdrop-blur-md px-10 py-4 z-30 shrink-0">
          {/* Realtime Horizontal Scrub Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
            <div
              ref={progressLineRef}
              className="h-full bg-gradient-to-r from-[#1B3459] via-[#0B70AD] to-[#C91C22] transition-all duration-75"
              style={{ width: '0%' }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 font-mono text-xs text-[#0B70AD] tracking-widest uppercase font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#0B70AD] animate-pulse" />
                <span>[ 06 // ALUR REKAYASA &bull; METODOLOGI TERSTRUKTUR ]</span>
              </div>
              <span className="text-white/20">|</span>
              <div className="font-mono text-xs text-white/80 tracking-wider">
                FASE AKTIF: <span className="text-[#0B70AD] font-bold">[ 0{activePhase + 1} / 05 ]</span>{' '}
                <span className="text-white font-medium uppercase">— {phases[activePhase].title}</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 border border-[#C91C22]/40 bg-[#C91C22]/10 px-3 py-1 font-mono text-[11px] text-[#C91C22] tracking-wider uppercase">
                <span>* DRAF USULAN PROSEDUR TEKNIS // KONTEN ILUSTRATIF</span>
              </div>

              <div className="font-mono text-[11px] text-white/40 flex items-center space-x-2">
                <span>SCROLL VERTIKAL UNTUK MENJELAJAHI</span>
                <span className="text-[#0B70AD]">&rarr;</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pinned Horizontal Track: 5 Distinct Editorial Scenes */}
        <div
          ref={trackRef}
          className="flex h-[calc(100vh-140px)] w-max items-center pl-10 pr-24 space-x-16 relative z-10 will-change-transform"
        >
          {/* ===================================================================
              SCENE 01: STRUKTUR (Monumental Architectural Layout)
              =================================================================== */}
          <div className="w-[86vw] max-w-[1280px] h-[84%] bg-[#081120] border-l-2 border-[#0B70AD] p-10 xl:p-14 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            {/* Background Watermark */}
            <div className="absolute right-6 -bottom-8 select-none pointer-events-none font-serif text-[24vw] leading-none text-white/[0.02] font-bold">
              01
            </div>

            {/* Top Scene Meta */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs relative z-10">
              <div className="flex items-center space-x-3 text-[#0B70AD]">
                <span className="w-2 h-2 rounded-full bg-[#0B70AD]" />
                <span className="tracking-widest uppercase font-semibold">{phases[0].tag}</span>
              </div>
              <div className="text-white/40 tracking-wider">[ DRAF REF: {phases[0].code} ]</div>
            </div>

            {/* Main Asymmetrical Split */}
            <div className="grid grid-cols-12 gap-12 items-center relative z-10 my-auto">
              <div className="col-span-7 space-y-6">
                <div className="font-mono text-xs text-[#0B70AD] tracking-widest uppercase">
                  TAHAPAN DASAR REKAYASA // METODOLOGI AWAL
                </div>
                <h3 className="font-serif text-4xl xl:text-6xl text-white tracking-tight leading-[1.1] font-normal">
                  Inisiasi Geometri & Kajian Parameter.
                </h3>
                <p className="font-sans text-base xl:text-lg text-white/75 font-light leading-relaxed max-w-xl">
                  {phases[0].desc}
                </p>

                {/* Scope Deliverables */}
                <div className="space-y-3 pt-2 font-sans text-xs xl:text-sm text-white/85">
                  {phases[0].deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0B70AD] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Minimalist Architectural Truss Elevation Linework (No heavy card box) */}
              <div className="col-span-5 relative border-l border-white/10 pl-8 py-4">
                <div className="flex items-center justify-between font-mono text-[10px] text-white/50 mb-6">
                  <span>[ ELEVASI RANGKA // VEKTOR ILUSTRATIF ]</span>
                  <span className="text-[#0B70AD]">MODEL GEOMETRI</span>
                </div>
                <svg className="w-full h-48 text-[#0B70AD]" viewBox="0 0 340 160" fill="none">
                  {/* Base Datum Ground Line */}
                  <line x1="20" y1="135" x2="320" y2="135" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  {/* Structural Truss Triangles */}
                  <path d="M 30 135 L 170 25 L 310 135 Z" stroke="#0B70AD" strokeWidth="2" />
                  <path d="M 100 135 L 170 25 L 240 135" stroke="#0B70AD" strokeWidth="1.5" strokeDasharray="4 2" />
                  <line x1="100" y1="80" x2="240" y2="80" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 2" />
                  {/* Precision Node Points */}
                  <circle cx="30" cy="135" r="4" fill="#0B70AD" />
                  <circle cx="170" cy="25" r="4" fill="#C91C22" />
                  <circle cx="310" cy="135" r="4" fill="#0B70AD" />
                  <circle cx="100" cy="135" r="3" fill="#FFFFFF" />
                  <circle cx="240" cy="135" r="3" fill="#FFFFFF" />
                  {/* Coordinate Labels */}
                  <text x="30" y="152" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">N_01</text>
                  <text x="170" y="16" fill="#C91C22" fontSize="9" fontFamily="monospace" textAnchor="middle">APEX // K-01</text>
                  <text x="310" y="152" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace" textAnchor="end">N_02</text>
                </svg>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-white/50">TARGET RUJUKAN:</span>
                  <span className="text-[#0B70AD] font-bold">{phases[0].tolerance}</span>
                </div>
              </div>
            </div>

            {/* Bottom Datum Line */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] text-white/50 relative z-10">
              <div>STATUS: TAHAPAN KAJIAN AWAL // DRAF</div>
              <div className="text-[#0B70AD]">[ MENUJU FASE 02 // ANALISIS &rarr; ]</div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 02: ANALISIS (Inverted Editorial Data-Flow Spread)
              =================================================================== */}
          <div className="w-[86vw] max-w-[1280px] h-[84%] bg-[#08121E] border-l-2 border-[#1B3459] p-10 xl:p-14 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute right-6 -bottom-8 select-none pointer-events-none font-serif text-[24vw] leading-none text-white/[0.02] font-bold">
              02
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs relative z-10">
              <div className="flex items-center space-x-3 text-[#0B70AD]">
                <span className="w-2 h-2 rounded-full bg-[#0B70AD]" />
                <span className="tracking-widest uppercase font-semibold">{phases[1].tag}</span>
              </div>
              <div className="text-white/40 tracking-wider">[ DRAF REF: {phases[1].code} ]</div>
            </div>

            {/* Inverted Content Split: Graphic & Analysis on Left, Typography on Right */}
            <div className="grid grid-cols-12 gap-12 items-center relative z-10 my-auto">
              {/* Dynamic Computational Stress Wave (Direct SVG, no boxed card container) */}
              <div className="col-span-5 relative border-r border-white/10 pr-8 py-4">
                <div className="flex items-center justify-between font-mono text-[10px] text-white/50 mb-4">
                  <span>[ RESPON TEGANGAN DINAMIS // SIMULASI ]</span>
                  <span className="text-[#C91C22]">ELEMEN HINGGA</span>
                </div>
                <svg className="w-full h-48" viewBox="0 0 320 160" fill="none">
                  {/* Grid Lines */}
                  <line x1="20" y1="30" x2="300" y2="30" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                  <line x1="20" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                  <line x1="20" y1="130" x2="300" y2="130" stroke="rgba(255,255,255,0.2)" />
                  {/* Gradient Area Curve */}
                  <path
                    d="M 20 120 Q 80 20 150 70 T 290 35"
                    stroke="#0B70AD"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <path
                    d="M 20 120 Q 80 20 150 70 T 290 35 L 290 130 L 20 130 Z"
                    fill="url(#scene2Grad)"
                    opacity="0.3"
                  />
                  <defs>
                    <linearGradient id="scene2Grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C91C22" />
                      <stop offset="60%" stopColor="#0B70AD" />
                      <stop offset="100%" stopColor="#08121E" />
                    </linearGradient>
                  </defs>
                  <circle cx="290" cy="35" r="4" fill="#C91C22" />
                  <text x="290" y="24" fill="#C91C22" fontSize="9" fontFamily="monospace" textAnchor="end">RESPON KRITIS</text>
                </svg>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-white/50">PARAMETER KEAMANAN:</span>
                  <span className="text-[#C91C22] font-bold">{phases[1].tolerance}</span>
                </div>
              </div>

              {/* Editorial Statement */}
              <div className="col-span-7 space-y-6">
                <div className="font-mono text-xs text-[#0B70AD] tracking-widest uppercase">
                  SIMULASI PREDIKTIF // PEMODELAN NUMERIK
                </div>
                <h3 className="font-serif text-4xl xl:text-6xl text-white tracking-tight leading-[1.1] font-normal">
                  Simulasi Komputasi & Respon Material.
                </h3>
                <p className="font-sans text-base xl:text-lg text-white/75 font-light leading-relaxed max-w-xl">
                  {phases[1].desc}
                </p>

                <div className="space-y-3 pt-2 font-sans text-xs xl:text-sm text-white/85">
                  {phases[1].deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C91C22] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] text-white/50 relative z-10">
              <div>SIMULASI: PEMODELAN NUMERIK // DRAF</div>
              <div className="text-[#0B70AD]">[ MENUJU FASE 03 // PERANCANGAN &rarr; ]</div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 03: PERANCANGAN (Blueprint Drafting & CAD/BIM Synthesis)
              =================================================================== */}
          <div className="w-[88vw] max-w-[1300px] h-[84%] bg-[#0A1628] border-l-2 border-white/40 p-10 xl:p-14 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            {/* Drafting Grid Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#0B70AD_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="absolute right-6 -bottom-8 select-none pointer-events-none font-serif text-[24vw] leading-none text-white/[0.02] font-bold">
              03
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs relative z-10">
              <div className="flex items-center space-x-3 text-white">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span className="tracking-widest uppercase font-semibold">{phases[2].tag}</span>
              </div>
              <div className="text-white/40 tracking-wider">[ DRAF REF: {phases[2].code} ]</div>
            </div>

            <div className="grid grid-cols-12 gap-12 items-center relative z-10 my-auto">
              <div className="col-span-7 space-y-6">
                <div className="font-mono text-xs text-[#0B70AD] tracking-widest uppercase">
                  INTEGRASI PARAMETRIK // SHOP DRAWINGS
                </div>
                <h3 className="font-serif text-4xl xl:text-6xl text-white tracking-tight leading-[1.1] font-normal">
                  Sintesis CAD/BIM & Model Detail.
                </h3>
                <p className="font-sans text-base xl:text-lg text-white/75 font-light leading-relaxed max-w-xl">
                  {phases[2].desc}
                </p>

                <div className="space-y-3 pt-2 font-sans text-xs xl:text-sm text-white/85">
                  {phases[2].deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0B70AD] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architectural Stratification Matrix (Clean blueprint elevation) */}
              <div className="col-span-5 relative border-l border-white/10 pl-8 py-2 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between text-white/50 border-b border-white/10 pb-2 text-[10px]">
                  <span>[ MATRIKS LAYER CAD // STRATIFIKASI ]</span>
                  <span className="text-[#0B70AD]">BIM SISTEM</span>
                </div>
                <div className="p-3 bg-[#070E1A]/60 border-l-2 border-[#0B70AD] flex items-center justify-between">
                  <span className="text-white">LAYER 01: Rangka Struktural Utama</span>
                  <span className="text-[10px] text-[#0B70AD]">MODEL DEFINITIF</span>
                </div>
                <div className="p-3 bg-[#070E1A]/60 border-l-2 border-white/40 flex items-center justify-between">
                  <span className="text-white">LAYER 02: Interface Sambungan & Nodul</span>
                  <span className="text-[10px] text-white/60">TOLERANSI PRESISI</span>
                </div>
                <div className="p-3 bg-[#070E1A]/60 border-l-2 border-[#C91C22] flex items-center justify-between">
                  <span className="text-white">LAYER 03: Penyelarasan Instrumentasi</span>
                  <span className="text-[10px] text-[#C91C22]">SENSORIKA</span>
                </div>
                <div className="pt-2 text-[11px] text-white/50 flex items-center justify-between">
                  <span>STATUS PEMODELAN:</span>
                  <span className="text-white font-bold">{phases[2].tolerance}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] text-white/50 relative z-10">
              <div>GAMBAR KERJA: DRAF USULAN TEKNIS</div>
              <div className="text-[#0B70AD]">[ MENUJU FASE 04 // VALIDASI &rarr; ]</div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 04: VALIDASI (High-Contrast Verification Stage)
              =================================================================== */}
          <div className="w-[86vw] max-w-[1280px] h-[84%] bg-[#120B16] border-l-2 border-[#C91C22] p-10 xl:p-14 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute right-6 -bottom-8 select-none pointer-events-none font-serif text-[24vw] leading-none text-white/[0.02] font-bold">
              04
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs relative z-10">
              <div className="flex items-center space-x-3 text-[#C91C22]">
                <span className="w-2 h-2 rounded-full bg-[#C91C22]" />
                <span className="tracking-widest uppercase font-semibold">{phases[3].tag}</span>
              </div>
              <div className="text-white/40 tracking-wider">[ DRAF REF: {phases[3].code} ]</div>
            </div>

            <div className="grid grid-cols-12 gap-12 items-center relative z-10 my-auto">
              <div className="col-span-7 space-y-6">
                <div className="font-mono text-xs text-[#C91C22] tracking-widest uppercase">
                  VERIFIKASI EMPIRIS // PROTOKOL KOMISIONING
                </div>
                <h3 className="font-serif text-4xl xl:text-6xl text-white tracking-tight leading-[1.1] font-normal">
                  Validasi Pengujian & Akurasi Lapangan.
                </h3>
                <p className="font-sans text-base xl:text-lg text-white/75 font-light leading-relaxed max-w-xl">
                  {phases[3].desc}
                </p>

                <div className="space-y-3 pt-2 font-sans text-xs xl:text-sm text-white/85">
                  {phases[3].deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C91C22] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commissioning Protocol Telemetry Matrix */}
              <div className="col-span-5 relative border-l border-white/10 pl-8 py-2 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between text-[#C91C22] border-b border-[#C91C22]/30 pb-2 text-[10px]">
                  <span>[ SIMULASI PROTOKOL VERIFIKASI ]</span>
                  <span>RUJUKAN UJI</span>
                </div>
                <div className="p-3 bg-[#1B0F18]/80 border border-white/10 flex items-center justify-between">
                  <span className="text-white/90">Sensor Telemetri & Kalibrasi</span>
                  <span className="text-[#0B70AD] font-bold">TARGET RUJUKAN</span>
                </div>
                <div className="p-3 bg-[#1B0F18]/80 border border-white/10 flex items-center justify-between">
                  <span className="text-white/90">Uji Beban Siklikal Terukur</span>
                  <span className="text-[#C91C22] font-bold">KRITERIA KELAYAKAN</span>
                </div>
                <div className="p-3 bg-[#1B0F18]/80 border border-white/10 flex items-center justify-between">
                  <span className="text-white/90">Batas Toleransi Deviasi Lapangan</span>
                  <span className="text-white font-bold">PARAMETER RUJUKAN</span>
                </div>
                <div className="pt-2 text-[11px] text-white/50 flex items-center justify-between">
                  <span>STATUS VERIFIKASI:</span>
                  <span className="text-[#C91C22] font-bold">{phases[3].tolerance}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] text-white/50 relative z-10">
              <div>TAHAP UJI EMPIRIS: DRAF PROSEDUR</div>
              <div className="text-[#C91C22]">[ MENUJU FASE 05 // HASIL &rarr; ]</div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 05: HASIL (Grand Editorial Finale & Direct Action)
              =================================================================== */}
          <div className="w-[84vw] max-w-[1240px] h-[84%] bg-[#08172E] border-l-2 border-[#0B70AD] p-10 xl:p-14 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute right-6 -bottom-8 select-none pointer-events-none font-serif text-[24vw] leading-none text-white/[0.03] font-bold">
              05
            </div>

            <div className="flex items-center justify-between border-b border-white/15 pb-4 font-mono text-xs relative z-10">
              <div className="flex items-center space-x-3 text-[#0B70AD]">
                <span className="w-2 h-2 rounded-full bg-[#0B70AD]" />
                <span className="tracking-widest uppercase font-semibold">{phases[4].tag}</span>
              </div>
              <div className="text-white/40 tracking-wider">[ DRAF FINAL: {phases[4].code} ]</div>
            </div>

            <div className="grid grid-cols-12 gap-12 items-center relative z-10 my-auto">
              <div className="col-span-8 space-y-6">
                <div className="font-mono text-xs text-[#0B70AD] tracking-widest uppercase">
                  DOKUMENTASI AS-BUILT & SIKLUS HIDUP // FINALISASI
                </div>
                <h3 className="font-serif text-4xl xl:text-6xl text-white tracking-tight leading-[1.1] font-normal">
                  Dokumentasi Lengkap & Keberlanjutan Sistem.
                </h3>
                <p className="font-sans text-base xl:text-lg text-white/75 font-light leading-relaxed max-w-xl">
                  {phases[4].desc}
                </p>

                <div className="space-y-3 pt-2 font-sans text-xs xl:text-sm text-white/85">
                  {phases[4].deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0B70AD] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Primary Consultation Call-to-Action */}
                <div className="pt-4">
                  <button
                    onClick={() => onOpenConsultation('alur')}
                    className="inline-flex items-center space-x-3 bg-[#0B70AD] hover:bg-white hover:text-[#070E1A] text-white px-8 py-4 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer font-bold border border-[#0B70AD] shadow-xl"
                  >
                    <span>[ INISIASI KONSULTASI REKAYASA ]</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>

              {/* Milestone Seal */}
              <div className="col-span-4 border-l border-white/10 pl-8 py-4 space-y-4 font-mono text-xs">
                <ShieldCheck size={38} className="text-[#0B70AD]" />
                <div className="text-white font-bold text-sm uppercase tracking-wider">
                  KOMITMEN AKUNTABILITAS
                </div>
                <div className="text-white/65 text-xs font-sans leading-relaxed">
                  Seluruh tahapan kerja disusun berlandaskan metodologi terstruktur, integritas kalkulasi, dan transparansi proses rekayasa.
                </div>
                <div className="pt-3 border-t border-white/10 text-[10px] text-[#0B70AD]">
                  [ TARA REKAYASA // METODOLOGI DRAF ]
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] text-white/50 relative z-10">
              <div>SIKLUS PENUH: STRUKTUR &rarr; HASIL</div>
              <div className="text-white/80">[ ALUR SELESAI &bull; KEMBALI KE ALIRAN VERTIKAL &darr; ]</div>
            </div>
          </div>
        </div>

        {/* Pinned Bottom Telemetry Navigation Bar */}
        <div className="w-full border-t border-white/15 bg-[#070E1A]/95 backdrop-blur-md px-10 py-3.5 z-30 shrink-0 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center space-x-3">
            <span className="text-white/40 text-[11px]">[ INDEKS FASE ]</span>
            {phases.map((st, idx) => (
              <div
                key={idx}
                className={`px-3 py-1 transition-all border text-[11px] ${
                  activePhase === idx
                    ? 'border-[#0B70AD] bg-[#0B70AD]/20 text-white font-bold'
                    : 'border-white/10 text-white/40'
                }`}
              >
                0{idx + 1} {st.title.toUpperCase()}
              </div>
            ))}
          </div>

          <div className="text-[11px] text-white/40 flex items-center space-x-2">
            <span className="text-[#0B70AD]">✦</span>
            <span>CINEMATIC WIDESCREEN EDITORIAL PROCESS</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE NATURAL VERTICAL SEQUENCE (< 1024px)
          Prevents awkward pinning on small screens; guarantees clean vertical reading
          ========================================================================= */}
      <div className="block lg:hidden px-6 py-20">
        <div className="border-b border-white/15 pb-6 mb-10">
          <div className="flex items-center space-x-3 mb-3 font-mono text-xs text-[#0B70AD] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#0B70AD]" />
            <span>[ 06 // ALUR REKAYASA &bull; METODOLOGI TERSTRUKTUR ]</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight leading-tight">
            Alur Rekayasa
          </h2>
          <div className="font-mono text-xs text-[#C91C22] border border-[#C91C22]/30 px-3 py-1.5 bg-[#C91C22]/10 uppercase tracking-wider mt-3 inline-block">
            * DRAF USULAN PROSEDUR TEKNIS // KONTEN ILUSTRATIF
          </div>
        </div>

        <div className="space-y-8">
          {phases.map((ph, idx) => (
            <div
              key={idx}
              className="bg-[#0D192E]/80 border-l-2 border-[#0B70AD] p-6 relative overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-1 border-b border-white/10 pb-3 mb-4 font-mono text-[11px]">
                <span className="text-[#0B70AD] font-bold">[ FASE 0{idx + 1} // {ph.title.toUpperCase()} ]</span>
                <span className="text-white/40 text-[10px]">DRAF: {ph.code}</span>
              </div>
              <h3 className="font-serif text-2xl text-white font-medium mb-3">
                {ph.title}: {ph.subtitle}
              </h3>
              <p className="font-sans text-xs text-white/70 leading-relaxed font-light mb-4">
                {ph.desc}
              </p>

              <div className="space-y-2 mb-4 font-sans text-xs text-white/80">
                {ph.deliverables.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B70AD] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px]">
                <span className="text-white/50">PARAMETER</span>
                <span className="text-[#0B70AD] font-bold">{ph.tolerance}</span>
              </div>
            </div>
          ))}

          <div className="pt-4">
            <button
              onClick={() => onOpenConsultation('alur')}
              className="w-full py-3.5 bg-[#0B70AD] text-white font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center space-x-2"
            >
              <span>[ INISIASI KONSULTASI REKAYASA ]</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
