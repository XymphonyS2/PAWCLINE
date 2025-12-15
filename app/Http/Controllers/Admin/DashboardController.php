<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Antrian;
use App\Models\User;
use App\Models\VerifikasiAkun;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalPemilikHewan = User::where('role', 'pemilik_hewan')->count();
        $totalDokter = User::where('role', 'dokter')->count();
        $verifikasiPending = VerifikasiAkun::where('status', 'pending')->count();
        $antrianHariIni = Antrian::where('tanggal', today())->count();
        
        return Inertia::render('Admin/Dashboard', [
            'totalPemilikHewan' => $totalPemilikHewan,
            'totalDokter' => $totalDokter,
            'verifikasiPending' => $verifikasiPending,
            'antrianHariIni' => $antrianHariIni,
        ]);
    }
}
