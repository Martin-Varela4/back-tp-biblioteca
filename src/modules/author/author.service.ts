import { AppDataSource } from "../../config/data-source.js";
import { Author } from "./author.entity.js";

const authorRepository = AppDataSource.getRepository(Author);

export const authorService = {
  async getAll() {
    return await authorRepository.find();
  },

  async getById(id: number) {
    const author = await authorRepository.findOneBy({ id });
    if (!author) {
      throw new Error("Autor no encontrado"); 
    }
    return author;
  },

  async create(data: any) {
    const newAuthor = authorRepository.create(data);
    return await authorRepository.save(newAuthor);
  },

  async update(id: number, data: any) {
    const author = await this.getById(id); 
    authorRepository.merge(author, data);
    return await authorRepository.save(author);
  },

  async delete(id: number) {
    const result = await authorRepository.delete(id);
    if (result.affected === 0) {
      throw new Error("Autor no encontrado");
    }
    return { message: "Autor eliminado exitosamente" };
  }
};
