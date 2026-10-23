import { genreRepository } from "./genre.respository.js";
import { AppError } from "../../utils/app-error.js";
import { CreateGenreInput, UpdateGenreInput } from "./genre.schemas.js";

export const genreService = {
  async getAll() {
    return await genreRepository.findAll();
  },

  async getById(id: number) {
    const genre = await genreRepository.findById(id);

    if (!genre) {
      throw new AppError("Género no encontrado", 404);
    }

    return genre;
  },

  async create(data: CreateGenreInput) {
    const existingGenre = await genreRepository.findByName(data.name);

    if (existingGenre) {
      throw new AppError("Este género ya existe", 409);
    }

    return await genreRepository.create(data);
  },

  async update(id: number, data: UpdateGenreInput) {
    const genre = await genreRepository.findById(id);

    if (!genre) {
      throw new AppError("Género no encontrado", 404);
    }

    if (data.name) {
      const existingGenre = await genreRepository.findByName(data.name);
      if (existingGenre && existingGenre.id !== id) {
        throw new AppError("Ya existe otro género con este nombre", 409);
      }
    }

    return await genreRepository.update(id, data);
  },

  async delete(id: number) {
    const genre = await genreRepository.findById(id);

    if (!genre) {
      throw new AppError("Género no encontrado", 404);
    }

    await genreRepository.delete(id);

    return { message: "Género eliminado exitosamente" };
  },
};
