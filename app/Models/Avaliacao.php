<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avaliacao extends Model
{
    use HasFactory;

    protected $table = 'avaliacaos'; // Forçar nome da tabela se necessário

    protected $fillable = [
        'nome',
        'anonimo',
        'estrelas',
        'comentario',
        'aprovado'
    ];
}