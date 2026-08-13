import React from 'react';
import { Link } from '@inertiajs/react';
import FontSizeControls from '@/Components/FontSizeControls';
import ThemeToggle from '@/Components/ThemeToggle'; // Importe o Toggle
import { FaHome } from 'react-icons/fa';

export default function PageHeader({ 
    title, 
    subtitle, 
    color = 'bg-blue-900', 
    breadcrumbs = [],      
    actionButton = null,   
    children               
}) {
    return (
        <header className={`${color} text-white shadow-lg transition-colors duration-300 dark:bg-gray-900 dark:border-b dark:border-gray-800`}>
            <div className="container mx-auto px-4 py-6">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    
                    <div className="flex flex-col gap-2">
                        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold opacity-80">
                            <Link href={route('home')} className="hover:text-white/100 flex items-center gap-1 transition-opacity">
                                <FaHome /> Inícios
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

                        <div>
                            <h1 className="text-3xl font-bold leading-tight">{title}</h1>
                            {subtitle && <p className="text-white/80 text-sm mt-1">{subtitle}</p>}
                        </div>
                    </div>

                    {/* Controles: Fonte + Tema + Ação */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="flex items-center gap-2">
                            <FontSizeControls />
                            <ThemeToggle className="bg-white/10 border-white/20 text-white hover:bg-white/20" /> 
                        </div>
                        
                        {actionButton && (
                            <div className="w-full sm:w-auto">
                                {actionButton}
                            </div>
                        )}
                    </div>
                </div>

                {children && (
                    <div className="max-w-2xl mx-auto mt-2">
                        {children}
                    </div>
                )}
            </div>
        </header>
    );
}
