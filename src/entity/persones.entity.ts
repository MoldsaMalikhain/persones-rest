/* eslint-disable prettier/prettier */

import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Absences } from "./absences.entity";
import { Notes } from "./notes.entity";
import { Roles } from "./roles.entity";
import { Salaries } from "./salaries.entity";
import { Skills } from "./skills.entity";
import * as argon2 from 'argon2';




@Entity()
export class Persones {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 255 })
    firstName: string;

    @Column({ length: 45 })
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

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }

    @ManyToMany(type => Skills)
    @JoinTable()
    skills: Skills[];

    @ManyToMany(type => Notes)
    @JoinTable()
    notes: Notes[];

    @ManyToOne(type => Roles, role => role.persone)
    roles: Roles;

    @OneToMany(type => Salaries, salaries => salaries.persone)
    salaries: Salaries[];

    @OneToMany(type => Absences, absences => absences.persone)
    absences: Absences[];

    @OneToMany(type => Notes, persones => persones.user_p)
    persones: Notes[]

    @OneToMany(type => Notes, managers => managers.user_m)
    managers: Notes[]

}