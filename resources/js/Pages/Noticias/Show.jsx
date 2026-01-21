import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';

export default function Show({ noticia, auth }) {
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        if(confirm('Apagar esta notícia?')) destroy(route('admin.noticias.destroy', noticia.id));
    };

    return (
        <PublicLayout title={noticia.titulo}>
            <div className="container mx-auto px-4 py-10 max-w-4xl">
                <Link href="/noticias" className="flex items-center text-indigo-600 mb-6 font-bold">&larr; Voltar</Link>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    {noticia.imagem_destaque && (
                        <img src={`/storage/${noticia.imagem_destaque}`} className="w-full max-h-96 object-cover" />
                    )}
                    
                    <div className="p-8">
                        <div className="flex justify-between items-start">
                            <span className="text-sm text-gray-500">{new Date(noticia.created_at).toLocaleDateString()}</span>
                            
                            {/* Botões Admin */}
                            {auth.user && (
                                <div className="flex gap-2">
                                    <Link href={route('admin.noticias.edit', noticia.id)} className="bg-yellow-500 text-white p-2 rounded"><FaEdit /></Link>
                                    <button onClick={handleDelete} className="bg-red-600 text-white p-2 rounded"><FaTrash /></button>
                                </div>
                            )}
                        </div>

                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">{noticia.titulo}</h1>
                        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            {noticia.conteudo}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}