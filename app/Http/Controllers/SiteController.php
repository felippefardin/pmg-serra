<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail; 
use App\Mail\FaleConoscoMail;
use Inertia\Inertia;
use App\Models\Procurador;
use App\Models\Assessor;
use App\Models\Evento;
use App\Models\Noticia;
use App\Models\Carta;
use App\Models\HomeIcon;
use App\Models\Avaliacao;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

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

        // Busca os dados do PJe internamente com segurança
        $pjeData = [];
        $url = config('services.pje.tpu_api');
        
        if (!empty($url)) {
            try {
                // withoutVerifying() ignora erros de certificado SSL em ambiente local
                $response = Http::withoutVerifying()->timeout(5)->get($url);
                if ($response->successful()) {
                    $pjeData = $response->json();
                }
            } catch (\Exception $e) {
                Log::error('Erro ao conectar na API PJe: ' . $e->getMessage());
            }
        }

        return Inertia::render('Home', [
            'dynamicIcons' => $icons,
            'avaliacoes' => $avaliacoes,
            'pjeInitialData' => $pjeData
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

    public function contato() {
        return Inertia::render('Contato/Index');
    }

    // Processa o envio
    public function enviarContato(Request $request) {
        $validado = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email',
            'celular' => 'nullable|string|max:20',
            'telefone_fixo' => 'nullable|string|max:20',
            'assunto' => 'required|string|max:100',
            'mensagem' => 'required|string',
        ]);

        $emailsPorSetor = [
            'Dívida Ativa (DECODAM)' => 'decodam.proger@serra.es.gov.br',
            'Cartório (CRCDD)'      => 'cartorio.progerserra.es@gmail.com',
            'Contábil (NTC)'        => 'nucleotecnicocontabil@gmail.com',
            'Gabinete'              => 'proger@serra.es.gov.br',
        ];

        $destinatario = $emailsPorSetor[$validado['assunto']] ?? 'proger@serra.es.gov.br';

        try {
            Mail::to($destinatario)->send(new FaleConoscoMail($validado));            
            return redirect()->back()->with('success', 'Sua mensagem foi enviada com sucesso! Aguarde o retorno.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Sua mensagem não pôde ser enviada. Detalhe do erro: ' . $e->getMessage());
        }
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

        $icones = HomeIcon::where('ativo', true)
            ->where(function($query) use ($termo) {
                $query->where('titulo', 'like', "%{$termo}%")
                      ->orWhere('conteudo', 'like', "%{$termo}%");
            })
            ->get();

        return Inertia::render('Busca/Index', [
            'termo' => $termo,
            'resultados' => [
                'noticias' => $noticias,
                'eventos' => $eventos,
                'cartas' => $cartas,
                'icones' => $icones 
            ]
        ]);
    }

    public function buscarDadosTpu()
    {
        $url = config('services.pje.tpu_api');
        
        if (empty($url)) {
            return response()->json(['error' => 'URL não configurada'], 400);
        }

        $response = Http::withoutVerifying()->get($url);

        if ($response->successful()) {
            return $response->json();
        }

        return response()->json(['error' => 'Falha ao conectar ao PJe'], 500);
    }
}