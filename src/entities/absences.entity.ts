/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Persones } from "./persones.entity";


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

    // @Column()
    // persone_id: number;

    @ManyToOne(type => Persones, persone => persone.absences)
    persone: Persones;

}