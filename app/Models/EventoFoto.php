<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventoFoto extends Model
{
    use HasFactory;

    protected $fillable = ['evento_id', 'caminho_foto'];

    public function evento()
    {
        return $this->belongsTo(Evento::class);
    }
}