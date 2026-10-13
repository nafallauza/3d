import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function FinancialModel() {
  return (
    <section className="py-28 px-6 md:px-14 bg-[#a89474] text-[#2c2824] border-t border-[#2c2824]/20 relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#2c2824]/20 pb-8 mb-12">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#2c2824]/80 uppercase block mb-3">
              [ 07 / 08 — FINANCIAL MODEL & PROJECTIONS ]
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#2c2824] tracking-tight">
              Predictable High-Yield Asset
            </h2>
          </div>
          <div className="font-mono text-xs text-[#2c2824]/70 mt-4 md:mt-0">
            [ CAPITAL PRESERVATION & REALIZED APPRECIATION ]
          </div>
        </div>

        {/* 4 Large Highlight Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'ANNUAL YIELD', val: 'Up to 18%', desc: 'Projected net return' },
            { label: 'CAPITAL GROWTH', val: 'Up to 30%', desc: 'Upon completion (2029)' },
            { label: 'INSTALLMENT', val: '24 Months', desc: '0% interest schedule' },
            { label: 'DOWN PAYMENT', val: 'From 30%', desc: 'Flexible reservation' },
          ].map((c, i) => (
            <div
              key={i}
              className="border border-[#2c2824]/25 bg-[#9e8b6d]/40 p-6 flex flex-col justify-between hover:border-[#2c2824] transition-all"
            >
              <div className="font-mono text-[10px] text-[#2c2824]/60 uppercase tracking-widest">
                [ {c.label} ]
              </div>
              <div className="font-serif text-3xl md:text-4xl text-[#2c2824] my-3 font-bold">
                {c.val}
              </div>
              <div className="font-mono text-[11px] text-[#2c2824]/75">
                {c.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Two-Column Comparison Table (Exactly Sondaven) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Table: Our Forecast */}
          <div className="border border-[#2c2824]/25 bg-[#a89474] p-8 shadow-sm">
            <h3 className="font-serif text-2xl text-[#2c2824] mb-6 flex items-center justify-between">
              <span>Our Forecast</span>
              <span className="font-mono text-xs text-[#2c2824]/60">[ 01 ]</span>
            </h3>

            <div className="divide-y divide-[#2c2824]/20 font-mono text-xs">
              <div className="py-4 flex justify-between items-center">
                <span className="text-[#2c2824]/70">Estimated payback period</span>
                <span className="font-semibold text-sm">≈ 7 Years</span>
              </div>
              <div className="py-4 flex justify-between items-center">
                <span className="text-[#2c2824]/70">Average annual occupancy</span>
                <span className="font-semibold text-sm">≈ 65% — 72%</span>
              </div>
              <div className="py-4 flex justify-between items-center">
                <span className="text-[#2c2824]/70">Management model</span>
                <span className="font-semibold">Full 5-Star SD Management</span>
              </div>
              <div className="py-4 flex justify-between items-center">
                <span className="text-[#2c2824]/70">Legal asset ownership</span>
                <span className="font-semibold">Freehold Title Deed</span>
              </div>
            </div>
          </div>

          {/* Right Table: Owner Privileges */}
          <div className="border border-[#2c2824]/25 bg-[#a89474] p-8 shadow-sm">
            <h3 className="font-serif text-2xl text-[#2c2824] mb-6 flex items-center justify-between">
              <span>Owner Privileges</span>
              <span className="font-mono text-xs text-[#2c2824]/60">[ 02 ]</span>
            </h3>

            <div className="divide-y divide-[#2c2824]/20 font-mono text-xs">
              <div className="py-4 flex justify-between items-center">
                <span className="text-[#2c2824]/70">Complimentary stay per year</span>
                <span className="font-semibold text-sm">30 Days</span>
              </div>
              <div className="py-4 flex justify-between items-center">
                <span className="text-[#2c2824]/70">Year-round operation</span>
                <span className="font-semibold">Active all 365 Days</span>
              </div>
              <div className="py-4 flex justify-between items-center">
                <span className="text-[#2c2824]/70">Wellness & SPA VIP Access</span>
                <span className="font-semibold">Unlimited Family Tier</span>
              </div>
              <div className="py-4 flex justify-between items-center">
                <span className="text-[#2c2824]/70">Resale & Transfer flexibility</span>
                <span className="font-semibold">Unrestricted Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
