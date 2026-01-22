import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import * as FaIcons from 'react-icons/fa';

export default function Index({ auth, icons }) {
    
    // Função para renderizar o ícone visualmente
    const renderIcon = (iconName) => {
        if (iconName && FaIcons[iconName]) {
            const IconComp = FaIcons[iconName];
            return <IconComp size={24} />;
        }
        return <FaIcons.FaQuestionCircle size={24} />;
    };

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja excluir este ícone?')) {
            router.delete(route('admin.home-icons.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Gerenciar Ícones da Home
                    </h2>
                    <Link
                        href={route('admin.home-icons.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow transition"
                    >
                        + Novo Ícone
                    </Link>
                </div>
            }
        >
            <Head title="Ícones da Home" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b dark:border-gray-700">
                                        <th className="p-3">Ícone</th>
                                        <th className="p-3">Nome (Botão)</th>
                                        <th className="p-3">Título (Página)</th>
                                        <th className="p-3 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {icons.map((icon) => (
                                        <tr key={icon.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                            <td className="p-3 text-blue-600">
                                                {renderIcon(icon.icone)}
                                            </td>
                                            <td className="p-3 font-bold">{icon.label}</td>
                                            <td className="p-3 text-sm text-gray-600 dark:text-gray-400">{icon.titulo}</td>
                                            <td className="p-3 text-right space-x-2">
                                                
                                                {/* BOTÃO VISUALIZAR (Abre em nova aba) */}
                                                <a 
                                                    href={route('icone.show', icon.id)} 
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm transition"
                                                >
                                                    Visualizar
                                                </a>

                                                <Link 
                                                    href={route('admin.home-icons.edit', icon.id)} 
                                                    className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition"
                                                >
                                                    Editar
                                                </Link>
                                                
                                                <button 
                                                    onClick={() => handleDelete(icon.id)} 
                                                    className="inline-block bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
                                                >
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {icons.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="p-6 text-center text-gray-500">
                                                Nenhum ícone cadastrado.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}