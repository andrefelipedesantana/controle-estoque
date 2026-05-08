import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extende o tipo Request do Express para incluir o userId
// Isso permite usar req.userId nos controllers sem erros de TypeScript
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não informado" });
  }

  // Separa o "Bearer" do token em si
  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ error: "Erro no formato do Token" });
  }

  const token = parts[1] as string;

  try {

    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any as {
      userId: number;
    };

    // Injeta o userId no request para uso nos controllers
    req.userId = payload.userId;

    return next();
  } catch {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
