import { Request, Response } from "express";
import { LoginService } from "../services/LoginService";

class LoginController {
  async handle(req: Request, res: Response) {
    const service = new LoginService();


    const result = await service.execute(req.body);

    return res.json(result);
  }
}

export { LoginController };
