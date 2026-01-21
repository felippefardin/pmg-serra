<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Procurador extends Model
{
    use HasFactory;

   
    protected $table = 'procuradores';

    
    protected $fillable = [
        'nome',
        'cargo',
        'foto_path', 
        'email',
        'oab'
    ];
}