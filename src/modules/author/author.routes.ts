import { Router } from "express";
import { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor} from "../author/author.controller.js";
import { validateData } from "../../middlewares/validate.middleware.js";
import { createAuthorSchema, getAuthorParamsSchema, updateAuthorSchema} from "./author.schema.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllAuthors);
router.get("/:id", validateData(getAuthorParamsSchema, "params"), getAuthorById);
router.post("/", requireAuth, validateData(createAuthorSchema, "body"), createAuthor); 
router.put("/:id", requireAuth, validateData(updateAuthorSchema, "body"), updateAuthor);
router.delete("/:id", requireAuth, validateData(getAuthorParamsSchema, "params"), deleteAuthor); 

export const authorRoutes = router;
