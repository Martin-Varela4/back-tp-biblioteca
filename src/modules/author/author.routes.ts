import { Router } from "express";
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "./author.controller.js";
import { validateData } from "../../middlewares/validate.middleware.js";
import {
  createAuthorSchema,
  updateAuthorSchema,
  authorIdSchema,
} from "./author.schema.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(requireAuth);

router.get("/", getAllAuthors);

router.get("/:id", validateData(authorIdSchema, "params"), getAuthorById);

router.post("/", validateData(createAuthorSchema), createAuthor);

router.put(
  "/:id",
  validateData(authorIdSchema, "params"),
  validateData(updateAuthorSchema),
  updateAuthor
);

router.delete("/:id", validateData(authorIdSchema, "params"), deleteAuthor);

export const authorRoutes = router;
