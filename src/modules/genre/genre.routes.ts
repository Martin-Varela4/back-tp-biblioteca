import { Router } from "express";
import {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
} from "./genre.controller.js";
import { validateData } from "../../middlewares/validate.middleware.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import {
  createGenreSchema,
  updateGenreSchema,
  genreIdSchema,
} from "./genre.schemas.js";

const router = Router();

router.use(requireAuth);

router.get("/", getAllGenres);

router.get("/:id", validateData(genreIdSchema, "params"), getGenreById);

router.post("/", validateData(createGenreSchema), createGenre);

router.put(
  "/:id",
  validateData(genreIdSchema, "params"),
  validateData(updateGenreSchema),
  updateGenre
);

router.delete("/:id", validateData(genreIdSchema, "params"), deleteGenre);

export const genreRoutes = router;
