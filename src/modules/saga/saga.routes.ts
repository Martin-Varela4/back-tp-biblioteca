import { Router } from "express";
import {
  getAllSagas,
  getSagaById,
  createSaga,
  updateSaga,
  deleteSaga,
} from "./saga.controller.js";
import { validateData } from "../../middlewares/validate.middleware.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import {
  createSagaSchema,
  updateSagaSchema,
  sagaIdSchema,
} from "./saga.schema.js";

const router = Router();

router.use(requireAuth);

router.get("/", getAllSagas);

router.get("/:id", validateData(sagaIdSchema, "params"), getSagaById);

router.post("/", validateData(createSagaSchema), createSaga);

router.put(
  "/:id",
  validateData(sagaIdSchema, "params"),
  validateData(updateSagaSchema),
  updateSaga
);

router.delete("/:id", validateData(sagaIdSchema, "params"), deleteSaga);

export const sagaRoutes = router;
