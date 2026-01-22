import React, { useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        nome_acesso: '',
        email: '',
        matricula: '',
        cpf: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Criar Nova Conta" />

            <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Criar Nova Conta</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Preencha seus dados para acessar o sistema</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                
                {/* Nome Completo */}
                <div>
                    <InputLabel htmlFor="name" value="Nome Completo" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Nome de Acesso (Login) */}
                <div>
                    <InputLabel htmlFor="nome_acesso" value="Nome de Acesso (Login Prefeitura)" />
                    <TextInput
                        id="nome_acesso"
                        name="nome_acesso"
                        value={data.nome_acesso}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('nome_acesso', e.target.value)}
                        required
                    />
                    <InputError message={errors.nome_acesso} className="mt-2" />
                </div>

                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Grid para CPF e Matrícula */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="matricula" value="Matrícula" />
                        <TextInput
                            id="matricula"
                            name="matricula"
                            value={data.matricula}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('matricula', e.target.value)}
                            required
                        />
                        <InputError message={errors.matricula} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="cpf" value="CPF" />
                        <TextInput
                            id="cpf"
                            name="cpf"
                            value={data.cpf}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('cpf', e.target.value)}
                            required
                        />
                        <InputError message={errors.cpf} className="mt-2" />
                    </div>
                </div>

                {/* Senha */}
                <div>
                    <InputLabel htmlFor="password" value="Senha" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirmar Senha */}
                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirmar Senha" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-between mt-6">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Já possui conta?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Cadastrar
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}