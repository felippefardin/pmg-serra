<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('nome_acesso')->unique()->after('name'); // Nome de acesso à prefeitura
            $table->string('matricula')->unique()->after('email');
            $table->string('cpf')->unique()->after('matricula');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['nome_acesso', 'matricula', 'cpf']);
        });
    }
};