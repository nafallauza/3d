import React, { useRef, useState } from 'react';
import { Play, Pause, ArrowUpRight } from 'lucide-react';

export default function AboutSection({ onOpenConsultation }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div id="about" className="relative w-full">
      {/* 1. Needle Transition from Dark into Sand Light Section */}
      <div className="w-full overflow-hidden leading-none -mb-[2px] bg-[#2c2824]">
        <img
          src="/assets/transition-light-01.svg"
          alt="Section transition needle fringe"
          className="w-full h-20 md:h-36 object-fill block"
        />
      </div>

      {/* 2. Main Sand Ochre Section (Authentic Sondaven bg-light #a89474) */}
      <section className="bg-[#a89474] text-[#2c2824] py-24 md:py-36 px-6 md:px-14 relative z-20">
        <div className="max-w-7xl mx-auto">
          {/* Top Title: Son Daven by blago */}
          <div className="border-b border-[#2c2824]/20 pb-12 mb-16">
            <div className="flex items-center space-x-3 mb-4 font-mono text-xs text-[#2c2824] tracking-widest uppercase font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#2c2824]" />
              <span>[ 03 / THE PHILOSOPHY & CONCEPT ]</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-baseline justify-between">
              <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#2c2824] tracking-tighter leading-none">
                Son Daven
              </h2>
              <div className="font-mono text-xs md:text-sm tracking-widest text-[#2c2824]/80 uppercase mt-4 md:mt-0 flex items-center space-x-2 font-medium">
                <span>BY BLAGO DEVELOPMENT</span>
                <span>•</span>
                <span>YAREMCHE</span>
              </div>
            </div>
          </div>

          {/* Two Editorial Columns: About Us & Concept */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
            {/* Left Column: About Us */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-3xl md:text-4xl text-[#2c2824] tracking-tight mb-6 font-bold">
                  About Us
                </h3>
                <div className="w-16 h-[1.5px] bg-[#2c2824]/40 mb-8" />
                <p className="font-sans text-base md:text-lg text-[#2c2824]/90 leading-relaxed font-light mb-8">
                  Son Daven is a new place of power in the Carpathians, where Hutsul culture is reinterpreted through architecture, spatial design, hospitality, and contemporary art. Here, traditions take on a new form, and the ancient spirit of the Carpathians merges with modern comfort.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onOpenConsultation?.('General Architecture Consultation')}
                  data-cursor="CONSULT"
                  className="inline-flex items-center space-x-3 px-7 py-4 bg-[#2c2824] hover:bg-[#1a1715] text-[#f5f0ea] font-mono text-xs tracking-widest uppercase transition-colors cursor-pointer shadow-lg"
                >
                  <span>Request Consultation</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

            {/* Right Column: Concept + Interactive Video Card */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-3xl md:text-4xl text-[#2c2824] tracking-tight mb-6 font-bold">
                  Concept
                </h3>
                <div className="w-16 h-[1.5px] bg-[#2c2824]/40 mb-8" />
                <p className="font-sans text-base md:text-lg text-[#2c2824]/90 leading-relaxed font-light mb-4">
                  The architecture of the complex grows from the mountains, preserving their strength in stone and warmth in wood. Panoramic terraces open up views from which the spirit intercepts, and traditions intertwine with modernity, creating a new format of recreation: deep, meaningful, filled with the energy of nature and culture of Hutsul region.
                </p>
                <p className="font-serif text-lg md:text-xl italic text-[#2c2824] leading-relaxed mb-8 font-medium">
                  “A dream of a place where legends, nature, and modern comforts come together as one.”
                </p>
              </div>

              {/* Video Card: "See you in a dream" */}
              <div className="relative group overflow-hidden border border-[#2c2824]/20 bg-black/10 mt-4 shadow-xl">
                <div className="relative h-64 md:h-72 w-full overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/assets/son-daven_short.mp4" type="video/mp4" />
                  </video>

                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                  {/* Play / Pause Toggle Button */}
                  <button
                    onClick={toggleVideo}
                    data-cursor="PLAY"
                    className="absolute top-4 right-4 w-10 h-10 bg-[#2c2824] text-white flex items-center justify-center rounded-full transition-transform transform hover:scale-110 shadow-lg cursor-pointer"
                    aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                  </button>

                  <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-widest uppercase text-white bg-[#2c2824]/90 px-3 py-1 backdrop-blur-sm">
                    [ CINEMATIC CARPATHIAN TEASER ]
                  </div>
                </div>

                <div className="p-4 bg-[#2c2824] text-[#f5f0ea] border-t border-[#2c2824]/10 flex items-center justify-between font-mono text-xs">
                  <span className="font-semibold uppercase tracking-wider text-amber-300">See you in a dream</span>
                  <span className="text-[10px] text-white/70">YAREMCHE ARCHIVE • 0:18</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width Architectural Render Banner */}
          <div className="relative w-full h-[45vh] md:h-[65vh] overflow-hidden border border-[#2c2824]/25 shadow-2xl">
            <img
              src="/assets/final-3.webp"
              alt="Son Daven Architectural Vista"
              className="w-full h-full object-cover object-center filter contrast-105 hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute bottom-6 left-6 md:left-10 font-mono text-xs text-white bg-[#2c2824]/90 px-3.5 py-2 backdrop-blur-md">
              [ PANORAMIC MONOLITH TERRACE • FOOTHILLS OF YAREMCHE ]
            </div>
          </div>
        </div>
      </section>

      {/* 3. Needle Transition from Sand Section back into Dark Section */}
      <div className="w-full overflow-hidden leading-none -mt-[2px] bg-[#a89474]">
        <img
          src="/assets/transition-dark-04.svg"
          alt="Section transition needle fringe back to dark"
          className="w-full h-20 md:h-36 object-fill block"
        />
      </div>
    </div>
  );
}
