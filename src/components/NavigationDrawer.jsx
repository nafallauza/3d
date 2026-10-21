import React from 'react';
import { X, ArrowUpRight, Compass, Volume2, VolumeX, Mail, Phone, MapPin } from 'lucide-react';

export default function NavigationDrawer({ isOpen, onClose, isPlayingSound, onToggleSound, onOpenConsultation }) {
  if (!isOpen) return null;

  const navLinks = [
    { num: '01', href: '#hero', title: 'Beranda', subtitle: 'Presisi & Inovasi Rekayasa' },
    { num: '02', href: '#manifesto', title: 'Manifesto', subtitle: 'Prinsip Ketelitian & Integritas' },
    { num: '03', href: '#tentang', title: 'Tentang Kami', subtitle: 'Identitas, Ketelitian & Metodologi' },
    { num: '04', href: '#filosofi', title: 'Filosofi Logo', subtitle: 'Atom, Segitiga, Gelombang & Ruang Terbuka' },
    { num: '05', href: '#layanan', title: 'Layanan Rekayasa', subtitle: 'Perancangan, Konsultasi & Integrasi Sistem' },
    { num: '06', href: '#proses', title: 'Alur Rekayasa', subtitle: 'Metodologi Terstruktur 5-Fase' },
    { num: '07', href: '#visi-misi', title: 'Visi & Misi', subtitle: 'Arah Strategis & Komitmen Berkelanjutan' },
    { num: '08', href: '#mitra', title: 'Mitra & Ekosistem', subtitle: 'Jaringan Kolaborasi Industri Terbuka' },
    { num: '09', href: '#kontak', title: 'Kontak & Konsultasi', subtitle: 'Inisiasi Sinergi & Rekayasa Presisi' },
  ];

  return (
    <div className="fixed inset-0 z-[9999] bg-[#070E1A]/98 backdrop-blur-2xl text-[#F8FAFC] flex flex-col justify-between overflow-y-auto animate-fadeIn">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-6 md:px-14 py-6 border-b border-white/10 shrink-0">
        <div className="flex items-center space-x-3">
          <img
            src="/assets/logo-tara-rekayasa.png"
            alt="Tara Rekayasa"
            className="w-8 h-8 object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <span className="font-serif text-2xl font-bold tracking-tight uppercase text-white">
            Tara Rekayasa
          </span>
          <span className="font-mono text-[9px] tracking-widest text-[#0B70AD] uppercase pl-2 border-l border-white/20">
            [ DIREKTORI NAVIGASI ]
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSound}
            className="flex items-center space-x-2 font-mono text-[10px] tracking-wider border border-white/15 hover:border-[#0B70AD] px-3 py-1.5 transition-colors cursor-pointer"
          >
            {isPlayingSound ? <Volume2 size={13} className="text-[#0B70AD]" /> : <VolumeX size={13} className="text-white/60" />}
            <span className="hidden sm:inline">[ {isPlayingSound ? 'AUDIO AKTIF' : 'AUDIO MUTED'} ]</span>
          </button>

          <button
            onClick={onClose}
            className="group flex items-center space-x-2 border border-white/20 hover:border-[#C91C22] px-4 py-1.5 font-mono text-xs tracking-widest uppercase transition-colors bg-[#0D192E] cursor-pointer"
          >
            <span>[ TUTUP ]</span>
            <X size={15} className="group-hover:rotate-90 transition-transform duration-300 text-[#C91C22]" />
          </button>
        </div>
      </div>

      {/* Main Drawer Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-14 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start my-auto">
        {/* Navigation Column Left & Center (8 cols) */}
        <div className="lg:col-span-8">
          <div className="font-mono text-[10px] tracking-widest text-white/50 uppercase mb-6 flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-[#0B70AD] rounded-full" />
            <span>[ PILIH SEKSI TUJUAN ]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {navLinks.map((item) => (
              <a
                key={item.num}
                href={item.href}
                onClick={onClose}
                className="group flex items-baseline space-x-4 p-3 border-b border-white/5 hover:border-[#0B70AD]/60 hover:bg-white/[0.02] transition-all"
              >
                <span className="font-mono text-[11px] text-[#0B70AD] group-hover:text-white">
                  {item.num}
                </span>
                <div>
                  <h4 className="font-serif text-lg md:text-xl text-white group-hover:text-[#0B70AD] group-hover:translate-x-1 transition-all">
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

        {/* Info Column Right (4 cols) */}
        <div className="lg:col-span-4 border-l border-white/10 pl-8 space-y-6">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-[#0B70AD] uppercase block mb-2">
              [ IDENTITAS PERUSAHAAN ]
            </span>
            <p className="font-sans text-xs text-white/70 leading-relaxed font-light">
              Tara Rekayasa mengedepankan ketelitian, inovasi, dan kolaborasi dalam membangun pendekatan rekayasa yang terstruktur dan adaptif.
            </p>
          </div>

          <div className="border-t border-white/10 pt-4 space-y-2 font-mono text-[11px]">
            <span className="text-white/40 block mb-1 uppercase tracking-widest">[ KOMITMEN NILAI ]</span>
            <div className="flex items-center space-x-2 text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B3459]" />
              <span>Presisi & Ketelitian Terukur</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B70AD]" />
              <span>Inovasi Struktural Berkelanjutan</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C91C22]" />
              <span>Kolaborasi Terbuka & Solutif</span>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                onClose();
                if (onOpenConsultation) onOpenConsultation();
              }}
              className="w-full bg-[#1B3459] hover:bg-[#0B70AD] text-white py-3 px-4 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer border border-[#0B70AD]/40"
            >
              [ MULAI KONSULTASI REKAYASA ]
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="px-6 md:px-14 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-white/40 shrink-0">
        <div>© 2026 TARA REKAYASA. SELURUH HAK CIPTA DILINDUNGI.</div>
        <div className="mt-1 sm:mt-0 text-[#0B70AD]">
          PRESISI DALAM DETAIL • INOVASI DALAM REKAYASA
        </div>
      </div>
    </div>
  );
}