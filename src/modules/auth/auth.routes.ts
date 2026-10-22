import { Router } from "express";
import { loginAdminController } from "./auth.controller.js";
import { loginSchema } from "./auth.schema.js";
import { validateBody } from "../../middlewares/validate.middleware.js";

const router = Router();

router.post("/login", validateBody(loginSchema), loginAdminController);

export const authRoutes = router;