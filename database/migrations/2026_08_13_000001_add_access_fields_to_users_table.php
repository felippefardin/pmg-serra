<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (! Schema::hasColumn('users', 'nome_acesso')) {
                $table->string('nome_acesso')->nullable()->unique();
            }

            if (! Schema::hasColumn('users', 'matricula')) {
                $table->string('matricula')->nullable()->unique();
            }

            if (! Schema::hasColumn('users', 'cpf')) {
                $table->string('cpf', 14)->nullable()->unique();
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            foreach (['nome_acesso', 'matricula', 'cpf'] as $column) {
                if (Schema::hasColumn('users', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
