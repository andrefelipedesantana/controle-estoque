import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prismaClient from "../prisma";

interface LoginProps {
  email: string;
  password: string;
}

class LoginService {
  async execute({ email, password }: LoginProps) {
    // Busca o usuário pelo email
    const user = await prismaClient.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error("Email ou senha inválidos");
    }

    // Compara a senha enviada com o hash salvo no banco
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email ou senha inválidos");
    }

    // Gera o token JWT com o id do usuário como payload
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "8h" } // Token expira em 8 horas
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

export { LoginService };
