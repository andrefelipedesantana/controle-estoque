import bcrypt from "bcryptjs";
import prismaClient from "../prisma";

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: CreateUserProps) {
    // Verifica se o email já está cadastrado
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já existente");
    }

    // Criptografa a senha antes de salvar (nunca salve senha em texto puro!)
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      // Retorna apenas dados seguros (sem a senha)
      select: { id: true, name: true, email: true, createdAt: true },
    });

    return user;
  }
}

export { CreateUserService };