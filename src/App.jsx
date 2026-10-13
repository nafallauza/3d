import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import ModelViewer from './components/ModelViewer';
import AboutSection from './components/AboutSection';
import HorizontalGallery from './components/HorizontalGallery';
import InteractiveMap from './components/InteractiveMap';
import MagneticButton from './components/MagneticButton';
import TextHighlight from './components/TextHighlight';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import PineNeedleTransition from './components/PineNeedleTransition';
import SeasonSwitcher from './components/SeasonSwitcher';
import InvestmentCalculator from './components/InvestmentCalculator';
import CinematicReel from './components/CinematicReel';
import MarqueeTicker from './components/MarqueeTicker';
import DeveloperCredentials from './components/DeveloperCredentials';
import ProjectGallery from './components/ProjectGallery';
import ArchitecturalFAQ from './components/ArchitecturalFAQ';
import NavigationDrawer from './components/NavigationDrawer';
import ConsultationModal from './components/ConsultationModal';
import { ambientSound } from './utils/ambientAudio';
import { Clock, Menu, FileText, ArrowUpRight, Sparkles, MapPin, Phone, Mail } from 'lucide-react';

export default function App() {
  const scrollProgress = useRef(0);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeKyiv, setTimeKyiv] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationSuite, setConsultationSuite] = useState(null);

  const handleOpenConsultation = (suiteTitle = null) => {
    setConsultationSuite(suiteTitle);
    setIsConsultationOpen(true);
  };

  // Update Kyiv Live Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeKyiv(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Europe/Kyiv',
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

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    const searchParams = new URLSearchParams(window.location.search);
    const scrollParam = searchParams.get('scroll');
    const sectionParam = searchParams.get('section');

    const triggerJump = () => {
      if (sectionParam) {
        const el = document.getElementById(sectionParam);
        if (el) {
          const rect = el.getBoundingClientRect();
          const targetY = rect.top + window.scrollY - 30;
          window.scrollTo(0, targetY);
          lenis.scrollTo(targetY, { immediate: true });
        }
      } else if (scrollParam) {
        const scrollPos = parseInt(scrollParam, 10);
        window.scrollTo(0, scrollPos);
        lenis.scrollTo(scrollPos, { immediate: true });
      }
    };

    setTimeout(triggerJump, 50);
    setTimeout(triggerJump, 250);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? window.scrollY / totalScroll : 0;
      scrollProgress.current = progress;

      // Update active section based on scroll position
      const sections = ['hero', 'prologue', 'about', 'location', 'residences', 'reel', 'canopy', 'calculator', 'seasons', 'credentials', 'gallery', 'faq', 'inquiry'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.15) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    lenis.on('scroll', handleScroll);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Anchor navigation with Lenis
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, { offset: -30, duration: 1.4 });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  const handleToggleSound = () => {
    const state = ambientSound.toggle();
    setIsPlayingSound(state);
  };

  return (
    <div className="relative min-h-screen bg-[#2c2824] text-[#f5f0ea] font-sans selection:bg-amber-400 selection:text-black overflow-x-hidden">
      {/* 1. Film Grain Analog Noise Overlay */}
      <div className="noise-overlay" />

      {/* 2. Atmospheric Chromatic Glows (Harmonizing softly with the 3D model's vibrant spectrum) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[550px] h-[550px] bg-purple-900/12 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 left-1/3 w-[650px] h-[650px] bg-amber-600/10 rounded-full blur-[170px]" />
        <div className="absolute top-1/2 -right-20 w-[550px] h-[550px] bg-emerald-800/12 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[550px] h-[550px] bg-blue-900/12 rounded-full blur-[160px]" />
      </div>

      {/* 3. Bespoke Editorial Preloader */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* 4. Custom Magnetic Awwwards Cursor */}
      <CustomCursor />

      {/* 5. Three.js 3D WebGL Canvas with 100% Original Blender Materials */}
      <ModelViewer scrollProgress={scrollProgress} />

      {/* 6. Architectural Viewport Blueprint Border Frame */}
      <div className="fixed inset-4 md:inset-6 pointer-events-none z-40 border border-white/10 hidden lg:block">
        <span className="absolute -top-1.5 -left-1.5 text-amber-400/60 font-mono text-xs">+</span>
        <span className="absolute -top-1.5 -right-1.5 text-emerald-400/60 font-mono text-xs">+</span>
        <span className="absolute -bottom-1.5 -left-1.5 text-purple-400/60 font-mono text-xs">+</span>
        <span className="absolute -bottom-1.5 -right-1.5 text-blue-400/60 font-mono text-xs">+</span>
      </div>

      {/* 7. Top Floating Luxury Navbar (Authentic Sondaven Editorial Header) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#2c2824]/90 backdrop-blur-md border-b border-white/10 px-6 md:px-14 py-4 flex items-center justify-between transition-all duration-300">
        {/* Left: Menu Trigger & Aerotour */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setIsNavOpen(true)}
            data-cursor="MENU"
            className="group flex items-center space-x-3 border border-white/20 hover:border-amber-400 bg-[#24201c] px-4 py-2 font-mono text-xs text-white tracking-widest uppercase transition-all cursor-pointer"
          >
            <div className="flex flex-col space-y-1 w-4">
              <span className="h-[1.5px] w-full bg-white group-hover:bg-amber-400 transition-colors" />
              <span className="h-[1.5px] w-3/4 bg-white group-hover:bg-amber-400 transition-colors" />
            </div>
            <span>[ MENU ]</span>
          </button>

          <a
            href="https://virtualukraine.travel/F1F1BBy7zo/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="AEROTOUR"
            className="hidden sm:inline-flex items-center space-x-1.5 font-mono text-[11px] text-white/70 hover:text-white uppercase tracking-wider transition-colors"
          >
            <span>Aerotour</span>
            <ArrowUpRight size={12} className="text-amber-400" />
          </a>
        </div>

        {/* Center: Son Daven Brand Logo */}
        <div className="flex items-center space-x-2">
          <a href="#hero" className="group text-center">
            <span className="font-serif text-2xl md:text-3xl tracking-tighter font-bold uppercase text-[#f5f0ea] group-hover:text-amber-400 transition-colors">
              Son Daven
            </span>
          </a>
          <span className="hidden md:inline-block font-mono text-[9px] tracking-widest text-amber-400 uppercase pl-2 border-l border-white/20">
            [ BY BLAGO ]
          </span>
        </div>

        {/* Right: Live Clock, Ambient Audio, and Consultation CTA */}
        <div className="flex items-center space-x-3 md:space-x-5">
          <div className="font-mono text-[10px] tracking-wider text-white/70 hidden lg:flex items-center space-x-2 border-r border-white/20 pr-4">
            <Clock size={12} className="text-amber-400" />
            <span>KYIV {timeKyiv}</span>
          </div>

          <button
            onClick={handleToggleSound}
            data-cursor="AUDIO"
            className="group flex items-center space-x-2 border border-white/20 hover:border-amber-400 px-3 py-2 font-mono text-[10px] tracking-wider text-white transition-all bg-[#24201c] cursor-pointer"
            title="Toggle Alpine Wind Ambient Audio"
          >
            <div className="flex items-end space-x-[2px] h-3 w-3">
              <span className={`w-[2px] bg-amber-400 transition-all ${isPlayingSound ? 'h-3 animate-pulse' : 'h-1'}`} />
              <span className={`w-[2px] bg-emerald-400 transition-all ${isPlayingSound ? 'h-2 animate-pulse delay-75' : 'h-2'}`} />
              <span className={`w-[2px] bg-purple-400 transition-all ${isPlayingSound ? 'h-3 animate-pulse delay-150' : 'h-1'}`} />
            </div>
            <span className="hidden md:inline-block">
              {isPlayingSound ? '[ AUDIO ON ]' : '[ MUTED ]'}
            </span>
          </button>

          <button
            onClick={() => handleOpenConsultation()}
            data-cursor="CONSULT"
            className="border border-amber-400/60 hover:border-amber-400 bg-amber-950/20 hover:bg-amber-500/20 px-4 py-2 font-mono text-xs text-amber-400 hover:text-white uppercase tracking-wider transition-all cursor-pointer font-semibold"
          >
            [ CONSULTATION ]
          </button>
        </div>
      </header>

      {/* Main Content Flow */}
      <main className="relative z-20 pointer-events-auto">
        {/* =========================================
            SECTION 1: HERO (Warm Velvet Obsidian)
        ========================================= */}
        <section
          id="hero"
          className="relative min-h-screen flex flex-col justify-between px-6 md:px-14 pt-32 pb-12"
        >
          {/* Top Section Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/10 pb-8 items-start">
            <div className="md:col-span-6">
              <div className="font-mono text-xs tracking-[0.25em] text-amber-400/90 uppercase mb-3 flex items-center space-x-2">
                <span>✦ ✦ ✦</span>
                <span>INVESTMENT PROJECT</span>
                <span>✦ ✦ ✦</span>
              </div>

              <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.82] text-[#f5f0ea]">
                Son Daven
              </h1>
              <div className="font-mono text-xs tracking-widest text-white/60 mt-3">
                BY BLAGO DEVELOPMENT • CARPATHIAN RETREAT
              </div>
            </div>

            {/* Core Macro Metrics */}
            <div className="md:col-span-3 border-l border-white/10 pl-6">
              <div className="font-serif text-4xl md:text-5xl text-amber-400 tracking-tight font-bold">
                <span className="text-xl font-sans font-normal text-white/70 mr-1">Up to</span>10%
              </div>
              <div className="font-mono text-[11px] text-white/70 mt-2 uppercase tracking-wider">
                Expected Annual Return
              </div>
            </div>

            <div className="md:col-span-3 border-l border-white/10 pl-6">
              <div className="font-serif text-4xl md:text-5xl text-emerald-400 tracking-tight font-bold">
                <span className="text-xl font-sans font-normal text-white/70 mr-1">Up to</span>30%
              </div>
              <div className="font-mono text-[11px] text-white/70 mt-2 uppercase tracking-wider">
                Capitalisation Potential
              </div>
            </div>
          </div>

          {/* Bottom Section: Resort Title + Interactive Magnetic Button */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-12">
            <div className="md:col-span-8">
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#f5f0ea] tracking-tight max-w-3xl leading-tight mb-8">
                Resort Design Hotel in Yaremche
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs text-white/75 border-t border-white/10 pt-6">
                <div>
                  <span className="text-amber-400/80 block mb-1">[ LOCATION ]</span>
                  <span className="font-semibold text-white">Yaremche, Ivano-Frankivsk</span>
                </div>
                <div>
                  <span className="text-emerald-400/80 block mb-1">[ DEVELOPMENT ]</span>
                  <span className="font-semibold text-white">Blago Development</span>
                </div>
                <div>
                  <span className="text-purple-400/80 block mb-1">[ CONSTRUCTION ]</span>
                  <span className="font-semibold text-white">Period 2026 — 2029</span>
                </div>
              </div>
            </div>

            {/* Magnetic Button */}
            <div className="md:col-span-4 flex justify-start md:justify-end">
              <MagneticButton
                onClick={() => handleOpenConsultation()}
                className="bg-[#24201c] text-white border-white/20 hover:border-amber-400 hover:bg-gradient-to-br hover:from-amber-900/40 hover:to-purple-900/40"
              >
                Invest in Son Daven
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* Infinite Kinetic Typography Marquee */}
        <MarqueeTicker />

        {/* =========================================
            SECTION 2: PROLOGUE (Word-by-word Scrub Reveal • PURE EDITORIAL LUXURY)
        ========================================= */}
        <section
          id="prologue"
          className="min-h-screen px-6 md:px-14 py-36 border-t border-white/10 flex flex-col justify-center relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              {/* Left Column (7 cols): Open, breathtaking poetry with glowing scrub highlight */}
              <div className="lg:col-span-7 z-20">
                <div className="flex items-center space-x-3 mb-10">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="font-mono text-xs tracking-widest text-amber-400 uppercase">
                    [ 02 / PROLOGUE ]
                  </span>
                </div>

                {/* Interactive Scroll-Scrub Highlighted Quote */}
                <TextHighlight
                  text="“Among these mountains, where the wind becomes a voice and forests guard the wisdom of thousands of years, the Carpathian heritage comes alive—a primal force that reconnects people with their roots and empowers them to bring an ancient dream to life”"
                  className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#f5f0ea] tracking-tight mb-12 leading-[1.18]"
                />

                <p className="font-sans text-base md:text-lg text-white/70 max-w-xl leading-relaxed mb-10 font-light">
                  Son Daven is located at the foothills of the Carpathian Mountains, in the very heart of Yaremche—the capital of Hutsul heritage and enchanting nature.
                </p>

                <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
                  <a
                    href="https://assets.sondaven.com/SD_%D0%BF%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D1%96%D1%8F_9_2026%2B_s.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="PDF"
                    className="inline-flex items-center space-x-3 px-6 py-3 border border-white/20 hover:border-amber-400 bg-[#181512] text-white hover:text-amber-400 font-mono text-xs tracking-widest uppercase transition-all"
                  >
                    <FileText size={14} className="text-amber-400" />
                    <span>Download PDF Presentation</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>

              {/* Right Column (5 cols): Reserved open space where 3D ribbon sculpture shines */}
              <div className="lg:col-span-5 hidden lg:block" />
            </div>
          </div>
        </section>

        {/* =========================================
            SECTION 3: ABOUT US & CONCEPT (THE WARM SAND LIGHT SECTION WITH NEEDLE TRANSITIONS)
        ========================================= */}
        <AboutSection onOpenConsultation={handleOpenConsultation} />

        {/* =========================================
            SECTION 4: WHERE THE MOUNTAINS SPEAK (TOPOGRAPHY & ILLUSTRATED MAP)
        ========================================= */}
        <InteractiveMap />

        {/* =========================================
            SECTION 5: SUITES & RESIDENCES (PINNED HORIZONTAL TRACK)
        ========================================= */}
        <div id="residences">
          <HorizontalGallery onOpenConsultation={handleOpenConsultation} />
        </div>

        {/* =========================================
            SECTION 6: CINEMATIC 4K VIDEO REEL
        ========================================= */}
        <div id="reel">
          <CinematicReel />
        </div>

        {/* =========================================
            SECTION 7: THE LIVING PINE CANOPY (JAGGED NEEDLES FROM USER SCREENSHOT)
        ========================================= */}
        <div id="canopy">
          <PineNeedleTransition />
        </div>

        {/* =========================================
            SECTION 8: FINANCIAL INDICATORS & INTERACTIVE YIELD SIMULATOR
        ========================================= */}
        <div id="calculator">
          <InvestmentCalculator onOpenConsultation={handleOpenConsultation} />
        </div>

        {/* =========================================
            SECTION 9: FOUR SEASONS INTERACTIVE EXPERIENCE (SUMMER / WINTER)
        ========================================= */}
        <div id="seasons">
          <SeasonSwitcher />
        </div>

        {/* =========================================
            SECTION 10: DEVELOPER CREDENTIALS & CONSTRUCTION ROADMAP (FORBES #2)
        ========================================= */}
        <div id="credentials">
          <DeveloperCredentials />
        </div>

        {/* =========================================
            SECTION 11: PROJECT ARCHIVE GALLERY (AUTHENTIC SONDAVEN RENDERS)
        ========================================= */}
        <ProjectGallery />

        {/* =========================================
            SECTION 12: ARCHITECTURAL & LEGAL FAQ
        ========================================= */}
        <ArchitecturalFAQ />

        {/* =========================================
            SECTION 13: PRIVATE DOSSIER REQUEST & CONSULTATION
        ========================================= */}
        <section
          id="inquiry"
          className="min-h-screen px-6 md:px-14 py-36 border-t border-white/10 flex flex-col justify-center bg-[#2c2824]"
        >
          <div className="max-w-4xl mx-auto w-full bg-[#24201c] border border-white/15 p-8 md:p-14 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
              <span className="font-mono text-xs text-amber-400 tracking-widest uppercase">
                [ 12 / 12 ] PRIVATE DOSSIER & INQUIRY
              </span>
              <span className="font-mono text-xs text-white/50">CONFIDENTIAL</span>
            </div>

            <h2 className="font-serif text-3xl md:text-5xl text-[#f5f0ea] tracking-tight mb-4">
              Invest in Son Daven
            </h2>
            <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed mb-8 font-light">
              Prospective partners and guests are invited to request the private investment dossier, complete with financial models, yield projections, and apartment floorplans.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleOpenConsultation();
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                    [ FULL NAME ]
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Laurent Van Der Berg"
                    className="w-full bg-[#2c2824] border border-white/15 focus:border-amber-400 p-3 font-sans text-sm text-[#f5f0ea] outline-none transition-colors placeholder:text-white/30"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                    [ BUSINESS EMAIL ]
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. contact@investments.com"
                    className="w-full bg-[#2c2824] border border-white/15 focus:border-amber-400 p-3 font-sans text-sm text-[#f5f0ea] outline-none transition-colors placeholder:text-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                  [ INTENDED ENGAGEMENT ]
                </label>
                <select className="w-full bg-[#2c2824] border border-white/15 focus:border-amber-400 p-3 font-sans text-sm text-[#f5f0ea] outline-none transition-colors">
                  <option value="investment">Equity Investment & Projected Annual Yield (10% - 18.4%)</option>
                  <option value="residence">Private Residence Suite Purchase</option>
                  <option value="hospitality">Executive Retreat Booking (2027)</option>
                </select>
              </div>

              <button
                type="submit"
                data-cursor="SUBMIT"
                className="w-full bg-[#a89474] hover:bg-[#c7b89f] text-[#2c2824] font-mono text-xs tracking-widest uppercase py-4 transition-all flex items-center justify-center space-x-2 mt-4 cursor-pointer font-bold shadow-xl"
              >
                <span>[ TRANSMIT DOSSIER REQUEST ]</span>
                <ArrowUpRight size={14} />
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 px-6 md:px-14 py-12 bg-[#0e0c0a] text-white/60 font-mono text-xs">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
            <div className="md:col-span-5">
              <span className="font-serif text-3xl font-bold uppercase text-white block mb-2">
                Son Daven
              </span>
              <p className="font-sans text-xs text-white/50 max-w-sm leading-relaxed mb-4">
                Carpathian Design Resort Hotel by Blago Development. A place of power where ancient Hutsul roots unite with contemporary architectural mastery.
              </p>
              <div className="text-[10px] text-amber-400">
                [ 48.4519° N, 24.5619° E • ELEVATION 585M ASL ]
              </div>
            </div>

            <div className="md:col-span-4 space-y-2 text-xs">
              <div className="text-white font-semibold mb-3 uppercase tracking-wider text-[11px]">
                [ SALES OFFICE & CONCIERGE ]
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <MapPin size={13} className="text-amber-400" />
                <span>Str. I. Petrasha, 6/3, Yaremche, Ukraine</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <Phone size={13} className="text-amber-400" />
                <a href="tel:+380635101101" className="hover:text-amber-400 transition-colors">
                  +380 (63) 510-11-01
                </a>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <Mail size={13} className="text-amber-400" />
                <a href="mailto:sale@sondaven.com" className="hover:text-amber-400 transition-colors">
                  sale@sondaven.com
                </a>
              </div>
            </div>

            <div className="md:col-span-3 text-right md:text-right">
              <div className="text-white font-semibold mb-3 uppercase tracking-wider text-[11px]">
                [ GUARANTEED RETURNS ]
              </div>
              <div className="font-serif text-3xl text-amber-400 font-bold mb-1">
                10% P.A.
              </div>
              <p className="text-[10px] text-white/50">
                Contractually backed by SD Management & Blago Holding.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] text-white/40">
            <div>
              © 2026 SON DAVEN RESORT. ALL RIGHTS RESERVED.
            </div>
            <div className="mt-2 sm:mt-0 flex space-x-6">
              <span>DESIGNED & ARCHITECTED BY BLAGO</span>
              <span>•</span>
              <span className="text-amber-400/80">AWWWARDS STANDARD 30JT SPECIFICATION</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Fullscreen Luxury Navigation Drawer Modal */}
      <NavigationDrawer
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        isPlayingSound={isPlayingSound}
        onToggleSound={handleToggleSound}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Interactive Investor Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultSuite={consultationSuite}
      />
    </div>
  );
}
