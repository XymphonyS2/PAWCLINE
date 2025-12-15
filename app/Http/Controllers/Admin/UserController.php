<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $role = $request->query('role', 'admin');
        
        // Validasi role
        if (!in_array($role, ['admin', 'dokter', 'pemilik_hewan'])) {
            $role = 'admin';
        }
        
        $users = User::where('role', $role)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'gelar' => $user->gelar,
                    'alamat' => $user->alamat,
                    'kontak' => $user->kontak,
                    'is_verified' => $user->is_verified,
                    'created_at' => $user->created_at->toISOString(),
                ];
            });
        
        return Inertia::render('Admin/User/Index', [
            'users' => $users,
            'role' => $role,
        ]);
    }

    public function create(Request $request)
    {
        $role = $request->query('role', 'admin');
        
        return Inertia::render('Admin/User/Create', [
            'role' => $role,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'role' => 'required|in:admin,dokter,pemilik_hewan',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'alamat' => 'required|string',
            'kontak' => 'required|string',
            'gelar' => $request->input('role') === 'dokter' ? 'required|string' : 'nullable|string',
        ]);

        $role = $validated['role'];

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $role,
            'alamat' => $validated['alamat'],
            'kontak' => $validated['kontak'],
            'gelar' => $validated['gelar'] ?? null,
            'is_verified' => in_array($role, ['admin', 'dokter']) ? true : false, // Admin dan Dokter langsung verified, Pemilik Hewan perlu verifikasi
        ]);

        return redirect()->route('admin.user.index', ['role' => $role])
            ->with('success', 'Akun berhasil dibuat. User baru harus login sendiri dengan kredensial yang telah dibuat.');
    }

    public function show(User $user)
    {
        return Inertia::render('Admin/User/Edit', [
            'user' => $user,
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/User/Edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8',
            'alamat' => 'required|string',
            'kontak' => 'required|string',
            'gelar' => $user->role === 'dokter' ? 'required|string' : 'nullable|string',
        ]);

        $updateData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'alamat' => $validated['alamat'],
            'kontak' => $validated['kontak'],
        ];

        if (!empty($validated['password'])) {
            $updateData['password'] = Hash::make($validated['password']);
        }

        if ($user->role === 'dokter') {
            $updateData['gelar'] = $validated['gelar'];
        }

        $user->update($updateData);

        return redirect()->route('admin.user.index', ['role' => $user->role])
            ->with('success', 'Data akun berhasil diperbarui');
    }

    public function destroy(User $user)
    {
        $role = $user->role;
        $user->delete();

        return redirect()->route('admin.user.index', ['role' => $role])
            ->with('success', 'Akun berhasil dihapus');
    }
}
