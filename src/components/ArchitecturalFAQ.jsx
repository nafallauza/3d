import React, { useState } from 'react';
import { ChevronDown, FileText, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

const FAQS = [
  {
    id: '01',
    category: 'STRUCTURAL ENGINEERING',
    tagColor: 'text-purple-400 border-purple-500/30 bg-purple-950/20',
    question: 'How does the parametric ribbon monolith withstand Carpathian seismic forces and heavy snowfall?',
    answer: 'The ribbon geometry is not purely aesthetic—it operates as a continuous load-distributing monocoque shell. Engineered with high-strength post-tensioned basalt-reinforced concrete and carbon timber composites, aerodynamic curves divert gale-force mountain winds while self-shedding snow loads across heated perimeter drains. The structure is certified to withstand Magnitude 7.8 seismic events.'
  },
  {
    id: '02',
    category: 'INVESTMENT & CAPITALIZATION',
    tagColor: 'text-amber-400 border-amber-500/30 bg-amber-950/20',
    question: 'What is the projected capital appreciation and dividend distribution model for suite owners?',
    answer: 'Independent audits by Colliers International project up to 30% capital appreciation from off-plan ground breaking through 2029 handover. Annual net rental yields are pooled across hospitality operations, delivering an anticipated 10% to 18.4% annual cash dividend, disbursed quarterly in EUR, USD, or Ukrainian Hryvnia.'
  },
  {
    id: '03',
    category: 'HOSPITALITY MANAGEMENT',
    tagColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20',
    question: 'Who oversees daily operations, property maintenance, and Michelin concierge services?',
    answer: 'The resort will be managed under an international 5-star European boutique hotel operator with over 25 years of luxury alpine asset experience. Services include 24/7 dedicated butler service, ski valet, private helicopter transfers, daily housekeeping, and year-round facility maintenance with zero operational burden on the owner.'
  },
  {
    id: '04',
    category: 'OWNER USAGE RIGHTS',
    tagColor: 'text-blue-400 border-blue-500/30 bg-blue-950/20',
    question: 'Can residence owners reside in their suites during peak ski and summer retreat seasons?',
    answer: 'Yes. Owners enjoy 30 to 45 complimentary days of personal occupancy each calendar year, including flexible high-season ski allocations. When not in personal residence, suites automatically enter the fully managed luxury rental pool to optimize quarterly investor yield.'
  },
  {
    id: '05',
    category: 'ECOLOGICAL SUSTAINABILITY',
    tagColor: 'text-rose-400 border-rose-500/30 bg-rose-950/20',
    question: 'What environmental standards and energy systems are integrated into Son Daven?',
    answer: 'Son Daven targets LEED Platinum and BREEAM Outstanding certifications. Energy is supplied via a closed-loop geothermal heat pump array tapping subterranean bedrock thermal reservoirs, supplemented by high-efficiency photovoltaic glass and heat recovery air exchangers, reducing grid dependence by over 74%.'
  }
];

export default function ArchitecturalFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-32 px-6 md:px-14 bg-[#2c2824] border-t border-white/10 relative z-20">
      {/* Subtle chromatic ambient glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-amber-400 uppercase">
                [ 11 / 13 — TECHNICAL DOSSIER & FAQ ]
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#f5f0ea] tracking-tight">
              Engineering & Governance
            </h2>
          </div>
          <div className="font-mono text-xs text-white/60 mt-4 md:mt-0">
            [ VERIFIED PROJECT SPECIFICATIONS ]
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className={`border transition-all duration-300 ${
                  isOpen
                    ? 'border-amber-400/50 bg-[#1a1715] shadow-2xl'
                    : 'border-white/10 bg-[#161412]/80 hover:border-white/25'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full text-left p-6 md:p-8 flex items-start justify-between space-x-4 cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 font-mono text-[10px] tracking-widest">
                      <span className={`px-2 py-0.5 border ${faq.tagColor}`}>
                        [ {faq.id} • {faq.category} ]
                      </span>
                    </div>
                    <h3 className="font-serif text-lg md:text-2xl text-[#f5f0ea] tracking-tight font-medium">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`mt-1 p-2 rounded-full border border-white/10 text-white/70 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-amber-400 border-amber-400/40 bg-amber-950/20' : ''
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-8 md:px-8 pt-2 border-t border-white/10 animate-fadeIn">
                    <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed max-w-3xl">
                      {faq.answer}
                    </p>

                    <div className="flex items-center space-x-6 mt-6 pt-4 border-t border-white/5 font-mono text-[11px] text-white/60">
                      <span className="flex items-center space-x-2 text-emerald-400">
                        <CheckCircle2 size={14} />
                        <span>VERIFIED BY BLAGO LEGAL & ENGINEERING</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Technical Blueprint Download Strip */}
        <div className="mt-12 p-6 md:p-8 border border-white/10 bg-gradient-to-r from-purple-950/30 via-[#181512] to-amber-950/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 border border-amber-400/30 bg-amber-950/30 text-amber-400">
              <FileText size={24} />
            </div>
            <div>
              <div className="font-serif text-lg text-white font-semibold">
                Download Structural Masterplan & Financial Whitepaper
              </div>
              <div className="font-mono text-xs text-white/60">
                PDF Specification • 48 Pages • CAD Vector Schematics (18.4 MB)
              </div>
            </div>
          </div>

          <a
            href="#inquiry"
            data-cursor="DOWNLOAD"
            className="border border-white/20 hover:border-amber-400 px-6 py-3 font-mono text-xs tracking-widest uppercase text-white hover:text-amber-400 transition-colors whitespace-nowrap bg-[#24201c]"
          >
            [ REQUEST CAD BLUEPRINTS ]
          </a>
        </div>
      </div>
    </section>
  );
}
