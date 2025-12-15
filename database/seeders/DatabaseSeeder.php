<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Admin Default - Update password jika sudah ada, atau buat baru
        $admin = User::firstOrNew(['email' => 'admin@pawcline.com']);
        $admin->name = 'Admin';
        $admin->password = Hash::make('password');
        $admin->role = 'admin';
        $admin->alamat = 'Alamat Admin';
        $admin->kontak = '081234567890';
        $admin->is_verified = true;
        $admin->email_verified_at = now();
        $admin->save();

        // Test User (optional)
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
    }
}
