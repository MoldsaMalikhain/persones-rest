/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Persones } from "./persones.entity";


@Entity()
export class Notes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column("timestamp")
    date: number;

    // @Column()
    // manager_id: number;

    // @Column()
    // persone_id: number;

    @ManyToOne(type => Persones, user_m => user_m.managers)
    user_m: Persones

    @ManyToOne(type => Persones, user_p => user_p.persones)
    user_p: Persones
}