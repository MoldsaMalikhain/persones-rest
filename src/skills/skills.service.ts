/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skills } from 'src/entities/skills.entity';
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
        return skillEntity;
    }

    async getSkills() {
        return this.skillRepository.find()
    }

    async getById(_id: number) {
        return this.skillRepository.findOneOrFail({ where: { id: _id } })
    }




}
