import express from "express";
import cors from "cors";
import adminRoutes from "./modules/admin/admin.routes.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { authorRoutes } from "./modules/author/author.routes.js";
import { genreRoutes } from "./modules/genre/genre.routes.js";
import { sagaRoutes } from "./modules/saga/saga.routes.js";
import { bookRoutes } from "./modules/book/book.routes.js";
import { shelfRoutes } from "./modules/shelf/shelf.routes.js";
import { httpLoggerMiddleware } from "./middlewares/logger.middleware.js";
import { notFoundHandler, errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(cors());

// Middleware de registro HTTP: se coloca al inicio para observar todas las peticiones y respuestas
app.use(httpLoggerMiddleware);

// Rutas de autenticación y administración
app.use("/api/auth", authRoutes);


// Rutas de recursos de la biblioteca
app.use("/api/authors", authorRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/sagas", sagaRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/shelves", shelfRoutes);

// Manejo de rutas inexistentes (404) y errores globales
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
export { app };
