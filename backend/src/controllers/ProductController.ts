import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";

class ProductController {
  async create(req: Request, res: Response) {
    const userId = req.userId as number;
    const service = new ProductService();
    
    // Passa o userId e os dados do body para o service
    const product = await service.create(userId, req.body);
    
    return res.status(201).json(product);
  }

  async list(req: Request, res: Response) {
    const userId = req.userId as number;
    const service = new ProductService();
    
    // Lista os produtos atrelados ao usuário que fez a requisição
    const products = await service.list(userId);
    
    return res.json(products);
  }

  async update(req: Request, res: Response) {
    const userId = req.userId as number;
    const productId = Number(req.params.id);
    const service = new ProductService();
    
    const product = await service.update(userId, productId, req.body);
    
    return res.json(product);
  }

  async delete(req: Request, res: Response) {
    const userId = req.userId as number;
    const productId = Number(req.params.id);
    const service = new ProductService();
    
    const result = await service.delete(userId, productId);
    
    return res.json(result);
  }
}

export { ProductController };
