/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Persones } from "./persones.entity";


@Entity()
export class Roles {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string

    @OneToMany(type => Persones, persone => persone.roles)
    persone: Persones[]
}