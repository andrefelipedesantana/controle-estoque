import prismaClient from "../prisma";

// Calcula o status do produto com base na data de validade
function getStatus(expirationDate: Date): "valid" | "expiring" | "expired" {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normaliza para início do dia

  const thirtyDaysFromNow = new Date(today);
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  if (expirationDate < today) {
    return "expired"; // Vencido
  } else if (expirationDate <= thirtyDaysFromNow) {
    return "expiring"; // Vence em até 30 dias
  } else {
    return "valid"; // Dentro do prazo
  }
}

interface ProductData {
  name: string;
  quantity: number;
  expirationDate: string; // Vem como string do JSON
}

class ProductService {
  // Cria um novo produto vinculado ao usuário logado
  async create(userId: number, data: ProductData) {
    const product = await prismaClient.product.create({
      data: {
        name: data.name,
        quantity: data.quantity,
        expirationDate: new Date(data.expirationDate),
        userId,
      },
    });

    return { ...product, status: getStatus(product.expirationDate) };
  }

  // Lista todos os produtos do usuário logado
  async list(userId: number) {
    const products = await prismaClient.product.findMany({
      where: { userId },
      orderBy: { expirationDate: "asc" }, // Mais próximos do vencimento primeiro
    });

    // Adiciona o campo "status" calculado em cada produto
    return products.map((product) => ({
      ...product,
      status: getStatus(product.expirationDate),
    }));
  }

  // Atualiza um produto (verifica se pertence ao usuário)
  async update(userId: number, productId: number, data: Partial<ProductData>) {
    // Garante que o produto existe e pertence ao usuário logado
    const product = await prismaClient.product.findFirst({
      where: { id: productId, userId },
    });

    if (!product) {
      throw new Error("Produto não encontrado");
    }

    const updated = await prismaClient.product.update({
      where: { id: productId },
      data: {
        name: data.name,
        quantity: data.quantity,
        expirationDate: data.expirationDate
          ? new Date(data.expirationDate)
          : undefined,
      },
    });

    return { ...updated, status: getStatus(updated.expirationDate) };
  }

  // Remove um produto (verifica se pertence ao usuário)
  async delete(userId: number, productId: number) {
    // Garante que o produto existe e pertence ao usuário logado
    const product = await prismaClient.product.findFirst({
      where: { id: productId, userId },
    });

    if (!product) {
      throw new Error("Produto não encontrado");
    }

    await prismaClient.product.delete({ where: { id: productId } });

    return { message: "Produto deletado com sucesso" };
  }
}

export { ProductService };
