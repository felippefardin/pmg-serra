import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { FaCalendarAlt, FaArrowLeft, FaImages } from 'react-icons/fa';

export default function Show({ evento }) {
    const formatarData = (data) => new Date(data).toLocaleDateString('pt-BR');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans transition-colors duration-300">
            <Head title={evento.titulo} />

            <header className="bg-orange-600 dark:bg-gray-900 text-white py-6 shadow-md border-b dark:border-gray-800">
                <div className="container mx-auto px-4">
                    <Link href="/eventos" className="flex items-center gap-2 hover:text-orange-200 dark:hover:text-gray-300 font-bold uppercase text-sm">
                        <FaArrowLeft /> Voltar para Eventos
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-10">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-10 transition-colors duration-300">
                    {evento.media_path && (
                        <div className="w-full h-64 md:h-96 bg-gray-200 dark:bg-gray-700 flex items-center justify-center bg-black/5 dark:bg-black/20">
                             <img src={`/storage/${evento.media_path}`} className="w-full h-full object-contain" alt="Capa" />
                        </div>
                    )}
                    
                    <div className="p-8 md:p-12">
                        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold mb-2">
                            <FaCalendarAlt /> {formatarData(evento.data_evento)}
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4">{evento.titulo}</h1>
                        
                        <p className="text-xl text-orange-800 dark:text-orange-300 font-medium mb-6 italic border-l-4 border-orange-400 dark:border-orange-600 pl-4">
                            {evento.chamativo}
                        </p>

                        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                            {evento.descricao}
                        </div>
                    </div>
                </div>

                {evento.fotos && evento.fotos.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                            <FaImages className="text-orange-600 dark:text-orange-400" /> Galeria de Fotos
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {evento.fotos.map((foto) => (
                                <div key={foto.id} className="h-48 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-transform hover:scale-105 cursor-pointer bg-gray-100 dark:bg-gray-700">
                                    <img src={`/storage/${foto.caminho_foto}`} alt="Galeria" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}