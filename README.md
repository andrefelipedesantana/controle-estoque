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

Para realizar a clonagem e execução do projeto em ambiente local, é necessário possuir o Node.js instalado e uma instância do PostgreSQL devidamente configurada.

**1. Clonagem do Repositório**
Realize o clone do projeto e acesse o diretório principal:

```bash
git clone https://github.com/SeuUsuario/controle-estoque.git
cd controle-estoque
```

**2. Configuração do Backend (API)**
Acesse o diretório do servidor para instalar as dependências e configurar as variáveis de ambiente:

```bash
cd backend
npm install
```

Crie um arquivo `.env` na raiz da pasta `backend` seguindo o modelo abaixo, inserindo as credenciais do seu banco de dados PostgreSQL:

```env
PORT=3333
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nomedobanco?schema=public"
JWT_SECRET="sua_chave_secreta_para_assinatura_de_tokens"
```

Após configurar o ambiente, execute as migrações do Prisma para estruturar o banco de dados e inicie o serviço:

```bash
npx prisma migrate dev --name init
npm run dev
```

**3. Configuração do Frontend (Interface)**
Em um novo terminal, acesse a pasta do cliente para instalação e inicialização da interface:

```bash
cd frontend
npm install
npm run dev
```

**4. Acesso ao Sistema**
Após a inicialização bem-sucedida, a aplicação estará disponível no endereço: `http://localhost:3000`.

Recomenda-se realizar o primeiro cadastro para validar o fluxo completo de autenticação e gerenciamento de estoque.
