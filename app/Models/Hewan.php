<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hewan extends Model
{
    use HasFactory;

    protected $table = 'hewan';

    protected $fillable = [
        'pemilik_id',
        'nama',
        'jenis',
        'ras_breed',
        'jenis_kelamin',
        'tanggal_lahir',
        'berat_badan',
        'foto',
    ];

    protected function casts(): array
    {
        return [
            'tanggal_lahir' => 'date',
            'berat_badan' => 'decimal:2',
        ];
    }

    // Relationships
    public function pemilik()
    {
        return $this->belongsTo(User::class, 'pemilik_id');
    }

    public function antrian()
    {
        return $this->hasMany(Antrian::class, 'hewan_id');
    }

    public function rekamMedis()
    {
        return $this->hasMany(RekamMedis::class, 'hewan_id');
    }
}




