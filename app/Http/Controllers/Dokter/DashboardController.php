<?php

namespace App\Http\Controllers\Dokter;

use App\Http\Controllers\Controller;
use App\Models\Antrian;
use App\Models\JadwalDokter;
use App\Models\Pesan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $antrianSekarang = Antrian::whereDate('tanggal', today())
            ->where('status', 'sedang_diproses')
            ->where('dokter_id', $user->id)
            ->with(['pemilik', 'hewan'])
            ->first();
        
        // Antrian menunggu bisa dari semua dokter atau belum ada dokter
        $antrianMenunggu = Antrian::whereDate('tanggal', today())
            ->where('status', 'menunggu')
            ->where(function($query) use ($user) {
                $query->where('dokter_id', $user->id)
                    ->orWhereNull('dokter_id');
            })
            ->with(['pemilik', 'hewan'])
            ->orderBy('nomor_antrian', 'asc')
            ->get();
        
        $jadwal = $user->jadwalDokter()->get();
        
        $pesanBaru = Pesan::where('penerima_id', $user->id)
            ->where('dibaca', false)
            ->with('pengirim')
            ->count();
        
        return Inertia::render('Dokter/Dashboard', [
            'antrianSekarang' => $antrianSekarang,
            'antrianMenunggu' => $antrianMenunggu,
            'jadwal' => $jadwal,
            'pesanBaru' => $pesanBaru,
        ]);
    }
}
