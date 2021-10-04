import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CurrencyRecords } from './currency-records.entity';

@Entity()
export class Companies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  contacts: string;

  @CreateDateColumn()
  createTime: Date;

  @OneToMany((type) => CurrencyRecords, (records) => records.company)
  records: CurrencyRecords[];
}
