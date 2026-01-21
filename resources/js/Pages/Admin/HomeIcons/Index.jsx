import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { FaPlus, FaPen, FaTrash } from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';

export default function Index({ auth, icons }) {
    
    // Função para renderizar o ícone na lista
    const renderIcon = (iconName) => {
        if (iconName && FaIcons[iconName]) {
            const IconComp = FaIcons[iconName];
            return <IconComp size={20} />;
        }
        return <span>?</span>;
    };

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja excluir este ícone?')) {
            router.delete(route('admin.home-icons.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Gerenciar Ícones da Home</h2>}
        >
            <Head title="Ícones da Home" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="flex justify-end mb-6">
                        <Link href={route('admin.home-icons.create')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2">
                            <FaPlus /> Novo Ícone
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ícone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nome (Título)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Texto / Conteúdo</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {icons.map((icon) => (
                                    <tr key={icon.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-white">
                                            <div className={`${icon.cor} p-2 rounded text-white inline-block`}>
                                                {renderIcon(icon.icone)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                                            {icon.label}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                                            {icon.link}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link href={route('admin.home-icons.edit', icon.id)} className="text-blue-600 hover:text-blue-900 mr-4 inline-flex items-center gap-1">
                                                <FaPen size={12}/> Editar
                                            </Link>
                                            <button onClick={() => handleDelete(icon.id)} className="text-red-600 hover:text-red-900 inline-flex items-center gap-1">
                                                <FaTrash size={12}/> Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {icons.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">Nenhum ícone cadastrado.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}