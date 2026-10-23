import { Router } from "express";
import {
  getAllShelves,
  getShelfById,
  createShelf,
  updateShelf,
  deleteShelf,
} from "./shelf.controller.js";
import { validateData } from "../../middlewares/validate.middleware.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import {
  createShelfSchema,
  updateShelfSchema,
  shelfIdSchema,
} from "./shelf.schema.js";

const router = Router();

router.use(requireAuth);

router.get("/", getAllShelves);

router.get("/:id", validateData(shelfIdSchema, "params"), getShelfById);

router.post("/", validateData(createShelfSchema), createShelf);

router.put(
  "/:id",
  validateData(shelfIdSchema, "params"),
  validateData(updateShelfSchema),
  updateShelf
);

router.delete("/:id", validateData(shelfIdSchema, "params"), deleteShelf);

export const shelfRoutes = router;
