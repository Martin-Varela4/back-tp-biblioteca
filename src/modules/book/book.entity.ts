import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne, 
  JoinColumn 
} from "typeorm";
import { Author } from "../author/author.entity.js";

import { Genre } from "../genre/genre.entity.js";
import { Shelf } from "../shelf/shelf.entity.js";
import { Saga } from "../saga/saga.entity.js";

@Entity("book")
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "int" })
  publicationYear!: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  isbn?: string;

  @Column({ type: "text", nullable: true })
  synopsis?: string;

  @Column({ type: "int", nullable: true })
  sagaOrder?: number;

  @ManyToOne(() => Author, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "authorId" })
  author!: Author;

  @ManyToOne(() => Genre, { nullable: false })
  @JoinColumn({ name: "genreId" })
  genre!: Genre;

  @ManyToOne(() => Shelf, (shelf) => shelf.books, {nullable: false,})
  @JoinColumn({ name: "shelfId" })
  shelf!: Shelf;

  @ManyToOne(() => Saga, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "sagaId" })
  saga?: Saga;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
