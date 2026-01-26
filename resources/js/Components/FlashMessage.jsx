import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

export default function FlashMessage({ message, type = 'success' }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            // Tempo: 5 segundos para sucesso, 10 segundos para erro (para dar tempo de ler)
            const time = type === 'error' ? 10000 : 5000;
            
            const timer = setTimeout(() => {
                setVisible(false);
            }, time);
            return () => clearTimeout(timer);
        }
    }, [message, type]);

    if (!visible || !message) return null;

    // Definição de Estilos (Verde vs Vermelho)
    const styles = {
        success: {
            bg: 'bg-green-600',
            text: 'text-white',
            title: 'Sucesso!',
            icon: <FaCheckCircle className="w-6 h-6 text-white" />
        },
        error: {
            bg: 'bg-red-600',
            text: 'text-white',
            title: 'Erro!',
            icon: <FaExclamationCircle className="w-6 h-6 text-white" />
        }
    };

    const currentStyle = styles[type] || styles.success;

    return (
        <div className="fixed top-24 right-5 z-50 animate-bounce-in">
            <div className={`${currentStyle.bg} ${currentStyle.text} px-6 py-4 rounded-lg shadow-2xl flex items-start gap-4 min-w-[300px] max-w-md`}>
                
                {/* Ícone Dinâmico */}
                <div className="bg-white/20 rounded-full p-1 mt-1 shrink-0">
                    {currentStyle.icon}
                </div>

                <div className="flex-1">
                    <p className="font-bold text-lg leading-tight">{currentStyle.title}</p>
                    <p className="text-sm mt-1 opacity-95 break-words">{message}</p>
                </div>

                {/* Botão Fechar */}
                <button 
                    onClick={() => setVisible(false)} 
                    className="text-white/70 hover:text-white transition-colors font-bold text-xl leading-none"
                >
                    <FaTimes />
                </button>
            </div>
        </div>
    );
}