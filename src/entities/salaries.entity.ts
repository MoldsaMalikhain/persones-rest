/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PersistedEntityNotFoundError, PrimaryGeneratedColumn } from "typeorm";
import { Currencies } from "./currencies.entity";
import { Persones } from "./persones.entity";



@Entity()
export class Salaries {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number;

    @Column()
    currency_id: number

    @Column("timestamp")
    startDate: number

    @Column("timestamp")
    endDate: number

    @Column()
    persone_id: number

    @ManyToOne(type => Persones, persone => persone.salaries)
    persone: Persones;

    @ManyToOne(type => Currencies, currency => currency.salaries)
    currency: Currencies;
}