# 📦 PharmaEstoque - Controle de Estoque (Projeto de Estudos)

👋 Esse projeto foi construído por mim para praticar e consolidar meus conhecimentos em desenvolvimento Full Stack. Ele consiste em um sistema para gerenciar a entrada e saída de produtos de uma farmácia!

Meu foco principal aqui foi aprender na prática como conectar um front-end consumindo um back-end além de treinar as tecnologias utilizadas na stack dessr projeto.

---

## 🚀 Sobre o Projeto

O PharmaEstoque permite registrar produtos farmacêuticos, controlar quantidades receber status de datas de validade. 


## 🛠️ Tecnologias 

### 💻 Backend 
*   **Node.js & TypeScript** 
*   **Express** 
*   **Prisma ORM** 
*   **Zod** 
*   **JWT & bcrypt** 

### 🎨 Frontend (O rostinho do sistema)
*   **Next.js (App Router)** 
*   **Tailwind CSS** 
*   **Axios** 

### 🐳 Infraestrutura
*   **Docker & Docker Compose** (banco de dados PostgreSQL em container)

---

## 🎯 Funcionalidades Atuais

*   **Autenticação:** O usuário cria sua conta e/ou loga.
*   **Painel Principal:** Lista em uma tabela  todos os itens cadastrados.
*   **Gerenciamento CRUD:** Cadastro, Editão ou Deleção de produtos.
*   **Status Computado:**
    *   🟢 Válido (Mais de 30 dias para vencer)
    *   🟡 Vence em até 30 dias
    *   🔴 Vencido (Venceu já)

---

## ⚙️ Guia de Instalação e Execução Local

### Pré-requisitos

| Ferramenta | Necessário para |
|---|---|
| [Node.js](https://nodejs.org/) | Rodar backend e frontend |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | Subir o banco de dados PostgreSQL |

> O banco de dados **não** precisa estar instalado localmente — ele roda dentro de um container Docker.

---

**1. Clonagem do Repositório**

```bash
git clone https://github.com/SeuUsuario/controle-estoque.git
cd controle-estoque
```

**2. Subindo o Banco de Dados com Docker**

Na raiz do projeto (onde está o `docker-compose.yml`), execute:

```bash
docker compose up -d
```

Isso vai baixar a imagem do PostgreSQL e iniciar o container em segundo plano. Os dados ficam salvos em um volume Docker, então não são perdidos ao parar o container.

**3. Configuração do Backend (API)**

```bash
cd backend
npm install
```

Crie o arquivo `.env` na pasta `backend` com o conteúdo abaixo:

```env
PORT=3333
DATABASE_URL="postgresql://postgres:741852963@localhost:5432/Farmacia?schema=public"
JWT_SECRET="sua_chave_secreta_para_assinatura_de_tokens"
```

> As credenciais acima já correspondem ao que foi definido no `docker-compose.yml`.

Após isso, rode as migrações do Prisma para criar as tabelas no banco:

```bash
npx prisma migrate dev
npm run dev
```

**4. Configuração do Frontend (Interface)**

Em um novo terminal:

```bash
cd frontend
npm install
npm run dev
```

**5. Acesso ao Sistema**

Após tudo iniciado, acesse: `http://localhost:3000`

---

## 🐳 Comandos Docker Úteis

```bash
# Subir o banco em segundo plano
docker compose up -d

# Ver se o container está rodando
docker ps

# Parar o container (dados são preservados)
docker compose down

# Parar e apagar todos os dados do banco
docker compose down -v
```
