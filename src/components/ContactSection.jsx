import React, { useState } from 'react';
import { ArrowUpRight, Send, MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    serviceCategory: 'perancangan',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="kontak" className="relative w-full bg-[#070E1A] text-[#F8FAFC] py-28 md:py-36 px-6 md:px-14 border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="border-b border-white/15 pb-10 mb-16">
          <div className="flex items-center space-x-3 mb-4 font-mono text-xs text-[#0B70AD] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#C91C22]" />
            <span>[ 07 / HUBUNGI KAMI & INISIASI KERJASAMA ]</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-tight">
                Kontak & Konsultasi
              </h2>
              <div className="font-mono text-xs md:text-sm tracking-widest text-[#0B70AD] uppercase mt-3">
                MULAI DISKUSI PENDEKATAN REKAYASA PRESISI ANDA
              </div>
            </div>

            <p className="font-sans text-sm md:text-base text-white/70 max-w-xl font-light leading-relaxed">
              Tim kami siap mendiskusikan kebutuhan teknis, parameter spesifikasi, serta peluang kerja sama strategis untuk proyek Anda.
            </p>
          </div>
        </div>

        {/* 2-Column Grid: Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Consultation Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#0D192E] border border-white/15 p-8 md:p-12 relative overflow-hidden">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 size={48} className="mx-auto text-[#0B70AD]" />
                <h3 className="font-serif text-2xl text-white">
                  Pesan Konsultasi Telah Terkirim
                </h3>
                <p className="font-sans text-xs md:text-sm text-white/70 max-w-md mx-auto font-light">
                  Terima kasih atas minat Anda pada Tara Rekayasa. Tim kami akan meninjau rincian kebutuhan Anda dan segera menghubungi melalui email resmi.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 border border-white/20 hover:border-[#0B70AD] px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-all cursor-pointer"
                >
                  [ KIRIM PESAN LAIN ]
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-white/10 pb-4 mb-6 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#0B70AD]">[ FORMULIR INISIASI PROYEK ]</span>
                  <span className="text-white/40">* WAJIB DIISI</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[11px] text-white/70 uppercase mb-2">
                      [ NAMA LENGKAP ] *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Masukkan nama lengkap"
                      className="w-full bg-[#070E1A] border border-white/15 focus:border-[#0B70AD] p-3.5 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/25"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] text-white/70 uppercase mb-2">
                      [ INSTITUSI / PERUSAHAAN ]
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Nama instansi atau institusi"
                      className="w-full bg-[#070E1A] border border-white/15 focus:border-[#0B70AD] p-3.5 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/25"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[11px] text-white/70 uppercase mb-2">
                      [ EMAIL RESMI / KORRESPONDENSI ] *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nama@perusahaan.com"
                      className="w-full bg-[#070E1A] border border-white/15 focus:border-[#0B70AD] p-3.5 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/25"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] text-white/70 uppercase mb-2">
                      [ KATEGORI KEBUTUHAN REKAYASA ]
                    </label>
                    <select
                      value={formData.serviceCategory}
                      onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                      className="w-full bg-[#070E1A] border border-white/15 focus:border-[#0B70AD] p-3.5 font-sans text-sm text-white outline-none transition-colors cursor-pointer"
                    >
                      <option value="perancangan">Perancangan & Pemodelan Presisi</option>
                      <option value="konsultasi">Konsultasi Teknis & Manajemen Solusi</option>
                      <option value="integrasi">Integrasi Sistem & Evaluasi Lapangan</option>
                      <option value="riset">Riset Terapan & Rekayasa Adaptif</option>
                      <option value="lainnya">Kemitraan Strategis / Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-white/70 uppercase mb-2">
                    [ RINCIAN KEBUTUHAN / CATATAN PROYEK ] *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Jelaskan secara ringkas tantangan teknis, estimasi lingkup proyek, atau target hasil yang diharapkan..."
                    className="w-full bg-[#070E1A] border border-white/15 focus:border-[#0B70AD] p-3.5 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/25 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0B70AD] hover:bg-[#1B3459] text-white font-mono text-xs tracking-widest uppercase py-4 transition-all flex items-center justify-center space-x-2 cursor-pointer font-bold border border-[#0B70AD]"
                >
                  <span>[ TRANSMISIKAN PERMINTAAN KONSULTASI ]</span>
                  <ArrowUpRight size={15} />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details & Guidelines (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0D192E] border border-white/10 p-8 space-y-6">
              <div className="font-mono text-xs text-[#0B70AD] uppercase tracking-widest border-b border-white/10 pb-3">
                [ INFORMASI KOORDINASI ]
              </div>

              <div className="space-y-4 font-sans text-xs">
                <div className="flex items-start space-x-3 text-white/80">
                  <MapPin size={16} className="text-[#0B70AD] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] text-white/50 block uppercase">
                      Kantor Operasional & Studio Rekayasa
                    </span>
                    <span className="font-medium text-white">
                      [Menunggu Konfirmasi Alamat Kantor Resmi]
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-white/80">
                  <Mail size={16} className="text-[#0B70AD] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] text-white/50 block uppercase">
                      Korespondensi Email
                    </span>
                    <a
                      href="mailto:info@tararekayasa.com"
                      className="font-mono text-white hover:text-[#0B70AD] transition-colors"
                    >
                      info@tararekayasa.com
                    </a>
                    <span className="text-[10px] text-white/40 block">
                      *(Atau saluran surel resmi yang terkonfirmasi)
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-white/80">
                  <Phone size={16} className="text-[#0B70AD] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] text-white/50 block uppercase">
                      Layanan Telepon / Komunikasi Langsung
                    </span>
                    <span className="font-mono text-white">
                      [Nomor Resmi Terverifikasi]
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-white/80">
                  <Clock size={16} className="text-[#0B70AD] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] text-white/50 block uppercase">
                      Jam Kerja Operasional
                    </span>
                    <span className="text-white">
                      Senin – Jumat | 09:00 – 17:00 WIB
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy & Confidentiality Notice */}
            <div className="border border-white/10 p-6 bg-[#070E1A] font-mono text-[11px] text-white/60 space-y-2">
              <div className="text-[#0B70AD] uppercase tracking-wider font-semibold">
                [ KERAHASIAAN DOKUMEN & INTEGRITAS DATA ]
              </div>
              <p className="font-sans text-xs font-light text-white/70 leading-relaxed">
                Setiap dokumen teknis, data proyek, dan informasi yang disampaikan akan diperlakukan secara konfidensial dan dilindungi sesuai perjanjian kerahasiaan (*Non-Disclosure Agreement*).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}