import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Check, Compass, Layers, Wrench, Cpu, Activity, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * LayananSection — Son Daven-Grade Large Visual Feature Chapters
 * Replaces generic card rows with 4 large-scale architectural feature presentations.
 * Alternates between widescreen visual-led and text-led editorial compositions
 * with authentic high-resolution architectural assets and restrained parallax.
 */
export default function LayananSection({ onOpenConsultation }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax reveals for large feature images
      const features = gsap.utils.toArray('.service-feature-card');
      features.forEach((feat) => {
        const img = feat.querySelector('.service-feature-img');
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.08, yPercent: -4 },
            {
              scale: 1.0,
              yPercent: 4,
              ease: 'none',
              scrollTrigger: {
                trigger: feat,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="layanan"
      ref={sectionRef}
      className="relative w-full bg-[#070E1A] text-[#F8FAFC] py-32 md:py-44 px-6 md:px-14 border-t border-white/10 z-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header: Monumental Editorial Scale */}
        <div className="border-b border-white/15 pb-12 mb-24">
          <div className="flex items-center space-x-3 mb-6 font-mono text-xs text-[#0B70AD] tracking-widest uppercase font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#0B70AD]" />
            <span>[ 05 // INDEKS LAYANAN & KAPABILITAS REKAYASA ]</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
            <div className="lg:col-span-8">
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] font-normal">
                Layanan Rekayasa.
                <span className="block text-[#0B70AD] italic font-light">
                  Solusi Terukur Berkelanjutan.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-4">
              <p className="font-sans text-base md:text-lg text-white/75 font-light leading-relaxed">
                Empat pilar kapabilitas teknis modular dari konsep perancangan awal, analisis beban numerik, hingga komisioning operasional di lapangan.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            FEATURE 01: PERANCANGAN REKAYASA & PEMODELAN PRESISI
            Layout: Widescreen Panoramic Architectural Elevation Spread (render-2.webp)
            ========================================================================= */}
        <div className="service-feature-card mb-36 border-b border-white/10 pb-28">
          <div className="flex items-center space-x-3 mb-6 font-mono text-xs text-[#0B70AD] tracking-widest uppercase font-semibold">
            <span>[ BAB 01 // DESAIN & PERANCANGAN STRUKTURAL ]</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-8">
            <div className="lg:col-span-7">
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight font-normal leading-tight">
                Perancangan Rekayasa & Pemodelan Presisi
              </h3>
            </div>
            <div className="lg:col-span-5 font-mono text-xs text-white/50 tracking-wider">
              LINGKUP: TAHAP PRA-DESAIN HINGGA FINAL ENGINEERING DESIGN (FED)
            </div>
          </div>

          {/* Widescreen Image Stage with Architectural Telemetry */}
          <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] overflow-hidden bg-[#0D192E] border border-white/15 mb-10 group select-none">
            <img
              src="/assets/render-2.webp"
              alt="Perancangan Rekayasa & Elevasi Struktural"
              className="service-feature-img w-full h-full object-cover opacity-90 transition-opacity duration-700 group-hover:opacity-100"
            />
            {/* Top Coordinate Badge */}
            <div className="absolute top-4 left-4 bg-[#070E1A]/80 backdrop-blur-md px-3 py-1.5 border border-white/15 font-mono text-[10px] text-white/80 tracking-widest uppercase">
              ELEVASI FASAD &bull; MODEL STRUKTURAL 3D
            </div>
            {/* Bottom Coordinate Crosshairs */}
            <div className="absolute bottom-4 right-4 bg-[#070E1A]/80 backdrop-blur-md px-3 py-1.5 border border-white/15 font-mono text-[10px] text-[#0B70AD] tracking-widest uppercase">
              [ REF-CAD // SINTESIS GEOMETRI TERKOMPUTASI ]
            </div>
          </div>

          {/* 2-Column Detail Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-4">
              <p className="font-sans text-base text-white/80 font-light leading-relaxed">
                Penyusunan model geometri 3D parametrik terkoordinasi, kalkulasi distribusi beban statis maupun dinamis, serta verifikasi toleransi struktural untuk memastikan kelayakan teknis sebelum tahap fabrikasi dan konstruksi fisik.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onOpenConsultation('Perancangan Rekayasa & Pemodelan Presisi')}
                  className="inline-flex items-center space-x-2 bg-[#0B70AD] hover:bg-white hover:text-[#070E1A] text-white px-6 py-3 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer font-bold border border-[#0B70AD]"
                >
                  <span>[ INISIASI KONSULTASI DESAIN ]</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3 font-mono text-xs text-white/70">
              <div className="border-t border-white/10 pt-2 flex items-start space-x-3">
                <span className="text-[#0B70AD] font-bold">✦</span>
                <span>Pemodelan & visualisasi 3D geometri struktural terintegrasi</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex items-start space-x-3">
                <span className="text-[#0B70AD] font-bold">✦</span>
                <span>Validasi kalkulasi kapasitas beban & batas toleransi deviasi</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex items-start space-x-3">
                <span className="text-[#0B70AD] font-bold">✦</span>
                <span>Penyusunan berkas spesifikasi teknis & gambar kerja detail CAD</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            FEATURE 02: KONSULTASI TEKNIS & MANAJEMEN SOLUSI
            Layout: Asymmetric 2-Column with Vertical Fin Detail (render-7.webp)
            ========================================================================= */}
        <div className="service-feature-card mb-36 border-b border-white/10 pb-28">
          <div className="flex items-center space-x-3 mb-6 font-mono text-xs text-[#0B70AD] tracking-widest uppercase font-semibold">
            <span>[ BAB 02 // ADVISORI TEKNIK & EVALUASI ]</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column (6 cols): Editorial Text & Advisory Matrix */}
            <div className="lg:col-span-6 space-y-8 order-2 lg:order-1">
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight font-normal leading-tight">
                Konsultasi Teknis & Manajemen Solusi
              </h3>

              <p className="font-sans text-base text-white/80 font-light leading-relaxed">
                Memberikan pendampingan strategis independen melalui kajian kelayakan teknis, mitigasi risiko metodologis, serta audit kepatuhan terhadap regulasi dan baku mutu industri rekayasa terkini.
              </p>

              <div className="space-y-4 font-mono text-xs border-y border-white/10 py-6 text-white/70">
                <div className="flex items-center justify-between">
                  <span className="text-white/50">FOKUS KAJIAN:</span>
                  <span className="text-white font-medium">Studi Kelayakan & Penilaian Risiko</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">AUDIT MUTU:</span>
                  <span className="text-[#0B70AD] font-medium">Kepatuhan Standar Teknis Industri</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">PILIHAN MATERIAL:</span>
                  <span className="text-white font-medium">Optimalisasi Efisiensi & Durabilitas</span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => onOpenConsultation('Konsultasi Teknis & Manajemen Solusi')}
                  className="inline-flex items-center space-x-2 border border-white/20 hover:border-[#0B70AD] bg-[#0D192E] hover:bg-[#0B70AD] text-white px-6 py-3 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer font-bold"
                >
                  <span>[ KONSULTASIKAN ADVISORI ]</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

            {/* Right Column (6 cols): Vertical Structural Fin Facade Image (render-7.webp) */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#0D192E] border border-white/15 select-none group">
                <img
                  src="/assets/render-7.webp"
                  alt="Detail Sirip Struktur & Fasad"
                  className="service-feature-img w-full h-full object-cover opacity-90 transition-opacity duration-700 group-hover:opacity-100"
                />
                <div className="absolute top-4 right-4 bg-[#070E1A]/80 backdrop-blur-md px-3 py-1.5 border border-white/15 font-mono text-[10px] text-white/80 tracking-widest uppercase">
                  MODUL STRUKTURAL // TOLERANSI PRESISI
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            FEATURE 03: INTEGRASI SISTEM & EVALUASI LAPANGAN
            Layout: Full Perspective with Stone Arcade Walkway Bridge (render-6.webp)
            ========================================================================= */}
        <div className="service-feature-card mb-36 border-b border-white/10 pb-28">
          <div className="flex items-center space-x-3 mb-6 font-mono text-xs text-[#0B70AD] tracking-widest uppercase font-semibold">
            <span>[ BAB 03 // SINKRONISASI SISTEM & PENGUJIAN MEDAN ]</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-8">
            <div className="lg:col-span-8">
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight font-normal leading-tight">
                Integrasi Sistem & Evaluasi Lapangan
              </h3>
            </div>
            <div className="lg:col-span-4 font-mono text-xs text-white/50 tracking-wider">
              TAHAP PEMASANGAN, INTEGRASI & KOMISIONING
            </div>
          </div>

          {/* Large Perspective Image Stage */}
          <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] overflow-hidden bg-[#0D192E] border border-white/15 mb-10 group select-none">
            <img
              src="/assets/render-6.webp"
              alt="Integrasi Sistem & Evaluasi Lapangan"
              className="service-feature-img w-full h-full object-cover opacity-90 transition-opacity duration-700 group-hover:opacity-100"
            />
            <div className="absolute bottom-4 left-4 bg-[#070E1A]/80 backdrop-blur-md px-3 py-1.5 border border-white/15 font-mono text-[10px] text-white/80 tracking-widest uppercase">
              KOORDINASI ANTARMUKA FISIK &bull; JEMBATAN PENGHUBUNG STRUKTUR
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-4">
              <p className="font-sans text-base text-white/80 font-light leading-relaxed">
                Penyelarasan antarmuka antardisiplin ilmu (struktural, mekanis, dan instrumentasi) guna memastikan seluruh komponen bekerja dalam harmoni sistemik tanpa benturan teknis di lapangan.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onOpenConsultation('Integrasi Sistem & Evaluasi Lapangan')}
                  className="inline-flex items-center space-x-2 bg-[#0B70AD] hover:bg-white hover:text-[#070E1A] text-white px-6 py-3 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer font-bold border border-[#0B70AD]"
                >
                  <span>[ KONSULTASIKAN INTEGRASI SISTEM ]</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3 font-mono text-xs text-white/70">
              <div className="border-t border-white/10 pt-2 flex items-start space-x-3">
                <span className="text-[#0B70AD] font-bold">✦</span>
                <span>Integrasi antarmuka mekanis, struktural, & instrumentasi</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex items-start space-x-3">
                <span className="text-[#0B70AD] font-bold">✦</span>
                <span>Protokol uji beban dinamis & validasi performa lapangan</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex items-start space-x-3">
                <span className="text-[#0B70AD] font-bold">✦</span>
                <span>Penyusunan panduan operasional & pemeliharaan berkala</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            FEATURE 04: RISET TERAPAN & REKAYASA ADAPTIF
            Layout: Asymmetric Spread with Stepped Natural Facade (render-1.webp)
            ========================================================================= */}
        <div className="service-feature-card mb-20">
          <div className="flex items-center space-x-3 mb-6 font-mono text-xs text-[#0B70AD] tracking-widest uppercase font-semibold">
            <span>[ BAB 04 // INOVASI & REKAYASA ADAPTIF ]</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Image: Vertical Stepped Architecture Embedded in Topography */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#0D192E] border border-white/15 select-none group">
                <img
                  src="/assets/render-1.webp"
                  alt="Riset Terapan Rekayasa Adaptif"
                  className="service-feature-img w-full h-full object-cover opacity-90 transition-opacity duration-700 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4 bg-[#070E1A]/80 backdrop-blur-md px-3 py-1.5 border border-white/15 font-mono text-[10px] text-white/80 tracking-widest uppercase">
                  INTEGRASI TOPOGRAFI &bull; STRUKTUR BERTINGKAT
                </div>
              </div>
            </div>

            {/* Right Narrative: Custom Computational Engineering */}
            <div className="lg:col-span-7 space-y-8">
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight font-normal leading-tight">
                Riset Terapan & Rekayasa Adaptif
              </h3>

              <p className="font-sans text-base text-white/80 font-light leading-relaxed">
                Pengembangan formulasi rekayasa kustom untuk tantangan non-konvensional: integrasi struktur terhadap topografi kompleks, simulasi numerik respons material terhadap variabel cuaca ekstrem, dan optimasi efisiensi jangka panjang.
              </p>

              <div className="space-y-3 font-mono text-xs text-white/70">
                <div className="border-t border-white/10 pt-3 flex items-start space-x-3">
                  <span className="text-[#C91C22] font-bold">✦</span>
                  <span>Riset formulasi teknis spesifik untuk tantangan medan ekstrem</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex items-start space-x-3">
                  <span className="text-[#C91C22] font-bold">✦</span>
                  <span>Simulasi numerik ketahanan material terhadap degradasi lingkungan</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex items-start space-x-3">
                  <span className="text-[#C91C22] font-bold">✦</span>
                  <span>Studi optimasi efisiensi energi & adaptabilitas daur hidup proyek</span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => onOpenConsultation('Riset Terapan & Rekayasa Adaptif')}
                  className="inline-flex items-center space-x-2 bg-[#0B70AD] hover:bg-white hover:text-[#070E1A] text-white px-6 py-3 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer font-bold border border-[#0B70AD]"
                >
                  <span>[ EKSPLORASI RISET TERAPAN ]</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Staging Portal Anchor: Transition into Pinned Horizontal Engineering Story */}
        <div className="border-t border-white/10 pt-16 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-white/50">
          <div className="flex items-center space-x-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B70AD] animate-pulse" />
            <span className="tracking-widest uppercase">TRANSISI KE ALUR METODOLOGI TERPIN</span>
          </div>
          <a
            href="#proses"
            className="flex items-center space-x-2 text-[#0B70AD] hover:text-white transition-colors uppercase tracking-wider"
          >
            <span>MASUKI 5 FASE REKAYASA</span>
            <span>&darr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
