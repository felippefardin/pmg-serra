import React, { useState, useEffect } from 'react';

export default function FlashMessage({ message }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            // Define o tempo de 4 segundos (4000ms) para sumir
            const timer = setTimeout(() => {
                setVisible(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!visible || !message) return null;

    return (
        <div className="fixed top-5 right-5 z-50 animate-bounce-in">
            <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 min-w-[300px]">
                {/* Ícone de Sucesso */}
                <div className="bg-white rounded-full p-1">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <div className="flex-1">
                    <p className="font-bold">Sucesso!</p>
                    <p className="text-sm">{message}</p>
                </div>

                {/* Botão X para fechar */}
                <button 
                    onClick={() => setVisible(false)} 
                    className="text-green-200 hover:text-white transition-colors font-bold text-xl"
                >
                    &times;
                </button>
            </div>
        </div>
    );
}