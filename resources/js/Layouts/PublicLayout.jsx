import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function PublicLayout({ children, title }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            
            {/* CABEÇALHO PADRÃO (Para todas as páginas) */}
            <header className="bg-blue-900 dark:bg-blue-950 text-white shadow-md">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Logotipo / Nome */}
                    <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-900 font-bold shadow-sm">
                            PGM
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-lg font-bold leading-tight">Procuradoria Geral</h1>
                            <p className="text-xs text-blue-200">Município da Serra</p>
                        </div>
                    </Link>

                    {/* Navegação / Login */}
                    <nav className="flex items-center gap-6">
                        <Link href="/" className="text-sm font-medium hover:text-blue-200 transition hidden md:block">
                            Início
                        </Link>
                        
                        {auth.user ? (
                            <Link href="/dashboard" className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded text-sm font-semibold transition shadow-sm border border-blue-600">
                                Painel Administrativo
                            </Link>
                        ) : (
                            <Link href={route('login')} className="text-sm font-semibold hover:text-white text-blue-100 underline decoration-blue-400 hover:decoration-white transition">
                                Acesso Restrito
                            </Link>
                        )}
                    </nav>
                </div>
            </header>

            {/* CONTEÚDO DA PÁGINA */}
            <main className="flex-grow">
                {title && (
                   <head>
                       <title>{title}</title>
                   </head>
                )}
                {children}
            </main>

            {/* RODAPÉ PADRÃO */}
            <footer className="bg-gray-800 dark:bg-black text-gray-400 py-8 text-center border-t border-gray-700">
                <div className="container mx-auto px-4">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Procuradoria Geral do Município da Serra.</p>
                    <p className="text-xs mt-2 text-gray-500">Compromisso com a Justiça e Transparência.</p>
                </div>
            </footer>
        </div>
    );
}