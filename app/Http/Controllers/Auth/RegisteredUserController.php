<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Exibe a tela de registro.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Processa o cadastro do novo usuário.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'nome_acesso' => 'required|string|max:255|unique:users', // Novo Campo
            'email' => 'required|string|lowercase|email|max:255|unique:users',
            'matricula' => 'required|string|max:255|unique:users',    // Novo Campo
            'cpf' => 'required|string|max:14|unique:users',            // Novo Campo
            'password' => [
                'required', 
                'confirmed', 
                Rules\Password::defaults() // Usa as regras padrão (8 chars, etc) ou defina ::min(8)->mixedCase()->numbers() aqui
            ],
        ]);

        $user = User::create([
            'name' => $request->name,
            'nome_acesso' => $request->nome_acesso,
            'email' => $request->email,
            'matricula' => $request->matricula,
            'cpf' => $request->cpf,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}