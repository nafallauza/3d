import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import ModelViewer from './components/ModelViewer';
import AboutSection from './components/AboutSection';
import FilosofiSection from './components/FilosofiSection';
import LayananSection from './components/LayananSection';
import VisiMisiSection from './components/VisiMisiSection';
import MitraSection from './components/MitraSection';
import ContactSection from './components/ContactSection';
import TextHighlight from './components/TextHighlight';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import MarqueeTicker from './components/MarqueeTicker';
import NavigationDrawer from './components/NavigationDrawer';
import ConsultationModal from './components/ConsultationModal';
import MagneticButton from './components/MagneticButton';
import { ambientSound } from './utils/ambientAudio';
import { Clock, Menu, ArrowUpRight, Sparkles, MapPin, Phone, Mail, ShieldCheck, Compass } from 'lucide-react';

export default function App() {
  const scrollProgress = useRef(0);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationTopic, setConsultationTopic] = useState(null);

  const handleOpenConsultation = (topic = null) => {
    setConsultationTopic(topic);
    setIsConsultationOpen(true);
  };

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        scrollProgress.current = window.scrollY / totalScroll;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggleSound = () => {
    const nextState = !isPlayingSound;
    setIsPlayingSound(nextState);
    if (nextState) {
      ambientSound.play();
    } else {
      ambientSound.stop();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070E1A] text-[#F8FAFC] selection:bg-[#0B70AD] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Precision Micro Blueprint Grid Lines */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[radial-gradient(#0B70AD_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Preloader */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Custom Precision Cursor */}
      <CustomCursor />

      {/* 3D WebGL Canvas Rendering the Native Model */}
      <ModelViewer scrollProgress={scrollProgress} />

      {/* Viewport Technical Crosshairs (Engineering Editorial Framing) */}
      <div className="fixed inset-4 md:inset-8 pointer-events-none z-40 border border-white/5 hidden lg:block">
        <span className="absolute -top-2 -left-2 text-[#0B70AD] font-mono text-xs">+</span>
        <span className="absolute -top-2 -right-2 text-[#0B70AD] font-mono text-xs">+</span>
        <span className="absolute -bottom-2 -left-2 text-[#C91C22] font-mono text-xs">+</span>
        <span className="absolute -bottom-2 -right-2 text-[#C91C22] font-mono text-xs">+</span>
      </div>

      {/* Fixed Luxury Minimalist Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#070E1A]/85 backdrop-blur-md border-b border-white/10 px-6 md:px-14 py-4 flex items-center justify-between transition-all duration-300">
        {/* Left: Menu Trigger & Fast Navigation */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setIsNavOpen(true)}
            data-cursor="MENU"
            className="group flex items-center space-x-3 border border-white/20 hover:border-[#0B70AD] bg-[#0D192E] px-4 py-2 font-mono text-xs text-white tracking-widest uppercase transition-all cursor-pointer"
          >
            <div className="flex flex-col space-y-1 w-4">
              <span className="h-[1.5px] w-full bg-white group-hover:bg-[#0B70AD] transition-colors" />
              <span className="h-[1.5px] w-3/4 bg-white group-hover:bg-[#0B70AD] transition-colors" />
            </div>
            <span>[ MENU ]</span>
          </button>

          <nav className="hidden lg:flex items-center space-x-6 font-mono text-xs text-white/60">
            <a href="#tentang" className="hover:text-white transition-colors">Tentang</a>
            <a href="#filosofi" className="hover:text-white transition-colors">Filosofi</a>
            <a href="#layanan" className="hover:text-white transition-colors">Layanan</a>
            <a href="#mitra" className="hover:text-white transition-colors">Mitra</a>
          </nav>
        </div>

        {/* Center: Brand Identity Logo */}
        <div className="flex items-center space-x-3">
          <a href="#hero" className="flex items-center space-x-3 group">
            <img
              src="/assets/logo-tara-rekayasa.png"
              alt="Logo Tara Rekayasa"
              className="w-8 h-8 object-contain filter drop-shadow-[0_2px_8px_rgba(11,112,173,0.3)] transition-transform group-hover:scale-105"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <span className="font-serif text-xl md:text-2xl tracking-tight font-bold uppercase text-white group-hover:text-[#0B70AD] transition-colors">
              Tara Rekayasa
            </span>
          </a>
        </div>

        {/* Right: Ambient Audio & Direct Consultation Action */}
        <div className="flex items-center space-x-3 md:space-x-5">
          <button
            onClick={handleToggleSound}
            data-cursor="AUDIO"
            className="group hidden sm:flex items-center space-x-2 border border-white/15 hover:border-[#0B70AD] px-3 py-2 font-mono text-[10px] tracking-wider text-white transition-all bg-[#0D192E] cursor-pointer"
            title="Toggle Ambient Audio"
          >
            <div className="flex items-end space-x-[2px] h-3 w-3">
              <span className={`w-[2px] bg-[#0B70AD] transition-all ${isPlayingSound ? 'h-3 animate-pulse' : 'h-1'}`} />
              <span className={`w-[2px] bg-[#C91C22] transition-all ${isPlayingSound ? 'h-2 animate-pulse delay-75' : 'h-2'}`} />
              <span className={`w-[2px] bg-white transition-all ${isPlayingSound ? 'h-3 animate-pulse delay-150' : 'h-1'}`} />
            </div>
            <span>{isPlayingSound ? '[ AUDIO ON ]' : '[ MUTED ]'}</span>
          </button>

          <button
            onClick={() => handleOpenConsultation()}
            data-cursor="KONSULTASI"
            className="border border-[#0B70AD] bg-[#1B3459] hover:bg-[#0B70AD] px-4 py-2 font-mono text-xs text-white uppercase tracking-wider transition-all cursor-pointer font-semibold shadow-md"
          >
            [ KONSULTASI ]
          </button>
        </div>
      </header>

      {/* Main Flow */}
      <main className="relative z-20 pointer-events-auto">
        {/* =========================================
            SECTION 1: BERANDA / HERO (Full Viewport)
        ========================================= */}
        <section
          id="hero"
          className="relative min-h-screen flex flex-col justify-between px-6 md:px-14 pt-32 pb-16"
        >
          {/* Top Section Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/10 pb-10 items-start">
            <div className="md:col-span-7">
              <div className="font-mono text-xs tracking-[0.25em] text-[#0B70AD] uppercase mb-4 flex items-center space-x-2">
                <span>✦ ✦ ✦</span>
                <span>STRUKTURAL • PRESISI • ADAPTIF</span>
                <span>✦ ✦ ✦</span>
              </div>

              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.02] text-white mb-6">
                Presisi dalam Detail.<br />
                <span className="text-[#0B70AD]">Inovasi dalam Rekayasa.</span>
              </h1>

              <p className="font-sans text-base md:text-lg text-white/80 max-w-2xl font-light leading-relaxed">
                Tara Rekayasa mengedepankan ketelitian, inovasi, dan kolaborasi dalam membangun pendekatan rekayasa yang terstruktur dan adaptif.
              </p>
            </div>

            {/* Macro Metrics */}
            <div className="md:col-span-5 grid grid-cols-2 gap-6 md:border-l md:border-white/10 md:pl-8 self-center">
              <div className="p-4 bg-[#0D192E]/60 border border-white/10">
                <div className="font-serif text-3xl md:text-4xl text-[#0B70AD] font-bold">100%</div>
                <div className="font-mono text-[10px] text-white/60 mt-1 uppercase tracking-wider">
                  Disiplin Presisi
                </div>
              </div>
              <div className="p-4 bg-[#0D192E]/60 border border-white/10">
                <div className="font-serif text-3xl md:text-4xl text-white font-bold">Terstruktur</div>
                <div className="font-mono text-[10px] text-white/60 mt-1 uppercase tracking-wider">
                  Analisis Metodologis
                </div>
              </div>
              <div className="p-4 bg-[#0D192E]/60 border border-white/10">
                <div className="font-serif text-3xl md:text-4xl text-[#C91C22] font-bold">Adaptif</div>
                <div className="font-mono text-[10px] text-white/60 mt-1 uppercase tracking-wider">
                  Respon Dinamis
                </div>
              </div>
              <div className="p-4 bg-[#0D192E]/60 border border-white/10">
                <div className="font-serif text-3xl md:text-4xl text-white font-bold">Sinergis</div>
                <div className="font-mono text-[10px] text-white/60 mt-1 uppercase tracking-wider">
                  Kolaborasi Terbuka
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Explore Action & Micro Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-8">
            <div className="md:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs text-white/70">
                <div>
                  <span className="text-[#0B70AD] block mb-1 uppercase">[ FOKUS REKAYASA ]</span>
                  <span className="font-medium text-white">Pemodelan & Solusi Terstruktur</span>
                </div>
                <div>
                  <span className="text-[#C91C22] block mb-1 uppercase">[ STANDAR MUTU ]</span>
                  <span className="font-medium text-white">Validasi & Toleransi Ketat</span>
                </div>
                <div>
                  <span className="text-white/40 block mb-1 uppercase">[ INTERAKSI 3D ]</span>
                  <span className="font-medium text-white">Drag / Putar 360° Bebas</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-start md:justify-end space-x-4">
              <a
                href="#tentang"
                className="inline-flex items-center space-x-2 border border-white/20 hover:border-[#0B70AD] bg-[#0D192E] text-white hover:text-[#0B70AD] px-6 py-3.5 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer font-medium"
              >
                <span>[ JELAJAHI ]</span>
                <ArrowUpRight size={14} />
              </a>

              <button
                onClick={() => handleOpenConsultation()}
                className="inline-flex items-center space-x-2 bg-[#0B70AD] hover:bg-[#1B3459] text-white px-6 py-3.5 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer font-semibold border border-[#0B70AD]"
              >
                <span>[ HUBUNGI KAMI ]</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Kinetic Precision Marquee */}
        <MarqueeTicker />

        {/* =========================================
            PROLOGUE: SCROLL-SCRUB EDITORIAL STATEMENT
        ========================================= */}
        <section
          id="prologue"
          className="min-h-[70vh] px-6 md:px-14 py-28 border-t border-white/10 flex flex-col justify-center relative overflow-hidden bg-[#070E1A]"
        >
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex items-center space-x-3 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#0B70AD] animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-[#0B70AD] uppercase">
                [ 01.5 / MANIFESTO REKAYASA ]
              </span>
            </div>

            {/* Interactive Scroll-Scrub Highlighted Quote */}
            <TextHighlight
              text="“Di balik setiap konstruksi kokoh dan solusi teknis yang berdaya tahan tinggi, terdapat komitmen mendalam terhadap presisi kalkulasi, kejelasan struktur, dan keberanian untuk beradaptasi melampaui batas konvensional.”"
              className="font-serif text-3xl md:text-5xl lg:text-6xl text-white tracking-tight mb-8 leading-[1.2]"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-white/10 pt-6 font-mono text-xs text-white/60">
              <span className="text-[#0B70AD] uppercase tracking-wider">
                TARA REKAYASA • PRINSIP FUNDAMENTAL
              </span>
              <span className="mt-2 sm:mt-0 text-white/40">
                SCROLL KE BAWAH UNTUK EKSPLORASI DETAIL
              </span>
            </div>
          </div>
        </section>

        {/* =========================================
            SECTION 2: TENTANG KAMI
        ========================================= */}
        <AboutSection onOpenConsultation={() => handleOpenConsultation('tentang')} />

        {/* =========================================
            SECTION 3: FILOSOFI LOGO (4 ELEMEN RESMI)
        ========================================= */}
        <FilosofiSection />

        {/* =========================================
            SECTION 4: LAYANAN REKAYASA
        ========================================= */}
        <LayananSection onOpenConsultation={(svc) => handleOpenConsultation(svc)} />

        {/* =========================================
            SECTION 5: VISI & MISI
        ========================================= */}
        <VisiMisiSection />

        {/* =========================================
            SECTION 6: MITRA & EKOSISTEM
        ========================================= */}
        <MitraSection onOpenConsultation={() => handleOpenConsultation('kemitraan')} />

        {/* =========================================
            SECTION 7: KONTAK & KONSULTASI
        ========================================= */}
        <ContactSection />

        {/* FOOTER */}
        <footer className="border-t border-white/10 px-6 md:px-14 py-12 bg-[#040810] text-white/60 font-mono text-xs">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
            <div className="md:col-span-5">
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src="/assets/logo-tara-rekayasa.png"
                  alt="Tara Rekayasa"
                  className="w-7 h-7 object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="font-serif text-2xl font-bold uppercase text-white">
                  Tara Rekayasa
                </span>
              </div>
              <p className="font-sans text-xs text-white/60 max-w-sm leading-relaxed mb-4 font-light">
                Presisi dalam Detail. Inovasi dalam Rekayasa. Pendekatan terstruktur dan adaptif untuk menjawab tantangan industri masa depan.
              </p>
              <div className="text-[10px] text-[#0B70AD]">
                [ INTEGRITAS REKAYASA • METODOLOGI TERUKUR ]
              </div>
            </div>

            <div className="md:col-span-4 space-y-2 text-xs">
              <div className="text-white font-semibold mb-3 uppercase tracking-wider text-[11px]">
                [ NAVIGASI HALAMAN ]
              </div>
              <div className="grid grid-cols-2 gap-2 text-white/70">
                <a href="#hero" className="hover:text-[#0B70AD] transition-colors">Beranda</a>
                <a href="#tentang" className="hover:text-[#0B70AD] transition-colors">Tentang Kami</a>
                <a href="#filosofi" className="hover:text-[#0B70AD] transition-colors">Filosofi Logo</a>
                <a href="#layanan" className="hover:text-[#0B70AD] transition-colors">Layanan</a>
                <a href="#visi-misi" className="hover:text-[#0B70AD] transition-colors">Visi & Misi</a>
                <a href="#mitra" className="hover:text-[#0B70AD] transition-colors">Mitra</a>
                <a href="#kontak" className="hover:text-[#0B70AD] transition-colors">Kontak</a>
              </div>
            </div>

            <div className="md:col-span-3 text-left md:text-right">
              <div className="text-white font-semibold mb-3 uppercase tracking-wider text-[11px]">
                [ KONSULTASI CEPAT ]
              </div>
              <button
                onClick={() => handleOpenConsultation()}
                className="bg-[#1B3459] hover:bg-[#0B70AD] text-white px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors border border-[#0B70AD]/40 cursor-pointer"
              >
                [ INISIASI KONSULTASI ]
              </button>
              <p className="text-[10px] text-white/40 mt-3">
                Layanan komunikasi resmi terkonfirmasi.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] text-white/40">
            <div>
              © 2026 TARA REKAYASA. SELURUH HAK CIPTA DILINDUNGI.
            </div>
            <div className="mt-2 sm:mt-0 flex space-x-6">
              <span>PENDEKATAN TERSTRUKTUR & ADAPTIF</span>
              <span>•</span>
              <span className="text-[#0B70AD]">PRESISI REKAYASA</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Navigation Drawer */}
      <NavigationDrawer
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        isPlayingSound={isPlayingSound}
        onToggleSound={handleToggleSound}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultTopic={consultationTopic}
      />
    </div>
  );
}