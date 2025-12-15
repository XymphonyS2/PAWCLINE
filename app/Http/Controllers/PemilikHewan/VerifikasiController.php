<?php

namespace App\Http\Controllers\PemilikHewan;

use App\Http\Controllers\Controller;
use App\Models\VerifikasiAkun;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VerifikasiController extends Controller
{
    public function create()
    {
        $verifikasi = Auth::user()->verifikasiAkun;
        
        return Inertia::render('PemilikHewan/Verifikasi/Create', [
            'verifikasi' => $verifikasi,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ktp' => 'required|image|max:2048|mimes:jpeg,png,jpg',
        ]);

        $ktpPath = $request->file('ktp')->store('ktp', 'public');

        VerifikasiAkun::updateOrCreate(
            ['pemilik_id' => Auth::id()],
            [
                'ktp_path' => $ktpPath,
                'status' => 'pending',
            ]
        );

        return redirect()->route('pemilik-hewan.dashboard')
            ->with('success', 'Data verifikasi berhasil dikirim. Menunggu verifikasi dari admin.');
    }
}
