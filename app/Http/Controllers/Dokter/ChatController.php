<?php

namespace App\Http\Controllers\Dokter;

use App\Http\Controllers\Controller;
use App\Models\Pesan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index()
    {
        // Ambil semua ID pemilik hewan yang pernah chat dengan dokter ini
        $pemilikHewanIds = Pesan::where(function($query) {
                $query->where('penerima_id', Auth::id())
                    ->orWhere('pengirim_id', Auth::id());
            })
            ->get()
            ->map(function($pesan) {
                return $pesan->pengirim_id === Auth::id() ? $pesan->penerima_id : $pesan->pengirim_id;
            })
            ->unique()
            ->filter(function($id) {
                return $id !== Auth::id();
            });

        $pemilikHewan = User::where('role', 'pemilik_hewan')
            ->whereIn('id', $pemilikHewanIds)
            ->get()
            ->map(function($pemilik) {
                // Hitung jumlah pesan yang belum dibaca dari pemilik hewan ini
                $unreadCount = Pesan::where('pengirim_id', $pemilik->id)
                    ->where('penerima_id', Auth::id())
                    ->where('dibaca', false)
                    ->count();
                
                return [
                    'id' => $pemilik->id,
                    'name' => $pemilik->name,
                    'email' => $pemilik->email,
                    'unread_count' => $unreadCount,
                ];
            });
        
        return Inertia::render('Dokter/Chat/Index', [
            'pemilikHewan' => $pemilikHewan,
        ]);
    }

    public function show(User $pemilikHewan)
    {
        if ($pemilikHewan->role !== 'pemilik_hewan') {
            abort(404);
        }

        $pesan = Pesan::where(function($query) use ($pemilikHewan) {
            $query->where('pengirim_id', Auth::id())
                ->where('penerima_id', $pemilikHewan->id);
        })->orWhere(function($query) use ($pemilikHewan) {
            $query->where('pengirim_id', $pemilikHewan->id)
                ->where('penerima_id', Auth::id());
        })
        ->with(['pengirim', 'penerima'])
        ->orderBy('created_at', 'asc')
        ->get();

        // Tandai pesan sebagai dibaca
        Pesan::where('pengirim_id', $pemilikHewan->id)
            ->where('penerima_id', Auth::id())
            ->where('dibaca', false)
            ->update(['dibaca' => true]);

        return Inertia::render('Dokter/Chat/Show', [
            'pemilikHewan' => $pemilikHewan,
            'pesan' => $pesan,
        ]);
    }

    public function store(Request $request, User $pemilikHewan)
    {
        if ($pemilikHewan->role !== 'pemilik_hewan') {
            abort(404);
        }

        $validated = $request->validate([
            'pesan' => 'required|string',
        ]);

        Pesan::create([
            'pengirim_id' => Auth::id(),
            'penerima_id' => $pemilikHewan->id,
            'pesan' => $validated['pesan'],
        ]);

        return redirect()->route('dokter.chat.show', $pemilikHewan->id);
    }
}
