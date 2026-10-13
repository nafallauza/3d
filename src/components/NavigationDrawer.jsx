import React from 'react';
import { X, ArrowUpRight, Compass, Volume2, VolumeX, Mail, Phone, MapPin } from 'lucide-react';

export default function NavigationDrawer({ isOpen, onClose, isPlayingSound, onToggleSound, onOpenConsultation }) {
  if (!isOpen) return null;

  const navLinks = [
    { num: '01', href: '#hero', title: 'Architectural Monolith', subtitle: 'Overview & Macro Metrics' },
    { num: '02', href: '#prologue', title: 'Prologue & Wilderness', subtitle: 'Carpathian Heritage Poetry' },
    { num: '03', href: '#about', title: 'Philosophy & Concept', subtitle: 'Warm Sand Light Section & Teaser' },
    { num: '04', href: '#location', title: 'Topography & Map', subtitle: 'Where the Mountains Speak' },
    { num: '05', href: '#residences', title: 'Suites & Residences', subtitle: 'Pinned Horizontal Gallery' },
    { num: '06', href: '#reel', title: 'Cinematic 4K Reel', subtitle: 'Highland Atmospheric Film' },
    { num: '07', href: '#canopy', title: 'Living Pine Canopy', subtitle: 'Jagged Needle Tectonic Fringe' },
    { num: '08', href: '#calculator', title: 'Financial Indicators', subtitle: 'Interactive Yield & ROI Simulator' },
    { num: '09', href: '#seasons', title: 'Four Seasons Experience', subtitle: 'Summer Flora & Winter Bukovel Access' },
    { num: '10', href: '#credentials', title: 'Developer Governance', subtitle: 'Forbes Ukraine #2 & Milestones' },
    { num: '11', href: '#gallery', title: 'Project Archive Gallery', subtitle: 'Authentic Carpathian Photography' },
    { num: '12', href: '#faq', title: 'Legal Dossier & FAQ', subtitle: 'Engineering & Ownership Guarantees' },
  ];

  return (
    <div className="fixed inset-0 z-[9999] bg-[#2c2824]/98 backdrop-blur-2xl text-[#f5f0ea] flex flex-col justify-between overflow-y-auto animate-fadeIn">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-6 md:px-14 py-6 border-b border-white/10 shrink-0">
        <div className="flex items-center space-x-3">
          <span className="font-serif text-2xl font-bold tracking-tight uppercase text-white">
            Son Daven
          </span>
          <span className="font-mono text-[9px] tracking-widest text-amber-400 uppercase pl-2 border-l border-white/20">
            [ NAVIGATION DOSSIER ]
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <button
            onClick={onToggleSound}
            className="flex items-center space-x-2 font-mono text-[10px] tracking-wider border border-white/20 hover:border-amber-400 px-3 py-1.5 transition-colors cursor-pointer"
          >
            {isPlayingSound ? <Volume2 size={13} className="text-amber-400" /> : <VolumeX size={13} className="text-white/60" />}
            <span className="hidden sm:inline">[ {isPlayingSound ? 'AUDIO ON' : 'AUDIO OFF'} ]</span>
          </button>

          <button
            onClick={onClose}
            className="group flex items-center space-x-2 border border-white/20 hover:border-amber-400 px-4 py-1.5 font-mono text-xs tracking-widest uppercase transition-colors bg-[#181512] cursor-pointer"
          >
            <span>[ CLOSE ]</span>
            <X size={15} className="group-hover:rotate-90 transition-transform duration-300 text-amber-400" />
          </button>
        </div>
      </div>

      {/* Main Drawer Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-14 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start my-auto">
        {/* Navigation Column Left & Center (8 cols) */}
        <div className="lg:col-span-8">
          <div className="font-mono text-[10px] tracking-widest text-white/50 uppercase mb-6 flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            <span>[ SELECT DESTINATION SECTOR ]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {navLinks.map((item) => (
              <a
                key={item.num}
                href={item.href}
                onClick={onClose}
                className="group flex items-baseline space-x-4 p-3 border-b border-white/5 hover:border-amber-400/50 hover:bg-white/[0.02] transition-all"
              >
                <span className="font-mono text-[11px] text-amber-400/80 group-hover:text-amber-400">
                  {item.num}
                </span>
                <div>
                  <h4 className="font-serif text-lg md:text-xl text-[#f5f0ea] group-hover:text-amber-300 group-hover:translate-x-1 transition-all">
                    {item.title}
                  </h4>
                  <p className="font-mono text-[10px] text-white/40 tracking-wider">
                    {item.subtitle}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right Info & Contact Column (4 cols) */}
        <div className="lg:col-span-4 bg-[#181512] border border-white/10 p-8 space-y-8 shadow-2xl">
          <div>
            <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest block mb-2">
              [ DIRECT INVESTOR LINE ]
            </span>
            <h3 className="font-serif text-2xl text-white font-medium mb-4">
              Private Concierge
            </h3>
            <p className="font-sans text-xs text-white/70 leading-relaxed mb-6">
              Our investment advisory partners in Kyiv and Yaremche provide bespoke consultations, financial yield models, and private site visits.
            </p>

            <button
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              data-cursor="REQUEST"
              className="w-full bg-gradient-to-r from-purple-700 via-amber-600 to-emerald-600 hover:from-purple-600 hover:to-emerald-500 text-white font-mono text-xs tracking-widest uppercase py-3.5 transition-all flex items-center justify-center space-x-2 font-bold cursor-pointer shadow-lg"
            >
              <span>[ BOOK PRIVATE CONSULTATION ]</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-4 font-mono text-xs">
            <div className="flex items-center space-x-3 text-white/80">
              <Phone size={14} className="text-amber-400 shrink-0" />
              <a href="tel:+380635101101" className="hover:text-amber-400 transition-colors">
                +380 63 510 1101
              </a>
            </div>

            <div className="flex items-center space-x-3 text-white/80">
              <Mail size={14} className="text-emerald-400 shrink-0" />
              <a href="mailto:sale@sondaven.com" className="hover:text-emerald-400 transition-colors">
                sale@sondaven.com
              </a>
            </div>

            <div className="flex items-start space-x-3 text-white/80">
              <MapPin size={14} className="text-purple-400 shrink-0 mt-0.5" />
              <span>Str. I.Petrasha, 6/3, Yaremche, Ivano-Frankivsk, 78503</span>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Footer */}
      <div className="px-6 md:px-14 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-white/50 shrink-0">
        <div>
          [ CHROMATIC 3D SPATIAL ARCHITECTURE • BLAGO VENTURES ]
        </div>
        <div className="mt-2 sm:mt-0 flex space-x-4 text-amber-400/80">
          <span>LAT 48.4524° N</span>
          <span>•</span>
          <span>LON 24.5518° E</span>
          <span>•</span>
          <span>ELEVATION 585M</span>
        </div>
      </div>
    </div>
  );
}
