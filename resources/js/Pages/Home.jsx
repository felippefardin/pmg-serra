import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
// Ícones importados (incluindo os novos para documentos)
import { 
    FaUserTie, FaUsers, FaCalendarAlt, FaNewspaper, FaScroll, FaTimes, 
    FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope, FaClock, 
    FaExternalLinkAlt, FaLink, FaImages, FaFileAlt, FaFileDownload 
} from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa'; 
import PublicLayout from '@/Layouts/PublicLayout';
import Modal from '@/Components/Modal';

export default function Home({ titulo, descricao, dynamicIcons }) {
    const { auth } = usePage().props;
    const [selectedIcon, setSelectedIcon] = useState(null);

    // 1. ÍCONES FIXOS (Originais)
    const staticItems = [
        { label: 'Procuradores', iconComponent: <FaUserTie size={40} />, link: '/procuradores', color: 'bg-blue-600' },
        { label: 'Assessores', iconComponent: <FaUsers size={40} />, link: '/assessores', color: 'bg-green-600' },
        { label: 'Programas, projetos e ações', iconComponent: <FaCalendarAlt size={40} />, link: '/eventos', color: 'bg-orange-500' },
        { label: 'Notícias', iconComponent: <FaNewspaper size={40} />, link: '/noticias', color: 'bg-indigo-600' },
        { label: 'Carta do Procurador', iconComponent: <FaScroll size={40} />, link: '/cartas', color: 'bg-red-700' },
    ];

    const handleDelete = (e, id) => {
        e.stopPropagation();
        if (confirm('Tem certeza que deseja remover este ícone?')) {
            router.delete(route('admin.home-icons.destroy', id));
        }
    };

    const renderDynamicIcon = (iconName, size = 40) => {
        if (iconName && FaIcons[iconName]) {
            const IconComp = FaIcons[iconName];
            return <IconComp size={size} />;
        }
        return <FaIcons.FaQuestionCircle size={size} />;
    };

    const closeModal = () => {
        setSelectedIcon(null);
    };

    return (
        <PublicLayout title="PGM Serra - Início">
            
            {/* HERO SECTION */}
            <div className="bg-white dark:bg-gray-800 py-8 shadow-sm transition-colors border-b border-gray-100 dark:border-gray-700 overflow-visible">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-start justify-start gap-12">
                    <div className="flex-shrink-0 pl-2 md:pl-0 relative z-10 self-center md:self-start">
                        <img 
                            src="/img/brasao_dois.png" 
                            alt="Brasão do Município da Serra" 
                            className="h-40 md:h-52 drop-shadow-2xl transition-transform scale-125 hover:scale-135 duration-300 object-contain"
                        />
                    </div>
                    <div className="text-left z-0 flex-1">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-blue-900 dark:text-white mb-4 border-b-4 border-blue-600 inline-block pb-2">
                            O que fazemos
                        </h3>
                        <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed text-justify">
                            <p>A Procuradoria Geral do Município da Serra - <strong>PROGER</strong>, tem sua estrutura, funcionalidade e atribuições traçadas na Lei Municipal nº 2.356/2000...</p>
                            <p>Também promove o exame de ordens e sentenças judiciais e orienta o prefeito os secretários e as demais autoridades. É sua função propor ação civil pública e zelar pela fiel observância e aplicação das leis, decretos, portarias e regulamentos existentes.</p>
                            <p>É ainda seu dever aprovar previamente as minutas dos editaisde licitação, contratos, acordos, convênios, ajustes e quaisquer outros instrumentos em que haja um acordo de vontades para formação de vínculo obrigacional, oneroso ou não, qualquer que seja a denominação dada aos mesmos, celebrados por quaisquer órgãos ou entidades municipais.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEÇÃO 1: ÍCONES FIXOS */}
            <div className="py-12 bg-gray-50 dark:bg-gray-900 transition-colors">
                <div className="container mx-auto px-4">
                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-6 border-l-4 border-blue-600 pl-3">
                        Acesso Rápido
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {staticItems.map((item, index) => (
                            <Link key={index} href={item.link} className="block bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-gray-700 h-full">
                                <div className={`${item.color} h-24 flex items-center justify-center text-white transition-colors`}>
                                    {item.iconComponent}
                                </div>
                                <div className="p-6 text-center">
                                    <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.label}</h4>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium group-hover:underline">Acessar &rarr;</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* SEÇÃO 2: ÍCONES DINÂMICOS */}
            {dynamicIcons && dynamicIcons.length > 0 && (
                <div className="py-12 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors">
                    <div className="container mx-auto px-4">
                        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-6 border-l-4 border-green-600 pl-3">
                            Informações e Serviços Adicionais
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                            {dynamicIcons.map((item, index) => (
                                <div key={index} className="relative group h-full">
                                    <div onClick={() => setSelectedIcon(item)} className="cursor-pointer block bg-gray-50 dark:bg-gray-900 rounded-xl shadow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-gray-700 h-full">
                                        <div className={`${item.cor} h-24 flex items-center justify-center text-white transition-colors`}>
                                            {renderDynamicIcon(item.icone)}
                                        </div>
                                        <div className="p-6 text-center">
                                            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{item.label}</h4>
                                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium group-hover:underline">Ver Detalhes &rarr;</span>
                                        </div>
                                    </div>
                                    {auth.user && (
                                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                                            <Link href={route('admin.home-icons.edit', item.id)} onClick={(e) => e.stopPropagation()} className="bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-50 transition transform hover:scale-110">
                                                <FaIcons.FaPen size={12} />
                                            </Link>
                                            <button onClick={(e) => handleDelete(e, item.id)} className="bg-white text-red-600 p-2 rounded-full shadow-lg hover:bg-red-50 transition transform hover:scale-110">
                                                <FaIcons.FaTrash size={12} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL DE INFORMAÇÕES */}
            <Modal show={!!selectedIcon} onClose={closeModal} maxWidth="2xl">
                {selectedIcon && (
                    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                        {/* Cabeçalho do Modal */}
                        <div className={`${selectedIcon.cor} p-6 flex items-center justify-between rounded-t-lg`}>
                            <div className="flex items-center gap-4 text-white">
                                <div className="p-2 bg-white/20 rounded-full">
                                    {renderDynamicIcon(selectedIcon.icone, 32)}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">{selectedIcon.titulo || selectedIcon.label}</h2>
                                    <p className="text-white/80 text-sm font-medium">{selectedIcon.label}</p>
                                </div>
                            </div>
                            <button onClick={closeModal} className="text-white hover:bg-white/20 p-2 rounded-full transition"><FaTimes size={24} /></button>
                        </div>

                        {/* Corpo do Modal */}
                        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                            
                            {/* 1. Conteúdo Principal (Texto) */}
                            {selectedIcon.conteudo && (
                                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                    {selectedIcon.conteudo}
                                </div>
                            )}

                            {/* 2. Links Externos */}
                            {selectedIcon.link_externo && Array.isArray(selectedIcon.link_externo) && selectedIcon.link_externo.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                        <FaLink className="text-blue-500" /> Links Úteis
                                    </h4>
                                    <ul className="space-y-2">
                                        {selectedIcon.link_externo.map((link, index) => (
                                            <li key={index}>
                                                <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 transition group">
                                                    <span className="font-medium text-blue-700 dark:text-blue-300 group-hover:underline">{link.nome}</span>
                                                    <FaExternalLinkAlt className="text-gray-400 group-hover:text-blue-500" size={12} />
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* 3. Informações Extras Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                {(selectedIcon.horario || selectedIcon.dias) && (
                                    <div className="col-span-1 md:col-span-2 flex items-start gap-3">
                                        <FaClock className="text-blue-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-white text-sm">Funcionamento</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {selectedIcon.dias && <span>{selectedIcon.dias}</span>}
                                                {selectedIcon.dias && selectedIcon.horario && <span> • </span>}
                                                {selectedIcon.horario && <span>{selectedIcon.horario}</span>}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {selectedIcon.endereco && (
                                    <div className="flex items-start gap-3 col-span-1 md:col-span-2">
                                        <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-white text-sm">Endereço</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{selectedIcon.endereco}</p>
                                        </div>
                                    </div>
                                )}
                                {selectedIcon.telefone && (
                                    <div className="flex items-center gap-3">
                                        <FaPhone className="text-green-600 flex-shrink-0" />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{selectedIcon.telefone}</span>
                                    </div>
                                )}
                                {selectedIcon.whatsapp && (
                                    <div className="flex items-center gap-3">
                                        <FaWhatsapp className="text-green-500 flex-shrink-0" />
                                        <a href={`https://wa.me/${selectedIcon.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">{selectedIcon.whatsapp}</a>
                                    </div>
                                )}
                                {selectedIcon.email && (
                                    <div className="flex items-center gap-3 md:col-span-2">
                                        <FaEnvelope className="text-gray-500 flex-shrink-0" />
                                        <a href={`mailto:${selectedIcon.email}`} className="text-sm text-blue-600 hover:underline">{selectedIcon.email}</a>
                                    </div>
                                )}
                            </div>
                            
                            {/* --------------------- 4. DOCUMENTOS ANEXADOS (NOVO) --------------------- */}
                            {selectedIcon.documentos && selectedIcon.documentos.length > 0 && (
                                <div className="mt-6 border-t dark:border-gray-700 pt-4">
                                    <h4 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                        <FaFileAlt className="text-orange-500" /> Documentos Anexados
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {selectedIcon.documentos.map((doc, index) => {
                                            // Lógica para suportar formato antigo (string) e novo (objeto)
                                            const url = typeof doc === 'string' ? doc : doc.url;
                                            const name = typeof doc === 'string' ? doc.split('/').pop() : doc.nome;
                                            
                                            return (
                                                <a 
                                                    key={index}
                                                    href={`/storage/${url}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 transition group"
                                                >
                                                    <FaFileDownload className="text-gray-400 group-hover:text-orange-500 flex-shrink-0" />
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate group-hover:text-orange-700 dark:group-hover:text-orange-300">
                                                        {name}
                                                    </span>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                           {/* 5. GALERIA DE IMAGENS */}
                                {selectedIcon.imagens && selectedIcon.imagens.length > 0 && (
                                    <div className="mt-6 border-t dark:border-gray-700 pt-4">
                                        <h4 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                            <FaImages className="text-purple-500" /> Galeria
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {selectedIcon.imagens.map((img, index) => (
                                                <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm aspect-[4/3]"> {/* Força aspecto 4:3 para combinar com o backend */}
                                                    <img 
                                                        src={`/storage/${img}`} 
                                                        alt={`Galeria ${index}`} 
                                                        className="w-full h-full object-cover hover:scale-110 transition duration-500" // object-cover é essencial
                                                    />
                                                    <a 
                                                        href={`/storage/${img}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white"
                                                        title="Ampliar Imagem"
                                                    >
                                                        <FaExternalLinkAlt size={20} />
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            {/* -------------------------------------------------------------------------- */}

                        </div>
                    </div>
                )}
            </Modal>
        </PublicLayout>
    );
}