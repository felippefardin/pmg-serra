import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function CriarIcone({ auth }) {
    const { data, setData, post } = useForm({
        label: '',
        link: '',
        cor: 'bg-blue-600',
        icone: 'FaUserTie' // Valor padrão
    });

    // Lista de ícones disponíveis para o usuário escolher
    const iconOptions = [
        'FaUserTie', 'FaUsers', 'FaCalendarAlt', 'FaNewspaper', 
        'FaScroll', 'FaInfoCircle', 'FaPhone', 'FaGavel'
    ];

    const colors = [
        'bg-blue-600', 'bg-green-600', 'bg-orange-500', 
        'bg-indigo-600', 'bg-red-700', 'bg-purple-600'
    ];

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.home-icons.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2>Novo Ícone da Home</h2>}>
            <div className="py-12 max-w-2xl mx-auto px-4">
                <form onSubmit={submit} className="bg-white p-6 rounded shadow space-y-4">
                    
                    <div>
                        <label className="block font-bold">Título do Botão</label>
                        <input type="text" className="w-full border rounded p-2" 
                            value={data.label} onChange={e => setData('label', e.target.value)} />
                    </div>

                    <div>
                        <label className="block font-bold">Link (Ex: /procuradores)</label>
                        <input type="text" className="w-full border rounded p-2" 
                            value={data.link} onChange={e => setData('link', e.target.value)} />
                    </div>

                    <div>
                        <label className="block font-bold">Ícone</label>
                        <select className="w-full border rounded p-2"
                            value={data.icone} onChange={e => setData('icone', e.target.value)}>
                            {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block font-bold">Cor de Fundo</label>
                        <div className="flex gap-2 mt-2">
                            {colors.map(color => (
                                <div key={color} 
                                    onClick={() => setData('cor', color)}
                                    className={`w-8 h-8 rounded cursor-pointer ${color} ${data.cor === color ? 'ring-4 ring-black' : ''}`}
                                />
                            ))}
                        </div>
                    </div>

                    <button className="bg-green-600 text-white px-4 py-2 rounded">Salvar</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}