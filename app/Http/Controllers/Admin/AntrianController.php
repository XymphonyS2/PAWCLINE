<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Antrian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AntrianController extends Controller
{
    public function index(Request $request)
    {
        $tanggal = $request->get('tanggal', today()->toDateString());
        
        $antrian = Antrian::whereDate('tanggal', $tanggal)
            ->with(['pemilik', 'hewan', 'dokter', 'rekamMedis'])
            ->orderBy('nomor_antrian', 'asc')
            ->get();
        
        $antrianSekarang = Antrian::whereDate('tanggal', $tanggal)
            ->where('status', 'sedang_diproses')
            ->with(['pemilik', 'hewan', 'dokter'])
            ->first();
        
        return Inertia::render('Admin/Antrian/Index', [
            'antrian' => $antrian,
            'antrianSekarang' => $antrianSekarang,
            'tanggal' => $tanggal,
        ]);
    }

    public function lewati(Antrian $antrian)
    {
        $antrian->update([
            'status' => 'dilewati',
        ]);

        return redirect()->route('admin.antrian.index')
            ->with('success', 'Antrian berhasil dilewati');
    }

    public function riwayat(Request $request)
    {
        $antrian = Antrian::whereIn('status', ['selesai', 'dilewati'])
            ->with(['pemilik', 'hewan', 'dokter', 'rekamMedis.dokter'])
            ->orderBy('tanggal', 'desc')
            ->orderBy('nomor_antrian', 'desc')
            ->get();
        
        return Inertia::render('Admin/Antrian/Riwayat', [
            'antrian' => ['data' => $antrian],
        ]);
    }

    public function show(Antrian $antrian)
    {
        $antrian->load(['pemilik', 'hewan', 'dokter', 'rekamMedis.dokter']);
        
        return Inertia::render('Admin/Antrian/Show', [
            'antrian' => $antrian,
        ]);
    }
}
