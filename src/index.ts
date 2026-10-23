import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import adminRoutes from "./modules/admin/admin.routes.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { authorRoutes } from "./modules/author/author.routes.js";
import { genreRoutes } from "./modules/genre/genre.routes.js";
import { sagaRoutes } from "./modules/saga/saga.routes.js";
import { bookRoutes } from "./modules/book/book.routes.js";
import { shelfRoutes } from "./modules/shelf/shelf.routes.js";
import { AppDataSource } from "./config/data-source.js";
import { notFoundHandler, errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/sagas", sagaRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/shelves", shelfRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    const port = process.env.PORT || 8080;
    console.log("Base de datos conectada correctamente");
    app.listen(port, () => {
      console.log(`Servidor corriendo en el puerto ${port}`);
    });
  })
  .catch((err: Error) => {
    console.error("Error crítico al conectar la base de datos:", err);
    process.exit(1);
  });
