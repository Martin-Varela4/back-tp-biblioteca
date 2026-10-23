import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../modules/auth/auth.service.js";
import { AppDataSource } from "../config/data-source.js";
import { Admin } from "../modules/admin/admin.entity.js";
import { logger } from "../utils/logger.js";

declare global {
  namespace Express {
    interface Request {
      adminId?: number;
    }
  }
}

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      logger.warn(`Acceso no autorizado sin token Bearer en ${req.method} ${req.originalUrl}`);
      return res.status(401).json({ message: "Falta el token de autenticación o formato inválido" });
    }

    const token = header.slice("Bearer ".length).trim();
    const adminId = verifyToken(token);

    const adminRepository = AppDataSource.getRepository(Admin);
    const admin = await adminRepository.findOneBy({ id: adminId });

    if (!admin) {
      logger.warn(`Intento de acceso con token de administrador inexistente (ID: ${adminId})`);
      return res.status(401).json({ message: "El administrador del token ya no existe" });
    }

    req.adminId = admin.id;

    return next();
  } catch (error) {
    logger.warn(`Token inválido o expirado en ${req.method} ${req.originalUrl}`);
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};
