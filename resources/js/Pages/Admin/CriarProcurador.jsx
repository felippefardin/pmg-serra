import React from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function CriarProcurador({ procurador = null, isEdit = false }) {
    const { data, setData, post, processing, errors } = useForm({
        nome: procurador?.nome || '',
        cargo: procurador?.cargo || '',
        imagem: null,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            // Usamos POST para update por causa do upload de arquivos
            post(route('admin.procuradores.update', procurador.id));
        } else {
            post(route('admin.procuradores.store'));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
            <Head title={isEdit ? "Editar Procurador" : "Novo Procurador"} />
            
            <form onSubmit={submit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-blue-600 pl-3">
                    {isEdit ? 'Editar Procurador' : 'Adicionar Novo Procurador'}
                </h2>
                
                {/* Nome */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nome Completo</label>
                    <input 
                        type="text" 
                        value={data.nome}
                        onChange={e => setData('nome', e.target.value)}
                        className="w-full border rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ex: Dr. João Silva"
                    />
                    {errors.nome && <div className="text-red-500 text-xs mt-1">{errors.nome}</div>}
                </div>

                {/* Cargo */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Cargo</label>
                    <input 
                        type="text" 
                        value={data.cargo}
                        onChange={e => setData('cargo', e.target.value)}
                        className="w-full border rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ex: Procurador Geral"
                    />
                    {errors.cargo && <div className="text-red-500 text-xs mt-1">{errors.cargo}</div>}
                </div>

                {/* Imagem */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Foto de Perfil</label>
                    
                    {/* Preview da imagem atual se estiver editando */}
                    {isEdit && procurador.imagem_path && (
                        <div className="mb-2">
                            <p className="text-xs text-gray-500 mb-1">Imagem atual:</p>
                            <img src={`/storage/${procurador.imagem_path}`} alt="Atual" className="h-16 w-16 object-cover rounded-full border" />
                        </div>
                    )}

                    <input 
                        type="file" 
                        onChange={e => setData('imagem', e.target.files[0])}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {errors.imagem && <div className="text-red-500 text-xs mt-1">{errors.imagem}</div>}
                </div>

                <button disabled={processing} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition-colors">
                    {isEdit ? 'Salvar Alterações' : 'Adicionar Procurador'}
                </button>
            </form>
        </div>
    );
}