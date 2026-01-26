import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function ContatoIndex() {
    const { data, setData, post, processing, reset, errors } = useForm({
        nome: '',
        email: '',
        celular: '',
        telefone_fixo: '',
        // Assuntos reais baseados na estrutura da PROGER
        assunto: 'Dívida Ativa (DECODAM)', 
        mensagem: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contato.send'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <PublicLayout>
            <Head title="Fale Conosco" />
            
            <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="container mx-auto px-6 max-w-6xl"> {/* Aumentei a largura para caber a sidebar */}
                    
                    <div className="flex flex-col lg:flex-row gap-10">
                        
                        {/* --- COLUNA 1: FORMULÁRIO (60-70% da tela) --- */}
                        <div className="flex-1 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-fit">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                Envie sua Solicitação
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                                Preencha o formulário abaixo para entrar em contato formalmente via e-mail.
                            </p>

                            <form onSubmit={submit} className="space-y-4">
                                {/* Campos Nome e Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="nome" value="Nome Completo" />
                                        <TextInput
                                            id="nome"
                                            className="mt-1 block w-full"
                                            value={data.nome}
                                            onChange={(e) => setData('nome', e.target.value)}
                                            required
                                        />
                                        {errors.nome && <div className="text-red-500 text-sm mt-1">{errors.nome}</div>}
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="email" value="Seu E-mail" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            className="mt-1 block w-full"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                                    </div>
                                </div>

                                {/* Telefones Opcionais */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="celular" value="Celular (Opcional)" />
                                        <TextInput
                                            id="celular"
                                            className="mt-1 block w-full"
                                            value={data.celular}
                                            onChange={(e) => setData('celular', e.target.value)}
                                            placeholder="(27) 99999-9999"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="telefone_fixo" value="Telefone Fixo (Opcional)" />
                                        <TextInput
                                            id="telefone_fixo"
                                            className="mt-1 block w-full"
                                            value={data.telefone_fixo}
                                            onChange={(e) => setData('telefone_fixo', e.target.value)}
                                            placeholder="(27) 3291-0000"
                                        />
                                    </div>
                                </div>

                                {/* Assunto Atualizado com Setores Reais */}
                                <div>
                                    <InputLabel htmlFor="assunto" value="Setor / Assunto" />
                                    <select
                                        id="assunto"
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                        value={data.assunto}
                                        onChange={(e) => setData('assunto', e.target.value)}
                                    >
                                        <option value="Dívida Ativa (DECODAM)">Dívida Ativa / Cobrança (DECODAM)</option>
                                        <option value="Cartório (CRCDD)">Processos e Distribuição (Cartório)</option>
                                        <option value="Gabinete">Gabinete / Administrativo</option>
                                        <option value="Contábil (NTC)">Núcleo Técnico-Contábil</option>
                                        <option value="Outros">Outros Assuntos</option>
                                    </select>
                                </div>

                                <div>
                                    <InputLabel htmlFor="mensagem" value="Mensagem" />
                                    <textarea
                                        id="mensagem"
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm h-32"
                                        value={data.mensagem}
                                        onChange={(e) => setData('mensagem', e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                <div className="flex justify-end">
                                    <PrimaryButton disabled={processing} className="w-full justify-center md:w-auto">
                                        {processing ? 'Enviando...' : 'Enviar Mensagem'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>

                        {/* --- COLUNA 2: SIDEBAR DE INFORMAÇÕES (NOVO) --- */}
                        <div className="w-full lg:w-1/3 space-y-6">
                            
                            {/* Card Dívida Ativa */}
                            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-100 dark:border-gray-700">
                                <h3 className="font-bold text-blue-800 dark:text-blue-300 text-lg mb-3 flex items-center gap-2">
                                    <FaPhoneAlt /> Dívida Ativa (DECODAM)
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Questões sobre cobranças, parcelamentos e débitos fiscais.</p>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <FaPhoneAlt className="text-blue-500" size={12}/> (27) 3291-2062
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 break-all">
                                        <FaEnvelope className="text-blue-500" size={12}/> decodam.proger@serra.es.gov.br
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-500 text-xs mt-2">
                                        <FaClock size={12}/> Atendimento: 08h às 17h (3º andar)
                                    </li>
                                </ul>
                            </div>

                            {/* Card Cartório */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg mb-3">Cartório e Processos</h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <FaPhoneAlt className="text-gray-400" size={12}/> (27) 3291-2073
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 break-all">
                                        <FaEnvelope className="text-gray-400" size={12}/> cartorio.progerserra.es@gmail.com
                                    </li>
                                    <li className="text-xs text-gray-500 mt-1 pl-5">3º andar - Prédio Anexo</li>
                                </ul>
                            </div>

                            {/* Card Geral / Endereço */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg mb-3">Sede Administrativa</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    <FaMapMarkerAlt className="inline mr-1 text-red-500"/>
                                    Rua Maestro Antônio Cícero, 111, Prédio Anexo, Caçaroca - Serra/ES
                                </p>
                                <div className="text-sm text-gray-700 dark:text-gray-300 border-t pt-3 dark:border-gray-700">
                                    <strong>Gabinete / GAOF:</strong><br/>
                                    (27) 3291-2067<br/>
                                    proger@serra.es.gov.br<br/>
                                    <span className="text-xs text-gray-500">4º andar - 08h às 18h</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}