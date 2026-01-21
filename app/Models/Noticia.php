<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Noticia extends Model
{
    use HasFactory;

    protected $fillable = ['titulo', 'chamativo', 'conteudo', 'imagem_destaque'];

    // Relacionamento com a galeria de fotos
    public function fotos()
    {
        return $this->hasMany(NoticiaFoto::class);
    }
}