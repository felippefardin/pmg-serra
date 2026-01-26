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
use App\Models\Avaliacao;

class SiteController extends Controller
{
    // Home
    public function home()
    {
        $icons = HomeIcon::where('ativo', true)->get();

        $avaliacoes = Avaliacao::where('aprovado', true)
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        return Inertia::render('Home', [
            'dynamicIcons' => $icons,
            'avaliacoes' => $avaliacoes
        ]);
    }

    // Listagens
    public function procuradores() {
        return Inertia::render('Procuradores/Index', ['lista' => Procurador::all()]);
    }

    public function assessores() {
        return Inertia::render('Assessores/Index', ['lista' => Assessor::all()]);
    }

    public function eventos() {
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

    // Visualização Individual
    public function showEvento($id) {
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

    // Busca Global
    public function search(Request $request)
    {
        $termo = $request->input('q');

        if (!$termo) {
            return redirect()->route('home');
        }

        $noticias = Noticia::where('titulo', 'like', "%{$termo}%")
            ->orWhere('conteudo', 'like', "%{$termo}%")
            ->orderBy('created_at', 'desc')
            ->get();

        $eventos = Evento::where('titulo', 'like', "%{$termo}%")
            ->orWhere('descricao', 'like', "%{$termo}%")
            ->orderBy('data_evento', 'desc')
            ->get();

        $cartas = Carta::where('titulo', 'like', "%{$termo}%")
            ->orWhere('conteudo', 'like', "%{$termo}%")
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Busca/Index', [
            'termo' => $termo,
            'resultados' => [
                'noticias' => $noticias,
                'eventos' => $eventos,
                'cartas' => $cartas
            ]
        ]);
    }
}