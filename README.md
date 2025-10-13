# Sistema de Gestão de Condomínio

![Badge de Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Badge de Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-blue)

## 📖 Sobre o Projeto

Este é um projeto full-stack de um sistema para gestão de condomínios, desenvolvido como parte da disciplina de Sistemas Distribuídos. A aplicação visa centralizar e otimizar as operações diárias de um condomínio, oferecendo uma interface moderna e funcionalidades robustas tanto para administradores quanto para moradores.

O projeto foi construído com uma arquitetura de microsserviços em mente, com um backend em **NestJS** responsável pela lógica de negócio e segurança, e um frontend em **React** para a interface do usuário.

## ✨ Funcionalidades Implementadas

* **Autenticação de Usuários**: Sistema de login seguro utilizando JWT (JSON Web Tokens), com tempo de expiração configurável.
* **Controle de Acesso Baseado em Perfis (RBAC)**:
    * **Administrador**: Acesso total ao sistema, incluindo o cadastro de novos usuários.
    * **Usuário Padrão**: Acesso a funcionalidades gerais do sistema (funcionalidades a serem implementadas).
* **Cadastro de Usuários**: Endpoint protegido para que apenas administradores possam cadastrar novos usuários no sistema.

## 🚀 Tecnologias Utilizadas

Este projeto é dividido em duas partes principais: o Backend e o Frontend.

### Backend

| Tecnologia | Descrição |
| :--- | :--- |
| **Node.js** | Ambiente de execução para o JavaScript no servidor. |
| **NestJS** | Framework Node.js progressivo para construir aplicações eficientes e escaláveis. |
| **TypeScript** | Superset do JavaScript que adiciona tipagem estática. |
| **PostgreSQL** | Banco de dados relacional robusto e de código aberto. |
| **TypeORM** | Framework ORM para interagir com o banco de dados de forma orientada a objetos. |
| **JWT** | Implementação de JSON Web Tokens para autenticação e autorização. |
| **Bcrypt** | Biblioteca para hashing de senhas. |
| **Passport.js** | Middleware de autenticação para Node.js, integrado ao NestJS. |

### Frontend

| Tecnologia | Descrição |
| :--- | :--- |
| **React** | Biblioteca JavaScript para construir interfaces de usuário. |
| **Vite** | Ferramenta de build moderna e ultrarrápida para desenvolvimento frontend. |
| **TypeScript** | Garante a tipagem e a escalabilidade do código. |
| **Tailwind CSS** | Framework CSS utility-first para estilização rápida e responsiva. |
| **shadcn/ui** | Coleção de componentes de UI reutilizáveis. |
| **Axios** | Cliente HTTP para realizar requisições à API do backend. |

---

## 🏁 Como Rodar o Projeto

Para executar este projeto localmente, você precisará configurar o Backend e o Frontend separadamente.

### Pré-requisitos

* [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
* [PostgreSQL](https://www.postgresql.org/download/) instalado e rodando.
* Um gerenciador de pacotes como `npm` ou `yarn`.

### 1. Configuração do Backend

**a) Clone o repositório:**
```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>/Backend
```

**b) Instale as dependências:**
```bash
npm install
```

**c) Configure o banco de dados:**
1.  Acesse o PostgreSQL e crie um novo banco de dados.
    ```sql
    CREATE DATABASE "sistema-condominio";
    ```
2.  Verifique se as credenciais no arquivo `src/database/database.module.ts` correspondem à sua configuração local (usuário, senha, porta).

**d) Configure as variáveis de ambiente:**
É uma boa prática não deixar segredos no código. No arquivo `src/auth/constants.ts`, altere a `secret` do JWT para uma chave mais segura.

**e) Rode a aplicação backend:**
```bash
npm run start:dev
```
O servidor estará rodando em `http://localhost:3000`.

### 2. Configuração do Frontend

**a) Abra um novo terminal e navegue até a pasta do Frontend:**
```bash
cd <NOME_DO_REPOSITORIO>/Frontend
```

**b) Instale as dependências:**
```bash
npm install
```

**c) Configure a URL da API:**
Verifique o arquivo `src/pages/Login.tsx` e certifique-se de que a URL da requisição do Axios aponta para o seu backend (ex: `http://localhost:3000/auth/login`).

**d) Rode a aplicação frontend:**
```bash
npm run dev
```
A aplicação estará acessível em `http://localhost:5173` (ou outra porta indicada no terminal).

### 3. Criando o Primeiro Usuário Administrador

Como o cadastro de usuários é uma rota protegida, siga os passos abaixo para criar o primeiro administrador:
1.  No código do backend, abra o arquivo `src/user/user.controller.ts`.
2.  Adicione temporariamente o decorator `@IsPublic()` na rota `create`.
3.  Use uma ferramenta de API (como Postman ou Insomnia) para fazer uma requisição `POST` para `http://localhost:3000/user` com os dados do administrador.
4.  **Remova o decorator `@IsPublic()`** para proteger a rota novamente.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
