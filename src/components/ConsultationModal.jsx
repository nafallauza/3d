import React, { useState } from 'react';
import { X, CheckCircle2, ArrowUpRight, ShieldCheck, PhoneCall, Building2 } from 'lucide-react';

export default function ConsultationModal({ isOpen, onClose, defaultSuite = null }) {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: defaultSuite ? `Suite: ${defaultSuite}` : 'equity',
    capital: '$150,000 — $350,000',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after 3 seconds or allow manual close
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#24201c] border border-white/20 p-8 md:p-12 shadow-2xl text-[#f5f0ea] overflow-hidden">
        {/* Subtle chromatic top border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-emerald-400" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/60 hover:text-white p-1 border border-white/10 hover:border-amber-400 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-serif text-3xl text-white">
              Consultation Dispatched
            </h3>
            <p className="font-sans text-sm text-white/75 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-amber-400 font-semibold">{formData.name || 'Valued Partner'}</span>. Our Senior Investment Director will contact you within 2 business hours via <span className="text-emerald-400">{formData.email || formData.phone}</span>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-6 border border-white/20 hover:border-amber-400 px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-colors"
            >
              [ RETURN TO SHOWCASE ]
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center space-x-2 font-mono text-[10px] text-amber-400 tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>[ CONFIDENTIAL INVESTOR ENQUIRY ]</span>
            </div>

            <h3 className="font-serif text-2xl md:text-4xl text-white tracking-tight mb-2">
              Private Consultation
            </h3>
            <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed mb-6">
              Receive confidential financial modeling, verified yield audits by Colliers, and direct floorplan allocations.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                  [ FULL NAME ]
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Laurent Van Der Berg"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#2c2824] border border-white/15 focus:border-amber-400 p-3 font-sans text-sm text-white outline-none placeholder:text-white/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                    [ CORPORATE EMAIL ]
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#2c2824] border border-white/15 focus:border-amber-400 p-3 font-sans text-sm text-white outline-none placeholder:text-white/30"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                    [ DIRECT PHONE / WHATSAPP ]
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+380 / +1 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#2c2824] border border-white/15 focus:border-amber-400 p-3 font-sans text-sm text-white outline-none placeholder:text-white/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                    [ INTENDED ENGAGEMENT ]
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-[#2c2824] border border-white/15 focus:border-amber-400 p-3 font-sans text-xs text-white outline-none"
                  >
                    <option value="equity">Equity Investment (10% - 18.4% Net Yield)</option>
                    <option value="penthouse">Summit Penthouse Purchase</option>
                    <option value="suite">Forest Villa / 2-Bed Residence</option>
                    <option value="studio">Studio Apartment (From 37 m²)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                    [ TARGET CAPITAL COMMITMENT ]
                  </label>
                  <select
                    value={formData.capital}
                    onChange={(e) => setFormData({ ...formData, capital: e.target.value })}
                    className="w-full bg-[#2c2824] border border-white/15 focus:border-amber-400 p-3 font-sans text-xs text-white outline-none"
                  >
                    <option value="$75,000 — $150,000">$75,000 — $150,000</option>
                    <option value="$150,000 — $350,000">$150,000 — $350,000</option>
                    <option value="$350,000 — $1,000,000">$350,000 — $1,000,000</option>
                    <option value="$1,000,000+">$1,000,000+ (Institutional)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                data-cursor="TRANSMIT"
                className="w-full bg-gradient-to-r from-purple-700 via-amber-600 to-emerald-600 hover:from-purple-600 hover:to-emerald-500 text-white font-mono text-xs tracking-widest uppercase py-4 transition-all flex items-center justify-center space-x-2 font-bold cursor-pointer shadow-xl mt-4"
              >
                <span>[ TRANSMIT ENQUIRY DOSSIER ]</span>
                <ArrowUpRight size={14} />
              </button>

              <div className="pt-3 flex items-center justify-between font-mono text-[9px] text-white/40">
                <span className="flex items-center space-x-1">
                  <ShieldCheck size={11} className="text-emerald-400" />
                  <span>256-BIT ENCRYPTED</span>
                </span>
                <span>PROTECTED BY BLAGO PRIVACY ACCORD</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
