<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'gelar',
        'alamat',
        'kontak',
        'is_verified',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'is_verified' => 'boolean',
        ];
    }

    // Relationships
    public function hewan()
    {
        return $this->hasMany(Hewan::class, 'pemilik_id');
    }

    public function verifikasiAkun()
    {
        return $this->hasOne(VerifikasiAkun::class, 'pemilik_id');
    }

    public function antrian()
    {
        return $this->hasMany(Antrian::class, 'pemilik_id');
    }

    public function jadwalDokter()
    {
        return $this->hasMany(JadwalDokter::class, 'dokter_id');
    }

    public function pesanDikirim()
    {
        return $this->hasMany(Pesan::class, 'pengirim_id');
    }

    public function pesanDiterima()
    {
        return $this->hasMany(Pesan::class, 'penerima_id');
    }

    // Helper methods
    public function isPemilikHewan()
    {
        return $this->role === 'pemilik_hewan';
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isDokter()
    {
        return $this->role === 'dokter';
    }
}
