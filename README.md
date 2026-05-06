📖 Panduan Penggunaan
1. Login
Masukkan nama lengkap pada kolom yang tersedia
Masukkan password minimal 4 karakter
Klik tombol "Masuk Sekarang"
Catatan: Password bers ifat lokal dan tidak dikirim ke server mana pun.

2. Dashboard
Kartu Statistik

Kartu	Keterangan
Rata-rata	Nilai rata-rata dari semua mata pelajaran
Target	Target nilai yang kamu tentukan sendiri
Progress	Persentase pencapaian terhadap target
Tertinggi	Nilai tertinggi yang pernah dicatat
Input Nilai Baru

Pilih mata pelajaran dari dropdown
Masukkan nilai antara 0 hingga 100
Tambahkan catatan opsional
Klik "Tambah Nilai" atau tekan Enter
Atur Target Nilai

Geser slider untuk mengubah target (rentang: 50 – 100)
Progress bar akan memperbarui secara otomatis
3. Riwayat Nilai
Label Kualitas Nilai

Label	Rentang
🟢 Sangat Baik	90 – 100
🔵 Baik	80 – 89
🟡 Cukup	70 – 79
🔴 Perlu Peningkatan	0 – 69
4. Profil
Sistem Level

Level	Rata-rata
🌱 Beginner	Di bawah 70
📘 Intermediate	70 – 79
🎓 Expert	80 – 89
👑 Master	90 ke atas
Badge Pencapaian

Badge	Syarat
⭐ Nilai Pertama	Berhasil input nilai pertama kali
📖 10 Nilai	Total 10 nilai sudah tercatat
🏆 Nilai 100	Pernah mendapat nilai sempurna
🔥 Nilai Konsisten	Total 5 nilai atau lebih tercatat
🏅 Rata-rata 85+	Rata-rata keseluruhan mencapai 85 atau lebih
📈 Nilai Meningkat	Nilai terbaru lebih tinggi dari nilai pertama
🗂️ Struktur Proyek
src/
├── app/
│   ├── components/
│   │   ├── AIAssistant.tsx
│   │   └── Layout.tsx
│   ├── context/
│   │   └── AppContext.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── History.tsx
│   │   └── Profile.tsx
│   ├── App.tsx
│   └── routes.tsx
└── styles/
    ├── fonts.css
    ├── index.css
    └── theme.css
🛠️ Teknologi
Teknologi	Kegunaan
React 18 + TypeScript	UI Framework dengan type safety
Tailwind CSS v4	Utility-first styling
React Router v7	Client-side routing
Recharts	Bar Chart dan Radar Chart
Lucide React	Ikon
Vite	Build tool
Google Fonts Poppins	Tipografi
💾 Penyimpanan Data
Key	Isi
studentName	Nama pengguna
grades	Seluruh data nilai dalam format JSON
targetScore	Angka target nilai
darkMode	Preferensi tema (true/false)
Perhatian: Data akan hilang jika cache browser dihapus atau menggunakan mode Incognito.

📄 Lisensi
Proyek ini menggunakan lisensi MIT — bebas digunakan, dimodifikasi, dan didistribusikan
