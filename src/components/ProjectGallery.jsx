import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const GALLERY_IMAGES = [
  {
    id: '01',
    title: 'Summit Elevation & Terraced Cascades',
    category: 'FACADE ARCHITECTURE',
    src: '/assets/render-1.webp',
    desc: 'Cantilevered architectural volumes harmonizing with the natural Carpathian slope contour.'
  },
  {
    id: '02',
    title: 'Twilight Over the Yaremche Valley',
    category: 'AMBIENT ATMOSPHERE',
    src: '/assets/render-2.webp',
    desc: 'Luminous panoramic glazing reflecting ancient fir forests and alpine evening skies.'
  },
  {
    id: '03',
    title: 'Hydrothermal Recovery Sanctuary',
    category: 'WELLNESS & SPA',
    src: '/assets/render-5.webp',
    desc: 'Indoor heated pools, cedar-infused saunas, and private thermal baths.'
  },
  {
    id: '04',
    title: 'Botanical Panorama Dining Terrace',
    category: 'GASTRONOMY',
    src: '/assets/render-6.webp',
    desc: 'Highland foraging restaurant with open-flame hearth and sweeping mountain vistas.'
  },
  {
    id: '05',
    title: 'Highland Forest Chalet Wing',
    category: 'RESIDENTIAL MONOLITH',
    src: '/assets/render-7.webp',
    desc: 'Direct forest trail gateway surrounded by relict pine canopies and fresh glacial air.'
  }
];

export default function ProjectGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1));
  };

  const current = GALLERY_IMAGES[currentIndex];

  return (
    <section id="gallery" className="py-32 px-6 md:px-14 bg-[#2c2824] border-t border-white/10 relative z-20 text-[#f5f0ea]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-3 font-mono text-xs text-amber-400 tracking-widest uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>[ 10 / 12 — ARCHITECTURAL ARCHIVE ]</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight">
              Project Gallery
            </h2>
          </div>

          <div className="flex items-center space-x-6 mt-6 md:mt-0 font-mono text-xs">
            <span className="text-white/60">
              <span className="text-white font-bold">{current.id}</span> / 0{GALLERY_IMAGES.length}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                data-cursor="PREV"
                className="w-10 h-10 border border-white/20 hover:border-amber-400 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                data-cursor="NEXT"
                className="w-10 h-10 border border-white/20 hover:border-amber-400 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Feature Image Display */}
        <div className="relative w-full h-[55vh] md:h-[75vh] overflow-hidden bg-[#181512] group">
          <img
            key={current.id}
            src={current.src}
            alt={current.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          {/* Caption Overlay */}
          <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between z-10">
            <div className="max-w-xl">
              <span className="font-mono text-[10px] tracking-widest text-amber-400 uppercase block mb-1">
                [ {current.category} ]
              </span>
              <h3 className="font-serif text-2xl md:text-4xl text-white tracking-tight mb-2">
                {current.title}
              </h3>
              <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed font-light">
                {current.desc}
              </p>
            </div>

            <div className="hidden md:flex items-center space-x-2 font-mono text-[10px] text-white/60 border border-white/20 px-3 py-1.5 backdrop-blur-md bg-black/40">
              <Maximize2 size={12} className="text-amber-400" />
              <span>CARPATHIAN MONOLITH ARCHIVE</span>
            </div>
          </div>
        </div>

        {/* Thumbnail Preview Track */}
        <div className="grid grid-cols-5 gap-3 mt-4">
          {GALLERY_IMAGES.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-16 md:h-24 overflow-hidden border transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'border-amber-400 ring-2 ring-amber-400/40 opacity-100'
                  : 'border-white/10 opacity-50 hover:opacity-80'
              }`}
            >
              <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
              <div className="absolute top-1 left-1 font-mono text-[9px] text-white bg-black/60 px-1">
                {img.id}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
