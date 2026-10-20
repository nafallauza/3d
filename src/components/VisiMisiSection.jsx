import React from 'react';
import { Target, Compass, Sparkles, ShieldCheck, ChevronRight } from 'lucide-react';

export default function VisiMisiSection() {
  const misiItems = [
    {
      num: '01',
      title: 'Presisi & Kualitas Tanpa Kompromi',
      desc: 'Menerapkan standar ketelitian tinggi dalam setiap tahap kalkulasi, perancangan, dan evaluasi teknis guna menghasilkan luaran rekayasa yang teruji.',
      tag: 'STANDAR TEKNIS',
    },
    {
      num: '02',
      title: 'Inovasi Rekayasa yang Berkelanjutan',
      desc: 'Mengintegrasikan teknologi pemodelan modern dan metode mutakhir yang adaptif terhadap dinamika industri dan efisiensi sumber daya.',
      tag: 'METODOLOGI MAJU',
    },
    {
      num: '03',
      title: 'Kolaborasi & Kemitraan Sinergis',
      desc: 'Membangun komunikasi transparan dan kerja sama erat dengan klien serta mitra lintas disiplin untuk memecahkan tantangan rekayasa secara holistik.',
      tag: 'SINERGI TERBUKA',
    },
    {
      num: '04',
      title: 'Dampak Nyata & Solutif',
      desc: 'Menghadirkan solusi teknis aplikatif yang memberikan nilai tambah terukur, aman, dan dapat diimplementasikan secara konkret di lapangan.',
      tag: 'EKSEKUSI NYATA',
    },
  ];

  return (
    <section id="visi-misi" className="relative w-full bg-[#070E1A] text-[#F8FAFC] py-28 md:py-36 px-6 md:px-14 border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="border-b border-white/15 pb-10 mb-16">
          <div className="flex items-center space-x-3 mb-4 font-mono text-xs text-[#0B70AD] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#0B70AD]" />
            <span>[ 05 / LANDASAN STRATEGIS ]</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-tight">
                Visi & Misi
              </h2>
              <div className="font-mono text-xs md:text-sm tracking-widest text-[#0B70AD] uppercase mt-3">
                ARAH STRATEGIS & KOMITMEN JANGKA PANJANG
              </div>
            </div>

            <p className="font-sans text-sm md:text-base text-white/70 max-w-xl font-light leading-relaxed">
              Prinsip panduan yang mendasari setiap keputusan teknis dan operasional Tara Rekayasa dalam membangun masa depan rekayasa yang berintegritas.
            </p>
          </div>
        </div>

        {/* VISI BOX (Large Featured Card) */}
        <div className="bg-[#0D192E] border border-white/15 p-8 md:p-14 mb-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-[#0B70AD]/40 pointer-events-none" />

          <div className="flex items-center space-x-3 mb-6">
            <span className="font-mono text-xs text-[#0B70AD] tracking-widest uppercase border border-[#0B70AD]/40 px-3 py-1 bg-[#1B3459]/40">
              [ VISI KAMI ]
            </span>
            <span className="font-mono text-[10px] text-white/40 tracking-wider">
              * DRAF RESMI — SIAP DISESUAIKAN DENGAN STATUTA PERUSAHAAN
            </span>
          </div>

          <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-6">
            “Menjadi mitra rekayasa terdepan yang menghadirkan solusi presisi, inovatif, dan berkelanjutan, serta memberikan dampak nyata bagi kemajuan industri modern.”
          </h3>

          <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10 font-mono text-xs text-white/60">
            <div className="flex items-center space-x-2">
              <span className="text-[#0B70AD]">✦</span>
              <span>Presisi Terukur</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#C91C22]">✦</span>
              <span>Keberlanjutan Sistem</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white">✦</span>
              <span>Integritas Rekayasa</span>
            </div>
          </div>
        </div>

        {/* MISI GRID (4 Cards) */}
        <div>
          <div className="flex items-center space-x-3 mb-8 font-mono text-xs text-white/60 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C91C22]" />
            <span>[ EMPAT PILAR MISI STRATEGIS ]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {misiItems.map((item) => (
              <div
                key={item.num}
                className="bg-[#070E1A] border border-white/10 p-6 flex flex-col justify-between hover:border-[#0B70AD]/50 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 font-mono text-xs">
                    <span className="text-[#0B70AD] font-semibold">[ {item.num} ]</span>
                    <span className="text-white/40 text-[10px] tracking-wider">{item.tag}</span>
                  </div>
                  <h4 className="font-serif text-lg text-white mb-3 font-medium group-hover:text-[#0B70AD] transition-colors">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs text-white/70 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-white/40">
                  <span>KOMITMEN EKSEKUSI</span>
                  <span className="text-[#0B70AD]">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}