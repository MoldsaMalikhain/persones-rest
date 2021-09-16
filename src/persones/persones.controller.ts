/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { DeleteDateColumn } from 'typeorm';
import CreatePersonesDto from './create-persones.dto';
import { PersonesService } from './persones.service';

@Controller('persones')
export class PersonesController {

  constructor(private readonly personesServis: PersonesService) { }

  @Post('post')
  postPersone(@Body() person: CreatePersonesDto) {
    return this.personesServis.insert(person)
  }

  @Get()
  getAll() {
    return this.personesServis.getAllPersones();
  }

  @Get('skills')
  getSkills(@Body(`persone_id`, ParseIntPipe) persone_id: number) {
    return this.personesServis.getSkillsOfPerson(persone_id);
  }

  // @Delete(':id')
  // deletePersone(@Param('id') persone_id: number) {
  //   return this.personesServis.deletePersone(persone_id);
  // }
}
