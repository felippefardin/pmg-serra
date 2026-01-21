import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import * as FaIcons from 'react-icons/fa';

export default function ShowIcon({ icon }) {
    
    // Renderiza o ícone grande
    const renderIcon = (iconName) => {
        if (iconName && FaIcons[iconName]) {
            const IconComp = FaIcons[iconName];
            return <IconComp size={60} />;
        }
        return <FaIcons.FaQuestionCircle size={60} />;
    };

    return (
        <PublicLayout>
            <Head title={icon.label} />

            <div className="py-12 min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 max-w-4xl">
                    
                    {/* Botão Voltar */}
                    <div className="mb-6">
                        <Link 
                            href="/" 
                            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-bold text-lg"
                        >
                            &larr; Voltar
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                        
                        {/* Cabeçalho Visual */}
                        <div className={`${icon.cor} py-10 flex flex-col items-center justify-center text-white text-center`}>
                            <div className="bg-white/20 p-5 rounded-full mb-4 shadow-sm backdrop-blur-sm">
                                {renderIcon(icon.icone)}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-md">
                                {icon.label}
                            </h1>
                        </div>

                        {/* Conteúdo do Texto */}
                        <div className="p-8 md:p-12">
                            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {icon.link}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}