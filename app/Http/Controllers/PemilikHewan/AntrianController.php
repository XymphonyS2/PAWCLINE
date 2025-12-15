<?php

namespace App\Http\Controllers\PemilikHewan;

use App\Http\Controllers\Controller;
use App\Models\Antrian;
use App\Models\Hewan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AntrianController extends Controller
{
    public function index()
    {
        $antrian = Auth::user()->antrian()
            ->with(['hewan', 'dokter'])
            ->orderBy('tanggal', 'desc')
            ->orderBy('nomor_antrian', 'desc')
            ->get();
        
        return Inertia::render('PemilikHewan/Antrian/Index', [
            'antrian' => $antrian,
        ]);
    }

    public function create()
    {
        // Cek apakah akun sudah diverifikasi
        if (!Auth::user()->is_verified) {
            return redirect()->route('profile.edit')
                ->with('error', 'Akun Anda belum diverifikasi. Silakan lengkapi verifikasi akun terlebih dahulu sebelum mengambil antrian.');
        }

        $hewan = Auth::user()->hewan;
        $antrianSekarang = Antrian::whereDate('tanggal', today())
            ->max('nomor_antrian') ?? 0;
        
        return Inertia::render('PemilikHewan/Antrian/Create', [
            'hewan' => $hewan,
            'nomorAntrianBerikutnya' => $antrianSekarang + 1,
        ]);
    }

    public function store(Request $request)
    {
        // Cek apakah akun sudah diverifikasi
        if (!Auth::user()->is_verified) {
            return redirect()->route('profile.edit')
                ->with('error', 'Akun Anda belum diverifikasi. Silakan lengkapi verifikasi akun terlebih dahulu sebelum mengambil antrian.');
        }

        $validated = $request->validate([
            'hewan_id' => 'required|exists:hewan,id',
            'keluhan' => 'nullable|string',
        ]);

        // Pastikan hewan milik user yang login
        $hewan = Hewan::where('id', $validated['hewan_id'])
            ->where('pemilik_id', Auth::id())
            ->firstOrFail();

        // Generate nomor antrian untuk hari ini
        $nomorAntrian = Antrian::whereDate('tanggal', today())
            ->max('nomor_antrian') ?? 0;
        $nomorAntrian++;

        $antrian = Antrian::create([
            'pemilik_id' => Auth::id(),
            'hewan_id' => $validated['hewan_id'],
            'nomor_antrian' => $nomorAntrian,
            'tanggal' => now()->toDateString(),
            'status' => 'menunggu',
            'keluhan' => $validated['keluhan'] ?? null,
        ]);

        return redirect()->route('pemilik-hewan.antrian.index')
            ->with('success', 'Antrian berhasil dibuat. Nomor antrian Anda: ' . $nomorAntrian);
    }

    public function show(Antrian $antrian)
    {
        // Pastikan antrian milik user yang login
        if ($antrian->pemilik_id !== Auth::id()) {
            abort(403);
        }
        
        $antrian->load(['hewan', 'dokter', 'rekamMedis.dokter']);
        
        // Hitung posisi antrian
        $posisi = Antrian::whereDate('tanggal', $antrian->tanggal)
            ->where('status', 'menunggu')
            ->where('nomor_antrian', '<=', $antrian->nomor_antrian)
            ->count();
        
        $antrianSekarang = Antrian::whereDate('tanggal', $antrian->tanggal)
            ->where('status', 'sedang_diproses')
            ->first();
        
        return Inertia::render('PemilikHewan/Antrian/Show', [
            'antrian' => $antrian,
            'posisi' => $posisi,
            'antrianSekarang' => $antrianSekarang,
        ]);
    }

    public function cekPosisi()
    {
        $antrianAktif = Auth::user()->antrian()
            ->whereDate('tanggal', today())
            ->where('status', 'menunggu')
            ->with('hewan')
            ->first();
        
        if (!$antrianAktif) {
            return response()->json([
                'message' => 'Tidak ada antrian aktif',
            ], 404);
        }

        $posisi = Antrian::whereDate('tanggal', today())
            ->where('status', 'menunggu')
            ->where('nomor_antrian', '<=', $antrianAktif->nomor_antrian)
            ->count();
        
        $antrianSekarang = Antrian::whereDate('tanggal', today())
            ->where('status', 'sedang_diproses')
            ->first();
        
        return response()->json([
            'antrian' => $antrianAktif,
            'posisi' => $posisi,
            'antrianSekarang' => $antrianSekarang,
        ]);
    }
}

