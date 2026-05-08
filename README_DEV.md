# 📘 Explicação do Projeto (Passo a Passo)

Bem-vindo ao **README_DEV**! Este documento foi criado com muito carinho para que você, desenvolvedor iniciante ou em fase de aprendizado, entenda **cada pedacinho** deste sistema de Controle de Estoque. 

Vamos desmistificar como o Frontend e o Backend se comunicam e como tudo funciona por debaixo dos panos! 🚀

---

## 1. 📂 Estrutura do Projeto

O projeto é do tipo **Fullstack** e está dividido em duas grandes pastas na raiz:

- `/frontend`: Onde vive a interface do usuário (o que o usuário vê e interage). Usamos **Next.js**.
- `/backend`: Onde vive a lógica de negócios, banco de dados e APIs (o que acontece por trás dos panos). Usamos **Node.js** com **Express**.

### Dentro do Backend:
- `src/controllers`: Recebem as requisições, chamam os serviços (ou lógica) e devolvem as respostas.
- `src/middlewares`: Interceptam requisições para validar coisas (ex: verificar se o usuário está logado ou se os dados estão corretos).
- `src/routes.ts`: O "mapa" das nossas APIs. Define qual URL chama qual Controller.
- `src/schemas`: Onde guardamos as regras de validação (usando **Zod**).
- `prisma`: Onde fica nosso _Schema_ do banco de dados (tabelas de `User` e `Product`).

### Dentro do Frontend:
- `app/`: O coração do Next.js App Router (onde ficam as páginas, como `/dashboard`, `/login`, etc).
- `components/`: Pedaços reutilizáveis de tela (como `Navbar.tsx`, `ProductTable.tsx`).
- `lib/api.ts`: Onde configuramos nosso "telefone" (o Axios) para falar com o Backend.

---

## 2. 🌐 Frontend (Next.js)

O nosso Frontend usa a nova arquitetura do **Next.js (App Router)**.

- **Páginas**: Cada pasta dentro de `app/` que tem um arquivo `page.tsx` vira uma rota no navegador. Por exemplo, `app/dashboard/page.tsx` vira a URL `http://localhost:3000/dashboard`.
- **Componentes**: Extraímos lógicas de visualização para a pasta `components`. Ao invés de escrever a mesma tabela mil vezes, criamos o `<ProductTable />` e apenas passamos a lista de produtos para ele.
- **Requisições de Dados**: Usamos a biblioteca `axios` (por meio de `api.get`) junto com os hooks `useEffect` e `useState` do React para buscar e mostrar os produtos em tela, de um jeito bem fluido.

---

## 3. ⚙️ Backend (Node + Express)

O servidor foi construído usando **Express**, um framework muito simples para Node.js.

- Tudo começa no `routes.ts`. Ele direciona o trânsito!
- Exemplo prático:
  Quando alguém acessa a rota **GET /products**...
  1. O arquivo de rotas (`routes.ts`) diz: *"Opa, bateram na porta /products. A regra é verificar se o usuário está logado antes (authMiddleware), e depois mandar para o ProductController.list()!"*
  2. O Controller pega os dados no banco usando o prisma (`prisma.product.findMany()`) e devolve ao Frontend via JSON: `res.json(products)`.

---

## 4. 🔐 Autenticação (JWT)

A nossa Autenticação garante que só veja os produtos quem estiver logado! Usamos o **JWT** (JSON Web Token), que funciona como uma "pulseirinha de festa VIP".

**O Fluxo de Login:**
1. Usuário envia `email` e `email` para `/auth/login`.
2. O Backend verifica se a senha é válida (com `bcrypt`).
3. Se estiver tudo certo, o Backend **gera um Token (JWT)** e devolve.
4. O Frontend guarda esse Token no `localStorage`.

**O Middleware (`authMiddleware.ts`):** 
Para acessar qualquer rota protegida (como as de listar produtos), o Frontend precisa mandar a "pulseirinha" no cabeçalho (Header) da requisição (`Authorization: Bearer <token>`). O `authMiddleware` intercepta a requisição, decodifica o token usando a chave secreta (`JWT_SECRET`), extrai o `userId` e autoriza a entrada!

---

## 5. 🔄 Fluxo de Requisição (MUITO IMPORTANTE)

Imagine que o usuário vai **cadastrar um novo produto**. Como os dados viajam? 🚀

1. **Usuário**: Preenche o formulário no Frontend e clica em "Salvar".
2. **Frontend**: Usa o `axios` (`api.post('/products', dados)`) enviando os dados JSON e anexando automaticamente a "pulseirinha" (o Token JWT) nos Cabeçalhos da requisição.
3. **API (Backend)**: Bate na porta do servidor em `http://localhost:3333/products`.
4. **Middleware Zod**: Intercepta a requisição e valida: *"O nome tem mais de 3 letras? A data está certa?"*. Se estiver errado, barra na hora!
5. **Middleware Auth**: Intercepta e diz: *"O token é válido?"*. Tudo certo? Segue o jogo!
6. **Controller/Prisma**: Pega os dados validados, e usa o Prisma para salvar no **Banco de Dados (PostgreSQL)**.
7. **Resposta**: O Backend responde algo tipo `{ "id": 1, "name": "Dipirona", ... }` com status `200 OK`.
8. **Frontend**: Recebe essa resposta. Mostra um alerta de sucesso e redireciona de volta para o Dashboard! 🎉

---

## 6. 🧠 Uso do TypeScript

Em todo lugar você verá tipagens (ex: `: Request`, `: Response`, `type Product = { ... }`).

O TypeScript é como um anjo da guarda que nos avisa de um erro *antes mesmo de rodarmos o código*. 

- **Frontend**: Temos interfaces como `Product` no `ProductTable.tsx` que garante que, se tentarmos exibir um produto.preco ao invés de produto.price, o editor avisará do erro, já que não temos "preco" nas regras.
- **Backend**: Quando manipulamos requisições, o TypeScript sabe que o ID do usuário está seguro dentro da `Request` através do namespace modificado no middleware. Mágica!

---

## 7. ✅ Validação (Zod)

Não confie nos dados do usuário! Para evitar bagunça, usamos o **Zod** no back-end.

Por exemplo, no cadastro de usuário (`userSchema.ts`):
```typescript
body: z.object({
  name: z.string().min(3, { message: "precisa ter no minimo 3 letras" }),
  email: z.string().email({ message: "Precisa ser um email válido" }),
  password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
})
```
O `validateSchema` é um middleware que recebe esse schema. Se o usuário esquecer a senha, a API responde logo de cara com um belo **erro 400 Bad Request** – nem deixa o Código chegar ao banco de dados!

---

## 8. 🔗 Integração com API

Todo a magia no Frontend mora na pasta `lib/api.ts`, onde configuramos o `axios`:

```typescript
export const api = axios.create({
  baseURL: "http://localhost:3333", // URL do backend!
});
```

A melhor parte? Nós usamos `api.interceptors`. Toda vez que vocẽ for chamar uma rota no Backend, o interceptor verifica se existe um token salvo e, se sim, envia ele automaticamente:
```typescript
config.headers.Authorization = `Bearer ${token}`
```
Fácil, prático, e você não precisa escrever isso toda vez!

---

## 9. 🚀 Como rodar o projeto

Pronto para ver a mágica com seus próprios olhos?

### **Backend**
1. Entre na pasta: `cd backend`
2. Instale tudo: `npm install`
3. Configure as variáveis em um arquivo `.env` (Banco de Dados PostgreSQL e JWT_SECRET)
4. Rode as migrações: `npx prisma migrate dev`
5. Suba o servidor: `npm run dev`

### **Frontend**
1. Entre na pasta: `cd frontend`
2. Instale tudo: `npm install`
3. Inicie: `npm run dev`
4. Abra no navegador: `http://localhost:3000`

---

## 10. 💡 Boas práticas utilizadas

Alguns padrões inteligentes que usamos no projeto e que vão te ajudar a crescer como dev:

- **Separação de Responsabilidades**: O Controller cuida só da web (Request/Response), o Schema só das regras de validação. Cada macaco no seu galho!
- **Middlewares globais (Frontend)**: O Axios Interceptor é uma mão na roda para não repetir lógica (DRY - Don't Repeat Yourself).
- **Tratamento de Token Expirado**: No `dashboard/page.tsx`, se a requisição retornar o erro de `401 Unauthorized`, sabemos que o Token expirou. Imediatamente limpamos o `localStorage` e redirecionamos o usuário pro Login de forma graciosa.

---
Muitos sucessos nos estudos e continue a explorar esse universo do código! 👨‍💻👩‍💻
