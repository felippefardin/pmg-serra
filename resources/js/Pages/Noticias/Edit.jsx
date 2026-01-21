import React from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function Edit({ noticia }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT', // Truque para o Laravel aceitar arquivo em Update
        titulo: noticia.titulo,
        conteudo: noticia.conteudo,
        imagem: null,
    });

    const submit = (e) => {
        e.preventDefault();
        // Post para a rota update com _method PUT
        post(route('admin.noticias.update', noticia.id));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <Head title="Editar Notícia" />
            <form onSubmit={submit} className="bg-white p-8 rounded shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">Editar Notícia</h2>
                
                <div className="mb-4">
                    <label className="block mb-1 font-bold">Título</label>
                    <input type="text" value={data.titulo} onChange={e => setData('titulo', e.target.value)} className="w-full border p-2 rounded" />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-bold">Nova Imagem (Opcional)</label>
                    <input type="file" onChange={e => setData('imagem', e.target.files[0])} className="w-full" />
                </div>

                <div className="mb-6">
                    <label className="block mb-1 font-bold">Conteúdo</label>
                    <textarea value={data.conteudo} onChange={e => setData('conteudo', e.target.value)} className="w-full border p-2 rounded h-32"></textarea>
                </div>

                <button disabled={processing} className="w-full bg-blue-600 text-white font-bold py-2 rounded">Salvar Alterações</button>
            </form>
        </div>
    );
}