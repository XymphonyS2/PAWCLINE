<?php

use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/settings/profil');

    // Profil - gabungan profile, password, dan verifikasi (untuk pemilik hewan)
    Route::get('settings/profil', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profil', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('settings/profil/verifikasi', [ProfileController::class, 'storeVerifikasi'])->name('profile.verifikasi.store');
    Route::put('settings/profil/password', [ProfileController::class, 'updatePassword'])->name('profile.password.update');
    Route::delete('settings/profil', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Keamanan - 2FA
    Route::get('settings/keamanan', [TwoFactorAuthenticationController::class, 'show'])->name('security.edit');
});
