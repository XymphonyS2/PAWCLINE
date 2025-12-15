<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VerifikasiAkun extends Model
{
    use HasFactory;

    protected $table = 'verifikasi_akun';

    protected $fillable = [
        'pemilik_id',
        'ktp_path',
        'status',
        'catatan',
        'admin_id',
        'diverifikasi_at',
    ];

    protected function casts(): array
    {
        return [
            'diverifikasi_at' => 'datetime',
        ];
    }

    // Relationships
    public function pemilik()
    {
        return $this->belongsTo(User::class, 'pemilik_id');
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }
}




