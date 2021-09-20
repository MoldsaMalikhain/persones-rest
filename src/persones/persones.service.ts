/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Persones } from 'src/entity/persones.entity';
import CreatePersonesDto from './create-persones.dto';
import { Repository } from 'typeorm';
import { Skills } from 'src/entity/skills.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/entity/roles.entity';
import { Notes } from 'src/entity/notes.entity';
import { Absences } from 'src/entity/absences.entity';
import { Salaries } from 'src/entity/salaries.entity';
import pushIn from 'src/pushIn';
@Injectable()
export class PersonesService {

    constructor(
        @InjectRepository(Persones) private personeRepository: Repository<Persones>,
        @InjectRepository(Roles) private roleRepository: Repository<Roles>,
        @InjectRepository(Skills) private skillsRepository: Repository<Skills>,
        @InjectRepository(Notes) private notesRepository: Repository<Notes>,
        @InjectRepository(Absences) private absencesRepository: Repository<Absences>,
        @InjectRepository(Salaries) private salariesRepository: Repository<Salaries>,
    ) { }

    async insert(personeDetails: CreatePersonesDto): Promise<Persones> {

        const personeEntity: Persones = this.personeRepository.create();

        const {
            firstName,
            age,
            nameOnProject,
            startDate,
            endDate,
            englishLvl,
            skills,
            notes,
            absences,
            salaries,
            persones,
            managers,
            roles
        } = personeDetails;

        personeEntity.firstName = firstName;
        personeEntity.age = age;
        personeEntity.nameOnProject = nameOnProject;
        personeEntity.startDate = startDate;
        personeEntity.endDate = endDate;
        personeEntity.englishLvl = englishLvl;

        personeEntity.roles = await this.roleRepository.findOne(roles);

        personeEntity.skills = await pushIn(skills, this.skillsRepository);
        personeEntity.notes = await pushIn(notes, this.notesRepository);
        personeEntity.notes = await pushIn(managers, this.notesRepository);
        personeEntity.absences = await pushIn(absences, this.absencesRepository);
        personeEntity.salaries = await pushIn(salaries, this.salariesRepository);
        personeEntity.persones = await pushIn(persones, this.personeRepository);


        await this.personeRepository.save(personeEntity);
        return personeEntity;
    }

    async update(personeDetails: CreatePersonesDto, _id: number): Promise<Persones> {

        const personeEntity: Persones = await this.personeRepository.findOneOrFail(_id);
        const {
            firstName,
            age,
            nameOnProject,
            startDate,
            endDate,
            englishLvl,
            skills,
            notes,
            absences,
            salaries,
            persones,
            managers,
            roles
        } = personeDetails;

        personeEntity.firstName = firstName;
        personeEntity.age = age;
        personeEntity.nameOnProject = nameOnProject;
        personeEntity.startDate = startDate;
        personeEntity.endDate = endDate;
        personeEntity.englishLvl = englishLvl;

        personeEntity.roles = await this.roleRepository.findOne(roles);

        // personeEntity.skills = [];
        // personeEntity.notes = [];
        // personeEntity.absences = [];
        // personeEntity.salaries = [];
        // personeEntity.persones = [];
        // personeEntity.managers = [];

        personeEntity.skills = await pushIn(skills, this.skillsRepository);
        personeEntity.notes = await pushIn(notes, this.notesRepository);
        personeEntity.notes = await pushIn(managers, this.notesRepository);
        personeEntity.absences = await pushIn(absences, this.absencesRepository);
        personeEntity.salaries = await pushIn(salaries, this.salariesRepository);
        personeEntity.persones = await pushIn(persones, this.personeRepository);

        await this.personeRepository.save(personeEntity);
        return personeEntity;

        // this.personeRepository.createQueryBuilder()
        //     .update()
        //     .set({
        //         ...personeDetails
        //     })
        //     .where({ id: _id })
        //     .execute();

        //     return

    }

    async getAll(): Promise<Persones[]> {
        return this.personeRepository.find({});
    }

    async getById(_id: number) {
        return this.personeRepository.findOneOrFail(
            {
                where: { id: _id },
                relations: ['skills', 'roles']

            });
    }

    async getSkillsOfPerson(persone_id: number): Promise<Skills[]> {
        const persone: Persones = await this.personeRepository.findOneOrFail({
            where: { id: persone_id },
            select: ['firstName'],
            relations: ['skills', 'roles']
        });
        return persone.skills
    }

    async deletePersone(_id: number): Promise<Persones> {
        const personeToRemove = await this.personeRepository.findOneOrFail(_id)
        return await this.personeRepository.remove(personeToRemove);
    }

}
