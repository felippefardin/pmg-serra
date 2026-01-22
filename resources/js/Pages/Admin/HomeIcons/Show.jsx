import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCalendarDay, FaWhatsapp, FaLink } from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';

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
                    
                    {/* Header */}
                    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
                        <div className={`${icon.cor} p-8 flex items-center justify-center text-white`}>
                            {renderIcon(icon.icone)}
                        </div>
                        <div className="p-8 text-center">
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{icon.titulo}</h1>
                            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        
                        {/* Conteúdo */}
                        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-l-4 border-blue-600 pl-3">
                                Informações
                            </h2>
                            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                {icon.conteudo}
                            </div>
                        </div>

                        {/* Barra Lateral */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg h-fit space-y-8">
                                
                            {/* HORÁRIOS */}
                            {(icon.horario || icon.dias) && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b pb-2 dark:border-gray-700">
                                        Funcionamento
                                    </h3>
                                    <ul className="space-y-4">
                                        {icon.dias && (
                                            <li className="flex items-start gap-4">
                                                <div className="bg-purple-100 text-purple-600 p-2 rounded-full">
                                                    <FaCalendarDay size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Dias</p>
                                                    <p className="text-gray-800 dark:text-white font-medium">{icon.dias}</p>
                                                </div>
                                            </li>
                                        )}
                                        {icon.horario && (
                                            <li className="flex items-start gap-4">
                                                <div className="bg-purple-100 text-purple-600 p-2 rounded-full">
                                                    <FaClock size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Horário</p>
                                                    <p className="text-gray-800 dark:text-white font-medium">{icon.horario}</p>
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}

                            {/* CONTATOS & LINKS */}
                            {(icon.telefone || icon.email || icon.endereco || icon.whatsapp || icon.link_externo) && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b pb-2 dark:border-gray-700">
                                        Contato & Links
                                    </h3>
                                    <ul className="space-y-4">
                                        
                                        {/* WHATSAPP */}
                                        {icon.whatsapp && (
                                            <li className="flex items-start gap-4">
                                                <div className="bg-green-100 text-green-600 p-2 rounded-full"><FaWhatsapp size={18} /></div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400">WhatsApp</p>
                                                    <a 
                                                        href={`https://wa.me/55${icon.whatsapp.replace(/\D/g, '')}`} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline font-medium"
                                                    >
                                                        {icon.whatsapp}
                                                    </a>
                                                </div>
                                            </li>
                                        )}

                                        {icon.telefone && (
                                            <li className="flex items-start gap-4">
                                                <div className="bg-blue-100 text-blue-600 p-2 rounded-full"><FaPhone size={18} /></div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Telefone</p>
                                                    <p className="text-gray-800 dark:text-white font-medium">{icon.telefone}</p>
                                                </div>
                                            </li>
                                        )}
                                        {icon.email && (
                                            <li className="flex items-start gap-4">
                                                <div className="bg-green-100 text-green-600 p-2 rounded-full"><FaEnvelope size={18} /></div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Email</p>
                                                    <p className="text-gray-800 dark:text-white font-medium break-all">{icon.email}</p>
                                                </div>
                                            </li>
                                        )}
                                        {icon.endereco && (
                                            <li className="flex items-start gap-4">
                                                <div className="bg-orange-100 text-orange-600 p-2 rounded-full"><FaMapMarkerAlt size={18} /></div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Endereço</p>
                                                    <p className="text-gray-800 dark:text-white font-medium">{icon.endereco}</p>
                                                </div>
                                            </li>
                                        )}

                                        {/* LINK EXTERNO */}
                                        {icon.link_externo && (
                                            <li className="pt-2">
                                                <a 
                                                    href={icon.link_externo} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
                                                >
                                                    <FaLink /> Acessar Site / Link
                                                </a>
                                            </li>
                                        )}

                                    </ul>
                                </div>
                            )}

                        </div>
                    </div>
                    
                    {/* Botão Voltar */}
                    <div className="mt-8 text-center">
                        <button onClick={() => window.history.back()} className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition">
                            &larr; Voltar
                        </button>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}