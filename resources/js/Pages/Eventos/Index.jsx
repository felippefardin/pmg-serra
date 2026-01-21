import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';
import PageHeader from '@/Components/PageHeader';
import { FaCalendarAlt, FaSearch, FaArrowRight } from 'react-icons/fa';

export default function Eventos({ lista }) {
    const { auth, flash } = usePage().props;
    const [busca, setBusca] = useState('');

    const listaFiltrada = lista.filter(evento => 
        evento.titulo.toLowerCase().includes(busca.toLowerCase()) || 
        evento.chamativo?.toLowerCase().includes(busca.toLowerCase())
    );

    const formatarData = (data) => new Date(data).toLocaleDateString('pt-BR');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col font-sans relative transition-colors duration-300">
            <Head title="Eventos - PGM Serra" />
            <FlashMessage message={flash?.success} />

            <PageHeader 
                title="Agenda de Eventos"
                subtitle="Acompanhe as atividades e programações oficiais"
                color="bg-orange-600"
                breadcrumbs={[{ label: 'Eventos', href: route('eventos') }]}
                actionButton={auth.user && (
                    <Link href={route('admin.eventos.create')} className="bg-white text-orange-600 hover:bg-orange-50 text-sm font-bold py-2 px-6 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-2 justify-center w-full">
                        + Novo Evento
                    </Link>
                )}
            >
                <div className="relative">
                    <FaSearch className="absolute left-3 top-3.5 text-orange-400 dark:text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar eventos..."
                        className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-600 shadow-sm placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
            </PageHeader>

            <main className="container mx-auto px-4 py-10 flex-grow">
                {listaFiltrada.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 mt-10 py-20 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <FaCalendarAlt className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-lg">Nenhum evento encontrado.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listaFiltrada.map((evento) => (
                            <div key={evento.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 flex flex-col group">
                                <Link href={route('evento.show', evento.id)} className="block h-56 bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
                                    {evento.media_path ? (
                                        evento.media_type === 'video' ? (
                                            <video className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity">
                                                <source src={`/storage/${evento.media_path}`} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <img src={`/storage/${evento.media_path}`} alt={evento.titulo} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        )
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
                                            <FaCalendarAlt size={48} />
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 bg-orange-600 text-white px-4 py-1 rounded-tr-lg text-xs font-bold uppercase tracking-wider shadow-sm">
                                        {formatarData(evento.data_evento)}
                                    </div>
                                </Link>

                                <div className="p-6 flex flex-col flex-grow">
                                    <Link href={route('evento.show', evento.id)} className="group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-2 mb-3">{evento.titulo}</h3>
                                    </Link>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 flex-grow">{evento.chamativo || evento.descricao}</p>
                                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                        <Link href={route('evento.show', evento.id)} className="text-orange-600 dark:text-orange-400 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                            Ver Detalhes <FaArrowRight size={12} />
                                        </Link>
                                    </div>
                                </div>
                                {auth.user && (
                                    <div className="bg-orange-50 dark:bg-gray-900 p-3 flex justify-center gap-4 text-sm font-medium border-t border-orange-100 dark:border-gray-700">
                                        <Link href={route('admin.eventos.edit', evento.id)} className="text-blue-600 dark:text-blue-400 hover:underline">Editar</Link>
                                        <span className="text-gray-300 dark:text-gray-600">|</span>
                                        <Link href={route('admin.eventos.destroy', evento.id)} method="delete" as="button" onBefore={() => confirm('Tem certeza?')} className="text-red-600 dark:text-red-400 hover:underline">Excluir</Link>
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