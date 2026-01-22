<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeIcon extends Model
{
    protected $fillable = [
        'label',
        'icone',
        'cor',
        'titulo',
        'conteudo',
        'horario',
        'dias',
        'telefone',
        'whatsapp',     
        'email',
        'endereco',
        'link_externo', 
        'ativo'
    ];
}