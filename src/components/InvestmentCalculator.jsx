import React, { useState } from 'react';
import { Calculator, ArrowUpRight, TrendingUp, ShieldCheck, Clock, DollarSign, Euro, Coins, Percent } from 'lucide-react';

const CURRENCIES = {
  USD: { symbol: '$', rate: 1, name: 'USD' },
  EUR: { symbol: '€', rate: 0.92, name: 'EUR' },
  UAH: { symbol: '₴', rate: 41.5, name: 'UAH' },
};

export default function InvestmentCalculator({ onOpenConsultation }) {
  const [currency, setCurrency] = useState('USD');
  const [baseUsdAmount, setBaseUsdAmount] = useState(150000);
  const [occupancyRate, setOccupancyRate] = useState(68); // 68% conservative average

  const curr = CURRENCIES[currency];
  const convertedAmount = Math.round(baseUsdAmount * curr.rate);

  // Financial model formula
  const baseYieldRate = 0.184; // 18.4% at standard 70% occupancy
  const adjustedYieldRate = (baseYieldRate * (occupancyRate / 70)).toFixed(3);
  const annualDividend = Math.round(convertedAmount * adjustedYieldRate);
  const monthlyCashflow = Math.round(annualDividend / 12);
  const fiveYearCapitalGain = Math.round(convertedAmount * 0.30); // 30% asset appreciation
  const fiveYearTotalReturn = fiveYearCapitalGain + (annualDividend * 5);
  const paybackYears = (convertedAmount / annualDividend).toFixed(1);

  return (
    <section id="calculator" className="py-32 px-6 md:px-14 bg-[#2c2824] text-[#f5f0ea] border-t border-white/10 relative z-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-3 font-mono text-xs text-amber-400 tracking-widest uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span>[ 09 / 14 — FINANCIAL AUDIT & YIELD SIMULATOR ]</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white tracking-tight">
              Interactive Yield Calculator
            </h2>
          </div>

          {/* Currency Switcher */}
          <div className="mt-6 md:mt-0 flex items-center space-x-2 bg-[#1a1715] border border-white/15 p-1 font-mono text-xs">
            <span className="text-white/50 px-2">[ CURRENCY ]</span>
            {Object.keys(CURRENCIES).map((cKey) => (
              <button
                key={cKey}
                onClick={() => setCurrency(cKey)}
                className={`px-3 py-1.5 transition-all cursor-pointer ${
                  currency === cKey
                    ? 'bg-amber-400 text-black font-bold shadow-md'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {cKey} ({CURRENCIES[cKey].symbol})
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Calculator Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Slider Control Panel */}
          <div className="lg:col-span-7 bg-[#24201c] border border-white/15 p-8 md:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center mb-6 font-mono text-xs text-amber-400 uppercase tracking-wider">
                <span>[ CAPITAL ALLOCATION ]</span>
                <span className="text-white/60">DOWN PAYMENT FROM 30%</span>
              </div>

              {/* Dynamic Display of Selected Amount */}
              <div className="font-serif text-5xl md:text-7xl text-white tracking-tight mb-8">
                {curr.symbol}{convertedAmount.toLocaleString()}
              </div>

              {/* Amount Slider */}
              <div className="space-y-3 mb-8">
                <input
                  type="range"
                  min="50000"
                  max="1000000"
                  step="10000"
                  value={baseUsdAmount}
                  onChange={(e) => setBaseUsdAmount(Number(e.target.value))}
                  className="w-full h-2 bg-[#2c2824] accent-amber-400 rounded-none cursor-pointer appearance-none border border-white/10"
                />
                <div className="flex justify-between font-mono text-[10px] text-white/50">
                  <span>{curr.symbol}{(50000 * curr.rate).toLocaleString()} MIN</span>
                  <span>{curr.symbol}{(500000 * curr.rate).toLocaleString()}</span>
                  <span>{curr.symbol}{(1000000 * curr.rate).toLocaleString()} MAX</span>
                </div>
              </div>

              {/* Preset Quick Buttons */}
              <div className="grid grid-cols-4 gap-2 font-mono text-xs mb-8">
                {[75000, 150000, 350000, 750000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setBaseUsdAmount(preset)}
                    className={`py-2 px-2 border text-center transition-all cursor-pointer ${
                      baseUsdAmount === preset
                        ? 'border-amber-400 bg-amber-400/10 text-amber-400 font-bold'
                        : 'border-white/10 bg-[#2c2824] text-white/70 hover:border-white/30'
                    }`}
                  >
                    {curr.symbol}{(preset * curr.rate).toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Occupancy Rate Slider */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex justify-between items-center mb-2 font-mono text-xs">
                  <span className="text-white/60">[ OCCUPANCY STRESS-TEST ]</span>
                  <span className="text-amber-400 font-semibold">{occupancyRate}% ANNUAL OCCUPANCY</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="90"
                  step="2"
                  value={occupancyRate}
                  onChange={(e) => setOccupancyRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#2c2824] accent-emerald-400 rounded-none cursor-pointer appearance-none border border-white/10"
                />
                <div className="flex justify-between font-mono text-[10px] text-white/40 mt-1">
                  <span>50% CONSERVATIVE</span>
                  <span>68% SONDAVEN AUDIT</span>
                  <span>90% PEAK SKI SEASON</span>
                </div>
              </div>
            </div>

            {/* Bottom Investor Safeguards */}
            <div className="pt-8 border-t border-white/10 font-mono text-[11px] text-white/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="flex items-center space-x-2 text-emerald-400">
                <ShieldCheck size={14} />
                <span>30 Days Free Owner Accommodation Included</span>
              </span>
              <span className="text-white/50">Colliers Verified Model</span>
            </div>
          </div>

          {/* Right Live Simulation Output Metrics */}
          <div className="lg:col-span-5 bg-[#24201c] border border-white/20 p-8 md:p-10 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="font-mono text-xs text-amber-400 tracking-widest uppercase border-b border-white/10 pb-3 flex justify-between items-center">
                <span>[ PROJECTED INVESTOR RETURNS ]</span>
                <TrendingUp size={16} className="text-emerald-400" />
              </div>

              <div>
                <span className="font-mono text-[10px] text-white/60 uppercase block mb-1">
                  [ ANNUAL CASH DIVIDEND @ {(adjustedYieldRate * 100).toFixed(1)}% NET ]
                </span>
                <div className="font-serif text-3xl md:text-5xl text-emerald-400 tracking-tight font-bold">
                  +{curr.symbol}{annualDividend.toLocaleString()}
                  <span className="font-mono text-xs font-normal text-white/60"> / YEAR</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 font-mono text-xs">
                <div>
                  <span className="text-white/50 block text-[10px] mb-1">[ MONTHLY CASHFLOW ]</span>
                  <span className="text-white text-lg font-semibold">
                    +{curr.symbol}{monthlyCashflow.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-white/50 block text-[10px] mb-1">[ PAYBACK PERIOD ]</span>
                  <span className="text-white text-lg font-semibold">
                    ≈ {paybackYears} Years
                  </span>
                </div>
              </div>

              <div className="p-4 border border-white/10 bg-[#141210]/60 space-y-2">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-white/60">5-Year Capital Gain (+30%):</span>
                  <span className="text-amber-400">+{curr.symbol}{fiveYearCapitalGain.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-mono text-xs border-t border-white/10 pt-2 font-bold">
                  <span className="text-white">Total 5-Year Net ROI:</span>
                  <span className="text-emerald-400">+{curr.symbol}{fiveYearTotalReturn.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenConsultation}
              data-cursor="CALCULATE"
              className="mt-6 w-full bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-black font-mono text-xs tracking-widest uppercase py-4 transition-all flex items-center justify-center space-x-2 font-bold cursor-pointer shadow-xl"
            >
              <span>[ REQUEST DETAILED CASHFLOW AUDIT ]</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
