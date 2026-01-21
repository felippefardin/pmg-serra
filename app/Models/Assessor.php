<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assessor extends Model
{
    use HasFactory;

    // 1. Define o nome correto da tabela no banco
    protected $table = 'assessores';

    // 2. Libera os campos para salvamento
    protected $fillable = [
        'nome',
        'cargo',
        'foto_path' 
    ];
}