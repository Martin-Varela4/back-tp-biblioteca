import { z } from "zod";

export const createShelfSchema = z.object({
  body: z.object({
    code: z
      .string()
      .trim()
      .min(1, "El código del estante es obligatorio")
      .max(50, "El código del estante no puede superar los 50 caracteres"),
    description: z
      .string()
      .trim()
      .max(255, "La descripción no puede superar los 255 caracteres")
      .optional()
      .or(z.literal("")),
  }),
});

export const updateShelfSchema = z.object({
  body: z.object({
    code: z
      .string()
      .trim()
      .min(1, "El código no puede estar vacío")
      .max(50, "El código no puede superar los 50 caracteres")
      .optional(),
    description: z
      .string()
      .trim()
      .max(255, "La descripción no puede superar los 255 caracteres")
      .optional()
      .or(z.literal("")),
  }).refine((body) => Object.keys(body).length > 0, {
    message: "Debes enviar al menos un campo para actualizar",
  }),
});

export const shelfIdSchema = z.object({
  id: z.coerce
    .number({ message: "El ID debe ser un número válido" })
    .int("El ID debe ser un número entero")
    .positive("El ID debe ser mayor que cero"),
});

export type CreateShelfInput = z.infer<typeof createShelfSchema>["body"];
export type UpdateShelfInput = z.infer<typeof updateShelfSchema>["body"];
export type ShelfIdParam = z.infer<typeof shelfIdSchema>;
