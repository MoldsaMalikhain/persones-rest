/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Companies } from 'src/entities/companies.entity';
import { CurrencyRecords } from 'src/entities/currency-records.entity';
import { Repository } from 'typeorm';
import CreateCompaniesDto from './create-companies.dto';
import pushIn from 'src/pushIn';
@Injectable()
export class CompaniesService {

    constructor(
        @InjectRepository(Companies) private companyRepository: Repository<Companies>,
        @InjectRepository(CurrencyRecords) private currencyRecRepository: Repository<CurrencyRecords>
    ) { }

    async create(companiDetails: CreateCompaniesDto): Promise<Companies> {

        const companyEntity: Companies = await this.companyRepository.create();

        const {
            name,
            contacts,
            createTime,
            records
        } = companiDetails;

        companyEntity.name = name;
        companyEntity.contacts = contacts,
            companyEntity.createTime;

        companyEntity.records = await pushIn(records, this.currencyRecRepository);

        await this.companyRepository.save(companyEntity);
        return companyEntity;
    }

    async getAll() {
        return this.companyRepository.find();
    }

    async getById(_id: number): Promise<Companies> {
        return this.companyRepository.findOneOrFail(_id);
    }

}
