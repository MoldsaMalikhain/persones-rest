/* eslint-disable prettier/prettier */

import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Absences } from "./absences.entity";
import { Notes } from "./notes.entity";
import { Roles } from "./roles.entity";
import { Salaries } from "./salaries.entity";
import { Skills } from "./skills.entity";




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

    @Column("timestamp")
    startDate: number;

    @Column("timestamp")
    endDate: number;

    @Column()
    englishLvl: number;

    @ManyToMany(type => Skills)
    @JoinTable()
    skills: Skills[];

    @ManyToMany(type => Notes)
    @JoinTable()
    notes: Notes[];

    @ManyToOne(type => Roles, role => role.persone)
    roles: Roles;

    @OneToMany(type => Salaries, salarys => salarys.persone)
    salarys: Salaries[];

    @OneToMany(type => Absences, absences => absences.persone)
    absences: Absences[];

    @OneToMany(type => Notes, persones => persones.user_p)
    persones: Notes[]

    @OneToMany(type => Notes, managers => managers.user_m)
    managers: Notes[]

}