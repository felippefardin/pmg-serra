<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NoticiaFoto extends Model
{
    use HasFactory;

    protected $fillable = ['noticia_id', 'caminho_foto'];
}