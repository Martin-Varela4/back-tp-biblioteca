import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { OneToMany, OneToOne, JoinColumn } from "typeorm";

@Entity("author")
export class Author {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "varchar", length: 255, unique: true })
    nacionalidad!: string;

    @Column({ type: "varchar", length: 255 })
    biografia!: string;

}
