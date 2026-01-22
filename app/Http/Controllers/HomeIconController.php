<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\HomeIcon;
use Illuminate\Support\Facades\Storage;

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
        // Validação permitindo nulos
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
            
            // Links
            'link_externo' => 'nullable|array',
            
            // Imagens
            'imagens' => 'nullable|array',
            'imagens.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:10240',

            // Documentos (Estrutura com Nome e Arquivo)
            'documentos' => 'nullable|array',
            // O arquivo vem dentro do objeto documentos[index][arquivo]
            'documentos.*.nome' => 'nullable|string|max:255',
            'documentos.*.arquivo' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,txt,zip,rar,7z|max:20480',
        ]);

        // 1. Upload de Imagens (Simples)
        $imagePaths = [];
        if ($request->hasFile('imagens')) {
            foreach ($request->file('imagens') as $image) {
                $imagePaths[] = $image->store('home_icons', 'public');
            }
        }
        $data['imagens'] = $imagePaths;

        // 2. Upload de Documentos (Com Nome Personalizado)
        $docsToStore = [];
        if (!empty($request->documentos)) {
            foreach ($request->documentos as $index => $docItem) {
                // Verifica se foi enviado um arquivo nesta posição
                if ($request->hasFile("documentos.{$index}.arquivo")) {
                    $file = $request->file("documentos.{$index}.arquivo");
                    $path = $file->store('home_icons_docs', 'public');
                    
                    // Usa o nome fornecido ou o nome original do arquivo
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
            
            // Imagens
            'imagens' => 'nullable|array', 
            'imagens.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'imagens_removidas' => 'nullable|array',

            // Documentos
            'documentos' => 'nullable|array',
            'documentos.*.nome' => 'nullable|string|max:255',
            'documentos.*.arquivo' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,txt,zip,rar,7z|max:20480',
            'documentos_removidos' => 'nullable|array', // URLs para remover
        ]);

        // --- Gerenciar Imagens ---
        $currentImagens = $icon->imagens ?? [];
        // Remover
        if (!empty($data['imagens_removidas'])) {
            foreach ($data['imagens_removidas'] as $imageToRemove) {
                if (Storage::disk('public')->exists($imageToRemove)) {
                    Storage::disk('public')->delete($imageToRemove);
                }
                $currentImagens = array_values(array_diff($currentImagens, [$imageToRemove]));
            }
        }
        // Adicionar
        if ($request->hasFile('imagens')) {
            foreach ($request->file('imagens') as $image) {
                $currentImagens[] = $image->store('home_icons', 'public');
            }
        }
        $data['imagens'] = $currentImagens;


        // --- Gerenciar Documentos ---
        $currentDocs = $icon->documentos ?? [];
        
        // Normalização (caso existam dados antigos que eram só strings)
        $currentDocs = array_map(function($doc) {
            return is_string($doc) ? ['nome' => basename($doc), 'url' => $doc] : $doc;
        }, $currentDocs);

        // 1. Remover marcados (pela URL)
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

        // 2. Adicionar novos
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

        // Limpeza de campos auxiliares
        unset($data['imagens_removidas']); 
        unset($data['documentos_removidos']);

        $icon->update($data);

        return redirect()->route('home')->with('message', 'Ícone atualizado com sucesso!');
    }

    public function destroy($id)
    {
        $icon = HomeIcon::findOrFail($id);
        
        // Deleta imagens
        if ($icon->imagens) {
            foreach ($icon->imagens as $image) {
                if (Storage::disk('public')->exists($image)) Storage::disk('public')->delete($image);
            }
        }

        // Deleta documentos
        if ($icon->documentos) {
            foreach ($icon->documentos as $doc) {
                // Suporte híbrido (string ou array)
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