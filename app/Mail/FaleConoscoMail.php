<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class FaleConoscoMail extends Mailable
{
    use Queueable, SerializesModels;

    public $dados;

    // Recebe os dados do formulário (nome, email, mensagem)
    public function __construct($dados)
    {
        $this->dados = $dados;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nova Mensagem do Portal PGM - ' . $this->dados['assunto'],
        );
    }

    public function content(): Content
    {
        // Usa uma view simples em blade para o corpo do email
        return new Content(
            view: 'emails.fale-conosco',
        );
    }
}