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
    Schema::table('home_icons', function (Blueprint $table) {
        // Altera de string para longText
        $table->longText('link_externo')->nullable()->change();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down()
{
    Schema::table('home_icons', function (Blueprint $table) {
        // Volta para string (caso precise desfazer)
        $table->string('link_externo', 255)->nullable()->change();
    });
}
};
