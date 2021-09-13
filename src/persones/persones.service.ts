/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Persones } from 'src/entities/persones.entity';
import CreatePersonesDto from './create-persones.dto';
import { getConnection } from 'typeorm';
import { Skills } from 'src/entities/skills.entity';


@Injectable()
export class PersonesService {

    async insert(personeDetails: CreatePersonesDto): Promise<Persones> {
        const personeEntity: Persones = Persones.create();
        const { firstName } = personeDetails;
        personeEntity.firstName = firstName;
        await Persones.save(personeEntity);
        return personeEntity;
    }

    async getAllPersones(): Promise<Persones[]> {
        return await Persones.find();
    }

    async getSkillsOfPerson(persone_id: number): Promise<Skills[]> {
        console.log(persone_id);
        const persone: Persones = await Persones.findOne({ where: { id: persone_id }, relations: ['skills'] });
        return persone.skills
    }

}
