<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Avaliacao extends Model
{
    // Altere para 'avaliacaos' (exatamente como está na sua migration)
    protected $table = 'avaliacao';

    protected $fillable = ['estrelas', 'comentario', 'nome', 'anonimo', 'aprovado'];
}