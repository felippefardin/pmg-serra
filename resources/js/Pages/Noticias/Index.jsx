import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';
import PageHeader from '@/Components/PageHeader';
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col font-sans relative transition-colors duration-300">
            <Head title="Notícias - PGM Serra" />
            <FlashMessage message={flash?.success} />

            <PageHeader 
                title="Portal de Notícias"
                subtitle="Fique por dentro das novidades"
                color="bg-indigo-600"
                breadcrumbs={[{ label: 'Notícias', href: route('noticias') }]}
                actionButton={auth.user && (
                    <Link href={route('admin.noticias.create')} className="bg-white text-indigo-600 hover:bg-indigo-50 text-sm font-bold py-2 px-6 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-2 justify-center w-full">
                        + Nova Notícia
                    </Link>
                )}
            >
                <div className="relative">
                    <FaSearch className="absolute left-3 top-3.5 text-indigo-300 dark:text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar notícia..."
                        className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 shadow-sm placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
            </PageHeader>

            <main className="container mx-auto px-4 py-10 flex-grow">
                {listaFiltrada.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 mt-10 py-20 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <FaNewspaper className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-lg">Nenhuma notícia encontrada.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listaFiltrada.map((news) => (
                            <div key={news.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 flex flex-col group">
                                <Link href={route('noticia.show', news.id)} className="block h-56 bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
                                    {news.imagem_destaque ? (
                                        <img src={`/storage/${news.imagem_destaque}`} alt={news.titulo} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500">
                                            <FaImage size={48} />
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 bg-indigo-600 text-white px-4 py-1 rounded-tr-lg text-xs font-bold uppercase tracking-wider shadow-sm">
                                        {formatarData(news.created_at)}
                                    </div>
                                </Link>

                                <div className="p-6 flex flex-col flex-grow">
                                    <Link href={route('noticia.show', news.id)} className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-2 mb-3">{news.titulo}</h3>
                                    </Link>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 flex-grow">{news.chamativo || '...'}</p>
                                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                        <Link href={route('noticia.show', news.id)} className="text-indigo-600 dark:text-indigo-400 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                            Ler Completo <FaArrowRight size={12} />
                                        </Link>
                                    </div>
                                </div>
                                {auth.user && (
                                    <div className="bg-indigo-50 dark:bg-gray-900 p-3 flex justify-center gap-4 text-sm font-medium border-t border-indigo-100 dark:border-gray-700">
                                        <Link href={route('admin.noticias.edit', news.id)} className="text-blue-600 dark:text-blue-400 hover:underline">Editar</Link>
                                        <span className="text-gray-300 dark:text-gray-600">|</span>
                                        <Link href={route('admin.noticias.destroy', news.id)} method="delete" as="button" onBefore={() => confirm('Apagar?')} className="text-red-600 dark:text-red-400 hover:underline">Excluir</Link>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-auto text-center"><p className="text-gray-500 dark:text-gray-400 text-sm">&copy; PGM Serra.</p></footer>
        </div>
    );
}