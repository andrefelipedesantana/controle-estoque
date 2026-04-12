import { z } from "zod";

// Schema para criar um produto
export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(2, { message: "Nome deve ter no mínimo 2 caracteres" }),

    quantity: z.coerce.number().int({ message: "Quantidade deve ser um número inteiro" })
      .min(0, { message: "Quantidade não pode ser negativa" }),

    // A data vem como string do JSON e precisa ser convertida
    expirationDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Data de validade inválida",
    }),
  }),
});

// Schema para atualizar (todos os campos são opcionais)
export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    quantity: z.number().int().min(0).optional(),
    expirationDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)))
      .optional(),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, { message: "ID deve ser um número" }),
  }),
});
