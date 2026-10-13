import React, { useState } from 'react';
import { Layers, Maximize2, Compass, Check, ArrowRight } from 'lucide-react';

const FLOORS = [
  {
    id: 'L01',
    name: 'Valley Wellness Plinth',
    elevation: '585M ASL',
    grossArea: '1,840 m²',
    color: 'emerald',
    themeClass: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20',
    description: 'Direct ground-level integration with the Carpathian moss bedrock, subterranean hydrothermal thermal springs, and private forest trail gateways.',
    spaces: [
      { name: 'Hydrothermal Thermal Spa & Baths', area: '480 m²', status: 'COMPLETED' },
      { name: 'Indoor Volcanic Stone Vitality Pool', area: '310 m²', status: 'IN PROGRESS' },
      { name: 'Organic Foraged Gastronomy Restaurant', area: '260 m²', status: 'APPROVED' },
      { name: 'Ski Valet & Subterranean EV Hub', area: '520 m²', status: 'COMPLETED' }
    ],
    svgPlan: (
      <svg viewBox="0 0 500 300" className="w-full h-full text-emerald-400/40">
        <rect x="30" y="30" width="440" height="240" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
        <rect x="50" y="50" width="160" height="120" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" />
        <rect x="230" y="50" width="220" height="90" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" />
        <rect x="50" y="190" width="240" height="60" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" />
        <rect x="310" y="160" width="140" height="90" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="130" cy="110" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="70" y="115" fill="#34d399" fontSize="10" fontFamily="monospace">SPA & POOL [480m²]</text>
        <text x="250" y="95" fill="#34d399" fontSize="10" fontFamily="monospace">RESTAURANT [260m²]</text>
        <text x="70" y="225" fill="#34d399" fontSize="10" fontFamily="monospace">SKI VALET & EV HUB [520m²]</text>
        <text x="330" y="210" fill="#34d399" fontSize="10" fontFamily="monospace">LOUNGE [270m²]</text>
      </svg>
    )
  },
  {
    id: 'L03',
    name: 'Forest Horizon Deck',
    elevation: '596M ASL',
    grossArea: '2,250 m²',
    color: 'amber',
    themeClass: 'text-amber-400 border-amber-500/30 bg-amber-950/20',
    description: 'Cantilevered floorplate soaring above the pine tree canopy. Features mid-level residential suites with deep sheltered cedar wood balconies.',
    spaces: [
      { name: 'Suite 301 — Forest Panorama (2-Bed)', area: '142 m²', status: 'RESERVED' },
      { name: 'Suite 302 — Sunset Alpine Duplex', area: '185 m²', status: 'AVAILABLE' },
      { name: 'Suite 303 — Biophilic Garden Studio', area: '96 m²', status: 'AVAILABLE' },
      { name: 'Cantilevered Cocktail Deck & Hearth', area: '280 m²', status: 'APPROVED' }
    ],
    svgPlan: (
      <svg viewBox="0 0 500 300" className="w-full h-full text-amber-400/40">
        <polygon points="40,40 460,40 420,260 80,260" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
        <rect x="70" y="60" width="160" height="90" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" />
        <rect x="250" y="60" width="180" height="90" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" />
        <rect x="90" y="170" width="150" height="75" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" />
        <rect x="260" y="170" width="150" height="75" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" />
        <text x="90" y="110" fill="#fbbf24" fontSize="10" fontFamily="monospace">SUITE 301 [142m²]</text>
        <text x="270" y="110" fill="#fbbf24" fontSize="10" fontFamily="monospace">SUITE 302 [185m²]</text>
        <text x="100" y="210" fill="#fbbf24" fontSize="10" fontFamily="monospace">SUITE 303 [96m²]</text>
        <text x="270" y="210" fill="#fbbf24" fontSize="10" fontFamily="monospace">DECK & HEARTH [280m²]</text>
      </svg>
    )
  },
  {
    id: 'L05',
    name: 'Crown Penthouse & Observatory',
    elevation: '612M ASL',
    grossArea: '1,420 m²',
    color: 'purple',
    themeClass: 'text-purple-400 border-purple-500/30 bg-purple-950/20',
    description: 'The pinnacle of the monolithic ribbon. 360-degree glass walls framing Mount Hoverla and the endless Carpathian mountain ranges.',
    spaces: [
      { name: 'Grand Sky Penthouse — Triplex Crown', area: '310 m²', status: 'EXCLUSIVE OFFER' },
      { name: 'Private Stargazing Telescope Dome', area: '85 m²', status: 'PRIVATE ACCESS' },
      { name: 'Infinity Glass Thermal Horizon Pool', area: '140 m²', status: 'APPROVED' },
      { name: 'Helipad Concierge Transfer Lounge', area: '120 m²', status: 'COMPLETED' }
    ],
    svgPlan: (
      <svg viewBox="0 0 500 300" className="w-full h-full text-purple-400/40">
        <ellipse cx="250" cy="150" rx="210" ry="110" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
        <ellipse cx="250" cy="150" rx="140" ry="70" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="250" cy="150" r="40" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.5" />
        <line x1="40" y1="150" x2="460" y2="150" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="250" y1="40" x2="250" y2="260" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <text x="210" y="153" fill="#c084fc" fontSize="10" fontFamily="monospace">STAR DOME</text>
        <text x="140" y="105" fill="#c084fc" fontSize="10" fontFamily="monospace">TRIPLEX PENTHOUSE [310m²]</text>
        <text x="140" y="205" fill="#c084fc" fontSize="10" fontFamily="monospace">INFINITY THERMAL POOL [140m²]</text>
      </svg>
    )
  }
];

export default function BlueprintViewer() {
  const [selectedFloor, setSelectedFloor] = useState(FLOORS[0]);

  return (
    <section id="blueprints" className="py-32 px-6 md:px-14 bg-[#12100e] border-t border-white/10 relative z-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-emerald-400 uppercase">
                [ 05 / 13 — SPATIAL BLUEPRINTS & FLOORPLANS ]
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#f5f0ea] tracking-tight">
              Architectural Blueprints
            </h2>
          </div>
          <div className="font-mono text-xs text-white/60 mt-4 md:mt-0">
            [ CAD VECTOR SPATIAL SCHEMATICS ]
          </div>
        </div>

        {/* Level Switcher Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {FLOORS.map((floor) => {
            const isSelected = selectedFloor.id === floor.id;
            return (
              <button
                key={floor.id}
                onClick={() => setSelectedFloor(floor)}
                className={`px-6 py-4 border font-mono text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center space-x-3 ${
                  isSelected
                    ? `${floor.themeClass} border-current shadow-xl scale-[1.02]`
                    : 'border-white/10 bg-[#181512]/80 text-white/60 hover:border-white/30'
                }`}
              >
                <span className="font-bold text-white">[ {floor.id} ]</span>
                <span>{floor.name}</span>
                <span className="text-[10px] opacity-70">({floor.elevation})</span>
              </button>
            );
          })}
        </div>

        {/* Blueprint CAD Canvas & Data Pane */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left CAD Vector Schematic */}
          <div className="lg:col-span-7 bg-[#161412] border border-white/15 p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Viewport Overlay Info */}
            <div className="flex items-center justify-between font-mono text-[10px] text-white/50 border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center space-x-2">
                <Compass size={14} className="text-amber-400" />
                <span>ORIENTATION: SOUTHERN SOLAR EXPOSURE</span>
              </div>
              <div>SCALE: 1:150 VECTOR</div>
            </div>

            {/* SVG Interactive Blueprint */}
            <div className="w-full aspect-[5/3] flex items-center justify-center p-2">
              {selectedFloor.svgPlan}
            </div>

            {/* Blueprint Meta Bottom Bar */}
            <div className="flex items-center justify-between font-mono text-[10px] pt-4 border-t border-white/10 text-white/60">
              <span>GROSS AREA: {selectedFloor.grossArea}</span>
              <span className="text-amber-400 font-semibold">[ CAD REVIT MODEL READY ]</span>
            </div>
          </div>

          {/* Right Spatial Breakdown Pane */}
          <div className="lg:col-span-5 bg-[#181512] border border-white/15 p-6 md:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center space-x-2 font-mono text-[10px] text-amber-400 uppercase tracking-widest mb-2">
                <span>[ LEVEL {selectedFloor.id} SPECIFICATION ]</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-white font-medium mb-4">
                {selectedFloor.name}
              </h3>
              <p className="font-sans text-xs md:text-sm text-white/75 leading-relaxed mb-6">
                {selectedFloor.description}
              </p>

              <div className="space-y-3 border-t border-white/10 pt-4">
                <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest block mb-2">
                  [ DESIGNATED SECTORS ]
                </span>
                {selectedFloor.spaces.map((sp, idx) => (
                  <div
                    key={idx}
                    className="p-3 border border-white/10 bg-[#141210]/60 flex items-center justify-between font-mono text-xs"
                  >
                    <div>
                      <div className="text-white text-xs">{sp.name}</div>
                      <div className="text-[10px] text-white/50">{sp.area}</div>
                    </div>
                    <span className="text-[10px] text-emerald-400 border border-emerald-500/30 px-2 py-0.5 bg-emerald-950/20">
                      {sp.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#inquiry"
              data-cursor="INQUIRE"
              className="mt-6 w-full p-3 border border-white/20 hover:border-amber-400 bg-[#141210] hover:bg-amber-950/20 font-mono text-xs text-center text-white hover:text-amber-400 uppercase tracking-widest transition-all flex items-center justify-center space-x-2"
            >
              <span>[ RESERVE RESIDENCE ON {selectedFloor.id} ]</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
