<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class ResetAdminPassword extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:reset-password {email=admin@pawcline.com} {--password=password}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset password for admin user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        $password = $this->option('password');

        $user = User::where('email', $email)->first();

        if (!$user) {
            $this->error("User dengan email {$email} tidak ditemukan!");
            return 1;
        }

        $user->password = Hash::make($password);
        $user->email_verified_at = now();
        $user->save();

        $this->info("Password berhasil direset untuk {$email}");
        $this->info("Email: {$email}");
        $this->info("Password: {$password}");

        return 0;
    }
}
