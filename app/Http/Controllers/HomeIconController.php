<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeIconController extends Controller
{
    public function index()
{
    return Inertia::render('Admin/HomeIcons/Index', [
        'icons' => HomeIcon::all()
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
    return redirect()->route('admin.home-icons.index');
}
}
