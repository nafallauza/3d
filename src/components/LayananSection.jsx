import React, { useState } from 'react';
import { ArrowUpRight, Check, Layers, Cpu, Compass, FileCheck } from 'lucide-react';

export default function LayananSection({ onOpenConsultation }) {
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      num: '01',
      title: 'Perancangan Rekayasa & Pemodelan Presisi',
      tagline: 'Desain teknis mendalam dengan kalkulasi presisi tinggi',
      overview:
        'Layanan perancangan berbasis pemodelan 3D terkomputasi, analisis beban, dan sintesis desain struktural yang mengutamakan akurasi spesifikasi dan efisiensi material.',
      deliverables: [
        'Pemodelan dan visualisasi teknis 3D struktural',
        'Analisis toleransi dan validasi kalkulasi beban',
        'Dokumentasi teknis rancang bangun presisi',
        'Penyelarasan parameter desain dengan standar industri',
      ],
      scope: 'Tahap Perencanaan & Perancangan Konseptual hingga Detail',
    },
    {
      num: '02',
      title: 'Konsultasi Teknis & Manajemen Solusi',
      tagline: 'Pendampingan terstruktur untuk memastikan integritas rekayasa',
      overview:
        'Memberikan tinjauan independen, studi kelayakan, mitigasi risiko teknis, dan arahan metodologis untuk memastikan setiap tahapan proyek berjalan sesuai kaidah rekayasa terbaik.',
      deliverables: [
        'Studi kelayakan teknis & analisis risiko proyek',
        'Evaluasi kepatuhan spesifikasi dan standar mutu',
        'Pendampingan teknis dan supervisi metodologis',
        'Rekomendasi optimasi alur kerja dan mitigasi kendala',
      ],
      scope: 'Tahap Pra-Eksekusi, Supervisi, & Audit Mutu',
    },
    {
      num: '03',
      title: 'Integrasi Sistem & Evaluasi Lapangan',
      tagline: 'Penyelarasan multidisiplin untuk performa operasional optimal',
      overview:
        'Memastikan seluruh subsistem teknis terhubung secara kohesif, adaptif terhadap variabel operasional riil di lapangan, dan siap beroperasi dengan keandalan maksimal.',
      deliverables: [
        'Sinkronisasi antarmuka antarsistem rekayasa',
        'Uji validasi performa dan simulasi skenario operasional',
        'Pemecahan masalah (troubleshooting) teknis di lapangan',
        'Protokol pemeliharaan dan keberlanjutan fungsi',
      ],
      scope: 'Tahap Implementasi, Integrasi, & Komisioning',
    },
    {
      num: '04',
      title: 'Riset Terapan & Rekayasa Adaptif',
      tagline: 'Eksplorasi inovasi untuk tantangan teknis kompleks',
      overview:
        'Pengembangan pendekatan inovatif untuk tantangan teknis yang membutuhkan solusi kustom di luar formula konvensional, memadukan riset terapan dengan eksekusi aplikatif.',
      deliverables: [
        'Riset pemecahan masalah kustom non-standar',
        'Simulasi komputasi dinamika dan respons struktural',
        'Prototipe uji konsep dan verifikasi eksperimental',
        'Rekomendasi material dan metode adaptif mutakhir',
      ],
      scope: 'Tahap Eksplorasi Inovasi & Pengembangan Kustom',
    },
  ];

  return (
    <section id="layanan" className="relative w-full bg-[#0D192E] text-[#F8FAFC] py-28 md:py-36 px-6 md:px-14 border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="border-b border-white/15 pb-10 mb-16">
          <div className="flex items-center space-x-3 mb-4 font-mono text-xs text-[#0B70AD] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#0B70AD]" />
            <span>[ 04 / KAPABILITAS & LINGKUP KERJA ]</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-tight">
                Layanan Rekayasa
              </h2>
              <div className="font-mono text-xs md:text-sm tracking-widest text-[#0B70AD] uppercase mt-3">
                SOLUSI TERSTRUKTUR DARI KONSEP HINGGA IMPLEMENTASI
              </div>
            </div>

            <p className="font-sans text-sm md:text-base text-white/70 max-w-xl font-light leading-relaxed">
              Seluruh lingkup layanan dirancang modular dan mudah diselaraskan dengan kebutuhan spesifik proyek, mengutamakan validasi terukur dan transparansi metodologi.
            </p>
          </div>
        </div>

        {/* Interactive Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Services Navigation Selector (Left 4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            {services.map((item, idx) => (
              <button
                key={item.num}
                onClick={() => setActiveTab(idx)}
                className={`w-full text-left p-5 border transition-all cursor-pointer flex items-baseline justify-between ${
                  activeTab === idx
                    ? 'bg-[#1B3459] border-[#0B70AD] text-white shadow-md'
                    : 'bg-[#070E1A]/80 border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                }`}
              >
                <div>
                  <span className="font-mono text-xs text-[#0B70AD] block mb-1">
                    [ {item.num} ]
                  </span>
                  <span className="font-serif text-base md:text-lg font-medium leading-snug block">
                    {item.title}
                  </span>
                </div>
                <span className={`text-xs ml-2 ${activeTab === idx ? 'text-[#0B70AD]' : 'text-white/30'}`}>
                  →
                </span>
              </button>
            ))}
          </div>

          {/* Active Service Detailed Card (Right 8 cols) */}
          <div className="lg:col-span-8 bg-[#070E1A] border border-white/10 p-8 md:p-12 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 font-mono text-xs">
              <span className="text-[#0B70AD] font-semibold tracking-wider">
                [ LINGKUP LAYANAN #{services[activeTab].num} ]
              </span>
              <span className="text-white/50 tracking-wider">
                {services[activeTab].scope}
              </span>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl text-white mb-3 font-bold">
              {services[activeTab].title}
            </h3>

            <div className="font-mono text-xs text-[#0B70AD] mb-6 tracking-wide">
              {services[activeTab].tagline}
            </div>

            <p className="font-sans text-sm md:text-base text-white/75 leading-relaxed font-light mb-8">
              {services[activeTab].overview}
            </p>

            <div className="border-t border-white/10 pt-6 mb-8">
              <div className="font-mono text-xs text-white/50 uppercase tracking-widest mb-4">
                [ LUARAN & KOMPONEN KERJA UTAMA ]
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services[activeTab].deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-start space-x-2 text-xs text-white/80 font-light">
                    <Check size={14} className="text-[#0B70AD] shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="font-mono text-[11px] text-white/50">
                * Spesifikasi teknis terperinci dapat disesuaikan per kontrak kerja.
              </div>
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#0B70AD] hover:bg-[#1B3459] text-white px-6 py-3 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer border border-[#0B70AD]"
              >
                <span>[ DISKUSIKAN LAYANAN INI ]</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}