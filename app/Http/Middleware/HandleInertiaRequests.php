<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $user = $request->user();
        $sidebarStats = null;
        $notificationCount = 0;
        
        if ($user) {
            if ($user->role === 'pemilik_hewan') {
                $sidebarStats = [
                    'totalHewan' => $user->hewan()->count(),
                    'appointment' => $user->antrian()
                        ->whereBetween('tanggal', [now()->startOfWeek()->toDateString(), now()->endOfWeek()->toDateString()])
                        ->count(),
                ];
                
                // Hitung notifikasi belum dibaca untuk pemilik hewan
                $notificationCount = \App\Models\Pesan::where('penerima_id', $user->id)
                    ->where('dibaca', false)
                    ->whereHas('pengirim', function($query) {
                        $query->where('role', 'dokter');
                    })
                    ->count();
            } elseif ($user->role === 'dokter') {
                // Hitung notifikasi belum dibaca untuk dokter
                $notificationCount = \App\Models\Pesan::where('penerima_id', $user->id)
                    ->where('dibaca', false)
                    ->whereHas('pengirim', function($query) {
                        $query->where('role', 'pemilik_hewan');
                    })
                    ->count();
            } elseif ($user->role === 'admin') {
                // Hitung verifikasi pending untuk admin
                $notificationCount = \App\Models\VerifikasiAkun::where('status', 'pending')
                    ->count();
            }
        }
        
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $user,
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
            'sidebarStats' => $sidebarStats,
            'notificationCount' => $notificationCount,
        ];
    }
}
