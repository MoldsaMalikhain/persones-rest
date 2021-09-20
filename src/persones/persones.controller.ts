/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import CreatePersonesDto from './create-persones.dto';
import { PersonesService } from './persones.service';

@Controller('persones')
export class PersonesController {

  constructor(private readonly personesServis: PersonesService) { }

  @Post('post')
  postPersone(@Body() person: CreatePersonesDto) {
    return this.personesServis.insert(person)
  }
  @Put(':id')
  update(@Body() dataToUpdate: CreatePersonesDto, @Param('id') _id: number) {
    return this.personesServis.update(dataToUpdate, _id);
  }

  @Get()
  getAll() {
    return this.personesServis.getAllPersones();
  }

  @Get(':id')
  getSkills(@Param(`persone_id`, ParseIntPipe) persone_id: number) {
    return this.personesServis.getSkillsOfPerson(persone_id);
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
