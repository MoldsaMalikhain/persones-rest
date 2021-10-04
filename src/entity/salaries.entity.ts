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
  id: number;

  @Column()
  amount: number;

  // @Column()
  // currency_id: number

  @CreateDateColumn()
  startDate: Date;

  @DeleteDateColumn()
  endDate: Date;

  // @Column()
  // persone_id: number

  @ManyToOne((type) => Person, (person) => person.salaries)
  person: Person;

  @ManyToOne((type) => Currencies, (currency) => currency.salaries)
  currency: Currencies;

  @OneToOne((type) => CurrencyRecords, (record) => record.salaries)
  @JoinColumn()
  record: CurrencyRecords;
}
