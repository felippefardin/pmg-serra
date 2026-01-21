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
    // Adiciona o campo 'chamativo' na tabela eventos
    Schema::table('eventos', function (Blueprint $table) {
        $table->string('chamativo')->after('titulo')->nullable(); // Texto curto para a capa
    });

    // Cria a tabela para múltiplas fotos
    Schema::create('evento_fotos', function (Blueprint $table) {
        $table->id();
        $table->foreignId('evento_id')->constrained('eventos')->onDelete('cascade');
        $table->string('caminho_foto');
        $table->timestamps();
    });
}

public function down()
{
    Schema::dropIfExists('evento_fotos');
    Schema::table('eventos', function (Blueprint $table) {
        $table->dropColumn('chamativo');
    });
}
};
