/* eslint-disable prettier/prettier */
import { Column, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Currencies } from "./currencies.entity";
import { CurrencyRecords } from "./currency-records.entity";
import { Person } from "./person.entity";



@Entity()
export class Salaries {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number;

    // @Column()
    // currency_id: number

    @Column()
    startDate: number

    @Column()
    endDate: number

    // @Column()
    // persone_id: number

    @ManyToOne(type => Person, person => person.salaries)
    person: Person;

    @ManyToOne(type => Currencies, currency => currency.salaries)
    currency: Currencies;

    @OneToOne(type => CurrencyRecords, record => record.salaries)
    // @JoinTable()
    record: CurrencyRecords;
}