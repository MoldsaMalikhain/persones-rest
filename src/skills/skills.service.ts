/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UpdateSkillsDto from 'src/dto/update/update-skill.dto';
import { Skills } from 'src/entity/skills.entity';
import { getRepository, Repository } from 'typeorm';
import CreateSkillsDto from '../dto/create/create-skills.dto';

@Injectable()
export class SkillsService {

    constructor(@InjectRepository(Skills) private skillRepository: Repository<Skills>) { }

    async createSkill(skillsDetails: CreateSkillsDto): Promise<Skills> {
        const skillEntity: Skills = this.skillRepository.create();
        const { name } = skillsDetails;

        const qb = await getRepository(Skills)
            .createQueryBuilder('skills')
            .where('skills.name = :name', { name })
        const sk = qb.getOne();

        if (sk) {
            const err = { name: 'Name must be unique' }
            throw new HttpException({ message: 'Input data validation fail', err }, HttpStatus.BAD_REQUEST);
        }

        skillEntity.name = name;
        await this.skillRepository.save(skillEntity);
        return skillEntity;
    }

    async update(_id: number, skillsDetails: UpdateSkillsDto): Promise<Skills> {
        const toUpdate = await this.skillRepository.findOneOrFail(_id)
        if (!toUpdate) return null

        const updated = Object.assign(skillsDetails, toUpdate);
        return await this.skillRepository.save(updated);
    }

    async delete(_id: number) {
        const toRemove = await this.skillRepository.findOneOrFail(_id)
        if (!toRemove) return null

        return this.skillRepository.remove(toRemove)
    }

    async getSkills(): Promise<Skills[]> {
        return this.skillRepository.find({})
    }

    async getByName(name: string): Promise<Skills[]> {
        const byName = await this.skillRepository.find({ where: { name: name } })
        if (!byName) return null;

        return byName
    }

    async getById(_id: number): Promise<Skills> {
        const byID = await this.skillRepository.findOneOrFail({ where: { id: _id } });
        if (!byID) return null

        return byID;
    }

}
