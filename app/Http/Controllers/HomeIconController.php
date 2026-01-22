<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\HomeIcon;

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
        // Validação atualizada para aceitar Array de Links
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
        ]);
        
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
        ]);

        $icon->update($data);

        return redirect()->route('home')->with('message', 'Ícone atualizado com sucesso!');
    }

    public function destroy($id)
    {
        $icon = HomeIcon::findOrFail($id);
        $icon->delete();

        return redirect()->route('home')->with('message', 'Ícone excluído com sucesso!');
    }
}