import React, { useState } from 'react';
import { Compass, Clock, MapPin, Footprints, ExternalLink } from 'lucide-react';

const LANDMARKS = [
  {
    id: 1,
    name: 'Probiy Waterfall',
    category: 'NATURAL CASCADE',
    distance: '450 m',
    time: '6 min walk',
    coords: '48.4392° N, 24.5398° E',
    color: 'bg-amber-400 text-black',
    accentText: 'text-amber-400',
    desc: 'Majestic 8-meter tectonic waterfall on the Prut River, carrying wild mountain rapids.',
    top: '38%',
    left: '26%'
  },
  {
    id: 2,
    name: 'Park of Legends “Gedzo”',
    category: 'CULTURAL HERITAGE',
    distance: '380 m',
    time: '5 min walk',
    coords: '48.4480° N, 24.5510° E',
    color: 'bg-emerald-400 text-black',
    accentText: 'text-emerald-400',
    desc: 'Mythical highland forest sanctuary preserving ancient Hutsul folklore and wooden artisan craft.',
    top: '46%',
    left: '42%'
  },
  {
    id: 3,
    name: 'Hutsulshchyna Monument & Restaurant',
    category: 'WOODEN ARCHITECTURE',
    distance: '550 m',
    time: '7 min walk',
    coords: '48.4410° N, 24.5450° E',
    color: 'bg-amber-300 text-black',
    accentText: 'text-amber-300',
    desc: 'Celebrated architectural monument built in 1965 entirely without nails using traditional carpentry techniques.',
    top: '58%',
    left: '34%'
  },
  {
    id: 4,
    name: 'Dovbucha Ancient Rocks',
    category: 'TECTONIC FORMATION',
    distance: '1,200 m',
    time: '15 min walk',
    coords: '48.4320° N, 24.5720° E',
    color: 'bg-purple-400 text-black',
    accentText: 'text-purple-400',
    desc: 'Monolithic sandstone labyrinth hidden in old beech forests, steeped in 18th-century Carpathian rebellion lore.',
    top: '24%',
    left: '72%'
  },
  {
    id: 5,
    name: 'Carpathians in Miniature Park',
    category: 'CULTURAL PARK',
    distance: '3,000 m',
    time: '31 min walk',
    coords: '48.4610° N, 24.5320° E',
    color: 'bg-blue-400 text-black',
    accentText: 'text-blue-400',
    desc: 'Open-air museum showcasing 17 historical Carpathian wooden churches, castles, and viaduct bridges.',
    top: '76%',
    left: '65%'
  },
  {
    id: 6,
    name: 'Hutsul Souvenir Market',
    category: 'ARTISAN BAZAAR',
    distance: '400 m',
    time: '5 min walk',
    coords: '48.4430° N, 24.5480° E',
    color: 'bg-rose-400 text-black',
    accentText: 'text-rose-400',
    desc: 'Authentic mountain market of wool lizhnyks, hand-carved wood, highland cheeses, and herbal teas.',
    top: '64%',
    left: '52%'
  },
  {
    id: 0,
    name: 'Son Daven [RESORT EPICENTER]',
    category: 'SANCTUARY',
    distance: '0 m',
    time: 'CURRENT LOCATION',
    coords: '48.4519° N, 24.5619° E',
    color: 'bg-white text-black',
    accentText: 'text-white',
    desc: 'Str. I. Petrasha 6/3, Yaremche. Monolithic retreat nestled at the foothills of ancient Carpathian ridges.',
    top: '50%',
    left: '48%',
    isCenter: true
  }
];

export default function InteractiveMap() {
  const [activePin, setActivePin] = useState(LANDMARKS[0]);

  return (
    <section id="location" className="py-32 px-6 md:px-14 border-t border-white/10 bg-[#2c2824] relative z-20 text-[#f5f0ea]">
      <div className="max-w-7xl mx-auto">
        {/* Poetic Section Header (From Sondaven) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-10 mb-14">
          <div>
            <div className="flex items-center space-x-3 mb-4 font-mono text-xs text-amber-400 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>[ 04 / LOCATION & INFRASTRUCTURE ]</span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-tighter leading-[0.9]">
              where the <br />
              <span className="italic font-light text-amber-200/90">mountains</span> Speak
            </h2>
          </div>

          <div className="mt-8 md:mt-0 font-mono text-xs text-white/70 max-w-sm space-y-2">
            <p className="leading-relaxed font-sans text-sm text-white/80">
              Son Daven is located at the foothills of the Carpathian Mountains, in the very heart of Yaremche—the capital of Hutsul heritage and enchanting nature.
            </p>
            <div className="pt-2 text-amber-400/90 flex items-center space-x-2">
              <MapPin size={13} />
              <span>STR. I. PETRASHA, 6/3 • YAREMCHE</span>
            </div>
          </div>
        </div>

        {/* Map & Landmark Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Map Graphic Canvas with Real Sondaven SVG */}
          <div className="lg:col-span-8 bg-[#181512] border border-white/10 h-[500px] md:h-[580px] relative overflow-hidden p-6 flex flex-col justify-between group">
            {/* Sondaven Map SVG Background */}
            <div className="absolute inset-0 opacity-40 pointer-events-none flex items-center justify-center p-8">
              <img
                src="/assets/map.svg"
                alt="Map of Yaremche"
                className="w-full h-full object-contain filter invert opacity-60"
              />
            </div>

            {/* Top Coordinate Bar */}
            <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-white/70 tracking-widest uppercase">
              <span className="flex items-center space-x-1.5">
                <Compass size={13} className="text-amber-400" />
                <span>[ YAREMCHE TOPOGRAPHY • 585M ASL ]</span>
              </span>
              <span className="hidden sm:inline-block">PRUT RIVER VALLEY</span>
            </div>

            {/* Interactive Landmark Pins */}
            <div className="absolute inset-0 p-8 z-10">
              {LANDMARKS.map((lm) => {
                const isSelected = activePin.id === lm.id;
                return (
                  <button
                    key={lm.id}
                    onClick={() => setActivePin(lm)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 group/pin"
                    style={{ top: lm.top, left: lm.left }}
                    aria-label={lm.name}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-lg ${
                        lm.color
                      } ${isSelected ? 'scale-125 ring-4 ring-white/40' : 'hover:scale-110 opacity-85 hover:opacity-100'}`}
                    >
                      <span className="font-mono text-[10px] font-bold">
                        {lm.isCenter ? '★' : `0${lm.id}`}
                      </span>
                    </div>

                    {/* Tooltip on hover/active */}
                    <div
                      className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 font-mono text-[10px] tracking-wider whitespace-nowrap px-2.5 py-1 transition-all pointer-events-none ${
                        isSelected
                          ? 'bg-white text-black opacity-100 shadow-xl font-bold'
                          : 'bg-black/90 text-white/90 opacity-0 group-hover/pin:opacity-100'
                      }`}
                    >
                      {lm.name} ({lm.time})
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Scale & Active Landmark Tracker */}
            <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-white/60 pt-4 border-t border-white/10">
              <span>SCALE: 1:25,000 • HUTSUL BIOSPHERE</span>
              <span className={activePin.accentText}>ACTIVE: {activePin.name}</span>
            </div>
          </div>

          {/* Active Landmark Dossier Card */}
          <div className="lg:col-span-4 bg-[#181512] border border-white/10 p-8 flex flex-col justify-between h-[500px] md:h-[580px]">
            <div>
              <div className={`font-mono text-xs tracking-widest uppercase mb-3 ${activePin.accentText}`}>
                [ {activePin.isCenter ? 'EPICENTER' : `POINT OF INTEREST 0${activePin.id}`} ]
              </div>
              <h3 className="font-serif text-3xl text-white tracking-tight mb-2 leading-snug">
                {activePin.name}
              </h3>
              <div className="font-mono text-[11px] text-white/50 uppercase mb-6">
                CATEGORY: {activePin.category}
              </div>
              <p className="font-sans text-sm text-white/75 leading-relaxed font-light mb-8">
                {activePin.desc}
              </p>
            </div>

            <div className="border-t border-white/10 pt-6 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white/60 flex items-center space-x-2">
                  <Footprints size={14} className="text-amber-400" />
                  <span>[ WALKING DISTANCE ]</span>
                </span>
                <span className="text-white font-bold">{activePin.distance}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 flex items-center space-x-2">
                  <Clock size={14} className="text-emerald-400" />
                  <span>[ ESTIMATED TIME ]</span>
                </span>
                <span className="text-white font-bold">{activePin.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 flex items-center space-x-2">
                  <Compass size={14} className="text-purple-400" />
                  <span>[ COORDINATES ]</span>
                </span>
                <span className="text-white/80 text-[10px]">{activePin.coords}</span>
              </div>

              <a
                href="https://www.google.com/maps/place/SON+DAVEN/@48.4519,24.5619,17z"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="MAPS"
                className="mt-4 w-full py-2.5 border border-white/20 hover:border-amber-400 flex items-center justify-center space-x-2 text-white hover:text-amber-400 transition-colors uppercase tracking-widest text-[10px]"
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
