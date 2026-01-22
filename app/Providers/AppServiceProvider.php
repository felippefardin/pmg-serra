<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Personalização do E-mail de Redefinição de Senha
        ResetPassword::toMailUsing(function (object $notifiable, string $token) {
            return (new MailMessage)
                ->subject('Redefinição de Senha') // Assunto do E-mail
                ->greeting('Olá!') // Saudação
                ->line('Você solicitou redefinição de senha, acesse o link para redefinir sua senha com segurança.') // Seu texto personalizado
                ->action('Redefinir Senha', url(route('password.reset', [
                    'token' => $token,
                    'email' => $notifiable->getEmailForPasswordReset(),
                ], false)))
                ->line('Se você não solicitou essa alteração, nenhuma ação é necessária.'); // Rodapé padrão traduzido
        });
    }
}