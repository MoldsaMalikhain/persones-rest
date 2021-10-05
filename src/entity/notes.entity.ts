import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from './person.entity';

@Entity()
export class Notes {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 255 })
  name: string;

  @ApiProperty()
  @CreateDateColumn()
  date: Date;

  @ApiProperty()
  @Column({ default: ' ' })
  text: string;

  @ApiProperty({ type: () => Person })
  @ManyToOne((type) => Person, (user_m) => user_m.managers)
  user_m: Person;

  @ApiProperty({ type: () => Person })
  @ManyToOne((type) => Person, (user_p) => user_p.person)
  user_p: Person;

  @ApiProperty({ type: () => [Person] })
  @ManyToMany(() => Person, (person) => person.notes)
  person: Person[];
}
