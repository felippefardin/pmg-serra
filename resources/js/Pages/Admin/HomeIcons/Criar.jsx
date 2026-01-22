import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaTrash, FaPlus, FaImages, FaFileAlt } from 'react-icons/fa';

export default function CriarIcone({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        label: '',
        icone: 'FaUserTie',
        cor: 'bg-blue-600',
        titulo: '',
        conteudo: '',
        horario: '',
        dias: '',
        telefone: '',
        whatsapp: '',
        email: '',
        endereco: '',
        link_externo: [], 
        imagens: [], 
        documentos: [] // Agora será uma lista de objetos: { nome: '', arquivo: null }
    });

    const iconOptions = [
        'FaUserTie', 'FaUsers', 'FaCalendarAlt', 'FaNewspaper', 
        'FaScroll', 'FaInfoCircle', 'FaPhone', 'FaGavel', 
        'FaMapMarkerAlt', 'FaEnvelope', 'FaClock', 'FaBuilding',
        'FaWhatsapp', 'FaGlobe'
    ];

    const colors = [
        'bg-blue-600', 'bg-green-600', 'bg-orange-500', 
        'bg-indigo-600', 'bg-red-700', 'bg-purple-600', 'bg-gray-600', 'bg-pink-600', 'bg-teal-500'
    ];

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.home-icons.store'));
    };

    // --- Funções para Gerenciar Links ---
    const addLink = () => {
        setData('link_externo', [...data.link_externo, { nome: '', url: '' }]);
    };

    const removeLink = (index) => {
        const newLinks = [...data.link_externo];
        newLinks.splice(index, 1);
        setData('link_externo', newLinks);
    };

    const updateLink = (index, field, value) => {
        const newLinks = [...data.link_externo];
        newLinks[index][field] = value;
        setData('link_externo', newLinks);
    };

    // --- Funções para Gerenciar Documentos (Com Nome) ---
    const addDocumento = () => {
        // Adiciona um objeto vazio para o novo documento
        setData('documentos', [...data.documentos, { nome: '', arquivo: null }]);
    };

    const removeDocumento = (index) => {
        const newDocs = [...data.documentos];
        newDocs.splice(index, 1);
        setData('documentos', newDocs);
    };

    const updateDocumento = (index, field, value) => {
        const newDocs = [...data.documentos];
        newDocs[index][field] = value;
        setData('documentos', newDocs);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Novo Ícone da Home</h2>}
        >
            <Head title="Criar Ícone" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        
                        <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
                            
                            {/* DADOS PRINCIPAIS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">Nome do Botão</label>
                                    <input 
                                        type="text" className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2" 
                                        value={data.label} onChange={e => setData('label', e.target.value)} placeholder="Ex: Whatsapp da Saúde"
                                    />
                                    {errors.label && <div className="text-red-500 text-sm mt-1">{errors.label}</div>}
                                </div>

                                <div>
                                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">Ícone</label>
                                    <select 
                                        className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2"
                                        value={data.icone} onChange={e => setData('icone', e.target.value)}
                                    >
                                        {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">Título da Página Interna</label>
                                <input 
                                    type="text" className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2" 
                                    value={data.titulo} onChange={e => setData('titulo', e.target.value)}
                                />
                                {errors.titulo && <div className="text-red-500 text-sm mt-1">{errors.titulo}</div>}
                            </div>

                            <div>
                                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">Texto / Conteúdo</label>
                                <textarea 
                                    className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2 h-32" 
                                    value={data.conteudo} onChange={e => setData('conteudo', e.target.value)}
                                />
                                {errors.conteudo && <div className="text-red-500 text-sm mt-1">{errors.conteudo}</div>}
                            </div>

                            {/* --- SEÇÃO DE IMAGENS --- */}
                            <div className="border-t pt-4 dark:border-gray-700">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <FaImages className="text-blue-500" /> Galeria de Imagens
                                </h3>
                                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">Selecione as imagens</label>
                                    <input 
                                        type="file" 
                                        multiple 
                                        accept="image/*"
                                        onChange={e => setData('imagens', e.target.files)} 
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-200"
                                    />
                                    {errors.imagens && <div className="text-red-500 text-sm mt-1">{errors.imagens}</div>}
                                </div>
                            </div>
                            
                            {/* --- NOVA SEÇÃO DE DOCUMENTOS (COM NOME) --- */}
                            <div className="border-t pt-4 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                        <FaFileAlt className="text-orange-500" /> Anexos / Documentos
                                    </h3>
                                    <button 
                                        type="button" 
                                        onClick={addDocumento}
                                        className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-sm px-3 py-1.5 rounded transition"
                                    >
                                        <FaPlus size={12} /> Adicionar Doc
                                    </button>
                                </div>

                                <div className="space-y-3 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                    {data.documentos.length === 0 && (
                                        <p className="text-sm text-gray-500 text-center italic">Nenhum documento adicionado.</p>
                                    )}
                                    
                                    {data.documentos.map((doc, index) => (
                                        <div key={index} className="flex flex-col md:flex-row gap-3 items-start bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
                                            
                                            {/* Nome do Documento */}
                                            <div className="flex-1 w-full">
                                                <label className="block text-xs font-bold text-gray-500 mb-1">Nome de Exibição</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="Ex: Edital 001/2024"
                                                    className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded px-2 py-1 text-sm"
                                                    value={doc.nome} 
                                                    onChange={(e) => updateDocumento(index, 'nome', e.target.value)}
                                                />
                                            </div>

                                            {/* Input Arquivo */}
                                            <div className="flex-1 w-full">
                                                <label className="block text-xs font-bold text-gray-500 mb-1">Arquivo (PDF, DOC, ZIP...)</label>
                                                <input 
                                                    type="file" 
                                                    className="w-full text-sm text-gray-500 border border-gray-300 dark:border-gray-700 rounded p-1"
                                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
                                                    onChange={(e) => updateDocumento(index, 'arquivo', e.target.files[0])} 
                                                />
                                            </div>

                                            <button 
                                                type="button" 
                                                onClick={() => removeDocumento(index)}
                                                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded transition mt-4 md:mt-0"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {errors.documentos && <div className="text-red-500 text-sm mt-1">{errors.documentos}</div>}
                            </div>
                            {/* ----------------------------- */}

                            {/* SEÇÃO DE LINKS ÚTEIS (MÚLTIPLOS) */}
                            <div className="border-t pt-4 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Links Úteis e Externos</h3>
                                    <button 
                                        type="button" 
                                        onClick={addLink}
                                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1.5 rounded transition"
                                    >
                                        <FaPlus size={12} /> Adicionar Link
                                    </button>
                                </div>

                                <div className="space-y-3 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                    {data.link_externo.length === 0 && (
                                        <p className="text-sm text-gray-500 text-center italic">Nenhum link adicionado.</p>
                                    )}
                                    
                                   {data.link_externo.map((link, index) => (
                                    <div key={index} className="flex flex-col md:flex-row gap-3 items-start bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
                                        
                                        {/* Campo Nome */}
                                        <div className="flex-1 w-full">
                                            <label className="block text-xs font-bold text-gray-500 mb-1">Nome do Link</label>
                                            <input 
                                                type="text" 
                                                className={`w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded px-2 py-1 text-sm ${errors[`link_externo.${index}.nome`] ? 'border-red-500' : ''}`}
                                                value={link.nome}
                                                onChange={(e) => updateLink(index, 'nome', e.target.value)}
                                            />
                                            {errors[`link_externo.${index}.nome`] && (
                                                <div className="text-red-500 text-xs mt-1">O nome é obrigatório.</div>
                                            )}
                                        </div>

                                        {/* Campo URL */}
                                        <div className="flex-1 w-full">
                                            <label className="block text-xs font-bold text-gray-500 mb-1">URL (Endereço)</label>
                                            <input 
                                                type="text" 
                                                className={`w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded px-2 py-1 text-sm ${errors[`link_externo.${index}.url`] ? 'border-red-500' : ''}`}
                                                value={link.url}
                                                onChange={(e) => updateLink(index, 'url', e.target.value)}
                                            />
                                            {errors[`link_externo.${index}.url`] && (
                                                <div className="text-red-500 text-xs mt-1">URL inválida (use http://...).</div>
                                            )}
                                        </div>

                                        <button 
                                            type="button" 
                                            onClick={() => removeLink(index)}
                                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded transition mt-4 md:mt-0"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                ))}
                                </div>
                                {errors.link_externo && <div className="text-red-500 text-xs mt-1">{errors.link_externo}</div>}
                            </div>

                            {/* FUNCIONAMENTO */}
                            <div className="border-t pt-4 dark:border-gray-700">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Funcionamento</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Dias</label>
                                        <input type="text" className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2" 
                                            value={data.dias} onChange={e => setData('dias', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Horário</label>
                                        <input type="text" className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2" 
                                            value={data.horario} onChange={e => setData('horario', e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            {/* CONTATOS */}
                            <div className="border-t pt-4 dark:border-gray-700">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Contatos</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Telefone</label>
                                        <input type="text" className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2" 
                                            value={data.telefone} onChange={e => setData('telefone', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">WhatsApp</label>
                                        <input type="text" className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2" 
                                            value={data.whatsapp} onChange={e => setData('whatsapp', e.target.value)} placeholder="Ex: 27999998888" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                        <input type="email" className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2" 
                                            value={data.email} onChange={e => setData('email', e.target.value)} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Endereço</label>
                                        <input type="text" className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2" 
                                            value={data.endereco} onChange={e => setData('endereco', e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            {/* CORES */}
                            <div>
                                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">Cor do Ícone</label>
                                <div className="flex flex-wrap gap-3">
                                    {colors.map(color => (
                                        <div 
                                            key={color} onClick={() => setData('cor', color)}
                                            className={`w-10 h-10 rounded-full cursor-pointer shadow-sm transition-transform hover:scale-110 ${color} ${data.cor === color ? 'ring-4 ring-offset-2 ring-gray-400' : ''}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-4 border-t dark:border-gray-700">
                                <button type="button" onClick={() => window.history.back()} className="px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 transition">Cancelar</button>
                                <button disabled={processing} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow">
                                    {processing ? 'Salvar' : 'Salvar'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}