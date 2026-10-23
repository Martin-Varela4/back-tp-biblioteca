import { z } from "zod";

export const createGenreSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, "El nombre del género es obligatorio")
      .max(100, "El nombre del género no puede superar los 100 caracteres"),
  }),
});

export const updateGenreSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, "El nombre del género es obligatorio")
      .max(100, "El nombre del género no puede superar los 100 caracteres"),
  }),
});

export const genreIdSchema = z.object({
  id: z.coerce
    .number({ message: "El ID debe ser un número válido" })
    .int("El ID debe ser un número entero")
    .positive("El ID debe ser mayor que cero"),
});

export type CreateGenreInput = z.infer<typeof createGenreSchema>["body"];
export type UpdateGenreInput = z.infer<typeof updateGenreSchema>["body"];
export type GenreIdParam = z.infer<typeof genreIdSchema>;
