<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JadwalDokter extends Model
{
    use HasFactory;

    protected $table = 'jadwal_dokter';

    protected $fillable = [
        'dokter_id',
        'hari',
        'shift',
        'jam_mulai',
        'jam_selesai',
        'admin_id',
    ];

    protected function casts(): array
    {
        return [
            'jam_mulai' => 'datetime:H:i',
            'jam_selesai' => 'datetime:H:i',
        ];
    }

    // Relationships
    public function dokter()
    {
        return $this->belongsTo(User::class, 'dokter_id');
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }
}




