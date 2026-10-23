import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Book } from "../book/book.entity.js";

@Entity("genre")
export class Genre {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100, unique: true })
  name!: string; 


  @OneToMany(() => Book, (book) => book.genre) 
  books!: Book[];

}


    