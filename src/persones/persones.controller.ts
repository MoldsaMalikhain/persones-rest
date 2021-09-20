/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import CreatePersonesDto from './create-persones.dto';
import { PersonesService } from './persones.service';

@Controller('persones')
export class PersonesController {

  constructor(private readonly personesServis: PersonesService) { }

  @Post()
  postPersone(@Body() personDto: CreatePersonesDto) {
    return this.personesServis.insert(personDto)
  }
  @Put(':id')
  update(@Body() dataToUpdate: CreatePersonesDto, @Param('id') _id: number) {
    return this.personesServis.update(dataToUpdate, _id);
  }

  @Get()
  getAll() {
    return this.personesServis.getAll();
  }

  @Get(':id')
  getPersone(@Param('id') _id: number) {
    return this.personesServis.getById(_id)
  }

  @Delete(':id')
  deletePersone(@Param('id') _id: number) {
    return this.personesServis.deletePersone(_id);
  }
}
