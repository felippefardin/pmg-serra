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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {lista.map((item) => (
                        <Link key={item.id} href={route('noticia.show', item.id)} className="block group">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-xl transition overflow-hidden border border-gray-100 dark:border-gray-700 h-full">
                                <div className="h-48 bg-gray-200">
                                    {item.imagem_destaque && (
                                        <img src={`/storage/${item.imagem_destaque}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    )}
                                </div>
                                <div className="p-4">
                                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-indigo-500">{item.titulo}</h2>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">{item.conteudo}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}