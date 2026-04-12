import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: "precisa ter no minimo 3 letras" }),

    email: z
      .string()
      .email({ message: "Precisa ser um email válido" }),

    password: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
  })
});