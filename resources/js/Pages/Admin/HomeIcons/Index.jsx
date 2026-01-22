import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import * as FaIcons from 'react-icons/fa';
// Importando ícones específicos usados dentro do detalhe do Modal
import { 
    FaTimes, FaLink, FaClock, FaMapMarkerAlt, FaPhone, FaWhatsapp, 
    FaEnvelope, FaExternalLinkAlt, FaImages, FaFileAlt, FaFileDownload 
} from 'react-icons/fa';

export default function Index({ auth, icons }) {
    
    // Estado para controlar o modal
    const [selectedIcon, setSelectedIcon] = useState(null);

    // Função para renderizar o ícone visualmente (com tamanho ajustável)
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
                                            <td className="p-3 text-blue-600">
                                                {/* Renderiza pequeno na tabela */}
                                                {renderIcon(icon.icone, 24)}
                                            </td>
                                            <td className="p-3 font-bold">
                                                {icon.label}
                                                
                                                {/* Indicador visual de imagens */}
                                                {icon.imagens && icon.imagens.length > 0 && (
                                                    <span className="ml-2 inline-flex items-center gap-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 text-xs px-2 py-0.5 rounded-full" title={`${icon.imagens.length} imagens`}>
                                                        <FaImages size={10} /> {icon.imagens.length}
                                                    </span>
                                                )}

                                                {/* Indicador visual de documentos (NOVO) */}
                                                {icon.documentos && icon.documentos.length > 0 && (
                                                    <span className="ml-2 inline-flex items-center gap-1 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 text-xs px-2 py-0.5 rounded-full" title={`${icon.documentos.length} documentos`}>
                                                        <FaFileAlt size={10} /> {icon.documentos.length}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-3 text-sm text-gray-600 dark:text-gray-400">{icon.titulo}</td>
                                            <td className="p-3 text-right space-x-2">
                                                
                                                {/* BOTÃO VISUALIZAR (Agora abre o Modal) */}
                                                <button 
                                                    onClick={() => setSelectedIcon(icon)}
                                                    className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm transition cursor-pointer"
                                                >
                                                    Visualizar
                                                </button>

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

            {/* MODAL DE VISUALIZAÇÃO */}
            <Modal show={!!selectedIcon} onClose={closeModal} maxWidth="2xl">
                {selectedIcon && (
                    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                        {/* Cabeçalho do Modal */}
                        <div className={`${selectedIcon.cor || 'bg-blue-600'} p-6 flex items-center justify-between rounded-t-lg`}>
                            <div className="flex items-center gap-4 text-white">
                                <div className="p-2 bg-white/20 rounded-full">
                                    {/* Renderiza grande no modal */}
                                    {renderIcon(selectedIcon.icone, 32)}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">{selectedIcon.titulo || selectedIcon.label}</h2>
                                    <p className="text-white/80 text-sm font-medium">{selectedIcon.label}</p>
                                </div>
                            </div>
                            <button 
                                onClick={closeModal} 
                                className="text-white hover:bg-white/20 p-2 rounded-full transition"
                            >
                                <FaTimes size={24} />
                            </button>
                        </div>

                        {/* Corpo do Modal */}
                        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                            
                            {/* Conteúdo Principal */}
                            {selectedIcon.conteudo && (
                                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                    {selectedIcon.conteudo}
                                </div>
                            )}

                            {/* Galeria de Imagens */}
                            {selectedIcon.imagens && selectedIcon.imagens.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                        <FaImages className="text-purple-500" /> Galeria ({selectedIcon.imagens.length})
                                    </h4>
                                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                        {selectedIcon.imagens.map((img, index) => (
                                            <div key={index} className="flex-shrink-0 relative group w-24 h-24 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
                                                <img 
                                                    src={`/storage/${img}`} 
                                                    alt={`Imagem ${index + 1}`} 
                                                    className="w-full h-full object-cover"
                                                />
                                                <a 
                                                    href={`/storage/${img}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white"
                                                    title="Ver imagem original"
                                                >
                                                    <FaExternalLinkAlt size={14} />
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Documentos Anexados (NOVA SEÇÃO) */}
                            {selectedIcon.documentos && selectedIcon.documentos.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                        <FaFileAlt className="text-orange-500" /> Documentos ({selectedIcon.documentos.length})
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {selectedIcon.documentos.map((doc, index) => {
                                            const fileName = doc.split('/').pop();
                                            return (
                                                <a 
                                                    key={index}
                                                    href={`/storage/${doc}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 transition group"
                                                >
                                                    <FaFileDownload className="text-gray-400 group-hover:text-orange-500 flex-shrink-0" />
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate group-hover:text-orange-700 dark:group-hover:text-orange-300">
                                                        {fileName}
                                                    </span>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Links Externos */}
                            {selectedIcon.link_externo && Array.isArray(selectedIcon.link_externo) && selectedIcon.link_externo.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                        <FaLink className="text-blue-500" /> Links Úteis
                                    </h4>
                                    <ul className="space-y-2">
                                        {selectedIcon.link_externo.map((link, index) => (
                                            <li key={index}>
                                                <a 
                                                    href={link.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 transition group"
                                                >
                                                    <span className="font-medium text-blue-700 dark:text-blue-300 group-hover:underline">
                                                        {link.nome}
                                                    </span>
                                                    <FaExternalLinkAlt className="text-gray-400 group-hover:text-blue-500" size={12} />
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Informações Extras (Grid) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                
                                {/* Horário e Dias */}
                                {(selectedIcon.horario || selectedIcon.dias) && (
                                    <div className="col-span-1 md:col-span-2 flex items-start gap-3">
                                        <FaClock className="text-blue-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-white text-sm">Funcionamento</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {selectedIcon.dias && <span>{selectedIcon.dias}</span>}
                                                {selectedIcon.dias && selectedIcon.horario && <span> • </span>}
                                                {selectedIcon.horario && <span>{selectedIcon.horario}</span>}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Contatos */}
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
                                        <a href={`https://wa.me/${selectedIcon.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">
                                            {selectedIcon.whatsapp}
                                        </a>
                                    </div>
                                )}

                                {selectedIcon.email && (
                                    <div className="flex items-center gap-3 md:col-span-2">
                                        <FaEnvelope className="text-gray-500 flex-shrink-0" />
                                        <a href={`mailto:${selectedIcon.email}`} className="text-sm text-blue-600 hover:underline">
                                            {selectedIcon.email}
                                        </a>
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