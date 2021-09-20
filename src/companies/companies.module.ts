/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Companies } from 'src/entities/companies.entity';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
    imports: [TypeOrmModule.forFeature([Companies])],
    controllers: [CompaniesController],
    providers: [CompaniesService]
})
export class CompaniesModule { }
