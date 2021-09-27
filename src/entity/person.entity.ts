import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';

import * as argon2 from 'argon2';

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

  @ManyToOne((type) => Role, (role) => role.persone)
  role: Role;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
