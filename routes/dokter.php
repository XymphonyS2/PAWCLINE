<?php

use App\Http\Controllers\Dokter\AntrianController;
use App\Http\Controllers\Dokter\ChatController;
use App\Http\Controllers\Dokter\DashboardController;
use App\Http\Controllers\Dokter\RekamMedisController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:dokter'])->prefix('dokter')->name('dokter.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Antrian
    Route::get('/antrian', [AntrianController::class, 'index'])->name('antrian.index');
    Route::get('/antrian/riwayat', [AntrianController::class, 'riwayat'])->name('antrian.riwayat');
    Route::get('/antrian/{antrian}', [AntrianController::class, 'show'])->name('antrian.show');
    Route::post('/antrian/{antrian}/mulai', [AntrianController::class, 'mulai'])->name('antrian.mulai');
    
    // Rekam Medis
    Route::get('/antrian/{antrian}/rekam-medis/create', [RekamMedisController::class, 'create'])->name('rekam-medis.create');
    Route::post('/antrian/{antrian}/rekam-medis', [RekamMedisController::class, 'store'])->name('rekam-medis.store');
    Route::get('/rekam-medis/{rekamMedis}', [RekamMedisController::class, 'show'])->name('rekam-medis.show');
    
    // Chat
    Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');
    Route::get('/chat/{pemilikHewan}', [ChatController::class, 'show'])->name('chat.show');
    Route::post('/chat/{pemilikHewan}', [ChatController::class, 'store'])->name('chat.store');
});




