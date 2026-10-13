import React, { useState } from 'react';
import { Sun, Snowflake, ArrowUpRight } from 'lucide-react';

export default function SeasonSwitcher() {
  const [activeSeason, setActiveSeason] = useState('summer');

  return (
    <section className="py-28 px-6 md:px-14 bg-[#2c2824] text-[#f5f1ea] border-t border-[#a89474]/20 relative z-20">
      <div className="max-w-6xl mx-auto">
        {/* Header with Season Toggle Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#a89474]/20 pb-8 mb-12">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#a89474] uppercase block mb-3">
              [ 06 / 08 — YEAR-ROUND OCCUPANCY ]
            </span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white tracking-tight">
              Two Harmonious Seasons
            </h2>
          </div>

          {/* Interactive Season Slider Controls */}
          <div className="mt-6 md:mt-0 flex items-center space-x-3 bg-[#24201c] border border-[#a89474]/30 p-1.5 rounded-none font-mono text-xs">
            <button
              onClick={() => setActiveSeason('summer')}
              className={`flex items-center space-x-2 px-5 py-2.5 transition-all cursor-pointer ${
                activeSeason === 'summer'
                  ? 'bg-[#a89474] text-[#2c2824] font-semibold shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Sun size={14} />
              <span>[ SUMMER ]</span>
            </button>
            <button
              onClick={() => setActiveSeason('winter')}
              className={`flex items-center space-x-2 px-5 py-2.5 transition-all cursor-pointer ${
                activeSeason === 'winter'
                  ? 'bg-[#a89474] text-[#2c2824] font-semibold shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Snowflake size={14} />
              <span>[ WINTER ]</span>
            </button>
          </div>
        </div>

        {/* Dynamic Season Stage Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="font-mono text-xs text-[#a89474] tracking-widest uppercase">
              {activeSeason === 'summer' ? '[ VIBRANT ALPINE BOTANICAL FLORA ]' : '[ POWDER SNOW & BUKOVEL ACCESS ]'}
            </div>

            <h3 className="font-serif text-2xl md:text-4xl text-white tracking-tight leading-snug">
              {activeSeason === 'summer'
                ? 'Summer turns this valley into an untamed adventure landscape of river rafting and highland blooms.'
                : '35 km to Bukovel, ensuring a premier alpine skiing sanctuary and guaranteed seasonal yields.'}
            </h3>

            <p className="font-sans text-sm md:text-base text-white/75 leading-relaxed">
              {activeSeason === 'summer'
                ? 'From wild mushroom foraging and cascade swimming to open-air cultural festivals, warm Carpathian breezes transform Son Daven into a vibrant natural restorative retreat.'
                : 'With direct heated ski equipment lockers, private shuttle connections to Bukovel ski slopes, and heated outdoor thermal basins, winter delivers consistent 88%+ occupancy rates.'}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#a89474]/20 font-mono text-xs">
              <div>
                <span className="text-[#a89474] block mb-1">
                  {activeSeason === 'summer' ? '[ AVERAGE TEMPERATURE ]' : '[ SNOW DEPTH ]'}
                </span>
                <span className="text-white text-base font-semibold">
                  {activeSeason === 'summer' ? '+22°C — +26°C' : '85 CM — 140 CM'}
                </span>
              </div>
              <div>
                <span className="text-[#a89474] block mb-1">[ AVERAGE OCCUPANCY ]</span>
                <span className="text-white text-base font-semibold">
                  {activeSeason === 'summer' ? '≈ 72% YIELD' : '≈ 88% PEAK'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Photographic Visual */}
          <div className="lg:col-span-6 h-[420px] md:h-[480px] border border-[#a89474]/30 overflow-hidden relative group">
            <img
              src={
                activeSeason === 'summer'
                  ? 'https://cdn.prod.website-files.com/6940a0abd735a1e3a640d047/698ccba4d091bac674d376b5_%D0%B2%D0%BE%D0%B4%D0%BE%D1%81%D0%BF%D0%B0%D0%B4%20%D0%BF%D1%80%D0%BE%D0%B1%D1%96%D0%B8%CC%86%201.webp'
                  : 'https://cdn.prod.website-files.com/6940a0abd735a1e3a640d047/698cc3403156b65a4c773f1f_27.jpg'
              }
              alt={activeSeason}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2c2824] via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-[#a89474] bg-[#2c2824]/90 px-2.5 py-1">
              [ {activeSeason.toUpperCase()} ATMOSPHERE ]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
