import React from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function CriarEvento({ evento = null, isEdit = false }) {
    const { data, setData, post, processing, errors } = useForm({
        titulo: evento?.titulo || '',
        chamativo: evento?.chamativo || '', // Novo campo
        descricao: evento?.descricao || '',
        data_evento: evento?.data_evento ? evento.data_evento.split('T')[0] : '',
        capa: null,   // Foto Principal
        galeria: [],  // Array para várias fotos
    });

    const submit = (e) => {
        e.preventDefault();
        // Em upload de arquivos, use POST mesmo para update (Laravel method spoofing não é necessário aqui se usar o post do Inertia corretamente com FormData, mas para update geralmente forçamos POST com _method put se fosse axios puro. O Inertia lida bem, mas se der erro no update com arquivos, use router.post com _method: 'put')
        if (isEdit) {
            post(route('admin.eventos.update', evento.id));
        } else {
            post(route('admin.eventos.store'));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
            <Head title={isEdit ? "Editar Evento" : "Novo Evento"} />
            
            <form onSubmit={submit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-orange-600 pl-3">
                    {isEdit ? 'Editar Evento' : 'Novo Evento na Agenda'}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Título do Evento</label>
                        <input type="text" value={data.titulo} onChange={e => setData('titulo', e.target.value)}
                            className="w-full border rounded p-2" placeholder="Ex: Inauguração da Praça" />
                        {errors.titulo && <div className="text-red-500 text-xs">{errors.titulo}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Data</label>
                        <input type="datetime-local" value={data.data_evento} onChange={e => setData('data_evento', e.target.value)}
                            className="w-full border rounded p-2" />
                        {errors.data_evento && <div className="text-red-500 text-xs">{errors.data_evento}</div>}
                    </div>
                </div>

                {/* CAMPO CHAMATIVO */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Chamativo (Texto Curto para a Capa)</label>
                    <input type="text" value={data.chamativo} onChange={e => setData('chamativo', e.target.value)}
                        className="w-full border rounded p-2 bg-orange-50" 
                        placeholder="Ex: Venha participar deste momento histórico!" maxLength="150" />
                    {errors.chamativo && <div className="text-red-500 text-xs">{errors.chamativo}</div>}
                </div>

                {/* DESCRIÇÃO COMPLETA */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Descrição Completa</label>
                    <textarea value={data.descricao} onChange={e => setData('descricao', e.target.value)}
                        className="w-full border rounded p-2 h-32" 
                        placeholder="Detalhes completos do evento..." />
                    {errors.descricao && <div className="text-red-500 text-xs">{errors.descricao}</div>}
                </div>

                {/* FOTO DE CAPA */}
                <div className="mb-4 border-t pt-4">
                    <label className="block text-gray-700 font-bold mb-2">Foto de Capa (Principal)</label>
                    <input type="file" onChange={e => setData('capa', e.target.files[0])}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
                    {errors.capa && <div className="text-red-500 text-xs">{errors.capa}</div>}
                </div>

                {/* GALERIA DE FOTOS */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Galeria de Fotos (Selecione várias)</label>
                    <input type="file" multiple onChange={e => setData('galeria', e.target.files)}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    <p className="text-xs text-gray-400 mt-1">Segure Ctrl para selecionar várias imagens.</p>
                </div>

                <button disabled={processing} className="w-full bg-orange-600 text-white font-bold py-3 px-4 rounded hover:bg-orange-700 transition-colors">
                    {isEdit ? 'Salvar Alterações' : 'Publicar Evento'}
                </button>
            </form>
        </div>
    );
}