<?php

namespace App\Http\Controllers\Dokter;

use App\Http\Controllers\Controller;
use App\Models\Antrian;
use App\Models\RekamMedis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RekamMedisController extends Controller
{
    public function create(Antrian $antrian)
    {
        // Dokter bisa membuat rekam medis untuk antrian yang belum punya dokter atau antrian miliknya
        if ($antrian->dokter_id && $antrian->dokter_id !== Auth::id()) {
            abort(403);
        }

        // Set dokter jika belum ada
        if (!$antrian->dokter_id) {
            $antrian->update(['dokter_id' => Auth::id()]);
        }

        $antrian->load(['hewan', 'pemilik']);
        
        return Inertia::render('Dokter/RekamMedis/Create', [
            'antrian' => $antrian,
        ]);
    }

    public function store(Request $request, Antrian $antrian)
    {
        // Dokter bisa membuat rekam medis untuk antrian yang belum punya dokter atau antrian miliknya
        if ($antrian->dokter_id && $antrian->dokter_id !== Auth::id()) {
            abort(403);
        }

        // Set dokter jika belum ada
        if (!$antrian->dokter_id) {
            $antrian->update(['dokter_id' => Auth::id()]);
        }

        $validated = $request->validate([
            'penanganan' => 'required|string',
            'obat' => 'nullable|string',
            'tindakan_berkala' => 'nullable|string',
            'percepat_penyembuhan' => 'nullable|string',
            'yang_tidak_boleh_dilakukan' => 'nullable|string',
        ]);

        RekamMedis::create([
            'antrian_id' => $antrian->id,
            'hewan_id' => $antrian->hewan_id,
            'dokter_id' => Auth::id(),
            ...$validated,
        ]);

        // Update status antrian menjadi selesai
        $antrian->update([
            'status' => 'selesai',
            'selesai_at' => now(),
        ]);

        return redirect()->route('dokter.antrian.index')
            ->with('success', 'Rekam medis berhasil dibuat dan antrian selesai');
    }

    public function show(RekamMedis $rekamMedis)
    {
        // Pastikan rekam medis milik dokter yang login
        if ($rekamMedis->dokter_id !== Auth::id()) {
            abort(403);
        }

        $rekamMedis->load(['antrian.pemilik', 'hewan', 'dokter']);
        
        return Inertia::render('Dokter/RekamMedis/Show', [
            'rekamMedis' => $rekamMedis,
        ]);
    }
}
