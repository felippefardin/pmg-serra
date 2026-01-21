import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function CriarIcone({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        label: '',
        link: '', // Mantemos o nome interno 'link' para salvar no banco corretamente
        cor: 'bg-blue-600',
        icone: 'FaUserTie'
    });

    // Lista de ícones disponíveis
    const iconOptions = [
        'FaUserTie', 'FaUsers', 'FaCalendarAlt', 'FaNewspaper', 
        'FaScroll', 'FaInfoCircle', 'FaPhone', 'FaGavel', 
        'FaMapMarkerAlt', 'FaEnvelope', 'FaClock', 'FaBuilding'
    ];

    const colors = [
        'bg-blue-600', 'bg-green-600', 'bg-orange-500', 
        'bg-indigo-600', 'bg-red-700', 'bg-purple-600', 'bg-gray-600', 'bg-pink-600'
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
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* TÍTULO DO BOTÃO */}
                            <div>
                                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Título do Botão
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2" 
                                    value={data.label} 
                                    onChange={e => setData('label', e.target.value)}
                                    placeholder="Ex: Procuradores"
                                />
                                {errors.label && <div className="text-red-500 text-sm mt-1">{errors.label}</div>}
                            </div>

                            {/* TEXTO (Antigo Link) - Alterado conforme pedido */}
                            <div>
                                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Texto / Informação
                                </label>
                                {/* Mudei o label visualmente, mas ainda salva em data.link */}
                                <input 
                                    type="text" 
                                    className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2" 
                                    value={data.link} 
                                    onChange={e => setData('link', e.target.value)}
                                    placeholder="Digite o texto aqui..."
                                />
                                <p className="text-xs text-gray-500 mt-1">Este texto será salvo no campo de link.</p>
                                {errors.link && <div className="text-red-500 text-sm mt-1">{errors.link}</div>}
                            </div>

                            {/* SELEÇÃO DE ÍCONE */}
                            <div>
                                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Ícone
                                </label>
                                <select 
                                    className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                                    value={data.icone} 
                                    onChange={e => setData('icone', e.target.value)}
                                >
                                    {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                                </select>
                            </div>

                            {/* SELEÇÃO DE COR */}
                            <div>
                                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Cor de Fundo
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {colors.map(color => (
                                        <div 
                                            key={color} 
                                            onClick={() => setData('cor', color)}
                                            className={`w-10 h-10 rounded-full cursor-pointer shadow-sm transition-transform hover:scale-110 ${color} ${data.cor === color ? 'ring-4 ring-offset-2 ring-gray-400' : ''}`}
                                            title={color}
                                        />
                                    ))}
                                </div>
                                {errors.cor && <div className="text-red-500 text-sm mt-1">{errors.cor}</div>}
                            </div>

                            <div className="flex justify-end gap-4 pt-4 border-t dark:border-gray-700">
                                <button type="button" onClick={() => window.history.back()} className="px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition">
                                    Cancelar
                                </button>
                                <button disabled={processing} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow transition-colors">
                                    {processing ? 'Salvando...' : 'Salvar'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}