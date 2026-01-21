import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeToggle({ className = '' }) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Carregar preferência salva ou do sistema
        const saved = localStorage.getItem('pgm_theme');
        const system = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (saved === 'dark' || (!saved && system)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggle = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('pgm_theme', 'light');
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('pgm_theme', 'dark');
            setIsDark(true);
        }
    };

    return (
        <button 
            onClick={toggle}
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors border shadow-sm ${
                isDark 
                ? 'bg-gray-800 text-yellow-400 border-gray-700 hover:bg-gray-700' // Estilo ativo Dark
                : 'bg-white text-blue-900 border-gray-200 hover:bg-gray-50'    // Estilo ativo Light
            } ${className}`}
            title={isDark ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
        >
            {isDark ? <FaSun size={14} /> : <FaMoon size={14} />}
        </button>
    );
}