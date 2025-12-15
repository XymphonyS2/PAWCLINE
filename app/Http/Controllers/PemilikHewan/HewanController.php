<?php

namespace App\Http\Controllers\PemilikHewan;

use App\Http\Controllers\Controller;
use App\Models\Hewan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HewanController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $totalHewan = $user->hewan()->count();
        
        // Hitung hewan sehat (tidak ada antrian pending atau checkup)
        $hewanSehat = $user->hewan()
            ->whereDoesntHave('antrian', function($query) {
                $query->whereDate('tanggal', '>=', now()->toDateString())
                    ->where('status', '!=', 'selesai');
            })
            ->count();
        
        // Hitung hewan yang perlu checkup (ada antrian pending)
        $perluCheckup = $user->hewan()
            ->whereHas('antrian', function($query) {
                $query->whereDate('tanggal', '>=', now()->toDateString())
                    ->where('status', '!=', 'selesai');
            })
            ->count();
        
        $hewan = $user->hewan()
            ->with(['rekamMedis' => function($query) {
                $query->whereNotNull('tindakan_berkala')
                    ->where('tindakan_berkala', 'like', '%vaksin%')
                    ->latest()
                    ->take(1);
            }, 'antrian' => function($query) {
                $query->whereDate('tanggal', '>=', now()->toDateString())
                    ->where('status', '!=', 'selesai')
                    ->orderBy('tanggal', 'asc')
                    ->take(1);
            }])
            ->get()
            ->map(function($item) {
                // Hitung umur dengan benar (tahun, bulan, hari)
                $tanggalLahir = $item->tanggal_lahir instanceof \Carbon\Carbon 
                    ? $item->tanggal_lahir 
                    : \Carbon\Carbon::parse($item->tanggal_lahir);
                
                $sekarang = now();
                
                // Pastikan tanggal lahir tidak di masa depan
                if ($tanggalLahir->isFuture()) {
                    $umurTahun = 0;
                    $umurBulan = 0;
                    $umurHari = 0;
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
                }
                
                // Tentukan status
                $status = 'Sehat';
                $antrianTerdekat = $item->antrian->first();
                if ($antrianTerdekat) {
                    $status = 'Checkup';
                }
                
                // Ambil vaksin terakhir dari rekam medis (hanya yang ada tindakan vaksin)
                $vaksinTerakhir = $item->rekamMedis()
                    ->whereNotNull('tindakan_berkala')
                    ->where('tindakan_berkala', 'like', '%vaksin%')
                    ->latest()
                    ->first();
                
                $vaksinBerikutnya = null;
                if ($vaksinTerakhir) {
                    $vaksinBerikutnya = $vaksinTerakhir->created_at->addDays(30)->locale('id')->translatedFormat('d M Y');
                }
                
                // Ambil checkup terdekat
                $checkupTerdekat = $antrianTerdekat 
                    ? $antrianTerdekat->tanggal->locale('id')->translatedFormat('d M Y')
                    : null;
                
                return [
                    'id' => $item->id,
                    'nama' => $item->nama,
                    'jenis' => $item->jenis,
                    'ras_breed' => $item->ras_breed,
                    'jenis_kelamin' => $item->jenis_kelamin,
                    'tanggal_lahir' => $item->tanggal_lahir->format('Y-m-d'),
                    'umur' => $umurTahun ?? 0,
                    'umur_text' => $umurText ?? '0 tahun',
                    'berat_badan' => $item->berat_badan,
                    'foto' => $item->foto,
                    'status' => $status,
                    'vaksin_berikutnya' => $vaksinBerikutnya,
                    'checkup_terdekat' => $checkupTerdekat,
                ];
            });
        
        return Inertia::render('PemilikHewan/Hewan/Index', [
            'totalHewan' => $totalHewan,
            'hewanSehat' => $hewanSehat,
            'perluCheckup' => $perluCheckup,
            'hewan' => $hewan,
        ]);
    }

    public function create()
    {
        return Inertia::render('PemilikHewan/Hewan/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jenis' => 'required|string|max:255',
            'ras_breed' => 'nullable|string|max:255',
            'jenis_kelamin' => 'required|in:jantan,betina',
            'tanggal_lahir' => 'required|date',
            'berat_badan' => 'nullable|numeric|min:0',
            'foto' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $validated['foto'] = $request->file('foto')->store('hewan', 'public');
        } else {
            unset($validated['foto']);
        }

        $validated['pemilik_id'] = Auth::id();
        
        Hewan::create($validated);

        return redirect()->route('pemilik-hewan.hewan.index')
            ->with('success', 'Hewan berhasil ditambahkan');
    }

    public function show(Hewan $hewan)
    {
        // Pastikan hewan milik user yang login
        if ($hewan->pemilik_id !== Auth::id()) {
            abort(403);
        }
        
        $hewan->load(['rekamMedis.dokter', 'antrian.dokter']);
        
        // Hitung umur dengan benar
        $tanggalLahir = \Carbon\Carbon::parse($hewan->tanggal_lahir);
        $umur = $tanggalLahir->diffInYears(now());
        
        // Jika tanggal lahir di masa depan, set umur ke 0
        if ($tanggalLahir->isFuture()) {
            $umur = 0;
        }
        
        // Format data untuk frontend
        $hewanData = [
            'id' => $hewan->id,
            'nama' => $hewan->nama,
            'jenis' => $hewan->jenis,
            'ras_breed' => $hewan->ras_breed,
            'jenis_kelamin' => $hewan->jenis_kelamin,
            'tanggal_lahir' => $hewan->tanggal_lahir->format('Y-m-d'),
            'umur' => $umurTahun ?? 0,
            'umur_text' => $umurText ?? '0 tahun',
            'berat_badan' => $hewan->berat_badan,
            'foto' => $hewan->foto,
            'rekamMedis' => $hewan->rekamMedis->map(function($rekam) {
                return [
                    'id' => $rekam->id,
                    'penanganan' => $rekam->penanganan,
                    'obat' => $rekam->obat,
                    'tindakan_berkala' => $rekam->tindakan_berkala,
                    'percepat_penyembuhan' => $rekam->percepat_penyembuhan,
                    'yang_tidak_boleh_dilakukan' => $rekam->yang_tidak_boleh_dilakukan,
                    'dokter' => [
                        'id' => $rekam->dokter->id,
                        'name' => $rekam->dokter->name,
                        'gelar' => $rekam->dokter->gelar,
                    ],
                    'created_at' => $rekam->created_at->toISOString(),
                ];
            }),
        ];
        
        return Inertia::render('PemilikHewan/Hewan/Show', [
            'hewan' => $hewanData,
        ]);
    }

    public function edit(Hewan $hewan)
    {
        // Pastikan hewan milik user yang login
        if ($hewan->pemilik_id !== Auth::id()) {
            abort(403);
        }
        
        return Inertia::render('PemilikHewan/Hewan/Edit', [
            'hewan' => $hewan,
        ]);
    }

    public function update(Request $request, Hewan $hewan)
    {
        // Pastikan hewan milik user yang login
        if ($hewan->pemilik_id !== Auth::id()) {
            abort(403);
        }
        
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jenis' => 'required|string|max:255',
            'ras_breed' => 'nullable|string|max:255',
            'jenis_kelamin' => 'required|in:jantan,betina',
            'tanggal_lahir' => 'required|date',
            'berat_badan' => 'nullable|numeric|min:0',
            'foto' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            if ($hewan->foto) {
                Storage::disk('public')->delete($hewan->foto);
            }
            $validated['foto'] = $request->file('foto')->store('hewan', 'public');
        }

        $hewan->update($validated);

        return redirect()->route('pemilik-hewan.hewan.index')
            ->with('success', 'Data hewan berhasil diperbarui');
    }

    public function destroy(Hewan $hewan)
    {
        // Pastikan hewan milik user yang login
        if ($hewan->pemilik_id !== Auth::id()) {
            abort(403);
        }
        
        if ($hewan->foto) {
            Storage::disk('public')->delete($hewan->foto);
        }
        
        $hewan->delete();

        return redirect()->route('pemilik-hewan.hewan.index')
            ->with('success', 'Hewan berhasil dihapus');
    }
}

