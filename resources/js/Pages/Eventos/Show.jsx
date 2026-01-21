import React, { useState } from 'react'; // Import useState para modal de imagem (opcional)
import { Head, Link } from '@inertiajs/react';
import { FaCalendarAlt, FaArrowLeft, FaImages } from 'react-icons/fa';

export default function Show({ evento }) {
    const formatarData = (data) => new Date(data).toLocaleDateString('pt-BR');

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Head title={evento.titulo} />

            {/* Header */}
            <header className="bg-orange-600 text-white py-6 shadow-md">
                <div className="container mx-auto px-4">
                    <Link href="/eventos" className="flex items-center gap-2 hover:text-orange-200 font-bold uppercase text-sm">
                        <FaArrowLeft /> Voltar
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-10">
                {/* Cartão Principal */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10">
                    {/* Capa Grande */}
                    {evento.media_path && (
                        <div className="w-full h-64 md:h-96 bg-gray-200">
                             <img src={`/storage/${evento.media_path}`} className="w-full h-full object-cover" />
                        </div>
                    )}
                    
                    <div className="p-8">
                        <div className="flex items-center gap-2 text-orange-600 font-bold mb-2">
                            <FaCalendarAlt /> {formatarData(evento.data_evento)}
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{evento.titulo}</h1>
                        
                        {/* Chamativo em destaque */}
                        <p className="text-xl text-orange-800 font-medium mb-6 italic border-l-4 border-orange-400 pl-4">
                            {evento.chamativo}
                        </p>

                        <div className="prose max-w-none text-gray-600 whitespace-pre-line leading-relaxed">
                            {evento.descricao}
                        </div>
                    </div>
                </div>

                {/* Galeria de Fotos */}
                {evento.fotos && evento.fotos.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <FaImages className="text-orange-600" /> Galeria de Fotos
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {evento.fotos.map((foto) => (
                                <div key={foto.id} className="h-48 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-transform hover:scale-105 cursor-pointer bg-gray-100">
                                    <img 
                                        src={`/storage/${foto.caminho_foto}`} 
                                        alt="Foto da galeria" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}