<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    protected $table = 'eventos';
    protected $fillable = ['titulo', 'descricao', 'data_evento', 'media_path', 'media_type'];
    
    // Converte a data automaticamente para objeto Carbon (facilita formatar)
    protected $casts = [
        'data_evento' => 'datetime',
    ];
}