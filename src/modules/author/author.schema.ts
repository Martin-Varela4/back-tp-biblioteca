import { z } from 'zod';

export const createAuthorSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, 'El nombre es obligatorio')
      .max(100, 'El nombre no puede superar los 100 caracteres'),
    nacionalidad: z
      .string()
      .trim()
      .min(1, 'La nacionalidad es obligatoria')
      .max(255, 'La nacionalidad no puede superar los 255 caracteres'),
    biografia: z
      .string()
      .trim()
      .min(1, 'La biografía es obligatoria')
      .max(255, 'La biografía no puede superar los 255 caracteres'),
  }),
});

export const updateAuthorSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1).max(100).optional(),
    nacionalidad: z.string().trim().min(1).max(255).optional(),
    biografia: z.string().trim().min(1).max(255).optional(),
  }),
});


export const getAuthorParamsSchema = z.object({
  params: z.object({
    id: z.string().pipe(z.coerce.number({ message: "El ID debe ser un número válido" })).refine(val => val > 0, {
      message: "El ID debe ser un número positivo"
    })
  })
});


export const authorIdSchema = z.object({
  id: z.string().pipe(z.coerce.number({ message: "El ID debe ser un número válido" }))
});

export type CreateAuthorInput = z.infer<typeof createAuthorSchema>['body'];
export type UpdateAuthorInput = z.infer<typeof updateAuthorSchema>['body'];
export type GetAuthorParams = z.infer<typeof getAuthorParamsSchema>['params'];