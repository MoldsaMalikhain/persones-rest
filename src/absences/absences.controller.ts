/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AbsencesService } from './absences.service';
import CreateAbsencesDto from '../dto/create/create-absences.dto';

@Controller('absences')
export class AbsencesController {

    constructor(private readonly absenceServise: AbsencesService) { }

    @Post()
    create(@Body() absenceDto: CreateAbsencesDto) {
        return this.absenceServise.create(absenceDto);
    }

    @Get()
    getAll() {
        return this.absenceServise.getAll()
    }

    @Get(':id')
    getById(@Param('id') _id: number) {
        return this.absenceServise.getById(_id)
    }

}
