<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeIcon extends Model
{
    // LIBERA OS CAMPOS PARA SEREM SALVOS
    protected $fillable = [
        'label',
        'icone',
        'link', // O campo se chama 'link' no banco, mesmo que na tela seja "Texto"
        'cor',
        'ativo'
    ];
}