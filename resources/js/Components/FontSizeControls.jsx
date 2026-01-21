import React, { useState, useEffect } from 'react';

export default function FontSizeControls({ 
    // Cores padrão (para os Headers coloridos das outras páginas)
    className = "bg-white/20 backdrop-blur-sm border-white/10 text-white",
    btnClassName = "hover:bg-white/20 border-white/20" 
}) {
    const [tamanho, setTamanho] = useState(100);

    useEffect(() => {
        const salvo = localStorage.getItem('pgm_fonte_pref');
        if (salvo) setTamanho(parseInt(salvo));
    }, []);

    useEffect(() => {
        document.documentElement.style.fontSize = `${tamanho}%`;
        localStorage.setItem('pgm_fonte_pref', tamanho);
    }, [tamanho]);

    const alterar = (valor) => setTamanho(prev => {
        const novo = prev + valor;
        return Math.min(Math.max(novo, 70), 150);
    });

    const resetar = () => setTamanho(100);

    return (
        <div className={`flex items-center rounded-lg p-1 gap-1 shadow-sm border ${className}`}>
            <button 
                onClick={() => alterar(-10)} 
                title="Diminuir Fonte"
                className={`w-8 h-8 flex items-center justify-center rounded font-bold transition text-xs ${btnClassName}`}
            >
                A-
            </button>
            <button 
                onClick={resetar} 
                title="Tamanho Padrão"
                className={`w-8 h-8 flex items-center justify-center rounded font-bold transition text-xs border-x ${btnClassName}`}
            >
                A
            </button>
            <button 
                onClick={() => alterar(10)} 
                title="Aumentar Fonte"
                className={`w-8 h-8 flex items-center justify-center rounded font-bold transition text-xs ${btnClassName}`}
            >
                A+
            </button>
        </div>
    );
}