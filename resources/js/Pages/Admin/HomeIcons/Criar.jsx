import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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
        whatsapp: '',     // Novo
        email: '',
        endereco: '',
        link_externo: ''  // Novo
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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Novo Ícone da Home</h2>}
        >
            <Head title="Criar Ícone" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        
                        <form onSubmit={submit} className="space-y-6">
                            
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

                            <div className="border-t pt-4 dark:border-gray-700">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Contatos e Links</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Telefone</label>
                                        <input type="text" className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2" 
                                            value={data.telefone} onChange={e => setData('telefone', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">WhatsApp (Apenas números)</label>
                                        <input type="text" className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2" 
                                            value={data.whatsapp} onChange={e => setData('whatsapp', e.target.value)} placeholder="Ex: 27999998888" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                        <input type="email" className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2" 
                                            value={data.email} onChange={e => setData('email', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Link Externo (URL)</label>
                                        <input type="text" className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2" 
                                            value={data.link_externo} onChange={e => setData('link_externo', e.target.value)} placeholder="https://site.com.br" />
                                        {errors.link_externo && <div className="text-red-500 text-xs mt-1">{errors.link_externo}</div>}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Endereço</label>
                                        <input type="text" className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm p-2" 
                                            value={data.endereco} onChange={e => setData('endereco', e.target.value)} />
                                    </div>
                                </div>
                            </div>

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