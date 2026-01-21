import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Eventos({ lista, auth }) {
    // Formata a data (Ex: 21/01/2026)
    const formatarData = (dataString) => {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Head title="Eventos - PGM Serra" />

            <header className="bg-orange-600 text-white p-4 shadow-md flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link href="/" className="hover:text-orange-200 font-bold text-sm">&larr; Início</Link>
                    <h1 className="text-xl font-bold">Agenda de Eventos</h1>
                </div>
                {/* Botão de adicionar (só aparece se estiver logado) */}
                {auth?.user && (
                    <Link href={route('admin.eventos.create')} className="bg-white text-orange-600 px-3 py-1 rounded text-sm font-bold">
                        + Novo Evento
                    </Link>
                )}
            </header>

            <main className="container mx-auto px-4 py-10 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {lista.map((evento) => (
                        <div key={evento.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all">
                            {/* Mídia (Vídeo ou Imagem) */}
                            <div className="h-48 bg-gray-200">
                                {evento.media_path ? (
                                    evento.media_type === 'video' ? (
                                        <video controls className="w-full h-full object-cover">
                                            <source src={`/storage/${evento.media_path}`} type="video/mp4" />
                                        </video>
                                    ) : (
                                        <img src={`/storage/${evento.media_path}`} className="w-full h-full object-cover" />
                                    )
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">Sem mídia</div>
                                )}
                            </div>
                            <div className="p-6">
                                <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">
                                    {formatarData(evento.data_evento)}
                                </span>
                                <h3 className="text-xl font-bold text-gray-800 mt-2">{evento.titulo}</h3>
                                <p className="text-gray-600 mt-3 text-sm">{evento.descricao}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}