import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Procuradores({ lista }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Head title="Procuradores - PGM Serra" />

            {/* Header Simples (Botão Voltar) */}
            <header className="bg-blue-900 text-white p-4 shadow-md">
                <div className="container mx-auto flex items-center gap-4">
                    <Link href="/" className="hover:text-blue-200 font-bold text-sm">
                        &larr; Voltar para o Início
                    </Link>
                    <h1 className="text-xl font-bold">Quadro de Procuradores</h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-10 flex-grow">
                {lista.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">
                        <p>Nenhum procurador cadastrado ainda.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {lista.map((pessoa) => (
                            <div key={pessoa.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                                {/* Foto */}
                                <div className="h-64 bg-gray-200 overflow-hidden relative group">
                                    {pessoa.foto_path ? (
                                        <img 
                                            src={`/storage/${pessoa.foto_path}`} 
                                            alt={pessoa.nome} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        // Foto Genérica se não tiver imagem
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-300 text-gray-500">
                                            <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                            <span className="text-sm mt-2">Sem foto</span>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Informações */}
                                <div className="p-6 text-center">
                                    <h3 className="text-lg font-bold text-gray-800">{pessoa.nome}</h3>
                                    <p className="text-blue-600 font-medium text-sm mt-1">{pessoa.cargo}</p>
                                    
                                    {pessoa.bio && (
                                        <p className="text-gray-500 text-xs mt-3 line-clamp-3">
                                            {pessoa.bio}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <footer className="bg-gray-800 text-gray-400 py-6 text-center mt-auto">
                <p className="text-sm">&copy; PGM Serra.</p>
            </footer>
        </div>
    );
}