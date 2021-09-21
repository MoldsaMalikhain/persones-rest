/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import CreatePersonesDto from '../dto/create/create-persones.dto';
import { PersonesService } from './persones.service';
import UpdatePersonesDto from '../dto/update/update-persone.dto';

@Controller('persones')
export class PersonesController {

  constructor(private readonly personesServis: PersonesService) { }

  @Post()
  postPersone(@Body() personDto: CreatePersonesDto) {
    return this.personesServis.create(personDto)
  }
  @Patch(':id')
  update(@Body() dataToUpdate: UpdatePersonesDto, @Param('id') _id: number) {
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

  @Get('project/:id')
  getByProject(@Param('id') _id: number) {
    return this.personesServis.getByProject(_id);
  }

  @Get('skill/:id')
  getBySkill(@Param('id') _id: number) {
    return this.personesServis.getBySkill(_id);
  }

  @Get('managers/:id')
  getByManager(@Param('id') _id: number) {
    return this.personesServis.getByManager(_id)
  }

  @Delete(':id')
  deletePersone(@Param('id') _id: number) {
    return this.personesServis.deletePersone(_id);
  }
}
