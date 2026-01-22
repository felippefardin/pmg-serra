<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\HomeIcon;
use Illuminate\Support\Facades\Storage; // Importante para deletar imagens

class HomeIconController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/HomeIcons/Index', [
            'icons' => HomeIcon::all()
        ]);
    }

    public function showPublic($id)
    {
        $icon = HomeIcon::findOrFail($id);
        
        return Inertia::render('HomeIcons/Show', [
            'icon' => $icon
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/HomeIcons/Criar');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'label' => 'required|string|max:255',
            'icone' => 'required|string|max:255',
            'cor' => 'required|string|max:255',
            'titulo' => 'required|string|max:255',
            'conteudo' => 'required|string',
            'horario' => 'nullable|string|max:255',
            'dias' => 'nullable|string|max:255',
            'telefone' => 'nullable|string|max:255',
            'whatsapp' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'endereco' => 'nullable|string|max:255',                  
            'link_externo' => 'nullable|array', 
            'link_externo.*.nome' => 'required|string|max:255', 
            'link_externo.*.url' => 'required|url',
            'imagens' => 'nullable|array',
            'imagens.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Upload de Múltiplas Imagens
        $imagePaths = [];
        if ($request->hasFile('imagens')) {
            foreach ($request->file('imagens') as $image) {
                $imagePaths[] = $image->store('home_icons', 'public');
            }
        }
        $data['imagens'] = $imagePaths;
        
        HomeIcon::create($data);
        
        return redirect()->route('home')->with('message', 'Ícone criado com sucesso!');
    }

    public function edit($id)
    {
        $icon = HomeIcon::findOrFail($id);
        return Inertia::render('Admin/HomeIcons/Editar', [
            'icon' => $icon
        ]);
    }

    public function update(Request $request, $id)
    {
        $icon = HomeIcon::findOrFail($id);
        
        $data = $request->validate([
            'label' => 'required|string|max:255',
            'icone' => 'required|string|max:255',
            'cor' => 'required|string|max:255',
            'titulo' => 'required|string|max:255',
            'conteudo' => 'required|string',
            'horario' => 'nullable|string|max:255',
            'dias' => 'nullable|string|max:255',
            'telefone' => 'nullable|string|max:255',
            'whatsapp' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'endereco' => 'nullable|string|max:255',             
            'link_externo' => 'nullable|array',
            'link_externo.*.nome' => 'required|string|max:255',
            'link_externo.*.url' => 'required|url',
            'imagens' => 'nullable|array', // Novas imagens (arquivos)
            'imagens.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'imagens_removidas' => 'nullable|array' // Paths das imagens a remover
        ]);

        // Gerenciar imagens existentes
        $currentImagens = $icon->imagens ?? [];

        // 1. Remover imagens marcadas
        if (!empty($data['imagens_removidas'])) {
            foreach ($data['imagens_removidas'] as $imageToRemove) {
                if (Storage::disk('public')->exists($imageToRemove)) {
                    Storage::disk('public')->delete($imageToRemove);
                }
                // Remove do array de caminhos
                $currentImagens = array_values(array_diff($currentImagens, [$imageToRemove]));
            }
        }

        // 2. Adicionar novas imagens
        if ($request->hasFile('imagens')) {
            foreach ($request->file('imagens') as $image) {
                $currentImagens[] = $image->store('home_icons', 'public');
            }
        }

        $data['imagens'] = $currentImagens;
        unset($data['imagens_removidas']); // Limpa campo auxiliar

        $icon->update($data);

        return redirect()->route('home')->with('message', 'Ícone atualizado com sucesso!');
    }

    public function destroy($id)
    {
        $icon = HomeIcon::findOrFail($id);
        
        // Deletar imagens do storage ao excluir o ícone
        if ($icon->imagens) {
            foreach ($icon->imagens as $image) {
                if (Storage::disk('public')->exists($image)) {
                    Storage::disk('public')->delete($image);
                }
            }
        }

        $icon->delete();

        return redirect()->route('home')->with('message', 'Ícone excluído com sucesso!');
    }
}