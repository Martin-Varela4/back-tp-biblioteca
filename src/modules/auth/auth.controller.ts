import { Request, Response, NextFunction } from "express";
import { login, LoginInput } from "./auth.service.js";

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