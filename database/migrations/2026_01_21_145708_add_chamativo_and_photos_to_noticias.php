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
    Schema::table('noticias', function (Blueprint $table) {
        $table->string('chamativo')->after('titulo')->nullable(); // Texto curto
    });

    Schema::create('noticia_fotos', function (Blueprint $table) {
        $table->id();
        $table->foreignId('noticia_id')->constrained('noticias')->onDelete('cascade');
        $table->string('caminho_foto');
        $table->timestamps();
    });
}

public function down()
{
    Schema::dropIfExists('noticia_fotos');
    Schema::table('noticias', function (Blueprint $table) {
        $table->dropColumn('chamativo');
    });
}
};
