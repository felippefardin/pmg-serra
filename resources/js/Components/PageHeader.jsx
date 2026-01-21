import React from 'react';
import { Link } from '@inertiajs/react';
import FontSizeControls from '@/Components/FontSizeControls';
import { FaArrowLeft, FaHome } from 'react-icons/fa';

export default function PageHeader({ 
    title, 
    subtitle, 
    color = 'bg-blue-900', // Cor padrão
    breadcrumbs = [],      // Links de navegação [{label: 'Início', href: '/'}]
    actionButton = null,   // Botão "+ Novo" (opcional)
    children               // Barra de pesquisa (opcional)
}) {
    return (
        <header className={`${color} text-white shadow-lg transition-colors duration-300`}>
            <div className="container mx-auto px-4 py-6">
                
                {/* Linha Superior: Navegação, Título e Controles */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    
                    {/* Lado Esquerdo: Breadcrumbs e Título */}
                    <div className="flex flex-col gap-2">
                        {/* Navegação / Breadcrumbs */}
                        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold opacity-80">
                            <Link href="/" className="hover:text-white/100 flex items-center gap-1 transition-opacity">
                                <FaHome /> Início
                            </Link>
                            {breadcrumbs.map((crumb, index) => (
                                <React.Fragment key={index}>
                                    <span>/</span>
                                    <Link href={crumb.href} className="hover:text-white/100 transition-opacity">
                                        {crumb.label}
                                    </Link>
                                </React.Fragment>
                            ))}
                        </nav>

                        {/* Título e Subtítulo */}
                        <div>
                            <h1 className="text-3xl font-bold leading-tight">{title}</h1>
                            {subtitle && <p className="text-white/80 text-sm mt-1">{subtitle}</p>}
                        </div>
                    </div>

                    {/* Lado Direito: Acessibilidade e Ações */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <FontSizeControls />
                        
                        {actionButton && (
                            <div className="w-full sm:w-auto">
                                {actionButton}
                            </div>
                        )}
                    </div>
                </div>

                {/* Linha Inferior: Barra de Pesquisa (Children) */}
                {children && (
                    <div className="max-w-2xl mx-auto mt-2">
                        {children}
                    </div>
                )}
            </div>
        </header>
    );
}