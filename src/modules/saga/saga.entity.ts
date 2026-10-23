import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Book } from "../book/book.entity.js";

@Entity("saga")
export class Saga {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 150, unique: true })
  name!: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  description?: string;

  @OneToMany(() => Book, (book) => book.saga) 
  books!: Book[];
}
