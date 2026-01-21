import React from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function CriarNoticia({ noticia = null, isEdit = false }) {
    const { data, setData, post, processing, errors } = useForm({
        titulo: noticia?.titulo || '',
        chamativo: noticia?.chamativo || '', // Novo campo
        conteudo: noticia?.conteudo || '',
        capa: null,   // Input de arquivo único
        galeria: [],  // Input de múltiplos arquivos
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            post(route('admin.noticias.update', noticia.id));
        } else {
            post(route('admin.noticias.store'));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
            <Head title={isEdit ? "Editar Notícia" : "Nova Notícia"} />
            
            <form onSubmit={submit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-indigo-600 pl-3">
                    {isEdit ? 'Editar Notícia' : 'Publicar Nova Notícia'}
                </h2>

                {/* TÍTULO */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Título da Manchete</label>
                    <input 
                        type="text" 
                        value={data.titulo} 
                        onChange={e => setData('titulo', e.target.value)}
                        className="w-full border rounded p-2 focus:ring-indigo-500" 
                        placeholder="Ex: Prefeitura inaugura nova obra" 
                    />
                    {errors.titulo && <div className="text-red-500 text-xs">{errors.titulo}</div>}
                </div>

                {/* CHAMATIVO */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Chamativo (Subtítulo curto para a capa)</label>
                    <input 
                        type="text" 
                        value={data.chamativo} 
                        onChange={e => setData('chamativo', e.target.value)}
                        className="w-full border rounded p-2 bg-indigo-50 focus:ring-indigo-500" 
                        placeholder="Ex: Obra beneficiará 10 mil famílias..." 
                        maxLength="150" 
                    />
                    {errors.chamativo && <div className="text-red-500 text-xs">{errors.chamativo}</div>}
                </div>

                {/* CONTEÚDO */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Conteúdo da Notícia</label>
                    <textarea 
                        value={data.conteudo} 
                        onChange={e => setData('conteudo', e.target.value)}
                        className="w-full border rounded p-2 h-64 focus:ring-indigo-500" 
                        placeholder="Escreva o texto completo da notícia..." 
                    />
                    {errors.conteudo && <div className="text-red-500 text-xs">{errors.conteudo}</div>}
                </div>

                {/* CAPA (Principal) */}
                <div className="mb-4 border-t pt-4">
                    <label className="block text-gray-700 font-bold mb-2">Foto de Capa (Principal)</label>
                    {isEdit && noticia.imagem_destaque && (
                        <div className="mb-2">
                             <p className="text-xs text-gray-500">Imagem atual:</p>
                             <img src={`/storage/${noticia.imagem_destaque}`} className="h-20 w-auto rounded border" />
                        </div>
                    )}
                    <input 
                        type="file" 
                        onChange={e => setData('capa', e.target.files[0])}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" 
                    />
                    {errors.capa && <div className="text-red-500 text-xs">{errors.capa}</div>}
                </div>

                {/* GALERIA */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Galeria de Fotos (Adicionais)</label>
                    <input 
                        type="file" 
                        multiple 
                        onChange={e => setData('galeria', e.target.files)}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" 
                    />
                    <p className="text-xs text-gray-400 mt-1">Segure Ctrl (ou Cmd) para selecionar várias imagens.</p>
                </div>

                <button disabled={processing} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded hover:bg-indigo-700 transition-colors">
                    {isEdit ? 'Salvar Alterações' : 'Publicar Notícia'}
                </button>
            </form>
        </div>
    );
}