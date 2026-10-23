
import { AppDataSource } from "../../config/data-source.js";
import { Author } from "./author.entity.js";

const repository = AppDataSource.getRepository(Author);

export const authorRepository = {
  async findAll() {
    return await repository.find({
      order: { id: "ASC" },
    });
  },

  async findById(id: number) {
    return await repository.findOneBy({ id });
  },

  async create(data: Partial<Author>) {
    const newAuthor = repository.create(data);
    return await repository.save(newAuthor);
  },

  async update(id: number, data: Partial<Author>) {
    const author = await repository.findOneBy({ id });

    if (!author) {
      return null;
    }

    repository.merge(author, data);
    return await repository.save(author);
  },

  async delete(id: number) {
    return await repository.delete(id);
  },
};
