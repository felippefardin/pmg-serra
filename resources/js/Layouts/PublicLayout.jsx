import React from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import FontSizeControls from '@/Components/FontSizeControls';
import ThemeToggle from '@/Components/ThemeToggle';
import { FaPhoneAlt, FaEnvelope, FaClock, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import FlashMessage from '@/Components/FlashMessage';
import VLibras from '@/Components/Vlibras';

export default function PublicLayout({ children, title }) {
    // 2. RECUPERAR A PROP 'flash' DO INERTIA
    const { auth, flash } = usePage().props;

    // --- LÓGICA DE BUSCA ---
    const { data, setData, get } = useForm({
        q: ''
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (data.q.trim()) {
            get(route('site.search'));
        }
    };
    // ----------------------

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
            
            {/* 3. LÓGICA DE EXIBIÇÃO DE MENSAGENS (AJUSTADO) */}
            {/* Prioridade 1: Erro (Vermelho) */}
            {flash.error && <FlashMessage message={flash.error} type="error" />}
            
            {/* Prioridade 2: Sucesso (Verde) */}
            {flash.success && <FlashMessage message={flash.success} type="success" />}
            
            {/* Prioridade 3: Mensagem Genérica (Legado) */}
            {flash.message && !flash.success && !flash.error && <FlashMessage message={flash.message} type="success" />}
            {/* ----------------------------------------------- */}

            {/* CABEÇALHO */}
            <header className="bg-gray-50 dark:bg-gray-950 text-black dark:text-white shadow-sm sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="container mx-auto px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
                    
                    {/* LADO ESQUERDO: Logo e Título */}
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition group">
                            
                            {/* --- BOLINHA PMG --- */}
                            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-blue-900 dark:text-blue-400 font-extrabold shadow-sm text-sm shrink-0 border border-gray-200 dark:border-gray-700 group-hover:scale-105 transition-transform duration-300">
                                PMG
                            </div>

                            <div className="flex flex-col justify-center">
                                <h1 className="text-xl font-extrabold leading-none text-black dark:text-white tracking-tight">
                                    Procuradoria Geral
                                </h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mt-0.5 uppercase tracking-wide">
                                    Município da Serra
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* LADO DIREITO: Controles, Busca e Navegação */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        
                        {/* Controles de Fonte e Tema */}
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-lg p-1 border border-gray-200 dark:border-gray-800">
                             <FontSizeControls 
                                className="bg-transparent border-r border-gray-300 dark:border-gray-700 text-black dark:text-white pr-2 mr-2"
                                btnClassName="hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
                             />
                             <ThemeToggle className="bg-transparent text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded p-1" />
                        </div>

                        {/* --- BARRA DE BUSCA --- */}
                        <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
                            <input 
                                type="text" 
                                name="q"
                                value={data.q}
                                onChange={(e) => setData('q', e.target.value)}
                                placeholder="Buscar..." 
                                className="w-48 pl-4 pr-10 py-1.5 text-sm rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                            />
                            <button type="submit" className="absolute right-0 top-0 mt-2 mr-3 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <FaSearch size={14} />
                            </button>
                        </form>
                        {/* ---------------------- */}

                        <nav className="flex items-center gap-6">
                            
                            {/* --- LINK FALE CONOSCO --- */}
                            <Link 
                                href={route('contato.index')} 
                                className="text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition"
                            >
                                Fale Conosco
                            </Link>
                            {/* ------------------------- */}

                            {auth.user ? (
                                <Link href="/dashboard" className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-full text-sm font-bold transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                    Painel
                                </Link>
                            ) : (
                                <Link href={route('login')} className="text-sm font-bold text-blue-700 dark:text-blue-400 hover:underline decoration-2 underline-offset-4 transition">
                                    Acesso Restrito
                                </Link>
                            )}
                        </nav>
                        
                    </div>
                </div>
            </header>

            {/* CONTEÚDO PRINCIPAL */}
            <main className="flex-grow">
                {children}
            </main>

            {/* RODAPÉ */}
            <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800 text-sm">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 bg-gray-800/50 px-6 py-3 rounded-full border border-gray-800">
                            <div className="flex items-center gap-2">
                                <FaEnvelope className="text-blue-500" />
                                <a href="mailto:proger@serra.es.gov.br" className="hover:text-white transition font-medium text-gray-300">
                                    proger@serra.es.gov.br
                                </a>
                            </div>
                            <span className="hidden md:block text-gray-600">|</span>
                            <div className="flex items-center gap-2">
                                <FaPhoneAlt className="text-blue-500" />
                                <span className="text-gray-300">(27) 3291-2067</span>
                            </div>
                            <span className="hidden md:block text-gray-600">|</span>
                            <div className="flex items-center gap-2">
                                <FaClock className="text-blue-500" />
                                <span className="text-gray-300">Segunda à Sexta 08h às 18h</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 max-w-lg lg:justify-end">
                            <FaMapMarkerAlt className="text-blue-500 text-lg shrink-0" />
                            <span className="text-xs leading-relaxed text-gray-400">
                                Rua Maestro Antônio Cícero, 111, 4º andar (Prédio Anexo) <br className="hidden lg:block"/> 
                                Caçaroca - Serra/ES - CEP 29176-100
                            </span>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-6 pt-6 text-center">
                        <p className="text-xs text-gray-600 font-medium">
                            &copy; {new Date().getFullYear()} Procuradoria Geral do Município da Serra. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </footer>            
        </div>
    );
}