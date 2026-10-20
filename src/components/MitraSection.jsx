import React from 'react';
import { Handshake, ArrowUpRight, Building2, Cpu, Wrench, Shield } from 'lucide-react';

export default function MitraSection({ onOpenConsultation }) {
  const categories = [
    {
      sector: 'Industri Manufaktur & Fabrikasi',
      code: 'SEC-01',
      slots: ['Mitra Industri 01', 'Mitra Industri 02', 'Mitra Industri 03'],
    },
    {
      sector: 'Infrastruktur & Konstruksi',
      code: 'SEC-02',
      slots: ['Mitra Infrastruktur 01', 'Mitra Infrastruktur 02', 'Mitra Infrastruktur 03'],
    },
    {
      sector: 'Lembaga Riset & Teknologi',
      code: 'SEC-03',
      slots: ['Mitra Riset 01', 'Mitra Riset 02', 'Mitra Riset 03'],
    },
    {
      sector: 'Konsultan & Mitra Rekayasa Spesialis',
      code: 'SEC-04',
      slots: ['Mitra Spesialis 01', 'Mitra Spesialis 02', 'Mitra Spesialis 03'],
    },
  ];

  return (
    <section id="mitra" className="relative w-full bg-[#0D192E] text-[#F8FAFC] py-28 md:py-36 px-6 md:px-14 border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="border-b border-white/15 pb-10 mb-16">
          <div className="flex items-center space-x-3 mb-4 font-mono text-xs text-[#0B70AD] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#0B70AD]" />
            <span>[ 06 / KOLABORASI & EKOSISTEM ]</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-tight">
                Mitra & Kolaborasi
              </h2>
              <div className="font-mono text-xs md:text-sm tracking-widest text-[#0B70AD] uppercase mt-3">
                JARINGAN EKOSISTEM REKAYASA TERBUKA
              </div>
            </div>

            <p className="font-sans text-sm md:text-base text-white/70 max-w-xl font-light leading-relaxed">
              Kami membuka ruang kolaborasi seluas-luasnya dengan institusi industri, lembaga riset, dan pelaku profesional untuk membangun sinergi rekayasa yang berkelanjutan.
            </p>
          </div>
        </div>

        {/* Structured Partner Ecosystem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-[#070E1A] border border-white/10 p-8 hover:border-[#0B70AD]/40 transition-all"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 font-mono text-xs">
                <span className="text-white font-medium">{cat.sector}</span>
                <span className="text-[#0B70AD]">[ {cat.code} ]</span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {cat.slots.map((slot, sIdx) => (
                  <div
                    key={sIdx}
                    className="h-24 bg-[#0D192E]/60 border border-dashed border-white/15 rounded flex flex-col items-center justify-center p-3 text-center group hover:border-[#0B70AD]/60 transition-colors"
                  >
                    <span className="font-mono text-[9px] text-white/40 tracking-wider group-hover:text-[#0B70AD] transition-colors">
                      [ LOGO MITRA ]
                    </span>
                    <span className="font-sans text-[10px] text-white/60 mt-1">
                      Tersedia
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Collaborate Banner */}
        <div className="bg-[#1B3459]/40 border border-[#0B70AD]/40 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-mono text-xs text-[#0B70AD] uppercase tracking-widest mb-2">
              [ BERGABUNG DALAM EKOSISTEM ]
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-white font-medium mb-2">
              Tertarik Bermitra dengan Tara Rekayasa?
            </h3>
            <p className="font-sans text-xs md:text-sm text-white/70 font-light max-w-2xl">
              Kami menyambut kolaborasi strategis untuk proyek rekayasa terstruktur, riset terapan bersama, maupun implementasi teknologi presisi.
            </p>
          </div>

          <button
            onClick={onOpenConsultation}
            className="shrink-0 bg-[#0B70AD] hover:bg-white hover:text-[#070E1A] text-white px-6 py-3.5 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer border border-[#0B70AD] flex items-center space-x-2 font-semibold"
          >
            <span>[ AJUKAN KEMITRAAN ]</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}