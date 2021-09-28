import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';

import * as argon2 from 'argon2';
import { Skills } from './skills.entity';
import { Notes } from './notes.entity';
import { Salaries } from './salaries.entity';
import { Absences } from './absences.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  firstname: string;

  @Column()
  age: string;

  @Column()
  nameOnProject: number;

  @Column()
  startDate: number;

  @Column()
  endDate: number;

  @Column()
  englishLvl: number;

  @Column()
  password: string;

  @ManyToMany((type) => Skills)
  @JoinTable()
  skills: Skills[];

  @ManyToMany((type) => Notes, (notes) => notes.person)
  @JoinTable()
  notes: Notes[];

  @ManyToOne((type) => Role, (role) => role.person)
  role: Role;

  @OneToMany((type) => Salaries, (salaries) => salaries.person)
  salaries: Salaries[];

  @OneToMany((type) => Absences, (absences) => absences.person)
  absences: Absences[];

  // @OneToMany((type) => Notes, (person) => person.user_p)
  // person: Notes[];

  @OneToMany((type) => Notes, (managers) => managers.user_m)
  managers: Notes[];

  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await argon2.hash(this.password);
  // }
}
