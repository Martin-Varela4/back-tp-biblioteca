import { bookRepository, BookFilterParams } from "./book.repository.js";
import { authorRepository } from "../author/author.repository.js";
import { genreRepository } from "../genre/genre.respository.js";
import { shelfRepository } from "../shelf/shelf.repository.js";
import { sagaRepository } from "../saga/saga.repository.js";
import { AppError } from "../../utils/app-error.js";
import { CreateBookInput, UpdateBookInput } from "./book.schema.js";

export const bookService = {
  async getAll(filters?: BookFilterParams) {
    return await bookRepository.findAll(filters);
  },

  async getById(id: number) {
    const book = await bookRepository.findById(id);

    if (!book) {
      throw new AppError("Libro no encontrado", 404);
    }

    return book;
  },

  async getByIsbn(isbn: string) {
    const book = await bookRepository.findByIsbn(isbn);

    if (!book) {
      throw new AppError("Libro con ese ISBN no encontrado", 404);
    }

    return book;
  },

  async getByTitle(title: string) {
    return await bookRepository.findByTitle(title);
  },

  async getByAuthor(authorId: number) {
    const authorExists = await authorRepository.findById(authorId);
    if (!authorExists) {
      throw new AppError("El autor especificado no existe", 404);
    }

    return await bookRepository.findByAuthor(authorId);
  },

  async getByShelf(shelfId: number) {
    const shelfExists = await shelfRepository.findById(shelfId);
    if (!shelfExists) {
      throw new AppError("El estante especificado no existe", 404);
    }

    return await bookRepository.findByShelf(shelfId);
  },

  async create(data: CreateBookInput) {
    const authorExists = await authorRepository.findById(data.authorId);
    if (!authorExists) {
      throw new AppError("El autor especificado no existe", 404);
    }

    const genreExists = await genreRepository.findById(data.genreId);
    if (!genreExists) {
      throw new AppError("El género especificado no existe", 404);
    }

    const shelfExists = await shelfRepository.findById(data.shelfId);
    if (!shelfExists) {
      throw new AppError("El estante especificado no existe", 404);
    }

    if (data.sagaId) {
      const sagaExists = await sagaRepository.findById(data.sagaId);
      if (!sagaExists) {
        throw new AppError("La saga especificada no existe", 404);
      }
    }

    if (data.isbn) {
      const isbnExists = await bookRepository.findByIsbn(data.isbn);
      if (isbnExists) {
        throw new AppError("Ya existe un libro registrado con este ISBN", 400);
      }
    }

    return await bookRepository.create(data);
  },

  async update(id: number, data: UpdateBookInput) {
    const existingBook = await bookRepository.findById(id);
    if (!existingBook) {
      throw new AppError("Libro no encontrado", 404);
    }

    if (data.authorId !== undefined) {
      const authorExists = await authorRepository.findById(data.authorId);
      if (!authorExists) {
        throw new AppError("El autor especificado no existe", 404);
      }
    }

    if (data.genreId !== undefined) {
      const genreExists = await genreRepository.findById(data.genreId);
      if (!genreExists) {
        throw new AppError("El género especificado no existe", 404);
      }
    }

    if (data.shelfId !== undefined) {
      const shelfExists = await shelfRepository.findById(data.shelfId);
      if (!shelfExists) {
        throw new AppError("El estante especificado no existe", 404);
      }
    }

    if (data.sagaId !== undefined && data.sagaId !== null) {
      const sagaExists = await sagaRepository.findById(data.sagaId);
      if (!sagaExists) {
        throw new AppError("La saga especificada no existe", 404);
      }
    }

    if (data.isbn && data.isbn !== existingBook.isbn) {
      const isbnExists = await bookRepository.findByIsbn(data.isbn);
      if (isbnExists && isbnExists.id !== id) {
        throw new AppError("Ya existe un libro registrado con este ISBN", 400);
      }
    }

    const updatedBook = await bookRepository.update(id, data);

    if (!updatedBook) {
      throw new AppError("Libro no encontrado", 404);
    }

    return updatedBook;
  },

  async delete(id: number) {
    const result = await bookRepository.delete(id);

    if (!result.affected) {
      throw new AppError("Libro no encontrado", 404);
    }

    return { message: "Libro eliminado exitosamente" };
  },
};
