-- ============================================
-- PAWCLINE DATABASE SETUP
-- PostgreSQL Database Schema
-- ============================================
-- Jalankan script ini di pgAdmin untuk membuat database
-- Pastikan database 'pawcline' sudah dibuat terlebih dahulu

-- Hapus semua tabel jika ada (dalam urutan yang benar)
DROP TABLE IF EXISTS pesan CASCADE;
DROP TABLE IF EXISTS rekam_medis CASCADE;
DROP TABLE IF EXISTS antrian CASCADE;
DROP TABLE IF EXISTS jadwal_dokter CASCADE;
DROP TABLE IF EXISTS verifikasi_akun CASCADE;
DROP TABLE IF EXISTS hewan CASCADE;
DROP TABLE IF EXISTS failed_jobs CASCADE;
DROP TABLE IF EXISTS job_batches CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS cache_locks CASCADE;
DROP TABLE IF EXISTS cache CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS password_reset_tokens CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ============================================
-- TABLE: users
-- ============================================
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'pemilik_hewan' CHECK (role IN ('pemilik_hewan', 'admin', 'dokter')),
    gelar VARCHAR(255) NULL,
    alamat VARCHAR(255) NULL,
    kontak VARCHAR(255) NULL,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    remember_token VARCHAR(100) NULL,
    two_factor_secret TEXT NULL,
    two_factor_recovery_codes TEXT NULL,
    two_factor_confirmed_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================
-- TABLE: password_reset_tokens
-- ============================================
CREATE TABLE password_reset_tokens (
    email VARCHAR(255) PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL
);

-- ============================================
-- TABLE: sessions
-- ============================================
CREATE TABLE sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id BIGINT NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    payload TEXT NOT NULL,
    last_activity INTEGER NOT NULL
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_last_activity ON sessions(last_activity);

-- ============================================
-- TABLE: cache
-- ============================================
CREATE TABLE cache (
    key VARCHAR(255) PRIMARY KEY,
    value TEXT NOT NULL,
    expiration INTEGER NOT NULL
);

CREATE TABLE cache_locks (
    key VARCHAR(255) PRIMARY KEY,
    owner VARCHAR(255) NOT NULL,
    expiration INTEGER NOT NULL
);

-- ============================================
-- TABLE: jobs
-- ============================================
CREATE TABLE jobs (
    id BIGSERIAL PRIMARY KEY,
    queue VARCHAR(255) NOT NULL,
    payload TEXT NOT NULL,
    attempts SMALLINT NOT NULL,
    reserved_at INTEGER NULL,
    available_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL
);

CREATE INDEX idx_jobs_queue ON jobs(queue);

CREATE TABLE job_batches (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    total_jobs INTEGER NOT NULL,
    pending_jobs INTEGER NOT NULL,
    failed_jobs INTEGER NOT NULL,
    failed_job_ids TEXT NOT NULL,
    options TEXT NULL,
    cancelled_at INTEGER NULL,
    created_at INTEGER NOT NULL,
    finished_at INTEGER NULL
);

CREATE TABLE failed_jobs (
    id BIGSERIAL PRIMARY KEY,
    uuid VARCHAR(255) NOT NULL UNIQUE,
    connection TEXT NOT NULL,
    queue TEXT NOT NULL,
    payload TEXT NOT NULL,
    exception TEXT NOT NULL,
    failed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE: hewan
-- ============================================
CREATE TABLE hewan (
    id BIGSERIAL PRIMARY KEY,
    pemilik_id BIGINT NOT NULL,
    nama VARCHAR(255) NOT NULL,
    jenis VARCHAR(255) NOT NULL,
    ras_breed VARCHAR(255) NULL,
    jenis_kelamin VARCHAR(10) NOT NULL CHECK (jenis_kelamin IN ('jantan', 'betina')),
    tanggal_lahir DATE NOT NULL,
    berat_badan DECIMAL(5,2) NULL,
    foto VARCHAR(255) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    CONSTRAINT fk_hewan_pemilik FOREIGN KEY (pemilik_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_hewan_pemilik_id ON hewan(pemilik_id);

-- ============================================
-- TABLE: verifikasi_akun
-- ============================================
CREATE TABLE verifikasi_akun (
    id BIGSERIAL PRIMARY KEY,
    pemilik_id BIGINT NOT NULL,
    ktp_path VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'diterima', 'ditolak')),
    catatan TEXT NULL,
    admin_id BIGINT NULL,
    diverifikasi_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    CONSTRAINT fk_verifikasi_pemilik FOREIGN KEY (pemilik_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_verifikasi_admin FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_verifikasi_pemilik_id ON verifikasi_akun(pemilik_id);
CREATE INDEX idx_verifikasi_status ON verifikasi_akun(status);

-- ============================================
-- TABLE: antrian
-- ============================================
CREATE TABLE antrian (
    id BIGSERIAL PRIMARY KEY,
    pemilik_id BIGINT NOT NULL,
    hewan_id BIGINT NOT NULL,
    dokter_id BIGINT NULL,
    nomor_antrian INTEGER NOT NULL,
    tanggal DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'menunggu' CHECK (status IN ('menunggu', 'sedang_diproses', 'selesai', 'dilewati')),
    keluhan TEXT NULL,
    diproses_at TIMESTAMP NULL,
    selesai_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    CONSTRAINT fk_antrian_pemilik FOREIGN KEY (pemilik_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_antrian_hewan FOREIGN KEY (hewan_id) REFERENCES hewan(id) ON DELETE CASCADE,
    CONSTRAINT fk_antrian_dokter FOREIGN KEY (dokter_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_antrian_pemilik_id ON antrian(pemilik_id);
CREATE INDEX idx_antrian_hewan_id ON antrian(hewan_id);
CREATE INDEX idx_antrian_dokter_id ON antrian(dokter_id);
CREATE INDEX idx_antrian_tanggal_status ON antrian(tanggal, status);
CREATE INDEX idx_antrian_nomor_antrian ON antrian(nomor_antrian);

-- ============================================
-- TABLE: rekam_medis
-- ============================================
CREATE TABLE rekam_medis (
    id BIGSERIAL PRIMARY KEY,
    antrian_id BIGINT NOT NULL,
    hewan_id BIGINT NOT NULL,
    dokter_id BIGINT NOT NULL,
    penanganan TEXT NOT NULL,
    obat TEXT NULL,
    tindakan_berkala TEXT NULL,
    percepat_penyembuhan TEXT NULL,
    yang_tidak_boleh_dilakukan TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    CONSTRAINT fk_rekam_medis_antrian FOREIGN KEY (antrian_id) REFERENCES antrian(id) ON DELETE CASCADE,
    CONSTRAINT fk_rekam_medis_hewan FOREIGN KEY (hewan_id) REFERENCES hewan(id) ON DELETE CASCADE,
    CONSTRAINT fk_rekam_medis_dokter FOREIGN KEY (dokter_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_rekam_medis_antrian_id ON rekam_medis(antrian_id);
CREATE INDEX idx_rekam_medis_hewan_id ON rekam_medis(hewan_id);
CREATE INDEX idx_rekam_medis_dokter_id ON rekam_medis(dokter_id);

-- ============================================
-- TABLE: jadwal_dokter
-- ============================================
CREATE TABLE jadwal_dokter (
    id BIGSERIAL PRIMARY KEY,
    dokter_id BIGINT NOT NULL,
    hari VARCHAR(10) NOT NULL CHECK (hari IN ('senin', 'selasa', 'rabu', 'kamis', 'jumat')),
    shift VARCHAR(10) NOT NULL CHECK (shift IN ('pagi', 'sore')),
    jam_mulai TIME NOT NULL,
    jam_selesai TIME NOT NULL,
    admin_id BIGINT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    CONSTRAINT fk_jadwal_dokter FOREIGN KEY (dokter_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_jadwal_admin FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT unique_jadwal_dokter_hari_shift UNIQUE (dokter_id, hari, shift)
);

CREATE INDEX idx_jadwal_dokter_id ON jadwal_dokter(dokter_id);
CREATE INDEX idx_jadwal_hari ON jadwal_dokter(hari);

-- ============================================
-- TABLE: pesan
-- ============================================
CREATE TABLE pesan (
    id BIGSERIAL PRIMARY KEY,
    pengirim_id BIGINT NOT NULL,
    penerima_id BIGINT NOT NULL,
    pesan TEXT NOT NULL,
    dibaca BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    CONSTRAINT fk_pesan_pengirim FOREIGN KEY (pengirim_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_pesan_penerima FOREIGN KEY (penerima_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_pesan_pengirim_id ON pesan(pengirim_id);
CREATE INDEX idx_pesan_penerima_id ON pesan(penerima_id);
CREATE INDEX idx_pesan_pengirim_penerima ON pesan(pengirim_id, penerima_id);

-- ============================================
-- TABLE: migrations (untuk tracking migrations Laravel)
-- ============================================
CREATE TABLE IF NOT EXISTS migrations (
    id BIGSERIAL PRIMARY KEY,
    migration VARCHAR(255) NOT NULL,
    batch INTEGER NOT NULL
);

-- ============================================
-- Selesai
-- ============================================
-- Database schema telah dibuat
-- Selanjutnya:
-- 1. Update file .env dengan kredensial database PostgreSQL
-- 2. Jalankan: php artisan migrate (untuk menambahkan migrations table)
-- 3. Atau langsung gunakan database ini tanpa migrations




