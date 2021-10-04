import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn()
  startDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  endDate: Date;

  @Column()
  englishLvl: number;

  @Column()
  password: string;

  @ManyToOne((type) => Person, (persones) => persones.person)
  persones: Person[];

  @ManyToMany((type) => Skills)
  @JoinTable()
  skills: Skills[];

  @ManyToMany((type) => Notes, (notes) => notes.person, { cascade: true })
  @JoinTable()
  notes: Notes[];

  @ManyToOne((type) => Role, (role) => role.person)
  role: Role;

  @OneToMany((type) => Salaries, (salaries) => salaries.person, {
    cascade: true,
  })
  salaries: Salaries[];

  @OneToMany((type) => Absences, (absences) => absences.person, {
    cascade: true,
  })
  absences: Absences[];

  @OneToMany((type) => Notes, (person) => person.user_p)
  person: Notes[];

  @OneToMany((type) => Notes, (managers) => managers.user_m, { cascade: true })
  managers: Notes[];

  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await argon2.hash(this.password);
  // }
}
