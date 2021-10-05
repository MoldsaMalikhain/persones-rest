import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CurrencyRecords } from './currency-records.entity';
import { Salaries } from './salaries.entity';

@Entity()
export class Currencies {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 32 })
  name: string;

  @ApiProperty()
  @Column('float')
  rate: number;

  @ApiProperty()
  @Column({ length: 32 })
  symbol: string;

  @ApiProperty({ type: () => [Salaries] })
  @OneToMany((type) => Salaries, (salaries) => salaries.currency)
  salaries: Salaries[];

  @ApiProperty({ type: () => [CurrencyRecords] })
  @OneToMany((type) => CurrencyRecords, (records) => records.currency)
  records: CurrencyRecords[];
}
