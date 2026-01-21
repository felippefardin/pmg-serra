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
            
            {/* HERO SECTION - Título e Descrição */}
            {/* Removemos o <header> pois ele deve estar no PublicLayout */}
            
            <div className="bg-white dark:bg-gray-800 py-12 text-center shadow-sm transition-colors border-b border-gray-100 dark:border-gray-700">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-blue-900 dark:text-white mb-4">
                        {titulo || 'Procuradoria Geral'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
                        {descricao || 'Portal oficial de serviços e transparência jurídica do município.'}
                    </p>
                </div>
            </div>

            {/* ÍCONES DE NAVEGAÇÃO */}
            <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {menuItems.map((item, index) => (
                            <Link 
                                key={index} 
                                href={item.link} 
                                className="group block bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-gray-700"
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

            {/* Removemos o <footer> pois ele deve estar no PublicLayout */}

        </PublicLayout>
    );
}