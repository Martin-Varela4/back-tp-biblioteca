import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./env.js";
import { Admin } from "../modules/admin/admin.entity.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.password,
  database: env.db.name,
  synchronize: env.db.synchronize,
  entities: [Admin],
});
