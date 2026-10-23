import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Book } from "../book/book.entity.js";

@Entity("author")
export class Author {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "varchar", length: 255})
    nacionalidad!: string;

    @Column({ type: "varchar", length: 255 })
    biografia!: string;

    @OneToMany(() => Book, (book) => book.author) // Apunta a book.author
    books!: Book[];

}
