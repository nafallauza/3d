import React from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Cpu, GitCommit } from 'lucide-react';

export default function AboutSection({ onOpenConsultation }) {
  return (
    <section id="tentang" className="relative w-full bg-[#0D192E] text-[#F8FAFC] py-28 md:py-36 px-6 md:px-14 border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="border-b border-white/15 pb-10 mb-16">
          <div className="flex items-center space-x-3 mb-4 font-mono text-xs text-[#0B70AD] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#0B70AD]" />
            <span>[ 02 / IDENTITAS & PENDEKATAN ]</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-tight">
                Tentang Kami
              </h2>
              <div className="font-mono text-xs md:text-sm tracking-widest text-[#0B70AD] uppercase mt-3">
                PENDEKATAN REKAYASA TERSTRUKTUR & ADAPTIF
              </div>
            </div>

            <p className="font-sans text-sm md:text-base text-white/70 max-w-xl font-light leading-relaxed">
              Tara Rekayasa dibangun di atas fondasi integritas teknis, disiplin analisis mendalam, dan ketangkasan adaptasi untuk menjawab kompleksitas kebutuhan rekayasa modern.
            </p>
          </div>
        </div>

        {/* 2 Column Editorial Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Left Column: Filosofi Kerja */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif text-2xl md:text-3xl text-white tracking-tight">
              Presisi yang Terukur, Inovasi yang Berdampak
            </h3>

            <p className="font-sans text-sm md:text-base text-white/75 leading-relaxed font-light">
              Kami percaya bahwa keberhasilan setiap rancang bangun dan pemecahan masalah rekayasa berakar dari ketelitian dalam detail terkecil. Setiap perhitungan, pemodelan, dan keputusan struktural didasarkan pada metodologi valid yang dapat diuji dan dipertanggungjawabkan.
            </p>

            <p className="font-sans text-sm md:text-base text-white/75 leading-relaxed font-light">
              Di saat yang sama, dunia rekayasa terus bergerak dinamis. Tara Rekayasa memadukan kepatuhan terhadap standar teknis yang ketat dengan cara berpikir inovatif dan fleksibel, memungkinkan kami menghasilkan solusi yang tidak hanya kokoh, tetapi juga adaptif terhadap perkembangan teknologi dan kebutuhan lapangan.
            </p>

            <div className="pt-4">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center space-x-2 border border-[#0B70AD] hover:border-white bg-[#1B3459]/50 hover:bg-[#0B70AD] text-white px-5 py-3 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer"
              >
                <span>[ KONSULTASIKAN KEBUTUHAN REKAYASA ]</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Pilar Pendekatan */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#070E1A] p-6 border border-white/10 hover:border-[#0B70AD]/60 transition-all">
              <div className="font-mono text-xs text-[#0B70AD] mb-3">[ 01 ]</div>
              <h4 className="font-serif text-xl text-white mb-2">Ketelitian Detail</h4>
              <p className="font-sans text-xs text-white/60 leading-relaxed font-light">
                Perhatian penuh terhadap toleransi teknis, integritas kalkulasi, dan konsistensi spesifikasi di setiap tahap implementasi.
              </p>
            </div>

            <div className="bg-[#070E1A] p-6 border border-white/10 hover:border-[#0B70AD]/60 transition-all">
              <div className="font-mono text-xs text-[#0B70AD] mb-3">[ 02 ]</div>
              <h4 className="font-serif text-xl text-white mb-2">Inovasi Terarah</h4>
              <p className="font-sans text-xs text-white/60 leading-relaxed font-light">
                Pemanfaatan teknologi pemodelan 3D dan komputasi terkini untuk mengoptimalkan efisiensi dan kualitas luaran.
              </p>
            </div>

            <div className="bg-[#070E1A] p-6 border border-white/10 hover:border-[#C91C22]/60 transition-all">
              <div className="font-mono text-xs text-[#C91C22] mb-3">[ 03 ]</div>
              <h4 className="font-serif text-xl text-white mb-2">Struktur Adaptif</h4>
              <p className="font-sans text-xs text-white/60 leading-relaxed font-light">
                Fleksibilitas metodologis yang responsif terhadap variabel lapangan, batasan operasional, serta kebutuhan klien.
              </p>
            </div>

            <div className="bg-[#070E1A] p-6 border border-white/10 hover:border-white/60 transition-all">
              <div className="font-mono text-xs text-white/50 mb-3">[ 04 ]</div>
              <h4 className="font-serif text-xl text-white mb-2">Kolaborasi Terbuka</h4>
              <p className="font-sans text-xs text-white/60 leading-relaxed font-light">
                Membangun sinergi transparan dengan mitra lintas disiplin demi menghasilkan solusi rekayasa holistik.
              </p>
            </div>
          </div>
        </div>

        {/* Engineering Metric Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/15 pt-10 font-mono">
          <div>
            <div className="text-2xl md:text-4xl font-serif text-[#0B70AD] font-bold">100%</div>
            <div className="text-[11px] text-white/60 uppercase mt-1 tracking-wider">Komitmen Presisi</div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-serif text-white font-bold">Terstruktur</div>
            <div className="text-[11px] text-white/60 uppercase mt-1 tracking-wider">Metodologi Kerja</div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-serif text-[#C91C22] font-bold">Adaptif</div>
            <div className="text-[11px] text-white/60 uppercase mt-1 tracking-wider">Respon Tantangan</div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-serif text-white font-bold">Sinergis</div>
            <div className="text-[11px] text-white/60 uppercase mt-1 tracking-wider">Kemitraan Lintas Disiplin</div>
          </div>
        </div>
      </div>
    </section>
  );
}