import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Link, Head } from '@inertiajs/react';
import { FaNewspaper, FaCalendarAlt, FaScroll, FaSearch } from 'react-icons/fa';

export default function BuscaIndex({ termo, resultados }) {
    const temResultados = 
        resultados.noticias.length > 0 || 
        resultados.eventos.length > 0 || 
        resultados.cartas.length > 0;

    return (
        <PublicLayout>
            <Head title={`Busca: ${termo}`} />

            <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                            <FaSearch className="text-blue-600" />
                            Resultados para: <span className="text-blue-600">"{termo}"</span>
                        </h2>
                    </div>

                    {!temResultados ? (
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center">
                            <p className="text-gray-500 dark:text-gray-400 text-lg">
                                Nenhum resultado encontrado para sua pesquisa.
                            </p>
                            <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
                                Voltar para o início
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            
                            {/* Seção de Notícias */}
                            {resultados.noticias.length > 0 && (
                                <section>
                                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2 border-l-4 border-indigo-500 pl-3">
                                        <FaNewspaper /> Notícias ({resultados.noticias.length})
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {resultados.noticias.map(item => (
                                            <Link key={item.id} href={route('noticia.show', item.id)} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition block">
                                                <h4 className="font-bold text-lg text-blue-900 dark:text-blue-300 mb-2">{item.titulo}</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{item.conteudo}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Seção de Eventos */}
                            {resultados.eventos.length > 0 && (
                                <section>
                                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2 border-l-4 border-orange-500 pl-3">
                                        <FaCalendarAlt /> Eventos ({resultados.eventos.length})
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {resultados.eventos.map(item => (
                                            <Link key={item.id} href={route('evento.show', item.id)} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition block">
                                                <h4 className="font-bold text-lg text-orange-700 dark:text-orange-300 mb-2">{item.titulo}</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{item.descricao}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Seção de Cartas */}
                            {resultados.cartas.length > 0 && (
                                <section>
                                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2 border-l-4 border-red-500 pl-3">
                                        <FaScroll /> Cartas ({resultados.cartas.length})
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {resultados.cartas.map(item => (
                                            <Link key={item.id} href={route('carta.show', item.id)} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition block">
                                                <h4 className="font-bold text-lg text-red-700 dark:text-red-300 mb-2">{item.titulo}</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{item.conteudo}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}