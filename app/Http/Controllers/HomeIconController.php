<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\HomeIcon;
use Illuminate\Support\Facades\Storage;
// Importações do Intervention Image
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class HomeIconController extends Controller
{
    /**
     * Lista todos os ícones (Área Administrativa).
     */
    public function index()
    {
        return Inertia::render('Admin/HomeIcons/Index', [
            'icons' => HomeIcon::all()
        ]);
    }

    /**
     * Exibe a página pública de detalhes de um ícone/informação.
     * Este método corrige o erro de página em branco.
     */
    public function showPublic($id)
    {
        // Busca o registro ou retorna 404
        $icon = HomeIcon::findOrFail($id);

        // Renderiza a página frontend correspondente
        return Inertia::render('Admin/HomeIcons/Show', [
            'icon' => $icon
        ]);
    }

    /**
     * Formulário de criação.
     */
    public function create()
    {
        return Inertia::render('Admin/HomeIcons/Criar');
    }

    /**
     * Salva um novo ícone.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'label' => 'nullable|string|max:255',
            'icone' => 'nullable|string|max:255',
            'cor'   => 'nullable|string|max:255',
            'titulo'=> 'nullable|string|max:255',
            'conteudo' => 'nullable|string',
            'horario'  => 'nullable|string|max:255',
            'dias'     => 'nullable|string|max:255',
            'telefone' => 'nullable|string|max:255',
            'whatsapp' => 'nullable|string|max:255',
            'email'    => 'nullable|email|max:255',
            'endereco' => 'nullable|string|max:255',
            'link_externo' => 'nullable|array',
            'imagens' => 'nullable|array',
            'imagens.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'documentos' => 'nullable|array',
            'documentos.*.nome' => 'nullable|string|max:255',
            'documentos.*.arquivo' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,txt,zip,rar,7z|max:20480',
        ]);

        // 1. Processamento de Imagens (800x600)
        $imagePaths = [];
        if ($request->hasFile('imagens')) {
            $manager = new ImageManager(new Driver());
            foreach ($request->file('imagens') as $image) {
                $filename = 'home_icons/' . uniqid() . '.jpg';
                $img = $manager->read($image);
                $img->cover(800, 600); 
                $encoded = $img->toJpeg(80);
                Storage::disk('public')->put($filename, (string) $encoded);
                $imagePaths[] = $filename;
            }
        }
        $data['imagens'] = $imagePaths;

        // 2. Upload de Documentos
        $docsToStore = [];
        if (!empty($request->documentos)) {
            foreach ($request->documentos as $index => $docItem) {
                if ($request->hasFile("documentos.{$index}.arquivo")) {
                    $file = $request->file("documentos.{$index}.arquivo");
                    $path = $file->store('home_icons_docs', 'public');
                    $nome = !empty($docItem['nome']) ? $docItem['nome'] : $file->getClientOriginalName();
                    $docsToStore[] = ['nome' => $nome, 'url' => $path];
                }
            }
        }
        $data['documentos'] = $docsToStore;
        
        HomeIcon::create($data);
        return redirect()->route('home')->with('message', 'Ícone criado com sucesso!');
    }

    public function edit($id)
    {
        $icon = HomeIcon::findOrFail($id);
        return Inertia::render('Admin/HomeIcons/Editar', ['icon' => $icon]);
    }

    public function update(Request $request, $id)
    {
        $icon = HomeIcon::findOrFail($id);
        
        $data = $request->validate([
            'label' => 'nullable|string|max:255',
            'icone' => 'nullable|string|max:255',
            'cor'   => 'nullable|string|max:255',
            'titulo'=> 'nullable|string|max:255',
            'conteudo' => 'nullable|string',
            'horario'  => 'nullable|string|max:255',
            'dias'     => 'nullable|string|max:255',
            'telefone' => 'nullable|string|max:255',
            'whatsapp' => 'nullable|string|max:255',
            'email'    => 'nullable|email|max:255',
            'endereco' => 'nullable|string|max:255',             
            'link_externo' => 'nullable|array',
            'imagens' => 'nullable|array', 
            'imagens.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'imagens_removidas' => 'nullable|array',
            'documentos' => 'nullable|array',
            'documentos.*.nome' => 'nullable|string|max:255',
            'documentos.*.arquivo' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,txt,zip,rar,7z|max:20480',
            'documentos_removidos' => 'nullable|array',
        ]);

        // Gerenciar Imagens
        $currentImagens = $icon->imagens ?? [];
        if (!empty($data['imagens_removidas'])) {
            foreach ($data['imagens_removidas'] as $imageToRemove) {
                Storage::disk('public')->delete($imageToRemove);
                $currentImagens = array_values(array_diff($currentImagens, [$imageToRemove]));
            }
        }

        if ($request->hasFile('imagens')) {
            $manager = new ImageManager(new Driver());
            foreach ($request->file('imagens') as $image) {
                $filename = 'home_icons/' . uniqid() . '.jpg';
                $img = $manager->read($image);
                $img->cover(800, 600);
                Storage::disk('public')->put($filename, (string) $img->toJpeg(80));
                $currentImagens[] = $filename;
            }
        }
        $data['imagens'] = $currentImagens;

        // Gerenciar Documentos
        $currentDocs = $icon->documentos ?? [];
        if (!empty($data['documentos_removidos'])) {
            foreach ($data['documentos_removidos'] as $urlToRemove) {
                Storage::disk('public')->delete($urlToRemove);
                $currentDocs = array_filter($currentDocs, fn($doc) => $doc['url'] !== $urlToRemove);
            }
            $currentDocs = array_values($currentDocs);
        }

        if (!empty($request->documentos)) {
            foreach ($request->documentos as $index => $docItem) {
                if ($request->hasFile("documentos.{$index}.arquivo")) {
                    $file = $request->file("documentos.{$index}.arquivo");
                    $currentDocs[] = [
                        'nome' => $docItem['nome'] ?? $file->getClientOriginalName(),
                        'url' => $file->store('home_icons_docs', 'public')
                    ];
                }
            }
        }
        $data['documentos'] = $currentDocs;

        unset($data['imagens_removidas'], $data['documentos_removidos']);
        $icon->update($data);

        return redirect()->route('home')->with('message', 'Ícone atualizado com sucesso!');
    }

    public function destroy($id)
    {
        $icon = HomeIcon::findOrFail($id);
        // Limpeza de arquivos do storage omitida por brevidade, mas mantida no seu código original
        $icon->delete();
        return redirect()->route('home')->with('message', 'Ícone excluído com sucesso!');
    }
}