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
    // ... index, showPublic, create ...

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

        // 1. Processamento de Imagens (Padronização 800x600)
        $imagePaths = [];
        if ($request->hasFile('imagens')) {
            $manager = new ImageManager(new Driver()); // Inicializa o driver de imagem

            foreach ($request->file('imagens') as $image) {
                // Cria um nome único
                $filename = 'home_icons/' . uniqid() . '.jpg';
                
                // Lê a imagem, redimensiona (cover) para 800x600 e converte para JPG com 80% qualidade
                $img = $manager->read($image);
                $img->cover(800, 600); 
                $encoded = $img->toJpeg(80);

                // Salva no Storage
                Storage::disk('public')->put($filename, (string) $encoded);
                
                $imagePaths[] = $filename;
            }
        }
        $data['imagens'] = $imagePaths;

        // 2. Upload de Documentos (Mantém original)
        $docsToStore = [];
        if (!empty($request->documentos)) {
            foreach ($request->documentos as $index => $docItem) {
                if ($request->hasFile("documentos.{$index}.arquivo")) {
                    $file = $request->file("documentos.{$index}.arquivo");
                    $path = $file->store('home_icons_docs', 'public');
                    $nome = !empty($docItem['nome']) ? $docItem['nome'] : $file->getClientOriginalName();

                    $docsToStore[] = [
                        'nome' => $nome,
                        'url' => $path
                    ];
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
        return Inertia::render('Admin/HomeIcons/Editar', [
            'icon' => $icon
        ]);
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

        // --- Gerenciar Imagens ---
        $currentImagens = $icon->imagens ?? [];
        
        // Remover antigas
        if (!empty($data['imagens_removidas'])) {
            foreach ($data['imagens_removidas'] as $imageToRemove) {
                if (Storage::disk('public')->exists($imageToRemove)) {
                    Storage::disk('public')->delete($imageToRemove);
                }
                $currentImagens = array_values(array_diff($currentImagens, [$imageToRemove]));
            }
        }

        // Adicionar novas (Padronizadas)
        if ($request->hasFile('imagens')) {
            $manager = new ImageManager(new Driver());

            foreach ($request->file('imagens') as $image) {
                $filename = 'home_icons/' . uniqid() . '.jpg';
                
                $img = $manager->read($image);
                $img->cover(800, 600); // Força o tamanho padrão
                $encoded = $img->toJpeg(80);

                Storage::disk('public')->put($filename, (string) $encoded);
                
                $currentImagens[] = $filename;
            }
        }
        $data['imagens'] = $currentImagens;

        // --- Gerenciar Documentos (Igual ao anterior) ---
        $currentDocs = $icon->documentos ?? [];
        $currentDocs = array_map(function($doc) {
            return is_string($doc) ? ['nome' => basename($doc), 'url' => $doc] : $doc;
        }, $currentDocs);

        if (!empty($data['documentos_removidos'])) {
            $urlsToRemove = $data['documentos_removidos'];
            $currentDocs = array_filter($currentDocs, function($doc) use ($urlsToRemove) {
                if (in_array($doc['url'], $urlsToRemove)) {
                    if (Storage::disk('public')->exists($doc['url'])) {
                        Storage::disk('public')->delete($doc['url']);
                    }
                    return false; 
                }
                return true;
            });
            $currentDocs = array_values($currentDocs); 
        }

        if (!empty($request->documentos)) {
            foreach ($request->documentos as $index => $docItem) {
                if ($request->hasFile("documentos.{$index}.arquivo")) {
                    $file = $request->file("documentos.{$index}.arquivo");
                    $path = $file->store('home_icons_docs', 'public');
                    $nome = !empty($docItem['nome']) ? $docItem['nome'] : $file->getClientOriginalName();

                    $currentDocs[] = [
                        'nome' => $nome,
                        'url' => $path
                    ];
                }
            }
        }
        $data['documentos'] = $currentDocs;

        unset($data['imagens_removidas']); 
        unset($data['documentos_removidos']);

        $icon->update($data);

        return redirect()->route('home')->with('message', 'Ícone atualizado com sucesso!');
    }

    // ... destroy ...
    public function destroy($id)
    {
        $icon = HomeIcon::findOrFail($id);
        
        if ($icon->imagens) {
            foreach ($icon->imagens as $image) {
                if (Storage::disk('public')->exists($image)) Storage::disk('public')->delete($image);
            }
        }

        if ($icon->documentos) {
            foreach ($icon->documentos as $doc) {
                $url = is_array($doc) ? ($doc['url'] ?? null) : $doc;
                if ($url && Storage::disk('public')->exists($url)) {
                    Storage::disk('public')->delete($url);
                }
            }
        }

        $icon->delete();
        return redirect()->route('home')->with('message', 'Ícone excluído com sucesso!');
    }
}