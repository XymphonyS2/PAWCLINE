<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rekam_medis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('antrian_id')->constrained('antrian')->onDelete('cascade');
            $table->foreignId('hewan_id')->constrained('hewan')->onDelete('cascade');
            $table->foreignId('dokter_id')->constrained('users')->onDelete('cascade');
            $table->text('penanganan');
            $table->text('obat')->nullable(); // Nama obat, dosis, frekuensi
            $table->text('tindakan_berkala')->nullable(); // Vaksinasi, checkup, dll
            $table->text('percepat_penyembuhan')->nullable();
            $table->text('yang_tidak_boleh_dilakukan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rekam_medis');
    }
};




