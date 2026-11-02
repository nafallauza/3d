# Pemeriksaan frontend Tara Rekayasa

Patch `frontend.patch` dari salinan review berhasil melalui `git apply --check` dan diterapkan langsung ke proyek asli. Salinan keadaan awal sumber dan diff lokal disimpan di `/tmp/tara-review-backup` selama sesi ini.

Perbaikan lanjutan:
- Pemicu menu dapat dioperasikan dengan Enter/Spasi, mempunyai indikator fokus, dan mengumumkan status terbuka.
- Escape mengembalikan fokus ke pemicu menu yang tetap terlihat, termasuk klik pada ikon.
- Gesture horizontal slider memakai `touch-action: none` pada area SVG, sehingga tidak memicu navigasi kembali di Chromium mobile.
- Modal konsultasi yang dibuka dari menu mengembalikan fokus ke tombol menu saat pemicu aslinya sudah tersembunyi.

Tes perilaku tanpa browser:

```bash
node review/frontend.test.mjs
npm run build
```

Tes browser membutuhkan Playwright dan Chromium. Jalankan server Vite terlebih dahulu, lalu:

```bash
BASE_URL=http://127.0.0.1:5174/ node review/browser.test.mjs
```

Jika Playwright atau Chromium berada di luar dependensi proyek, gunakan `PLAYWRIGHT_MODULE` (lokasi modul Playwright) dan `CHROMIUM_PATH` (lokasi executable Chromium). Dependensi proyek tidak diubah untuk keperluan pengujian ini.

Screenshot identitas disimpan di folder ini. Pengujian mobile menggunakan emulasi Chromium dengan viewport 375×812 dan input sentuhan; desktop memakai 1440×1000. Pengujian ini tidak menggantikan pengujian pada perangkat fisik.

Peringatan build yang masih ada: bundle JavaScript melebihi 500 kB.

Hasil akhir: 7 tes perilaku lulus; build produksi dan `git diff --check` lulus. Pemeriksaan browser lulus untuk menu/tautan blog, modal konsultasi, hotspot/accordion, slider keyboard dan drag, serta gesture model 3D pada emulasi mobile. Layout landscape 812×375 dan reduced motion diperiksa tanpa overflow horizontal. Tidak ditemukan error JavaScript pada pemeriksaan runtime tersebut.

Desain filosofi saat ini: judul besar versi awal dipertahankan, diagram `map.svg` tanpa bidang putih diperbesar di kiri, dan empat penjelasan Makna/Filosofi menyatu di kanan. Enam teks anotasi awal dipulihkan di sekeliling diagram desktop. Pada mobile, anotasi disusun di bawah diagram agar tetap terbaca. Empat teks penanda bernomor menjadi tombol yang tersambung ke accordion; lingkaran angka besar dihapus. Screenshot desktop/mobile diperbarui.

Posisi anotasi desktop diselaraskan ke koordinat elemen `map.svg`: 03 berada tepat di bawah gelombang, atom/ligand di samping atom biru, formasi segitiga pada puncak konstruksi, ruang terbuka pada sudut bingkai, dan inti presisi memakai garis penunjuk ke pusat merah.
