import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Carta({ carta }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Head title="Carta do Procurador - PGM Serra" />

            <header className="bg-red-800 text-white p-4 shadow-md">
                <div className="container mx-auto flex items-center gap-4">
                    <Link href="/" className="hover:text-red-200 font-bold text-sm">&larr; Voltar</Link>
                    <h1 className="text-xl font-bold">Palavra do Procurador</h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 flex-grow">
                {!carta ? (
                    <div className="text-center text-gray-500 mt-10">
                        <p>Nenhuma carta publicada no momento.</p>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="flex flex-col md:flex-row">
                            {/* Imagem do Procurador ou Ilustrativa */}
                            {carta.imagem_path && (
                                <div className="md:w-2/5 h-64 md:h-auto bg-gray-100">
                                    <img 
                                        src={`/storage/${carta.imagem_path}`} 
                                        alt="Procurador" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            
                            {/* Texto da Carta */}
                            <div className="p-8 md:w-3/5 flex flex-col justify-center">
                                <h2 className="text-3xl font-serif text-gray-800 mb-4 border-b pb-4 border-red-100">
                                    {carta.titulo}
                                </h2>
                                <div className="prose text-gray-600 leading-relaxed whitespace-pre-line text-lg font-serif">
                                    {carta.conteudo}
                                </div>
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <p className="font-bold text-gray-800">{carta.autor}</p>
                                    <p className="text-sm text-gray-500">Procuradoria Geral do Município</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Publicado em {new Date(carta.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            
            <footer className="bg-gray-800 text-gray-400 py-6 text-center mt-auto">
                <p className="text-sm">&copy; PGM Serra.</p>
            </footer>
        </div>
    );
}