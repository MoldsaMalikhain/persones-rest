/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Absences } from 'src/entities/absences.entity';
import { Persones } from 'src/entities/persones.entity';
import { Repository } from 'typeorm';
import CreateAbsencesDto from './create-absences.dto';

@Injectable()
export class AbsencesService {

    constructor(
        @InjectRepository(Absences) private absenceRepository: Repository<Absences>,
        @InjectRepository(Persones) private personeRepository: Repository<Persones>
    ) { }

    async create(absenceDetails: CreateAbsencesDto): Promise<Absences> {

        const absenceEntity: Absences = await this.absenceRepository.create()

        const {
            type,
            startDate,
            endDate,
            persone
        } = absenceDetails;

        absenceEntity.type = type;
        absenceEntity.startDate = startDate;
        absenceEntity.endDate = endDate;
        absenceEntity.persone = await this.personeRepository.findOneOrFail(persone)

        await this.absenceRepository.save(absenceEntity);
        return absenceEntity;
    }

    async getAll() {
        return this.absenceRepository.find()
    }

    async getById(_id: number): Promise<Absences> {
        return this.absenceRepository.findOneOrFail(_id)
    }



}
