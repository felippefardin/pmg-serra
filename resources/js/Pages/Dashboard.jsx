import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaCalendarPlus, FaNewspaper, FaPenFancy, FaHome, FaUserTie, FaUsers, FaTh } from 'react-icons/fa';

export default function Dashboard({ auth }) {
    const cards = [
        {
            titulo: 'Novo Evento',
            descricao: 'Adicionar evento na agenda',
            icone: <FaCalendarPlus size={30} />,
            link: route('admin.eventos.create'),
            cor: 'bg-orange-600'
        },
        {
            titulo: 'Nova Notícia',
            descricao: 'Publicar notícia recente',
            icone: <FaNewspaper size={30} />,
            link: route('admin.noticias.create'),
            cor: 'bg-indigo-600'
        },
        {
            titulo: 'Escrever Carta',
            descricao: 'Atualizar palavra do procurador',
            icone: <FaPenFancy size={30} />,
            link: route('admin.cartas.create'),
            cor: 'bg-red-700'
        },
        {
            titulo: 'Novo Procurador',
            descricao: 'Adicionar membro à equipe',
            icone: <FaUserTie size={30} />,
            link: route('admin.procuradores.create'), 
            cor: 'bg-blue-600'
        },
        {
            titulo: 'Novo Assessor',
            descricao: 'Adicionar equipe de apoio',
            icone: <FaUsers size={30} />,
            link: route('admin.assessores.create'), 
            cor: 'bg-green-600'
        },
        // --- CARTÃO ATUALIZADO ---
        {
            titulo: 'Gerenciar Ícones',
            descricao: 'Ver lista e editar menu', // Ajustei a descrição
            icone: <FaTh size={30} />,
            // Mude de .create para .index
            link: route('admin.home-icons.index'), 
            cor: 'bg-gray-600'
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Painel Administrativo - PGM</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="mb-6 flex justify-end">
                        <Link href="/" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold bg-white dark:bg-gray-800 px-4 py-2 rounded shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <FaHome /> Ver Site Público
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
                        {cards.map((card, index) => (
                            <Link key={index} href={card.link} className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg hover:shadow-xl dark:hover:shadow-gray-700 transition-all cursor-pointer group border border-gray-100 dark:border-gray-700">
                                <div className="p-6 flex items-center gap-4">
                                    <div className={`${card.cor} text-white p-4 rounded-full group-hover:scale-110 transition-transform shadow-md`}>
                                        {card.icone}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {card.titulo}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{card.descricao}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    
                    <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 border border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white border-b pb-2 dark:border-gray-700">Status do Sistema</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Bem-vindo, <span className="font-semibold text-blue-600 dark:text-blue-400">{auth.user.name}</span>. 
                            Utilize os cartões acima para gerenciar o conteúdo do portal de forma rápida e segura.
                        </p>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}