import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ModelViewer from './components/ModelViewer';
import CinematicHero from './components/CinematicHero';
import EngineeringManifesto from './components/EngineeringManifesto';
import SvgSectionTransition from './components/SvgSectionTransition';
import AboutPrinciples from './components/AboutPrinciples';
import FilosofiSection from './components/FilosofiSection';
import LayananSection from './components/LayananSection';
import ProsesSection from './components/ProsesSection';
import VisiMisiSection from './components/VisiMisiSection';
import MitraSection from './components/MitraSection';
import ContactSection from './components/ContactSection';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import MarqueeTicker from './components/MarqueeTicker';
import NavigationDrawer from './components/NavigationDrawer';
import ConsultationModal from './components/ConsultationModal';
import { ambientSound } from './utils/ambientAudio';
import { Clock, Menu, ArrowUpRight, Volume2, VolumeX, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const scrollProgress = useRef(0);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationTopic, setConsultationTopic] = useState(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [timeWIB, setTimeWIB] = useState('');

  const handleOpenConsultation = (topic = null) => {
    setConsultationTopic(topic);
    setIsConsultationOpen(true);
  };

  // Update Live WIB Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeWIB(
        now.toLocaleTimeString('id-ID', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize Lenis + GSAP ScrollTrigger Integration
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const p = window.scrollY / totalScroll;
        scrollProgress.current = p;
        setScrollPercent(Math.round(p * 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Refresh ScrollTrigger once DOM & web fonts stabilize
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // Smooth anchor navigation powered by Lenis
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const hash = anchor.getAttribute('href');
        if (hash && hash !== '#') {
          const targetEl = document.querySelector(hash);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: -70, duration: 1.2 });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleAnchorClick);
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

      {/* 3D WebGL Canvas Rendering Native Model with Authentic Colors */}
      <ModelViewer scrollProgress={scrollProgress} />

      {/* Viewport Technical Crosshairs (Architectural Framing) */}
      <div className="fixed inset-4 md:inset-8 pointer-events-none z-40 border border-white/5 hidden lg:block">
        <span className="absolute -top-2 -left-2 text-[#0B70AD] font-mono text-xs">+</span>
        <span className="absolute -top-2 -right-2 text-[#0B70AD] font-mono text-xs">+</span>
        <span className="absolute -bottom-2 -left-2 text-[#C91C22] font-mono text-xs">+</span>
        <span className="absolute -bottom-2 -right-2 text-[#C91C22] font-mono text-xs">+</span>
      </div>

      {/* Fixed Luxury Minimalist Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#070E1A]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 md:px-14 py-3 sm:py-4 flex items-center justify-between transition-all duration-300">
        {/* Scroll Progress Bar at very bottom of header */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#1B3459] via-[#0B70AD] to-[#C91C22] transition-all duration-100"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>

        {/* Left: Menu Trigger & Fast Navigation */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <button
            onClick={() => setIsNavOpen(true)}
            data-cursor="MENU"
            className="group flex items-center space-x-2 sm:space-x-3 border border-white/20 hover:border-[#0B70AD] bg-[#0D192E] px-3 sm:px-4 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs text-white tracking-widest uppercase transition-all cursor-pointer"
          >
            <div className="flex flex-col space-y-1 w-3.5 sm:w-4">
              <span className="h-[1.5px] w-full bg-white group-hover:bg-[#0B70AD] transition-colors" />
              <span className="h-[1.5px] w-3/4 bg-white group-hover:bg-[#0B70AD] transition-colors" />
            </div>
            <span>[ MENU ]</span>
          </button>

          <nav className="hidden xl:flex items-center space-x-6 font-mono text-xs text-white/60">
            <a href="#hero" className="hover:text-white transition-colors">Beranda</a>
            <a href="#manifesto" className="hover:text-white transition-colors">Manifesto</a>
            <a href="#tentang" className="hover:text-white transition-colors">Tentang</a>
            <a href="#filosofi" className="hover:text-white transition-colors">Filosofi</a>
            <a href="#layanan" className="hover:text-white transition-colors">Layanan</a>
            <a href="#proses" className="hover:text-white transition-colors">Alur</a>
            <a href="#mitra" className="hover:text-white transition-colors">Mitra</a>
          </nav>
        </div>

        {/* Center: Brand Identity Logo */}
        <div className="flex items-center space-x-2">
          <a href="#hero" className="flex items-center space-x-2 sm:space-x-2.5 group">
            <img
              src="/assets/logo-tara-rekayasa.png"
              alt="Logo Tara Rekayasa"
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain filter drop-shadow-[0_2px_8px_rgba(11,112,173,0.3)] transition-transform group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="font-serif text-base sm:text-xl md:text-2xl tracking-tight font-bold uppercase text-white group-hover:text-[#0B70AD] transition-colors">
              <span className="hidden xs:inline">Tara Rekayasa</span>
              <span className="inline xs:hidden">Tara</span>
            </span>
          </a>
        </div>

        {/* Right: Live WIB Clock, Ambient Sound, & Direct Consultation Action */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="font-mono text-[10px] tracking-wider text-white/60 hidden lg:flex items-center space-x-2 border-r border-white/15 pr-4">
            <Clock size={12} className="text-[#0B70AD]" />
            <span>WIB {timeWIB}</span>
          </div>

          <button
            onClick={handleToggleSound}
            data-cursor="AUDIO"
            className="group hidden sm:flex items-center space-x-2 border border-white/15 hover:border-[#0B70AD] px-3 py-1.5 sm:py-2 font-mono text-[10px] tracking-wider text-white transition-all bg-[#0D192E] cursor-pointer"
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
            className="border border-[#0B70AD] bg-[#1B3459] hover:bg-[#0B70AD] px-3 sm:px-4 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs text-white uppercase tracking-wider transition-all cursor-pointer font-semibold shadow-md whitespace-nowrap"
          >
            [ KONSULTASI ]
          </button>
        </div>
      </header>

      {/* Main Flow Across 9 Storyboard Scenes */}
      <main className="relative z-20 pointer-events-auto">
        {/* SCENE 01: CINEMATIC HERO */}
        <CinematicHero onOpenConsultation={handleOpenConsultation} />

        {/* SCENE 02: ENGINEERING MANIFESTO (Continuous Spatial Handoff) */}
        <EngineeringManifesto />

        {/* VELOCITY-PACED MARQUEE TICKER */}
        <MarqueeTicker />

        {/* PARAMETRIC ARCHITECTURAL SVG TRANSITION (Dark to Light) */}
        <SvgSectionTransition direction="enter" fill="#F4F6F9" />

        {/* SCENE 03: TENTANG KAMI / PRINSIP REKAYASA (Light Editorial Surface) */}
        <AboutPrinciples onOpenConsultation={() => handleOpenConsultation('tentang')} />

        {/* PARAMETRIC ARCHITECTURAL SVG TRANSITION (Light to Dark) */}
        <SvgSectionTransition direction="exit" fill="#F4F6F9" />

        {/* SCENE 04: FILOSOFI LOGO (4 Unique Visual Diagrams) */}
        <FilosofiSection />

        {/* SCENE 05: LAYANAN REKAYASA (Interactive Index) */}
        <LayananSection onOpenConsultation={(svc) => handleOpenConsultation(svc)} />

        {/* SCENE 06: ALUR REKAYASA (Cinematic Pinned Horizontal Storytelling) */}
        <ProsesSection onOpenConsultation={() => handleOpenConsultation('alur')} />

        {/* SCENE 07: VISI & MISI (Strategic Pillars) */}
        <VisiMisiSection />

        {/* SCENE 08: MITRA & EKOSISTEM (Ecosystem Grid) */}
        <MitraSection onOpenConsultation={() => handleOpenConsultation('kemitraan')} />

        {/* SCENE 09: KONTAK & KONSULTASI */}
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
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="font-serif text-2xl font-bold uppercase text-white">
                  Tara Rekayasa
                </span>
              </div>
              <p className="font-sans text-xs text-white/60 max-w-sm leading-relaxed mb-4 font-light">
                Presisi dalam Detail. Inovasi dalam Rekayasa. Pendekatan terstruktur dan adaptif untuk menjawab tantangan industri masa depan.
              </p>
              <div className="text-[10px] text-[#0B70AD]">
                [ INTEGRITAS REKAYASA &bull; METODOLOGI TERUKUR ]
              </div>
            </div>

            <div className="md:col-span-4 space-y-2 text-xs">
              <div className="text-white font-semibold mb-3 uppercase tracking-wider text-[11px]">
                [ NAVIGASI DIREKTORI ]
              </div>
              <div className="grid grid-cols-2 gap-2 text-white/70">
                <a href="#hero" className="hover:text-[#0B70AD] transition-colors">01. Beranda</a>
                <a href="#manifesto" className="hover:text-[#0B70AD] transition-colors">02. Manifesto</a>
                <a href="#tentang" className="hover:text-[#0B70AD] transition-colors">03. Tentang Kami</a>
                <a href="#filosofi" className="hover:text-[#0B70AD] transition-colors">04. Filosofi Logo</a>
                <a href="#layanan" className="hover:text-[#0B70AD] transition-colors">05. Layanan</a>
                <a href="#proses" className="hover:text-[#0B70AD] transition-colors">06. Alur Rekayasa</a>
                <a href="#visi-misi" className="hover:text-[#0B70AD] transition-colors">07. Visi & Misi</a>
                <a href="#mitra" className="hover:text-[#0B70AD] transition-colors">08. Mitra</a>
                <a href="#kontak" className="hover:text-[#0B70AD] transition-colors">09. Kontak</a>
              </div>
            </div>

            <div className="md:col-span-3 text-left md:text-right">
              <div className="text-white font-semibold mb-3 uppercase tracking-wider text-[11px]">
                [ KONSULTASI REKAYASA ]
              </div>
              <button
                onClick={() => handleOpenConsultation()}
                className="bg-[#1B3459] hover:bg-[#0B70AD] text-white px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors border border-[#0B70AD]/40 cursor-pointer"
              >
                [ INISIASI KONSULTASI ]
              </button>
              <p className="text-[10px] text-white/40 mt-3">
                Saluran komunikasi resmi terverifikasi.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] text-white/40">
            <div>
              &copy; 2026 TARA REKAYASA. SELURUH HAK CIPTA DILINDUNGI.
            </div>
            <div className="mt-2 sm:mt-0 flex space-x-6">
              <span>PENDEKATAN TERSTRUKTUR & ADAPTIF</span>
              <span>&bull;</span>
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