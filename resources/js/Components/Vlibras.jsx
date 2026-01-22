import React, { useEffect } from 'react';

export default function VLibras() {
    useEffect(() => {
        const scriptSrc = 'https://vlibras.gov.br/app/vlibras-plugin.js';
        
        // Verifica se o script já existe para não duplicar
        if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
            const script = document.createElement('script');
            script.src = scriptSrc;
            script.async = true;
            script.onload = () => {
                // Inicializa o Widget após o script carregar
                if (window.VLibras) {
                    new window.VLibras.Widget('https://vlibras.gov.br/app');
                }
            };
            document.body.appendChild(script);
        } else if (window.VLibras) {
            // Se o script já existe, apenas reinicia o widget se necessário
            new window.VLibras.Widget('https://vlibras.gov.br/app');
        }
    }, []);

    return (
        // Estrutura HTML exigida pelo VLibras
        <div vw="true" className="enabled">
            <div vw-access-button="true" className="active"></div>
            <div vw-plugin-wrapper="true">
                <div className="vw-plugin-top-wrapper"></div>
            </div>
        </div>
    );
}