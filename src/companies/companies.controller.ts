/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import CreateCompaniesDto from '../dto/create/create-companies.dto';

@Controller('companies')
export class CompaniesController {

    constructor(private readonly companiesServise: CompaniesService) { }

    @Post()
    create(@Body() companiesDto: CreateCompaniesDto) {
        return this.companiesServise.create(companiesDto);
    }

    @Get()
    getAll() {
        return this.companiesServise.getAll()
    }

    @Get(':id')
    getById(@Param('id') _id: number) {
        return this.companiesServise.getById(_id);
    }

}
