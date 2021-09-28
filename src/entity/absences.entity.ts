/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./person.entity";


@Entity()
export class Absences {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("timestamp")
    startDate: number;

    @Column("timestamp")
    endDate: number;

    @Column()
    type: number;

    @ManyToOne(type => Person, person => person.absences)
    person: Person;

}