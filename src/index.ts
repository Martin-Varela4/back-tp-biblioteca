import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "./database/data-source.js";
import adminRoutes from "./modules/admin/admin.routes.js";

const app = express();
app.use(express.json());
app.use("/api/admin", adminRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Base de datos conectada");
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Servidor en puerto ${process.env.PORT || 8080}`);
    });
  })
  .catch((err: Error) => {
    console.error("Error al conectar:", err);
    process.exit(1);
  });