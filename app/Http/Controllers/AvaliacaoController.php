<?php

namespace App\Http\Controllers;

use App\Models\Avaliacao;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AvaliacaoController extends Controller
{
    // Salvar nova avaliação (Público)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'estrelas' => 'required|integer|min:1|max:5',
            'comentario' => 'required|string|max:500',
            'nome' => 'nullable|string|max:100',
            'anonimo' => 'boolean'
        ]);

        // Se for anônimo, forçamos o nome a ser "Anônimo"
        if ($request->anonimo) {
            $validated['nome'] = 'Anônimo';
        }

        $validated['aprovado'] = false; // Começa pendente de aprovação

        Avaliacao::create($validated);

        return back()->with('success', 'Avaliação enviada! Aguarde a aprovação da moderação.');
    }

    // Painel Admin - Listar
    public function indexAdmin()
    {
        $avaliacoes = Avaliacao::orderBy('created_at', 'desc')->get();
        
        // Certifique-se de criar o arquivo: resources/js/Pages/Admin/Avaliacoes/Index.jsx
        return Inertia::render('Admin/Avaliacoes/Index', [ 
            'avaliacoes' => $avaliacoes
        ]);
    }
    
    // Painel Admin - Aprovar/Reprovar
    public function updateStatus(Request $request, $id)
    {
        $avaliacao = Avaliacao::findOrFail($id);
        $avaliacao->aprovado = $request->aprovado; // true ou false
        $avaliacao->save();

        return back()->with('success', 'Status atualizado com sucesso.');
    }

    // Painel Admin - Deletar
    public function destroy($id)
    {
        Avaliacao::findOrFail($id)->delete();
        return back()->with('success', 'Avaliação removida.');
    }
}