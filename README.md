Student Daily Tracker
Platform belajar cerdas untuk memantau perkembangan nilai harian siswa dengan analisis AI yang dipersonalisasi. Dibuat menggunakan React, TypeScript, dan Tailwind CSS — responsif untuk Android dan Desktop.
---
Tentang Aplikasi
Student Daily Tracker adalah aplikasi web yang membantu siswa mencatat, memantau, dan menganalisis nilai akademik mereka secara harian. Semua data tersimpan secara lokal di browser (localStorage), sehingga privasi pengguna terjaga dan aplikasi tetap bisa digunakan tanpa koneksi internet.

Fitur Utama
Dashboard Halaman utama yang menampilkan kartu statistik (rata-rata, target, progress, nilai tertinggi), form input nilai baru, nilai terbaru, bar chart per mata pelajaran, dan panel AI Insights.

Riwayat Nilai Menampilkan semua nilai yang pernah diinput lengkap dengan fitur pencarian, filter mata pelajaran, sorting, label kualitas (Sangat Baik / Baik / Cukup / Perlu Peningkatan), dan tombol hapus.

Profil Menampilkan level belajar, radar chart kemampuan per mata pelajaran, sistem badge pencapaian, statistik lengkap, dan opsi edit nama pengguna.

AI Learning Assistant Menganalisis data nilai secara otomatis untuk memberikan insight dan rekomendasi belajar yang dipersonalisasi, termasuk deteksi mata pelajaran lemah, tren nilai terkini, dan saran strategi belajar.

Dark Mode Toggle dark/light mode yang dapat diakses dari sidebar (desktop) atau header (mobile). Preferensi tersimpan otomatis.

Cara Menjalankan
Pastikan sudah menginstall Node.js versi 18 ke atas dan pnpm.

# Clone repositori
git clone https://github.com/username/student-daily-tracker.git

# Masuk ke direktori proyek
cd student-daily-tracker

# Install dependensi
pnpm install

# Jalankan server development
pnpm dev
Buka browser dan akses http://localhost:5173

Untuk build produksi:

pnpm build
Panduan Penggunaan
1. Login Masukkan nama lengkap dan password minimal 4 karakter, lalu klik "Masuk Sekarang". Password bersifat lokal dan tidak diverifikasi ke server — fungsinya hanya sebagai pengaman halaman sederhana.

2. Input Nilai Di halaman Dashboard, pilih mata pelajaran dari dropdown, masukkan nilai (0–100), tambahkan catatan opsional jika perlu, lalu klik "Tambah Nilai" atau tekan Enter.

3. Atur Target Nilai Geser slider di kartu "Target Nilai" untuk menentukan target antara 50 hingga 100. Progress bar akan memperbarui persentase pencapaian secara otomatis.

4. Lihat Riwayat Buka halaman "Riwayat Nilai" untuk melihat semua nilai. Gunakan kolom pencarian untuk mencari berdasarkan mata pelajaran atau catatan, filter untuk menyaring per mapel, dan pilih urutan sesuai kebutuhan. Untuk menghapus nilai, arahkan kursor ke item lalu klik ikon tempat sampah merah.

5. Cek Profil dan Pencapaian Buka halaman "Profil" untuk melihat level belajarmu, radar chart kemampuan, dan badge yang sudah terbuka. Edit nama dengan klik ikon pensil di sebelah nama.

6. Baca Rekomendasi AI Gulir ke bawah di halaman Dashboard untuk melihat panel AI Learning Insights. Panel ini secara otomatis menganalisis nilaimu dan memberikan rekomendasi belajar yang relevan.

Sistem Level
Level	Rata-rata Nilai
Beginner	Di bawah 70
Intermediate	70 hingga 79
Expert	80 hingga 89
Master	90 ke atas
Badge Pencapaian
Badge	Syarat
Nilai Pertama	Berhasil input nilai pertama kali
10 Nilai	Total 10 nilai sudah tercatat
Nilai 100	Pernah mendapat nilai sempurna
Nilai Konsisten	Total 5 nilai atau lebih tercatat
Rata-rata 85+	Rata-rata keseluruhan mencapai 85
Nilai Meningkat	Nilai terbaru lebih tinggi dari nilai pertama
Struktur Proyek
src/
├── app/
│   ├── components/
│   │   ├── AIAssistant.tsx     # Panel AI Insights dan Rekomendasi
│   │   └── Layout.tsx          # Layout dengan Sidebar dan Bottom Navigation
│   ├── context/
│   │   └── AppContext.tsx      # Global state management
│   ├── pages/
│   │   ├── Login.tsx           # Halaman login
│   │   ├── Dashboard.tsx       # Halaman utama
│   │   ├── History.tsx         # Riwayat nilai
│   │   └── Profile.tsx         # Profil dan pencapaian
│   ├── App.tsx
│   └── routes.tsx
└── styles/
    ├── fonts.css
    ├── index.css
    └── theme.css
Teknologi
React 18 dengan TypeScript
Tailwind CSS v4
React Router v7
Recharts (Bar Chart dan Radar Chart)
Lucide React untuk ikon
Vite sebagai build tool
Google Fonts Poppins
Penyimpanan Data
Semua data disimpan di localStorage browser dengan key berikut:

studentName — nama pengguna
grades — array JSON berisi semua nilai
targetScore — angka target nilai
darkMode — preferensi tema gelap/terang
Data akan hilang jika cache browser dihapus atau menggunakan mode Incognito.

Lisensi
Proyek ini menggunakan lisensi MIT. Bebas digunakan, dimodifikasi, dan didistribusikan.

Dibuat untuk membantu para pelajar memantau dan meningkatkan prestasi akademik mereka setiap hari.

Muhammad Akhdan Habibi XITKJ3
