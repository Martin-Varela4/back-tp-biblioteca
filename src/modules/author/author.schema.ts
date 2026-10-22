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

export type CreateAuthorInput = z.infer<typeof createAuthorSchema>['body'];
export type UpdateAuthorInput = z.infer<typeof updateAuthorSchema>['body'];
