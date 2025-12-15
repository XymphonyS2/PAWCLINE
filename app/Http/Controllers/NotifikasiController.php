<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\Pesan;
use App\Models\RekamMedis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotifikasiController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $notifikasi = [];

        if ($user->role === 'pemilik_hewan') {
            // Notifikasi untuk Pemilik Hewan
            $notifikasi = $this->getNotifikasiPemilikHewan($user);
        } elseif ($user->role === 'dokter') {
            // Notifikasi untuk Dokter
            $notifikasi = $this->getNotifikasiDokter($user);
        } elseif ($user->role === 'admin') {
            // Notifikasi untuk Admin
            $notifikasi = $this->getNotifikasiAdmin($user);
        }

        // Hitung jumlah notifikasi belum dibaca
        $unreadCount = collect($notifikasi)->where('dibaca', false)->count();

        return Inertia::render('Notifikasi/Index', [
            'notifikasi' => $notifikasi,
            'unreadCount' => $unreadCount,
        ]);
    }

    private function getNotifikasiPemilikHewan($user)
    {
        $notifikasi = [];

        // 1. Checkup selesai
        $antrianSelesai = Antrian::where('pemilik_id', $user->id)
            ->where('status', 'selesai')
            ->with(['hewan', 'dokter'])
            ->latest('selesai_at')
            ->take(10)
            ->get()
            ->map(function($antrian) {
                return [
                    'id' => 'antrian_' . $antrian->id,
                    'tipe' => 'checkup_selesai',
                    'judul' => 'Checkup Selesai',
                    'pesan' => "Checkup untuk {$antrian->hewan->nama} telah selesai. Rekam medis tersedia.",
                    'dibaca' => false, // Bisa ditambahkan field di database nanti
                    'created_at' => $antrian->selesai_at ?? $antrian->updated_at,
                    'icon' => 'check-circle',
                    'link' => "/pemilik-hewan/antrian/{$antrian->id}",
                ];
            });

        // 2. Pesan dari dokter
        $pesanDariDokter = Pesan::where('penerima_id', $user->id)
            ->whereHas('pengirim', function($query) {
                $query->where('role', 'dokter');
            })
            ->with('pengirim')
            ->latest()
            ->take(10)
            ->get()
            ->map(function($pesan) {
                return [
                    'id' => 'pesan_' . $pesan->id,
                    'tipe' => 'pesan',
                    'judul' => 'Pesan dari Dokter',
                    'pesan' => "dr. {$pesan->pengirim->name}: {$pesan->pesan}",
                    'dibaca' => $pesan->dibaca,
                    'created_at' => $pesan->created_at,
                    'icon' => 'message-circle',
                    'link' => "/pemilik-hewan/chat/{$pesan->pengirim->id}",
                ];
            });

        // 3. Antrian diproses
        $antrianDiproses = Antrian::where('pemilik_id', $user->id)
            ->where('status', 'sedang_diproses')
            ->with(['hewan', 'dokter'])
            ->latest('diproses_at')
            ->take(10)
            ->get()
            ->map(function($antrian) {
                return [
                    'id' => 'antrian_proses_' . $antrian->id,
                    'tipe' => 'antrian_diproses',
                    'judul' => 'Antrian Sedang Diproses',
                    'pesan' => "Antrian untuk {$antrian->hewan->nama} sedang diproses oleh dr. {$antrian->dokter->name}.",
                    'dibaca' => false,
                    'created_at' => $antrian->diproses_at ?? $antrian->updated_at,
                    'icon' => 'clock',
                    'link' => "/pemilik-hewan/antrian/{$antrian->id}",
                ];
            });

        // Gabungkan semua notifikasi dan urutkan berdasarkan created_at
        $notifikasi = collect([...$antrianSelesai, ...$pesanDariDokter, ...$antrianDiproses])
            ->sortByDesc('created_at')
            ->values()
            ->all();

        return $notifikasi;
    }

    private function getNotifikasiDokter($user)
    {
        $notifikasi = [];

        // 1. Antrian baru
        $antrianBaru = Antrian::where('dokter_id', $user->id)
            ->where('status', 'menunggu')
            ->with(['hewan', 'pemilik'])
            ->latest()
            ->take(10)
            ->get()
            ->map(function($antrian) {
                return [
                    'id' => 'antrian_' . $antrian->id,
                    'tipe' => 'antrian_baru',
                    'judul' => 'Antrian Baru',
                    'pesan' => "Antrian baru dari {$antrian->pemilik->name} untuk {$antrian->hewan->nama}.",
                    'dibaca' => false,
                    'created_at' => $antrian->created_at,
                    'icon' => 'clock',
                    'link' => "/dokter/antrian/{$antrian->id}",
                ];
            });

        // 2. Pesan dari pemilik hewan
        $pesanDariPemilik = Pesan::where('penerima_id', $user->id)
            ->whereHas('pengirim', function($query) {
                $query->where('role', 'pemilik_hewan');
            })
            ->with('pengirim')
            ->latest()
            ->take(10)
            ->get()
            ->map(function($pesan) {
                return [
                    'id' => 'pesan_' . $pesan->id,
                    'tipe' => 'pesan',
                    'judul' => 'Pesan dari Pemilik Hewan',
                    'pesan' => "{$pesan->pengirim->name}: {$pesan->pesan}",
                    'dibaca' => $pesan->dibaca,
                    'created_at' => $pesan->created_at,
                    'icon' => 'message-circle',
                    'link' => "/dokter/chat/{$pesan->pengirim->id}",
                ];
            });

        $notifikasi = collect([...$antrianBaru, ...$pesanDariPemilik])
            ->sortByDesc('created_at')
            ->values()
            ->all();

        return $notifikasi;
    }

    private function getNotifikasiAdmin($user)
    {
        $notifikasi = [];

        // 1. Verifikasi pending
        $verifikasiPending = \App\Models\VerifikasiAkun::where('status', 'pending')
            ->with('pemilik')
            ->latest()
            ->take(10)
            ->get()
            ->map(function($verifikasi) {
                return [
                    'id' => 'verifikasi_' . $verifikasi->id,
                    'tipe' => 'verifikasi_pending',
                    'judul' => 'Verifikasi Pending',
                    'pesan' => "Verifikasi akun dari {$verifikasi->pemilik->name} menunggu persetujuan.",
                    'dibaca' => false,
                    'created_at' => $verifikasi->created_at,
                    'icon' => 'file-check',
                    'link' => "/admin/verifikasi/{$verifikasi->id}",
                ];
            });

        $notifikasi = collect([...$verifikasiPending])
            ->sortByDesc('created_at')
            ->values()
            ->all();

        return $notifikasi;
    }
}



