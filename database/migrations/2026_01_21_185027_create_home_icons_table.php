<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('home_icons', function (Blueprint $table) {
        $table->id();
        $table->string('label');       // Ex: Procuradores
        $table->string('icone');       // Ex: FaUserTie (Nome do ícone)
        $table->string('link');        // Ex: /procuradores
        $table->string('cor');         // Ex: bg-blue-600
        $table->boolean('ativo')->default(true);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_icons');
    }
};
