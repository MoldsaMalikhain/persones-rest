import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from './person.entity';

@Entity()
export class Absences {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @CreateDateColumn()
  startDate: Date;

  @ApiProperty()
  @DeleteDateColumn()
  endDate: Date;

  @ApiProperty()
  @Column()
  type: number;

  @ApiProperty({ type: () => Person })
  @ManyToOne((type) => Person, (person) => person.absences)
  person: Person;
}
