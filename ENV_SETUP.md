# Konfigurasi Database PostgreSQL untuk Pawcline

## Konfigurasi .env yang Benar

Pastikan di file `.env` Anda memiliki konfigurasi berikut untuk PostgreSQL:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=pawcline
DB_USERNAME=postgres
DB_PASSWORD=password_anda_disini
```

## Penjelasan Setiap Baris:

1. **DB_CONNECTION=pgsql**
   - ✅ BENAR - Menggunakan PostgreSQL
   - ❌ SALAH jika: `mysql`, `sqlite`, dll

2. **DB_HOST=127.0.0.1**
   - ✅ BENAR - Localhost (jika database di komputer yang sama)
   - Atau gunakan IP address jika database di server lain

3. **DB_PORT=5432**
   - ✅ BENAR - Port default PostgreSQL
   - Pastikan port ini sesuai dengan konfigurasi PostgreSQL Anda

4. **DB_DATABASE=pawcline**
   - ✅ BENAR - Nama database yang sudah Anda buat di pgAdmin
   - Pastikan nama database sama persis dengan yang di pgAdmin

5. **DB_USERNAME=postgres**
   - ✅ BENAR - Username default PostgreSQL
   - Atau gunakan username PostgreSQL yang Anda buat

6. **DB_PASSWORD=password_anda_disini**
   - ✅ BENAR - Password PostgreSQL Anda
   - Ganti dengan password yang sebenarnya

## Contoh .env yang Lengkap:

```env
APP_NAME=Pawcline
APP_ENV=local
APP_KEY=base64:... (dari php artisan key:generate)
APP_DEBUG=true
APP_TIMEZONE=Asia/Jakarta
APP_URL=http://localhost

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=pawcline
DB_USERNAME=postgres
DB_PASSWORD=password123

# ... konfigurasi lainnya
```

## Cara Test Koneksi Database:

Setelah mengisi .env, test dengan command:

```bash
php artisan migrate:status
```

Jika berhasil, akan muncul daftar migrations. Jika error, periksa:
1. Database sudah dibuat di pgAdmin
2. Username dan password benar
3. PostgreSQL service sedang berjalan
4. Port 5432 tidak terblokir firewall




