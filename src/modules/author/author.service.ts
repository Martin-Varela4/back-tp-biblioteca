import { authorRepository } from "./author.repository.js";
import { AppError } from "../../utils/app-error.js";
import { CreateAuthorInput, UpdateAuthorInput } from "./author.schema.js";

export const authorService = {
  async getAll() {
    return await authorRepository.findAll();
  },

  async getById(id: number) {
    const author = await authorRepository.findById(id);

    if (!author) {
      throw new AppError("Autor no encontrado", 404);
    }

    return author;
  },

  async create(data: CreateAuthorInput) {
    return await authorRepository.create(data);
  },

  async update(id: number, data: UpdateAuthorInput) {
    const author = await authorRepository.update(id, data);

    if (!author) {
      throw new AppError("Autor no encontrado", 404);
    }

    return author;
  },

  async delete(id: number) {
    const result = await authorRepository.delete(id);

    if (!result.affected) {
      throw new AppError("Autor no encontrado", 404);
    }

    return { message: "Autor eliminado exitosamente" };
  },
};
