import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Companies } from './companies.entity';
import { Currencies } from './currencies.entity';
import { Salaries } from './salaries.entity';

@Entity()
export class CurrencyRecords {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  projectSalary: number;

  @ApiProperty()
  @Column('float')
  bankRate: number;

  @ApiProperty()
  @Column('float')
  taxRate: number;

  @ApiProperty()
  @Column('tinyint')
  net: number;

  @ApiProperty()
  @Column('tinyint')
  month: number;

  @ApiProperty()
  @CreateDateColumn()
  operationDate: Date;

  @ApiProperty({ type: () => Currencies })
  @ManyToOne((type) => Currencies, (currency) => currency.records)
  currency: Currencies;

  @ApiProperty({ type: () => Companies })
  @ManyToOne((type) => Companies, (company) => company.records)
  company: Companies;
  // currencyEntity: CurrencyRecords;

  @ApiProperty({ type: () => Salaries })
  @OneToOne((type) => Salaries, (salaries) => salaries.record)
  salaries: Salaries;
}
