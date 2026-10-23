import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Book } from "../book/book.entity.js";

@Entity("shelf")
export class Shelf {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50, unique: true })
  code!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  description?: string;

  @OneToMany(() => Book, (book) => book.shelf)
  books!: Book[];
}
