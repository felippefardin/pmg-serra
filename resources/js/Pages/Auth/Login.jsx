import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nome_acesso: '', // Lembra que mudamos de email para nome_acesso
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="nome_acesso" value="Nome de Acesso (Prefeitura)" />

                    <TextInput
                        id="nome_acesso"
                        type="text"
                        name="nome_acesso"
                        value={data.nome_acesso}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('nome_acesso', e.target.value)}
                    />

                    <InputError message={errors.nome_acesso} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Senha" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Lembrar-me</span>
                    </label>
                </div>

                <div className="flex flex-col gap-4 mt-6">
                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        Entrar
                    </PrimaryButton>

                    <div className="flex items-center justify-between text-sm mt-2">
                        {/* LINK PARA CRIAR CONTA (REGISTRO) */}
                        <Link 
                            href={route('register')}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold hover:underline"
                        >
                            Criar Conta
                        </Link>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 underline"
                            >
                                Esqueceu a senha?
                            </Link>
                        )}
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}