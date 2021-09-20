/* eslint-disable prettier/prettier */

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CurrencyRecords } from "./currency-records.entity";
import { Salaries } from "./salaries.entity";




@Entity()
export class Currencies {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 32 })
    name: string

    @Column("float")
    rate: number

    @Column({ length: 32 })
    symbol: string

    @OneToMany(type => Salaries, salaries => salaries.currency)
    salaries: Salaries[];

    @OneToMany(type => CurrencyRecords, records => records.currency)
    records: CurrencyRecords[]

}