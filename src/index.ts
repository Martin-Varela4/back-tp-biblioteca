import "reflect-metadata"; 
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import adminRoutes from "./modules/admin/admin.routes.js";
import { authRoutes } from "./modules/auth/auth.routes.js"; 
import { AppDataSource } from "./config/data-source.js";   

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Error capturado:", err.message);
    const status = err.status || 500;
    res.status(status).json({
        success: false,
        message: err.message || "Error interno del servidor",
    });
});


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
