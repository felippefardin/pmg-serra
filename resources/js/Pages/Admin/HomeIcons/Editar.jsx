import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaTrash, FaPlus, FaImages, FaUndo, FaFileAlt, FaFileDownload } from 'react-icons/fa';

export default function EditarIcone({ auth, icon }) {
    const initialLinks = Array.isArray(icon.link_externo) ? icon.link_externo : [];

    // Normaliza documentos existentes (para suportar formato antigo 'string' e novo 'objeto')
    const initialDocs = (icon.documentos || []).map(doc => {
        if (typeof doc === 'string') {
            return { nome: doc.split('/').pop(), url: doc }; // Formato antigo
        }
        return doc; // Novo formato { nome: '...', url: '...' }
    });

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT', 
        label: icon.label || '',
        icone: icon.icone || 'FaUserTie',
        cor: icon.cor || 'bg-blue-600',
        titulo: icon.titulo || '',
        conteudo: icon.conteudo || '',
        horario: icon.horario || '', 
        dias: icon.dias || '',       
        telefone: icon.telefone || '',
        whatsapp: icon.whatsapp || '', 
        email: icon.email || '',
        endereco: icon.endereco || '',
        link_externo: initialLinks,
        
        imagens: [], 
        imagens_removidas: [],

        // Novos documentos a enviar (Nome + Arquivo)
        documentos: [], 
        // Documentos existentes a remover (armazena a URL)
        documentos_removidos: [] 
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
        post(route('admin.home-icons.update', icon.id));
    };

    // --- Links ---
    const addLink = () => setData('link_externo', [...data.link_externo, { nome: '', url: '' }]);
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

    // --- Imagens ---
    const markImageForRemoval = (path) => {
        if (!data.imagens_removidas.includes(path)) setData('imagens_removidas', [...data.imagens_removidas, path]);
    };
    const undoImageRemoval = (path) => setData('imagens_removidas', data.imagens_removidas.filter(p => p !== path));

    // --- Documentos Existentes (Gerenciamento) ---
    const markDocForRemoval = (url) => {
        if (!data.documentos_removidos.includes(url)) setData('documentos_removidos', [...data.documentos_removidos, url]);
    };
    const undoDocRemoval = (url) => setData('documentos_removidos', data.documentos_removidos.filter(p => p !== url));

    // --- Novos Documentos (Upload com Nome) ---
    const addDocumento = () => {
        setData('documentos', [...data.documentos, { nome: '', arquivo: null }]);
    };

    const removeNewDocumento = (index) => {
        const newDocs = [...data.documentos];
        newDocs.splice(index, 1);
        setData('documentos', newDocs);
    };

    const updateNewDocumento = (index, field, value) => {
        const newDocs = [...data.documentos];
        newDocs[index][field] = value;
        setData('documentos', newDocs);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Editar Ícone</h2>}
        >
            <Head title="Editar Ícone" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        
                        <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
                            
                            {/* CAMPOS PRINCIPAIS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">Nome do Botão</label>
                                    <input type="text" className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2" 
                                        value={data.label} onChange={e => setData('label', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">Ícone</label>
                                    <select className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2"
                                        value={data.icone} onChange={e => setData('icone', e.target.value)}>
                                        {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">Título da Página Interna</label>
                                <input type="text" className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2" 
                                    value={data.titulo} onChange={e => setData('titulo', e.target.value)} />
                            </div>

                            <div>
                                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">Texto / Conteúdo</label>
                                <textarea className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2 h-32" 
                                    value={data.conteudo} onChange={e => setData('conteudo', e.target.value)} />
                            </div>

                            {/* --- SEÇÃO DE IMAGENS --- */}
                            <div className="border-t pt-4 dark:border-gray-700">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <FaImages className="text-blue-500" /> Galeria de Imagens
                                </h3>
                                {icon.imagens && icon.imagens.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                        {icon.imagens.map((img, idx) => {
                                            const isRemoved = data.imagens_removidas.includes(img);
                                            return (
                                                <div key={idx} className={`relative group border rounded-lg overflow-hidden ${isRemoved ? 'opacity-50 grayscale' : ''}`}>
                                                    <img src={`/storage/${img}`} alt={`Imagem ${idx}`} className="w-full h-32 object-cover" />
                                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                                        {isRemoved ? (
                                                            <button type="button" onClick={() => undoImageRemoval(img)} className="bg-green-600 text-white p-2 rounded-full text-xs flex gap-1"><FaUndo /> Restaurar</button>
                                                        ) : (
                                                            <button type="button" onClick={() => markImageForRemoval(img)} className="bg-red-600 text-white p-2 rounded-full text-xs flex gap-1"><FaTrash /> Remover</button>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">Adicionar Imagens</label>
                                    <input type="file" multiple accept="image/*" onChange={e => setData('imagens', e.target.files)} className="w-full text-sm text-gray-500" />
                                </div>
                            </div>

                            {/* --- SEÇÃO DE DOCUMENTOS --- */}
                            <div className="border-t pt-4 dark:border-gray-700">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <FaFileAlt className="text-orange-500" /> Documentos Anexados
                                </h3>
                                
                                {/* 1. Lista de Documentos Já Salvos (Exibição Normalizada) */}
                                {initialDocs.length > 0 && (
                                    <div className="space-y-2 mb-4">
                                        {initialDocs.map((doc, idx) => {
                                            // Usamos doc.url para controlar a remoção
                                            const isRemoved = data.documentos_removidos.includes(doc.url);
                                            return (
                                                <div key={idx} className={`flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border ${isRemoved ? 'border-red-300 opacity-60' : 'border-gray-200 dark:border-gray-700'}`}>
                                                    <div className="flex items-center gap-3 overflow-hidden">
                                                        <FaFileDownload className="text-gray-500 flex-shrink-0" />
                                                        <div className="flex flex-col min-w-0">
                                                            {/* Exibe o Nome Salvo ou o Nome do Arquivo */}
                                                            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">{doc.nome}</span>
                                                            <a href={`/storage/${doc.url}`} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline truncate max-w-xs dark:text-blue-400">
                                                                {doc.url.split('/').pop()}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    
                                                    {isRemoved ? (
                                                        <button type="button" onClick={() => undoDocRemoval(doc.url)} className="text-green-600 hover:text-green-800 text-sm font-bold flex items-center gap-1">
                                                            <FaUndo /> Restaurar
                                                        </button>
                                                    ) : (
                                                        <button type="button" onClick={() => markDocForRemoval(doc.url)} className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1">
                                                            <FaTrash /> Remover
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* 2. Adicionar Novos Documentos (Lista Dinâmica) */}
                                <div className="space-y-3 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block font-bold text-gray-700 dark:text-gray-300">Adicionar Novos Documentos</label>
                                        <button type="button" onClick={addDocumento} className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs px-2 py-1 rounded transition">
                                            <FaPlus size={10} /> Add Doc
                                        </button>
                                    </div>
                                    
                                    {data.documentos.map((doc, index) => (
                                        <div key={index} className="flex flex-col md:flex-row gap-3 items-start bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
                                            <div className="flex-1 w-full">
                                                <input type="text" placeholder="Nome do Documento (Ex: Edital)"
                                                    className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded px-2 py-1 text-sm"
                                                    value={doc.nome} onChange={(e) => updateNewDocumento(index, 'nome', e.target.value)}
                                                />
                                            </div>
                                            <div className="flex-1 w-full">
                                                <input type="file" 
                                                    className="w-full text-sm text-gray-500 border border-gray-300 dark:border-gray-700 rounded p-1"
                                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
                                                    onChange={(e) => updateNewDocumento(index, 'arquivo', e.target.files[0])}
                                                />
                                            </div>
                                            <button type="button" onClick={() => removeNewDocumento(index)} className="text-red-500 hover:text-red-700 mt-1 md:mt-0">
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    {data.documentos.length === 0 && <p className="text-xs text-gray-500 italic text-center">Clique em "Add Doc" para inserir novos arquivos.</p>}
                                </div>
                            </div>

                            {/* LINKS, FUNCIONAMENTO E CONTATOS (Simplificado visualmente, mantendo lógica) */}
                            <div className="border-t pt-4 dark:border-gray-700 mt-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Outras Informações</h3>
                                
                                {/* Links Externos */}
                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Links Úteis</label>
                                        <button type="button" onClick={addLink} className="text-green-600 hover:text-green-800 text-xs font-bold flex gap-1"><FaPlus /> Add Link</button>
                                    </div>
                                    {data.link_externo.map((link, index) => (
                                        <div key={index} className="flex gap-2 mb-2">
                                            <input type="text" placeholder="Nome" className="border rounded px-2 py-1 text-sm w-1/3" value={link.nome} onChange={(e) => updateLink(index, 'nome', e.target.value)} />
                                            <input type="text" placeholder="URL" className="border rounded px-2 py-1 text-sm w-2/3" value={link.url} onChange={(e) => updateLink(index, 'url', e.target.value)} />
                                            <button type="button" onClick={() => removeLink(index)} className="text-red-500"><FaTrash /></button>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" placeholder="Dias" className="border rounded p-2" value={data.dias} onChange={e => setData('dias', e.target.value)} />
                                    <input type="text" placeholder="Horário" className="border rounded p-2" value={data.horario} onChange={e => setData('horario', e.target.value)} />
                                    <input type="text" placeholder="Telefone" className="border rounded p-2" value={data.telefone} onChange={e => setData('telefone', e.target.value)} />
                                    <input type="text" placeholder="WhatsApp" className="border rounded p-2" value={data.whatsapp} onChange={e => setData('whatsapp', e.target.value)} />
                                    <input type="email" placeholder="Email" className="border rounded p-2" value={data.email} onChange={e => setData('email', e.target.value)} />
                                    <input type="text" placeholder="Endereço" className="border rounded p-2" value={data.endereco} onChange={e => setData('endereco', e.target.value)} />
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-4 pt-4 border-t dark:border-gray-700 mt-6">
                                <button type="button" onClick={() => window.history.back()} className="px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 transition">Cancelar</button>
                                <button disabled={processing} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow">{processing ? 'Salvando...' : 'Atualizar'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}