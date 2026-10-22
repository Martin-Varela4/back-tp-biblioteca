import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().trim().email("Formato de email inválido").optional(),
    username: z.string().trim().optional(),
    password: z.string().min(1, "La contraseña es obligatoria"),
}).refine((data) => !!(data.email || data.username), {
    message: "Se requiere email o nombre de usuario",
    path: ["email"], 
});

export type LoginInput = z.infer<typeof loginSchema>;