import { Request, Response } from "express";
import { LoginService } from "../services/LoginService";

class LoginController {
  async handle(req: Request, res: Response) {
    const service = new LoginService();

    // O service faz toda a validação e geração do token
    const result = await service.execute(req.body);

    return res.json(result);
  }
}

export { LoginController };
