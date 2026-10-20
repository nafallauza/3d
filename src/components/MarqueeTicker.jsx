import React from 'react';

export default function MarqueeTicker() {
  const items = [
    { text: 'PRESISI DALAM DETAIL', color: 'text-[#0B70AD]' },
    { text: 'INOVASI DALAM REKAYASA', color: 'text-white' },
    { text: 'PENDEKATAN TERSTRUKTUR & ADAPTIF', color: 'text-[#C91C22]' },
    { text: 'STRUKTUR ATOM & LIGAN', color: 'text-[#0B70AD]' },
    { text: 'STABILITAS FORMASI SEGITIGA', color: 'text-white' },
    { text: 'DINAMIKA GARIS GELOMBANG', color: 'text-[#C91C22]' },
    { text: 'KOLABORASI RUANG TERBUKA', color: 'text-[#0B70AD]' },
    { text: 'INTEGRITAS REKAYASA PRESISI', color: 'text-white' }
  ];

  return (
    <div className="w-full overflow-hidden py-4 bg-[#0B1426] text-[#F8FAFC] border-y border-white/10 select-none font-mono text-[11px] tracking-[0.25em] uppercase relative z-30">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {items.concat(items).map((item, idx) => (
          <span key={idx} className="flex items-center space-x-6 mx-6">
            <span className={`${item.color} font-medium`}>{item.text}</span>
            <span className="text-[#C91C22]/80">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}