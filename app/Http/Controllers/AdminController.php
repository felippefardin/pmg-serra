<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
// Models
use App\Models\Noticia;
use App\Models\NoticiaFoto; // Novo Model
use App\Models\Evento;
use App\Models\EventoFoto;
use App\Models\Carta;
use App\Models\Procurador;
use App\Models\Assessor;

class AdminController extends Controller
{
    // =========================================================================
    // NOTÍCIAS (ATUALIZADO IGUAL EVENTOS)
    // =========================================================================
    public function createNoticia()
    {
        return Inertia::render('Admin/CriarNoticia');
    }

    public function storeNoticia(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'chamativo' => 'required|string|max:150', // Novo campo
            'conteudo' => 'required|string',
            'capa' => 'nullable|image|max:2048',      // Foto principal
            'galeria.*' => 'nullable|image|max:2048'  // Múltiplas fotos
        ]);

        $data = $request->only(['titulo', 'chamativo', 'conteudo']);

        // 1. Upload da Capa (Salva em imagem_destaque)
        if ($request->hasFile('capa')) {
            $data['imagem_destaque'] = $request->file('capa')->store('noticias/capas', 'public');
        }

        $noticia = Noticia::create($data);

        // 2. Upload da Galeria
        if ($request->hasFile('galeria')) {
            foreach ($request->file('galeria') as $foto) {
                $path = $foto->store('noticias/galeria', 'public');
                $noticia->fotos()->create(['caminho_foto' => $path]);
            }
        }

        return redirect()->route('noticias')->with('success', 'Notícia publicada com sucesso!');
    }

    public function editNoticia($id)
    {
        return Inertia::render('Admin/CriarNoticia', [
            'noticia' => Noticia::with('fotos')->findOrFail($id), // Carrega a galeria
            'isEdit' => true
        ]); 
    }

    public function updateNoticia(Request $request, $id)
    {
        $noticia = Noticia::findOrFail($id);

        $request->validate([
            'titulo' => 'required|string|max:255',
            'chamativo' => 'required|string|max:150',
            'conteudo' => 'required|string',
            'capa' => 'nullable|image|max:2048',
            'galeria' => 'nullable|array',
            'galeria.*' => 'image|max:2048',
        ]);

        $data = $request->only(['titulo', 'chamativo', 'conteudo']);

        // Atualizar Capa
        if ($request->hasFile('capa')) {
            if ($noticia->imagem_destaque) {
                Storage::disk('public')->delete($noticia->imagem_destaque);
            }
            $data['imagem_destaque'] = $request->file('capa')->store('noticias/capas', 'public');
        }

        $noticia->update($data);

        // Adicionar novas fotos à galeria
        if ($request->hasFile('galeria')) {
            foreach ($request->file('galeria') as $foto) {
                $path = $foto->store('noticias/galeria', 'public');
                $noticia->fotos()->create(['caminho_foto' => $path]);
            }
        }

        return redirect()->route('noticias')->with('success', 'Notícia atualizada!');
    }

    public function destroyNoticia($id)
    {
        $noticia = Noticia::with('fotos')->findOrFail($id);
        
        // Deleta capa antiga
        if ($noticia->imagem_destaque) {
            Storage::disk('public')->delete($noticia->imagem_destaque);
        }

        // Deleta fotos da galeria do disco
        foreach ($noticia->fotos as $foto) {
            Storage::disk('public')->delete($foto->caminho_foto);
        }

        $noticia->delete();

        return redirect()->route('noticias')->with('success', 'Notícia excluída!');
    }

    // =========================================================================
    // EVENTOS (CORRIGIDO: createEvento restaurado)
    // =========================================================================
    public function createEvento()
    {
        return Inertia::render('Admin/CriarEvento');
    }

    public function storeEvento(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'chamativo' => 'nullable|string|max:150',
            'descricao' => 'required|string',
            'data_evento' => 'required|date',
            'capa' => 'nullable|image|max:2048',
            'galeria' => 'nullable|array',
            'galeria.*' => 'image|max:2048',
        ]);

        $data = $request->only(['titulo', 'chamativo', 'descricao', 'data_evento']);

        if ($request->hasFile('capa')) {
            $data['media_path'] = $request->file('capa')->store('eventos/capas', 'public');
            $data['media_type'] = 'image';
        }

        $evento = Evento::create($data);

        if ($request->hasFile('galeria')) {
            foreach ($request->file('galeria') as $foto) {
                $path = $foto->store('eventos/galeria', 'public');
                $evento->fotos()->create(['caminho_foto' => $path]);
            }
        }

        return redirect()->route('eventos')->with('success', 'Evento criado com sucesso!');
    }

    public function editEvento($id)
    {
        return Inertia::render('Admin/CriarEvento', [
            'evento' => Evento::with('fotos')->findOrFail($id),
            'isEdit' => true
        ]);
    }

    public function updateEvento(Request $request, $id)
    {
        $evento = Evento::findOrFail($id);
        
        $request->validate([
            'titulo' => 'required|string|max:255',
            'chamativo' => 'nullable|string|max:150',
            'descricao' => 'required|string',
            'data_evento' => 'required|date',
            'capa' => 'nullable|image|max:2048',
            'galeria' => 'nullable|array',
            'galeria.*' => 'image|max:2048',
        ]);

        $data = $request->only(['titulo', 'chamativo', 'descricao', 'data_evento']);

        if ($request->hasFile('capa')) {
            if ($evento->media_path) Storage::disk('public')->delete($evento->media_path);
            $data['media_path'] = $request->file('capa')->store('eventos/capas', 'public');
        }

        $evento->update($data);

        if ($request->hasFile('galeria')) {
            foreach ($request->file('galeria') as $foto) {
                $path = $foto->store('eventos/galeria', 'public');
                $evento->fotos()->create(['caminho_foto' => $path]);
            }
        }

        return redirect()->route('eventos')->with('success', 'Evento atualizado!');
    }

    public function destroyEvento($id)
    {
        $evento = Evento::with('fotos')->findOrFail($id);
        
        if ($evento->media_path) {
            Storage::disk('public')->delete($evento->media_path);
        }

        foreach ($evento->fotos as $foto) {
            Storage::disk('public')->delete($foto->caminho_foto);
        }
        
        $evento->delete();
        return redirect()->route('eventos')->with('success', 'Evento removido!');
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
            'titulo' => 'required|string|max:255',
            'chamativo' => 'required|string|max:150', // Novo campo
            'autor' => 'required|string|max:255',
            'conteudo' => 'required|string',
            'capa' => 'nullable|image|max:2048',      // Foto principal
            'galeria.*' => 'nullable|image|max:2048'  // Múltiplas fotos
        ]);

        $data = $request->only(['titulo', 'chamativo', 'autor', 'conteudo']);

        // 1. Capa (Salva em imagem_path)
        if ($request->hasFile('capa')) {
            $data['imagem_path'] = $request->file('capa')->store('cartas/capas', 'public');
        }

        $carta = Carta::create($data);

        // 2. Galeria
        if ($request->hasFile('galeria')) {
            foreach ($request->file('galeria') as $foto) {
                $path = $foto->store('cartas/galeria', 'public');
                $carta->fotos()->create(['caminho_foto' => $path]);
            }
        }

        return redirect()->route('cartas')->with('success', 'Carta publicada com sucesso!');
    }

    public function editCarta($id)
    {
        return Inertia::render('Admin/CriarCarta', [
            'carta' => Carta::with('fotos')->findOrFail($id),
            'isEdit' => true
        ]);
    }

    public function updateCarta(Request $request, $id)
    {
        $carta = Carta::findOrFail($id);

        $request->validate([
            'titulo' => 'required|string|max:255',
            'chamativo' => 'required|string|max:150',
            'autor' => 'required|string|max:255',
            'conteudo' => 'required|string',
            'capa' => 'nullable|image|max:2048',
            'galeria' => 'nullable|array',
            'galeria.*' => 'image|max:2048',
        ]);

        $data = $request->only(['titulo', 'chamativo', 'autor', 'conteudo']);

        // Atualizar Capa
        if ($request->hasFile('capa')) {
            if ($carta->imagem_path) {
                Storage::disk('public')->delete($carta->imagem_path);
            }
            $data['imagem_path'] = $request->file('capa')->store('cartas/capas', 'public');
        }

        $carta->update($data);

        // Adicionar novas fotos à galeria
        if ($request->hasFile('galeria')) {
            foreach ($request->file('galeria') as $foto) {
                $path = $foto->store('cartas/galeria', 'public');
                $carta->fotos()->create(['caminho_foto' => $path]);
            }
        }

        return redirect()->route('cartas')->with('success', 'Carta atualizada!');
    }

    public function destroyCarta($id)
    {
        $carta = Carta::with('fotos')->findOrFail($id);
        
        // Deleta capa
        if ($carta->imagem_path) {
            Storage::disk('public')->delete($carta->imagem_path);
        }

        // Deleta galeria
        foreach ($carta->fotos as $foto) {
            Storage::disk('public')->delete($foto->caminho_foto);
        }

        $carta->delete();

        return redirect()->route('cartas')->with('success', 'Carta removida!');
    }
    // =========================================================================
    // PROCURADORES
    // =========================================================================
    public function createProcurador()
    {
        return Inertia::render('Admin/CriarProcurador');
    }

    public function storeProcurador(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'cargo' => 'required|string|max:255',
            'imagem' => 'nullable|image|max:2048'
        ]);

        $data = $request->only(['nome', 'cargo', 'email', 'oab']);

        if ($request->hasFile('imagem')) {
            $data['foto_path'] = $request->file('imagem')->store('procuradores', 'public');
        }

        Procurador::create($data);

        return redirect()->route('procuradores')->with('success', 'Procurador adicionado com sucesso!');
    }

    public function editProcurador($id)
    {
        return Inertia::render('Admin/CriarProcurador', [
            'procurador' => Procurador::findOrFail($id),
            'isEdit' => true
        ]);
    }

    public function updateProcurador(Request $request, $id)
    {
        $procurador = Procurador::findOrFail($id);

        $request->validate([
            'nome' => 'required|string|max:255',
            'cargo' => 'required|string|max:255',
            'imagem' => 'nullable|image|max:2048'
        ]);

        $data = $request->only(['nome', 'cargo', 'email', 'oab']);

        if ($request->hasFile('imagem')) {
            if ($procurador->foto_path) {
                Storage::disk('public')->delete($procurador->foto_path);
            }
            $data['foto_path'] = $request->file('imagem')->store('procuradores', 'public');
        }

        $procurador->update($data);

        return redirect()->route('procuradores')->with('success', 'Procurador editado com sucesso!');
    }

    public function destroyProcurador($id)
    {
        $procurador = Procurador::findOrFail($id);
        
        if ($procurador->foto_path) {
            Storage::disk('public')->delete($procurador->foto_path);
        }
        
        $procurador->delete();
        return redirect()->back()->with('success', 'Procurador removido com sucesso!');
    }

    // =========================================================================
    // ASSESSORES
    // =========================================================================
    public function createAssessor()
    {
        return Inertia::render('Admin/CriarAssessor');
    }

    public function storeAssessor(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'cargo' => 'required|string|max:255',
            'imagem' => 'nullable|image|max:2048'
        ]);

        $data = $request->only(['nome', 'cargo']);

        if ($request->hasFile('imagem')) {
            $data['foto_path'] = $request->file('imagem')->store('assessores', 'public');
        }

        Assessor::create($data);

        return redirect()->route('assessores')->with('success', 'Assessor adicionado com sucesso!');
    }

    public function editAssessor($id)
    {
        return Inertia::render('Admin/CriarAssessor', [
            'assessor' => Assessor::findOrFail($id),
            'isEdit' => true
        ]);
    }

    public function updateAssessor(Request $request, $id)
    {
        $assessor = Assessor::findOrFail($id);

        $request->validate([
            'nome' => 'required|string|max:255',
            'cargo' => 'required|string|max:255',
            'imagem' => 'nullable|image|max:2048'
        ]);

        $data = $request->only(['nome', 'cargo']);

        if ($request->hasFile('imagem')) {
            if ($assessor->foto_path) {
                Storage::disk('public')->delete($assessor->foto_path);
            }
            $data['foto_path'] = $request->file('imagem')->store('assessores', 'public');
        }

        $assessor->update($data);

        return redirect()->route('assessores')->with('success', 'Assessor editado com sucesso!');
    }

    public function destroyAssessor($id)
    {
        $assessor = Assessor::findOrFail($id);
        
        if ($assessor->foto_path) {
            Storage::disk('public')->delete($assessor->foto_path);
        }
        
        $assessor->delete();
        return redirect()->back()->with('success', 'Assessor removido com sucesso!');
    }
}
