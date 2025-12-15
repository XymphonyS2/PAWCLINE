<?php

use App\Http\Controllers\PemilikHewan\AntrianController;
use App\Http\Controllers\PemilikHewan\ChatController;
use App\Http\Controllers\PemilikHewan\DashboardController;
use App\Http\Controllers\PemilikHewan\HewanController;
use App\Http\Controllers\PemilikHewan\VerifikasiController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:pemilik_hewan'])->prefix('pemilik-hewan')->name('pemilik-hewan.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Hewan
    Route::resource('hewan', HewanController::class);
    
    // Antrian
    Route::resource('antrian', AntrianController::class);
    Route::get('/antrian/cek-posisi', [AntrianController::class, 'cekPosisi'])->name('antrian.cek-posisi');
    
    // Verifikasi
    Route::get('/verifikasi', [VerifikasiController::class, 'create'])->name('verifikasi.create');
    Route::post('/verifikasi', [VerifikasiController::class, 'store'])->name('verifikasi.store');
    
    // Chat
    Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');
    Route::get('/chat/{dokter}', [ChatController::class, 'show'])->name('chat.show');
    Route::post('/chat/{dokter}', [ChatController::class, 'store'])->name('chat.store');
});




