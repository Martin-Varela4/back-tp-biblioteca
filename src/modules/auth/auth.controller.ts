import { Request, Response, NextFunction } from "express";
import { login, LoginInput, registerAdmin } from "./auth.service.js";
import { AppError } from "../../utils/app-error.js";

export const loginAdminController = async (
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction) => {
  try {
    const result = await login(req.body);

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const registerAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expectedKey = process.env.ADMIN_REGISTER_KEY;
    const providedKey = req.header("x-admin-setup-key");

    if (!expectedKey) {
      throw new AppError(
        "Falta configurar ADMIN_REGISTER_KEY",
        500
      );
    }

    if (providedKey !== expectedKey) {
      throw new AppError(
        "Clave de inicialización inválida",
        403
      );
    }

    const admin = await registerAdmin(req.body);

    res.status(201).json({
      message: "Administrador creado correctamente",
      admin,
    });
  } catch (error) {
    next(error);
  }
};
