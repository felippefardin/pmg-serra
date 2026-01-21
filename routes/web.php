<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Rota Principal (Landing Page)
Route::get('/', function () {
    return Inertia::render('Home', [
        'titulo' => 'Procuradoria Geral do Município da Serra',
        'descricao' => 'Bem-vindo ao portal oficial da PGM Serra. Comprometidos com a justiça e a legalidade municipal.'
    ]);
})->name('home');

// Rotas Placeholder (Você criará essas páginas depois)
Route::get('/procuradores', function () { dd('Página em construção: Procuradores'); })->name('procuradores');
Route::get('/assessores', function () { dd('Página em construção: Assessores'); })->name('assessores');
Route::get('/eventos', function () { dd('Página em construção: Eventos'); })->name('eventos');
Route::get('/noticias', function () { dd('Página em construção: Notícias'); })->name('noticias');

require __DIR__.'/auth.php'; // Mantém as rotas de login que vieram com o Breeze