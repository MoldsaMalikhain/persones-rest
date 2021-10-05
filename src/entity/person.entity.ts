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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Person {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column()
  firstname: string;

  @ApiProperty()
  @Column()
  age: string;

  @ApiProperty()
  @Column()
  nameOnProject: number;

  @ApiProperty()
  @CreateDateColumn()
  startDate: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updateDate: Date;

  @ApiProperty()
  @DeleteDateColumn()
  endDate: Date;

  @ApiProperty()
  @Column()
  englishLvl: number;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty({ type: () => [Person] })
  @ManyToOne((type) => Person, (persones) => persones.person)
  persones: Person[];

  @ApiProperty({ type: () => [Skills] })
  @ManyToMany((type) => Skills)
  @JoinTable()
  skills: Skills[];

  @ApiProperty({ type: () => [Notes] })
  @ManyToMany((type) => Notes, (notes) => notes.person, { cascade: true })
  @JoinTable()
  notes: Notes[];

  @ApiProperty({ type: () => Role })
  @ManyToOne((type) => Role, (role) => role.person)
  role: Role;

  @ApiProperty({ type: () => [Salaries] })
  @OneToMany((type) => Salaries, (salaries) => salaries.person, {
    cascade: true,
  })
  salaries: Salaries[];

  @ApiProperty({ type: () => [Absences] })
  @OneToMany((type) => Absences, (absences) => absences.person, {
    cascade: true,
  })
  absences: Absences[];

  @ApiProperty({ type: () => [Notes] })
  @OneToMany((type) => Notes, (person) => person.user_p)
  person: Notes[];

  @ApiProperty({ type: () => [Notes] })
  @OneToMany((type) => Notes, (managers) => managers.user_m, { cascade: true })
  managers: Notes[];

  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await argon2.hash(this.password);
  // }
}
