import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateSkillsDto from 'src/dto/create/skill-create.dto';
import { Skills } from 'src/entity/skills.entity';
import { getRepository, Repository } from 'typeorm';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skills) private skillsRepository: Repository<Skills>,
  ) {}

  async create(dto: CreateSkillsDto) {
    const { name } = dto;

    const qb = await getRepository(Skills)
      .createQueryBuilder('skills')
      .where('skills.name = :name', { name });
    const sk = await qb.getOne();
    if (sk) {
      const err = { name: 'Name is not eveilable' };
      throw new HttpException(
        { message: 'Input data validation faild', err },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newSkill = new Skills();
    newSkill.name = name;

    try {
      const saved = await this.skillsRepository.save(newSkill);
      return saved;
    } catch (error) {
      throw new HttpException(
        { message: 'Data save faild', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAll() {
    return this.skillsRepository.find({});
  }
}
