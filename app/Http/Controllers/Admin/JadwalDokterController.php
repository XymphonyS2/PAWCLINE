<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JadwalDokter;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JadwalDokterController extends Controller
{
    public function index()
    {
        $jadwal = JadwalDokter::with(['dokter', 'admin'])
            ->orderBy('hari')
            ->orderBy('shift')
            ->get();
        
        $dokter = User::where('role', 'dokter')->get();
        
        return Inertia::render('Admin/JadwalDokter/Index', [
            'jadwal' => $jadwal,
            'dokter' => $dokter,
        ]);
    }

    public function create()
    {
        $dokter = User::where('role', 'dokter')->get();
        
        return Inertia::render('Admin/JadwalDokter/Create', [
            'dokter' => $dokter,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'dokter_id' => 'required|exists:users,id',
            'hari' => 'required|in:senin,selasa,rabu,kamis,jumat',
            'shift' => 'required|in:pagi,sore',
        ]);

        // Cek apakah sudah ada jadwal untuk dokter, hari, dan shift yang sama
        $existing = JadwalDokter::where('dokter_id', $validated['dokter_id'])
            ->where('hari', $validated['hari'])
            ->where('shift', $validated['shift'])
            ->first();

        if ($existing) {
            return back()->withErrors(['jadwal' => 'Jadwal untuk dokter, hari, dan shift ini sudah ada']);
        }

        // Set jam otomatis sesuai shift
        if ($validated['shift'] === 'pagi') {
            $jamMulai = '08:00';
            $jamSelesai = '12:00';
        } else {
            $jamMulai = '13:00';
            $jamSelesai = '16:00';
        }

        JadwalDokter::create([
            'dokter_id' => $validated['dokter_id'],
            'hari' => $validated['hari'],
            'shift' => $validated['shift'],
            'jam_mulai' => $jamMulai,
            'jam_selesai' => $jamSelesai,
            'admin_id' => Auth::id(),
        ]);

        return redirect()->route('admin.jadwal-dokter.index')
            ->with('success', 'Jadwal dokter berhasil ditambahkan');
    }

    public function show(JadwalDokter $jadwalDokter)
    {
        $jadwalDokter->load(['dokter', 'admin']);
        $dokter = User::where('role', 'dokter')->get();
        
        return Inertia::render('Admin/JadwalDokter/Edit', [
            'jadwal' => $jadwalDokter,
            'dokter' => $dokter,
        ]);
    }

    public function edit(JadwalDokter $jadwalDokter)
    {
        $dokter = User::where('role', 'dokter')->get();
        
        return Inertia::render('Admin/JadwalDokter/Edit', [
            'jadwal' => $jadwalDokter,
            'dokter' => $dokter,
        ]);
    }

    public function update(Request $request, JadwalDokter $jadwalDokter)
    {
        $validated = $request->validate([
            'dokter_id' => 'required|exists:users,id',
            'hari' => 'required|in:senin,selasa,rabu,kamis,jumat',
            'shift' => 'required|in:pagi,sore',
        ]);

        // Cek apakah sudah ada jadwal untuk dokter, hari, dan shift yang sama (kecuali jadwal ini)
        $existing = JadwalDokter::where('dokter_id', $validated['dokter_id'])
            ->where('hari', $validated['hari'])
            ->where('shift', $validated['shift'])
            ->where('id', '!=', $jadwalDokter->id)
            ->first();

        if ($existing) {
            return back()->withErrors(['jadwal' => 'Jadwal untuk dokter, hari, dan shift ini sudah ada']);
        }

        // Set jam otomatis sesuai shift
        if ($validated['shift'] === 'pagi') {
            $jamMulai = '08:00';
            $jamSelesai = '12:00';
        } else {
            $jamMulai = '13:00';
            $jamSelesai = '16:00';
        }

        $jadwalDokter->update([
            'dokter_id' => $validated['dokter_id'],
            'hari' => $validated['hari'],
            'shift' => $validated['shift'],
            'jam_mulai' => $jamMulai,
            'jam_selesai' => $jamSelesai,
        ]);

        return redirect()->route('admin.jadwal-dokter.index')
            ->with('success', 'Jadwal dokter berhasil diperbarui');
    }

    public function destroy(JadwalDokter $jadwalDokter)
    {
        $jadwalDokter->delete();

        return redirect()->route('admin.jadwal-dokter.index')
            ->with('success', 'Jadwal dokter berhasil dihapus');
    }
}
