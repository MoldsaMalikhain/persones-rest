/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Persones } from 'src/entity/persones.entity';
import CreatePersonesDto from '../dto/create/create-persones.dto';
import { getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import pushIn from 'src/pushIn';
import { PersoneRO } from './persone.interface';
import UpdatePersonesDto from '../dto/update/update-persone.dto';
import { Roles } from 'src/entity/roles.entity';
import { Skills } from 'src/entity/skills.entity';
import { Notes } from 'src/entity/notes.entity';
import { Absences } from 'src/entity/absences.entity';
import { Salaries } from 'src/entity/salaries.entity';
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

    async create(personeDetails: CreatePersonesDto): Promise<PersoneRO> {

        const {
            firstName,
            age,
            nameOnProject,
            startDate,
            endDate,
            englishLvl
        } = personeDetails;

        const qb = await getRepository(Persones)
            .createQueryBuilder('persone')
            .where('persone.firstName = :firstName', { firstName })
            .orWhere('persone.nameOnProject = :nameOnProject', { nameOnProject });
        const pr = await qb.getOne();

        if (pr) {
            const err = { firstName: 'Name and Name On Project must be unique' };
            throw new HttpException({ message: 'Input data validation faild', err }, HttpStatus.BAD_REQUEST);
        }

        const newPersone = new Persones();
        newPersone.nameOnProject = nameOnProject;
        newPersone.englishLvl = englishLvl;
        newPersone.firstName = firstName;
        newPersone.startDate = startDate;
        newPersone.endDate = endDate;
        newPersone.age = age;

        newPersone.skills = [];
        newPersone.notes = [];
        newPersone.absences = [];
        newPersone.salaries = [];
        newPersone.persones = [];
        newPersone.managers = [];

        newPersone.roles = null;

        try {
            const savePersone = await this.personeRepository.save(newPersone)
            return this.buildPersoneRo(savePersone)
            // return savePersone;
        } catch (error) {
            throw new HttpException({ message: 'Data save faild', error }, HttpStatus.BAD_REQUEST);
        }
    }

    async createNote() {
        return;
    }

    async update(personeDetails: UpdatePersonesDto, _id: number): Promise<Persones> {

        const toUpdate = await this.personeRepository.findOneOrFail(_id)
        if (!toUpdate) return null;

        const {
            skills,
            notes,
            absences,
            salaries,
            persones,
            managers,
            roles
        } = personeDetails

        toUpdate.roles = null;
        if (roles) toUpdate.roles = await this.roleRepository.findOneOrFail(roles);

        toUpdate.skills = await pushIn(skills, this.skillsRepository);
        toUpdate.notes = await pushIn(notes, this.notesRepository);
        toUpdate.notes = await pushIn(managers, this.notesRepository);
        toUpdate.absences = await pushIn(absences, this.absencesRepository);
        toUpdate.salaries = await pushIn(salaries, this.salariesRepository);
        toUpdate.persones = await pushIn(persones, this.personeRepository);

        const updated = Object.assign(personeDetails, toUpdate);
        return await this.personeRepository.save(updated);
    }

    async getAll(): Promise<Persones[]> {
        return this.personeRepository.find({ relations: ['skills', 'roles'] });
    }

    async getById(_id: number) {

        const persone = await this.personeRepository.findOneOrFail({
            where: { id: _id },
            relations: ['skills', 'roles']
        })

        if (!persone) return null;

        return persone;
    }

    async getByProject(_id: number): Promise<Persones[]> {

        const byProject = await this.personeRepository.find({ where: { nameOnProject: _id } })
        if (!byProject) return null;

        return byProject;
    }

    async getBySkill(_id: number): Promise<Persones[]> {

        const bySkill = await this.personeRepository.find({ where: { skills: _id } })
        if (!bySkill) return null

        return bySkill;
    }

    async getByManager(manager: number): Promise<Persones[]> {

        const byManager = await this.personeRepository.find({ where: { managers: manager } })
        if (!byManager) return null;

        return byManager;
    }

    async deletePersone(_id: number): Promise<Persones> {
        const personeToRemove = await this.personeRepository.findOneOrFail(_id)
        if (!personeToRemove) return null

        return await this.personeRepository.remove(personeToRemove);
    }

    buildPersoneRo(persone) {
        const personeRo = {
            id: persone.id,
            firstName: persone.firtName,
            age: persone.age,
            nameOnProject: persone.nameOnProject,
            startDate: persone.startDate,
            endDate: persone.endDate,
            englishLvl: persone.englishLvl,
            skills: persone.skills,
            notes: persone.notes,
            absences: persone.absences,
            salaries: persone.salaries,
            managers: persone.menagers,
            roles: persone.roles
        };
        return { persone: personeRo };
    }


}
