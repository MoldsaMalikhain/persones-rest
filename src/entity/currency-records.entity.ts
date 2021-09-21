/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, MustBeEntityError, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import { Companies } from './companies.entity';
import { Currencies } from './currencies.entity';

@Entity()
export class CurrencyRecords {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    projectSallary: number;

    @Column("float")
    bankRate: number;

    @Column("float")
    taxRate: number;

    @Column("tinyint")
    net: number;

    @Column("tinyint")
    month: number;

    @Column("timestamp")
    operationDate: number;

    @ManyToOne(type => Currencies, currency => currency.records)
    currency: Currencies

    @ManyToOne(type => Companies, company => company.records)
    company: Companies;
    // currencyEntity: CurrencyRecords;
}
