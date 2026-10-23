import { DataSource } from "typeorm";
import { Admin } from "../modules/admin/admin.entity.js";
import { Author } from "../modules/author/author.entity.js";
import { Genre } from "../modules/genre/genre.entity.js";
import { Saga } from "../modules/saga/saga.entity.js";
import { Shelf } from "../modules/shelf/shelf.entity.js";
import { Book } from "../modules/book/book.entity.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "biblioteca",
  synchronize: false,
  logging: false,
  entities: [Admin, Author, Genre, Saga, Shelf, Book],
  migrations: [],
  subscribers: [],
});
