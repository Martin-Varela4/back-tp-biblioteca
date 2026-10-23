import { shelfRepository } from "./shelf.repository.js";
import { AppError } from "../../utils/app-error.js";
import { CreateShelfInput, UpdateShelfInput } from "./shelf.schema.js";

export const shelfService = {
  async getAll() {
    return await shelfRepository.findAll();
  },

  async getById(id: number) {
    const shelf = await shelfRepository.findById(id);

    if (!shelf) {
      throw new AppError("Estante no encontrado", 404);
    }

    return shelf;
  },

  async create(data: CreateShelfInput) {
    const existingShelf = await shelfRepository.findByCode(data.code);

    if (existingShelf) {
      throw new AppError("Ya existe un estante con este código", 409);
    }

    return await shelfRepository.create(data);
  },

  async update(id: number, data: UpdateShelfInput) {
    const shelf = await shelfRepository.findById(id);

    if (!shelf) {
      throw new AppError("Estante no encontrado", 404);
    }

    if (data.code && data.code !== shelf.code) {
      const existingShelf = await shelfRepository.findByCode(data.code);
      if (existingShelf && existingShelf.id !== id) {
        throw new AppError("Ya existe un estante con este código", 409);
      }
    }

    return await shelfRepository.update(id, data);
  },

  async delete(id: number) {
    const shelf = await shelfRepository.findById(id);

    if (!shelf) {
      throw new AppError("Estante no encontrado", 404);
    }

    const booksCount = await shelfRepository.countBooksByShelfId(id);
    if (booksCount > 0) {
      throw new AppError("No se puede eliminar un estante con libros asignados", 400);
    }

    await shelfRepository.delete(id);

    return { message: "Estante eliminado exitosamente" };
  },
};
