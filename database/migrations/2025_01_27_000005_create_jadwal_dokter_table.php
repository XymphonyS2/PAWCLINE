<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jadwal_dokter', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dokter_id')->constrained('users')->onDelete('cascade');
            $table->enum('hari', ['senin', 'selasa', 'rabu', 'kamis', 'jumat']);
            $table->enum('shift', ['pagi', 'sore']);
            $table->time('jam_mulai');
            $table->time('jam_selesai');
            $table->foreignId('admin_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();

            $table->unique(['dokter_id', 'hari', 'shift']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jadwal_dokter');
    }
};




