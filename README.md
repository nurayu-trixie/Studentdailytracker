📚 Student Daily Tracker

Platform belajar cerdas untuk memantau perkembangan nilai harian siswa dengan analisis AI yang dipersonalisasi.
Dibangun menggunakan React, TypeScript, dan Tailwind CSS — responsif untuk Android dan Desktop.

🚀 Tentang Aplikasi

Student Daily Tracker adalah aplikasi web untuk membantu siswa:

Mencatat nilai harian
Memantau perkembangan akademik
Mendapatkan analisis dan rekomendasi belajar otomatis

Semua data disimpan secara lokal (localStorage), sehingga:

🔒 Privasi terjaga
🌐 Bisa digunakan tanpa internet
✨ Fitur Utama
📊 Dashboard
Statistik nilai (rata-rata, target, progress, nilai tertinggi)
Form input nilai
Bar chart per mata pelajaran
AI Insights (rekomendasi belajar)
📜 Riwayat Nilai
Daftar semua nilai
🔍 Pencarian & filter
🔃 Sorting
🏷️ Label kualitas nilai
🗑️ Hapus data
👤 Profil
Level belajar
Radar chart kemampuan
Sistem badge
Edit nama pengguna
🤖 AI Learning Assistant
Analisis nilai otomatis
Deteksi mata pelajaran lemah
Rekomendasi belajar personal
🌙 Dark Mode
Toggle dark/light mode
Preferensi tersimpan otomatis
🛠️ Cara Menjalankan
1. Persiapan

Pastikan sudah install:

Node.js ≥ 18
pnpm
2. Clone Repository
git clone https://github.com/username/student-daily-tracker.git
cd student-daily-tracker
3. Install Dependency
pnpm install
4. Jalankan Development
pnpm dev

Buka di browser:

http://localhost:5173
5. Build Production
pnpm build
📖 Panduan Penggunaan
🔐 Login
Masukkan nama & password (min. 4 karakter)
Password hanya untuk pengaman lokal
➕ Input Nilai
Pilih mata pelajaran
Masukkan nilai (0–100)
Tambahkan catatan (opsional)
🎯 Target Nilai
Atur target dengan slider (50–100)
Progress otomatis terhitung
📜 Riwayat
Cari, filter, dan urutkan nilai
Hapus data jika diperlukan
👤 Profil
Lihat level & statistik
Edit nama pengguna
🤖 AI Insights
Lihat rekomendasi belajar otomatis di Dashboard
🏆 Sistem Level
Level	Rata-rata Nilai
Beginner	< 70
Intermediate	70 – 79
Expert	80 – 89
Master	≥ 90
🎖️ Badge Pencapaian
Badge	Syarat
Nilai Pertama	Input nilai pertama
10 Nilai	Total 10 nilai
Nilai 100	Pernah dapat 100
Nilai Konsisten	≥ 5 nilai tercatat
Rata-rata 85+	Rata-rata ≥ 85
Nilai Meningkat	Nilai terbaru > pertama
## 📂 Struktur Proyek


src/
├── app/
│ ├── components/
│ │ ├── AIAssistant.tsx
│ │ └── Layout.tsx
│ │
│ ├── context/
│ │ └── AppContext.tsx
│ │
│ ├── pages/
│ │ ├── Login.tsx
│ │ ├── Dashboard.tsx
│ │ ├── History.tsx
│ │ └── Profile.tsx
│ │
│ ├── App.tsx
│ └── routes.tsx
│
└── styles/
├── fonts.css
├── index.css
└── theme.css
⚙️ Teknologi
React 18 + TypeScript
Tailwind CSS v4
React Router v7
Recharts
Lucide React
Vite
Google Fonts (Poppins)
💾 Penyimpanan Data

Data disimpan di localStorage:

studentName
grades
targetScore
darkMode

⚠️ Data akan hilang jika:

Cache browser dihapus
Menggunakan mode incognito
📜 Lisensi

Menggunakan lisensi MIT
Bebas digunakan, dimodifikasi, dan didistribusikan.

👨‍💻 Developer

Muhammad Akhdan Habibi
SMK XITKJ3
