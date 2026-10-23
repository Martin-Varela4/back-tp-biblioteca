import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../admin/admin.entity.js";
import { AppDataSource } from "../../config/data-source.js";
import { AppError } from "../../utils/app-error.js";
import { logger } from "../../utils/logger.js";

export type LoginInput = {
  email?: string;
  username?: string;
  password: string;
};


type RegisterAdminInput = {
  username: string;
  email: string;
  password: string;
};

export const login = async ({ email, username, password }: LoginInput) => {
  const adminRepository = AppDataSource.getRepository(Admin);

  const admin = await adminRepository.findOne({
    where: [
      ...(email ? [{ email }] : []),
      ...(username ? [{ username }] : []),
    ],
  });

  const passwordOk = admin ? await bcrypt.compare(password, admin.passwordHash) : false;

  if (!admin || !passwordOk) {
    const identifier = email || username || "no especificado";
    logger.warn(`Intento de autenticación fallido para: ${identifier}`);
    throw new AppError("Correo, usuario o contraseña incorrectos", 401);
  }

  const jwtSecret = process.env.JWT_SECRET || process.env.SECRET_KEY || "fallback_secret";

  const token = jwt.sign(
    { email: admin.email, username: admin.username },
    jwtSecret,
    {
      subject: String(admin.id),
      expiresIn: (process.env.JWT_EXPIRES_IN || "1d") as any,
    }
  );

  logger.info(`Inicio de sesión exitoso para administrador: ${admin.username} (ID: ${admin.id})`);

  const { passwordHash: _, ...adminWithoutPassword } = admin;

  return { token, admin: adminWithoutPassword };
};

export const verifyToken = (token: string): number => {
  try {
    const jwtSecret = process.env.JWT_SECRET || process.env.SECRET_KEY || "fallback_secret";
    const payload = jwt.verify(token, jwtSecret);
    return Number(typeof payload === "object" && payload !== null ? payload.sub : NaN);
  } catch {
    throw Object.assign(new AppError("Token inválido o expirado", 401), { status: 401 });
  }
};


export const registerAdmin = async ({
  username,
  email,
  password,
}: RegisterAdminInput) => {
  const adminRepository = AppDataSource.getRepository(Admin);

  // Este registro solo permite crear el primer administrador.
  const adminCount = await adminRepository.count();

  if (adminCount > 0) {
    throw new AppError(
      "El administrador inicial ya fue creado",
      403
    );
  }

  // Evita registrar un correo o usuario ya existente.
  const existingAdmin = await adminRepository.findOne({
    where: [{ email }, { username }],
  });

  if (existingAdmin) {
    throw new AppError(
      "El correo o usuario ya está registrado",
      409
    );
  }

  // Nunca guardamos la contraseña en texto plano.
  const passwordHash = await bcrypt.hash(password, 10);

  const admin = adminRepository.create({
    username,
    email,
    passwordHash,
  });

  const savedAdmin = await adminRepository.save(admin);

  // No devolvemos el hash en la respuesta de la API.
  const { passwordHash: _, ...adminWithoutPassword } = savedAdmin;

  return adminWithoutPassword;
};