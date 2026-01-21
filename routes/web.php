<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;

// ==========================================
// ÁREA PÚBLICA (Qualquer pessoa vê)
// ==========================================

Route::get('/', [SiteController::class, 'home'])->name('home');

// Listagens (Grid de itens)
Route::get('/procuradores', [SiteController::class, 'procuradores'])->name('procuradores');
Route::get('/assessores', [SiteController::class, 'assessores'])->name('assessores');
Route::get('/eventos', [SiteController::class, 'eventos'])->name('eventos');
Route::get('/noticias', [SiteController::class, 'noticias'])->name('noticias');
Route::get('/cartas', [SiteController::class, 'cartas'])->name('cartas');

// Visualização Individual (Clicar e abrir)
Route::get('/evento/{id}', [SiteController::class, 'showEvento'])->name('evento.show');
Route::get('/noticia/{id}', [SiteController::class, 'showNoticia'])->name('noticia.show');
Route::get('/carta/{id}', [SiteController::class, 'showCarta'])->name('carta.show');

// ==========================================
// ÁREA ADMINISTRATIVA (Requer Login)
// ==========================================

Route::middleware(['auth', 'verified'])->group(function () {
    
    // Painel Principal
    Route::get('/dashboard', function () { return Inertia::render('Dashboard'); })->name('dashboard');

    // === GERENCIAR NOTÍCIAS ===
    Route::get('/admin/noticias/nova', [AdminController::class, 'createNoticia'])->name('admin.noticias.create');
    Route::post('/admin/noticias', [AdminController::class, 'storeNoticia'])->name('admin.noticias.store');
    Route::get('/admin/noticias/{id}/editar', [AdminController::class, 'editNoticia'])->name('admin.noticias.edit'); // Tela de edição
    Route::post('/admin/noticias/{id}', [AdminController::class, 'updateNoticia'])->name('admin.noticias.update');  // Salvar edição (POST para suportar arquivo)
    Route::delete('/admin/noticias/{id}', [AdminController::class, 'destroyNoticia'])->name('admin.noticias.destroy'); // Apagar

    // === GERENCIAR EVENTOS ===
    Route::get('/admin/eventos/novo', [AdminController::class, 'createEvento'])->name('admin.eventos.create');
    Route::post('/admin/eventos', [AdminController::class, 'storeEvento'])->name('admin.eventos.store');
    Route::get('/admin/eventos/{id}/editar', [AdminController::class, 'editEvento'])->name('admin.eventos.edit');
    Route::post('/admin/eventos/{id}', [AdminController::class, 'updateEvento'])->name('admin.eventos.update');
    Route::delete('/admin/eventos/{id}', [AdminController::class, 'destroyEvento'])->name('admin.eventos.destroy');

    // === GERENCIAR CARTAS ===
    Route::get('/admin/cartas/nova', [AdminController::class, 'createCarta'])->name('admin.cartas.create');
    Route::post('/admin/cartas', [AdminController::class, 'storeCarta'])->name('admin.cartas.store');
    Route::get('/admin/cartas/{id}/editar', [AdminController::class, 'editCarta'])->name('admin.cartas.edit');
    Route::post('/admin/cartas/{id}', [AdminController::class, 'updateCarta'])->name('admin.cartas.update');
    Route::delete('/admin/cartas/{id}', [AdminController::class, 'destroyCarta'])->name('admin.cartas.destroy');

    // === GERENCIAR PROCURADORES ===
    Route::get('/admin/procuradores/novo', [AdminController::class, 'createProcurador'])->name('admin.procuradores.create');
    Route::post('/admin/procuradores', [AdminController::class, 'storeProcurador'])->name('admin.procuradores.store');
    Route::delete('/admin/procuradores/{id}', [AdminController::class, 'destroyProcurador'])->name('admin.procuradores.destroy');

    // === GERENCIAR ASSESSORES ===
    Route::get('/admin/assessores/novo', [AdminController::class, 'createAssessor'])->name('admin.assessores.create');
    Route::post('/admin/assessores', [AdminController::class, 'storeAssessor'])->name('admin.assessores.store');
    Route::delete('/admin/assessores/{id}', [AdminController::class, 'destroyAssessor'])->name('admin.assessores.destroy');

    // Perfil (Padrão Breeze)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';