import { AppDataSource } from "../../config/data-source.js";
import { ILike } from "typeorm";
import { Book } from "./book.entity.js";

const ormRepository = AppDataSource.getRepository(Book);

const bookRelations = {
  author: true,
  genre: true,
  shelf: true,
  saga: true,
};

export type BookFilterParams = {
  genreId?: number;
  genre?: string;
  authorId?: number;
  author?: string;
  publicationYear?: number;
  shelfId?: number;
  sagaId?: number;
  title?: string;
};

export type CreateBookData = {
  title: string;
  publicationYear: number;
  isbn?: string;
  synopsis?: string;
  sagaOrder?: number;
  authorId: number;
  genreId: number;
  shelfId: number;
  sagaId?: number;
};

export type UpdateBookData = Partial<CreateBookData>;

export const bookRepository = {
  async findAll(filters?: BookFilterParams) {
    const query = ormRepository
      .createQueryBuilder("book")
      .leftJoinAndSelect("book.author", "author")
      .leftJoinAndSelect("book.genre", "genre")
      .leftJoinAndSelect("book.shelf", "shelf")
      .leftJoinAndSelect("book.saga", "saga");

    if (filters?.genreId) {
      query.andWhere("genre.id = :genreId", { genreId: filters.genreId });
    }

    if (filters?.genre) {
      query.andWhere("LOWER(genre.name) LIKE LOWER(:genre)", {
        genre: `%${filters.genre}%`,
      });
    }

    if (filters?.authorId) {
      query.andWhere("author.id = :authorId", { authorId: filters.authorId });
    }

    if (filters?.author) {
      query.andWhere("LOWER(author.name) LIKE LOWER(:author)", {
        author: `%${filters.author}%`,
      });
    }

    if (filters?.publicationYear) {
      query.andWhere("book.publicationYear = :publicationYear", {
        publicationYear: filters.publicationYear,
      });
    }

    if (filters?.shelfId) {
      query.andWhere("shelf.id = :shelfId", { shelfId: filters.shelfId });
    }

    if (filters?.sagaId) {
      query.andWhere("saga.id = :sagaId", { sagaId: filters.sagaId });
    }

    if (filters?.title) {
      query.andWhere("LOWER(book.title) LIKE LOWER(:title)", {
        title: `%${filters.title}%`,
      });
    }

    query.orderBy("book.id", "ASC");

    return await query.getMany();
  },

  async findById(id: number) {
    return await ormRepository.findOne({
      where: { id },
      relations: bookRelations,
    });
  },

  async findByIsbn(isbn: string) {
    return await ormRepository.findOne({
      where: { isbn },
      relations: bookRelations,
    });
  },

  async findByTitle(title: string) {
    return await ormRepository.find({
      where: {
        title: ILike(`%${title}%`),
      },
      relations: bookRelations,
      order: {
        title: "ASC",
      },
    });
  },

  async findByAuthor(authorId: number) {
    return await ormRepository.find({
      where: {
        author: {
          id: authorId,
        },
      },
      relations: bookRelations,
      order: {
        title: "ASC",
      },
    });
  },

  async findByShelf(shelfId: number) {
    return await ormRepository.find({
      where: {
        shelf: {
          id: shelfId,
        },
      },
      relations: bookRelations,
      order: {
        title: "ASC",
      },
    });
  },

  async create(data: CreateBookData) {
    const newBook = ormRepository.create({
      title: data.title,
      publicationYear: data.publicationYear,
      isbn: data.isbn,
      synopsis: data.synopsis,
      sagaOrder: data.sagaOrder,
      author: {
        id: data.authorId,
      },
      genre: {
        id: data.genreId,
      },
      shelf: {
        id: data.shelfId,
      },
      saga: data.sagaId ? { id: data.sagaId } : undefined,
    });

    const savedBook = await ormRepository.save(newBook);
    return (await this.findById(savedBook.id))!;
  },

  async update(id: number, data: UpdateBookData) {
    const book = await ormRepository.findOne({
      where: { id },
      relations: bookRelations,
    });

    if (!book) {
      return null;
    }

    const { authorId, genreId, shelfId, sagaId, ...bookData } = data;

    ormRepository.merge(book, bookData);

    if (authorId !== undefined) {
      book.author = { id: authorId } as Book["author"];
    }
    if (genreId !== undefined) {
      book.genre = { id: genreId } as Book["genre"];
    }
    if (shelfId !== undefined) {
      book.shelf = { id: shelfId } as Book["shelf"];
    }
    if (sagaId !== undefined) {
      book.saga = sagaId ? ({ id: sagaId } as Book["saga"]) : undefined;
    }

    await ormRepository.save(book);
    return await this.findById(id);
  },

  async delete(id: number) {
    return await ormRepository.delete(id);
  },
};
