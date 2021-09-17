/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Companies } from 'src/entities/companies.entity';
import { Currencies } from 'src/entities/currencies.entity';
import { CurrencyRecords } from 'src/entities/currency-records.entity';
import { Repository } from 'typeorm';
import CreateCurrencyRecordDto from './create-currency-records.dto';

@Injectable()
export class CurrencyRecordsService {

    constructor(
        @InjectRepository(CurrencyRecords) private currencyRecRepository: Repository<CurrencyRecords>,
        @InjectRepository(Companies) private companiesRepository: Repository<Companies>,
        @InjectRepository(Currencies) private currencyRepository: Repository<Currencies>
    ) { }

    async create(currencyRecDetails: CreateCurrencyRecordDto): Promise<CurrencyRecords> {

        const currencyEntity: CurrencyRecords = this.currencyRecRepository.create();
        const {
            projectSallary,
            bankRate,
            taxRate,
            net,
            month,
            operationDate,
            currency,
            company
        } = currencyRecDetails

        currencyEntity.projectSallary = projectSallary;
        currencyEntity.bankRate = bankRate;
        currencyEntity.taxRate = taxRate;
        currencyEntity.net = net;
        currencyEntity.month = month;
        currencyEntity.operationDate = operationDate;

        currencyEntity.company = await this.companiesRepository.findOneOrFail(company);
        currencyEntity.currency = await this.currencyRecRepository.findOneOrFail(currency);

        await this.currencyRecRepository.save(currencyEntity);
        return currencyEntity;
    }

    async getAll() {
        return this.currencyRecRepository.find();
    }

    async getById(_id: number): Promise<CurrencyRecords> {
        return this.currencyRecRepository.findOneOrFail(_id)
    }
}
