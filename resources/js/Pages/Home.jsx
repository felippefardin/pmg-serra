import React from 'react';
import { Link } from '@inertiajs/react';
import { FaUserTie, FaUsers, FaCalendarAlt, FaNewspaper, FaScroll } from 'react-icons/fa';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Home({ titulo, descricao }) {
    const menuItems = [
        { label: 'Procuradores', icon: <FaUserTie size={40} />, link: '/procuradores', color: 'bg-blue-600' },
        { label: 'Assessores', icon: <FaUsers size={40} />, link: '/assessores', color: 'bg-green-600' },
        { label: 'Eventos', icon: <FaCalendarAlt size={40} />, link: '/eventos', color: 'bg-orange-500' },
        { label: 'Notícias', icon: <FaNewspaper size={40} />, link: '/noticias', color: 'bg-indigo-600' },
        { label: 'Carta do Procurador', icon: <FaScroll size={40} />, link: '/cartas', color: 'bg-red-700' },
    ];

    return (
        <PublicLayout title="PGM Serra - Início">
            
            {/* HERO SECTION */}
            <div className="bg-white dark:bg-gray-800 py-12 shadow-sm transition-colors border-b border-gray-100 dark:border-gray-700 overflow-hidden">
                
                {/* Mantido items-start para alinhar ao topo do título */}
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-start justify-start gap-6 md:gap-10">
                    
                    {/* BRASÃO — UM POUCO MAIOR */}
                    <div className="flex-shrink-0 relative z-10 w-36 md:w-44">
                        <img 
                            src="/img/brasao_dois.png" 
                            alt="Brasão do Município da Serra" 
                            className="w-full max-w-[170px] md:max-w-[210px] drop-shadow-2xl transition-transform duration-300 hover:scale-105 object-contain"
                        />
                    </div>

                    {/* TEXTO */}
                    <div className="text-left max-w-2xl z-20">
                        <h2 className="text-4xl md:text-6xl font-extrabold text-blue-900 dark:text-white mb-4 leading-tight tracking-tight">
                            {titulo || 'Procuradoria Geral'}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-xl leading-relaxed font-medium">
                            {descricao || 'Município da Serra - ES'}
                        </p>
                    </div>

                </div>
            </div>

            {/* ÍCONES DE NAVEGAÇÃO */}
            <div className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {menuItems.map((item, index) => (
                            <Link 
                                key={index} 
                                href={item.link} 
                                className="group block bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-gray-700"
                            >
                                <div className={`${item.color} h-24 flex items-center justify-center text-white transition-colors`}>
                                    {item.icon}
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

            {/* SEÇÃO: O QUE FAZEMOS */}
            <div className="bg-white dark:bg-gray-800 py-16 border-t border-gray-200 dark:border-gray-700 transition-colors">
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
