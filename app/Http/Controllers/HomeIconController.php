<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\HomeIcon;

class HomeIconController extends Controller
{
    // 1. LISTAGEM NO ADMIN (Corrigido para não redirecionar mais)
    public function index()
    {
        return Inertia::render('Admin/HomeIcons/Index', [
            'icons' => HomeIcon::all()
        ]);
    }

    // 2. VISUALIZAÇÃO PÚBLICA (Página com Título e Texto)
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
        HomeIcon::create($request->validate([
            'label' => 'required',
            'icone' => 'required',
            'link' => 'required',
            'cor' => 'required'
        ]));
        
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
        $icon->update($request->validate([
            'label' => 'required',
            'icone' => 'required',
            'link' => 'required',
            'cor' => 'required'
        ]));

        return redirect()->route('home')->with('message', 'Ícone atualizado com sucesso!');
    }

    public function destroy($id)
    {
        $icon = HomeIcon::findOrFail($id);
        $icon->delete();

        return redirect()->route('home')->with('message', 'Ícone excluído com sucesso!');
    }
}