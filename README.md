# Son Daven — 3D Chromatic Architectural Experience

Website showcase interaktif kelas agensi komersial terinspirasi dari **[sondaven.com](https://sondaven.com/en)** dengan integrasi model 3D WebGL asli (`interaksi2blender6.glb`).

---

## 🚀 Fitur Utama

- **3D Native WebGL Canvas (`Three.js`)**:
  - Model 3D asli tetap mempertahankan 100% material multi-warna Blender.
  - Orbit kontrol interaktif 360° (klik & seret mouse).
  - Koreografi kamera dinamis mengikuti 8 fase scroll halaman.
  - Partikel debu kromatik yang melayang di ruang 3D.
- **Transisi Jarum Runcing Bergerigi (`GSAP ScrollTrigger`)**:
  - Transisi kanopi hutan pinus Carpathian dengan 95 jarum segitiga bergerigi dan efek *parallax*.
- **Jalur Geser Horizontal Kartu Apartemen**:
  - Pinned scroll track kartu apartemen mewah dengan foto render resolusi tinggi.
- **Kalkulator Imbal Hasil Investasi Interaktif**:
  - Slider modal ($50,000 s/d $1,000,000) yang mensimulasikan arus kas bulanan dan keuntungan 5 tahun secara *real-time*.
- **Season Switcher Interaktif**:
  - Tombol beralih musim (*Summer vs Winter*) dengan pertukaran foto dan data okupansi.
- **Peta Topografi & Pin GPS**:
  - Radar koordinat Carpathian dengan pin lokasi interaktif.
- **Synthesizer Audio Desau Angin Pegunungan (`Web Audio API`)**:
  - Suara ambient desau angin pegunungan tanpa memerlukan file MP3 eksternal.
- **Kursor Magnetik Khusus & Layar Pembuka Preloader**:
  - Preloader tirai hitam dengan video sinematik dan kursor yang membaca konteks tombol.

---

## 🛠️ Stack Teknologi

- **Framework**: [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Engine**: [Three.js](https://threejs.org/) + `GLTFLoader`
- **Animasi & Pinned Scroll**: [GSAP](https://gsap.com/) + `ScrollTrigger`
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis)
- **Audio Procedural**: Web Audio API

---

## 💻 Panduan Penggunaan (Usage)

### 1. Masuk ke Folder Proyek
```bash
cd /run/media/lauza/Data/laragon/www/hasilprojek1
```

### 2. Menjalankan Server Lokal (Development)
```bash
npm run dev
```
Buka browser di: **`http://localhost:5173/`**

### 3. Build untuk Production (Siap Deploy)
```bash
npm run build
```
File hasil kompilasi yang siap di-upload ke server/hosting akan tersimpan di dalam folder `dist/`.

### 4. Menguji Hasil Build (Preview)
```bash
npm run preview
```

---

## 🎨 Cara Kustomisasi & Ganti Aset

1. **Mengganti Model 3D**:
   - Taruh file `.glb` baru kamu ke dalam folder `public/model.glb`.
   - Model akan otomatis di-center dan di-scale oleh [ModelViewer.jsx](src/components/ModelViewer.jsx).
2. **Mengubah Teks & Rincian Apartemen**:
   - Buka file [src/components/HorizontalGallery.jsx](src/components/HorizontalGallery.jsx) untuk mengubah nama, luas (m²), dan spesifikasi unit.
3. **Mengatur Nilai Kalkulator Investasi**:
   - Buka file [src/components/InvestmentCalculator.jsx](src/components/InvestmentCalculator.jsx) untuk mengatur persentase yield tahunan (`annualRate = 0.184`).
