import React, { useState, useEffect } from 'react';

export default function FontSizeControls() {
    // Estado inicial
    const [tamanho, setTamanho] = useState(100);

    // Carregar do LocalStorage ao iniciar
    useEffect(() => {
        const salvo = localStorage.getItem('pgm_fonte_pref');
        if (salvo) setTamanho(parseInt(salvo));
    }, []);

    // Aplicar no HTML sempre que mudar
    useEffect(() => {
        document.documentElement.style.fontSize = `${tamanho}%`;
        localStorage.setItem('pgm_fonte_pref', tamanho);
    }, [tamanho]);

    const alterar = (valor) => setTamanho(prev => {
        const novo = prev + valor;
        return Math.min(Math.max(novo, 70), 150); // Limite entre 70% e 150%
    });

    const resetar = () => setTamanho(100);

    return (
        <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg p-1 gap-1 shadow-sm border border-white/10">
            <button 
                onClick={() => alterar(-10)} 
                title="Diminuir Fonte"
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/20 text-white font-bold transition text-xs"
            >
                A-
            </button>
            <button 
                onClick={resetar} 
                title="Tamanho Padrão"
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/20 text-white font-bold transition text-xs border-x border-white/20"
            >
                A
            </button>
            <button 
                onClick={() => alterar(10)} 
                title="Aumentar Fonte"
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/20 text-white font-bold transition text-xs"
            >
                A+
            </button>
        </div>
    );
}