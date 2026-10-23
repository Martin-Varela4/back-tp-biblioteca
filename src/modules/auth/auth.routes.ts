import { Router } from "express";
import { loginAdminController } from "./auth.controller.js";
import { loginSchema } from "./auth.schema.js";
import { validateData } from "../../middlewares/validate.middleware.js";

const router = Router();

router.post("/login", validateData(loginSchema, "body"), loginAdminController);

export const authRoutes = router;