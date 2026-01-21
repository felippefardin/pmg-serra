import React from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Index({ lista }) {
    return (
        <PublicLayout title="Notícias">
            <header className="bg-indigo-700 py-10 text-center text-white">
                <h1 className="text-3xl font-bold">Notícias da PGM</h1>
            </header>
            
            <div className="container mx-auto px-4 py-8">
                {/* Verifica se a lista está vazia */}
                {lista.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        <p>Nenhuma notícia publicada ainda.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {lista.map((item) => (
                            <Link key={item.id} href={route('noticia.show', item.id)} className="block group">
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-xl transition overflow-hidden border border-gray-100 dark:border-gray-700 h-full flex flex-col">
                                    
                                    {/* Imagem */}
                                    <div className="h-48 bg-gray-200 overflow-hidden">
                                        {item.imagem_destaque ? (
                                            <img 
                                                src={`/storage/${item.imagem_destaque}`} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                                                alt={item.titulo}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                                Sem imagem
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Conteúdo */}
                                    <div className="p-4 flex flex-col flex-grow">
                                        <span className="text-xs text-indigo-500 font-bold mb-1">
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </span>
                                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-indigo-500 line-clamp-2">
                                            {item.titulo}
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
                                            {item.conteudo}
                                        </p>
                                        <span className="text-indigo-600 font-semibold text-sm mt-auto group-hover:underline">
                                            Ler notícia completa &rarr;
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}