<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Carta extends Model
{
    protected $table = 'cartas';
    protected $fillable = ['titulo', 'conteudo', 'imagem_path', 'autor'];
}