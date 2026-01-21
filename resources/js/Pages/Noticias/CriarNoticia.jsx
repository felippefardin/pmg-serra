import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { FaArrowLeft, FaSave, FaImage, FaImages } from 'react-icons/fa';

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
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 font-sans transition-colors duration-300">
            <Head title={isEdit ? "Editar Notícia" : "Nova Notícia"} />
            
            <div className="w-full max-w-4xl">
                {/* Botão Voltar */}
                <div className="mb-6">
                    <Link 
                        href={route('noticias')} 
                        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold transition-colors"
                    >
                        <FaArrowLeft /> Voltar para Notícias
                    </Link>
                </div>

                <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-8 border-b border-gray-100 dark:border-gray-700 pb-4">
                        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white border-l-8 border-indigo-600 pl-4">
                            {isEdit ? 'Editar Notícia' : 'Publicar Nova Notícia'}
                        </h2>
                    </div>

                    <div className="grid gap-6">
                        {/* TÍTULO */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 uppercase text-sm tracking-wide">
                                Título da Manchete
                            </label>
                            <input 
                                type="text" 
                                value={data.titulo} 
                                onChange={e => setData('titulo', e.target.value)}
                                className="w-full border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                                placeholder="Ex: Prefeitura inaugura nova obra" 
                            />
                            {errors.titulo && <div className="text-red-500 text-sm mt-1">{errors.titulo}</div>}
                        </div>

                        {/* CHAMATIVO */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 uppercase text-sm tracking-wide">
                                Chamativo (Subtítulo para Capa)
                            </label>
                            <input 
                                type="text" 
                                value={data.chamativo} 
                                onChange={e => setData('chamativo', e.target.value)}
                                className="w-full border-gray-300 dark:border-gray-600 bg-indigo-50 dark:bg-indigo-900/20 text-gray-900 dark:text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                                placeholder="Texto curto de destaque (Max 150 caracteres)" 
                                maxLength="150" 
                            />
                            {errors.chamativo && <div className="text-red-500 text-sm mt-1">{errors.chamativo}</div>}
                        </div>

                        {/* CONTEÚDO */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 uppercase text-sm tracking-wide">
                                Conteúdo Completo
                            </label>
                            <textarea 
                                value={data.conteudo} 
                                onChange={e => setData('conteudo', e.target.value)}
                                className="w-full border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3 h-64 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                                placeholder="Escreva o texto completo da notícia aqui..." 
                            />
                            {errors.conteudo && <div className="text-red-500 text-sm mt-1">{errors.conteudo}</div>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                            {/* CAPA */}
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
                                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 flex items-center gap-2">
                                    <FaImage className="text-indigo-500" /> Foto de Capa (Principal)
                                </label>
                                {isEdit && noticia.imagem_destaque && (
                                    <div className="mb-3 relative group w-fit">
                                         <p className="text-xs text-gray-400 mb-1">Imagem atual:</p>
                                         <img src={`/storage/${noticia.imagem_destaque}`} className="h-24 w-auto rounded-lg shadow-sm" />
                                    </div>
                                )}
                                <input 
                                    type="file" 
                                    onChange={e => setData('capa', e.target.files[0])}
                                    className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 dark:file:bg-indigo-900 file:text-indigo-700 dark:file:text-indigo-300 hover:file:bg-indigo-200 dark:hover:file:bg-indigo-800 cursor-pointer" 
                                />
                                {errors.capa && <div className="text-red-500 text-sm mt-1">{errors.capa}</div>}
                            </div>

                            {/* GALERIA */}
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
                                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 flex items-center gap-2">
                                    <FaImages className="text-indigo-500" /> Galeria de Fotos (Adicionais)
                                </label>
                                <input 
                                    type="file" 
                                    multiple 
                                    onChange={e => setData('galeria', e.target.files)}
                                    className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 dark:file:bg-gray-600 file:text-gray-700 dark:file:text-gray-200 hover:file:bg-gray-300 dark:hover:file:bg-gray-500 cursor-pointer" 
                                />
                                <p className="text-xs text-gray-400 mt-2">Segure Ctrl (ou Cmd) para selecionar várias imagens de uma vez.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                        <button 
                            disabled={processing} 
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaSave size={20} />
                            {isEdit ? 'Salvar Alterações' : 'Publicar Notícia'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}