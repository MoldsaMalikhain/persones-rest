/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import CreateSalariesDto from './create-salaries.dto';
import { SalariesService } from './salaries.service';

@Controller('salaries')
export class SalariesController {

    constructor(private readonly salariesServise: SalariesService) { }

    @Post()
    create(@Body() salariesDto: CreateSalariesDto) {
        return this.salariesServise.inject(salariesDto)
    }

    @Get()
    getAll() {
        return this.salariesServise.getAll()
    }

    @Get(':id')
    getById(@Param('id') _id: number) {
        return this.salariesServise.getById(_id)
    }


}
