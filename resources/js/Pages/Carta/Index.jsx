import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';
import PageHeader from '@/Components/PageHeader';
import { FaScroll, FaSearch, FaArrowRight, FaImage } from 'react-icons/fa';

export default function Cartas({ lista }) {
    const { auth, flash } = usePage().props;
    const [busca, setBusca] = useState('');

    const listaFiltrada = lista.filter(item => 
        item.titulo.toLowerCase().includes(busca.toLowerCase()) || 
        item.chamativo?.toLowerCase().includes(busca.toLowerCase())
    );

    const formatarData = (data) => new Date(data).toLocaleDateString('pt-BR');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col font-sans relative transition-colors duration-300">
            <Head title="Cartas - PGM Serra" />
            <FlashMessage message={flash?.success} />

            <PageHeader 
                title="Palavra do Procurador"
                subtitle="Comunicados Oficiais"
                color="bg-red-700"
                breadcrumbs={[{ label: 'Cartas', href: route('cartas') }]}
                actionButton={auth.user && (
                    <Link href={route('admin.cartas.create')} className="bg-white text-red-700 hover:bg-red-50 text-sm font-bold py-2 px-6 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-2 justify-center w-full">
                        + Nova Carta
                    </Link>
                )}
            >
                <div className="relative">
                    <FaSearch className="absolute left-3 top-3.5 text-red-300 dark:text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar carta..."
                        className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-600 shadow-sm placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
            </PageHeader>

            <main className="container mx-auto px-4 py-10 flex-grow">
                {listaFiltrada.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 mt-10 py-20 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <FaScroll className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-lg">Nenhuma carta encontrada.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listaFiltrada.map((carta) => (
                            <div key={carta.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col group">
                                <Link href={route('carta.show', carta.id)} className="block h-56 bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
                                    {carta.imagem_path ? (
                                        <img src={`/storage/${carta.imagem_path}`} alt={carta.titulo} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500">
                                            <FaImage size={48} />
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 bg-red-700 text-white px-4 py-1 rounded-tr-lg text-xs font-bold uppercase">
                                        {formatarData(carta.created_at)}
                                    </div>
                                </Link>

                                <div className="p-6 flex flex-col flex-grow">
                                    <Link href={route('carta.show', carta.id)} className="group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                                        <h3 className="font-bold text-xl mb-3 line-clamp-2 text-gray-800 dark:text-white">{carta.titulo}</h3>
                                    </Link>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase mb-2">Por: {carta.autor}</p>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 flex-grow">{carta.chamativo || '...'}</p>
                                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                        <Link href={route('carta.show', carta.id)} className="text-red-700 dark:text-red-400 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                            Ler Completo <FaArrowRight size={12} />
                                        </Link>
                                    </div>
                                </div>
                                {auth.user && (
                                    <div className="bg-red-50 dark:bg-gray-900 p-3 flex justify-center gap-4 text-sm font-medium border-t border-red-100 dark:border-gray-700">
                                        <Link href={route('admin.cartas.edit', carta.id)} className="text-blue-600 dark:text-blue-400 hover:underline">Editar</Link>
                                        <span className="text-gray-300 dark:text-gray-600">|</span>
                                        <Link href={route('admin.cartas.destroy', carta.id)} method="delete" as="button" onBefore={() => confirm('Apagar?')} className="text-red-600 dark:text-red-400 hover:underline">Excluir</Link>
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