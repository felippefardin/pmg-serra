<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\HomeIconController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AvaliacaoController; 

// ==========================================
// ÁREA PÚBLICA (Qualquer pessoa vê)
// ==========================================

// Página Inicial
Route::get('/', [SiteController::class, 'home'])->name('home');

// Rota para integração PJe
Route::get('/pje/tpu', [SiteController::class, 'buscarDadosTpu'])->middleware('throttle:30,1')->name('pje.tpu');

// Listagens
Route::get('/procuradores', [SiteController::class, 'procuradores'])->name('procuradores');
Route::get('/assessores', [SiteController::class, 'assessores'])->name('assessores');
Route::get('/eventos', [SiteController::class, 'eventos'])->name('eventos');
Route::get('/noticias', [SiteController::class, 'noticias'])->name('noticias');
Route::get('/cartas', [SiteController::class, 'cartas'])->name('cartas');
Route::get('/busca', [SiteController::class, 'search'])->name('site.search');
Route::get('/fale-conosco', [SiteController::class, 'contato'])->name('contato.index');
Route::post('/fale-conosco', [SiteController::class, 'enviarContato'])->middleware('throttle:5,1')->name('contato.send');

// Visualização Individual
Route::get('/evento/{id}', [SiteController::class, 'showEvento'])->name('evento.show');
Route::get('/noticia/{id}', [SiteController::class, 'showNoticia'])->name('noticia.show');
Route::get('/carta/{id}', [SiteController::class, 'showCarta'])->name('carta.show');

// Visualização do Ícone Dinâmico
Route::get('/informacao/{id}', [HomeIconController::class, 'showPublic'])->name('icone.show');

// Enviar Avaliação (Público)
Route::post('/avaliar', [AvaliacaoController::class, 'store'])->middleware('throttle:5,1')->name('avaliacao.store');


// ==========================================
// ÁREA ADMINISTRATIVA (Requer Login)
// ==========================================

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    
    // Painel Principal
    Route::get('/dashboard', function () { return Inertia::render('Dashboard'); })->name('dashboard');

    // === GERENCIAR USUÁRIOS ===
    Route::get('/admin/users/create', [UserController::class, 'create'])->name('admin.users.create');
    // ... restante das rotas administrativas permanecem iguais
    Route::post('/admin/users', [UserController::class, 'store'])->name('admin.users.store');
    Route::get('/admin/noticias/nova', [AdminController::class, 'createNoticia'])->name('admin.noticias.create');
    Route::post('/admin/noticias', [AdminController::class, 'storeNoticia'])->name('admin.noticias.store');
    Route::get('/admin/noticias/{id}/editar', [AdminController::class, 'editNoticia'])->name('admin.noticias.edit'); 
    Route::post('/admin/noticias/{id}', [AdminController::class, 'updateNoticia'])->name('admin.noticias.update');  
    Route::delete('/admin/noticias/{id}', [AdminController::class, 'destroyNoticia'])->name('admin.noticias.destroy');
    Route::get('/admin/eventos/novo', [AdminController::class, 'createEvento'])->name('admin.eventos.create');
    Route::post('/admin/eventos', [AdminController::class, 'storeEvento'])->name('admin.eventos.store');
    Route::get('/admin/eventos/{id}/editar', [AdminController::class, 'editEvento'])->name('admin.eventos.edit');
    Route::post('/admin/eventos/{id}', [AdminController::class, 'updateEvento'])->name('admin.eventos.update');
    Route::delete('/admin/eventos/{id}', [AdminController::class, 'destroyEvento'])->name('admin.eventos.destroy');
    Route::get('/admin/cartas/nova', [AdminController::class, 'createCarta'])->name('admin.cartas.create');
    Route::post('/admin/cartas', [AdminController::class, 'storeCarta'])->name('admin.cartas.store');
    Route::get('/admin/cartas/{id}/editar', [AdminController::class, 'editCarta'])->name('admin.cartas.edit');
    Route::post('/admin/cartas/{id}', [AdminController::class, 'updateCarta'])->name('admin.cartas.update');
    Route::delete('/admin/cartas/{id}', [AdminController::class, 'destroyCarta'])->name('admin.cartas.destroy');
    Route::get('/admin/procuradores/novo', [AdminController::class, 'createProcurador'])->name('admin.procuradores.create');
    Route::post('/admin/procuradores', [AdminController::class, 'storeProcurador'])->name('admin.procuradores.store');
    Route::get('/admin/procuradores/{id}/editar', [AdminController::class, 'editProcurador'])->name('admin.procuradores.edit');
    Route::post('/admin/procuradores/{id}', [AdminController::class, 'updateProcurador'])->name('admin.procuradores.update');
    Route::delete('/admin/procuradores/{id}', [AdminController::class, 'destroyProcurador'])->name('admin.procuradores.destroy');
    Route::get('/admin/assessores/novo', [AdminController::class, 'createAssessor'])->name('admin.assessores.create');
    Route::post('/admin/assessores', [AdminController::class, 'storeAssessor'])->name('admin.assessores.store');
    Route::get('/admin/assessores/{id}/editar', [AdminController::class, 'editAssessor'])->name('admin.assessores.edit');
    Route::post('/admin/assessores/{id}', [AdminController::class, 'updateAssessor'])->name('admin.assessores.update');
    Route::delete('/admin/assessores/{id}', [AdminController::class, 'destroyAssessor'])->name('admin.assessores.destroy');
    Route::get('/admin/avaliacoes', [AvaliacaoController::class, 'indexAdmin'])->name('admin.avaliacoes.index');
    Route::patch('/admin/avaliacoes/{id}/status', [AvaliacaoController::class, 'updateStatus'])->name('admin.avaliacoes.status');
    Route::delete('/admin/avaliacoes/{id}', [AvaliacaoController::class, 'destroy'])->name('admin.avaliacoes.destroy');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('admin/home-icons', HomeIconController::class)->names('admin.home-icons')->except(['show']);
});

require __DIR__.'/auth.php';
