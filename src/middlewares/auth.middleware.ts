import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../modules/auth/auth.service.js";
import { findById } from "../modules/user/user.repository.js";
  
// Protege rutas: exige "Authorization: Bearer <token>" válido y que el usuario
// del token siga existiendo en la base de datos.
export const requireAuth = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      throw Object.assign(new Error("Falta el token de autenticación"), { status: 401 });
    }

    const userId = verifyToken(header.slice("Bearer ".length).trim());
    const user = await findById(userId);
    if (!user) {
      throw Object.assign(new Error("El usuario del token ya no existe"), { status: 401 });
    }

    req.authUser = toPublicUser(user);
    next();
  } catch (error) {
    next(error);
  }
};
