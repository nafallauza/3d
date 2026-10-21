import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Handshake, ShieldCheck, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function MitraSection({ onOpenConsultation }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const marqueeRef = useRef(null);

  // Strategic Collaboration Sectors & Disciplines
  const collaborationSectors = [
    { code: 'SEC-01', title: 'Rekayasa Struktur & Konstruksi Sipil' },
    { code: 'SEC-02', title: 'Manufaktur & Fabrikasi Presisi' },
    { code: 'SEC-03', title: 'Pemodelan Parametrik BIM & CAD' },
    { code: 'SEC-04', title: 'Simulasi Dinamis Elemen Hingga (FEM)' },
    { code: 'SEC-05', title: 'Geoteknik & Pengujian Material' },
    { code: 'SEC-06', title: 'Instrumentasi, Sensorika & Otomasi' },
  ];

  const partnershipNodes = [
    { node: 'NODE-A', label: 'Konsorsium Riset & Pengembangan Terapan' },
    { node: 'NODE-B', label: 'Kemitraan Fabrikasi Komponen Industri' },
    { node: 'NODE-C', label: 'Supervisi Teknis & Manajemen Solusi Lapangan' },
    { node: 'NODE-D', label: 'Integrasi Pemantauan Struktural Digital' },
    { node: 'NODE-E', label: 'Audit Kelayakan & Pengujian Komisioning' },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        marqueeRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="mitra"
      ref={sectionRef}
      className="relative w-full bg-[#070E1A] text-[#F8FAFC] py-32 md:py-40 px-6 md:px-14 border-t border-white/10 z-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* =========================================================================
            EDITORIAL COLLABORATION STATEMENT
            ========================================================================= */}
        <div ref={headerRef} className="border-b border-white/15 pb-14 mb-16">
          <div className="flex items-center space-x-3 mb-6 font-mono text-xs text-[#0B70AD] tracking-widest uppercase font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#0B70AD] animate-pulse" />
            <span>[ 08 // RUANG KOLABORASI &bull; EKOSISTEM REKAYASA ]</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12] font-normal">
                Membangun Ekosistem Rekayasa Melalui Sinergi & Kemitraan Strategis.
              </h2>
              <p className="font-sans text-base md:text-lg text-white/75 font-light leading-relaxed max-w-2xl pt-2">
                Tara Rekayasa senantiasa membuka ruang kerja sama terstruktur bersama para pelaku industri manufaktur, kontraktor infrastruktur, konsultan perencana, dan lembaga riset. Melalui sinergi keahlian multidisiplin, setiap inisiatif dikembangkan dengan ketepatan analisis teknis dan standar eksekusi yang akuntabel.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4">
              <button
                onClick={() => onOpenConsultation('kemitraan')}
                className="inline-flex items-center space-x-2 bg-[#0B70AD] hover:bg-white hover:text-[#070E1A] text-white px-7 py-3.5 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer font-bold border border-[#0B70AD] shadow-lg shadow-[#0B70AD]/20"
              >
                <span>[ AJUKAN KEMITRAAN ]</span>
                <ArrowUpRight size={14} />
              </button>

              <div className="font-mono text-[10px] text-white/40 tracking-wider">
                DIALOG AWAL &bull; PENJAJAKAN SINERGI
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            TASTEFUL CONTINUOUS MARQUEE LOOP
            Minimal, typographic showcase ready for authentic partner logos
            ========================================================================= */}
        <div ref={marqueeRef} className="space-y-6 mb-16">
          <div className="flex items-center justify-between font-mono text-[11px] text-white/40 pb-2">
            <span>BIDANG KOLABORASI STRATEGIS // ETALASE KEMITRAAN</span>
            <span className="text-[#0B70AD]">[ STATUS: MENUNGGU VERIFIKASI ASET RESMI ]</span>
          </div>

          {/* Marquee Row 1: Leftward Stream */}
          <div className="relative w-full overflow-hidden logo-loop-mask py-3 border-y border-white/10">
            <div className="animate-marquee flex items-center space-x-8 hover:[animation-play-state:paused] cursor-pointer">
              {/* Set A */}
              {collaborationSectors.map((sec, idx) => (
                <div
                  key={`sec-a-${idx}`}
                  className="shrink-0 flex items-center space-x-3 text-white/80 hover:text-white px-4 py-2 border border-white/10 hover:border-[#0B70AD] bg-[#0D192E]/60 transition-colors"
                >
                  <span className="font-mono text-[10px] text-[#0B70AD] font-bold">[{sec.code}]</span>
                  <span className="font-serif text-sm tracking-wide">{sec.title}</span>
                  <span className="text-white/20 text-xs">✦</span>
                </div>
              ))}
              {/* Set B (Duplicate for continuous loop) */}
              {collaborationSectors.map((sec, idx) => (
                <div
                  key={`sec-b-${idx}`}
                  className="shrink-0 flex items-center space-x-3 text-white/80 hover:text-white px-4 py-2 border border-white/10 hover:border-[#0B70AD] bg-[#0D192E]/60 transition-colors"
                >
                  <span className="font-mono text-[10px] text-[#0B70AD] font-bold">[{sec.code}]</span>
                  <span className="font-serif text-sm tracking-wide">{sec.title}</span>
                  <span className="text-white/20 text-xs">✦</span>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2: Rightward Stream */}
          <div className="relative w-full overflow-hidden logo-loop-mask py-3 border-b border-white/10">
            <div className="animate-marquee-reverse flex items-center space-x-8 hover:[animation-play-state:paused] cursor-pointer">
              {partnershipNodes.map((node, idx) => (
                <div
                  key={`node-a-${idx}`}
                  className="shrink-0 flex items-center space-x-3 text-white/70 hover:text-white px-4 py-2 border border-white/10 hover:border-white/30 bg-[#0A1424]/40 transition-colors"
                >
                  <span className="font-mono text-[10px] text-[#C91C22] font-semibold">[{node.node}]</span>
                  <span className="font-sans text-xs tracking-wide">{node.label}</span>
                  <span className="text-white/20 text-xs">✦</span>
                </div>
              ))}
              {partnershipNodes.map((node, idx) => (
                <div
                  key={`node-b-${idx}`}
                  className="shrink-0 flex items-center space-x-3 text-white/70 hover:text-white px-4 py-2 border border-white/10 hover:border-white/30 bg-[#0A1424]/40 transition-colors"
                >
                  <span className="font-mono text-[10px] text-[#C91C22] font-semibold">[{node.node}]</span>
                  <span className="font-sans text-xs tracking-wide">{node.label}</span>
                  <span className="text-white/20 text-xs">✦</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            TRANSPARENT METADATA FOOTNOTE
            ========================================================================= */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-white/45">
          <div className="flex items-center space-x-2">
            <span className="text-[#0B70AD]">✦</span>
            <span>
              DISKLAIMER KEMITRAAN: Ruang tampilan ini disiapkan untuk memuat identitas logo resmi mitra yang telah menyelesaikan protokol verifikasi kerja sama.
            </span>
          </div>
          <div className="shrink-0 text-white/30">
            [ TARA REKAYASA &bull; PROTOKOL KEMITRAAN 2026 ]
          </div>
        </div>
      </div>
    </section>
  );
}
