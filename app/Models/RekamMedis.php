<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RekamMedis extends Model
{
    use HasFactory;

    protected $table = 'rekam_medis';

    protected $fillable = [
        'antrian_id',
        'hewan_id',
        'dokter_id',
        'penanganan',
        'obat',
        'tindakan_berkala',
        'percepat_penyembuhan',
        'yang_tidak_boleh_dilakukan',
    ];

    // Relationships
    public function antrian()
    {
        return $this->belongsTo(Antrian::class, 'antrian_id');
    }

    public function hewan()
    {
        return $this->belongsTo(Hewan::class, 'hewan_id');
    }

    public function dokter()
    {
        return $this->belongsTo(User::class, 'dokter_id');
    }
}




