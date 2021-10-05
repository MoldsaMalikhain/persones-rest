import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 255 })
  name: string;

  @ApiProperty()
  @Column({ length: 255 })
  contacts: string;

  @ApiProperty()
  @CreateDateColumn()
  createTime: Date;

  @ApiProperty({ type: () => [CurrencyRecords] })
  @OneToMany((type) => CurrencyRecords, (records) => records.company)
  records: CurrencyRecords[];
}
