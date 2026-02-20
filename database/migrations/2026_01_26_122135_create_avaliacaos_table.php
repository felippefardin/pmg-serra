<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('avaliacao', function (Blueprint $table) {
            $table->id();
            $table->string('nome')->nullable(); // Pode ser nulo se for anônimo
            $table->boolean('anonimo')->default(false);
            $table->integer('estrelas'); // 1 a 5
            $table->text('comentario')->nullable();
            $table->boolean('aprovado')->default(false); // Moderação
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('avaliacao');
    }
};