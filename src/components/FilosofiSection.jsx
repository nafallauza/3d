import React, { useState } from 'react';
import { Atom, Triangle, Waves, Maximize2, Shield, Sparkles } from 'lucide-react';

export default function FilosofiSection() {
  const [activeElement, setActiveElement] = useState(0);

  const elements = [
    {
      id: 'atom',
      num: '01',
      title: 'Struktur Atom / Ligan',
      essence: 'Presisi & Keterhubungan',
      color: 'text-[#0B70AD]',
      borderColor: 'border-[#0B70AD]',
      bgAccent: 'bg-[#0B70AD]/10',
      description:
        'Representasi ketelitian pada level paling mendasar. Menggambarkan bagaimana setiap komponen kecil dalam rekayasa saling terikat, berinteraksi secara harmonis, dan membentuk kesatuan sistem yang utuh dan presisi.',
      details: [
        'Kalkulasi akurat pada setiap skala komponen',
        'Keterkaitan sistemik antar subsistem rekayasa',
        'Integritas mikro yang menopang keandalan makro',
      ],
    },
    {
      id: 'segitiga',
      num: '02',
      title: 'Formasi Segitiga',
      essence: 'Pertumbuhan & Kestabilan',
      color: 'text-[#1B3459]',
      borderColor: 'border-[#1B3459]',
      bgAccent: 'bg-[#1B3459]/20',
      description:
        'Dalam prinsip geometri rekayasa, segitiga adalah bentuk struktur paling kokoh dan stabil terhadap beban distribusi. Menjadi simbol fondasi yang kokoh sekaligus panah arah pertumbuhan berkelanjutan ke masa depan.',
      details: [
        'Ketahanan struktural terhadap tekanan dinamis',
        'Keseimbangan distribusi beban dan risiko',
        'Fokus arah pertumbuhan yang terencana dan solid',
      ],
    },
    {
      id: 'gelombang',
      num: '03',
      title: 'Garis Gelombang',
      essence: 'Dinamika & Adaptabilitas',
      color: 'text-[#C91C22]',
      borderColor: 'border-[#C91C22]',
      bgAccent: 'bg-[#C91C22]/10',
      description:
        'Menggambarkan kelenturan dan pergerakan energi yang mengalir. Dalam rekayasa, kekakuan absolut dapat menjadi titik kerapuhan; fleksibilitas dan adaptabilitas terhadap dinamika medan adalah kunci ketahanan jangka panjang.',
      details: [
        'Responsivitas terhadap variabel kondisi lapangan',
        'Kelincahan dalam mengadopsi metode baru',
        'Dinamika pemikiran yang tidak mandek',
      ],
    },
    {
      id: 'terbuka',
      num: '04',
      title: 'Ruang Terbuka',
      essence: 'Kolaborasi & Pemikiran Tanpa Batas',
      color: 'text-white',
      borderColor: 'border-white/40',
      bgAccent: 'bg-white/5',
      description:
        'Area spasial di antara elemen-elemen logo melambangkan keterbukaan untuk menerima ide baru, berkolaborasi dengan mitra lintas disiplin, serta keberanian berpikir di luar batas-batas konvensional.',
      details: [
        'Ekosistem terbuka untuk sinergi multipihak',
        'Inovasi yang lahir dari ruang eksplorasi bebas',
        'Penyelesaian masalah secara holistik dan inklusif',
      ],
    },
  ];

  return (
    <section id="filosofi" className="relative w-full bg-[#070E1A] text-[#F8FAFC] py-28 md:py-36 px-6 md:px-14 border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="border-b border-white/15 pb-10 mb-16">
          <div className="flex items-center space-x-3 mb-4 font-mono text-xs text-[#0B70AD] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#C91C22]" />
            <span>[ 03 / MAKNA VISUAL & IDENTITAS ]</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-tight">
                Filosofi Logo
              </h2>
              <div className="font-mono text-xs md:text-sm tracking-widest text-[#0B70AD] uppercase mt-3">
                EMPAT ELEMEN FUNDAMENTAL TARA REKAYASA
              </div>
            </div>

            <p className="font-sans text-sm md:text-base text-white/70 max-w-xl font-light leading-relaxed">
              Setiap goresan dan geometri dalam lambang Tara Rekayasa dirancang bukan sekadar estetika, melainkan manifestasi dari prinsip-prinsip sains rekayasa yang kami junjung tinggi.
            </p>
          </div>
        </div>

        {/* Interactive Layout: Logo Presentation & Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          {/* Left Column: Official Logo Showcase Box */}
          <div className="lg:col-span-5 bg-[#0D192E] border border-white/10 p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-[#0B70AD]/40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-[#C91C22]/40 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-40 h-40 md:w-52 md:h-52 mb-8 p-4 bg-[#070E1A]/80 border border-white/10 rounded-lg flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <img
                  src="/assets/logo-tara-rekayasa.png"
                  alt="Logo Resmi Tara Rekayasa"
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(11,112,173,0.3)]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              <span className="font-mono text-[11px] tracking-[0.25em] text-[#0B70AD] uppercase mb-1">
                TARA REKAYASA
              </span>
              <h3 className="font-serif text-2xl text-white font-bold mb-3">
                Simbol Harmoni Rekayasa
              </h3>
              <p className="font-sans text-xs text-white/60 font-light max-w-sm">
                Integrasi atomik, stabilitas struktural, kelenturan dinamis, dan keterbukaan sinergi dalam satu kesatuan visual yang kokoh.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Core Pillars Selector & Content */}
          <div className="lg:col-span-7 space-y-4">
            {elements.map((item, idx) => {
              const isSelected = activeElement === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveElement(idx)}
                  className={`p-6 border transition-all cursor-pointer ${
                    isSelected
                      ? `bg-[#0D192E] border-[#0B70AD] shadow-lg`
                      : 'bg-[#070E1A]/60 border-white/10 hover:border-white/25 hover:bg-[#0D192E]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-xs text-[#0B70AD] font-semibold">
                        [ {item.num} ]
                      </span>
                      <h4 className="font-serif text-lg md:text-xl text-white font-medium">
                        {item.title}
                      </h4>
                    </div>
                    <span className="font-mono text-[11px] text-white/60 tracking-wider">
                      {item.essence}
                    </span>
                  </div>

                  <p className="font-sans text-xs md:text-sm text-white/70 font-light leading-relaxed mb-3">
                    {item.description}
                  </p>

                  {isSelected && (
                    <div className="border-t border-white/10 pt-3 mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[10px] text-white/60">
                      {item.details.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-center space-x-1.5">
                          <span className="text-[#0B70AD]">✦</span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}