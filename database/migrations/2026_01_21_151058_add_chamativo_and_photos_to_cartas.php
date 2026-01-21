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
    Schema::table('cartas', function (Blueprint $table) {
        $table->string('chamativo')->after('titulo')->nullable(); // Subtítulo curto
    });

    Schema::create('carta_fotos', function (Blueprint $table) {
        $table->id();
        $table->foreignId('carta_id')->constrained('cartas')->onDelete('cascade');
        $table->string('caminho_foto');
        $table->timestamps();
    });
}

public function down()
{
    Schema::dropIfExists('carta_fotos');
    Schema::table('cartas', function (Blueprint $table) {
        $table->dropColumn('chamativo');
    });
}
};
