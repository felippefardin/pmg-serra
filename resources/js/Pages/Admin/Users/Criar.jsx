import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function CriarUsuario({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        nome_acesso: '',
        email: '',
        matricula: '',
        cpf: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.users.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Cadastrar Novo Usuário</h2>}
        >
            <Head title="Criar Usuário" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        
                        <form onSubmit={submit} className="space-y-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Nome Completo */}
                                <div>
                                    <InputLabel htmlFor="name" value="Nome Completo" />
                                    <TextInput
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                {/* Nome de Acesso (Prefeitura) */}
                                <div>
                                    <InputLabel htmlFor="nome_acesso" value="Nome de Acesso (Login Prefeitura)" />
                                    <TextInput
                                        id="nome_acesso"
                                        value={data.nome_acesso}
                                        onChange={(e) => setData('nome_acesso', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.nome_acesso} className="mt-2" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Email */}
                                <div>
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                {/* Matrícula */}
                                <div>
                                    <InputLabel htmlFor="matricula" value="Matrícula" />
                                    <TextInput
                                        id="matricula"
                                        value={data.matricula}
                                        onChange={(e) => setData('matricula', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.matricula} className="mt-2" />
                                </div>

                                {/* CPF */}
                                <div>
                                    <InputLabel htmlFor="cpf" value="CPF" />
                                    <TextInput
                                        id="cpf"
                                        value={data.cpf}
                                        onChange={(e) => setData('cpf', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.cpf} className="mt-2" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t dark:border-gray-700">
                                {/* Senha */}
                                <div>
                                    <InputLabel htmlFor="password" value="Senha" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Mínimo 8 caracteres, com números, letras maiúsculas e minúsculas.
                                    </p>
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                {/* Confirmar Senha */}
                                <div>
                                    <InputLabel htmlFor="password_confirmation" value="Confirmar Senha" />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <PrimaryButton disabled={processing}>
                                    Criar Usuário
                                </PrimaryButton>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}