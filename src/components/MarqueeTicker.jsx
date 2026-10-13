import React from 'react';

export default function MarqueeTicker() {
  const items = [
    { text: 'PARAMETRIC 3D MONOLITH', color: 'text-amber-400' },
    { text: 'CARPATHIAN BIOSPHERE', color: 'text-emerald-400' },
    { text: 'SUMMIT OBSERVATORY', color: 'text-purple-400' },
    { text: 'GEOTHERMAL HYDROTHERMAL', color: 'text-blue-400' },
    { text: 'TERRACOTTA HEARTH', color: 'text-rose-400' },
    { text: '585M ALPINE ELEVATION', color: 'text-amber-300' },
    { text: 'FREEHOLD TITLE DEEDS', color: 'text-emerald-300' },
    { text: '5-STAR SD SERVICED', color: 'text-purple-300' }
  ];

  return (
    <div className="w-full overflow-hidden py-4 bg-[#141210] text-[#f5f0ea] border-y border-white/10 select-none font-mono text-[11px] tracking-[0.25em] uppercase relative z-30">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {items.concat(items).map((item, idx) => (
          <span key={idx} className="flex items-center space-x-6 mx-6">
            <span className={item.color}>{item.text}</span>
            <span className="text-white/30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
