import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { FaUserTie, FaUsers, FaCalendarAlt, FaNewspaper } from 'react-icons/fa';

export default function Home({ titulo, descricao }) {
    
    const menuItems = [
        { label: 'Procuradores', icon: <FaUserTie size={40} />, link: '/procuradores', color: 'bg-blue-600' },
        { label: 'Assessores', icon: <FaUsers size={40} />, link: '/assessores', color: 'bg-green-600' },
        { label: 'Eventos', icon: <FaCalendarAlt size={40} />, link: '/eventos', color: 'bg-orange-500' },
        { label: 'Notícias', icon: <FaNewspaper size={40} />, link: '/noticias', color: 'bg-indigo-600' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
            <Head title="PGM Serra - Início" />

            {/* HEADER */}
            <header className="bg-blue-900 text-white shadow-md">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-900 font-bold">PGM</div>
                        <div>
                            <h1 className="text-xl font-bold">Procuradoria Geral</h1>
                            <p className="text-sm text-blue-200">Município da Serra</p>
                        </div>
                    </div>
                    {/* Botão de Login (Aproveitando o Breeze) */}
                    <nav>
                        <Link href="/login" className="text-sm hover:text-blue-200 underline">Acesso Restrito</Link>
                    </nav>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="bg-white py-20 text-center shadow-sm">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">{titulo}</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto text-xl">{descricao}</p>
                </div>
            </section>

            {/* ÍCONES DE NAVEGAÇÃO */}
            <section className="py-16 container mx-auto px-4 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {menuItems.map((item, index) => (
                        <Link key={index} href={item.link} className="group block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                            <div className={`${item.color} h-32 flex items-center justify-center text-white`}>
                                {item.icon}
                            </div>
                            <div className="p-8 text-center">
                                <h4 className="text-2xl font-bold text-gray-800 mb-2">{item.label}</h4>
                                <span className="text-blue-600 text-sm font-semibold group-hover:underline">Acessar &rarr;</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-gray-900 text-gray-400 py-8 text-center mt-auto">
                <p>&copy; 2026 Procuradoria Geral do Município da Serra.</p>
            </footer>
        </div>
    );
}