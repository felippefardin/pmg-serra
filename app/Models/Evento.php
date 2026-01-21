<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo', 
        'chamativo', 
        'descricao', 
        'data_evento', 
        'media_path', 
        'media_type'
    ];

    // ESTA É A FUNÇÃO QUE ESTAVA FALTANDO
    public function fotos()
    {
        return $this->hasMany(EventoFoto::class);
    }
}