<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Models\VerifikasiAkun;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        $verifikasi = null;
        
        // Untuk pemilik hewan, ambil data verifikasi
        $verifikasiData = null;
        if ($user->role === 'pemilik_hewan') {
            $verifikasi = VerifikasiAkun::where('pemilik_id', $user->id)->first();
            if ($verifikasi) {
                $verifikasiData = [
                    'id' => $verifikasi->id,
                    'pemilik_id' => $verifikasi->pemilik_id,
                    'ktp_path' => $verifikasi->ktp_path,
                    'status' => $verifikasi->status,
                    'catatan' => $verifikasi->catatan,
                    'created_at' => $verifikasi->created_at->toISOString(),
                ];
            }
        }

        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'verifikasi' => $verifikasiData,
        ]);
    }

    /**
     * Update the user's profile settings (name and email).
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return back()->with('success', 'Profil berhasil diperbarui.');
    }

    /**
     * Update the user's password.
     */
    public function updatePassword(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => $validated['password'],
        ]);

        return back()->with('success', 'Password berhasil diperbarui.');
    }

    /**
     * Store verification request (for pemilik hewan).
     */
    public function storeVerifikasi(Request $request): RedirectResponse
    {
        // Hanya pemilik hewan yang bisa mengajukan verifikasi
        if ($request->user()->role !== 'pemilik_hewan') {
            abort(403);
        }

        try {
            // Debug: Log request data
            Log::info('Store Verifikasi Request', [
                'user_id' => $request->user()->id,
                'has_file' => $request->hasFile('foto_ktp'),
                'all_files' => $request->allFiles(),
            ]);

            $validated = $request->validate([
                'foto_ktp' => 'required|image|max:2048|mimes:jpeg,png,jpg',
            ]);

            if (!$request->hasFile('foto_ktp')) {
                Log::error('File KTP tidak ditemukan dalam request');
                return back()->withErrors(['foto_ktp' => 'File KTP tidak ditemukan.']);
            }

            $ktpPath = $request->file('foto_ktp')->store('ktp', 'public');
            Log::info('File KTP disimpan', ['path' => $ktpPath]);

            // Cek apakah sudah ada verifikasi sebelumnya
            $existingVerifikasi = VerifikasiAkun::where('pemilik_id', $request->user()->id)->first();
            
            if ($existingVerifikasi) {
                // Hapus file lama jika ada
                if ($existingVerifikasi->ktp_path && Storage::disk('public')->exists($existingVerifikasi->ktp_path)) {
                    Storage::disk('public')->delete($existingVerifikasi->ktp_path);
                }
                
                // Jika sudah ada, update (termasuk jika status sudah diterima/ditolak, reset ke pending)
                $existingVerifikasi->update([
                    'ktp_path' => $ktpPath,
                    'status' => 'pending',
                    'catatan' => null,
                    'admin_id' => null,
                    'diverifikasi_at' => null,
                ]);
                Log::info('Verifikasi diupdate', ['id' => $existingVerifikasi->id]);
            } else {
                // Jika belum ada, create baru
                $newVerifikasi = VerifikasiAkun::create([
                    'pemilik_id' => $request->user()->id,
                    'ktp_path' => $ktpPath,
                    'status' => 'pending',
                ]);
                Log::info('Verifikasi baru dibuat', ['id' => $newVerifikasi->id, 'pemilik_id' => $newVerifikasi->pemilik_id]);
            }

            return back()->with('success', 'Data verifikasi berhasil dikirim. Menunggu verifikasi dari admin.');
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error: ' . json_encode($e->errors()));
            return back()->withErrors($e->errors());
        } catch (\Exception $e) {
            Log::error('Error storing verifikasi: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return back()->withErrors(['foto_ktp' => 'Terjadi kesalahan saat menyimpan data verifikasi: ' . $e->getMessage()]);
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
