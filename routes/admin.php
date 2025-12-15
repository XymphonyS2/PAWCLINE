<?php

use App\Http\Controllers\Admin\AntrianController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\JadwalDokterController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\VerifikasiController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // User Management
    Route::resource('user', UserController::class);
    
    // Verifikasi
    Route::get('/verifikasi', [VerifikasiController::class, 'index'])->name('verifikasi.index');
    Route::get('/verifikasi/{verifikasi}', [VerifikasiController::class, 'show'])->name('verifikasi.show');
    Route::put('/verifikasi/{verifikasi}', [VerifikasiController::class, 'update'])->name('verifikasi.update');
    
    // Antrian
    Route::get('/antrian', [AntrianController::class, 'index'])->name('antrian.index');
    Route::get('/antrian/riwayat', [AntrianController::class, 'riwayat'])->name('antrian.riwayat');
    Route::get('/antrian/{antrian}', [AntrianController::class, 'show'])->name('antrian.show');
    Route::post('/antrian/{antrian}/lewati', [AntrianController::class, 'lewati'])->name('antrian.lewati');
    
    // Jadwal Dokter
    Route::resource('jadwal-dokter', JadwalDokterController::class);
});




