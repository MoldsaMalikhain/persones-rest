/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UpdateSalariesDto from 'src/dto/update/update-salaries.dto';
import { Currencies } from 'src/entity/currencies.entity';
import { Persones } from 'src/entity/persones.entity';
import { Salaries } from 'src/entity/salaries.entity';
import { Repository } from 'typeorm';
import CreateSalariesDto from '../dto/create/create-salaries.dto';

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
        } = salariesDetails

        salarieEntity.amount = amount;
        salarieEntity.startDate = startDate;
        salarieEntity.endDate = endDate;

        await this.salariesRepository.save(salarieEntity);
        return salarieEntity;
    }

    async update(_id: number, salariesDetails: UpdateSalariesDto): Promise<Salaries> {

        const {
            amount,
            startDate,
            endDate,
            currensy,
            person
        } = salariesDetails;

        const toUpdate = new Salaries();

        toUpdate.amount = amount;
        toUpdate.startDate = startDate;
        toUpdate.endDate = endDate;

        toUpdate.persone = null;
        toUpdate.currency = null;
        if (currensy) toUpdate.currency = await this.currenciesRepository.findOneOrFail(currensy)
        if (person) toUpdate.persone = await this.personesRepository.findOneOrFail(person)

        const updated = Object.assign(salariesDetails, toUpdate)
        return await this.salariesRepository.save(updated);
    }

    async getAll(): Promise<Salaries[]> {
        const getAll = await this.salariesRepository.find();
        if (!getAll) return null;

        return getAll;
    }

    async getById(_id: number): Promise<Salaries> {
        const getID = await this.salariesRepository.findOneOrFail({ where: { id: _id } })
        if (!getID) return null

        return getID;
    }

    async delete(_id: number): Promise<Salaries> {
        const toRemove = await this.salariesRepository.findOneOrFail(_id)
        if (!toRemove) return null

        return toRemove;
    }

}
