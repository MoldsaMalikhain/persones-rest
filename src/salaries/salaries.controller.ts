/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import UpdateSalariesDto from 'src/dto/update/update-salaries.dto';
import CreateSalariesDto from '../dto/create/create-salaries.dto';
import { SalariesService } from './salaries.service';

@Controller('salaries')
export class SalariesController {

    constructor(private readonly salariesServise: SalariesService) { }

    @Post()
    create(@Body() salariesDto: CreateSalariesDto) {
        return this.salariesServise.inject(salariesDto)
    }

    @Patch(':id')
    update(@Param('id') _id: number, @Body() dto: UpdateSalariesDto) {
        return this.salariesServise.update(_id, dto);
    }

    @Get()
    getAll() {
        return this.salariesServise.getAll()
    }

    @Get(':id')
    getById(@Param('id') _id: number) {
        return this.salariesServise.getById(_id)
    }

    @Delete(':id')
    delete(@Param('id') _id: number) {
        return this.salariesServise.delete(_id)
    }

}
