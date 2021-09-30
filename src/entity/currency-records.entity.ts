/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Companies } from './companies.entity';
import { Currencies } from './currencies.entity';
import { Salaries } from './salaries.entity';

@Entity()
export class CurrencyRecords {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    projectSalary: number;

    @Column("float")
    bankRate: number;

    @Column("float")
    taxRate: number;

    @Column("tinyint")
    net: number;

    @Column("tinyint")
    month: number;

    @Column()
    operationDate: number;

    @ManyToOne(type => Currencies, currency => currency.records)
    currency: Currencies

    @ManyToOne(type => Companies, company => company.records)
    company: Companies;
    // currencyEntity: CurrencyRecords;

    @OneToOne(type => Salaries, salaries => salaries.record)
    salaries: Salaries;
}
