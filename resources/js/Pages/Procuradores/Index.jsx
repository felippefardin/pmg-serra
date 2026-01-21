import React, { useState } from 'react'; // 1. Importar useState
import { Head, Link, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';
// Ícones para deixar mais profissional (instale: npm install react-icons)
// Se não quiser instalar, pode usar SVGs manuais como fez no 'Sem Foto'
import { FaEnvelope, FaIdCard, FaSearch } from 'react-icons/fa'; 

export default function Procuradores({ lista }) {
    const { auth, flash } = usePage().props;
    
    // 2. Estado para a busca
    const [busca, setBusca] = useState('');

    // 3. Filtro em tempo real
    const listaFiltrada = lista.filter(pessoa => 
        pessoa.nome.toLowerCase().includes(busca.toLowerCase()) || 
        pessoa.cargo.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
            <Head title="Procuradores - PGM Serra" />
            <FlashMessage message={flash?.success} />

            <header className="bg-blue-900 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="hover:text-blue-200 font-bold text-sm uppercase tracking-wide">
                                &larr; Início
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold">Corpo Jurídico</h1>
                                <p className="text-blue-200 text-sm">Procuradores do Município</p>
                            </div>
                        </div>
                        
                        {auth.user && (
                            <Link 
                                href={route('admin.procuradores.create')} 
                                className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
                            >
                                + Novo Procurador
                            </Link>
                        )}
                    </div>

                    {/* 4. Barra de Pesquisa */}
                    <div className="mt-6 max-w-xl mx-auto relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar por nome ou cargo..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 border-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-10 flex-grow">
                {listaFiltrada.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10 py-20 bg-white rounded-lg shadow-sm">
                        <FaIdCard className="mx-auto text-6xl text-gray-300 mb-4" />
                        <p className="text-lg">Nenhum profissional encontrado.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {listaFiltrada.map((pessoa) => (
                            <div key={pessoa.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col group">
                                {/* Foto com Overlay Gradiente */}
                                <div className="h-64 bg-gray-200 overflow-hidden relative">
                                    {pessoa.foto_path ? (
                                        <img 
                                            src={`/storage/${pessoa.foto_path}`} 
                                            alt={pessoa.nome} 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
                                            <FaIdCard size={48} />
                                            <span className="text-sm mt-2 font-medium">Sem foto</span>
                                        </div>
                                    )}
                                    {/* Overlay Escuro ao passar o mouse */}
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                                </div>
                                
                                {/* Informações */}
                                <div className="p-6 text-center flex-grow flex flex-col">
                                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-900 transition-colors">
                                        {pessoa.nome}
                                    </h3>
                                    <span className="inline-block mx-auto bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-bold mt-2 uppercase tracking-wider">
                                        {pessoa.cargo}
                                    </span>
                                    
                                    {/* Exibir OAB se existir */}
                                    {pessoa.oab && (
                                        <p className="text-gray-500 text-xs mt-3 font-mono border-t border-gray-100 pt-3">
                                            OAB: {pessoa.oab}
                                        </p>
                                    )}

                                    {/* Exibir Email se existir */}
                                    {pessoa.email && (
                                        <a href={`mailto:${pessoa.email}`} className="mt-2 flex items-center justify-center gap-2 text-gray-500 text-sm hover:text-blue-600 transition-colors truncate">
                                            <FaEnvelope size={12} />
                                            {pessoa.email}
                                        </a>
                                    )}

                                    {pessoa.bio && (
                                        <p className="text-gray-400 text-xs mt-3 line-clamp-3 italic">
                                            "{pessoa.bio}"
                                        </p>
                                    )}
                                </div>

                                {/* Ações Administrativas */}
                                {auth.user && (
                                    <div className="bg-gray-50 border-t border-gray-100 p-3 flex justify-center gap-4 text-sm font-medium">
                                        <Link 
                                            href={route('admin.procuradores.edit', pessoa.id)}
                                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                        >
                                            Editar
                                        </Link>
                                        <div className="w-px bg-gray-300 h-4 self-center"></div>
                                        <Link 
                                            href={route('admin.procuradores.destroy', pessoa.id)}
                                            method="delete"
                                            as="button"
                                            onBefore={() => confirm('Tem certeza?')}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Excluir
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Procuradoria Geral do Município da Serra.</p>
                </div>
            </footer>
        </div>
    );
}