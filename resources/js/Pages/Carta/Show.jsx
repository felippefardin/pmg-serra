import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { FaCalendarAlt, FaArrowLeft, FaImages, FaUserTie } from 'react-icons/fa';

export default function Show({ carta }) {
    const formatarData = (data) => new Date(data).toLocaleDateString('pt-BR');

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Head title={carta.titulo} />

            <header className="bg-red-700 text-white py-6 shadow-md">
                <div className="container mx-auto px-4">
                    <Link href="/cartas" className="flex items-center gap-2 hover:text-red-200 font-bold uppercase text-sm">
                        <FaArrowLeft /> Voltar para Cartas
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-10">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10">
                    {carta.imagem_path && (
                        <div className="w-full h-64 md:h-96 bg-gray-200">
                             <img src={`/storage/${carta.imagem_path}`} className="w-full h-full object-cover" />
                        </div>
                    )}
                    
                    <div className="p-8 md:p-12">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="flex items-center gap-2 text-red-700 font-bold bg-red-50 px-4 py-1 rounded-full">
                                <FaCalendarAlt /> {formatarData(carta.created_at)}
                            </span>
                            <span className="flex items-center gap-2 text-gray-600 font-bold bg-gray-100 px-4 py-1 rounded-full">
                                <FaUserTie /> {carta.autor}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">{carta.titulo}</h1>
                        
                        <p className="text-xl text-red-900 font-medium mb-8 italic border-l-4 border-red-400 pl-4 leading-relaxed">
                            {carta.chamativo}
                        </p>

                        <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line leading-loose">
                            {carta.conteudo}
                        </div>
                    </div>
                </div>

                {carta.fotos && carta.fotos.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2">
                            <FaImages className="text-red-700" /> Galeria de Imagens
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {carta.fotos.map((foto) => (
                                <div key={foto.id} className="h-48 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform">
                                    <img src={`/storage/${foto.caminho_foto}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}