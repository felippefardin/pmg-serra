<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Procurador;
use App\Models\Assessor;
use App\Models\Evento;
use App\Models\Noticia;
use App\Models\Carta;

class SiteController extends Controller
{
    // Home
    public function home() {
        return Inertia::render('Home', [
            'titulo' => 'Procuradoria Geral do Município da Serra',
            'descricao' => 'Bem-vindo ao portal oficial da PGM Serra. Comprometidos com a justiça e a legalidade municipal.'
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
        return Inertia::render('Eventos/Index', ['lista' => Evento::orderBy('data_evento', 'desc')->get()]);
    }

    public function noticias() {
        return Inertia::render('Noticias/Index', ['lista' => Noticia::orderBy('created_at', 'desc')->get()]);
    }

    public function cartas() {
        return Inertia::render('Cartas/Index', ['lista' => Carta::orderBy('created_at', 'desc')->get()]);
    }

    // Visualização Individual (Show)
    public function showEvento($id) {
        return Inertia::render('Eventos/Show', ['evento' => Evento::findOrFail($id)]);
    }

    public function showNoticia($id) {
        return Inertia::render('Noticias/Show', ['noticia' => Noticia::findOrFail($id)]);
    }

    public function showCarta($id) {
        return Inertia::render('Cartas/Show', ['carta' => Carta::findOrFail($id)]);
    }
}