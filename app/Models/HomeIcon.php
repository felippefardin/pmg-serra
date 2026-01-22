<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeIcon extends Model
{
    protected $fillable = [
        'label', 'icone', 'cor', 'titulo', 'conteudo',
        'horario', 'dias', 'telefone', 'whatsapp', 'email', 'endereco',
        'link_externo', 'imagens', 'documentos', 'ativo'
    ];

    protected $casts = [
        'link_externo' => 'array',
        'imagens' => 'array',
        'documentos' => 'array', // Essencial para o JSON funcionar
        'ativo' => 'boolean'
    ];
}