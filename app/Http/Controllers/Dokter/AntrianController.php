<?php

namespace App\Http\Controllers\Dokter;

use App\Http\Controllers\Controller;
use App\Models\Antrian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AntrianController extends Controller
{
    public function index()
    {
        $antrianSekarang = Antrian::whereDate('tanggal', today())
            ->where('status', 'sedang_diproses')
            ->where('dokter_id', Auth::id())
            ->with(['pemilik', 'hewan'])
            ->first();
        
        // Antrian menunggu bisa dari semua dokter atau belum ada dokter
        $antrianMenunggu = Antrian::whereDate('tanggal', today())
            ->where('status', 'menunggu')
            ->where(function($query) {
                $query->where('dokter_id', Auth::id())
                    ->orWhereNull('dokter_id');
            })
            ->with(['pemilik', 'hewan'])
            ->orderBy('nomor_antrian', 'asc')
            ->get();
        
        return Inertia::render('Dokter/Antrian/Index', [
            'antrianSekarang' => $antrianSekarang,
            'antrianMenunggu' => $antrianMenunggu,
        ]);
    }

    public function mulai(Antrian $antrian)
    {
        // Set dokter jika belum ada
        if (!$antrian->dokter_id) {
            $antrian->update([
                'dokter_id' => Auth::id(),
                'status' => 'sedang_diproses',
                'diproses_at' => now(),
            ]);
        } else {
            if ($antrian->dokter_id !== Auth::id()) {
                abort(403);
            }

            $antrian->update([
                'status' => 'sedang_diproses',
                'diproses_at' => now(),
            ]);
        }

        return redirect()->route('dokter.antrian.index')
            ->with('success', 'Antrian dimulai');
    }

    public function riwayat()
    {
        $antrian = Antrian::where('dokter_id', Auth::id())
            ->where('status', 'selesai')
            ->with(['pemilik', 'hewan', 'rekamMedis'])
            ->orderBy('tanggal', 'desc')
            ->orderBy('nomor_antrian', 'desc')
            ->get();
        
        return Inertia::render('Dokter/Antrian/Riwayat', [
            'antrian' => $antrian,
        ]);
    }

    public function show(Antrian $antrian)
    {
        // Dokter bisa melihat antrian yang belum punya dokter atau antrian miliknya
        if ($antrian->dokter_id && $antrian->dokter_id !== Auth::id()) {
            abort(403);
        }

        $antrian->load(['pemilik', 'hewan', 'rekamMedis']);
        
        return Inertia::render('Dokter/Antrian/Show', [
            'antrian' => $antrian,
        ]);
    }
}
