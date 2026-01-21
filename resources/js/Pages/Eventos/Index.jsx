import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';
import PageHeader from '@/Components/PageHeader';
// Ícones (Instale se necessário: npm install react-icons)
import { FaCalendarAlt, FaSearch, FaArrowRight, FaVideo, FaImage } from 'react-icons/fa';

export default function Eventos({ lista }) {
    const { auth, flash } = usePage().props;
    
    // 1. Estado da Busca
    const [busca, setBusca] = useState('');

    // 2. Filtro (Busca por título ou descrição)
    const listaFiltrada = lista.filter(evento => 
        evento.titulo.toLowerCase().includes(busca.toLowerCase()) || 
        evento.descricao.toLowerCase().includes(busca.toLowerCase())
    );

    // Formata a data para dia/mês/ano
    const formatarData = (dataString) => {
        if (!dataString) return '';
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
            <Head title="Eventos - PGM Serra" />
            
            {/* Notificações Flutuantes */}
            <FlashMessage message={flash?.success} />

            {/* Header Laranja Profissional */}
            <header className="bg-orange-600 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="hover:text-orange-200 font-bold text-sm uppercase tracking-wide">
                                &larr; Início
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold">Agenda de Eventos</h1>
                                <p className="text-orange-100 text-sm">Acompanhe as atividades da PGM</p>
                            </div>
                        </div>
                        
                        {/* Botão Novo Evento (Apenas Admin) */}
                        {auth.user && (
                            <Link 
                                href={route('admin.eventos.create')} 
                                className="bg-white text-orange-600 hover:bg-orange-50 text-sm font-bold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
                            >
                                + Novo Evento
                            </Link>
                        )}
                    </div>

                    {/* Barra de Pesquisa */}
                    <div className="mt-6 max-w-xl mx-auto relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-orange-300" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar evento..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 border-none focus:ring-2 focus:ring-orange-400 shadow-sm placeholder-gray-400"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-10 flex-grow">
                {listaFiltrada.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10 py-20 bg-white rounded-lg shadow-sm">
                        <FaCalendarAlt className="mx-auto text-6xl text-gray-300 mb-4" />
                        <p className="text-lg">Nenhum evento encontrado.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listaFiltrada.map((evento) => (
                            <div key={evento.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col group">
                                
                                {/* Área de Mídia (Linkável para o show) */}
                                <Link href={route('evento.show', evento.id)} className="block h-56 bg-gray-200 overflow-hidden relative">
                                    {evento.media_path ? (
                                        evento.media_type === 'video' ? (
                                            <>
                                                <video className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity">
                                                    <source src={`/storage/${evento.media_path}`} type="video/mp4" />
                                                </video>
                                                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full">
                                                    <FaVideo size={14} />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <img 
                                                    src={`/storage/${evento.media_path}`} 
                                                    alt={evento.titulo}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                                />
                                                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full">
                                                    <FaImage size={14} />
                                                </div>
                                            </>
                                        )
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400 group-hover:bg-gray-200 transition-colors">
                                            <FaCalendarAlt size={48} />
                                            <span className="text-sm mt-2">Sem mídia</span>
                                        </div>
                                    )}
                                    
                                    {/* Data Badge (Sobreposta na imagem) */}
                                    <div className="absolute bottom-0 left-0 bg-orange-600 text-white px-4 py-1 rounded-tr-lg text-xs font-bold uppercase tracking-wider shadow-sm">
                                        {formatarData(evento.data_evento)}
                                    </div>
                                </Link>

                                {/* Conteúdo */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <Link href={route('evento.show', evento.id)} className="group-hover:text-orange-600 transition-colors">
                                        <h3 className="text-xl font-bold text-gray-800 line-clamp-2 mb-3">
                                            {evento.titulo}
                                        </h3>
                                    </Link>
                                    
                                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                                        {evento.descricao}
                                    </p>

                                    {/* Botão "Chamado" (Ver Detalhes) */}
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                                        <Link 
                                            href={route('evento.show', evento.id)}
                                            className="text-orange-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                                        >
                                            Ver Detalhes <FaArrowRight size={12} />
                                        </Link>
                                    </div>
                                </div>

                                {/* Ações Administrativas (Visível apenas se logado) */}
                                {auth.user && (
                                    <div className="bg-orange-50 p-3 flex justify-center gap-4 text-sm font-medium border-t border-orange-100">
                                        <Link 
                                            href={route('admin.eventos.edit', evento.id)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Editar
                                        </Link>
                                        <span className="text-gray-300">|</span>
                                        <Link 
                                            href={route('admin.eventos.destroy', evento.id)}
                                            method="delete"
                                            as="button"
                                            onBefore={() => confirm('Tem certeza que deseja apagar este evento?')}
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