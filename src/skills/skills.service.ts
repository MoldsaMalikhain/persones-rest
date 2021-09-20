/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skills } from 'src/entity/skills.entity';
import { Repository } from 'typeorm';
import CreateSkillsDto from './create-skills.dto';

@Injectable()
export class SkillsService {

    constructor(@InjectRepository(Skills) private skillRepository: Repository<Skills>) { }

    async createSkill(skillsDetails: CreateSkillsDto): Promise<Skills> {
        const skillEntity: Skills = this.skillRepository.create();
        const { name } = skillsDetails;
        skillEntity.name = name;
        await this.skillRepository.save(skillEntity);
        console.log(skillEntity);
        return skillEntity;
    }

    async getSkills(): Promise<Skills[]> {
        return this.skillRepository.find({})
    }

    async getByName(name: string): Promise<Skills[]> {
        return this.skillRepository.find({ where: { name: name } })
    }

    async getById(_id: number): Promise<Skills> {
        return this.skillRepository.findOneOrFail({ where: { id: _id } });
    }

}
