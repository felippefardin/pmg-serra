<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
// Models
use App\Models\Noticia;
use App\Models\Evento;
use App\Models\Carta;
use App\Models\Procurador;
use App\Models\Assessor;

class AdminController extends Controller
{
    // =========================================================================
    // NOTÍCIAS
    // =========================================================================
    public function createNoticia()
    {
        // Renderiza o formulário React em resources/js/Pages/Admin/CriarNoticia.jsx
        return Inertia::render('Admin/CriarNoticia');
    }

    public function storeNoticia(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'conteudo' => 'required|string',
            'imagem' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only(['titulo', 'conteudo']);

        if ($request->hasFile('imagem')) {
            $path = $request->file('imagem')->store('noticias', 'public');
            $data['imagem_destaque'] = $path;
        }

        Noticia::create($data);

        return redirect()->route('noticias')->with('success', 'Notícia criada com sucesso!');
    }

    public function editNoticia($id)
    {
        $noticia = Noticia::findOrFail($id);
        // Supondo que você tenha uma página de edição similar à de criação
        return Inertia::render('Admin/CriarNoticia', ['noticia' => $noticia, 'isEdit' => true]); 
    }

    public function updateNoticia(Request $request, $id)
    {
        $noticia = Noticia::findOrFail($id);

        $request->validate([
            'titulo' => 'required|string|max:255',
            'conteudo' => 'required|string',
            'imagem' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only(['titulo', 'conteudo']);

        if ($request->hasFile('imagem')) {
            // Apagar imagem antiga se existir
            if ($noticia->imagem_destaque) {
                Storage::disk('public')->delete($noticia->imagem_destaque);
            }
            $path = $request->file('imagem')->store('noticias', 'public');
            $data['imagem_destaque'] = $path;
        }

        $noticia->update($data);

        return redirect()->route('noticias')->with('success', 'Notícia atualizada!');
    }

    public function destroyNoticia($id)
    {
        $noticia = Noticia::findOrFail($id);
        if ($noticia->imagem_destaque) {
            Storage::disk('public')->delete($noticia->imagem_destaque);
        }
        $noticia->delete();

        return redirect()->route('noticias');
    }

    // =========================================================================
    // EVENTOS
    // =========================================================================
    public function createEvento()
    {
        return Inertia::render('Admin/CriarEvento');
    }

    public function storeEvento(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string',
            'data_evento' => 'required|date',
            'media' => 'nullable|image|max:2048' // Ajuste se for aceitar vídeo
        ]);

        $data = $request->only(['titulo', 'descricao', 'data_evento']);

        if ($request->hasFile('media')) {
            $path = $request->file('media')->store('eventos', 'public');
            $data['media_path'] = $path;
            $data['media_type'] = 'image'; // Simplificação baseada na migration
        }

        Evento::create($data);

        return redirect()->route('eventos');
    }

    public function editEvento($id)
    {
        return Inertia::render('Admin/CriarEvento', ['evento' => Evento::findOrFail($id), 'isEdit' => true]);
    }

    public function updateEvento(Request $request, $id)
    {
        $evento = Evento::findOrFail($id);
        // Validação e lógica similar ao store...
        $evento->update($request->except(['media'])); 
        // Lógica de arquivo omitida para brevidade, mas segue o padrão da Notícia
        return redirect()->route('eventos');
    }

    public function destroyEvento($id)
    {
        Evento::findOrFail($id)->delete();
        return redirect()->route('eventos');
    }

    // =========================================================================
    // CARTAS
    // =========================================================================
    public function createCarta()
    {
        return Inertia::render('Admin/CriarCarta');
    }

    public function storeCarta(Request $request)
    {
        $request->validate([
            'titulo' => 'required',
            'conteudo' => 'required',
            'imagem' => 'nullable|image'
        ]);

        $data = $request->only(['titulo', 'conteudo', 'autor']);

        if ($request->hasFile('imagem')) {
            $data['imagem_path'] = $request->file('imagem')->store('cartas', 'public');
        }

        Carta::create($data);
        return redirect()->route('cartas');
    }

    public function editCarta($id)
    {
        return Inertia::render('Admin/CriarCarta', ['carta' => Carta::findOrFail($id), 'isEdit' => true]);
    }

    public function updateCarta(Request $request, $id)
    {
        $carta = Carta::findOrFail($id);
        $carta->update($request->except('imagem'));
        // Adicionar lógica de upload se necessário
        return redirect()->route('cartas');
    }

    public function destroyCarta($id)
    {
        Carta::findOrFail($id)->delete();
        return redirect()->route('cartas');
    }

    // =========================================================================
    // PROCURADORES & ASSESSORES
    // =========================================================================
    public function createProcurador()
    {
        // Se você tiver uma tela para isso, ex: Admin/CriarProcurador
        // return Inertia::render('Admin/CriarProcurador');
    }

    public function storeProcurador(Request $request)
    {
        Procurador::create($request->all());
        return redirect()->back();
    }

    public function destroyProcurador($id)
    {
        Procurador::findOrFail($id)->delete();
        return redirect()->back();
    }

    public function createAssessor()
    {
        // return Inertia::render('Admin/CriarAssessor');
    }

    public function storeAssessor(Request $request)
    {
        Assessor::create($request->all());
        return redirect()->back();
    }

    public function destroyAssessor($id)
    {
        Assessor::findOrFail($id)->delete();
        return redirect()->back();
    }
}