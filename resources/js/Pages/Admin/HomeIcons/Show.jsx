// ... (imports anteriores) ...
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCalendarDay, FaWhatsapp, FaLink, FaImages } from 'react-icons/fa';

export default function ShowIcon({ icon }) {
    // ... (renderIcon function) ...
     const renderIcon = (iconName) => {
        if (iconName && FaIcons[iconName]) {
            const IconComp = FaIcons[iconName];
            return <IconComp size={50} />;
        }
        return <FaIcons.FaQuestionCircle size={50} />;
    };

    return (
        <PublicLayout title={`PGM - ${icon.label}`}>
            <Head title={icon.label} />
            <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="container mx-auto px-4">
                    
                    {/* Header igual */}
                    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
                        <div className={`${icon.cor} p-8 flex items-center justify-center text-white`}>
                            {renderIcon(icon.icone)}
                        </div>
                        <div className="p-8 text-center">
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{icon.titulo}</h1>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        
                        {/* Coluna Esquerda: Conteúdo e Galeria */}
                        <div className="lg:col-span-2 space-y-8">
                            
                            {/* Bloco de Texto */}
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-l-4 border-blue-600 pl-3">
                                    Informações
                                </h2>
                                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                    {icon.conteudo}
                                </div>
                            </div>

                            {/* NOVA SEÇÃO: Galeria */}
                            {icon.imagens && icon.imagens.length > 0 && (
                                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-l-4 border-purple-600 pl-3 flex items-center gap-2">
                                        <FaImages /> Galeria
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {icon.imagens.map((img, idx) => (
                                            <div key={idx} className="rounded-lg overflow-hidden shadow-sm border dark:border-gray-700">
                                                <img 
                                                    src={`/storage/${img}`} 
                                                    alt={`Galeria ${idx}`} 
                                                    className="w-full h-auto object-cover hover:scale-105 transition duration-300"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Coluna Direita: Barra Lateral (Contatos/Links - igual ao original) */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg h-fit space-y-8">
                             {/* ... Conteúdo de Funcionamento e Contatos ... */}
                             {(icon.horario || icon.dias) && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b pb-2 dark:border-gray-700">Funcionamento</h3>
                                    <ul className="space-y-4">
                                        {icon.dias && <li className="text-gray-800 dark:text-white">{icon.dias}</li>}
                                        {icon.horario && <li className="text-gray-800 dark:text-white">{icon.horario}</li>}
                                    </ul>
                                </div>
                             )}
                             {/* ... renderize o resto dos contatos igual ao arquivo original ... */}
                        </div>

                    </div>
                    {/* Botão Voltar */}
                    <div className="mt-8 text-center"><button onClick={() => window.history.back()}>&larr; Voltar</button></div>
                </div>
            </div>
        </PublicLayout>
    );
}