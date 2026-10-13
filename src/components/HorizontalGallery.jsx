import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Cards color-matched directly to the 3D model's spectrum (Amber, Emerald, Violet, Sapphire)
const APARTMENTS = [
  {
    id: '01',
    category: 'RESIDENCES',
    title: 'Suite Horizon Observatory',
    sqm: '142 m²',
    level: 'LEVEL 04 — SUMMIT',
    orientation: 'SOUTH-EAST PANORAMA',
    colorTheme: {
      accent: '#a55100',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      border: 'hover:border-amber-500/60',
      glow: 'from-amber-950/40 via-[#1a1715] to-[#141210]'
    },
    image: '/assets/render-1.webp',
    features: ['Panoramic Cantilever Balcony', 'Private Thermal Soaking Tub', 'Double-Height Hearth', 'Highland Mineral Water Line'],
    metrics: { return: '19.2%', units: '04 AVAILABLE' }
  },
  {
    id: '02',
    category: 'VILLAS',
    title: 'Biophilic Forest Chalet',
    sqm: '215 m²',
    level: 'LEVEL 01 — VALLEY DECK',
    orientation: 'PINE FOREST VEIL',
    colorTheme: {
      accent: '#009307',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      border: 'hover:border-emerald-500/60',
      glow: 'from-emerald-950/40 via-[#1a1715] to-[#141210]'
    },
    image: '/assets/render-2.webp',
    features: ['Subterranean Wine Vault', 'Direct Forest Trail Gateway', 'Charred Cedar Facade', 'Geothermal Floor Massing'],
    metrics: { return: '18.6%', units: '02 AVAILABLE' }
  },
  {
    id: '03',
    category: 'PENTHOUSES',
    title: 'The Tectonic Penthouse',
    sqm: '310 m²',
    level: 'LEVEL 05 — CROWN',
    orientation: '360° ALPINE VISTA',
    colorTheme: {
      accent: '#490093',
      badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      border: 'hover:border-purple-500/60',
      glow: 'from-purple-950/40 via-[#1a1715] to-[#141210]'
    },
    image: '/assets/render-5.webp',
    features: ['Private Helipad Shuttle Elevator', 'Infinity Glass Plunge Pool', 'Master Suite Skylight Telescope', 'Butler Quarters'],
    metrics: { return: '21.4%', units: '01 AVAILABLE' }
  },
  {
    id: '04',
    category: 'SANCTUARY',
    title: 'Zenith Spa Pavilion',
    sqm: '180 m²',
    level: 'LEVEL 02 — ROCK LEDGE',
    orientation: 'WATERFALL CASCADE',
    colorTheme: {
      accent: '#0000a5',
      badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      border: 'hover:border-blue-500/60',
      glow: 'from-blue-950/40 via-[#1a1715] to-[#141210]'
    },
    image: '/assets/render-6.webp',
    features: ['Himalayan Salt Meditation Cell', 'Cedar Barrel Infusion Sauna', 'Acoustic Soundbath Chamber', 'Terraced Sunken Garden'],
    metrics: { return: '17.8%', units: '03 AVAILABLE' }
  }
];

export default function HorizontalGallery({ onOpenConsultation }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedSuite, setSelectedSuite] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1.1,
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth + 600}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const index = Math.min(
            APARTMENTS.length - 1,
            Math.floor(self.progress * APARTMENTS.length)
          );
          setActiveSlide(index);
        }
      }
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-cursor="SLIDE →"
      className="relative h-screen w-full overflow-hidden bg-[#2c2824] text-[#f5f1ea] z-30 transition-colors duration-700"
    >
      {/* Pinned Top Header */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-14 py-6 border-b border-white/10 flex items-center justify-between bg-[#2c2824]/90 backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <span className="font-mono text-xs tracking-widest uppercase text-white/90">
            [ 04 / 08 ] CHROMATIC SPATIAL SUITES
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] text-white/50">
            — COLOR-MAPPED TO 3D ARCHITECTURAL VOLUMES
          </span>
        </div>

        <div className="flex items-center space-x-6 font-mono text-xs">
          <div className="text-white/80 tracking-widest">
            [ {activeSlide + 1} / {APARTMENTS.length} ]
          </div>
          <div className="w-24 h-[1px] bg-white/20 hidden md:block relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-amber-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${((activeSlide + 1) / APARTMENTS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Horizontal Sliding Track */}
      <div
        ref={trackRef}
        className="flex h-full items-center pt-24 pb-12 px-8 md:px-16 space-x-8 md:space-x-12 will-change-transform"
        style={{ width: 'max-content' }}
      >
        {/* Intro Slide Card */}
        <div className="w-[85vw] md:w-[460px] shrink-0 h-[72vh] flex flex-col justify-between p-8 md:p-12 border border-white/15 bg-[#1a1715]/95 backdrop-blur-md shadow-2xl">
          <div>
            <span className="font-mono text-xs text-amber-400 tracking-widest uppercase block mb-3">
              [ CHROMATIC RESIDENCES ]
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white tracking-tight leading-tight mb-6">
              Volumes in Living Color
            </h2>
            <p className="text-sm text-white/70 leading-relaxed font-sans">
              Each spatial quadrant is tuned to the distinct material spectrum of our architectural model: amber sunrise decks, emerald valley villas, amethyst summits, and sapphire water sanctuaries.
            </p>
          </div>

          <div className="pt-8 border-t border-white/10 font-mono text-xs space-y-3">
            <div className="flex justify-between">
              <span className="text-white/60">COLOR SPECTRUM</span>
              <span className="text-white">4 CHROMATIC ZONES</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">MANAGEMENT</span>
              <span className="text-white">5-STAR FULL SERVICED</span>
            </div>
            <div className="flex items-center space-x-2 pt-3 text-xs text-white uppercase tracking-widest">
              <span>SCROLL DOWN TO ADVANCE CARDS</span>
              <span className="animate-pulse">→</span>
            </div>
          </div>
        </div>

        {/* Real Architectural Render Cards with Chromatic Glow */}
        {APARTMENTS.map((apt, index) => (
          <div
            key={apt.id}
            className={`w-[85vw] md:w-[620px] shrink-0 h-[72vh] flex flex-col justify-between p-8 md:p-10 border border-white/15 bg-gradient-to-br ${apt.colorTheme.glow} backdrop-blur-md relative group ${apt.colorTheme.border} transition-all duration-500 overflow-hidden shadow-2xl`}
          >
            {/* Background Image with Dark Vignette */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={apt.image}
                alt={apt.title}
                className="w-full h-full object-cover opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/70 to-transparent" />
            </div>

            {/* Top Card Metadata */}
            <div className="relative z-10 flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className={`inline-block font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 border rounded-none mb-2 ${apt.colorTheme.badgeBg}`}>
                  [ {apt.category} / 0{index + 1} ]
                </span>
                <h3 className="font-serif text-2xl md:text-4xl text-white tracking-tight">
                  {apt.title}
                </h3>
              </div>
              <div className="font-mono text-xl font-light text-white/80 tracking-tight">
                {apt.sqm}
              </div>
            </div>

            {/* Middle Specifications */}
            <div className="relative z-10 my-auto py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4 font-mono text-xs border-b border-white/10 pb-4">
                <div>
                  <span className="text-white/60 block mb-0.5">[ ELEVATION ]</span>
                  <span className="text-white">{apt.level}</span>
                </div>
                <div>
                  <span className="text-white/60 block mb-0.5">[ VIEW AXIS ]</span>
                  <span className="text-white">{apt.orientation}</span>
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest block mb-2">
                  [ BESPOKE INCLUSIONS ]
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/85 font-sans">
                  {apt.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center space-x-2">
                      <span className="font-mono text-[9px]" style={{ color: apt.colorTheme.accent }}>■</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Investment & Action */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
              <div>
                <span className="text-white/60 block text-[10px]">[ ANNUAL YIELD ]</span>
                <span className="text-white text-sm font-semibold">{apt.metrics.return}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedSuite(apt)}
                  className="border border-white/20 hover:border-amber-400 px-3 py-1.5 text-white/80 hover:text-white transition-colors text-[10px] tracking-widest uppercase bg-[#141210]/60 cursor-pointer"
                >
                  [ SPECS ]
                </button>
                <button
                  onClick={() => onOpenConsultation ? onOpenConsultation(apt.title) : (window.location.href = '#inquiry')}
                  className="group inline-flex items-center space-x-1.5 border border-amber-400/50 hover:border-amber-400 px-3 py-1.5 text-amber-400 hover:text-white transition-colors text-[10px] tracking-widest uppercase bg-amber-950/20 hover:bg-amber-500/20 cursor-pointer"
                >
                  <span>[ INQUIRE ]</span>
                  <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Suite Details Pop-up Modal */}
      {selectedSuite && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#181512] border border-white/20 p-8 shadow-2xl text-[#f5f0ea] overflow-hidden max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedSuite(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white p-1 border border-white/10 hover:border-amber-400 transition-colors cursor-pointer"
            >
              ✕
            </button>

            <span className={`inline-block font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 border mb-3 ${selectedSuite.colorTheme.badgeBg}`}>
              [ {selectedSuite.category} • {selectedSuite.sqm} ]
            </span>
            <h3 className="font-serif text-3xl text-white mb-2">{selectedSuite.title}</h3>
            <p className="font-mono text-xs text-white/60 mb-6">{selectedSuite.level} • {selectedSuite.orientation}</p>

            <div className="h-60 overflow-hidden relative mb-6 border border-white/10">
              <img src={selectedSuite.image} alt={selectedSuite.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-4 font-mono text-xs mb-8">
              <span className="text-amber-400 block uppercase">[ ARCHITECTURAL HIGHLIGHTS ]</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedSuite.features.map((f, i) => (
                  <div key={i} className="p-2 border border-white/10 bg-[#141210]/60 flex items-center space-x-2">
                    <span className="text-emerald-400">✓</span>
                    <span className="text-white/80">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const title = selectedSuite.title;
                  setSelectedSuite(null);
                  if (onOpenConsultation) onOpenConsultation(title);
                }}
                className="flex-1 bg-gradient-to-r from-purple-700 via-amber-600 to-emerald-600 hover:from-purple-600 hover:to-emerald-500 text-white font-mono text-xs uppercase tracking-widest py-3.5 flex items-center justify-center space-x-2 font-bold cursor-pointer"
              >
                <span>[ RESERVE THIS RESIDENCE ]</span>
                <ArrowUpRight size={14} />
              </button>
              <button
                onClick={() => setSelectedSuite(null)}
                className="border border-white/20 hover:border-white px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-white/70 hover:text-white"
              >
                [ CLOSE ]
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
