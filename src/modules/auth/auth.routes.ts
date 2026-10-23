
import { Router } from "express";
import { loginAdminController, registerAdminController } from "./auth.controller.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { validateData } from "../../middlewares/validate.middleware.js";

const router = Router();

router.post("/register", validateData(registerSchema, "body"), registerAdminController);

router.post("/login", validateData(loginSchema, "body"), loginAdminController);

export const authRoutes = router;
