import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
// Ícones importados
import { 
    FaUserTie, FaUsers, FaCalendarAlt, FaNewspaper, FaScroll, FaTimes, 
    FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope, FaClock, 
    FaExternalLinkAlt, FaLink, FaImages, FaFileAlt, FaFileDownload,
    FaStar, FaRegStar, FaUserSecret, FaCheckCircle 
} from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa'; 
import PublicLayout from '@/Layouts/PublicLayout';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Home({ titulo, descricao, dynamicIcons, avaliacoes }) {
    const { auth } = usePage().props;
    const [selectedIcon, setSelectedIcon] = useState(null);

    // Estados para Avaliação
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [name, setName] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [showLgpdModal, setShowLgpdModal] = useState(false);
    const [processing, setProcessing] = useState(false);

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

    // LÓGICA DE AVALIAÇÃO
    const handleStarClick = (starIndex) => {
        setRating(starIndex);
    };

    const handlePreSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Por favor, selecione uma nota de 1 a 5 estrelas.');
            return;
        }
        if (comment.trim() === '') {
            alert('Por favor, escreva um comentário.');
            return;
        }
        setShowLgpdModal(true);
    };

    const confirmSubmit = () => {
        setProcessing(true);
        router.post(route('avaliacao.store'), {
            estrelas: rating,
            comentario: comment,
            nome: isAnonymous ? 'Anônimo' : name,
            anonimo: isAnonymous
        }, {
            onSuccess: () => {
                setProcessing(false);
                setShowLgpdModal(false);
                setRating(0);
                setComment('');
                setName('');
                setIsAnonymous(false);
            },
            onError: () => {
                setProcessing(false);
                setShowLgpdModal(false);
            }
        });
    };

    return (
        <PublicLayout title="PGM Serra - Início">            
            
            {/* HERO SECTION */}
            <div className="bg-white dark:bg-gray-800 py-8 shadow-sm transition-colors border-b border-gray-100 dark:border-gray-700 overflow-visible">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-start justify-start gap-12">
                    <div className="flex-shrink-0 pl-2 md:pl-0 relative z-10 self-center md:self-start">
                        <a 
                            href="https://www.serra.es.gov.br/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block cursor-pointer"
                        >
                            <img 
                                src="/img/brasao_dois.png" 
                                alt="Brasão do Município da Serra" 
                                className="h-40 md:h-52 drop-shadow-2xl transition-transform scale-125 hover:scale-135 duration-300 object-contain dark:invert dark:brightness-200"
                            />
                        </a>
                    </div>
                    <div className="text-left z-0 flex-1">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-blue-900 dark:text-white mb-4 border-b-4 border-blue-600 inline-block pb-2">
                            O que fazemos
                        </h3>
                        <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed text-justify">
                            <p>A Procuradoria Geral do Município da Serra - <strong>PROGER</strong>, tem sua estrutura, funcionalidade e atribuições traçadas na Lei Municipal nº 2.356/2000...</p>
                            <p>Também promove o exame de ordens e sentenças judiciais e orienta o prefeito os secretários e as demais autoridades. É sua função propor ação civil pública e zelar pela fiel observância e aplicação das leis, decretos, portarias e regulamentos existentes.</p>
                            <p>É ainda seu dever aprovar previamente as minutas dos editais de licitação, contratos, acordos, convênios e ajustes.</p>
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

            {/* SEÇÃO 2: ÍCONES DINÂMICOS - ROLAGEM HORIZONTAL E INTERAÇÃO IGUALADA */}
            {dynamicIcons && dynamicIcons.length > 0 && (
                <div className="py-12 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors">
                    <div className="container mx-auto px-4">
                        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-6 border-l-4 border-green-600 pl-3">
                            Informações e Serviços Adicionais
                        </h3>
                        
                        <div className="flex overflow-x-auto pb-8 gap-6 custom-scrollbar snap-x touch-pan-x pt-4">
                            {dynamicIcons.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="relative group flex-shrink-0 w-64 md:w-72 snap-start mb-2"
                                >
                                    <div 
                                        onClick={() => setSelectedIcon(item)} 
                                        className="cursor-pointer block bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-gray-700 h-full"
                                    >
                                        <div className={`${item.cor} h-24 flex items-center justify-center text-white transition-colors`}>
                                            {renderDynamicIcon(item.icone)}
                                        </div>
                                        <div className="p-6 text-center">
                                            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2 truncate px-2">{item.label}</h4>
                                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium group-hover:underline">Ver Detalhes &rarr;</span>
                                        </div>
                                    </div>
                                    {auth.user && (
                                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                                            <Link 
                                                href={route('admin.home-icons.edit', item.id)} 
                                                onClick={(e) => e.stopPropagation()} 
                                                className="bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-50 transition transform hover:scale-110"
                                            >
                                                <FaIcons.FaPen size={12} />
                                            </Link>
                                            <button 
                                                onClick={(e) => handleDelete(e, item.id)} 
                                                className="bg-white text-red-600 p-2 rounded-full shadow-lg hover:bg-red-50 transition transform hover:scale-110"
                                            >
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

            {/* SEÇÃO 3: AVALIAÇÕES E FEEDBACK */}
            <div className="py-12 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Formulário de Avaliação */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                                <FaStar className="text-yellow-400" /> Avalie nosso Portal
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                                Sua opinião é fundamental para melhorarmos nossos serviços.
                            </p>

                            <form onSubmit={handlePreSubmit} className="space-y-4">
                                <div>
                                    <InputLabel value="Sua nota:" className="mb-2" />
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => handleStarClick(index)}
                                                onMouseEnter={() => setHoverRating(index)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className="text-3xl transition-transform hover:scale-110 focus:outline-none"
                                            >
                                                {index <= (hoverRating || rating) ? (
                                                    <FaStar className="text-yellow-400" />
                                                ) : (
                                                    <FaRegStar className="text-gray-300 dark:text-gray-600" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <InputLabel htmlFor="name" value="Seu Nome (Opcional)" />
                                        <TextInput
                                            id="name"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            disabled={isAnonymous}
                                            placeholder={isAnonymous ? "Modo Anônimo Ativado" : "Digite seu nome"}
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <label className="flex items-center">
                                            <Checkbox
                                                name="anonymous"
                                                checked={isAnonymous}
                                                onChange={(e) => setIsAnonymous(e.target.checked)}
                                            />
                                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Enviar Anonimamente</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="comment" value="Seu Comentário" />
                                    <textarea
                                        id="comment"
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm h-32"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Conte-nos sua experiência..."
                                        required
                                    ></textarea>
                                </div>

                                <PrimaryButton disabled={processing} className="w-full justify-center py-3">
                                    Enviar Avaliação
                                </PrimaryButton>
                            </form>
                        </div>

                        {/* Lista de Avaliações Aprovadas */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-6 border-l-4 border-yellow-400 pl-3">
                                Últimas Avaliações
                            </h3>
                            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                {avaliacoes && avaliacoes.length > 0 ? (
                                    avaliacoes.map((av) => (
                                        <div key={av.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    {av.anonimo ? (
                                                        <div className="bg-gray-200 p-2 rounded-full"><FaUserSecret /></div>
                                                    ) : (
                                                        <div className="bg-blue-100 text-blue-600 p-2 rounded-full font-bold text-xs">
                                                            {av.nome ? av.nome.substring(0,2).toUpperCase() : 'US'}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-bold text-gray-800 dark:text-white text-sm">
                                                            {av.anonimo ? 'Anônimo' : av.nome}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {new Date(av.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex text-yellow-400 text-sm">
                                                    {[...Array(5)].map((_, i) => (
                                                        i < av.estrelas ? <FaStar key={i} /> : <FaRegStar key={i} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm italic text-justify">
                                                "{av.comentario}"
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 text-gray-500">
                                        <FaStar className="mx-auto text-4xl mb-3 opacity-20" />
                                        <p>Seja o primeiro a avaliar!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL LGPD */}
            <Modal show={showLgpdModal} onClose={() => setShowLgpdModal(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <FaCheckCircle className="text-green-600" /> Consentimento de Dados (LGPD)
                    </h2>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-justify">
                        Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), informamos que ao enviar esta avaliação, você concorda que seu comentário e nota poderão ser publicados publicamente neste portal após moderação.
                    </p>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setShowLgpdModal(false)}>Cancelar</SecondaryButton>
                        <PrimaryButton onClick={confirmSubmit} disabled={processing}>Concordo e Enviar</PrimaryButton>
                    </div>
                </div>
            </Modal>

            {/* MODAL DE INFORMAÇÕES */}
            <Modal show={!!selectedIcon} onClose={closeModal} maxWidth="2xl">
                {selectedIcon && (
                    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                        <div className={`${selectedIcon.cor} p-6 flex items-center justify-between rounded-t-lg text-white`}>
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-white/20 rounded-full">
                                    {renderDynamicIcon(selectedIcon.icone, 32)}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">{selectedIcon.titulo || selectedIcon.label}</h2>
                                    <p className="text-white/80 text-sm font-medium">{selectedIcon.label}</p>
                                </div>
                            </div>
                            <button onClick={closeModal} className="hover:bg-white/20 p-2 rounded-full transition"><FaTimes size={24} /></button>
                        </div>

                        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                            {selectedIcon.conteudo && (
                                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line text-justify">
                                    {selectedIcon.conteudo}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                {(selectedIcon.horario || selectedIcon.dias) && (
                                    <div className="col-span-1 md:col-span-2 flex items-start gap-3">
                                        <FaClock className="text-blue-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-sm">Funcionamento</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {selectedIcon.dias} {selectedIcon.horario && `• ${selectedIcon.horario}`}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {selectedIcon.endereco && (
                                    <div className="flex items-start gap-3 col-span-1 md:col-span-2">
                                        <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-sm">Endereço</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{selectedIcon.endereco}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Documentos */}
                            {selectedIcon.documentos && selectedIcon.documentos.length > 0 && (
                                <div className="mt-6 border-t dark:border-gray-700 pt-4">
                                    <h4 className="font-bold mb-3 flex items-center gap-2"><FaFileAlt className="text-orange-500" /> Documentos</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {selectedIcon.documentos.map((doc, idx) => (
                                            <a key={idx} href={`/storage/${typeof doc === 'string' ? doc : doc.url}`} target="_blank" className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-orange-50 border border-gray-200 dark:border-gray-600 transition group">
                                                <FaFileDownload className="text-gray-400 group-hover:text-orange-500" />
                                                <span className="text-sm truncate">{typeof doc === 'string' ? doc.split('/').pop() : doc.nome}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Galeria */}
                            {selectedIcon.imagens && selectedIcon.imagens.length > 0 && (
                                <div className="mt-6 border-t dark:border-gray-700 pt-4">
                                    <h4 className="font-bold mb-3 flex items-center gap-2"><FaImages className="text-purple-500" /> Galeria</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {selectedIcon.imagens.map((img, idx) => (
                                            <div key={idx} className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 aspect-[4/3]">
                                                <img src={`/storage/${img}`} alt="Galeria" className="w-full h-full object-cover hover:scale-110 transition duration-500" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </PublicLayout>
    );
}