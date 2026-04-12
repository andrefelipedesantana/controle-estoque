import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {



    const service = new CreateUserService();

    const user = await service.execute(req.body);

    return res.json(user);
  }
}

export { CreateUserController };