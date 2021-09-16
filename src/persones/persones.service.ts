/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Persones } from 'src/entities/persones.entity';
import CreatePersonesDto from './create-persones.dto';
import { Repository } from 'typeorm';
import { Skills } from 'src/entities/skills.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/entities/roles.entity';
import { Notes } from 'src/entities/notes.entity';
import { Absences } from 'src/entities/absences.entity';
import { Salaries } from 'src/entities/salaries.entity';

// async function pushIn(array, rep) {
//     const arr:any[] = []
//     for (let item = 0; item < array.length; item++) {
//         const element = await rep.findOne(array[item])
//         arr.push(element)
//     }
//     return arr
// } 
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

        personeEntity.skills = [];
        personeEntity.notes = [];
        personeEntity.absences = [];
        personeEntity.salaries = [];
        personeEntity.persones = [];
        personeEntity.managers = [];

        for (let item = 0; item < skills.length; item++) {
            const skill = await this.skillsRepository.findOneOrFail(skills[item])
            personeEntity.skills.push(skill);
        }
        for (let item = 0; item < notes.length; item++) {
            const note = await this.notesRepository.findOneOrFail(notes[item])
            personeEntity.notes.push(note);
        }
        for (let item = 0; item < absences.length; item++) {
            const absence = await this.absencesRepository.findOneOrFail(absences[item])
            personeEntity.absences.push(absence);
        }
        for (let item = 0; item < salaries.length; item++) {
            const salarie = await this.salariesRepository.findOneOrFail(salaries[item])
            personeEntity.salaries.push(salarie);
        }
        for (let item = 0; item < persones.length; item++) {
            const persone = await this.notesRepository.findOneOrFail(persones[item])
            personeEntity.persones.push(persone);
        }
        for (let item = 0; item < managers.length; item++) {
            const manager = await this.notesRepository.findOneOrFail(managers[item])
            personeEntity.managers.push(manager);
        }

        await this.personeRepository.save(personeEntity);
        return personeEntity;
    }

    // async updatePersone(id:number, data: CreatePersonesDto):Promise<Persones>{
    //     await this.personeRepository.update({id}, data)
    //     return  
    // }

    async getAllPersones(): Promise<Persones[]> {
        return await this.personeRepository.find();
    }

    async getSkillsOfPerson(persone_id: number): Promise<Skills[]> {
        const persone: Persones = await this.personeRepository.findOneOrFail({
            where: { id: persone_id },
            relations: ['skills', 'roles']
        });
        return persone.skills
    }

    async deletePersone(persone: Persones): Promise<Persones> {
        // const personeToDelte = await this.personeRepository.findOne(persone_id);
        return await this.personeRepository.remove(persone);
    }

}
