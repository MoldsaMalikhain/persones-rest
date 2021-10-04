import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from './person.entity';

@Entity()
export class Role {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ default: 'all' })
  name: string;

  @ApiProperty({ type: () => Person })
  @OneToMany((type) => Person, (person) => person.role)
  person: Person[];
}
