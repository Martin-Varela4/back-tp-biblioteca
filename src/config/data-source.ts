import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql", 
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "biblioteca",
  synchronize: true, 
  logging: false,
  entities: ["src/modules/**/*.entity.ts"], 
  migrations: [],
  subscribers: [],
});
