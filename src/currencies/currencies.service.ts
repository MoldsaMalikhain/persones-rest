/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Currencies } from 'src/entities/currencies.entity';
import { CurrencyRecords } from 'src/entities/currency-records.entity';
import { Salaries } from 'src/entities/salaries.entity';
import { Repository } from 'typeorm';
import CreateCurrenciesDto from './create-currencies.dto';
import pushIn from 'src/pushIn';
@Injectable()
export class CurrenciesService {

    constructor(
        @InjectRepository(Currencies) private currencyRepository: Repository<Currencies>,
        @InjectRepository(Salaries) private salariesRepository: Repository<Salaries>,
        @InjectRepository(CurrencyRecords) private currencyRecRepository: Repository<CurrencyRecords>
    ) { }

    async create(currencyDetails: CreateCurrenciesDto): Promise<Currencies> {

        const currencyEntity = await this.currencyRepository.create();

        const {
            name,
            rate,
            symbol,
            salaries,
            records
        } = currencyDetails;

        currencyEntity.name = name;
        currencyEntity.rate = rate;
        currencyEntity.symbol = symbol;

        currencyEntity.salaries = await pushIn(salaries, this.salariesRepository);
        currencyEntity.records = await pushIn(records, this.currencyRecRepository);

        await this.currencyRepository.save(currencyEntity);

        return currencyEntity;
    }

    async getAll(): Promise<Currencies[]> {
        return this.currencyRepository.find()
    }

    async getById(_id: number) {
        return this.currencyRepository.findOneOrFail(_id)
    }

}
