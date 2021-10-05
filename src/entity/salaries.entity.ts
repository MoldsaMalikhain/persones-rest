import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Currencies } from './currencies.entity';
import { CurrencyRecords } from './currency-records.entity';
import { Person } from './person.entity';

@Entity()
export class Salaries {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  amount: number;

  // @Column()
  // currency_id: number

  @CreateDateColumn()
  @ApiProperty()
  startDate: Date;

  @DeleteDateColumn()
  @ApiProperty()
  endDate: Date;

  @ManyToOne((type) => Person, (person) => person.salaries)
  @ApiProperty({ type: () => Person })
  person: Person;

  @ApiProperty({ type: () => Currencies })
  @ManyToOne((type) => Currencies, (currency) => currency.salaries)
  currency: Currencies;

  @ApiProperty({ type: () => CurrencyRecords })
  @OneToOne((type) => CurrencyRecords, (record) => record.salaries)
  @JoinColumn()
  record: CurrencyRecords;
}
