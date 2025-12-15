<?php

use App\Http\Controllers\NotifikasiController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('LandingPage', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('/redirect', function () {
        $user = auth()->user();
        
        if ($user->isPemilikHewan()) {
            return redirect()->route('pemilik-hewan.dashboard');
        } elseif ($user->isAdmin()) {
            return redirect()->route('admin.dashboard');
        } elseif ($user->isDokter()) {
            return redirect()->route('dokter.dashboard');
        }
        
        return redirect()->route('home');
    })->name('redirect');
    
    // Notifikasi (untuk semua role)
    Route::get('/notifikasi', [NotifikasiController::class, 'index'])->name('notifikasi.index');
});

require __DIR__.'/pemilik-hewan.php';
require __DIR__.'/admin.php';
require __DIR__.'/dokter.php';
require __DIR__.'/settings.php';
