import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react'; // Adicionei Link aqui para evitar erros se usado
import { FaAdjust, FaPlus, FaMinus, FaRedo, FaWheelchair } from 'react-icons/fa';

export default function PublicLayout({ children, title }) {
    // === ESTADOS ===
    // Tenta ler do localStorage ou usa o padrão
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    const [fontSize, setFontSize] = useState(() => {
        return parseInt(localStorage.getItem('fontSize')) || 100; // 100%
    });

    const [menuOpen, setMenuOpen] = useState(false);

    // === EFEITOS (Aplicam as mudanças) ===
    
    // 1. Aplica Dark Mode
    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    // 2. Aplica Tamanho da Fonte (Aumenta o % do HTML root)
    useEffect(() => {
        const root = window.document.documentElement;
        root.style.fontSize = `${fontSize}%`;
        localStorage.setItem('fontSize', fontSize);
    }, [fontSize]);

    // === FUNÇÕES DE CONTROLE ===
    const toggleTheme = () => setDarkMode(!darkMode);
    const increaseFont = () => setFontSize(prev => Math.min(prev + 10, 130)); // Max 130%
    const decreaseFont = () => setFontSize(prev => Math.max(prev - 10, 90));  // Min 90%
    const resetFont = () => setFontSize(100);

    return (
        <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
            {title && <Head title={title} />}

            {/* Conteúdo da Página */}
            <main>
                {children}
            </main>

            {/* === WIDGET DE ACESSIBILIDADE FLUTUANTE === */}
            <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
                
                {/* Menu de Opções (Só aparece se aberto) */}
                {menuOpen && (
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl mb-2 flex flex-col gap-2 border border-gray-200 dark:border-gray-700">
                        <button onClick={toggleTheme} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-bold text-gray-700 dark:text-gray-200" title="Alternar Tema">
                            <FaAdjust /> {darkMode ? 'Modo Claro' : 'Modo Escuro'}
                        </button>
                        <hr className="dark:border-gray-600" />
                        <button onClick={increaseFont} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-200" title="Aumentar Fonte">
                            <FaPlus size={12} /> Aumentar Texto
                        </button>
                        <button onClick={decreaseFont} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-200" title="Diminuir Fonte">
                            <FaMinus size={12} /> Diminuir Texto
                        </button>
                        <button onClick={resetFont} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-200" title="Resetar Fonte">
                            <FaRedo size={12} /> Resetar Padrão
                        </button>
                    </div>
                )}

                {/* Botão Principal (Abre/Fecha) */}
                <button 
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="bg-blue-900 dark:bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-4 ring-blue-300"
                    title="Acessibilidade"
                >
                    <FaWheelchair size={24} />
                </button>
            </div>
        </div>
    );
}