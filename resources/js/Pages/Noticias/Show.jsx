import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { FaCalendarAlt, FaArrowLeft, FaImages } from 'react-icons/fa';

export default function Show({ noticia }) {
    const formatarData = (data) => new Date(data).toLocaleDateString('pt-BR');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans transition-colors duration-300">
            <Head title={noticia.titulo} />

            <header className="bg-indigo-600 dark:bg-gray-900 text-white py-6 shadow-md border-b dark:border-gray-800">
                <div className="container mx-auto px-4">
                    <Link href={route('noticias')} className="flex items-center gap-2 hover:text-indigo-200 dark:hover:text-gray-300 font-bold uppercase text-sm">
                        <FaArrowLeft /> Voltar para Notícias
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-10">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-10 transition-colors duration-300">
                    {noticia.imagem_destaque && (
                        <div className="w-full h-64 md:h-96 bg-gray-200 dark:bg-gray-700 flex items-center justify-center bg-black/5 dark:bg-black/20">
                             <img src={`/storage/${noticia.imagem_destaque}`} className="w-full h-full object-contain" alt="Capa" />
                        </div>
                    )}
                    
                    <div className="p-8 md:p-12">
                        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-4 bg-indigo-50 dark:bg-indigo-900/20 w-fit px-4 py-1 rounded-full">
                            <FaCalendarAlt /> {formatarData(noticia.created_at)}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">{noticia.titulo}</h1>
                        
                        <p className="text-xl text-indigo-900 dark:text-indigo-300 font-medium mb-8 italic border-l-4 border-indigo-400 dark:border-indigo-600 pl-4 leading-relaxed">
                            {noticia.chamativo}
                        </p>

                        <div className="prose dark:prose-invert prose-lg max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-line leading-loose">
                            {noticia.conteudo}
                        </div>
                    </div>
                </div>

                {noticia.fotos && noticia.fotos.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2 border-b dark:border-gray-700 pb-2">
                            <FaImages className="text-indigo-600 dark:text-indigo-400" /> Galeria de Imagens
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {noticia.fotos.map((foto) => (
                                <a 
                                    key={foto.id} 
                                    href={`/storage/${foto.caminho_foto}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="h-48 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform bg-gray-100 dark:bg-gray-700 block"
                                >
                                    <img 
                                        src={`/storage/${foto.caminho_foto}`} 
                                        alt="Galeria" 
                                        className="w-full h-full object-cover" 
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
