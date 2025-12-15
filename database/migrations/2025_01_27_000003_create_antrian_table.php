<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('antrian', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pemilik_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('hewan_id')->constrained('hewan')->onDelete('cascade');
            $table->foreignId('dokter_id')->nullable()->constrained('users')->onDelete('set null');
            $table->integer('nomor_antrian');
            $table->date('tanggal');
            $table->enum('status', ['menunggu', 'sedang_diproses', 'selesai', 'dilewati'])->default('menunggu');
            $table->text('keluhan')->nullable();
            $table->timestamp('diproses_at')->nullable();
            $table->timestamp('selesai_at')->nullable();
            $table->timestamps();

            $table->index(['tanggal', 'status']);
            $table->index('nomor_antrian');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('antrian');
    }
};




