<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class UserController extends Controller
{
    public function create()
    {
        return Inertia::render('Admin/Users/Criar');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'nome_acesso' => 'required|string|max:255|unique:users',
            'email' => 'required|string|lowercase|email|max:255|unique:users',
            'matricula' => 'required|string|max:255|unique:users',
            'cpf' => 'required|string|max:14|unique:users', // CPF formatado ou não
            'password' => [
                'required',
                'confirmed',
                Rules\Password::min(8)
                    ->mixedCase() // Letra maiúscula e minúscula
                    ->numbers()   // Números
                    // ->symbols() // Descomente se quiser obrigar símbolos
            ],
        ]);

        User::create([
            'name' => $request->name,
            'nome_acesso' => $request->nome_acesso,
            'email' => $request->email,
            'matricula' => $request->matricula,
            'cpf' => $request->cpf,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('dashboard')->with('message', 'Usuário criado com sucesso!');
    }
}