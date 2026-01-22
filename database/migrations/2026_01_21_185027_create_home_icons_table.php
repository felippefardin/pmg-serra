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
            $table->string('label')->nullable();       
            $table->string('icone')->nullable();       
            $table->string('cor')->nullable();         
            
            $table->string('titulo')->nullable();      
            $table->text('conteudo')->nullable();      
            
            // Funcionamento
            $table->string('horario')->nullable(); 
            $table->string('dias')->nullable();    
            
            // Contatos
            $table->string('telefone')->nullable();
            $table->string('whatsapp')->nullable(); 
            $table->string('email')->nullable();
            $table->string('endereco')->nullable();
            
            // Links e Arquivos (JSON)
            $table->json('link_externo')->nullable();
            $table->json('imagens')->nullable();
            $table->json('documentos')->nullable(); // Campo novo

            $table->boolean('ativo')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('home_icons');
    }
};