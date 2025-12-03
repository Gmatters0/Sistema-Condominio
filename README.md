# Sistema de Gestão de Condomínio

![Badge de Status](https://img.shields.io/badge/status-concluído-brightgreen)

## 📖 Sobre o Projeto

Este é um projeto **Full-Stack** completo para gestão de condomínios, desenvolvido para centralizar e otimizar as operações diárias de administração, portaria e convivência. A aplicação oferece uma interface moderna e funcionalidades robustas que atendem administradores, porteiros e moradores.

O sistema foi construído seguindo uma arquitetura modular, garantindo escalabilidade e facilidade de manutenção, separando claramente as responsabilidades entre o servidor (API) e o cliente (Interface Web).

## ✨ Funcionalidades do Sistema

### 🔐 Segurança e Acesso
* **Autenticação JWT**: Login seguro com tokens criptografados e tempo de expiração.
* **Controle de Acesso (RBAC)**:
    * **Administrador**: Gestão total (CRUD) de todas as entidades e configurações.
    * **Morador/Usuário**: Acesso restrito a reservas, visualização de avisos e gestão pessoal.
* **Guardas de Rotas**: Proteção de endpoints no Backend e redirecionamento seguro no Frontend.

### 🏢 Gestão Administrativa
* **Unidades**: Cadastro e listagem de blocos e apartamentos.
* **Moradores**: Registro completo de condôminos vinculado às unidades, com validação de CPF e criação automática de credenciais de acesso.
* **Prestadores de Serviço**: Banco de dados de profissionais e empresas (Eletricistas, Encanadores, etc.), com validação de documentos (CPF/CNPJ).

### 🛡️ Portaria e Controle
* **Gestão de Visitantes**: [Novo] Cadastro de visitantes com nome e documento, permitindo maior segurança no controle de entrada e saída do condomínio.

### ⚙️ Operacional
* **Reservas de Áreas Comuns**:
    * Agendamento de espaços (Churrasqueira, Salão de Festas, Piscina).
    * **Validação de Conflitos**: O sistema impede automaticamente reservas sobrepostas no mesmo local e horário.
* **Ordens de Serviço (OS)**:
    * Abertura de chamados de manutenção com níveis de prioridade (Baixa, Média, Alta).
    * Acompanhamento de status (*Aberto*, *Em Andamento*, *Fechado*).
    * Vinculação direta de um prestador de serviço à ordem.

### 📢 Comunicação
* **Quadro de Avisos**: [Novo] Módulo para publicação de comunicados oficiais do condomínio, visíveis para todos os moradores no Dashboard.
* **Sistema de E-mails**: [Novo] Integração para envio de notificações e comunicados diretamente pela plataforma.

---

## 🚀 Tecnologias Utilizadas

### Backend (API)
Construído com foco em performance e organização.

| Tecnologia | Função |
| :--- | :--- |
| **NestJS** | Framework principal para a arquitetura modular da API. |
| **TypeScript** | Linguagem base, garantindo tipagem estática e segurança. |
| **PostgreSQL** | Banco de dados relacional. |
| **TypeORM** | ORM para manipulação do banco de dados e relacionamentos. |
| **Passport & JWT** | Estratégias de autenticação e autorização. |
| **Nodemailer** | Serviço para envio de e-mails do sistema. |
| **Class-Validator** | Validação robusta de dados de entrada (DTOs). |

### Frontend (Web)
Interface reativa, limpa e responsiva.

| Tecnologia | Função |
| :--- | :--- |
| **React** | Biblioteca para construção da interface. |
| **Vite** | Build tool para desenvolvimento rápido. |
| **Tailwind CSS** | Estilização utility-first. |
| **shadcn/ui** | Componentes de interface reutilizáveis e acessíveis. |
| **Axios** | Cliente HTTP para comunicação com a API. |
| **Lucide React** | Ícones vetoriais modernos. |
| **Sonner** | Feedback visual (Toasts) para ações do usuário. |

---

## 🏁 Como Rodar o Projeto

Para executar o sistema completo, é necessário configurar o servidor (Backend) e a interface (Frontend).

### Pré-requisitos
* [Node.js](https://nodejs.org/en/) (v18+)
* [PostgreSQL](https://www.postgresql.org/download/) rodando localmente ou em container.

### 1. Configuração do Backend

1.  **Acesse a pasta:**
    ```bash
    cd Backend
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure o Banco de Dados:**
    * Crie um banco chamado `sistema-condominio` no PostgreSQL.
    * Verifique as credenciais em `src/database/database.module.ts`.
4.  **Configuração de Variáveis:**
    * Crie um arquivo `.env` na raiz do backend (baseado no uso do `ConfigModule`).
    * Defina a chave `JWT_SECRET` e as configurações de e-mail se necessário.
5.  **Inicie o servidor:**
    ```bash
    npm run start:dev
    ```
    *O servidor rodará em `http://localhost:3000`.*

### 2. Configuração do Frontend

1.  **Acesse a pasta:**
    ```bash
    cd Frontend
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Inicie a aplicação:**
    ```bash
    npm run dev
    ```
    *Acesse a aplicação no navegador através do link fornecido (geralmente `http://localhost:5173`).*

---

## 👤 Criando o Primeiro Acesso (Admin)

Como o sistema possui rotas protegidas, para o primeiro uso:

1.  No Backend, edite `src/user/user.controller.ts`.
2.  Adicione o decorator `@IsPublic()` acima do método `@Post()` de criação (`create`).
3.  Faça uma requisição (via Postman/Insomnia) para criar seu usuário Admin.
4.  **Remova** o decorator `@IsPublic()` para restaurar a segurança.
