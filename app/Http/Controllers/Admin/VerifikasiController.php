<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\VerifikasiAkun;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VerifikasiController extends Controller
{
    public function index()
    {
        // Ambil semua verifikasi dengan relasi pemilik, urutkan pending dulu
        $verifikasi = VerifikasiAkun::with(['pemilik'])
            ->orderByRaw("CASE WHEN status = 'pending' THEN 0 ELSE 1 END")
            ->orderBy('created_at', 'desc')
            ->get();
        
        return Inertia::render('Admin/Verifikasi/Index', [
            'verifikasi' => $verifikasi,
        ]);
    }

    public function show(VerifikasiAkun $verifikasi)
    {
        $verifikasi->load('pemilik');
        
        return Inertia::render('Admin/Verifikasi/Show', [
            'verifikasi' => $verifikasi,
        ]);
    }

    public function update(Request $request, VerifikasiAkun $verifikasi)
    {
        $validated = $request->validate([
            'status' => 'required|in:diterima,ditolak',
            'catatan' => 'nullable|string',
        ]);

        $verifikasi->update([
            'status' => $validated['status'],
            'catatan' => $validated['catatan'] ?? null,
            'admin_id' => Auth::id(),
            'diverifikasi_at' => now(),
        ]);

        // Update status verified user
        if ($validated['status'] === 'diterima') {
            $verifikasi->pemilik->update(['is_verified' => true]);
        }

        return redirect()->route('admin.verifikasi.index')
            ->with('success', 'Verifikasi berhasil diproses');
    }
}
