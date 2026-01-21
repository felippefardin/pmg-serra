import React from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Index({ lista }) {
    return (
        <PublicLayout title="Notícias da PGM">
            <section className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">
                    Notícias da PGM
                </h1>

                <div className="grid gap-6">
                    {lista.map((item) => (
                        <article
                            key={item.id}
                            className="border rounded-lg p-4 shadow-sm"
                        >
                            {item.imagem_destaque && (
                                <img
                                    src={item.imagem_destaque}
                                    alt={item.titulo}
                                    className="w-full h-56 object-cover rounded mb-4"
                                />
                            )}

                            <h2 className="text-xl font-semibold mb-2">
                                {item.titulo}
                            </h2>

                            <p className="text-gray-700 mb-4">
                                {item.conteudo}
                            </p>

                            <Link
                                href={`/noticias/${item.slug}`}
                                className="text-blue-600 hover:underline"
                            >
                                Ler mais →
                            </Link>
                        </article>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}
