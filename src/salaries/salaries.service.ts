/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Currencies } from 'src/entities/currencies.entity';
import { Persones } from 'src/entities/persones.entity';
import { Salaries } from 'src/entities/salaries.entity';
import { Repository } from 'typeorm';
import CreateSalariesDto from './create-salaries.dto';

@Injectable()
export class SalariesService {

    constructor(
        @InjectRepository(Salaries) private salariesRepository: Repository<Salaries>,
        @InjectRepository(Persones) private personesRepository: Repository<Persones>,
        @InjectRepository(Currencies) private currenciesRepository: Repository<Currencies>
    ) { }

    async inject(salariesDetails: CreateSalariesDto): Promise<Salaries> {
        const salarieEntity: Salaries = this.salariesRepository.create();

        const {
            amount,
            startDate,
            endDate,
            person_id,
            currensy_id
        } = salariesDetails

        salarieEntity.amount = amount;
        salarieEntity.startDate = startDate;
        salarieEntity.endDate = endDate;
        salarieEntity.currency = await this.currenciesRepository.findOneOrFail(currensy_id);
        salarieEntity.persone = await this.personesRepository.findOneOrFail(person_id);

        await this.salariesRepository.save(salarieEntity);
        return salarieEntity;
    }

    async getAll() {
        return this.salariesRepository.find();
    }

    async getById(_id: number): Promise<Salaries> {
        return this.salariesRepository.findOneOrFail({ where: { id: _id } })
    }

}
