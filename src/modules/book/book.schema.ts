import { z } from "zod";

const optionalNumber = (message: string) =>
  z.preprocess(
    (value) => (value === "" || value === undefined ? undefined : value),
    z.coerce
      .number({ message })
      .int("Debe ser un número entero")
      .optional()
  );

const currentYear = new Date().getFullYear();

const titleSchema = z
  .string()
  .trim()
  .min(1, "El título es obligatorio")
  .max(255, "El título no puede superar los 255 caracteres");

const publicationYearSchema = z.coerce
  .number({ message: "El año debe ser un número válido" })
  .int("El año debe ser un número entero")
  .min(1000, "Año de publicación inválido")
  .max(currentYear, "El año no puede ser en el futuro");

const positiveIdSchema = z.coerce
  .number({ message: "El ID debe ser un número válido" })
  .int("El ID debe ser un número entero")
  .min(1, "El ID debe ser positivo");

const optionalText = (maxLength?: number) => {
  let schema = z.string().trim();

  if (maxLength !== undefined) {
    schema = schema.max(maxLength);
  }

  return z.preprocess(
    (value) => (value === "" || value === undefined ? undefined : value),
    schema.optional()
  );
};

export const createBookSchema = z.object({
  body: z.object({
    title: titleSchema,
    publicationYear: publicationYearSchema,

    isbn: optionalText(50),
    synopsis: optionalText(),

    sagaOrder: optionalNumber("El orden de la saga debe ser un número"),

    authorId: positiveIdSchema,
    genreId: positiveIdSchema,
    shelfId: positiveIdSchema,

    sagaId: optionalNumber("El ID de la saga debe ser un número"),
  }),
});

export const updateBookSchema = z.object({
  body: z
    .object({
      title: titleSchema.optional(),
      publicationYear: publicationYearSchema.optional(),

      isbn: optionalText(50),
      synopsis: optionalText(),

      sagaOrder: optionalNumber("El orden de la saga debe ser un número"),

      authorId: positiveIdSchema.optional(),
      genreId: positiveIdSchema.optional(),
      shelfId: positiveIdSchema.optional(),

      sagaId: optionalNumber("El ID de la saga debe ser un número"),
    })
    .refine(
      (body) => Object.keys(body).length > 0,
      "Debes enviar al menos un campo para actualizar"
    ),
});

export const bookIdSchema = z.object({
  id: positiveIdSchema,
});

export const filterBooksQuerySchema = z.object({
  genreId: optionalNumber("El ID del género debe ser un número"),
  genre: optionalText(100),
  authorId: optionalNumber("El ID del autor debe ser un número"),
  author: optionalText(100),
  publicationYear: optionalNumber("El año de publicación debe ser un número"),
  year: optionalNumber("El año de publicación debe ser un número"),
  shelfId: optionalNumber("El ID del estante debe ser un número"),
  sagaId: optionalNumber("El ID de la saga debe ser un número"),
  title: optionalText(255),
});

export type CreateBookInput = z.infer<typeof createBookSchema>["body"];
export type UpdateBookInput = z.infer<typeof updateBookSchema>["body"];
export type BookIdParam = z.infer<typeof bookIdSchema>;
export type FilterBooksQuery = z.infer<typeof filterBooksQuerySchema>;
