import React from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function CriarEvento() {
    const { data, setData, post, processing, errors } = useForm({
        titulo: '',
        descricao: '',
        data_evento: '',
        arquivo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.eventos.store'));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <Head title="Novo Evento" />
            <form onSubmit={submit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Adicionar Evento</h2>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Título</label>
                    <input 
                        type="text" 
                        value={data.titulo}
                        onChange={e => setData('titulo', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    {errors.titulo && <div className="text-red-500 text-xs">{errors.titulo}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Data do Evento</label>
                    <input 
                        type="date" 
                        value={data.data_evento}
                        onChange={e => setData('data_evento', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Descrição</label>
                    <textarea 
                        value={data.descricao}
                        onChange={e => setData('descricao', e.target.value)}
                        className="w-full border rounded p-2"
                    ></textarea>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Foto ou Vídeo</label>
                    <input 
                        type="file" 
                        onChange={e => setData('arquivo', e.target.files[0])}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                    />
                </div>

                <button disabled={processing} className="w-full bg-orange-600 text-white font-bold py-2 px-4 rounded hover:bg-orange-700">
                    Salvar Evento
                </button>
            </form>
        </div>
    );
}