import { AppDataSource } from "../../config/data-source.js";
import { Shelf } from "./shelf.entity.js";

const ormRepository = AppDataSource.getRepository(Shelf);

export type CreateShelfData = {
  code: string;
  description?: string;
};

export type UpdateShelfData = Partial<CreateShelfData>;

export const shelfRepository = {
  async findAll() {
    return await ormRepository.find({
      order: { id: "ASC" },
    });
  },

  async findById(id: number) {
    return await ormRepository.findOne({
      where: { id },
      relations: {
        books: true,
      },
    });
  },

  async findByCode(code: string) {
    return await ormRepository.findOneBy({ code });
  },

  async create(data: CreateShelfData) {
    const newShelf = ormRepository.create(data);
    return await ormRepository.save(newShelf);
  },

  async update(id: number, data: UpdateShelfData) {
    const shelf = await ormRepository.findOneBy({ id });

    if (!shelf) {
      return null;
    }

    ormRepository.merge(shelf, data);
    return await ormRepository.save(shelf);
  },

  async delete(id: number) {
    return await ormRepository.delete(id);
  },

  async countBooksByShelfId(shelfId: number) {
    const shelf = await ormRepository.findOne({
      where: { id: shelfId },
      relations: { books: true },
    });
    return shelf?.books?.length ?? 0;
  },
};
