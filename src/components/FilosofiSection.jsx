import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Maximize2, Shield, ArrowUpRight, Compass, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FilosofiSection() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  const geoRevealRef = useRef(null);
  const logoCardRef = useRef(null);
  const tabsListRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Layered Geometric Reveal Sequence
      const geoTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 25%',
          scrub: 0.6,
        },
      });

      // 1. Technical datum lines & coordinate marks expand
      geoTl.fromTo(
        '.geo-datum-line',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, ease: 'none', stagger: 0.1 },
        0
      );

      // 2. Geometric construction vectors draw in
      geoTl.fromTo(
        '.geo-vector-path',
        { strokeDashoffset: 300, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, ease: 'none', stagger: 0.15 },
        0.1
      );

      // 3. Official Logo Card reveals with precision scale
      geoTl.fromTo(
        logoCardRef.current,
        { scale: 0.94, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, ease: 'power2.out' },
        0.3
      );

      // 4. Philosophy cards stagger into alignment
      geoTl.fromTo(
        '.filosofi-tab-card',
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out', stagger: 0.1 },
        0.4
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const elements = [
    {
      id: 'atom',
      num: '01',
      title: 'Struktur Atom / Ligan',
      badge: 'MIKRO-PRESISI & SINKRONISASI',
      essence: 'Presisi & Keterhubungan',
      accentColor: '#0B70AD',
      desc: 'Simbol ketelitian pada level partikel paling fundamental. Dalam sains rekayasa, atom dan ligan saling mengikat secara presisi untuk menghasilkan molekul dengan integritas struktur yang kokoh dan tak tergoyahkan.',
      points: [
        'Kalkulasi akurat pada setiap toleransi mikro komponen',
        'Keterkaitan sistemik: tidak ada elemen yang berdiri sendiri',
        'Kekuatan molekular yang menopang stabilitas makro',
      ],
      diagramType: 'atom',
    },
    {
      id: 'segitiga',
      num: '02',
      title: 'Formasi Segitiga',
      badge: 'GEOMETRI STABILITAS UTAMA',
      essence: 'Pertumbuhan & Kestabilan',
      accentColor: '#1B3459',
      desc: 'Dalam mekanika teknik dan perancangan rangka truss, segitiga adalah satu-satunya bentuk poligon yang tidak mengalami deformasi di bawah beban titik. Ini melambangkan fondasi kokoh sekaligus arah panah pertumbuhan.',
      points: [
        'Distribusi beban seimbang tahan terhadap tekanan lateral',
        'Fondasi struktural yang kokoh tanpa deformasi',
        'Vektor arah kemajuan dan pertumbuhan berkelanjutan',
      ],
      diagramType: 'triangle',
    },
    {
      id: 'gelombang',
      num: '03',
      title: 'Garis Gelombang',
      badge: 'DINAMIKA FLUIDA & RESPON',
      essence: 'Dinamika & Adaptabilitas',
      accentColor: '#C91C22',
      desc: 'Garis kurva gelombang merefleksikan pergerakan energi yang mengalir dan responsif. Kekakuan tanpa fleksibilitas menghasilkan kerapuhan; kemampuan adaptasi terhadap dinamika lapangan adalah kunci keandalan sejati.',
      points: [
        'Kelenturan metodologi menghadapi variabel medan',
        'Dinamika pemikiran rekayasa yang solutif dan mengalir',
        'Resonansi inovatif tanpa mengorbankan keamanan sistem',
      ],
      diagramType: 'wave',
    },
    {
      id: 'terbuka',
      num: '04',
      title: 'Ruang Terbuka',
      badge: 'SINERGI EKOSISTEM TANPA BATAS',
      essence: 'Kolaborasi & Pemikiran Tanpa Batas',
      accentColor: '#FFFFFF',
      desc: 'Ruang negatif di antara elemen-elemen logo melambangkan keterbukaan untuk merangkul ide baru, menyatukan disiplin ilmu yang berbeda, dan keberanian melangkah keluar dari kotak pemikiran konvensional.',
      points: [
        'Ekosistem kemitraan terbuka lintas sektoral',
        'Inovasi yang bertumbuh di ruang eksplorasi bebas',
        'Penyelesaian masalah multidisiplin secara holistik',
      ],
      diagramType: 'open-frame',
    },
  ];

  return (
    <section
      id="filosofi"
      ref={sectionRef}
      className="relative w-full bg-[#070E1A] text-[#F8FAFC] py-28 md:py-36 px-6 md:px-14 border-t border-white/10 z-20 overflow-hidden"
    >
      {/* Background Subtle Coordinate Field */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#0B70AD_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Layered Geometric Reveal Header & Entrance Gateway */}
        <div className="border-b border-white/15 pb-10 mb-16">
          <div className="flex items-center space-x-3 mb-4 font-mono text-xs text-[#0B70AD] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#C91C22] animate-pulse" />
            <span>[ 04 // MAKNA VISUAL & GEOMETRI DASAR &bull; DEKONSTRUKSI ELEMEN ]</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-tight">
                Filosofi Logo
              </h2>
              <div className="font-mono text-xs md:text-sm tracking-widest text-[#0B70AD] uppercase mt-2 font-medium">
                EMPAT ELEMEN FUNDAMENTAL TARA REKAYASA
              </div>
            </div>

            <p className="font-sans text-sm md:text-base text-white/75 max-w-xl font-light leading-relaxed">
              Lambang Tara Rekayasa bukan sekadar simbol grafis, melainkan representasi visual dari doktrin ketelitian sains, mekanika struktural, dan kemampuan adaptasi lapangan.
            </p>
          </div>

          {/* Architectural Datum Entrance Bar */}
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-white/40">
            <div className="flex items-center space-x-3">
              <span className="geo-datum-line w-8 h-[1px] bg-[#0B70AD] origin-left" />
              <span>GEOMETRIC SEQUENCE: ATOM &rarr; SEGITIGA &rarr; GELOMBANG &rarr; RUANG TERBUKA</span>
            </div>
            <div className="text-[#0B70AD]">
              [ DISIPLIN REKAYASA ]
            </div>
          </div>
        </div>

        {/* Dynamic Architectural Presentation: Showcase + 4 Distinct Interactive Treatments */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          {/* Left Column: Official Logo Showcase with Layered Blueprint Vectors (5 cols) */}
          <div
            ref={logoCardRef}
            className="lg:col-span-5 bg-[#0D192E] border border-white/15 p-8 md:p-12 relative overflow-hidden group shadow-2xl"
          >
            {/* Blueprint Crop Marks */}
            <div className="absolute top-2 left-2 text-[#0B70AD] font-mono text-[10px]">┌ GEOMETRI</div>
            <div className="absolute top-2 right-2 text-[#0B70AD] font-mono text-[10px]">┐ SPEC</div>
            <div className="absolute bottom-2 left-2 text-[#C91C22] font-mono text-[10px]">└ ATOM</div>
            <div className="absolute bottom-2 right-2 text-white/40 font-mono text-[10px]">┘ 2026</div>

            {/* Geometric Vector Background Linework (Synchronized Layer Reveal) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
              viewBox="0 0 300 300"
              fill="none"
            >
              {/* Central Concentric Orbits */}
              <circle
                cx="150"
                cy="150"
                r="70"
                stroke="#0B70AD"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="geo-vector-path"
                style={{ strokeDasharray: 300 }}
              />
              <circle
                cx="150"
                cy="150"
                r="110"
                stroke="#1B3459"
                strokeWidth="1"
                strokeDasharray="2 4"
                className="geo-vector-path"
                style={{ strokeDasharray: 300 }}
              />
              {/* Triangular Construction Lines */}
              <line
                x1="150"
                y1="40"
                x2="60"
                y2="210"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
                className="geo-vector-path"
                style={{ strokeDasharray: 300 }}
              />
              <line
                x1="60"
                y1="210"
                x2="240"
                y2="210"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
                className="geo-vector-path"
                style={{ strokeDasharray: 300 }}
              />
              <line
                x1="240"
                y1="210"
                x2="150"
                y2="40"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
                className="geo-vector-path"
                style={{ strokeDasharray: 300 }}
              />
            </svg>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-44 h-44 md:w-56 md:h-56 mb-8 p-6 bg-[#070E1A]/90 border border-white/10 rounded-lg flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-105 relative">
                <img
                  src="/assets/logo-tara-rekayasa.png"
                  alt="Logo Resmi Tara Rekayasa"
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_25px_rgba(11,112,173,0.35)]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              <div className="font-mono text-[11px] tracking-[0.25em] text-[#0B70AD] uppercase mb-1">
                [ TARA REKAYASA ]
              </div>
              <h3 className="font-serif text-2xl text-white font-bold mb-3">
                Simbol Harmoni Rekayasa
              </h3>
              <p className="font-sans text-xs text-white/60 font-light max-w-sm leading-relaxed">
                Penyatuan presisi atomik, stabilitas struktur segitiga, dinamika gelombang responsif, dan ruang terbuka kolaboratif.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Distinct Geometric Treatments (7 cols) */}
          <div ref={tabsListRef} className="lg:col-span-7 space-y-4">
            {elements.map((item, idx) => {
              const isSelected = activeTab === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`filosofi-tab-card p-6 border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0D192E] border-[#0B70AD] shadow-xl'
                      : 'bg-[#070E1A]/80 border-white/10 hover:border-white/30 hover:bg-[#0D192E]/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-xs text-[#0B70AD] font-bold">
                        [ {item.num} ]
                      </span>
                      <h4 className="font-serif text-xl text-white font-bold">
                        {item.title}
                      </h4>
                    </div>
                    <span className="font-mono text-[10px] text-white/50 tracking-wider uppercase border border-white/10 px-2.5 py-0.5 bg-black/30">
                      {item.badge}
                    </span>
                  </div>

                  <p className="font-sans text-xs md:text-sm text-white/75 font-light leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  {/* Distinctive Visual Diagram Representation */}
                  {isSelected && (
                    <div className="border-t border-white/10 pt-4 mt-4 space-y-3">
                      {/* Diagram Container */}
                      <div className="h-28 bg-[#070E1A] border border-white/10 rounded flex items-center justify-center p-4 relative overflow-hidden">
                        {item.diagramType === 'atom' && (
                          <svg className="w-full h-full max-w-[260px]" viewBox="0 0 200 80">
                            {/* Orbital rings */}
                            <ellipse cx="100" cy="40" rx="60" ry="20" stroke="#0B70AD" strokeWidth="1.5" fill="none" opacity="0.6" />
                            <ellipse cx="100" cy="40" rx="20" ry="35" stroke="#1B3459" strokeWidth="1.5" fill="none" opacity="0.8" />
                            {/* Nucleus */}
                            <circle cx="100" cy="40" r="7" fill="#C91C22" />
                            <circle cx="100" cy="40" r="14" stroke="#C91C22" strokeWidth="1" fill="none" opacity="0.4" />
                            {/* Orbital nodes */}
                            <circle cx="160" cy="40" r="3.5" fill="#0B70AD" />
                            <circle cx="100" cy="5" r="3" fill="#FFFFFF" />
                          </svg>
                        )}

                        {item.diagramType === 'triangle' && (
                          <svg className="w-full h-full max-w-[260px]" viewBox="0 0 200 80">
                            <polygon points="100,10 40,70 160,70" stroke="#1B3459" strokeWidth="2" fill="none" />
                            <polygon points="100,25 60,65 140,65" stroke="#0B70AD" strokeWidth="1.5" fill="#0B70AD" fillOpacity="0.15" />
                            <circle cx="100" cy="10" r="3.5" fill="#C91C22" />
                            <circle cx="40" cy="70" r="3.5" fill="#0B70AD" />
                            <circle cx="160" cy="70" r="3.5" fill="#0B70AD" />
                            <line x1="100" y1="10" x2="100" y2="70" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
                          </svg>
                        )}

                        {item.diagramType === 'wave' && (
                          <svg className="w-full h-full max-w-[260px]" viewBox="0 0 200 80">
                            <path d="M 10 40 Q 55 10 100 40 T 190 40" stroke="#0B70AD" strokeWidth="2.5" fill="none" />
                            <path d="M 10 48 Q 55 18 100 48 T 190 48" stroke="#C91C22" strokeWidth="1.5" fill="none" opacity="0.8" />
                            <path d="M 10 32 Q 55 2 100 32 T 190 32" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="3 3" />
                            <circle cx="100" cy="40" r="3" fill="#0B70AD" />
                            <circle cx="55" cy="15" r="2.5" fill="#C91C22" />
                            <circle cx="145" cy="65" r="2.5" fill="#C91C22" />
                          </svg>
                        )}

                        {item.diagramType === 'open-frame' && (
                          <svg className="w-full h-full max-w-[260px]" viewBox="0 0 200 80">
                            <rect x="35" y="15" width="130" height="50" stroke="#FFFFFF" strokeWidth="1.5" fill="none" strokeDasharray="10 5" opacity="0.5" />
                            <path d="M 50 15 L 25 15 L 25 40" stroke="#0B70AD" strokeWidth="2" fill="none" />
                            <path d="M 150 15 L 175 15 L 175 40" stroke="#0B70AD" strokeWidth="2" fill="none" />
                            <path d="M 50 65 L 25 65 L 25 40" stroke="#C91C22" strokeWidth="2" fill="none" />
                            <path d="M 150 65 L 175 65 L 175 40" stroke="#C91C22" strokeWidth="2" fill="none" />
                            <circle cx="100" cy="40" r="4" fill="#FFFFFF" />
                          </svg>
                        )}
                      </div>

                      {/* Micro points */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[10px] text-white/70 pt-2">
                        {item.points.map((pt, pIdx) => (
                          <div key={pIdx} className="bg-black/30 p-2 border-l border-[#0B70AD]">
                            &bull; {pt}
                          </div>
                        ))}
                      </div>
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
