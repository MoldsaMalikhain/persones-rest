/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Skills {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 255,
        default: "test"
    })
    name: string;

}