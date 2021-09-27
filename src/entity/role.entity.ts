import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from './person.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'all' })
  name: string;

  @OneToMany((type) => Person, (persone) => persone.role)
  persone: Person[];
}
