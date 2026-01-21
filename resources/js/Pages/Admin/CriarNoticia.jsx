import React from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function CriarNoticia({ noticia = null, isEdit = false }) {
    const { data, setData, post, processing, errors } = useForm({
        titulo: noticia?.titulo || '',
        chamativo: noticia?.chamativo || '',
        conteudo: noticia?.conteudo || '',
        capa: null,
        galeria: [],
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

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Título da Manchete</label>
                    <input type="text" value={data.titulo} onChange={e => setData('titulo', e.target.value)}
                        className="w-full border rounded p-2 focus:ring-indigo-500" placeholder="Título principal" />
                    {errors.titulo && <div className="text-red-500 text-xs">{errors.titulo}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Chamativo (Subtítulo para Capa)</label>
                    <input type="text" value={data.chamativo} onChange={e => setData('chamativo', e.target.value)}
                        className="w-full border rounded p-2 bg-indigo-50" placeholder="Texto curto de destaque" maxLength="150" />
                    {errors.chamativo && <div className="text-red-500 text-xs">{errors.chamativo}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Conteúdo Completo</label>
                    <textarea value={data.conteudo} onChange={e => setData('conteudo', e.target.value)}
                        className="w-full border rounded p-2 h-64" placeholder="Texto da notícia..." />
                    {errors.conteudo && <div className="text-red-500 text-xs">{errors.conteudo}</div>}
                </div>

                <div className="mb-4 border-t pt-4">
                    <label className="block text-gray-700 font-bold mb-2">Foto de Capa</label>
                    {isEdit && noticia.imagem_destaque && (
                        <img src={`/storage/${noticia.imagem_destaque}`} className="h-16 mb-2 rounded" />
                    )}
                    <input type="file" onChange={e => setData('capa', e.target.files[0])}
                        className="block w-full text-sm text-gray-500" />
                    {errors.capa && <div className="text-red-500 text-xs">{errors.capa}</div>}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Galeria (Múltiplas Fotos)</label>
                    <input type="file" multiple onChange={e => setData('galeria', e.target.files)}
                        className="block w-full text-sm text-gray-500" />
                    <p className="text-xs text-gray-400 mt-1">Segure Ctrl para selecionar várias.</p>
                </div>

                <button disabled={processing} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded hover:bg-indigo-700 transition-colors">
                    {isEdit ? 'Salvar Alterações' : 'Publicar'}
                </button>
            </form>
        </div>
    );
}