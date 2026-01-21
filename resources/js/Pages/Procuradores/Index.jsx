import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';
import PageHeader from '@/Components/PageHeader';
import { FaIdCard, FaSearch, FaEnvelope } from 'react-icons/fa';

export default function Procuradores({ lista }) {
    const { auth, flash } = usePage().props;
    const [busca, setBusca] = useState('');

    const listaFiltrada = lista.filter(pessoa => 
        pessoa.nome.toLowerCase().includes(busca.toLowerCase()) || 
        pessoa.cargo.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col font-sans relative transition-colors duration-300">
            <Head title="Procuradores - PGM Serra" />
            <FlashMessage message={flash?.success} />

            <PageHeader 
                title="Corpo Jurídico"
                subtitle="Procuradores do Município"
                color="bg-blue-900"
                breadcrumbs={[{ label: 'Procuradores', href: route('procuradores') }]}
                actionButton={auth.user && (
                    <Link href={route('admin.procuradores.create')} className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 px-6 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-2 justify-center">
                        + Novo Procurador
                    </Link>
                )}
            >
                <div className="relative">
                    <FaSearch className="absolute left-3 top-3.5 text-blue-300 dark:text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou cargo..."
                        className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 shadow-sm placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
            </PageHeader>

            <main className="container mx-auto px-4 py-10 flex-grow">
                {listaFiltrada.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 mt-10 py-20 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <FaIdCard className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-lg">Nenhum profissional encontrado.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {listaFiltrada.map((pessoa) => (
                            <div key={pessoa.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 flex flex-col group">
                                <div className="h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
                                    {pessoa.foto_path ? (
                                        <img src={`/storage/${pessoa.foto_path}`} alt={pessoa.nome} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500">
                                            <FaIdCard size={48} />
                                            <span className="text-sm mt-2 font-medium">Sem foto</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 text-center flex-grow flex flex-col">
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors">{pessoa.nome}</h3>
                                    <span className="inline-block mx-auto bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-3 py-1 rounded-full font-bold mt-2 uppercase tracking-wider">{pessoa.cargo}</span>
                                    {pessoa.oab && <p className="text-gray-500 dark:text-gray-400 text-xs mt-3 font-mono border-t border-gray-100 dark:border-gray-700 pt-3">OAB: {pessoa.oab}</p>}
                                    {pessoa.email && (
                                        <a href={`mailto:${pessoa.email}`} className="mt-2 flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate">
                                            <FaEnvelope size={12} /> {pessoa.email}
                                        </a>
                                    )}
                                </div>
                                {auth.user && (
                                    <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 p-3 flex justify-center gap-4 text-sm font-medium">
                                        <Link href={route('admin.procuradores.edit', pessoa.id)} className="text-blue-600 dark:text-blue-400 hover:underline">Editar</Link>
                                        <span className="text-gray-300 dark:text-gray-600">|</span>
                                        <Link href={route('admin.procuradores.destroy', pessoa.id)} method="delete" as="button" onBefore={() => confirm('Tem certeza?')} className="text-red-600 dark:text-red-400 hover:underline">Excluir</Link>
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