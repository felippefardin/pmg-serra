<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Procurador;
use App\Models\Assessor;
use App\Models\Evento;
use App\Models\Noticia;
use App\Models\Carta;
use App\Models\HomeIcon;
use App\Models\Avaliacao; // Adicionado para facilitar

class SiteController extends Controller
{
    // Home
    public function home()
    {
        // 1. Busca os ícones ativos
        $icons = HomeIcon::where('ativo', true)->get();

        // 2. Busca as avaliações aprovadas
        $avaliacoes = Avaliacao::where('aprovado', true)
            ->orderBy('created_at', 'desc')
            ->take(10) // Limite de 10 para não pesar
            ->get();

        // 3. Retorna TUDO junto para a View 'Home'
        return Inertia::render('Home', [
            'dynamicIcons' => $icons,
            'avaliacoes' => $avaliacoes
        ]);
    }

    // Listagens (Index)
    public function procuradores() {
        return Inertia::render('Procuradores/Index', ['lista' => Procurador::all()]);
    }

    public function assessores() {
        return Inertia::render('Assessores/Index', ['lista' => Assessor::all()]);
    }

    public function eventos() {
        // Carrega eventos ordenados pela data (mais recente primeiro)
        return Inertia::render('Eventos/Index', [
            'lista' => Evento::orderBy('data_evento', 'desc')->get()
        ]);
    }

    public function noticias() {
        return Inertia::render('Noticias/Index', [
            'lista' => Noticia::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function cartas() {
        return Inertia::render('Carta/Index', [
            'lista' => Carta::orderBy('created_at', 'desc')->get()
        ]);
    }

    // Visualização Individual (Show)
    public function showEvento($id) {
        // Carrega a galeria junto com o evento
        return Inertia::render('Eventos/Show', [
            'evento' => Evento::with('fotos')->findOrFail($id)
        ]);
    }

    public function showNoticia($id) {
        return Inertia::render('Noticias/Show', [
            'noticia' => Noticia::with('fotos')->findOrFail($id)
        ]);
    }

    public function showCarta($id) {        
        return Inertia::render('Carta/Show', [
            'carta' => Carta::with('fotos')->findOrFail($id)
        ]);
    }
}