import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { FaStar, FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

export default function AvaliacoesIndex({ auth, avaliacoes }) {
    
    const handleStatus = (id, status) => {
        if(confirm(`Deseja ${status ? 'aprovar' : 'reprovar'} esta avaliação?`)) {
            router.patch(route('admin.avaliacoes.status', id), { aprovado: status });
        }
    };

    const handleDelete = (id) => {
        if(confirm('Tem certeza que deseja excluir permanentemente esta avaliação?')) {
            router.delete(route('admin.avaliacoes.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Gerenciar Avaliações</h2>}
        >
            <Head title="Moderação de Avaliações" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-left">
                                    <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3">Data</th>
                                            <th className="px-6 py-3">Usuário</th>
                                            <th className="px-6 py-3">Nota</th>
                                            <th className="px-6 py-3 w-1/2">Comentário</th>
                                            <th className="px-6 py-3">Status</th>
                                            <th className="px-6 py-3 text-center">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {avaliacoes.map((av) => (
                                            <tr key={av.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                                <td className="px-6 py-4">{new Date(av.created_at).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 font-medium">
                                                    {av.anonimo ? <span className="italic text-gray-500">Anônimo</span> : av.nome}
                                                </td>
                                                <td className="px-6 py-4 flex text-yellow-500">
                                                    {[...Array(av.estrelas)].map((_, i) => <FaStar key={i} />)}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                    {av.comentario}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {av.aprovado ? (
                                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Visível</span>
                                                    ) : (
                                                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pendente/Oculto</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 flex justify-center gap-2">
                                                    {!av.aprovado ? (
                                                        <button onClick={() => handleStatus(av.id, true)} title="Aprovar" className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
                                                            <FaCheck />
                                                        </button>
                                                    ) : (
                                                        <button onClick={() => handleStatus(av.id, false)} title="Ocultar" className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
                                                            <FaTimes />
                                                        </button>
                                                    )}
                                                    <button onClick={() => handleDelete(av.id)} title="Excluir" className="bg-red-600 text-white p-2 rounded hover:bg-red-700">
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {avaliacoes.length === 0 && (
                                            <tr>
                                                <td colSpan="6" className="text-center py-6 text-gray-500">Nenhuma avaliação encontrada.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}