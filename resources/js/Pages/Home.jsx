import React, { useEffect, useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import axios from 'axios';
import { 
    FaUserTie, FaUsers, FaCalendarAlt, FaNewspaper, FaScroll, FaTimes, 
    FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope, FaClock, 
    FaExternalLinkAlt, FaLink, FaImages, FaFileAlt, FaFileDownload,
    FaStar, FaRegStar, FaUserSecret, FaCheckCircle, FaQuestionCircle, FaChevronDown 
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
    const [openFaq, setOpenFaq] = useState(null);
    const [pjeData, setPjeData] = useState(null);

    // Estados para Avaliação
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [name, setName] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [showLgpdModal, setShowLgpdModal] = useState(false);
    const [processing, setProcessing] = useState(false);

    // Efeito para carregar dados do PJe
    useEffect(() => {
        axios.get(route('pje.tpu'))
            .then(res => setPjeData(res.data))
            .catch(err => console.error("PJe Offline", err));
    }, []);

    const faqs = [
        { q: "Como parcelar débitos de IPTU/Dívida Ativa?", a: "O parcelamento pode ser feito de forma online pelo Portal do Cidadão da Serra ou presencialmente no guichê da PGM na sede da prefeitura." },
        { q: "Como solicitar uma certidão negativa?", a: "As certidões podem ser emitidas através do site oficial da Prefeitura na aba 'Serviços' ou via processo administrativo." },
        { q: "Qual o horário de atendimento presencial?", a: "O atendimento ao público ocorre de segunda a sexta-feira, das 08h às 18h na sede administrativa." },
        { q: "O que é Dívida Ativa e como regularizar?", a: "Dívida Ativa são débitos (IPTU, ISS, multas) não pagos no prazo e enviados para cobrança jurídica. Você pode regularizar via Portal do Cidadão ou presencialmente no guichê da PGM na sede da prefeitura."},
        { q: "Recebi uma citação judicial de cobrança. O que devo fazer?", a: "Você deve procurar o Departamento de Dívida Ativa da PGM imediatamente para verificar o débito e as opções de parcelamento, evitando medidas como penhora de bens ou bloqueios bancários."},
        { q: "Como solicitar uma Certidão Negativa de Débitos (CND)?", a: "Se não houver pendências, a certidão é emitida na hora pelo site da Prefeitura. Caso existam débitos em Dívida Ativa, a regularização deve ser feita junto à PGM antes da emissão."},
        { q: "Onde posso consultar os pareceres jurídicos da PGM?", a: "Pareceres referenciais e orientações jurídicas consolidadas para consulta pública estão disponíveis no Portal da Transparência da Serra, garantindo o controle de legalidade."},
        { q: "Como entrar em contato com o setor de Dívida Ativa por telefone?", a: "Você pode ligar para o telefone geral da PGM no número (27) 3291-2067 e solicitar o ramal do setor de cobrança ou atendimento ao contribuinte."}
    ];

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

    const closeModal = () => setSelectedIcon(null);
    const handleStarClick = (starIndex) => setRating(starIndex);

    const handlePreSubmit = (e) => {
        e.preventDefault();
        if (rating === 0 || comment.trim() === '') {
            alert('Por favor, preencha a nota e o comentário.');
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
                setRating(0); setComment(''); setName(''); setIsAnonymous(false);
            },
            onError: () => setProcessing(false)
        });
    };

    return (
        <PublicLayout title="PGM Serra - Início">            
            
            {/* HERO SECTION */}
            <div className="bg-white dark:bg-gray-800 py-8 shadow-sm transition-colors border-b border-gray-100 dark:border-gray-700 overflow-visible">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-start justify-start gap-12">
                    <div className="flex-shrink-0 pl-2 md:pl-0 relative z-10 self-center md:self-start">
                        <a href="https://www.serra.es.gov.br/" target="_blank" rel="noopener noreferrer" className="block cursor-pointer transition-transform hover:scale-110">
                            <img src="/img/brasao_dois.png" alt="Brasão" className="h-40 md:h-52 drop-shadow-2xl scale-125 object-contain dark:invert dark:brightness-200" />
                        </a>
                    </div>
                    <div className="text-left z-0 flex-1">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-blue-900 dark:text-white mb-4 border-b-4 border-blue-600 inline-block pb-2">O que fazemos</h3>
                        <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed text-justify">
                            <p>A Procuradoria Geral do Município da Serra <strong>PROGER</strong>, tem sua estrutura, funcionalidade e atribuições traçadas na Lei Municipal nº 2.356/2000 — Estrutura Organizacional do Poder Executivo e na Lei Municipal nº 5.539/2022 – Lei Orgânica da Procuradoria Geral do Município, tendo como objetivo promover a defesa, em juízo ou fora dele, dos direitos e interesses do Município. Também promove o exame de ordens e sentenças judiciais e orienta o prefeito, os secretários e as demais autoridades. É sua função propor ação civil pública e zelar pela fiel observância e aplicação das leis, decretos, portarias e regulamentos existentes. É ainda seu dever aprovar previamente as minutas dos editais de licitação, contratos, acordos, convênios, ajustes e quaisquer outros instrumentos em que haja um acordo de vontade.</p>
                        </div>
                    </div>
                </div>
            </div>           

            {/* SEÇÃO 1: ÍCONES FIXOS (ACESSO RÁPIDO) */}
            <div className="py-12 bg-gray-50 dark:bg-gray-900 transition-colors">
                <div className="container mx-auto px-4">
                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-6 border-l-4 border-blue-600 pl-3 uppercase tracking-wider">Acesso Rápido</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {staticItems.map((item, index) => (
                            <Link key={index} href={item.link} className="block bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-gray-700 h-full">
                                <div className={`${item.color} h-24 flex items-center justify-center text-white transition-colors`}>{item.iconComponent}</div>
                                <div className="p-6 text-center">
                                    <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{item.label}</h4>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium group-hover:underline">Acessar →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* SEÇÃO 2: SERVIÇOS ADICIONAIS - ROLAGEM HORIZONTAL */}
            {dynamicIcons && dynamicIcons.length > 0 && (
                <div className="py-12 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors">
                    <div className="container mx-auto px-4">
                        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-6 border-l-4 border-green-600 pl-3 uppercase tracking-wider">Informações e Serviços Adicionais</h3>
                        <div className="flex overflow-x-auto pb-8 gap-6 custom-scrollbar snap-x touch-pan-x pt-4">
                            {dynamicIcons.map((item, index) => (
                                <div key={index} className="relative group flex-shrink-0 w-64 md:w-72 snap-start mb-2">
                                    <div onClick={() => setSelectedIcon(item)} className="cursor-pointer block bg-gray-50 dark:bg-gray-900 rounded-xl shadow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-gray-700 h-full">
                                        <div className={`${item.cor} h-24 flex items-center justify-center text-white transition-colors`}>{renderDynamicIcon(item.icone)}</div>
                                        <div className="p-6 text-center">
                                            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2 truncate px-2">{item.label}</h4>
                                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium group-hover:underline">Ver Detalhes →</span>
                                        </div>
                                    </div>
                                    {auth.user && (
                                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                            <Link href={route('admin.home-icons.edit', item.id)} onClick={(e) => e.stopPropagation()} className="bg-white text-blue-600 p-2 rounded-full shadow hover:bg-blue-50 transition transform hover:scale-110"><FaIcons.FaPen size={12} /></Link>
                                            <button onClick={(e) => handleDelete(e, item.id)} className="bg-white text-red-600 p-2 rounded-full shadow hover:bg-red-50 transition transform hover:scale-110"><FaIcons.FaTrash size={12} /></button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* SEÇÃO 3: PJE (INTEGRAÇÃO DINÂMICA) */}
            {pjeData && (
                <div className="py-12 bg-blue-50 dark:bg-gray-900 transition-colors border-y border-blue-100 dark:border-gray-700">
                    <div className="container mx-auto px-4">
                        <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-6 border-l-4 border-blue-900 pl-3 uppercase tracking-wider">Tribunal Virtual (PJe)</h3>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b dark:border-gray-700 text-gray-400 uppercase text-xs">
                                        <th className="pb-3">Código</th>
                                        <th className="pb-3">Descrição</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pjeData.map((item, i) => (
                                        <tr key={i} className="border-b dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                                            <td className="py-3 font-bold text-blue-600">{item.codigo}</td>
                                            <td className="py-3 text-gray-600 dark:text-gray-300">{item.descricao}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* SEÇÃO 4: AVALIAÇÕES E FEEDBACK */}
            <div className="py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-2">Transparência e Opinião</h3>
                        <p className="text-gray-500 dark:text-gray-400">Sua avaliação é importante para melhorarmos nosso atendimento ao cidadão.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Formulário */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <FaStar className="text-yellow-400" /> Deixe sua nota
                            </h4>
                            <form onSubmit={handlePreSubmit} className="space-y-4">
                                <div className="flex gap-2 mb-4">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <button key={i} type="button" onClick={() => handleStarClick(i)} onMouseEnter={() => setHoverRating(i)} onMouseLeave={() => setHoverRating(0)} className="text-4xl focus:outline-none transition-transform hover:scale-110">
                                            {i <= (hoverRating || rating) ? <FaStar className="text-yellow-400" /> : <FaRegStar className="text-gray-300 dark:text-gray-600" />}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <InputLabel value="Nome (Opcional)" />
                                        <TextInput className="w-full" value={name} onChange={(e) => setName(e.target.value)} disabled={isAnonymous} placeholder={isAnonymous ? "Modo Anônimo" : "Ex: João Silva"} />
                                    </div>
                                    <div className="flex items-end pb-3">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <Checkbox checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
                                            <span className="text-sm text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">Anônimo</span>
                                        </label>
                                    </div>
                                </div>
                                <textarea className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded-xl h-32 focus:ring-blue-500" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Como foi sua experiência no portal?" required></textarea>
                                <PrimaryButton disabled={processing} className="w-full justify-center py-4 shadow-blue-500/20 shadow-lg text-lg">Enviar Avaliação</PrimaryButton>
                            </form>
                        </div>

                        {/* Relatos Recentes */}
                        <div className="lg:sticky lg:top-24 self-start">
                            <h4 className="text-lg font-bold text-gray-800 dark:text-white border-l-4 border-yellow-400 pl-3 mb-4">Relatos Recentes</h4>
                            <div className="space-y-4 max-h-[550px] overflow-y-auto pr-4 custom-scrollbar">
                                {avaliacoes?.length > 0 ? avaliacoes.map((av) => (
                                    <div key={av.id} className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 p-2.5 rounded-full">
                                                    {av.anonimo ? <FaUserSecret size={18} /> : <FaUserTie size={18} />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-gray-800 dark:text-white">{av.anonimo ? 'Anônimo' : av.nome}</p>
                                                    <p className="text-[10px] text-gray-400 uppercase">{new Date(av.created_at).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex text-yellow-400 text-xs">
                                                {[...Array(5)].map((_, i) => (i < av.estrelas ? <FaStar key={i} /> : <FaRegStar key={i} />))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm italic">"{av.comentario}"</p>
                                    </div>
                                )) : (
                                    <div className="text-center py-20 text-gray-400 bg-white dark:bg-gray-800 rounded-2xl border-2 border-dashed dark:border-gray-700">
                                        <FaStar className="mx-auto text-5xl mb-4 opacity-10" />
                                        <p>Nenhuma avaliação recebida ainda.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEÇÃO 5: FAQ */}
            <div className="py-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-2 flex justify-center items-center gap-3">
                            <FaQuestionCircle className="text-blue-600" /> Perguntas Frequentes
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">Encontre respostas rápidas para as principais dúvidas sobre os serviços da PGM.</p>
                    </div>
                    
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
                                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full text-left p-5 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                    <span className="font-bold text-gray-700 dark:text-gray-200">{faq.q}</span>
                                    <span className={`text-blue-600 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}><FaChevronDown /></span>
                                </button>
                                {openFaq === idx && (
                                    <div className="p-5 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-950/40 border-t border-gray-100 dark:border-gray-700 leading-relaxed italic">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MODAIS */}
            <Modal show={showLgpdModal} onClose={() => setShowLgpdModal(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-bold dark:text-gray-100 flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Consentimento LGPD</h2>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Ao clicar em confirmar, você autoriza a PGM Serra a exibir sua nota e comentário publicamente para fins de transparência administrativa.</p>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setShowLgpdModal(false)}>Cancelar</SecondaryButton>
                        <PrimaryButton onClick={confirmSubmit} disabled={processing}>Concordo e Enviar</PrimaryButton>
                    </div>
                </div>
            </Modal>

            <Modal show={!!selectedIcon} onClose={closeModal} maxWidth="2xl">
                {selectedIcon && (
                    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                        <div className={`${selectedIcon.cor} p-6 flex items-center justify-between rounded-t-lg text-white shadow-lg`}>
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-white/20 rounded-full">{renderDynamicIcon(selectedIcon.icone, 32)}</div>
                                <div>
                                    <h2 className="text-2xl font-bold">{selectedIcon.titulo || selectedIcon.label}</h2>
                                    <p className="text-white/80 text-xs font-medium uppercase tracking-widest">{selectedIcon.label}</p>
                                </div>
                            </div>
                            <button onClick={closeModal} className="hover:bg-white/20 p-2 rounded-full transition"><FaTimes size={24} /></button>
                        </div>
                        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                            {selectedIcon.conteudo && <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 whitespace-pre-line text-justify">{selectedIcon.conteudo}</div>}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-gray-50 dark:bg-gray-900/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-700">
                                {selectedIcon.horario && (
                                    <div className="col-span-2 flex gap-3 items-center">
                                        <FaClock className="text-blue-500" />
                                        <p className="text-sm font-medium">{selectedIcon.dias} • {selectedIcon.horario}</p>
                                    </div>
                                )}
                                {selectedIcon.endereco && (
                                    <a href={`https://www.google.com/maps/search/${encodeURIComponent(selectedIcon.endereco + ' Serra ES')}`} target="_blank" rel="noopener noreferrer" className="col-span-2 flex items-start gap-4 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-blue-100 dark:border-blue-900/30 hover:border-blue-500 transition-all group">
                                        <FaMapMarkerAlt className="text-red-500 mt-1" size={20} />
                                        <div>
                                            <h4 className="font-bold text-xs uppercase text-blue-600 group-hover:underline">Ver localização no Google Maps</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{selectedIcon.endereco}</p>
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </PublicLayout>
    );
}