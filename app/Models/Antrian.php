<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Antrian extends Model
{
    use HasFactory;

    protected $table = 'antrian';

    protected $fillable = [
        'pemilik_id',
        'hewan_id',
        'dokter_id',
        'nomor_antrian',
        'tanggal',
        'status',
        'keluhan',
        'diproses_at',
        'selesai_at',
    ];

    protected function casts(): array
    {
        return [
            'tanggal' => 'date',
            'diproses_at' => 'datetime',
            'selesai_at' => 'datetime',
        ];
    }

    // Relationships
    public function pemilik()
    {
        return $this->belongsTo(User::class, 'pemilik_id');
    }

    public function hewan()
    {
        return $this->belongsTo(Hewan::class, 'hewan_id');
    }

    public function dokter()
    {
        return $this->belongsTo(User::class, 'dokter_id');
    }

    public function rekamMedis()
    {
        return $this->hasOne(RekamMedis::class, 'antrian_id');
    }
}




