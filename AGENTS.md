# Comprehensive Agent Guidelines (Strict Token Thrift & UI Architecture)

## 1. Strict Token Thrift Protocol (Hemat Token Maksimal)
- **Caveman Protocol**:
  - "Why use many token when few token do trick".
  - Hapus seluruh basa-basi pembuka ("Tentu...", "Pertanyaan bagus...") dan penutup.
  - Langsung ke poin teknis dan kode. Hemat token keluaran hingga 50%.
- **Ponytail Protocol (Anti-Overengineering & Laziest Senior Dev)**:
  - Tulis kode sesedikit dan sesederhana mungkin. Jangan buat 3 file baru jika 1 fungsi sederhana sudah cukup.
  - Utamakan pustaka standar dan fitur bawaan framework daripada menginstal library tambahan yang berat.
  - Dilarang membuat lapisan abstraksi "untuk masa depan" yang tidak diminta. Tuntaskan tugas spesifik dengan kode minimalis, kuat, dan bersih.
- **Surgical Context Retrieval & Edits**:
  - DILARANG membaca file utuh di atas 100 baris. Selalu baca hanya fungsi/blok yang dibutuhkan.
  - Dilarang dump data mentah (CSV, log sistem panjang).
  - Gunakan filter terminal: `| head -n 20`, `--quiet`, atau `| grep`.
  - Hanya berikan baris/blok yang berubah (surgical diff), dilarang mencetak ulang seluruh isi file ratusan baris.

## 2. Vibe Coding & UI/UX Design System (Anti-AI Slop)
- **Standar Referensi**:
  - Acuan desain: **21st.dev**, **shadcn/ui**, **Magic UI**.
  - Layout: Bento Grid modern, Clean Modern Minimalist, Dark SaaS.
  - Framework: React (Vite) + Tailwind CSS + Lucide Icons (`strokeWidth={1.5}`).
- **Anti-AI Slop Manifesto (DILARANG KERAS)**:
  - DILARANG: Background blur melayang bulat (`filter: blur(80px)` / hero blob).
  - DILARANG: Skill progress bar generik (Word 90%, Excel 85%).
  - DILARANG: Gradient pelangi / ungu-pink berlebihan di teks dan border.
  - DILARANG: Layout 3 kolom kartu membosankan dengan ikon bulat di tengah.
  - DILARANG: `min-height: 100vh` kaku pada section non-hero.
- **Aturan Warna & Shadow (60-30-10)**:
  - 60% Netral/Surface (putih bersih, off-white `#FAFAFA`, zinc gelap `#09090B`).
  - 30% Struktur & Kontainer (border `rgba(0,0,0,0.06)` atau `border-zinc-200/80`, card background `#FFFFFF`).
  - 10% Aksen (1 warna brand solid).
  - Shadow halus: Maksimal opasitas 4% s.d. 8% (`rgba(0,0,0,0.04)` - `rgba(0,0,0,0.08)`).
