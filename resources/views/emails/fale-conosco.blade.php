<!DOCTYPE html>
<html>
<head>
    <title>Nova Mensagem - Portal PGM</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>Nova solicitação via Portal PGM</h2>
    
    <p><strong>Nome:</strong> {{ $dados['nome'] }}</p>
    <p><strong>Email:</strong> {{ $dados['email'] }}</p>
    
    {{-- Exibe apenas se foi preenchido --}}
    @if(!empty($dados['celular']))
        <p><strong>Celular:</strong> {{ $dados['celular'] }}</p>
    @endif

    @if(!empty($dados['telefone_fixo']))
        <p><strong>Telefone Fixo:</strong> {{ $dados['telefone_fixo'] }}</p>
    @endif

    <p><strong>Assunto:</strong> {{ $dados['assunto'] }}</p>
    
    <hr>
    
    <h3>Mensagem:</h3>
    <p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #0056b3;">
        {{ nl2br(e($dados['mensagem'])) }}
    </p>
</body>
</html>