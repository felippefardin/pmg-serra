import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import * as FaIcons from 'react-icons/fa';
import { 
    FaTimes, FaLink, FaClock, FaMapMarkerAlt, FaPhone, FaWhatsapp, 
    FaEnvelope, FaExternalLinkAlt, FaImages, FaFileAlt, FaFileDownload 
} from 'react-icons/fa';

export default function Index({ auth, icons }) {
    const [selectedIcon, setSelectedIcon] = useState(null);

    const renderIcon = (iconName, size = 24) => {
        if (iconName && FaIcons[iconName]) {
            const IconComp = FaIcons[iconName];
            return <IconComp size={size} />;
        }
        return <FaIcons.FaQuestionCircle size={size} />;
    };

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja excluir este ícone?')) {
            router.delete(route('admin.home-icons.destroy', id));
        }
    };

    const closeModal = () => {
        setSelectedIcon(null);
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
                                            <td className="p-3 text-blue-600">{renderIcon(icon.icone, 24)}</td>
                                            <td className="p-3 font-bold">
                                                {icon.label}
                                                {icon.imagens?.length > 0 && (
                                                    <span className="ml-2 inline-flex items-center gap-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 text-xs px-2 py-0.5 rounded-full">
                                                        <FaImages size={10} /> {icon.imagens.length}
                                                    </span>
                                                )}
                                                {icon.documentos?.length > 0 && (
                                                    <span className="ml-2 inline-flex items-center gap-1 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 text-xs px-2 py-0.5 rounded-full">
                                                        <FaFileAlt size={10} /> {icon.documentos.length}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-3 text-sm text-gray-600 dark:text-gray-400">{icon.titulo}</td>
                                            <td className="p-3 text-right space-x-2">
                                                <button onClick={() => setSelectedIcon(icon)} className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm transition">Visualizar</button>
                                                <Link href={route('admin.home-icons.edit', icon.id)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition">Editar</Link>
                                                <button onClick={() => handleDelete(icon.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition">Excluir</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={!!selectedIcon} onClose={closeModal} maxWidth="2xl">
                {selectedIcon && (
                    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                        <div className={`${selectedIcon.cor || 'bg-blue-600'} p-6 flex items-center justify-between rounded-t-lg`}>
                            <div className="flex items-center gap-4 text-white">
                                <div className="p-2 bg-white/20 rounded-full">{renderIcon(selectedIcon.icone, 32)}</div>
                                <div>
                                    <h2 className="text-2xl font-bold">{selectedIcon.titulo || selectedIcon.label}</h2>
                                    <p className="text-white/80 text-sm font-medium">{selectedIcon.label}</p>
                                </div>
                            </div>
                            <button onClick={closeModal} className="text-white hover:bg-white/20 p-2 rounded-full transition"><FaTimes size={24} /></button>
                        </div>

                        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                            {selectedIcon.conteudo && (
                                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {selectedIcon.conteudo}
                                </div>
                            )}

                            {/* DOCUMENTOS CORRIGIDOS (Acessando nome e url) */}
                            {selectedIcon.documentos?.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                        <FaFileAlt className="text-orange-500" /> Documentos ({selectedIcon.documentos.length})
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {selectedIcon.documentos.map((doc, index) => (
                                            <a 
                                                key={index}
                                                href={`/storage/${doc.url}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 transition group"
                                            >
                                                <FaFileDownload className="text-gray-400 group-hover:text-orange-500 flex-shrink-0" />
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                                                    {doc.nome}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* GRID DE INFORMAÇÕES DE CONTATO REVISADO */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                {(selectedIcon.horario || selectedIcon.dias) && (
                                    <div className="col-span-1 md:col-span-2 flex items-start gap-3">
                                        <FaClock className="text-blue-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-white text-sm">Funcionamento</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {selectedIcon.dias} {selectedIcon.horario && `• ${selectedIcon.horario}`}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {selectedIcon.endereco && (
                                    <div className="flex items-start gap-3 col-span-1 md:col-span-2">
                                        <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-white text-sm">Endereço</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{selectedIcon.endereco}</p>
                                        </div>
                                    </div>
                                )}
                                {selectedIcon.telefone && (
                                    <div className="flex items-center gap-3">
                                        <FaPhone className="text-green-600 flex-shrink-0" />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{selectedIcon.telefone}</span>
                                    </div>
                                )}
                                {selectedIcon.whatsapp && (
                                    <div className="flex items-center gap-3">
                                        <FaWhatsapp className="text-green-500 flex-shrink-0" />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{selectedIcon.whatsapp}</span>
                                    </div>
                                )}
                                {selectedIcon.email && (
                                    <div className="flex items-center gap-3 md:col-span-2">
                                        <FaEnvelope className="text-gray-500 flex-shrink-0" />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{selectedIcon.email}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}