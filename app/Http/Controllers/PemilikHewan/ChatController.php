<?php

namespace App\Http\Controllers\PemilikHewan;

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
        $dokter = User::where('role', 'dokter')->get()
            ->map(function($dokter) {
                // Hitung jumlah pesan yang belum dibaca dari dokter ini
                $unreadCount = Pesan::where('pengirim_id', $dokter->id)
                    ->where('penerima_id', Auth::id())
                    ->where('dibaca', false)
                    ->count();
                
                return [
                    'id' => $dokter->id,
                    'name' => $dokter->name,
                    'gelar' => $dokter->gelar,
                    'email' => $dokter->email,
                    'unread_count' => $unreadCount,
                ];
            });
        
        return Inertia::render('PemilikHewan/Chat/Index', [
            'dokter' => $dokter,
        ]);
    }

    public function show(User $dokter)
    {
        if ($dokter->role !== 'dokter') {
            abort(404);
        }

        $pesan = Pesan::where(function($query) use ($dokter) {
            $query->where('pengirim_id', Auth::id())
                ->where('penerima_id', $dokter->id);
        })->orWhere(function($query) use ($dokter) {
            $query->where('pengirim_id', $dokter->id)
                ->where('penerima_id', Auth::id());
        })
        ->with(['pengirim', 'penerima'])
        ->orderBy('created_at', 'asc')
        ->get();

        // Tandai pesan sebagai dibaca
        Pesan::where('pengirim_id', $dokter->id)
            ->where('penerima_id', Auth::id())
            ->where('dibaca', false)
            ->update(['dibaca' => true]);

        return Inertia::render('PemilikHewan/Chat/Show', [
            'dokter' => $dokter,
            'pesan' => $pesan,
        ]);
    }

    public function store(Request $request, User $dokter)
    {
        if ($dokter->role !== 'dokter') {
            abort(404);
        }

        $validated = $request->validate([
            'pesan' => 'required|string',
        ]);

        Pesan::create([
            'pengirim_id' => Auth::id(),
            'penerima_id' => $dokter->id,
            'pesan' => $validated['pesan'],
            'dibaca' => false, // Pesan baru selalu belum dibaca
        ]);

        return redirect()->route('pemilik-hewan.chat.show', $dokter->id);
    }
}
