<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Carta extends Model
{
    // Adicionado 'chamativo' e mantido 'imagem_path'
    protected $fillable = ['titulo', 'chamativo', 'conteudo', 'autor', 'imagem_path'];

    // Relacionamento com a galeria
    public function fotos()
    {
        return $this->hasMany(CartaFoto::class);
    }
}