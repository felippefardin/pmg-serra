<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class CartaFoto extends Model
{
    protected $fillable = ['carta_id', 'caminho_foto'];
}