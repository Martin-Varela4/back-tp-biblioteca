import { Router } from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "./book.controller.js";
import { validateData } from "../../middlewares/validate.middleware.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import {
  createBookSchema,
  updateBookSchema,
  bookIdSchema,
  filterBooksQuerySchema,
} from "./book.schema.js";

const router = Router();

router.use(requireAuth);

router.get("/", validateData(filterBooksQuerySchema, "query"), getAllBooks);

router.get("/:id", validateData(bookIdSchema, "params"), getBookById);

router.post("/", validateData(createBookSchema), createBook);

router.put(
  "/:id",
  validateData(bookIdSchema, "params"),
  validateData(updateBookSchema),
  updateBook
);

router.delete("/:id", validateData(bookIdSchema, "params"), deleteBook);

export const bookRoutes = router;
