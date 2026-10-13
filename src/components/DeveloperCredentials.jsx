import React from 'react';
import { Award, Trophy, Building, ShieldCheck, Calendar, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const MILESTONES = [
  {
    phase: 'PHASE 01',
    date: 'Q4 2025',
    title: 'Site Preparation & Basalt Bedrock Foundation',
    status: 'COMPLETED',
    progress: 100,
    desc: 'Subterranean geothermal drilling and volcanic bedrock stabilization for structural ribbons.'
  },
  {
    phase: 'PHASE 02',
    date: 'Q4 2027',
    title: 'Section 1 Structural Monolith & Glass Facade',
    status: 'IN ACTIVE PROGRESS',
    progress: 46,
    desc: 'Monolithic concrete ribbon framing, cantilevered terraces, and triple-glazed thermal envelopes.'
  },
  {
    phase: 'PHASE 03',
    date: 'Q4 2028',
    title: 'Section 2 Interior Architecture & Hydrothermal Spa',
    status: 'SCHEDULED',
    progress: 10,
    desc: 'Bespoke Hutsul wood craftsmanship, indoor and outdoor thermal pools, and Michelin dining pavilions.'
  },
  {
    phase: 'PHASE 04',
    date: 'Q1 2029',
    title: 'Grand Commissioning & Quarterly Dividend Distribution',
    status: 'TARGET TIMELINE',
    progress: 0,
    desc: 'Handover of suites to owners and initiation of full-capacity international hospitality operations.'
  }
];

export default function DeveloperCredentials() {
  return (
    <section id="credentials" className="py-32 px-6 md:px-14 bg-[#141210] border-t border-white/10 relative z-20 text-[#f5f0ea]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-3 font-mono text-xs text-amber-400 tracking-widest uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span>[ 11 / 14 — DEVELOPER GOVERNANCE & PROGRESS ]</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white tracking-tight">
              Backed by Proven Mastery
            </h2>
          </div>
          <div className="font-mono text-xs text-white/60 mt-4 md:mt-0">
            [ BLAGO URBAN TECH DEVELOPER • EST. 2004 ]
          </div>
        </div>

        {/* 4 Forbes & Institutional Credentials Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-8 border border-white/10 bg-[#181512]/90 backdrop-blur-md relative overflow-hidden group hover:border-amber-400/50 transition-all shadow-xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] text-amber-400 tracking-widest">[ FORBES UKRAINE ]</span>
              <Trophy size={18} className="text-amber-400" />
            </div>
            <div className="font-serif text-5xl md:text-6xl text-white font-bold mb-2">
              #2
            </div>
            <div className="font-mono text-xs text-white/70">
              Ranked 2nd Developer in Ukraine by Forbes
            </div>
          </div>

          <div className="p-8 border border-white/10 bg-[#181512]/90 backdrop-blur-md relative overflow-hidden group hover:border-emerald-400/50 transition-all shadow-xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] text-emerald-400 tracking-widest">[ EXPERIENCE ]</span>
              <Building size={18} className="text-emerald-400" />
            </div>
            <div className="font-serif text-5xl md:text-6xl text-white font-bold mb-2">
              20+
            </div>
            <div className="font-mono text-xs text-white/70">
              Years Shaping the Real Estate & Hospitality Market
            </div>
          </div>

          <div className="p-8 border border-white/10 bg-[#181512]/90 backdrop-blur-md relative overflow-hidden group hover:border-purple-400/50 transition-all shadow-xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] text-purple-400 tracking-widest">[ TRACK RECORD ]</span>
              <CheckCircle2 size={18} className="text-purple-400" />
            </div>
            <div className="font-serif text-5xl md:text-6xl text-white font-bold mb-2">
              37
            </div>
            <div className="font-mono text-xs text-white/70">
              Successfully Completed & Commissioned Projects
            </div>
          </div>

          <div className="p-8 border border-white/10 bg-[#181512]/90 backdrop-blur-md relative overflow-hidden group hover:border-blue-400/50 transition-all shadow-xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] text-blue-400 tracking-widest">[ GLOBAL RECOGNITION ]</span>
              <Award size={18} className="text-blue-400" />
            </div>
            <div className="font-serif text-5xl md:text-6xl text-white font-bold mb-2">
              7
            </div>
            <div className="font-mono text-xs text-white/70">
              International Property Awards in London
            </div>
          </div>
        </div>

        {/* Construction Progress Interactive Timeline */}
        <div className="bg-[#181512] border border-white/15 p-8 md:p-14 shadow-2xl relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
            <div>
              <span className="font-mono text-xs text-amber-400 tracking-widest uppercase block mb-1">
                [ CONSTRUCTION REPORT • VERIFIED AUTUMN 2026 ]
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-white">
                Execution Roadmap & Handover Schedule
              </h3>
            </div>
            <span className="font-mono text-xs text-emerald-400 border border-emerald-500/30 px-3 py-1 bg-emerald-950/20 self-start sm:self-auto">
              [ ON SCHEDULE FOR 2027 PHASE 1 ]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MILESTONES.map((m, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex justify-between items-center font-mono text-[10px]">
                  <span className="text-amber-400">{m.phase}</span>
                  <span className="text-white/60">{m.date}</span>
                </div>

                <div className="w-full h-1.5 bg-[#24201c] border border-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-amber-400 to-emerald-400 transition-all duration-700"
                    style={{ width: `${m.progress}%` }}
                  />
                </div>

                <div className="font-serif text-base text-white font-medium">
                  {m.title}
                </div>

                <p className="font-sans text-xs text-white/65 leading-relaxed">
                  {m.desc}
                </p>

                <div className="pt-2">
                  <span
                    className={`inline-block font-mono text-[9px] px-2 py-0.5 border ${
                      m.progress === 100
                        ? 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20'
                        : m.progress > 0
                        ? 'text-amber-400 border-amber-500/30 bg-amber-950/20'
                        : 'text-white/40 border-white/10'
                    }`}
                  >
                    [ {m.status} • {m.progress}% ]
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
