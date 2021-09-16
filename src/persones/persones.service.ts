/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Persones } from 'src/entities/persones.entity';
import CreatePersonesDto from './create-persones.dto';
import { Repository } from 'typeorm';
import { Skills } from 'src/entities/skills.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class PersonesService {

    constructor(@InjectRepository(Persones) private personeRepository: Repository<Persones>) { }

    async insert(personeDetails: CreatePersonesDto): Promise<Persones> {
        const personeEntity: Persones = this.personeRepository.create();
        const { firstName } = personeDetails;
        personeEntity.firstName = firstName;
        await this.personeRepository.save(personeEntity);
        return personeEntity;
    }

    async getAllPersones(): Promise<Persones[]> {
        return await this.personeRepository.find();
    }

    async getSkillsOfPerson(persone_id: number): Promise<Skills[]> {
        console.log(persone_id);
        const persone: Persones = await this.personeRepository.findOneOrFail({
            where: { id: persone_id },
            relations: ['skills', 'roles']
        });
        return persone.skills
    }

    // async deletePersone(persone: Persones): Promise<Persones> {
    //     const personeToDelte = await this.personeRepository.findOne(persone_id);
    //     return await this.personeRepository.delete(persone);
    // }

}
