# Pawcline - Sistem Manajemen Hewan Peliharaan

Aplikasi manajemen hewan peliharaan dengan 3 role: Pemilik Hewan, Admin, dan Dokter.

## Teknologi

Muhammad Hafiz Assyifa (2315061072)
Mutiara Khairunnisa Z. (2315061060)

## Teknologi

- **Backend:** Laravel 12.42.0
- **Frontend:** React 2.2.7 dengan Inertia.js
- **Database:** PostgreSQL
- **Styling:** Tailwind CSS

## Fitur

### Pemilik Hewan
- Daftar dan login akun
- Tambah dan kelola hewan peliharaan
- Ambil antrian untuk konsultasi
- Verifikasi akun dengan upload KTP
- Chat 2 arah dengan dokter
- Lihat posisi antrian
- Lihat rekam medis hewan

### Admin
- Buat akun admin dan dokter
- Verifikasi akun pemilik hewan
- Lihat dan kelola antrian
- Tentukan jadwal dokter (Senin-Jumat, Shift Pagi/Sore)
- Lihat riwayat antrian dan rekam medis

### Dokter
- Lihat antrian hari ini
- Proses antrian dan buat rekam medis
- Chat dengan pemilik hewan
- Lihat jadwal kerja
- Lihat riwayat antrian yang sudah diproses

## Setup

1. Install dependencies:
```bash
composer install
npm install
```

2. Setup environment:
```bash
cp .env.example .env
php artisan key:generate
```

3. Konfigurasi database di `.env`:
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=pawcline
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

4. Jalankan migrations:
```bash
php artisan migrate
```

5. Build assets:
```bash
npm run build
```

6. Jalankan server:
```bash
php artisan serve
npm run dev
```

## Catatan

- Pastikan PostgreSQL sudah terinstall dan berjalan
- Buat database `pawcline` di PostgreSQL
- Untuk membuat akun admin pertama, gunakan tinker atau seeder




