import React, { useState } from 'react';
import { X, CheckCircle2, ArrowUpRight, ShieldCheck, Mail, Building2 } from 'lucide-react';

export default function ConsultationModal({ isOpen, onClose, defaultTopic = null }) {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    topic: defaultTopic || 'perancangan',
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0D192E] border border-white/20 p-8 md:p-12 shadow-2xl text-[#F8FAFC] overflow-hidden">
        {/* Brand identity top bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1B3459] via-[#0B70AD] to-[#C91C22]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/60 hover:text-white p-1 border border-white/10 hover:border-[#C91C22] transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#0B70AD]/20 border border-[#0B70AD] flex items-center justify-center mx-auto text-[#0B70AD]">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-serif text-3xl text-white">
              Permintaan Terkirim
            </h3>
            <p className="font-sans text-sm text-white/75 max-w-md mx-auto leading-relaxed font-light">
              Terima kasih, <span className="text-[#0B70AD] font-semibold">{formData.name || 'Bapak/Ibu'}</span>. Tim teknis Tara Rekayasa akan meninjau kebutuhan proyek Anda dan menghubungi melalui surel <span className="text-white font-mono">{formData.email}</span>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-6 border border-white/20 hover:border-[#0B70AD] px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-colors cursor-pointer"
            >
              [ KEMBALI KE WEBSITE ]
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs text-[#0B70AD] uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-[#0B70AD]" />
              <span>[ KONSULTASI REKAYASA PRESISI ]</span>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl text-white mb-2 font-medium">
              Inisiasi Diskusi Teknis
            </h2>
            <p className="font-sans text-xs text-white/60 font-light mb-6">
              Sampaikan kebutuhan rekayasa Anda secara terstruktur. Tim kami akan menyiapkan respons analisis awal.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                  [ NAMA LENGKAP ] *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nama pemohon"
                  className="w-full bg-[#070E1A] border border-white/15 focus:border-[#0B70AD] p-3 font-sans text-sm text-white outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                    [ EMAIL RESMI ] *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@institusi.com"
                    className="w-full bg-[#070E1A] border border-white/15 focus:border-[#0B70AD] p-3 font-sans text-sm text-white outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                    [ INSTITUSI / PERUSAHAAN ]
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Nama institusi"
                    className="w-full bg-[#070E1A] border border-white/15 focus:border-[#0B70AD] p-3 font-sans text-sm text-white outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                  [ FOKUS LAYANAN ]
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full bg-[#070E1A] border border-white/15 focus:border-[#0B70AD] p-3 font-sans text-sm text-white outline-none transition-colors cursor-pointer"
                >
                  <option value="perancangan">Perancangan & Pemodelan Presisi</option>
                  <option value="konsultasi">Konsultasi Teknis & Manajemen Solusi</option>
                  <option value="integrasi">Integrasi Sistem & Evaluasi Lapangan</option>
                  <option value="riset">Riset Terapan & Rekayasa Adaptif</option>
                  <option value="kemitraan">Kemitraan Strategis / Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                  [ CATATAN TANTANGAN TEKNIS ]
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ringkasan singkat lingkup atau pertanyaan rekayasa..."
                  className="w-full bg-[#070E1A] border border-white/15 focus:border-[#0B70AD] p-3 font-sans text-sm text-white outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0B70AD] hover:bg-[#1B3459] text-white font-mono text-xs uppercase tracking-widest py-3.5 transition-all flex items-center justify-center space-x-2 font-bold cursor-pointer border border-[#0B70AD]"
              >
                <span>[ KIRIM PERMINTAAN KONSULTASI ]</span>
                <ArrowUpRight size={14} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}