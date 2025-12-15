<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hewan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pemilik_id')->constrained('users')->onDelete('cascade');
            $table->string('nama');
            $table->string('jenis'); // Kucing, Anjing, Kelinci, dll
            $table->string('ras_breed')->nullable();
            $table->enum('jenis_kelamin', ['jantan', 'betina']);
            $table->date('tanggal_lahir');
            $table->decimal('berat_badan', 5, 2)->nullable(); // dalam kg
            $table->string('foto')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hewan');
    }
};




