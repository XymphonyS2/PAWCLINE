<?php

namespace App\Http\Controllers\PemilikHewan;

use App\Http\Controllers\Controller;
use App\Models\Antrian;
use App\Models\Hewan;
use App\Models\Pesan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $totalHewan = $user->hewan()->count();
        $totalHewanBulanIni = $user->hewan()
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();
        
        $appointmentMingguIni = $user->antrian()
            ->whereBetween('tanggal', [now()->startOfWeek()->toDateString(), now()->endOfWeek()->toDateString()])
            ->count();
        
        $checkupSelesai = $user->antrian()
            ->where('status', 'selesai')
            ->count();
        $checkupSelesaiBulanIni = $user->antrian()
            ->where('status', 'selesai')
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();
        
        // Vaksin pending: hewan yang memiliki rekam medis dengan tindakan berkala vaksin yang belum dilakukan
        $vaksinPending = $user->hewan()
            ->whereHas('rekamMedis', function($query) {
                $query->whereNotNull('tindakan_berkala')
                    ->where('tindakan_berkala', 'like', '%vaksin%');
            })
            ->count();
        
        $hewanTerbaru = $user->hewan()
            ->with(['rekamMedis' => function($query) {
                $query->latest()->take(1);
            }])
            ->latest()
            ->take(3)
            ->get()
            ->map(function($hewan) {
                // Hitung umur dengan benar (tahun, bulan, hari)
                $tanggalLahir = $hewan->tanggal_lahir instanceof \Carbon\Carbon 
                    ? $hewan->tanggal_lahir 
                    : \Carbon\Carbon::parse($hewan->tanggal_lahir);
                
                $sekarang = now();
                
                // Pastikan tanggal lahir tidak di masa depan
                if ($tanggalLahir->isFuture()) {
                    $umur = 0;
                    $umurText = '0 tahun';
                } else {
                    // Hitung selisih dengan detail
                    $diff = $tanggalLahir->diff($sekarang);
                    
                    $umurTahun = $diff->y;
                    $umurBulan = $diff->m;
                    $umurHari = $diff->d;
                    
                    // Format teks umur
                    $parts = [];
                    if ($umurTahun > 0) {
                        $parts[] = $umurTahun . ' tahun';
                    }
                    if ($umurBulan > 0) {
                        $parts[] = $umurBulan . ' bulan';
                    }
                    if ($umurHari > 0 && $umurTahun == 0) {
                        $parts[] = $umurHari . ' hari';
                    }
                    
                    if (empty($parts)) {
                        $umurText = '0 tahun';
                    } else {
                        $umurText = implode(' ', $parts);
                    }
                    
                    $umur = $umurTahun;
                }
                
                // Ambil vaksin terakhir dari rekam medis (hanya yang ada tindakan vaksin)
                $vaksinTerakhir = $hewan->rekamMedis()
                    ->whereNotNull('tindakan_berkala')
                    ->where('tindakan_berkala', 'like', '%vaksin%')
                    ->latest()
                    ->first();
                
                // Tentukan status (Sehat, Checkup, dll)
                $status = 'Sehat'; // Default
                $antrianTerdekat = $hewan->antrian()
                    ->whereDate('tanggal', '>=', now()->toDateString())
                    ->where('status', '!=', 'selesai')
                    ->orderBy('tanggal', 'asc')
                    ->first();
                
                if ($antrianTerdekat) {
                    $status = 'Checkup';
                }
                
                // Hitung tanggal vaksin berikutnya (hanya jika ada vaksin terakhir)
                $vaksinBerikutnya = null;
                if ($vaksinTerakhir) {
                    $vaksinBerikutnya = $vaksinTerakhir->created_at->addDays(30)->format('d M Y');
                }
                
                return [
                    'id' => $hewan->id,
                    'nama' => $hewan->nama,
                    'jenis' => $hewan->jenis,
                    'ras_breed' => $hewan->ras_breed,
                    'umur' => $umur,
                    'umur_text' => $umurText ?? '0 tahun',
                    'foto' => $hewan->foto,
                    'status' => $status,
                    'vaksin_berikutnya' => $vaksinBerikutnya,
                ];
            });
        
        $jadwalMendatang = $user->antrian()
            ->whereDate('tanggal', '>=', now()->toDateString())
            ->where('status', '!=', 'selesai')
            ->with(['hewan', 'dokter'])
            ->orderBy('tanggal', 'asc')
            ->orderBy('nomor_antrian', 'asc')
            ->take(5)
            ->get()
            ->map(function($antrian) {
                return [
                    'id' => $antrian->id,
                    'tanggal' => $antrian->tanggal,
                    'hewan_nama' => $antrian->hewan->nama,
                    'dokter_nama' => $antrian->dokter ? $antrian->dokter->name : null,
                    'dokter_gelar' => $antrian->dokter ? $antrian->dokter->gelar : null,
                    'jam' => '10:00 AM', // Default, bisa diambil dari jadwal dokter
                    'jenis' => $antrian->keluhan ? 'Checkup Rutin' : 'Konsultasi',
                ];
            });
        
        $notifikasi = Pesan::where('penerima_id', $user->id)
            ->with('pengirim')
            ->latest()
            ->take(3)
            ->get()
            ->map(function($pesan) {
                return [
                    'id' => $pesan->id,
                    'pesan' => $pesan->pesan,
                    'dibaca' => $pesan->dibaca,
                    'pengirim' => $pesan->pengirim->name,
                    'created_at' => $pesan->created_at->diffForHumans(),
                    'icon' => 'clock', // bisa disesuaikan
                ];
            });
        
        $notifikasiCount = Pesan::where('penerima_id', $user->id)
            ->where('dibaca', false)
            ->count();
        
        return Inertia::render('PemilikHewan/Dashboard', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
            'totalHewan' => $totalHewan,
            'totalHewanBulanIni' => $totalHewanBulanIni,
            'appointmentMingguIni' => $appointmentMingguIni,
            'checkupSelesai' => $checkupSelesai,
            'checkupSelesaiBulanIni' => $checkupSelesaiBulanIni,
            'vaksinPending' => $vaksinPending,
            'hewanTerbaru' => $hewanTerbaru,
            'jadwalMendatang' => $jadwalMendatang,
            'notifikasi' => $notifikasi,
            'notifikasiCount' => $notifikasiCount,
        ]);
    }
}
