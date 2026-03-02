# 🏛️ PGM Serra - Sistema de Gestão

Este é o sistema oficial de gestão da Procuradoria Geral do Município de Serra. Desenvolvido como uma aplicação moderna para administração de conteúdos institucionais, notícias, eventos e serviços ao cidadão.

## 🚀 Tecnologias Utilizadas

- **Framework Backend**: Laravel 11
- **Frontend**: React via Inertia.js (SSR pronto)
- **Estilização**: Tailwind CSS
- **Acessibilidade**: Integração com VLibras
- **Banco de Dados**: MySQL (Suporte a migrações e seeders)

## 📋 Funcionalidades Principais

- **Painel Administrativo**: Gestão completa de utilizadores e permissões.
- **Módulo de Notícias e Eventos**: Publicação de conteúdos com suporte a múltiplas fotos e destaques.
- **Gestão de Equipa**: Cadastro e exibição de Procuradores e Assessores.
- **Carta de Serviços**: Listagem e detalhamento de serviços oferecidos pela PGM.
- **Feedback e Avaliação**: Sistema para os cidadãos avaliarem os serviços prestados.
- **Home Icons**: Personalização de ícones de acesso rápido na página inicial.

## 💻 Como Instalar o Projeto

### Pré-requisitos
- PHP 8.2 ou superior
- Composer
- Node.js e NPM
- Servidor MySQL

### Passo a Passo

1. **Clonar e instalar dependências PHP:**
   ```bash
   composer install

   Instalar dependências do frontend:

Bash
npm install
Configuração de Ambiente:
Crie o seu ficheiro .env e configure as credenciais do banco de dados:

Bash
cp .env.example .env
php artisan key:generate
Executar Migrations e Seeders:

Bash
php artisan migrate --seed
Compilar e Iniciar:

Bash
# Terminal 1
npm run dev

# Terminal 2
php artisan serve
📁 Estrutura de Pastas Relevante
app/Http/Controllers: Lógica de negócio e administração.

app/Models: Definição de entidades como Noticia, Evento e Carta.

resources/js/Pages: Componentes React para todas as rotas do sistema.

database/migrations: Definição de toda a estrutura do banco de dados.
