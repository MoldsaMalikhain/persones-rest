/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Currencies } from "./currencies.entity";
import { Person } from "./person.entity";
export class Salaries {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number;

    // @Column()
    // currency_id: number

    @Column("timestamp")
    startDate: number

    @Column("timestamp")
    endDate: number

    // @Column()
    // persone_id: number

    @ManyToOne(type => Person, person => person.salaries)
    person: Person;

    @ManyToOne(type => Currencies, currency => currency.salaries)
    currency: Currencies;
}