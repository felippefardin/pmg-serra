import React from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function CriarCarta({ carta = null, isEdit = false }) {
    const { data, setData, post, processing, errors } = useForm({
        titulo: carta?.titulo || '',
        chamativo: carta?.chamativo || '',
        autor: carta?.autor || 'Dr. Procurador Geral',
        conteudo: carta?.conteudo || '',
        capa: null,
        galeria: [],
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            post(route('admin.cartas.update', carta.id));
        } else {
            post(route('admin.cartas.store'));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
            <Head title={isEdit ? "Editar Carta" : "Nova Carta"} />
            
            <form onSubmit={submit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-red-600 pl-3">
                    {isEdit ? 'Editar Carta' : 'Publicar Carta do Procurador'}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Título</label>
                        <input type="text" value={data.titulo} onChange={e => setData('titulo', e.target.value)}
                            className="w-full border rounded p-2 focus:ring-red-500" placeholder="Ex: Mensagem de Fim de Ano" />
                        {errors.titulo && <div className="text-red-500 text-xs">{errors.titulo}</div>}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Autor</label>
                        <input type="text" value={data.autor} onChange={e => setData('autor', e.target.value)}
                            className="w-full border rounded p-2 focus:ring-red-500" />
                        {errors.autor && <div className="text-red-500 text-xs">{errors.autor}</div>}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Chamativo (Subtítulo curto)</label>
                    <input type="text" value={data.chamativo} onChange={e => setData('chamativo', e.target.value)}
                        className="w-full border rounded p-2 bg-red-50 focus:ring-red-500" 
                        placeholder="Resumo da mensagem para a capa..." maxLength="150" />
                    {errors.chamativo && <div className="text-red-500 text-xs">{errors.chamativo}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Conteúdo da Carta</label>
                    <textarea value={data.conteudo} onChange={e => setData('conteudo', e.target.value)}
                        className="w-full border rounded p-2 h-64 focus:ring-red-500" 
                        placeholder="Escreva a mensagem aqui..." />
                    {errors.conteudo && <div className="text-red-500 text-xs">{errors.conteudo}</div>}
                </div>

                <div className="mb-4 border-t pt-4">
                    <label className="block text-gray-700 font-bold mb-2">Foto de Capa</label>
                    {isEdit && carta.imagem_path && (
                        <img src={`/storage/${carta.imagem_path}`} className="h-16 mb-2 rounded border" />
                    )}
                    <input type="file" onChange={e => setData('capa', e.target.files[0])}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100" />
                    {errors.capa && <div className="text-red-500 text-xs">{errors.capa}</div>}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Galeria de Fotos (Opcional)</label>
                    <input type="file" multiple onChange={e => setData('galeria', e.target.files)}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" />
                    <p className="text-xs text-gray-400 mt-1">Segure Ctrl para selecionar várias.</p>
                </div>

                <button disabled={processing} className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded hover:bg-red-700 transition-colors">
                    {isEdit ? 'Salvar Alterações' : 'Publicar Carta'}
                </button>
            </form>
        </div>
    );
}