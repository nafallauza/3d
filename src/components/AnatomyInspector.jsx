import React, { useState } from 'react';
import { Layers, ShieldCheck, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const ZONES = [
  {
    id: '01',
    name: 'Helical Sky Observatory',
    tag: 'ZONE: APEX ELEVATION',
    color: 'border-purple-500/40 text-purple-400 bg-purple-950/20',
    dot: 'bg-purple-500',
    specs: ['Continuous 360° Glass Ribbon', 'Cantilevered Sunset Deck', 'Alpine Telescope Lounge', 'Aerodynamic Wind Deflection'],
    description: 'The continuous winding ribbon form creates self-shading terrace balconies that minimize thermal solar gain while framing uninhibited vistas of the Carpathian peaks.'
  },
  {
    id: '02',
    name: 'Beta-Fold Structural Spine',
    tag: 'ZONE: LOAD-BEARING CORE',
    color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20',
    dot: 'bg-emerald-500',
    specs: ['Seismic Basalt Core', 'Geothermal Thermal Massing', 'Carbon-Neutral Timber Composite', 'Class A+ Acoustic Insulation'],
    description: 'Engineered folds acting as natural structural buttresses, channeling seismic forces safely into the bedrock without massive interior columns.'
  },
  {
    id: '03',
    name: 'Basal Hydrothermal Pedestal',
    tag: 'ZONE: SUBTERRANEAN PLINTH',
    color: 'border-amber-500/40 text-amber-400 bg-amber-950/20',
    dot: 'bg-amber-500',
    specs: ['Carpathian Mineral Basin', 'Underground EV Supercharger Hub', 'Alpine Wine & Cured Cellar', 'Heated Ski Concourse'],
    description: 'Rooted directly into natural volcanic basalt strata, housing the hydrothermal spring filtration plant and multi-tier underground amenities.'
  }
];

export default function AnatomyInspector() {
  const [activeZone, setActiveZone] = useState(ZONES[0]);

  return (
    <section className="py-28 px-6 md:px-14 bg-[#141210] text-[#f5f0ea] border-t border-white/10 relative z-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12">
          <div>
            <span className="font-mono text-xs tracking-widest text-amber-400 uppercase block mb-3">
              [ 04 / 10 — PARAMETRIC STRUCTURAL ANATOMY ]
            </span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white tracking-tight">
              Anatomy of the Monolith
            </h2>
          </div>
          <div className="font-mono text-xs text-white/60 mt-4 md:mt-0">
            [ INTERACTIVE 3D STRUCTURAL BREAKDOWN ]
          </div>
        </div>

        {/* 3 Interactive Zone Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {ZONES.map((zone) => {
            const isSelected = activeZone.id === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => setActiveZone(zone)}
                className={`p-6 border text-left transition-all cursor-pointer font-mono ${
                  isSelected
                    ? `${zone.color} border-current shadow-2xl scale-[1.02]`
                    : 'border-white/10 bg-[#1a1715]/60 text-white/60 hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between mb-3 text-[10px] tracking-widest">
                  <span>[ SECTOR {zone.id} ]</span>
                  <span className={`w-2 h-2 rounded-full ${zone.dot} ${isSelected ? 'animate-ping' : ''}`} />
                </div>
                <h3 className="font-serif text-xl text-white font-bold mb-1">
                  {zone.name}
                </h3>
                <div className="text-[10px] uppercase opacity-75">
                  {zone.tag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Zone Detail Dossier Stage */}
        <div className="bg-[#181512] border border-white/15 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest block">
              [ ENGINEERING SPECIFICATION • SECTOR {activeZone.id} ]
            </span>
            <h4 className="font-serif text-2xl md:text-4xl text-white tracking-tight">
              {activeZone.name}
            </h4>
            <p className="font-sans text-sm md:text-base text-white/75 leading-relaxed">
              {activeZone.description}
            </p>

            <div className="pt-6 border-t border-white/10">
              <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest block mb-3">
                [ STRUCTURAL DELIVERABLES ]
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/90 font-mono">
                {activeZone.specs.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 border-l border-white/10 pl-0 lg:pl-8 space-y-4 font-mono text-xs">
            <div className="border border-white/10 bg-[#12100e] p-5 space-y-3">
              <div className="flex justify-between">
                <span className="text-white/60">SEISMIC TOLERANCE</span>
                <span className="text-emerald-400 font-semibold">MAGNITUDE 8.2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">WIND DRIFT RATIO</span>
                <span className="text-amber-400 font-semibold">H / 500 COMPLIANT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">CARBON RECOVERY</span>
                <span className="text-purple-400 font-semibold">NET-ZERO 2029</span>
              </div>
            </div>

            <a
              href="#inquiry"
              className="w-full inline-flex items-center justify-center space-x-2 border border-white/20 hover:border-amber-400 bg-white/5 hover:bg-amber-400 hover:text-black py-3 text-[11px] uppercase tracking-widest transition-all"
            >
              <span>[ REQUEST BLUEPRINT CAD DOSSIER ]</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
