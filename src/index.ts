
import "dotenv/config";
import "reflect-metadata";

import { app } from "./app.js";
import { AppDataSource } from "./config/data-source.js";
import { logger } from "./utils/logger.js";

const port = process.env.PORT || 8080;

AppDataSource.initialize()
  .then(() => {
    logger.info("Base de datos conectada correctamente");

    app.listen(port, () => {
      logger.info(`Servidor corriendo en el puerto ${port}`);
    });
  })
  .catch((err: Error) => {
    logger.error("Error crítico al conectar la base de datos:", err);
    process.exit(1);
  });
