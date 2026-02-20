import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import * as FaIcons from 'react-icons/fa';
import { 
    FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, 
    FaWhatsapp, FaLink, FaImages, FaFileAlt, FaFileDownload 
} from 'react-icons/fa';

export default function ShowIcon({ icon }) {
    
    const renderIcon = (iconName) => {
        if (iconName && FaIcons[iconName]) {
            const IconComp = FaIcons[iconName];
            return <IconComp size={50} />;
        }
        return <FaIcons.FaQuestionCircle size={50} />;
    };

    return (
        <PublicLayout title={`PGM - ${icon.label}`}>
            <Head title={icon.label} />
            <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="container mx-auto px-4">
                    
                    {/* Header Principal */}
                    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
                        <div className={`${icon.cor} p-8 flex items-center justify-center text-white`}>
                            {renderIcon(icon.icone)}
                        </div>
                        <div className="p-8 text-center">
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{icon.titulo}</h1>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        
                        {/* Coluna Esquerda: Conteúdo e Galeria */}
                        <div className="lg:col-span-2 space-y-8">
                            
                            {/* Bloco de Texto Informativo */}
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-l-4 border-blue-600 pl-3">
                                    Informações
                                </h2>
                                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                    {icon.conteudo}
                                </div>
                            </div>

                            {/* Galeria de Imagens */}
                            {icon.imagens && icon.imagens.length > 0 && (
                                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-l-4 border-purple-600 pl-3 flex items-center gap-2">
                                        <FaImages /> Galeria
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {icon.imagens.map((img, idx) => (
                                            <div key={idx} className="rounded-lg overflow-hidden shadow-sm border dark:border-gray-700">
                                                <img 
                                                    src={`/storage/${img}`} 
                                                    alt={`Galeria ${idx}`} 
                                                    className="w-full h-auto object-cover hover:scale-105 transition duration-300"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Coluna Direita: Barra Lateral (Contatos/Links/Documentos) */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg h-fit space-y-8">
                            
                            {/* Funcionamento */}
                            {(icon.horario || icon.dias) && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b pb-2 dark:border-gray-700 flex items-center gap-2">
                                        <FaClock className="text-blue-600" /> Funcionamento
                                    </h3>
                                    <ul className="space-y-2 text-sm">
                                        {icon.dias && <li className="text-gray-700 dark:text-gray-300">{icon.dias}</li>}
                                        {icon.horario && <li className="text-gray-700 dark:text-gray-300">{icon.horario}</li>}
                                    </ul>
                                </div>
                            )}

                            {/* Contatos e Localização */}
                            {(icon.telefone || icon.whatsapp || icon.email || icon.endereco) && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b pb-2 dark:border-gray-700">Contato</h3>
                                    <ul className="space-y-4 text-sm">
                                        {icon.endereco && (
                                            <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                                <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
                                                <span>{icon.endereco}</span>
                                            </li>
                                        )}
                                        {icon.telefone && (
                                            <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                                <FaPhone className="text-green-600 flex-shrink-0" />
                                                <span>{icon.telefone}</span>
                                            </li>
                                        )}
                                        {icon.whatsapp && (
                                            <li className="flex items-center gap-3">
                                                <FaWhatsapp className="text-green-500 flex-shrink-0" />
                                                <a href={`https://wa.me/${icon.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                                    {icon.whatsapp}
                                                </a>
                                            </li>
                                        )}
                                        {icon.email && (
                                            <li className="flex items-center gap-3">
                                                <FaEnvelope className="text-gray-500 flex-shrink-0" />
                                                <a href={`mailto:${icon.email}`} className="text-blue-600 hover:underline truncate">
                                                    {icon.email}
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}

                            {/* Links Úteis */}
                            {icon.link_externo?.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b pb-2 dark:border-gray-700 flex items-center gap-2">
                                        <FaLink className="text-blue-500" /> Links Úteis
                                    </h3>
                                    <div className="space-y-2">
                                        {icon.link_externo.map((link, idx) => (
                                            <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600 hover:bg-blue-50 transition group">
                                                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{link.nome}</span>
                                                <FaLink className="text-gray-400 group-hover:text-blue-500" size={12} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Documentos Anexados */}
                            {icon.documentos?.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b pb-2 dark:border-gray-700 flex items-center gap-2">
                                        <FaFileAlt className="text-orange-500" /> Documentos
                                    </h3>
                                    <div className="space-y-2">
                                        {icon.documentos.map((doc, idx) => (
                                            <a key={idx} href={`/storage/${doc.url}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600 hover:bg-orange-50 transition group">
                                                <FaFileDownload className="text-gray-400 group-hover:text-orange-500" />
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{doc.nome}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Botão Voltar */}
                    <div className="mt-8 text-center">
                        <button 
                            onClick={() => window.history.back()}
                            className="text-gray-500 hover:text-gray-800 dark:hover:text-white transition flex items-center gap-2 mx-auto"
                        >
                            &larr; Voltar
                        </button>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}