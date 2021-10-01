/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./person.entity";


@Entity()
export class Notes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column()
    date: number;

    @Column({default: ' '})
    text: string;

    // @Column()
    // manager_id: number;

    // @Column()
    // persone_id: number;

    @ManyToMany(() => Person, person => person.notes)
    person: Person[];

    @ManyToOne(type => Person, user_m => user_m.managers)
    user_m: Person

    @ManyToOne(type => Person, user_p => user_p.person)
    user_p: Person
}