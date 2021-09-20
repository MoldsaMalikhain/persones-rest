/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Companies } from 'src/entity/companies.entity';
import { CurrencyRecords } from 'src/entity/currency-records.entity';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
    imports: [TypeOrmModule.forFeature([Companies, CurrencyRecords,])],
    controllers: [CompaniesController],
    providers: [CompaniesService]
})
export class CompaniesModule { }
