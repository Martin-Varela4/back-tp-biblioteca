import { sagaRepository } from "../saga/saga.repository.js";
import { AppError } from "../../utils/app-error.js";

export const sagaService = {
  async getAll() {
    return await sagaRepository.findAll();
  },

  async getById(id: number) {
    const saga = await sagaRepository.findById(id);

    if (!saga) {
      throw new AppError("Saga no encontrada", 404);
    }

    return saga;
  },

  async create(data: { name: string; description?: string }) {
    const existingSaga = await sagaRepository.findByName(data.name);

    if (existingSaga) {
      throw new AppError("Esta saga ya existe", 409);
    }

    return await sagaRepository.create(data);
  },

  async update(id: number, data: { name?: string; description?: string }) {
    const saga = await sagaRepository.findById(id);

    if (!saga) {
      throw new AppError("Saga no encontrada", 404);
    }

    if (data.name) {
      const existingSaga = await sagaRepository.findByName(data.name);
      if (existingSaga && existingSaga.id !== id) {
        throw new AppError("Ya existe otra saga con este nombre", 409);
      }
    }

    return await sagaRepository.update(id, data);
  },

  async delete(id: number) {
    const saga = await sagaRepository.findById(id);

    if (!saga) {
      throw new AppError("Saga no encontrada", 404);
    }

    // TODO: En el futuro, agregar aquí la regla de negocio para verificar si la saga tiene libros asociados.
    // Ejemplo:
    // const hasBooks = await bookRepository.countBySagaId(id);
    // if (hasBooks > 0) { throw new AppError("No se puede eliminar una saga con libros asignados", 400); }

    await sagaRepository.delete(id);

    return { message: "Saga eliminada exitosamente" };
  },
};
