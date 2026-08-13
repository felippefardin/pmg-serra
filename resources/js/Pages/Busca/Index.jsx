import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Link, Head } from '@inertiajs/react';
import { FaNewspaper, FaCalendarAlt, FaScroll, FaSearch, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

export default function BuscaIndex({ termo, resultados }) {
    // Verifica se algum array tem conteúdo, incluindo agora a nova seção de ícones/informações
    const temResultados = 
        (resultados.noticias && resultados.noticias.length > 0) || 
        (resultados.eventos && resultados.eventos.length > 0) || 
        (resultados.cartas && resultados.cartas.length > 0) ||
        (resultados.icones && resultados.icones.length > 0);

    return (
        <PublicLayout>
            <Head title={`Busca: ${termo}`} />

            <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="container mx-auto px-6 max-w-7xl">
                    {/* Cabeçalho da Busca */}
                    <div className="mb-10 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                            <FaSearch className="text-blue-600" />
                            Resultados para: <span className="text-blue-600 italic">"{termo}"</span>
                        </h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Encontramos os seguintes itens relacionados à sua pesquisa.
                        </p>
                    </div>

                    {!temResultados ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-full mb-4">
                                <FaExclamationCircle className="text-4xl text-gray-400 dark:text-gray-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                Nenhum resultado encontrado
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                                Não encontramos nada com "<strong>{termo}</strong>". Tente verificar a ortografia ou usar palavras mais genéricas.
                            </p>
                            <Link href={route('home')} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium">
                                Voltar para o Início
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            
                            {/* --- SEÇÃO DE ACESSO RÁPIDO / INFORMAÇÕES GERAIS --- */}
                            {resultados.icones && resultados.icones.length > 0 && (
                                <section>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
                                        <span className="p-2 bg-blue-100 text-blue-600 rounded-lg"><FaInfoCircle /></span> 
                                        Acesso Rápido e Informações ({resultados.icones.length})
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {resultados.icones.map(item => (
                                            <Link key={item.id} href={route('icone.show', item.id)} className="group bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition duration-300">
                                                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                    {item.titulo}
                                                </h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-3">
                                                    {item.descricao}
                                                </p>
                                                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Ver Informações &rarr;</span>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* --- SEÇÃO DE NOTÍCIAS --- */}
                            {resultados.noticias.length > 0 && (
                                <section>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
                                        <span className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><FaNewspaper /></span> 
                                        Notícias ({resultados.noticias.length})
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {resultados.noticias.map(item => (
                                            <Link key={item.id} href={route('noticia.show', item.id)} className="group bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition duration-300">
                                                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                    {item.titulo}
                                                </h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-3">
                                                    {item.conteudo}
                                                </p>
                                                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">Ler Notícia &rarr;</span>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* --- SEÇÃO DE EVENTOS --- */}
                            {resultados.eventos.length > 0 && (
                                <section>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
                                        <span className="p-2 bg-orange-100 text-orange-600 rounded-lg"><FaCalendarAlt /></span>
                                        Eventos ({resultados.eventos.length})
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {resultados.eventos.map(item => (
                                            <Link key={item.id} href={route('evento.show', item.id)} className="group bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition duration-300">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors line-clamp-2">
                                                        {item.titulo}
                                                    </h4>
                                                </div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-3">
                                                    {item.descricao}
                                                </p>
                                                <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">Ver Detalhes &rarr;</span>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* --- SEÇÃO DE CARTAS --- */}
                            {resultados.cartas.length > 0 && (
                                <section>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
                                        <span className="p-2 bg-red-100 text-red-600 rounded-lg"><FaScroll /></span>
                                        Cartas ({resultados.cartas.length})
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {resultados.cartas.map(item => (
                                            <Link key={item.id} href={route('carta.show', item.id)} className="group bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition duration-300">
                                                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                                                    {item.titulo}
                                                </h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-3">
                                                    {item.conteudo}
                                                </p>
                                                <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide">Ler Carta &rarr;</span>
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
