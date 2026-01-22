<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('home_icons', function (Blueprint $table) {
            $table->id();
            $table->string('label');       
            $table->string('icone');       
            $table->string('cor');         
            
            $table->string('titulo');      
            $table->text('conteudo');      
            
            // Funcionamento
            $table->string('horario')->nullable(); 
            $table->string('dias')->nullable();    
            
            // Contatos
            $table->string('telefone')->nullable();
            $table->string('whatsapp')->nullable(); // Novo
            $table->string('email')->nullable();
            $table->string('endereco')->nullable();
            
            // Link Extra
            $table->string('link_externo')->nullable(); // Novo

            $table->boolean('ativo')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('home_icons');
    }
};