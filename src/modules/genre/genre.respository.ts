import { AppDataSource } from "../../config/data-source.js";
import { Genre } from "./genre.entity.js";

const ormRepository = AppDataSource.getRepository(Genre);

export type CreateGenreData = {
  name: string;
};

export type UpdateGenreData = Partial<CreateGenreData>;

export const genreRepository = {
  async findAll() {
    return await ormRepository.find({
      order: { id: "ASC" },
    });
  },

  async findById(id: number) {
    return await ormRepository.findOneBy({ id });
  },

  async findByName(name: string) {
    return await ormRepository.findOneBy({ name });
  },

  async create(data: CreateGenreData) {
    const newGenre = ormRepository.create(data);
    return await ormRepository.save(newGenre);
  },

  async update(id: number, data: UpdateGenreData) {
    const genre = await ormRepository.findOneBy({ id });

    if (!genre) {
      return null;
    }

    ormRepository.merge(genre, data);

    return await ormRepository.save(genre);
  },

  async delete(id: number) {
    return await ormRepository.delete(id);
  },
};