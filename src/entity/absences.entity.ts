/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./person.entity";


@Entity()
export class Absences {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    startDate: Date;

    @DeleteDateColumn()
    endDate: Date;

    @Column()
    type: number;

    @ManyToOne(type => Person, person => person.absences)
    person: Person;

}