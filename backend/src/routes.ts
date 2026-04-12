import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { LoginController } from "./controllers/LoginController";
import { ProductController } from "./controllers/ProductController";
import { validateSchema } from "./middlewares/validateSchema";
import { authMiddleware } from "./middlewares/authMiddleware";
import { createUserSchema } from "./schemas/userSchema";
import { createProductSchema, updateProductSchema } from "./schemas/productSchema";

const router = Router();

// --- AUTH ROUTES ---
// Cadastro
router.post(
  "/auth/register",
  validateSchema(createUserSchema),
  (req, res) => new CreateUserController().handle(req, res)
);

// Login
router.post(
  "/auth/login",
  (req, res) => new LoginController().handle(req, res)
);

// --- PRODUCT ROUTES (Protegidas) ---
const productController = new ProductController();

// Aplica o middleware de autenticação para todas as rotas abaixo
router.use("/products", authMiddleware);

router.post(
  "/products",
  validateSchema(createProductSchema),
  (req, res) => productController.create(req, res)
);

router.get(
  "/products",
  (req, res) => productController.list(req, res)
);

router.put(
  "/products/:id",
  validateSchema(updateProductSchema),
  (req, res) => productController.update(req, res)
);

router.delete(
  "/products/:id",
  (req, res) => productController.delete(req, res)
);

export { router };