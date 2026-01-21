import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';
import { FaNewspaper, FaSearch, FaArrowRight, FaImage } from 'react-icons/fa';

export default function Noticias({ lista }) {
    const { auth, flash } = usePage().props;
    const [busca, setBusca] = useState('');

    const listaFiltrada = lista.filter(item => 
        item.titulo.toLowerCase().includes(busca.toLowerCase()) || 
        item.chamativo?.toLowerCase().includes(busca.toLowerCase())
    );

    const formatarData = (data) => new Date(data).toLocaleDateString('pt-BR');

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
            <Head title="Notícias - PGM Serra" />
            <FlashMessage message={flash?.success} />

            <header className="bg-indigo-600 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="hover:text-indigo-200 font-bold text-sm uppercase">&larr; Início</Link>
                            <h1 className="text-2xl font-bold">Portal de Notícias</h1>
                        </div>
                        {auth.user && (
                            <Link href={route('admin.noticias.create')} className="bg-white text-indigo-600 font-bold py-2 px-6 rounded-full shadow-lg hover:scale-105 transition-transform">
                                + Nova Notícia
                            </Link>
                        )}
                    </div>
                    <div className="mt-6 max-w-xl mx-auto relative">
                        <FaSearch className="absolute left-3 top-3 text-indigo-300" />
                        <input type="text" placeholder="Buscar notícia..." className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 border-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                            value={busca} onChange={(e) => setBusca(e.target.value)} />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-10 flex-grow">
                {listaFiltrada.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10"><p>Nenhuma notícia encontrada.</p></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listaFiltrada.map((news) => (
                            <div key={news.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all group">
                                <Link href={route('noticia.show', news.id)} className="block h-56 bg-gray-200 overflow-hidden relative">
                                    {news.imagem_destaque ? (
                                        <img src={`/storage/${news.imagem_destaque}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400"><FaImage size={48} /></div>
                                    )}
                                    <div className="absolute bottom-0 left-0 bg-indigo-600 text-white px-4 py-1 rounded-tr-lg text-xs font-bold uppercase">
                                        {formatarData(news.created_at)}
                                    </div>
                                </Link>

                                <div className="p-6 flex flex-col flex-grow">
                                    <Link href={route('noticia.show', news.id)} className="group-hover:text-indigo-600 font-bold text-xl mb-3 line-clamp-2">
                                        {news.titulo}
                                    </Link>
                                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">{news.chamativo || '...'}</p>
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between">
                                        <Link href={route('noticia.show', news.id)} className="text-indigo-600 font-bold text-sm flex items-center gap-1">
                                            Ler Completo <FaArrowRight size={12} />
                                        </Link>
                                    </div>
                                </div>
                                {auth.user && (
                                    <div className="bg-indigo-50 p-3 flex justify-center gap-4 text-sm font-medium border-t border-indigo-100">
                                        <Link href={route('admin.noticias.edit', news.id)} className="text-blue-600 hover:underline">Editar</Link>
                                        <span className="text-gray-300">|</span>
                                        <Link href={route('admin.noticias.destroy', news.id)} method="delete" as="button" onBefore={() => confirm('Apagar?')} className="text-red-600 hover:underline">Excluir</Link>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}