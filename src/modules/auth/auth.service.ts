import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../admin/admin.entity.js";
import { AppDataSource } from "../../config/data-source.js"; 

export type LoginInput = {
  email?: string;
  username?: string;
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
    throw Object.assign(new Error("Correo, usuario o contraseña incorrectos"), { status: 401 });
  }

  const jwtSecret = process.env.JWT_SECRET || "fallback_secret";

  const token = jwt.sign(
    { email: admin.email, username: admin.username }, 
    jwtSecret, 
    {
      subject: String(admin.id),
      expiresIn: "1d", 
    }
  );

  const { passwordHash: _, ...adminWithoutPassword } = admin;

  return { token, admin: adminWithoutPassword };
};

export const verifyToken = (token: string): number => {
  try {
    const jwtSecret = process.env.JWT_SECRET || "fallback_secret";
    const payload = jwt.verify(token, jwtSecret);
    return Number(typeof payload === "object" && payload !== null ? payload.sub : NaN);
  } catch {
    throw Object.assign(new Error("Token inválido o expirado"), { status: 401 });
  }
};