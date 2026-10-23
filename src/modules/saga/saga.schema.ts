import { z } from "zod";

export const createSagaSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, "El nombre de la saga es obligatorio")
      .max(150, "El nombre de la saga no puede superar los 150 caracteres"),
    description: z
      .string()
      .trim()
      .max(500, "La descripción no puede superar los 500 caracteres")
      .optional()
      .or(z.literal("")),
  }),
});

export const updateSagaSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, "El nombre de la saga no puede estar vacío")
      .max(150, "El nombre de la saga no puede superar los 150 caracteres")
      .optional(),
    description: z
      .string()
      .trim()
      .max(500, "La descripción no puede superar los 500 caracteres")
      .optional()
      .or(z.literal("")),
  }).refine((body) => Object.keys(body).length > 0, {
    message: "Debes enviar al menos un campo para actualizar",
  }),
});

export const sagaIdSchema = z.object({
  id: z.coerce
    .number({ message: "El ID debe ser un número válido" })
    .int("El ID debe ser un número entero")
    .positive("El ID debe ser mayor que cero"),
});

export type CreateSagaInput = z.infer<typeof createSagaSchema>["body"];
export type UpdateSagaInput = z.infer<typeof updateSagaSchema>["body"];
export type SagaIdParam = z.infer<typeof sagaIdSchema>;
