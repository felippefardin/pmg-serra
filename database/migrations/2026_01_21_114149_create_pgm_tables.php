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
    // Tabela de Procuradores
    Schema::create('procuradores', function (Blueprint $table) {
        $table->id();
        $table->string('nome');
        $table->string('cargo')->default('Procurador');
        $table->string('foto_path')->nullable();
        $table->text('bio')->nullable();
        $table->timestamps();
    });

    // Tabela de Assessores
    Schema::create('assessores', function (Blueprint $table) {
        $table->id();
        $table->string('nome');
        $table->string('cargo'); 
        $table->string('foto_path')->nullable();
        $table->timestamps();
    });

    // Tabela de Eventos
    Schema::create('eventos', function (Blueprint $table) {
        $table->id();
        $table->string('titulo');
        $table->text('descricao');
        $table->dateTime('data_evento');
        $table->string('media_path')->nullable();
        $table->enum('media_type', ['image', 'video'])->default('image');
        $table->timestamps();
    });

    // Tabela de Notícias
    Schema::create('noticias', function (Blueprint $table) {
        $table->id();
        $table->string('titulo');
        $table->text('conteudo');
        $table->string('imagem_destaque')->nullable();
        $table->timestamps();
    });
}
};
