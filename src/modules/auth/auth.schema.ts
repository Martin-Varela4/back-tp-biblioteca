import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().trim().email("Formato de email inválido").optional(),
    username: z.string().trim().optional(),
    password: z.string().min(1, "La contraseña es obligatoria"),
}).refine((data) => !!(data.email || data.username), {
    message: "Se requiere email o nombre de usuario",
    path: ["email"],
});

export const registerSchema = z.object({
    username: z
        .string()
        .trim()
        .min(3, "El usuario debe tener al menos 3 caracteres")
        .max(100),

    email: z
        .string()
        .trim()
        .email("El correo electrónico no es válido")
        .max(255),

    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(72, "La contraseña es demasiado larga"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;