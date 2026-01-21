import React from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function CriarCarta() {
    const { data, setData, post, processing, errors } = useForm({
        titulo: '',
        conteudo: '',
        autor: 'Dr. Procurador Geral',
        imagem: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.carta.store'));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
            <Head title="Escrever Carta" />
            <form onSubmit={submit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-red-600 pl-3">
                    Publicar Carta do Procurador
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Título da Mensagem</label>
                        <input 
                            type="text" 
                            value={data.titulo}
                            onChange={e => setData('titulo', e.target.value)}
                            className="w-full border rounded p-2 focus:ring-red-500 focus:border-red-500"
                            placeholder="Ex: Mensagem de Boas-vindas"
                        />
                        {errors.titulo && <div className="text-red-500 text-xs">{errors.titulo}</div>}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Autor (Assinatura)</label>
                        <input 
                            type="text" 
                            value={data.autor}
                            onChange={e => setData('autor', e.target.value)}
                            className="w-full border rounded p-2 focus:ring-red-500 focus:border-red-500"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Foto do Procurador</label>
                    <input 
                        type="file" 
                        onChange={e => setData('imagem', e.target.files[0])}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Conteúdo da Carta</label>
                    <textarea 
                        value={data.conteudo}
                        onChange={e => setData('conteudo', e.target.value)}
                        className="w-full border rounded p-2 h-64 focus:ring-red-500 focus:border-red-500"
                        placeholder="Escreva a mensagem aqui..."
                    ></textarea>
                    {errors.conteudo && <div className="text-red-500 text-xs">{errors.conteudo}</div>}
                </div>

                <button disabled={processing} className="w-full bg-red-700 text-white font-bold py-3 px-4 rounded hover:bg-red-800 transition-colors">
                    Publicar Carta
                </button>
            </form>
        </div>
    );
}