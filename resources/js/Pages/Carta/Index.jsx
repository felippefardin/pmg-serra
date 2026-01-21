import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';
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
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
            <Head title="Cartas do Procurador - PGM Serra" />
            <FlashMessage message={flash?.success} />

            <header className="bg-red-700 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="hover:text-red-200 font-bold text-sm uppercase tracking-wide">&larr; Início</Link>
                            <div>
                                <h1 className="text-2xl font-bold">Palavra do Procurador</h1>
                                <p className="text-red-200 text-sm">Comunicados Oficiais</p>
                            </div>
                        </div>
                        {auth.user && (
                            <Link href={route('admin.cartas.create')} className="bg-white text-red-700 font-bold py-2 px-6 rounded-full shadow-lg hover:scale-105 transition-transform">
                                + Nova Carta
                            </Link>
                        )}
                    </div>
                    <div className="mt-6 max-w-xl mx-auto relative">
                        <FaSearch className="absolute left-3 top-3 text-red-300" />
                        <input type="text" placeholder="Buscar carta..." className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 border-none focus:ring-2 focus:ring-red-400 shadow-sm"
                            value={busca} onChange={(e) => setBusca(e.target.value)} />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-10 flex-grow">
                {listaFiltrada.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10 py-20 bg-white rounded-lg shadow-sm">
                        <FaScroll className="mx-auto text-6xl text-gray-300 mb-4" />
                        <p className="text-lg">Nenhuma carta encontrada.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listaFiltrada.map((carta) => (
                            <div key={carta.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all group">
                                <Link href={route('carta.show', carta.id)} className="block h-56 bg-gray-200 overflow-hidden relative">
                                    {carta.imagem_path ? (
                                        <img src={`/storage/${carta.imagem_path}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400"><FaImage size={48} /></div>
                                    )}
                                    <div className="absolute bottom-0 left-0 bg-red-700 text-white px-4 py-1 rounded-tr-lg text-xs font-bold uppercase">
                                        {formatarData(carta.created_at)}
                                    </div>
                                </Link>

                                <div className="p-6 flex flex-col flex-grow">
                                    <Link href={route('carta.show', carta.id)} className="group-hover:text-red-700 font-bold text-xl mb-3 line-clamp-2">
                                        {carta.titulo}
                                    </Link>
                                    <p className="text-gray-500 text-xs font-bold uppercase mb-2">Por: {carta.autor}</p>
                                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">{carta.chamativo || '...'}</p>
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between">
                                        <Link href={route('carta.show', carta.id)} className="text-red-700 font-bold text-sm flex items-center gap-1">
                                            Ler Completo <FaArrowRight size={12} />
                                        </Link>
                                    </div>
                                </div>
                                {auth.user && (
                                    <div className="bg-red-50 p-3 flex justify-center gap-4 text-sm font-medium border-t border-red-100">
                                        <Link href={route('admin.cartas.edit', carta.id)} className="text-blue-600 hover:underline">Editar</Link>
                                        <span className="text-gray-300">|</span>
                                        <Link href={route('admin.cartas.destroy', carta.id)} method="delete" as="button" onBefore={() => confirm('Apagar?')} className="text-red-600 hover:underline">Excluir</Link>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-500 text-sm">&copy; PGM Serra.</p>
                </div>
            </footer>
        </div>
    );
}