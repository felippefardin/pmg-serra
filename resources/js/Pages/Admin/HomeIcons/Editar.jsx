import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaTrash, FaPlus } from 'react-icons/fa';

export default function EditarIcone({ auth, icon }) {
    // Garante que link_externo seja um array, mesmo que venha nulo ou vazio
    const initialLinks = Array.isArray(icon.link_externo) ? icon.link_externo : [];

    const { data, setData, put, processing, errors } = useForm({
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
        link_externo: initialLinks 
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
        put(route('admin.home-icons.update', icon.id));
    };

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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Editar Ícone</h2>}
        >
            <Head title="Editar Ícone" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* CAMPOS ORIGINAIS (NOME, ICONE, TITULO, CONTEUDO) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">Nome do Botão</label>
                                    <input 
                                        type="text" className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2" 
                                        value={data.label} onChange={e => setData('label', e.target.value)}
                                    />
                                    {errors.label && <div className="text-red-500 text-sm">{errors.label}</div>}
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
                                {errors.titulo && <div className="text-red-500 text-sm">{errors.titulo}</div>}
                            </div>

                            <div>
                                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">Texto / Conteúdo</label>
                                <textarea 
                                    className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2 h-32" 
                                    value={data.conteudo} onChange={e => setData('conteudo', e.target.value)}
                                />
                                {errors.conteudo && <div className="text-red-500 text-sm">{errors.conteudo}</div>}
                            </div>

                            {/* SEÇÃO DE LINKS MÚLTIPLOS (EDITAR) */}
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
                                        <p className="text-sm text-gray-500 text-center italic">Nenhum link cadastrado.</p>
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
            {/* Exibe erro específico deste campo */}
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
             {/* Exibe erro específico deste campo */}
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
                            </div>

                            {/* FUNCIONAMENTO E CONTATOS IGUAIS AO ORIGINAL, SEM O LINK EXTERNO ANTIGO */}
                            <div className="border-t pt-4 dark:border-gray-700">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Funcionamento e Contatos</h3>
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
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Telefone</label>
                                        <input type="text" className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2" 
                                            value={data.telefone} onChange={e => setData('telefone', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">WhatsApp</label>
                                        <input type="text" className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2" 
                                            value={data.whatsapp} onChange={e => setData('whatsapp', e.target.value)} />
                                    </div>
                                    <div className="md:col-span-2">
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

                            <div className="border-t pt-4 dark:border-gray-700 mt-6">
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
                                    {processing ? 'Salvando...' : 'Atualizar'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}