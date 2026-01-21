import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { FaUserTie, FaUsers, FaCalendarAlt, FaNewspaper, FaScroll } from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa'; 
import PublicLayout from '@/Layouts/PublicLayout';

export default function Home({ titulo, descricao, dynamicIcons }) {
    const { auth } = usePage().props;

    // 1. ÍCONES FIXOS (Originais)
    const staticItems = [
        { label: 'Procuradores', iconComponent: <FaUserTie size={40} />, link: '/procuradores', color: 'bg-blue-600' },
        { label: 'Assessores', iconComponent: <FaUsers size={40} />, link: '/assessores', color: 'bg-green-600' },
        { label: 'Eventos', iconComponent: <FaCalendarAlt size={40} />, link: '/eventos', color: 'bg-orange-500' },
        { label: 'Notícias', iconComponent: <FaNewspaper size={40} />, link: '/noticias', color: 'bg-indigo-600' },
        { label: 'Carta do Procurador', iconComponent: <FaScroll size={40} />, link: '/cartas', color: 'bg-red-700' },
    ];

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja remover este ícone?')) {
            router.delete(route('admin.home-icons.destroy', id));
        }
    };

    const renderDynamicIcon = (iconName) => {
        if (iconName && FaIcons[iconName]) {
            const IconComp = FaIcons[iconName];
            return <IconComp size={40} />;
        }
        return <FaIcons.FaQuestionCircle size={40} />;
    };

    return (
        <PublicLayout title="PGM Serra - Início">
            
            {/* HERO SECTION */}
            <div className="bg-white dark:bg-gray-800 py-6 shadow-sm transition-colors border-b border-gray-100 dark:border-gray-700 overflow-visible">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-start gap-12">
                    <div className="flex-shrink-0 pl-2 md:pl-0 relative z-10">
                        <img 
                            src="/img/brasao_dois.png" 
                            alt="Brasão do Município da Serra" 
                            className="h-40 md:h-52 drop-shadow-2xl transition-transform scale-125 hover:scale-135 duration-300 object-contain"
                        />
                    </div>
                    <div className="text-center md:text-left max-w-xl z-0">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-blue-900 dark:text-white mb-2 leading-tight">
                            {titulo || 'Procuradoria Geral'}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-snug font-medium">
                            {descricao || 'Município da Serra - ES'}
                        </p>
                    </div>
                </div>
            </div>

            {/* SEÇÃO 1: ÍCONES FIXOS (DIV ORIGINAL) */}
            <div className="py-12 bg-gray-50 dark:bg-gray-900 transition-colors">
                <div className="container mx-auto px-4">
                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-6 border-l-4 border-blue-600 pl-3">
                        Acesso Rápido
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {staticItems.map((item, index) => (
                            <Link 
                                key={index} 
                                href={item.link} 
                                className="block bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-gray-700 h-full"
                            >
                                <div className={`${item.color} h-24 flex items-center justify-center text-white transition-colors`}>
                                    {item.iconComponent}
                                </div>
                                <div className="p-6 text-center">
                                    <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {item.label}
                                    </h4>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium group-hover:underline">
                                        Acessar &rarr;
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* SEÇÃO 2: ÍCONES DINÂMICOS (NOVA DIV) */}
            {/* Só exibe se houver ícones cadastrados */}
            {dynamicIcons && dynamicIcons.length > 0 && (
                <div className="py-12 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors">
                    <div className="container mx-auto px-4">
                        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-6 border-l-4 border-green-600 pl-3">
                            Informações e Serviços Adicionais
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                            {dynamicIcons.map((item, index) => (
                                <div key={index} className="relative group h-full">
                                    
                                    {/* Link aponta para a nova rota 'icone.show' passando o ID */}
                                    <Link 
                                        href={route('icone.show', item.id)} 
                                        className="block bg-gray-50 dark:bg-gray-900 rounded-xl shadow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-gray-700 h-full"
                                    >
                                        <div className={`${item.cor} h-24 flex items-center justify-center text-white transition-colors`}>
                                            {renderDynamicIcon(item.icone)}
                                        </div>
                                        <div className="p-6 text-center">
                                            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                                                {item.label}
                                            </h4>
                                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium group-hover:underline">
                                                Ler mais &rarr;
                                            </span>
                                        </div>
                                    </Link>

                                    {/* Botões de Admin (Só aparecem se logado) */}
                                    {auth.user && (
                                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                                            <Link 
                                                href={route('admin.home-icons.edit', item.id)}
                                                className="bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-50 transition transform hover:scale-110"
                                            >
                                                <FaIcons.FaPen size={12} />
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(item.id)}
                                                className="bg-white text-red-600 p-2 rounded-full shadow-lg hover:bg-red-50 transition transform hover:scale-110"
                                            >
                                                <FaIcons.FaTrash size={12} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* SEÇÃO: O QUE FAZEMOS (MANTIDA) */}
            <div className="bg-white dark:bg-gray-800 py-16 border-t border-gray-200 dark:border-gray-700 transition-colors">
                 {/* ... conteúdo igual ao anterior ... */}
                 <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
                    <div className="text-center mb-10">
                        <h3 className="text-3xl font-extrabold text-blue-900 dark:text-white inline-block border-b-4 border-blue-600 pb-2">
                            O que fazemos
                        </h3>
                    </div>
                    
                    <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                        <p>
                            A Procuradoria Geral do Município da Serra — <strong>PROGER</strong>, tem sua estrutura, funcionalidade e atribuições traçadas na Lei Municipal nº 2.356/2000 — Estrutura Organizacional do Poder Executivo e na Lei Municipal nº 5.539/2022 – Lei Orgânica da Procuradoria Geral do Município, tendo como objetivo promover a defesa, em juízo ou fora dele, dos direitos e interesses do Município.
                        </p>
                        <p>
                            Também promove o exame de ordens e sentenças judiciais e orienta o prefeito, os secretários e as demais autoridades. É sua função propor ação civil pública e zelar pela fiel observância e aplicação das leis, decretos, portarias e regulamentos existentes.
                        </p>
                        <p>
                            É ainda seu dever aprovar previamente as minutas dos editais de licitação, contratos, acordos, convênios, ajustes e quaisquer outros instrumentos em que haja um acordo de vontades para formação de vínculo obrigacional, oneroso ou não, qualquer que seja a denominação dada aos mesmos, celebrados por quaisquer órgãos ou entidades municipais.
                        </p>
                    </div>
                </div>
            </div>

        </PublicLayout>
    );
}