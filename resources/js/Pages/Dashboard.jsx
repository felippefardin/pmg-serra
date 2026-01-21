import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
// Importação limpa e unificada dos ícones
import { FaCalendarPlus, FaNewspaper, FaPenFancy, FaHome, FaUserTie, FaUsers } from 'react-icons/fa';

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
        // Novo Card para Assessores
        {
            titulo: 'Novo Assessor',
            descricao: 'Adicionar equipe de apoio',
            icone: <FaUsers size={30} />,
            link: route('admin.assessores.create'), 
            cor: 'bg-green-600'
        }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Painel Administrativo - PGM</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Botão para ver o site como visitante */}
                    <div className="mb-6 flex justify-end">
                        <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold bg-white px-4 py-2 rounded shadow-sm">
                            <FaHome /> Ver Site Público
                        </Link>
                    </div>

                    {/* Ajustei para lg:grid-cols-3. 
                       Com 5 itens, ficarão 3 na primeira linha e 2 centralizados (ou à esquerda) na segunda,
                       o que visualmente fica melhor do que 4 em cima e 1 sozinho em baixo.
                    */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
                        {cards.map((card, index) => (
                            <Link key={index} href={card.link} className="bg-white overflow-hidden shadow-sm sm:rounded-lg hover:shadow-xl transition-shadow cursor-pointer group">
                                <div className="p-6 flex items-center gap-4">
                                    <div className={`${card.cor} text-white p-4 rounded-full group-hover:scale-110 transition-transform`}>
                                        {card.icone}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">{card.titulo}</h3>
                                        <p className="text-sm text-gray-500">{card.descricao}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    
                    <div className="mt-8 bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="font-bold text-lg mb-4">Status do Sistema</h3>
                        <p className="text-gray-600">Bem-vindo, {auth.user.name}. Utilize os cartões acima para gerenciar o conteúdo do portal.</p>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}