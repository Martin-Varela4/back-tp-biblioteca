import { Router } from "express";
import adminRoutes from "./modules/admin/admin.routes.js";

const router = Router();
router.get("/health", (_req, res) => {
  res.status(200).json({ data: { status: "ok" } });
});

router.use("/admin", adminRoutes);

export default router;
